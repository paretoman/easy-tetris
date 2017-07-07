var gameoverState = {
	create: function(){
		drawPatternBG("#222222", "#444444");
		resetNav();
		music.stop();
		var gameoverLabel = game.add.text(80, 80, getText("Gameover", 0),
			{font: '50px Arial', fill:'#ffffff'});
		var finalScoreLabel = game.add.text(80, game.world.height - 240, getText("Gameover", 3) + curScore,
			{font: '25px Arial', fill:'#ffffff'});
		var finalLevelLabel = game.add.text(80, game.world.height - 200, getText("Gameover", 4) + level,
			{font: '25px Arial', fill:'#ffffff'});
		var finalLinesLabel = game.add.text(80, game.world.height - 160, getText("Gameover", 5) + lineCount,
			{font: '25px Arial', fill:'#ffffff'});
		var goToMainMenuLabel = game.add.text(80, game.world.height - 320, getText("Gameover", 1),
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
	var finalLinesLabel = game.add.text(80, game.world.height - 280, getText("Gameover", 6),
			{font: '25px Arial', fill:'#cc5555'});
	name = prompt(getText("Gameover", 7), "");if (name) {updatePlayerName(name);updateLeaderboard();}
}
