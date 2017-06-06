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

function preload(){
	//game.load.image('bloco', 'img/bloco.png');
	//game.load.image('bloco_contorno', 'img/bloco_contorno.png');
	game.load.atlas('blocoatlas', 'img/blocoatlas.png', 'js/blocoatlas.json');
	game.load.json('tetraminosJSON', 'js/tetraminos.json')
}

function create(){
	createBlocos();
	tetraminos = game.cache.getJSON('tetraminosJSON');
	getPiece();

}

function update(){
	//eraseBlocos();
	//drawBlocos();
	//blocoOn(curX, curY);
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
	//printBoard();
	//drawBlocos();
}

function testTick(){
	if(testDrop()){
		tick();
	} else {
		newPiece();
		drawPiece();
		//printBoard();
	}
	setTimeout(testTick, 100);
}

function clearPiece(){
	//board[curY][curX] = "_";
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

function moveRight(){
	clearPiece();
	curX ++;
	drawPiece();
	movementLock = true;
	game.time.events.add(Phaser.Timer.SECOND * movementInterval, unlockMovement, this);
}

function moveLeft(){
	clearPiece();
	curX --;
	drawPiece();
	movementLock = true;
	game.time.events.add(Phaser.Timer.SECOND * movementInterval, unlockMovement, this);
}

function newPiece(){
	//moveRight();
	placeOnBoard();
	getPiece();
	curY = -1;
	curX = 4;
}

//test
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

function rotateClockWise(){
	clearPiece();
	curPose++;
	if(curPose > 3){
		curPose = 0;
	}
	drawPiece();
}

function rotateCounterClockWise(){
	clearPiece();
	curPose--;
	if(curPose < 0){
		curPose = 3;
	}
	drawPiece();
}

function getInput(){
	hAxis = 0;
	if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
		hAxis --;
	} else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
		hAxis++;
	} else {
		movementLock = false;
	}

	if(hAxis > 0){
		if(!movementLock){
			moveRight();
		}
	} else if(hAxis < 0){
		if(!movementLock){
			moveLeft();
		}
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
}