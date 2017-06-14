var game = new Phaser.Game(640, 480, Phaser.AUTO, '', {preload: preload, create: create, update: update});
//game.state.create('menu', menuState);
//game.state.create('play', playstate);

var BLOCK_SIDE = 23;
var BLOCO_SPRITE_SCALE = BLOCK_SIDE / 32;
var MAX_BLOCK_COUNT_HORIZONTAL = 10;
var MAX_BLOCK_COUNT_VERTICAL = 20;
var MAX_INDEX_HORIZONTAL = 9;
var MAX_INDEX_VERTICAL = 19;
var DISPLAY_OFFSET_VERTICAL = 10;
var DISPLAY_OFFSET_HORIZONTAL = 205;
var NEXT_WINDOW_OFFSET_VERTICAL = 53;
var NEXT_WINDOW_OFFSET_HORIZONTAL = 458;
var HOLD_WINDOW_OFFSET_VERTICAL = 53;
var HOLD_WINDOW_OFFSET_HORIZONTAL = 113;

var tetraminos;
var blocos = [];

var board = [
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
	// regular
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
	//t-spin test
	//[13,13,13,13,13,13,13,13,-1,-1],
	//[13,13,13,13,13,13,13,-1,-1,-1],
	//[13,13,13,13,13,13,13,13,-1,13],
	//[13,13,13,13,-1,13,13,13,13,13]
	// ready to tetris
	//[12,12,12,12,12,12,12,12,12,-1],
	//[12,12,12,12,12,12,12,12,12,-1],
	//[12,12,12,12,12,12,12,12,12,-1],
	//[12,12,12,12,12,12,12,12,12,-1]
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
	[,,],
	[,,],
	[,,],
	[,,],
	[,,],
	[,,],
	[,,],
	[,,],
	[,,] ];

var holdWindow = [
	[,,],
	[,,],
	[,,],
	[,,] ];
var blocosColors = [0xa000f1, 0xefa000, 0x0002ec, 0xedf201, 0x04efed, 0xf10002, 0x00f000];
var ghostColor = 0x555555;

var curX = 4;
var curY = 0;
var curPose = 0;
var piece;
var holdPiece;
var nextPiece = [-1, -1, -1];
var pieceIndex;
var nextPieceIndex = [-1, -1, -1];
var holdPieceIndex;
var rotateLock = false;
var movementLock = false;
var movementInterval = 0.15;
var tickInterval = 500;
var tickIntervalsoftDrop = 50;
var hAxis = 0;
var bgsNames;
var curBg = 5;
var bgs = [];
var timer = null;
var ticktimer = null;
var lineCount = 0;
var speedUpGoal = 10;
var linesToClear = [];
var lineClearX = 0;
var lineClearInterval = 50;
var lineClearTimer;
var ghostY = 0;
var level = 1;
var curScore = 0;
var lineClearPts = [100, 300, 500, 800] // single, double, triple, tetris
var softDropPts = 1;
var hardDropPts = 2;
var comboIncrement = 50;
var curCombo = 0;
var labelArt;
var labelLines;
var labelScore;
var labelLevel;
var bg;

var gameover = false;
var softDrop = false;
var hardDrop = false;
var hardDropLock = false;
var cleaningLines = false;
var waitingLineClear = false;
var holdLock = false;

//===========================TODO==================================:
	// FIX TIMER ISSUES - DONE
	// SHOW NEXT PIECE - DONE
	// GAME OVER - DONE
	// INCREASE SPEED - DONE
	// COLORS - DONE
	// SOFT DROP - DONE
	// HARD DROP - DONE
	// FIX HORIZONTAL MOVEMENT BUG (EATING BLOCKS) - DONE
	// REDONE BOARD GRID, NO NEED FOR EXTRA ROW AT THE TOP - DONE
	// LINE CLEAR ANIMATION - DONE
	// GHOST PIECES - DONE
	// SCORE - 25% DONE
	// HOLD PIECE - DONE
	// POLISH ROTATION (WALL KICKS) - DONE
	// POLISH ROTATION (FLOOR KICKS) - 
	// LAST MINUTE TICK - 
	// MAIN MENU SCREEN - SELECT BACKGROUND - 
	// GAME OVER ANIMATION
	// HIGHSCORE
	// MENU SYSTEM
	// CREDITS
	// SOUND
	// MUSIC
	// CUSTOM CONTROLS
	// JOYSTICK INPUT
	// MULTIPLAYER
	// BATTLE MODE
	// IMPROVE GAMEPLAY/GAME FEEL
	// IMPROVE PRESENTATION
	// IMPROVE BLOCKS
	// EXTEND NEXT WINDOW to 3 pieces in queue
//=================================================================

function preload(){
	game.load.atlas('blocoatlas', 'img/blocoatlas.png', 'js/blocoatlas.json');
	game.load.json('tetraminosJSON', 'js/tetraminos.json');
	game.load.image('board', 'img/bg1.png');
	loadBgs();
}

function create(){
	bg = game.add.sprite(0, 0, 'bg'+curBg);
	game.add.sprite(0, 0, 'board');
	createBoardDisplay();
	createNextWindow();
	createHoldWindow();
	tetraminos = game.cache.getJSON('tetraminosJSON');
	initPieces();
	createTexts();
	testTick();
}

function createTexts(){
	var bgArtStyle = { font: "16px Arial", fill: "#fff", 
        align: "left", 
        boundsAlignH: "left", 
        boundsAlignV: "middle", 
        wordWrap: true, wordWrapWidth: 300 };
    var bgArtText = bgsTexts[curBg];
    labelArt = game.add.text(0, 0, bgArtText, bgArtStyle);
    labelArt.setTextBounds(463, 378, 154, 92);

	var scoreStyle = { font: "16px Arial", fill: "#fff", 
        align: "center", 
        boundsAlignH: "center", 
        boundsAlignV: "middle", 
        wordWrap: false, wordWrapWidth: 159 };
    var scoreText = curScore;
    labelScore = game.add.text(0, 0, scoreText, scoreStyle);
    labelScore.setTextBounds(23, 348, 159, 23);

    var levelText = level;
    labelLevel = game.add.text(0, 0, levelText, scoreStyle);
    labelLevel.setTextBounds(23, 397, 159, 23);

	var linesText = lineCount;
    labelLines = game.add.text(0, 0, linesText, scoreStyle);
    labelLines.setTextBounds(23, 446, 159, 23);
}

function update(){
	if(!gameover){
		if(cleaningLines){
			if(!waitingLineClear){
				waitingLineClear = true;
				lineClearTimer = game.time.events.loop(Phaser.Timer.SECOND * lineClearInterval / 1000, lineClear, this);
				score(lineClearPts[linesToClear.length - 1] * level + (comboIncrement * curCombo));
				if(curCombo > 0){
					console.log(curCombo+ " Combo!");
				}
				curCombo += 1;
			}
		} else {
			getInput();
			if(hardDrop){
				while(testDrop()){
					score(hardDropPts);
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
		}
	} else {
		clearNextWindow();
		clearBoardDisplay();
		softDrop = false;
	}
}

function blocoOff(x, y){ 
	boardDisplay[y][x].frameName = 'OFF';
}

function blocoOn(x, y){ //lits bloco at position x, y
	var colorIndex = board[y][x];
	if(colorIndex == -2){
		boardDisplay[y][x].frameName = 'ON';
	boardDisplay[y][x].tint = ghostColor;
	} else {
		colorIndex -= 10;
		if(colorIndex < 0){
			colorIndex += 10;
		}
		boardDisplay[y][x].frameName = 'ON';
		boardDisplay[y][x].tint = blocosColors[colorIndex];
	}
	
}

function bringLinesDown(){
	var prevLine;
	for(var k = 0; k < linesToClear.length; k ++ ){
		for(var i = linesToClear[k]; i > 0; i--){
			prevLine = i -1;
			for(var j=0; j< MAX_BLOCK_COUNT_HORIZONTAL; j++){
				board[i][j] = board[prevLine][j];
				if(board[i][j] < 10){
					board[i][j] = -1;
				}

			}
		}
		lineCount++;
		updateLabelLines();
	}
	cleaningLines = false;
	waitingLineClear = false;
	linesToClear = [];
	game.time.events.remove(lineClearTimer);
	curY = -1; //gambiarra
	
	testTick();
}

function clearBoardDisplay(){
	for(var i = 0; i < MAX_BLOCK_COUNT_HORIZONTAL; i++){
		for(var j = 0; j < MAX_BLOCK_COUNT_VERTICAL; j++){
			blocoOff(i, j);
		}
	}
}

function clearGhost(){
	var tmpX;
	var tmpY;
	for(var i = 0; i < 4; i++){
		tmpX = piece.poses[curPose][i][0] + curX ;
		tmpY = piece.poses[curPose][i][1] + ghostY;
		if(tmpX < 0 || tmpY < 0){
			// do nothing
		} else if(tmpX > MAX_INDEX_HORIZONTAL || tmpY > MAX_INDEX_VERTICAL){
			break;
		} else if(board[tmpY][tmpX] == -2){
			board[tmpY][tmpX] = -1;
		}
	}
}

function clearHoldWindow(){
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 4; j++){
			holdWindow[j][i].frameName = "OFF";
		}
	}
}

function clearNextWindow(){
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 12; j++){
			nextWindow[j][i].frameName = "OFF";
		}
	}
}

function clearPiece(){
	clearGhost();
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
			boardDisplay[j][i].scale.setTo(BLOCO_SPRITE_SCALE, BLOCO_SPRITE_SCALE);
		}
	}
}

function createHoldWindow(){
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 4; j++){
			holdWindow[j][i] = game.add.sprite(HOLD_WINDOW_OFFSET_HORIZONTAL + (i * BLOCK_SIDE) , HOLD_WINDOW_OFFSET_VERTICAL + (j * BLOCK_SIDE), 'blocoatlas', 'OFF');
			holdWindow[j][i].scale.setTo(BLOCO_SPRITE_SCALE, BLOCO_SPRITE_SCALE);
		}
	}
}

function createNextWindow(){
	var nextMargin = 0;
	var marginIncrement = 5;
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 12; j++){
			if((j) % 4 == 0 && j > 3){
				nextMargin += marginIncrement;
			}
			nextWindow[j][i] = game.add.sprite(NEXT_WINDOW_OFFSET_HORIZONTAL + (i * BLOCK_SIDE) , NEXT_WINDOW_OFFSET_VERTICAL + (j * BLOCK_SIDE) + nextMargin, 'blocoatlas', 'OFF');
			nextWindow[j][i].scale.setTo(BLOCO_SPRITE_SCALE, BLOCO_SPRITE_SCALE);
		}
		nextMargin = 0;
	}
}

function drawGhost(){
	ghostY = curY;
	while(testGhostDrop()){
		ghostY++;
		if(ghostY >= MAX_BLOCK_COUNT_VERTICAL){
			ghostY--;
			break;
		}
	}
	if(ghostY < MAX_BLOCK_COUNT_VERTICAL){
		for(var i = 0; i < 4; i++){
			tmpX = piece.poses[curPose][i][0] + curX ;
			tmpY = piece.poses[curPose][i][1] + ghostY;
			if(tmpX < 0 || tmpY < 0){
				// do nothing
			} else if(tmpX > MAX_INDEX_HORIZONTAL || tmpY > MAX_INDEX_VERTICAL){
				// do nothing
			} else {
				board[tmpY][tmpX] = -2;//ghost index
			}
		}
	}
}

function drawPiece(){
	drawGhost();
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
	} else if(game.input.keyboard.isDown(Phaser.Keyboard.Z)){
		if(!rotateLock){
			rotateCounterClockWise();
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

	if(game.input.keyboard.isDown(Phaser.Keyboard.X)){
		if(!holdLock){
			holdLock = true;
			hold();
		}
	}
}

function getPiece(){
	piece = nextPiece[0];
	pieceIndex = nextPieceIndex[0];

	nextPieceIndex[0] = nextPieceIndex[1];
	nextPieceIndex[1] = nextPieceIndex[2];
	nextPieceIndex[2] = game.rnd.integerInRange(0, 6);

	nextPiece[0] = nextPiece[1];
	nextPiece[1] = nextPiece[2];
	nextPiece[2] = tetraminos.tetraminos[nextPieceIndex[2]];
	
	curPose = 0;
}

function hold(){
	clearPiece();
	if(holdPiece == null){
		holdPiece = piece;
		holdPieceIndex = pieceIndex;
		newPiece();
	} else {
		foo = holdPiece;
		holdPiece = piece;
		piece = foo;

		bar = holdPieceIndex;
		holdPieceIndex = pieceIndex;
		pieceIndex = bar;

		curY = -1;
		curX = 4;
		curPose = 0;
	}
	clearHoldWindow();
	updateHoldWindow();
}

function initPieces(){
	pieceIndex = game.rnd.integerInRange(0, 6);
	piece = tetraminos.tetraminos[pieceIndex];
	for(var i = 0; i < 3; i++){
		nextPieceIndex[i] = game.rnd.integerInRange(0, 6);
		nextPiece[i] = tetraminos.tetraminos[nextPieceIndex[i]];
	}
	curPose = 0;
}

function killSoftDropTimer(){
	if(ticktimer != null){
		game.time.events.remove(ticktimer);
	}
}

function lineClear(){
	for(var i = 0; i < linesToClear.length; i++ ){
		board[linesToClear[i][lineClearX]] = -1;
		blocoOff(lineClearX, linesToClear[i]);
	}
	if(lineClearX >= MAX_INDEX_HORIZONTAL){
		bringLinesDown();
	} else {
		lineClearX++;
	}
}

function loadBgs(){
	bgsNames = ["img/phaser_universe_bg.png", "img/bg_PROERD.png", "img/bg_PROERD2.png", "img/virgilio_pokemon_ghosts.png", "img/virgilio_master_sword.png","img/ratinho.png"];
	bgsTexts = ["Phaser Universe\nby Phaser", "Proerd\nby Nestablo Ramos", "Proerd2\nby Nestablo Ramos", "Pokemon Ghosts\nby Virgilio Silveira", "Master Sword\nby Virgilio Silveira", "Ratinho in space\nby Caio Marchi"];
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
	getPiece();
	curY = -1;
	curX = 4;
}

function placeOnBoard(){
	//unecessary testings
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
			board[tmpY][tmpX] = pieceIndex + 10;
		}
	}
	if(holdLock){
		holdLock = false;
	}
}

function printBoard(){
	var line = "";
	for (var i = 0; i < MAX_BLOCK_COUNT_VERTICAL; i++){
		line = i + " - ";
		for (var j = 0; j < MAX_BLOCK_COUNT_HORIZONTAL; j++){
			line+= board[i][j] + "|";
		}
		console.log(line);
	}
}

function rotateClockWise(){
	if(testRotateClockWise(curX, curY)){
		clearPiece();
		curPose++;
		if(curPose > 3){
			curPose = 0;
		}
		drawPiece();
	} else {
		testWallKicks(true);
	}
}

function rotateCounterClockWise(){
	if(testRotateCounterClockWise(curX, curY)){
		clearPiece();
		curPose--;
		if(curPose < 0){
			curPose = 3;
		}
		drawPiece();
	} else {
		testWallKicks(false);
	}
}

function score(pts){
	curScore += pts;
	updateLabelScore();
}

function testDrop(){
	var tmpX;
	var tmpY;
	if(curY < MAX_INDEX_VERTICAL){
		for(var i = 0; i < 4; i++){
			tmpX = piece.poses[curPose][i][0] + curX;
			tmpY = piece.poses[curPose][i][1] + curY + 1;

			if(tmpX < 0 ||  tmpY< 0){
			// do nothing
		} else if(tmpX > MAX_INDEX_HORIZONTAL || tmpY > MAX_INDEX_VERTICAL){
			// do nothing
		} else if(board[tmpY][tmpX] >= 10){
				return false;
			}
		}
	} else {
		return false;
	}
	return true;
}

function testGameOver(){
	if(curY == -1){
		gameover = true;
		return true;
	}
	
	return false;
}

function testGhostDrop(){
	var tmpX;
	var tmpY;
	if(curY < MAX_INDEX_VERTICAL){
		for(var i = 0; i < 4; i++){
			tmpX = piece.poses[curPose][i][0] + curX;
			tmpY = piece.poses[curPose][i][1] + ghostY + 1;

			if(tmpX < 0 ||  tmpY< 0){
			// do nothing
		} else if(tmpX > MAX_INDEX_HORIZONTAL || tmpY > MAX_INDEX_VERTICAL){
			// do nothing
		} else if(board[tmpY][tmpX] >= 10){
				return false;
			}
		}
	} else {
		return false;
	}
	return true;
}

function testLineClear(){
	for(var i=0; i < MAX_BLOCK_COUNT_VERTICAL; i++){
		for(var j=0; j < MAX_BLOCK_COUNT_HORIZONTAL; j++){
			lineCleared = true;
			if(board[i][j] <= -1){
				lineCleared = false;
				break;
			}
		}
		if(lineCleared){
			linesToClear.push(i);
		}
	}
	if(linesToClear.length > 0){
		cleaningLines = true;
		lineClearX = 0
		return true;
	}
	curCombo = 0;
	return false;
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
			} else if(board[tmpY][tmpX] >= 10){
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
			} else if(board[tmpY][tmpX] >= 10){
				return false;
			}
		} else {
			return false;
		}
	}
	return true;
}

function testRotateClockWise(x, y){
	var tmpX;
	var tmpY;
	var testPose = curPose +1;
	if(testPose > 3){
		testPose = 0;
	}
	for(var i = 0; i < 4; i++){
		tmpX = piece.poses[testPose][i][0] + x;
		tmpY = piece.poses[testPose][i][1] + y;
		if(tmpY < 0){
			//do nothing
		} else {
			if(tmpX > -1 && tmpX < MAX_BLOCK_COUNT_HORIZONTAL){
				if(board[tmpY][tmpX] >= 10){
					return false;
				}
			} else {
				return false;
			}
		}
	}
	return true;
}

function testRotateCounterClockWise(x, y){
	var tmpX;
	var tmpY;
	var testPose = curPose -1;
	if(testPose < 0){
		testPose = 3;
	}
	for(var i = 0; i < 4; i++){
		tmpX = piece.poses[testPose][i][0] + x;
		tmpY = piece.poses[testPose][i][1] + y;
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
			if(!waitingLineClear){
				placeOnBoard();
				newPiece();
				drawPiece();
			}
			testLineClear();
		}
	}
	if(softDrop){
		score(softDropPts);
	}

	killSoftDropTimer();
	if(!waitingLineClear){
		var ticktime;
		if(softDrop){
			ticktime = Phaser.Timer.SECOND * tickIntervalsoftDrop / 1000;
		} else {
			ticktime = Phaser.Timer.SECOND * tickInterval / 1000;
		}
		ticktimer = game.time.events.loop(ticktime , testTick, this);
	}
}

function tick(){ //move piece a line down
	clearPiece();
	curY++;
	drawPiece();

}

function testWallKicks(clockWise){
	var poseIncrement = 0;
	var kicked = false;
	if(clockWise){
		poseIncrement = 1;
	} else {
		poseIncrement = -1;
	}

	for(var i = 1; i<= 2; i++){ //left wall kick
		if(testRotateClockWise(curX + i, curY)){ 
			clearPiece();
			curX += i;
			curPose += poseIncrement;
			kicked = true;
			break;
		}
	}
	if(!kicked){
		for(var i = -1; i>= -2; i--){ //right wall kick
			if(testRotateClockWise(curX + i, curY)){ 
				clearPiece();
				curX += i;
				curPose += poseIncrement;;
				break;
			}
		}
	}
	if(curPose > 3){
		curPose = 0;
	}
	if(curPose < 0){
		curPose = 3;
	}
	drawPiece();
}

function unlockMovement(){
	movementLock = false;
	if(timer != null){
		game.time.events.remove(timer);
	}
}

function updateBg(newBg){
	curBg = newBg;
	bg.loadTexture('bg'+curBg);
	updateLabelArt();
}

function updateBoardDisplayed(){
	for(var i = 0; i < MAX_BLOCK_COUNT_HORIZONTAL; i++){
		for(var j = 0; j < MAX_BLOCK_COUNT_VERTICAL; j++){
			if(board[j][i] == -1){
				blocoOff(i, j);
			} else {
				blocoOn(i, j);
			}
		}
	}
}

function updateHoldWindow(){
	var offsetX = 0;
	var offsetY = 3;
	clearHoldWindow();
	for(var i = 0; i < 4; i++){
		var blocoX = (holdPiece.poses[0][i][0]) + offsetX;
		var blocoY = (holdPiece.poses[0][i][1]) + offsetY;
		holdWindow[blocoY][blocoX].frameName = "ON";
		holdWindow[blocoY][blocoX].tint = blocosColors[holdPieceIndex];

	}
}

function updateLabelArt(){
	labelArt.text = bgsTexts[curBg];
}

function updateLabelLevel(){
	labelLevel.text = level;
}

function updateLabelLines(){
	labelLines.text = lineCount;
}

function updateLabelScore(){
	labelScore.text = curScore;
}

function updateNextWindow(){
	var offsetX = 0;
	var offsetY = 3;
	clearNextWindow();
	for(var j = 0; j < 3; j++ ){
		for(var i = 0; i < 4; i++){
			var blocoX = (nextPiece[j].poses[0][i][0]) + offsetX;
			var blocoY = (nextPiece[j].poses[0][i][1]) + (offsetY * (j+1) + j);
			nextWindow[blocoY][blocoX].frameName = "ON";
			nextWindow[blocoY][blocoX].tint = blocosColors[nextPieceIndex[j]];
		}
	}
	
}

function updateTickSpeed(){
	if(lineCount  >= speedUpGoal){
		tickInterval *= 0.9;
		speedUpGoal += 10;
		level++;
		updateLabelLevel();
	}
}

