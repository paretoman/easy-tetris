var creditsState = {

	create: function(){
		drawPatternBG("#ffffff", "#999999");
		game.add.nineSlice(5, 5, "sliced_panel", "sliced_panel", 205,470);
		game.add.nineSlice(216, 5, "sliced_panel", "sliced_panel", 205,470);
		game.add.nineSlice(427, 5, "sliced_panel", "sliced_panel", 205,470);
		logo = game.add.sprite(15, 10, 'logo', );
		decoIN = "\n-=";
		decoOUT = "=-";

		panel1Text = decoIN+"PROGRAMMER\nCaio Marchi\n"+decoIN+"TOOLS\nSublime Text 3\nSourceTree\nGimp 2\nAudacity\n"+decoIN+"RESOURCES\nBitBucket\nPhaser.js\nPhaser Nine Slice";
		panel1 = game.add.text(0, 0, panel1Text, getStyle("credits"));
	    panel1.setTextBounds(9, 130, 201, 336);

	    panel2Text = decoIN+"ART\n1. Phaser Universe - Phaser\n2. PROERD - Nestablo Ramos\n3. Kremlin's Surveillance - Bruno Moraes\n4. Pokemon Ghosts - Virgilio Silveira\n5. Master Sword - Virgilio Silveira\n6. Ratinho in Space - Caio Marchi\n"+decoIN+"SPRITE ARTIST\nCaio Marchi\n"+decoIN+"MENU DESIGN\nCaio Marchi\n"+decoIN+"FONTS\n1. Exo - Natanael Gama\n2. MartelSans - Dan Reynolds + Mathieu Reguer";
		panel2 = game.add.text(0, 0, "", getStyle("credits"));
		panel2.setTextBounds(220, -10, 205, 481);
		panel2.text = panel2Text;

	    panel3Text = decoIN+"SPECIAL THANKS\nRichard Davey(Phaser creator)\nKaty's Code(How to Code a T-spin)\nTetris Wikia\nHTML 5 Game Devs (Forum)\n"+decoIN+"MUSIC\n1.Boa Noite Vizinhanca -Fabio Lima\n2. Tetris Acapella Theme A -Smooth McGroove\n\nTETRIS was created by Alexey Pajitnov\n\nThis is a fan-made game created for non-commercial use";
		panel3 = game.add.text(0, 0, "", getStyle("credits"));
	    panel3.setTextBounds(431, -10, 205, 481);
	    panel3.text = panel3Text;




		var buttonStyle = getStyle("button_regular");
		btnBack = game.add.button(532, (game.world.height / 2) + 195, 'medium_button', goBack, this, 1, 2, 0);
		btnBack.anchor.setTo(0.5, 0.5);
		lblBack = game.add.text(532, (game.world.height / 2) + 198, getText("Standard", 2), buttonStyle);
		lblBack.anchor.setTo(0.5, 0.5);
	}
};
