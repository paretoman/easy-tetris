var game = new Phaser.Game(320, 640, Phaser.AUTO, '', {preload: preload, create: create, update: update});
var blocos = [];
var tetraminos;
var board = [
	['_','_','_','_','_','_','_','_','_','_'],
	['_','_','_','_','_','_','_','_','_','_'],
	['_','_','_','_','_','_','_','_','_','_'],
	['_','_','_','_','_','_','_','_','_','_'],
	['_','_','_','_','_','_','_','_','_','_'],
	['_','_','_','_','_','_','_','_','_','_'],
	['_','_','_','_','_','_','_','_','_','_'],
	['_','_','_','_','_','_','_','_','_','_'],
	['_','_','_','_','_','_','_','_','_','_'],
	['_','_','_','_','_','_','_','_','_','_'],
	['_','_','_','_','_','_','_','_','_','_'],
	['_','_','_','_','_','_','_','_','_','_'],
	['_','_','_','_','_','_','_','_','_','_'],
	['_','_','_','_','_','_','_','_','_','_'],
	['_','_','_','_','_','_','_','_','_','_'],
	['_','_','_','_','_','_','_','_','_','_'],
	['_','_','_','_','_','_','_','_','_','_'],
	['_','_','_','_','_','_','_','_','_','_'],
	['_','_','_','_','_','_','_','_','_','_'],
	['_','_','_','_','_','_','_','_','_','_']
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

var curX = 0;
var curY = 0;
var curPose = 0;
var piece;
var rotateLock = false;
var movementLock = false;
var movementInterval = 0.15;
var hAxis = 0;
var timer = null;

//===========================TODO==================================:
// FIX TIMER ISSUES
// SHOW NEXT PIECE
// COLORS
// SCORE
// INCREASE SPEED
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
// GET RIC
//=================================================================

function preload(){
	game.load.atlas('blocoatlas', 'img/blocoatlas.png', 'js/blocoatlas.json');
	game.load.json('tetraminosJSON', 'js/tetraminos.json')
}

function create(){
	createBlocos();
	tetraminos = game.cache.getJSON('tetraminosJSON');
	getPiece();

}

function update(){
	getInput();
	updateBoardDisplayed();
}

function getPiece(){
	piece = tetraminos.tetraminos[game.rnd.integerInRange(0, 6)];
	curPose = 0;
}

function blocoOn(x, y){ //lits bloco at positio x, y
	boardDisplay[y][x].frameName = 'ON';
}

function blocoOff(x, y){ 
	boardDisplay[y][x].frameName = 'OFF';
}

function createBlocos(){
	//create grid with blocos
	for(var i = 0; i < 10; i++){
		for(var j = 0; j < 20; j++){
			boardDisplay[j][i] = game.add.sprite(i * 32, j * 32, 'blocoatlas', 'OFF');
		}
	}
}

function updateBoardDisplayed(){
	for(var i = 0; i < 10; i++){
		for(var j = 0; j < 20; j++){
			if(board[j][i] == "_"){
				blocoOff(i, j);
			} else {
				blocoOn(i, j);
			}
		}
	}
}

function tick(){ //move piece a line down
	clearPiece();
	curY++;
	drawPiece();
}

function testTick(){
	if(testDrop()){
		tick();
	} else {
		testLineClear();
		newPiece();
		drawPiece();
	}
	setTimeout(testTick, 100);
}

function clearPiece(){
	for(var i = 0; i < 4; i++){
		if(piece.poses[curPose][i][0] + curX < 0 || piece.poses[curPose][i][1] + curY < 0){
			// do nothing
		} else if(piece.poses[curPose][i][0] + curX > 9 || piece.poses[curPose][i][1] + curY > 19){
			// do nothing
		} else {
			board[curY + piece.poses[curPose][i][1]][curX + piece.poses[curPose][i][0]] = "_";
		}
	}
}

function drawPiece(){
	for(var i = 0; i < 4; i++){
		if(piece.poses[curPose][i][0] + curX < 0 || piece.poses[curPose][i][1] + curY < 0){
			// do nothing
		} else if(piece.poses[curPose][i][0] + curX > 9 || piece.poses[curPose][i][1] + curY > 19){
			// do nothing
		} else {
			board[curY + piece.poses[curPose][i][1]][curX + piece.poses[curPose][i][0]] = "p";
		}
	}
}

function placeOnBoard(){
	for(var i = 0; i < 4; i++){
		if(piece.poses[curPose][i][0] + curX < 0 || piece.poses[curPose][i][1] + curY < 0){
			// do nothing
		} else if(piece.poses[curPose][i][0] + curX > 9 || piece.poses[curPose][i][1] + curY > 19){
			// do nothing
		} else {
			board[curY + piece.poses[curPose][i][1]][curX + piece.poses[curPose][i][0]] = "X";
		}
	}
}

function testDrop(){
	if(curY < 19){
		for(var i = 0; i < 4; i++){
			if(piece.poses[curPose][i][0] + curX < 0 || piece.poses[curPose][i][1] + curY < 0){
			// do nothing
		} else if(piece.poses[curPose][i][0] + curX > 9 || piece.poses[curPose][i][1] + curY > 19){
			// do nothing
		} else if(board[curY + piece.poses[curPose][i][1] + 1] [curX + piece.poses[curPose][i][0]] == "X"){
				return false;
			}
		}
	} else {
		return false;
	}
	return true;
}

function testMoveRight(){
	for(var i = 0; i < 4; i++){
		if(piece.poses[curPose][i][0] + curX + 1 < 10){
			if(curY + piece.poses[curPose][i][1] < 0){ //if offscreen
				//do nothing
			} else if(board[curY + piece.poses[curPose][i][1]] [curX + piece.poses[curPose][i][0] + 1] != "X"){
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

function testMoveLeft(){
	for(var i = 0; i < 4; i++){
		if(piece.poses[curPose][i][0] + curX - 1 > -1){
			if(curY + piece.poses[curPose][i][1] < 0){  //if offscreen
				//do nothing
			} else 	if(board[curY + piece.poses[curPose][i][1]] [curX - 1 + piece.poses[curPose][i][0]] != "X"){
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

function printBoard(){
	var line = "";
	for (var i = 0; i < 20; i++){
		line = i + " - ";
		for (var j = 0; j < 10; j++){
			line+= board[i][j];
		}
		console.log(line);
	}
}

function testRotateClockWise(){
	testPose = curPose++;
	if(testPose > 3){
		testPose = 0;
	}
	for(var i = 0; i < 4; i++){
		if(piece.poses[testPose][i][0] + curX > -1 || piece.poses[testPose][i][0] + curX < 10){
			if(board[curY + piece.poses[testPose][i][1]] [curX + piece.poses[testPose][i][0]] != "X"){
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

function testRotateCounterClockWise(){
	testPose = curPose++;
	if(testPose > 3){
		testPose = 0;
	}
	for(var i = 0; i < 4; i++){
		if(piece.poses[testPose][i][0] + curX > -1 || piece.poses[testPose][i][0] + curX < 10){
			if(board[curY + piece.poses[testPose][i][1]] [curX + piece.poses[testPose][i][0]] != "X"){
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

function rotateClockWise(){
	if(testRotateClockWise){
		clearPiece();
		curPose++;
		if(curPose > 3){
			curPose = 0;
		}
		drawPiece();
	} 
}

function rotateCounterClockWise(){
	if(rotateCounterClockWise()){
		clearPiece();
		curPose--;
		if(curPose < 0){
			curPose = 3;
		}
		drawPiece();
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
}

function unlockMovement(){
	movementLock = false;
	if(timer != null){
		game.time.events.remove(timer);
	}
	
}

function testLineClear(){
	for(var i=0; i < 20; i++){
		for(var j=0; j < 10; j++){
			lineCleared = true;
			if(board[i][j] == "_"){
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

function lineClear(lineNum){
	var prevLine;
	for(var i = lineNum; i > 0; i--){
		prevLine = i -1;
		for(var j=0; j< 10; j++){
			board[i][j] = board[prevLine][j];
		}
	}
	
	for(var i=0; i< 10; i++){
			board[0][i] = "_";
	}
	console.log("Line "+lineNum+" cleared");
}