var gameoverState = {
	create: function(){
		resetNav();
		music.stop();
		var gameoverLabel = game.add.text(80, 80, 'G A M E    O V E R',
			{font: '50px Arial', fill:'#ffffff'});
		var finalScoreLabel = game.add.text(80, game.world.height - 240, 'Score: '+ curScore,
			{font: '25px Arial', fill:'#ffffff'});
		var finalLevelLabel = game.add.text(80, game.world.height - 200, 'Level: '+ level,
			{font: '25px Arial', fill:'#ffffff'});
		var finalLinesLabel = game.add.text(80, game.world.height - 160, 'Lines: ' + lineCount,
			{font: '25px Arial', fill:'#ffffff'});
		var goToMainMenuLabel = game.add.text(80, game.world.height - 320, '- Press ENTER to Main Menu -',
			{font: '25px Arial', fill:'#ffffff'});

		var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		enterKey.onDown.addOnce(this.start, this);

		if(submitScore(curScore) == 0){
			showNewHighscore();
		}
	},
	start: function(){
		game.state.start('menu');
	}
}

function showNewHighscore(){
	var finalLinesLabel = game.add.text(80, game.world.height - 280, "New Highscore!",
			{font: '25px Arial', fill:'#cc5555'});
	name = prompt("You got a highscore! Type your Name: ", "");if (name) {updatePlayerName(name);updateLeaderboard();}
}