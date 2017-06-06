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
//var piece = T;
/*
var piece = {
	blocos:[
		[0,0],
		[0,-1],
		[0,-2],
		[0,-3]
	]
};
*/

var piece;

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