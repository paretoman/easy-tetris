function setMusicVolume(value){
	value = Math.round(value * 10) / 10;
	console.log("music volume: " + value);
	music.volume = value;
}

function setFxVolume(value){
	value = Math.round(value * 10) / 10;
	console.log("fx volume: " + value);
	fxPiecePlaced.volume = value;
	fxLineClear.volume = value;
	fxTetris.volume = value;
	fxCombo.volume = value;
	fxMove.volume = value;
	fxRotate.volume = value;
	fxHold.volume = value;
}

function createSounds(){
	fxPiecePlaced = game.add.audio('piecePlaced');
	fxLineClear = game.add.audio('lineClear');
	fxTetris = game.add.audio('tetris');
	fxRotate = game.add.audio('rotate');
	fxCombo = game.add.audio('combo');
	fxMove = game.add.audio('move');
	fxHold = game.add.audio('hold');
	music = game.add.audio(getStoredTrack());

	music.volume = getStoredMusicVolume();

	fxVol = getStoredFxVolume();
	fxPiecePlaced.volume = fxVol;
	fxLineClear.volume = fxVol;
	fxTetris.volume = fxVol;
	fxRotate.volume = fxVol;
	fxCombo.volume = fxVol;
	fxMove.volume = fxVol;
	fxHold.volume = fxVol;
}

function saveSoundSettings(musicVol, fxVol, track){
	localStorage.setItem("musicVolume", musicVol);
	localStorage.setItem("fxVolume", fxVol);
	localStorage.setItem("musicTrack", track);
}

function getStoredTrack(){
	return localStorage.musicTrack;
}

function getStoredFxVolume(){
	return parseFloat(localStorage.fxVolume);
}

function getStoredMusicVolume(){
	return parseFloat(localStorage.musicVolume);
}