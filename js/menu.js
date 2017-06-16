var menuState = {
	create: function(){
		var titleLabel = game.add.text(80, 80, 'Tetris by Caio Marchi\nPowered by Phaser.js',
			{font: '50px Arial', fill:'#ffffff'});
		var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		var buttonStyle = {font: '25px Arial', fill:'#080808'};

		enterKey.onDown.addOnce(this.start, this);

		btnNewGame = game.add.button(game.world.width / 2, game.world.height / 2, 'big_button', newGame, this, 1, 2, 0);
		btnNewGame.anchor.setTo(0.5, 0.5);
		lblNewGame = game.add.text(game.world.width / 2, game.world.height / 2, "New Game", buttonStyle);
		lblNewGame.anchor.setTo(0.5, 0.5);

		btnSettings = game.add.button(game.world.width / 2, (game.world.height / 2) + 60, 'big_button', settings, this, 1, 2, 0);
		btnSettings.anchor.setTo(0.5, 0.5);
		lblSettings = game.add.text(game.world.width / 2, (game.world.height / 2) + 60, "Settings", buttonStyle);
		lblSettings.anchor.setTo(0.5, 0.5);

		btnCredits = game.add.button(game.world.width / 2, (game.world.height / 2) + 120, 'big_button', credits, this, 1, 2, 0);
		btnCredits.anchor.setTo(0.5, 0.5);
		lblCredits = game.add.text(game.world.width / 2, (game.world.height / 2) + 120, "Credits", buttonStyle);
		lblCredits.anchor.setTo(0.5, 0.5);
		
	},
	start: function(){
		console.log("Play State Activated");
		game.state.start('singlePlayerPrep');
	}
};

function newGame(){
	game.state.start('singlePlayerPrep');
}

function settings(){
	game.state.start('settings');
}

function credits(){
	game.state.start('credits');
}