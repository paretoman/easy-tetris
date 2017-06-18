var leaderboardState = {
	create: function(){
		var titleLabel = game.add.text(80, 80, 'Leaderboard',
			{font: '50px Arial', fill:'#ffffff'});
		var buttonStyle = {font: '25px Arial', fill:'#080808'};
		var boardStyle = {font: '25px Arial', fill:'#ffffff'};
		getLeaderboard();
		leader0 = game.add.text(game.world.width / 2, (game.world.height / 2) - 50, leaderNames[0] + " - " + highscores[0], boardStyle);
		leader0.anchor.setTo(0.5, 0.5);
		leader1 = game.add.text(game.world.width / 2, (game.world.height / 2) - 10, leaderNames[1] + " - " + highscores[1], boardStyle);
		leader1.anchor.setTo(0.5, 0.5);
		leader2 = game.add.text(game.world.width / 2, (game.world.height / 2) + 30, leaderNames[2] + " - " + highscores[2], boardStyle);
		leader2.anchor.setTo(0.5, 0.5);
		leader3 = game.add.text(game.world.width / 2, (game.world.height / 2) + 70, leaderNames[3] + " - " + highscores[3], boardStyle);
		leader3.anchor.setTo(0.5, 0.5);
		leader4 = game.add.text(game.world.width / 2, (game.world.height / 2) + 110, leaderNames[4] + " - " + highscores[4], boardStyle);
		leader4.anchor.setTo(0.5, 0.5);

		btnBack = game.add.button(game.world.width / 2, (game.world.height / 2) + 180, 'big_button', goBack, this, 1, 2, 0);
		btnBack.anchor.setTo(0.5, 0.5);
		lblBack = game.add.text(game.world.width / 2, (game.world.height / 2) + 180, "Back", buttonStyle);
		lblBack.anchor.setTo(0.5, 0.5);
	}
};