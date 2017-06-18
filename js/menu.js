var menuState = {
	create: function(){
		resetNav();
		var titleLabel = game.add.text(80, 80, 'Tetris by Caio Marchi\nPowered by Phaser.js',
			{font: '50px Arial', fill:'#ffffff'});
		var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		var buttonStyle = {font: '25px Arial', fill:'#080808'};

		enterKey.onDown.addOnce(this.start, this);

		btnNewGame = game.add.button(game.world.width / 2, game.world.height / 2, 'big_button', function(){show('singlePlayerPrep')}, this, 1, 2, 0);
		btnNewGame.anchor.setTo(0.5, 0.5);
		lblNewGame = game.add.text(game.world.width / 2, game.world.height / 2, "New Game", buttonStyle);
		lblNewGame.anchor.setTo(0.5, 0.5);

		btnSettings = game.add.button(game.world.width / 2, (game.world.height / 2) + 60, 'big_button', function(){show('settings')}, this, 1, 2, 0);
		btnSettings.anchor.setTo(0.5, 0.5);
		lblSettings = game.add.text(game.world.width / 2, (game.world.height / 2) + 60, "Settings", buttonStyle);
		lblSettings.anchor.setTo(0.5, 0.5);

		btnLeaderboard = game.add.button(game.world.width / 2, (game.world.height / 2) + 120, 'big_button', function(){show('leaderboard')}, this, 1, 2, 0);
		btnLeaderboard.anchor.setTo(0.5, 0.5);
		lblLeaderboard = game.add.text(game.world.width / 2, (game.world.height / 2) + 120, "Leaderboard", buttonStyle);
		lblLeaderboard.anchor.setTo(0.5, 0.5);

		btnCredits = game.add.button(game.world.width / 2, (game.world.height / 2) + 180, 'big_button', function(){show('credits')}, this, 1, 2, 0);
		btnCredits.anchor.setTo(0.5, 0.5);
		lblCredits = game.add.text(game.world.width / 2, (game.world.height / 2) + 180, "Credits", buttonStyle);
		lblCredits.anchor.setTo(0.5, 0.5);
		
	},
	start: function(){
		game.state.start('singlePlayerPrep');
	}
};