var menuState = {
	create: function(){
		var titleLabel = game.add.text(80, 80, 'Tetris by Caio Marchi\nPowered by Phaser.js',
			{font: '50px Arial', fill:'#ffffff'});
		var startLabel = game.add.text(80, game.world.height - 80, '- Press Space to start -',
			{font: '25px Arial', fill:'#ffffff'});
		var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.addOnce(this.start, this);
	},
	start: function(){
		console.log("Play State Activated");
		game.state.start('singlePlayerPrep');
	}
};