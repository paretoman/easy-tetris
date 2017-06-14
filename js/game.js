//var game = new Phaser.Game(640, 480, Phaser.AUTO, '', {preload: preload, create: create, update: update});
var game = new Phaser.Game(640, 480, Phaser.AUTO, 'gameDiv');

//Global Variables
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

var board;

var boardDisplay;
var nextWindow;

var holdWindow;
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

var gameover;
var softDrop;
var hardDrop;
var hardDropLock;
var cleaningLines;
var waitingLineClear;
var holdLock;

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('play', playState);
game.state.add('singlePlayerPrep', singlePlayerPrepState);
game.state.add('menu', menuState);
game.state.add('gameover', gameoverState);

game.state.start('boot');