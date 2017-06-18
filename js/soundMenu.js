var soundMenuState = {
	create: function(){
		var titleLabel = game.add.text(80, 80, 'Sound/Music',
			{font: '50px Arial', fill:'#ffffff'});
		var buttonStyle = {font: '25px Arial', fill:'#080808'};

		btnBack = game.add.button(game.world.width / 2, (game.world.height / 2) + 180, 'big_button', goBack, this, 1, 2, 0);
		btnBack.anchor.setTo(0.5, 0.5);
		lblBack = game.add.text(game.world.width / 2, (game.world.height / 2) + 180, "Back", buttonStyle);
		lblBack.anchor.setTo(0.5, 0.5);
	}
};