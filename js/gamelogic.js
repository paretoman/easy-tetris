var game = new Phaser.Game(640, 480, Phaser.AUTO, '', {preload: preload, create: create, update: update});

//var BLOCK_SIDE = 32;
var BLOCK_SIDE = 16;
var MAX_BLOCK_COUNT_HORIZONTAL = 10;
var MAX_BLOCK_COUNT_VERTICAL = 20;
var MAX_INDEX_HORIZONTAL = 9;
var MAX_INDEX_VERTICAL = 20;
var VERTICAL_OFFSET = 1;
var DISPLAY_OFFSET_VERTICAL = 80;
var DISPLAY_OFFSET_HORIZONTAL = 240;
var NEXT_WINDOW_OFFSET_VERTICAL = 80;
var NEXT_WINDOW_OFFSET_HORIZONTAL = 416;

var tetraminos;
var blocos = [];

var board = [
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],//DEADZONE if drop occurs here it means GAMEOVER
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
	];

var boardDisplay = [
	[,,,,,,,,,],
	[,,,,,,,,,],
	[,,,,,,,,,],
	[,,,,,,,,,],
	[,,,,,,,,,],
	[,,,,,,,,,],
	[,,,,,,,,,],
	[,,,,,,,,,],
	[,,,,,,,,,],
	[,,,,,,,,,],
	[,,,,,,,,,],
	[,,,,,,,,,],
	[,,,,,,,,,],
	[,,,,,,,,,],
	[,,,,,,,,,],
	[,,,,,,,,,],
	[,,,,,,,,,],
	[,,,,,,,,,],
	[,,,,,,,,,],
	[,,,,,,,,,],
	];
var nextWindow = [
	[,,],
	[,,],
	[,,],
	[,,] ];
var blocosColors = [0xa000f1, 0xefa000, 0x0002ec, 0xedf201, 0x04efed, 0xf10002, 0x00f000];

var curX = 4;
var curY = 0;
var curPose = 0;
var piece;
var nextPiece;
var pieceIndex;
var nextPieceIndex;
var rotateLock = false;
var movementLock = false;
var movementInterval = 0.15;
var tickInterval = 1000;
var tickIntervalsoftDrop = 50;
var hAxis = 0;
var bgsNames;
var curBg = 4;
var bgs = [];
var timer = null;
var ticktimer = null;
var lineCount = 0;
var speedUpGoal = 10;

var gameover = false;
var softDrop = false;
var hardDrop = false;
var hardDropLock = false;


//===========================TODO==================================:
// FIX TIMER ISSUES - DONE
// SHOW NEXT PIECE - DONE
// GAME OVER - DONE
// LINE CLEAR ANIMATION
// GAME OVER ANIMATION
// COLORS
// SCORE
// INCREASE SPEED - DONE
// SOUND
// MUSIC
// HIGHSCORE
// CUSTOM CONTROLS
// IMPROVE PRESENTATION
// IMPROVE GAMEPLAY/GAME FEEL
// JOYSTICK INPUT
// MULTIPLAYER
// BATTLE MODE
// CREDITS
// SOFT DROP - DONE
// HARD DROP - DONE
// POLISH ROTATION
// MENU SYSTEM
// REDONE BOARD GRID, NO NEED FOR EXTRA ROW AT THE TOP
//=================================================================

function preload(){
	game.load.atlas('blocoatlas', 'img/blocoatlas.png', 'js/blocoatlas.json');
	game.load.json('tetraminosJSON', 'js/tetraminos.json');
	//game.load.image('bg', 'img/phaser_universe_bg.png');
	game.load.image('board', 'img/bg1.png');
	loadBgs();
}

function create(){
	game.add.sprite(0, 0, 'bg'+curBg);
	game.add.sprite(0, 0, 'board');
	createBoardDisplay();
	createNextWindow()
	tetraminos = game.cache.getJSON('tetraminosJSON');
	getPiece();
	getPiece();//proper init
	
	var style = { font: "16px Arial", fill: "#fff", 
        align: "left", 
        boundsAlignH: "left", 
        boundsAlignV: "middle", 
        wordWrap: true, wordWrapWidth: 300 };
    var imageCredit = "Master Sword\nby Virgilio Silveira";

    text = game.add.text(0, 0, imageCredit, style);

    text.setTextBounds(426, 336, 150, 64);
	testTick();
}

function update(){
	if(!gameover){
		getInput();
		if(hardDrop){
			console.log("hard Drop");
			while(testDrop()){
				clearPiece();
				curY++;
				drawPiece();
			}
			hardDrop = false;
			testTick();
		}
		updateTickSpeed();
		updateBoardDisplayed();
		updateNextWindow();
	} else {
		clearNextWindow();
		clearBoardDisplay();
	}
}

function blocoOff(x, y){ 
	boardDisplay[y][x].frameName = 'OFF';
}

function blocoOn(x, y){ //lits bloco at positio x, y
	var colorIndex = board[y+1][x] -10;
	if(colorIndex < 0){
		colorIndex += 10;
	}
	boardDisplay[y][x].frameName = 'ON';
	boardDisplay[y][x].tint = blocosColors[colorIndex];
}

function clearBoardDisplay(){
	for(var i = 0; i < MAX_BLOCK_COUNT_HORIZONTAL; i++){
		for(var j = 0; j < MAX_BLOCK_COUNT_VERTICAL; j++){
			blocoOff(i, j);
		}
	}
}

function clearNextWindow(){
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 4; j++){
			nextWindow[j][i].frameName = "OFF";
		}
	}
}

function clearPiece(){
	var tmpX;
	var tmpY;
	for(var i = 0; i < 4; i++){
		tmpX = piece.poses[curPose][i][0] + curX ;
		tmpY = piece.poses[curPose][i][1] + curY;
		if(tmpX < 0 || tmpY < 0){
			// do nothing
		} else if(tmpX > MAX_INDEX_HORIZONTAL || tmpY > MAX_INDEX_VERTICAL){
			// do nothing
		} else {
			board[tmpY][tmpX] = -1;
		}
	}
}

function createBoardDisplay(){
	//create grid with blocos
	for(var i = 0; i < MAX_BLOCK_COUNT_HORIZONTAL; i++){
		for(var j = 0; j < MAX_BLOCK_COUNT_VERTICAL; j++){
			boardDisplay[j][i] = game.add.sprite(DISPLAY_OFFSET_HORIZONTAL + (i * BLOCK_SIDE), DISPLAY_OFFSET_VERTICAL + (j * BLOCK_SIDE), 'blocoatlas', 'OFF');
			boardDisplay[j][i].scale.setTo(0.5, 0.5);
		}
	}
}

function createNextWindow(){
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 4; j++){
			nextWindow[j][i] = game.add.sprite(NEXT_WINDOW_OFFSET_HORIZONTAL + (i * BLOCK_SIDE) , NEXT_WINDOW_OFFSET_VERTICAL + (j * BLOCK_SIDE), 'blocoatlas', 'OFF');
			nextWindow[j][i].scale.setTo(0.5, 0.5);
		}
	}
}

function drawPiece(){
	var tmpX;
	var tmpY;
	for(var i = 0; i < 4; i++){
		tmpX = piece.poses[curPose][i][0] + curX ;
		tmpY = piece.poses[curPose][i][1] + curY;
		if(tmpX < 0 || tmpY < 0){
			// do nothing
		} else if(tmpX > MAX_INDEX_HORIZONTAL || tmpY > MAX_INDEX_VERTICAL){
			// do nothing
		} else {
			board[tmpY][tmpX] = pieceIndex;
		}
	}
}

function getInput(){
	hAxis = 0;
	if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
		hAxis --;
	} else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
		hAxis++;
	} else {
		unlockMovement();
	}

	if(hAxis > 0){
		if(!movementLock){
			moveRight();
		}
	} else if(hAxis < 0){
		if(!movementLock){
			moveLeft();
		}
	} else {
		unlockMovement();
	}
	
	if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
		if(!rotateLock){
			rotateClockWise();
			rotateLock = true;
		}
	} else {
		rotateLock = false;
	}

	if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
		if(!softDrop){
			killSoftDropTimer();
			softDrop = true;
			testTick();
		}
	} else {
		if(softDrop)
		{
			killSoftDropTimer();
			softDrop = false;
			testTick();
		}
	}

	if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
		if (!hardDropLock){
			hardDropLock = true;
			hardDrop = true;
		}
	} else {
		if(hardDropLock){
			hardDropLock = false;
		}
	}
}

function getPiece(){
	piece = nextPiece;
	pieceIndex = nextPieceIndex;
	nextPieceIndex = game.rnd.integerInRange(0, 6);
	nextPiece = tetraminos.tetraminos[nextPieceIndex];
	curPose = 0;
}

function killSoftDropTimer(){
	if(ticktimer != null){
		game.time.events.remove(ticktimer);
	}
}

function lineClear(lineNum){
	var prevLine;
	for(var i = lineNum; i > 0; i--){
		prevLine = i -1;
		for(var j=0; j< MAX_BLOCK_COUNT_HORIZONTAL; j++){
			board[i][j] = board[prevLine][j];
		}
	}
	
	for(var i=0; i< MAX_BLOCK_COUNT_HORIZONTAL; i++){
			board[0][i] = -1;
	}
	lineCount++;
}

function loadBgs(){
	bgsNames = ["img/phaser_universe_bg.png", "img/bg_PROERD.png", "img/bg_PROERD2.png", "img/virgilio_pokemon_ghosts.png", "img/virgilio_master_sword.png"];
	var bgsCount = bgsNames.length;
	for(var i=0; i < bgsCount; i++){
		game.load.image('bg'+i,bgsNames[i]);
	}
}

function moveRight(){
	if(testMoveRight()){
		clearPiece();
		curX ++;
		drawPiece();
	}
	unlockMovement();
	movementLock = true;
	timer = game.time.events.loop(Phaser.Timer.SECOND * movementInterval, unlockMovement, this);
}

function moveLeft(){
	if(testMoveLeft()){
		clearPiece();
		curX --;
		drawPiece();
	}	
	unlockMovement();
	movementLock = true;
	timer = game.time.events.add(Phaser.Timer.SECOND * movementInterval, unlockMovement, this);
}

function newPiece(){
	placeOnBoard();
	getPiece();
	curY = 0;
	curX = 4;
}

function placeOnBoard(){
	var tmpX;
	var tmpY;
	for(var i = 0; i < 4; i++){
		tmpX = piece.poses[curPose][i][0] + curX ;
		tmpY = piece.poses[curPose][i][1] + curY;
		if(tmpX < 0 || tmpY < 0){
			// do nothing
		} else if(tmpX > MAX_INDEX_HORIZONTAL || tmpY > MAX_INDEX_VERTICAL){
			// do nothing
		} else {
			//board[tmpY][tmpX] = "X";
			board[tmpY][tmpX] = pieceIndex + 10;

		}
	}
}

function printBoard(showOffset = true){
	var tmpOffset;
	if(showOffset){
		tmpOffset = VERTICAL_OFFSET;
	} else {
		tmpOffset = 0;
	}
	var line = "";
	for (var i = tmpOffset; i <= MAX_BLOCK_COUNT_VERTICAL; i++){
		line = i + " - ";
		for (var j = 0; j < MAX_BLOCK_COUNT_HORIZONTAL; j++){
			line+= board[i][j] + "|";
		}
		console.log(line);
	}
}

function rotateClockWise(){
	if(testRotateClockWise()){
		clearPiece();
		curPose++;
		if(curPose > 3){
			curPose = 0;
		}
		drawPiece();
	} 
}

function rotateCounterClockWise(){
	if(testRotateCounterClockWise()){
		clearPiece();
		curPose--;
		if(curPose < 0){
			curPose = 3;
		}
		drawPiece();
	}
}

function testDrop(){
	var tmpX;
	var tmpY;
	if(curY < MAX_INDEX_VERTICAL){
		for(var i = 0; i < 4; i++){
			tmpX = piece.poses[curPose][i][0] + curX;
			tmpY = piece.poses[curPose][i][1] + curY;

			if(tmpX < 0 ||  tmpY< 0){
			// do nothing
		} else if(tmpX > MAX_INDEX_HORIZONTAL || tmpY > MAX_INDEX_VERTICAL){
			// do nothing
		} else if(board[tmpY + 1][tmpX] >= 10){
				return false;
			}
		}
	} else {
		return false;
	}
	return true;
}

function testGameOver(){
	if(curY == 0){
		gameover = true;
		return true;
	}
	return false;
}

function testLineClear(){
	for(var i=0; i <= MAX_BLOCK_COUNT_VERTICAL; i++){
		for(var j=0; j < MAX_BLOCK_COUNT_HORIZONTAL; j++){
			lineCleared = true;
			if(board[i][j] == -1){
				lineCleared = false;
				break;
			}
		}
		if(lineCleared){
			lineClear(i);
			i--;
		}
	}
}

function testMoveLeft(){
	var tmpX;
	var tmpY;
	for(var i = 0; i < 4; i++){
			tmpX = piece.poses[curPose][i][0] + curX - 1;
			tmpY = piece.poses[curPose][i][1] + curY;
		if(tmpX >= 0){ // test if there is room to go left
			if(tmpY < 0){ //if offscreen
				//do nothing
			} else if(board[tmpY][tmpX] != "X"){
				//do nothing
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
	return true;
}

function testMoveRight(){
	var tmpX;
	var tmpY;
	for(var i = 0; i < 4; i++){
			tmpX = piece.poses[curPose][i][0] + curX + 1;
			tmpY = piece.poses[curPose][i][1] + curY;
		if(tmpX <= MAX_INDEX_HORIZONTAL){ // test if there is room to go right
			if(tmpY < 0){ //if offscreen
				//do nothing
			} else if(board[tmpY][tmpX] != "X"){
				//do nothing
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
	return true;
}

function testRotateClockWise(){
	var tmpX;
	var tmpY;
	var testPose = curPose +1;
	if(testPose > 3){
		testPose = 0;
	}
	for(var i = 0; i < 4; i++){
		tmpX = piece.poses[testPose][i][0] + curX;
		tmpY = piece.poses[testPose][i][1] + curY;
		if(tmpY < 0){
			//do nothing
		} else {
			if(tmpX > -1 && tmpX < MAX_BLOCK_COUNT_HORIZONTAL){
				if(board[tmpY][tmpX] >= 10){
					return false
				}
			} else {
				return false;
			}
		}
	}
	return true;
}

function testRotateCounterClockWise(){
	var tmpX;
	var tmpY;
	var testPose = curPose -1;
	if(testPose < 0){
		testPose = 3;
	}
	for(var i = 0; i < 4; i++){
		tmpX = piece.poses[testPose][i][0] + curX;
		tmpY = piece.poses[testPose][i][1] + curY;
		if(tmpX > -1 && tmpX < MAX_BLOCK_COUNT_HORIZONTAL){
			if(board[tmpY][tmpX] >= 10){
				return false;
			}
		} else {
			return false;
		}
	}
	return true;
}

function testTick(){
	if(testDrop()){
		tick();
	} else {
		if(!testGameOver()){
			newPiece();
			testLineClear();
			drawPiece();
		}
	}

	killSoftDropTimer();
	var ticktime;
	if(softDrop){
		ticktime = Phaser.Timer.SECOND * tickIntervalsoftDrop / 1000;
	} else {
		ticktime = Phaser.Timer.SECOND * tickInterval / 1000;
	}
	ticktimer = game.time.events.loop(ticktime , testTick, this);
}

function tick(){ //move piece a line down
	clearPiece();
	curY++;
	drawPiece();
}

function unlockMovement(){
	movementLock = false;
	if(timer != null){
		game.time.events.remove(timer);
	}
}

function updateBoardDisplayed(){
	for(var i = 0; i < MAX_BLOCK_COUNT_HORIZONTAL; i++){
		for(var j = 0; j < MAX_BLOCK_COUNT_VERTICAL; j++){
			if(board[j+VERTICAL_OFFSET][i] == -1){
				blocoOff(i, j);
			} else {
				blocoOn(i, j);
			}
		}
	}
}

function updateNextWindow(){
	var offsetX = 0;
	var offsetY = 3;
	clearNextWindow();
	for(var i = 0; i < 4; i++){
		var blocoX = (nextPiece.poses[0][i][0]) + offsetX;
		var blocoY = (nextPiece.poses[0][i][1]) + offsetY;
		nextWindow[blocoY][blocoX].frameName = "ON";
		nextWindow[blocoY][blocoX].tint = blocosColors[nextPieceIndex];

	}
}

function updateTickSpeed(){
	if(lineCount  >= speedUpGoal){
		tickInterval *= 0.9;
		speedUpGoal += 10;
		console.log("speed up");
	}
}