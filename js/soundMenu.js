var musicValue = 0;
var fxValue = 0;

var curMusicVolume = 0;
var curFxVolume = 0;
var soundMenuState = {
	create: function(){
		music.stop();
		createSounds();
		music.loopFull(music.volume);
		var titleLabel = game.add.text(80, 80, 'Sound FX/Music',
			{font: '50px Arial', fill:'#ffffff'});
		var buttonStyle = {font: '25px Arial', fill:'#080808'};
		var labelStyle = {font: '25px Arial', fill:'#ffffff'};
		var musicLabel = game.add.text(game.world.width / 5, 200, "Music", labelStyle);
		musicLabel.anchor.setTo(0.5, 0.5);
		var fxLabel = game.add.text(game.world.width / 5 ,300, "Sound FX", labelStyle);
		fxLabel.anchor.setTo(0.5, 0.5);
		var valueStyle = {font: '25px Arial', fill:'#ffffff'};
		musicValue = game.add.text(140, (game.world.height / 2), "70%", valueStyle);
		musicValue.anchor.setTo(0.5, 0.5);
		fxValue = game.add.text(140, (game.world.height / 2) + 100, "70%", valueStyle);
		fxValue.anchor.setTo(0.5, 0.5);

		//Music
		btnMusicMinus= game.add.button( 50, (game.world.height / 2), 'button', musicMinusButton, this, 1, 2, 0);
		btnMusicMinus.anchor.setTo(0.5, 0.5);
		lblMusicMinus = game.add.text(50 , (game.world.height / 2), "-", buttonStyle);
		lblMusicMinus.anchor.setTo(0.5, 0.5);

		btnMusicPlus = game.add.button((game.world.width / 2) - 100, (game.world.height / 2), 'button', musicPlusButton, this, 1, 2, 0);
		btnMusicPlus.anchor.setTo(0.5, 0.5);
		lblMusicPlus = game.add.text((game.world.width / 2) - 100, (game.world.height / 2), "+", buttonStyle);
		lblMusicPlus.anchor.setTo(0.5, 0.5);
		//Sound FX
		btnFxMinus= game.add.button( 50, (game.world.height / 2) + 100, 'button', fxMinusButton, this, 1, 2, 0);
		btnFxMinus.anchor.setTo(0.5, 0.5);
		lblFxMinus = game.add.text(50 , (game.world.height / 2) + 100, "-", buttonStyle);
		lblFxMinus.anchor.setTo(0.5, 0.5);

		btnFxPlus = game.add.button((game.world.width / 2) - 100, (game.world.height / 2) + 100, 'button', fxPlusButton, this, 1, 2, 0);
		btnFxPlus.anchor.setTo(0.5, 0.5);
		lblFxPlus = game.add.text((game.world.width / 2) - 100, (game.world.height / 2) + 100, "+", buttonStyle);
		lblFxPlus.anchor.setTo(0.5, 0.5);

		//save / cancel
		saveCancelStyle = {font: '18px Arial', fill:'#080808'};
		tmpX = (game.world.width / 2) - 50;
		tmpY = (game.world.height / 2) + 200;
		btnSave = btnSettings = game.add.button(tmpX, tmpY, 'medium_button', saveAudioSettings, this, 1, 2, 0);
		btnSave.anchor.setTo(0.5, 0.5);
		lblSave = game.add.text(tmpX, tmpY + 4, "SAVE", saveCancelStyle);
		lblSave.anchor.setTo(0.5, 0.5);

		tmpX = (game.world.width / 2) + 50;
		btnCancel = btnSettings = game.add.button(tmpX, tmpY, 'medium_button', cancelSoundSettings, this, 1, 2, 0);
		btnCancel.anchor.setTo(0.5, 0.5);
		lblCancel = game.add.text(tmpX, tmpY + 4, "CANCEL", saveCancelStyle);
		lblCancel.anchor.setTo(0.5, 0.5);

		updateLabels();
	}
};

function updateLabels(){
	mVol = Math.round(music.volume * 10) / 10;
	fVol = Math.round(fxMove.volume * 10) / 10;

	musicValue.text = (mVol * 100) + "%";
	fxValue.text = (fVol * 100) + "%";
}

function musicMinusButton(){
	curMusicVolume = music.volume;
	if(curMusicVolume > 0){
		curMusicVolume -= 0.1;
		setMusicVolume(curMusicVolume);
		updateLabels();
	}
}

function musicPlusButton(){
	console.log(typeof(music.volume));
	curMusicVolume = music.volume;
	if(curMusicVolume < 1){
		curMusicVolume += 0.1;
		setMusicVolume(curMusicVolume);
		updateLabels();
	}
}

function fxMinusButton(){
	curFxVolume = fxMove.volume;
	if(curFxVolume > 0){
		curFxVolume -= 0.1;
		fxMove.volume = curFxVolume;
	}
	fxMove.play();
	updateLabels();
}

function fxPlusButton(){
	curFxVolume = fxMove.volume;
	if(curFxVolume < 1){
		curFxVolume += 0.1;
		fxMove.volume = curFxVolume;
	}
	fxMove.play();
	updateLabels();
}

function cancelSoundSettings(){
	music.stop();
	goBack();
}

function saveAudioSettings(){
	saveSoundSettings(music.volume, fxMove.volume, music.name);
	music.stop();
	goBack();
}
