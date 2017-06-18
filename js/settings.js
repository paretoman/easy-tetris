var settingsState = {
	create: function(){
		var titleLabel = game.add.text(80, 80, 'Settings',
			{font: '50px Arial', fill:'#ffffff'});
		var buttonStyle = {font: '25px Arial', fill:'#080808'};
		btnNewGame = game.add.button(game.world.width / 2, game.world.height / 2, 'big_button', function (){show('changeBgSt')}, this, 1, 2, 0);
		btnNewGame.anchor.setTo(0.5, 0.5);
		lblNewGame = game.add.text(game.world.width / 2, game.world.height / 2, "Change Background", buttonStyle);
		lblNewGame.anchor.setTo(0.5, 0.5);

		btnSettings = game.add.button(game.world.width / 2, (game.world.height / 2) + 60, 'big_button', function(){show('soundMenu')}, this, 1, 2, 0);
		btnSettings.anchor.setTo(0.5, 0.5);
		lblSettings = game.add.text(game.world.width / 2, (game.world.height / 2) + 60, "Sound/Music", buttonStyle);
		lblSettings.anchor.setTo(0.5, 0.5);

		btnCredits = game.add.button(game.world.width / 2, (game.world.height / 2) + 120, 'big_button', function(){show('controls')}, this, 1, 2, 0);
		btnCredits.anchor.setTo(0.5, 0.5);
		lblCredits = game.add.text(game.world.width / 2, (game.world.height / 2) + 120, "Controls", buttonStyle);
		lblCredits.anchor.setTo(0.5, 0.5);

		btnBack = game.add.button(game.world.width / 2, (game.world.height / 2) + 180, 'big_button', goBack, this, 1, 2, 0);
		btnBack.anchor.setTo(0.5, 0.5);
		lblBack = game.add.text(game.world.width / 2, (game.world.height / 2) + 180, "Back", buttonStyle);
		lblBack.anchor.setTo(0.5, 0.5);
		
	}
};