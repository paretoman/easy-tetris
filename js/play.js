var playState = {
	create: function(){
		resetNav();
		initKeys();
		bg = game.add.sprite(0, 0, 'bg'+curBg);
		game.add.sprite(0, 0, 'board');
		createBoardDisplay();
		createNextWindow();
		createHoldWindow();
		tetraminos = game.cache.getJSON('tetraminosJSON');
		initPieces();
		createTexts();
		createSounds();
		music.loopFull(music.volume);
		//music.volume = 0.2; //testing purposes
		testTick();
	},

	update: function(){
		if(!gameover){
			if(cleaningLines){
				if(!waitingLineClear){
					waitingLineClear = true;

					lineClearTimer = game.time.events.loop(Phaser.Timer.SECOND * lineClearInterval / 1000, lineClear, this);
					if(lastValidMoveWasASpin && lastPieceIndex==0 && testTSpin()){ //if it is a t, if the last valid move was a rotation and if the t-spin verification is OK
						score(tSpinPts[linesToClear.length - 1] * level + (comboIncrement * curCombo));
					} else {
						score(lineClearPts[linesToClear.length - 1] * level + (comboIncrement * curCombo));
					}
					if(curCombo > 0){
						fxCombo.play();
					}
					curCombo += 1;
					if(linesToClear.length == 4){
						fxTetris.play();
					} else {
						fxLineClear.play();
					}
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
			game.state.start('gameover');
			clearNextWindow();
			clearBoardDisplay();
			softDrop = false;
		}
	}
};

function blocoOff(x, y){ 
	boardDisplay[y][x].frameName = 'OFF';
}

function blocoOn(x, y){ //lits bloco at position x, y
	var colorIndex = board[y][x];
	if(colorIndex == -2){
		boardDisplay[y][x].frameName = 'GHOST';
	} else {
		colorIndex -= 10;
		if(colorIndex < 0){
			colorIndex += 10;
		}
		boardDisplay[y][x].frameName = blocosColors[colorIndex];
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
	for(i = 0; i < 10; i++){
		board[0][i] = -1;
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
		}
	}
}

function createHoldWindow(){
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 4; j++){
			holdWindow[j][i] = game.add.sprite(HOLD_WINDOW_OFFSET_HORIZONTAL + (i * BLOCK_SIDE) , HOLD_WINDOW_OFFSET_VERTICAL + (j * BLOCK_SIDE), 'blocoatlas', 'OFF');
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
		}
		nextMargin = 0;
	}
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
	//if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
		if(game.input.keyboard.isDown(userKeys[0])){
		hAxis --;
	} else if(game.input.keyboard.isDown(userKeys[1])){
		hAxis++;
	} else {
		unlockMovement();
		movementDelayLock = false;
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
		movementDelayLock = false;
	}
	
	if(game.input.keyboard.isDown(userKeys[2])){
		if(!rotateLock){
			rotateClockWise();
			rotateLock = true;
		}
	} else if(game.input.keyboard.isDown(userKeys[3])){
		if(!rotateLock){
			rotateCounterClockWise();
			rotateLock = true;
		}
	} else {
		rotateLock = false;
	}

	

	if(game.input.keyboard.isDown(userKeys[4])){
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

	if(game.input.keyboard.isDown(userKeys[5])){
		if (!hardDropLock){
			hardDropLock = true;
			hardDrop = true;
			lastValidMoveWasASpin = false;
		}
	} else {
		if(hardDropLock){
			hardDropLock = false;
		}
	}

	if(game.input.keyboard.isDown(userKeys[6])){
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
	nextPieceIndex[2] = pieceQueue.pop();

	nextPiece[0] = nextPiece[1];
	nextPiece[1] = nextPiece[2];
	nextPiece[2] = tetraminos.tetraminos[nextPieceIndex[2]];
	
	curPose = 0;

	if(pieceQueue.length == 0){
		fillPieceQueue();
	}
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
	fxHold.play();
}

function fillPieceQueue(){
	pieceQueue = [];
	while(pieceQueue.length < 7){
		test = game.rnd.integerInRange(0, 6);
		count = 0;
		for(i = 0; i<pieceQueue.length;i++){
			if(pieceQueue[i] == test){
				count++;
				break;
			}
		}
		if(count == 0){
			pieceQueue.push(test);
		}
	}
}

function initPieces(){
	fillPieceQueue();
	pieceIndex = pieceQueue.pop();
	piece = tetraminos.tetraminos[pieceIndex];
	for(var i = 0; i < 3; i++){
		nextPieceIndex[i] = pieceQueue.pop();
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



function moveRight(){
	if(testMoveRight()){
		clearPiece();
		curX ++;
		drawPiece();
	}
	unlockMovement();
	interval = 0;
	if(movementDelayLock){
		interval = movementInterval;
	} else {
		interval = movementIntervalDelay;
		movementDelayLock = true;
	}
	movementLock = true;
	timer = game.time.events.loop(Phaser.Timer.SECOND * interval, unlockMovement, this);
	fxMove.play();
}

function moveLeft(){
	if(testMoveLeft()){
		clearPiece();
		curX --;
		drawPiece();
	}	
	unlockMovement();
	interval = 0;
	if(movementDelayLock){
		interval = movementInterval;
	} else {
		interval = movementIntervalDelay;
		movementDelayLock = true;
	}
	movementLock = true;
	timer = game.time.events.loop(Phaser.Timer.SECOND * interval, unlockMovement, this);
	fxMove.play();
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
	fxPiecePlaced.play();
	lastX = curX;
	lastY= curY;
	lastPieceIndex = pieceIndex;
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
		fxRotate.play();
	} else if(!testWallKicks(true)){
		if(curY +1 <= MAX_INDEX_VERTICAL){
			if(testRotateClockWise(curX, curY + 1)){ //test down kick
				clearPiece();
				curY++;
				curPose++;
				if(curPose > 3){
					curPose = 0;
				}
				drawPiece();
				fxRotate.play();
			}
		}
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
		fxRotate.play();
	} else if(!testWallKicks(false)){
		if(curY +1 <= MAX_INDEX_VERTICAL){
			if(testRotateCounterClockWise(curX, curY + 1)){ //test down kick
				clearPiece();
				curY++;
				curPose++;
				if(curPose > 3){
					curPose = 0;
				}
				drawPiece();
				fxRotate.play();
			} else {
				testWallKicksDownKicked(false);
			}
		}
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
			return false;
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
			return false;
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
	lastValidMoveWasASpin = false;
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
	lastValidMoveWasASpin = false;
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
			if(tmpX > MAX_INDEX_HORIZONTAL || tmpX < 0){
				return false;
			}
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
	lastValidMoveWasASpin = true;
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
		if(tmpY < 0){
			if(tmpX > MAX_INDEX_HORIZONTAL || tmpX < 0){
				return false;
			}
		} else {
			if(tmpX > -1 && tmpX < MAX_BLOCK_COUNT_HORIZONTAL && tmpY < MAX_BLOCK_COUNT_VERTICAL){
				if(board[tmpY][tmpX] >= 10){
					return false;
				}
			} else {
				return false;
			}
		}
	}
	lastValidMoveWasASpin = true;
	return true;
}

function testTick(){
	if(testDrop()){
		lastValidMoveWasASpin = false;
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

function testTSpin(){
	occupied = 0;
	tmpX = lastX -1;
	tmpY = lastY -1;
	if(board[tmpY][tmpX] >= 10){
		occupied++;
	}

	tmpX = lastX -1;
	tmpY = lastY +1;
	if(tmpY > MAX_INDEX_VERTICAL){
		occupied++;
	} else 	if(board[tmpY][tmpX] >= 10){
		occupied++;
	}

	tmpX = lastX +1;
	tmpY = lastY -1;
	if(board[tmpY][tmpX] >= 10){
		occupied++;
	}

	tmpX = lastX +1;
	tmpY = lastY +1;
	if(tmpY > MAX_INDEX_VERTICAL){
		occupied++;
	} else if(board[tmpY][tmpX] >= 10){
		occupied++;
	}

	if(occupied >=3){
		return true;
	}
	return false;
}

function testWallKicks(clockWise){
	var poseIncrement = 0;
	var kicked = false;
	if(clockWise){
		poseIncrement = 1;
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
					curPose += poseIncrement;
					kicked = true;
					break;
				}
			}
		}
	} else {
		poseIncrement = -1;
		for(var i = 1; i<= 2; i++){ //left wall kick
			if(testRotateCounterClockWise(curX + i, curY)){ 
				clearPiece();
				curX += i;
				curPose += poseIncrement;
				kicked = true;
				break;
			}
		}
		if(!kicked){
			for(var i = -1; i>= -2; i--){ //right wall kick
				if(testRotateCounterClockWise(curX + i, curY)){ 
					clearPiece();
					curX += i;
					curPose += poseIncrement;
					kicked = true;
					break;
				}
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
	if(kicked){
		fxRotate.play();
		return true;
	}
	return false;
}

function testWallKicksDownKicked(clockWise){
	var poseIncrement = 0;
	var kicked = false;
	tmpY = curY +1;
	if(clockWise){
		poseIncrement = 1;
		for(var i = 1; i<= 2; i++){ //left wall kick
			if(testRotateClockWise(curX + i, tmpY)){ 
				clearPiece();
				curX += i;
				curY += 1;
				curPose += poseIncrement;
				kicked = true;
				break;
			}
		}
		if(!kicked){
			for(var i = -1; i>= -2; i--){ //right wall kick
				if(testRotateClockWise(curX + i, tmpY)){ 
					clearPiece();
					curX += i;
					curY += 1;
					curPose += poseIncrement;
					kicked = true;
					break;
				}
			}
		}
	} else {
		poseIncrement = -1;
		for(var i = 1; i<= 2; i++){ //left wall kick
			if(testRotateCounterClockWise(curX + i, tmpY)){ 
				clearPiece();
				curX += i;
				curY += 1;
				curPose += poseIncrement;
				kicked = true;
				break;
			}
		}
		if(!kicked){
			for(var i = -1; i>= -2; i--){ //right wall kick
				if(testRotateCounterClockWise(curX + i, tmpY)){ 
					clearPiece();
					curX += i;
					curY += 1;
					curPose += poseIncrement;
					kicked = true;
					break;
				}
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
	if(kicked){
		fxRotate.play();
		return true;
	}
	return false;
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
	var offsetX = 1;
	var offsetY = 2;
	clearHoldWindow();
	for(var i = 0; i < 4; i++){
		var blocoX = (holdPiece.poses[0][i][0]) + offsetX;
		var blocoY = (holdPiece.poses[0][i][1]) + offsetY;
		holdWindow[blocoY][blocoX].frameName = blocosColors[holdPieceIndex];
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
	var offsetX = 1;
	var offsetY = 2;
	clearNextWindow();
	for(var j = 0; j < 3; j++ ){ //next piece index
		for(var i = 0; i < 4; i++){ //piece blocks
			var blocoX = (nextPiece[j].poses[0][i][0]) + offsetX;
			var blocoY = (nextPiece[j].poses[0][i][1]) + (offsetY + (j*4));
			nextWindow[blocoY][blocoX].frameName = blocosColors[nextPieceIndex[j]];
		}
	}
}

function updateTickSpeed(){
	if(lineCount  >= speedUpGoal){
		tickInterval *= 0.75;
		speedUpGoal += 10;
		level++;
		updateLabelLevel();
	}
}

function initKeys(){

}