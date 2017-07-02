var creditsState = {

	create: function(){
		var buttonStyle = {font: '25px Arial', fill:'#080808'};
		var titleLabel = game.add.text(80, 80, 'Tetris\nby Caio marchi\nCreated by Alexey Pajitnov',
			{font: '40px Arial', fill:'#ffffff'});

		btnBack = game.add.button(game.world.width / 2, (game.world.height / 2) + 180, 'big_button', goBack, this, 1, 2, 0);
		btnBack.anchor.setTo(0.5, 0.5);
		lblBack = game.add.text(game.world.width / 2, (game.world.height / 2) + 180, getText("Standard", 2), buttonStyle);
		lblBack.anchor.setTo(0.5, 0.5);
	}
};