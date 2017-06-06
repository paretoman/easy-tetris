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
var piece;

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
	updateBoardDisplayed();
}

function getPiece(){
	piece = tetraminos.tetraminos[0].poses[0];
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

function init (){
	//setInterval(testTick, 500);
	getPiece();
}

function tick(){ //move piece a line down
	clearPiece();
	curY++;
	drawPiece();
	//printBoard();
	//drawBlocos();
}

function testTick(){
	if(curY < 19){
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
		if(piece[i][0] + curX < 0 || piece[i][1] + curY < 0){
			// do nothing
		} else if(piece[i][0] + curX > 9 || piece[i][1] + curY > 19){
			// do nothing
		} else {
			board[curY + piece[i][1]][curX + piece[i][0]] = "_";
		}
	}
}

function drawPiece(){
	for(var i = 0; i < 4; i++){
		if(piece[i][0] + curX < 0 || piece[i][1] + curY < 0){
			// do nothing
		} else if(piece[i][0] + curX > 9 || piece[i][1] + curY > 19){
			// do nothing
		} else {
			board[curY + piece[i][1]][curX + piece[i][0]] = "X";
		}
	}
}

function moveRight(){
	clearPiece();
	curX ++;
	drawPiece();
}

function moveLeft(){
	clearPiece();
	curX --;
	drawPiece();
}

function newPiece(){
	moveRight();
	getPiece();
	curY = 0;
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