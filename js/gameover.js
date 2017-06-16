var gameoverState = {
	create: function(){
		music.stop();
		var gameoverLabel = game.add.text(80, 80, 'G A M E    O V E R',
			{font: '50px Arial', fill:'#ffffff'});
		var finalScoreLabel = game.add.text(80, game.world.height - 240, 'Score: '+ curScore,
			{font: '25px Arial', fill:'#ffffff'});
		var finalLevelLabel = game.add.text(80, game.world.height - 160, 'Level: '+ level,
			{font: '25px Arial', fill:'#ffffff'});
		var finalLinesLabel = game.add.text(80, game.world.height - 80, 'Lines: ' + lineCount,
			{font: '25px Arial', fill:'#ffffff'});
		var goToMainMenuLabel = game.add.text(80, game.world.height - 320, '- Press ENTER to Main Menu -',
			{font: '25px Arial', fill:'#ffffff'});

		var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		enterKey.onDown.addOnce(this.start, this);
	},
	start: function(){
		game.state.start('menu');
	}
}