var creditsState = {

	create: function(){
		drawPatternBG("#008800", "552255");
		var buttonStyle = getStyle("button_regular");
		var titleLabel = game.add.text(80, 80, 'Tetris\nby Caio marchi\nCreated by Alexey Pajitnov', getStyle("text_bigger"));

		btnBack = game.add.button(game.world.width / 2, (game.world.height / 2) + 180, 'big_button', goBack, this, 1, 2, 0);
		btnBack.anchor.setTo(0.5, 0.5);
		lblBack = game.add.text(game.world.width / 2, (game.world.height / 2) + 180, getText("Standard", 2), buttonStyle);
		lblBack.anchor.setTo(0.5, 0.5);
	}
};
