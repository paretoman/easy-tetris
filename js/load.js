var loadState = {
	preload: function(){
		var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill:'#ffffff'});
		game.load.atlas('blocoatlas', 'img/blocoatlas_v3.png', 'js/blocoatlas_v2.json');
		game.load.json('tetraminosJSON', 'js/tetraminos.json');
		game.load.image('board', 'img/bg1.png');
		game.load.spritesheet('button', 'img/Button.png', 46, 46);
		game.load.spritesheet('medium_button', 'img/medium_button.png', 92, 46);
		game.load.spritesheet('big_button', 'img/big_button.png', 276, 46);
		//bgs
		bgsNames = ["img/phaser_universe_bg.png", "img/bg_PROERD.png", "img/Kremlin.png", "img/virgilio_pokemon_ghosts.png", "img/virgilio_master_sword.png","img/ratinho.png"];
		bgsTexts = ["Phaser Universe\nby Phaser", "Proerd\nby Nestablo Ramos", "Kremlin's\nSurveillance Regime\nby Bruno Moraes", "Pokemon Ghosts\nby Virgilio Silveira", "Master Sword\nby Virgilio Silveira", "Ratinho in space\nby Caio Marchi"];
		var bgsCount = bgsNames.length;
		for(var i=0; i < bgsCount; i++){
			game.load.image('bg'+i,bgsNames[i]);
		}
		//load sounds
		game.load.audio('piecePlaced', 'snd/placed.ogg');
		game.load.audio('lineClear', 'snd/clear.ogg');
		game.load.audio('tetris', 'snd/tetris.ogg');
		game.load.audio('combo', 'snd/combo_ext.ogg');
		game.load.audio('move', 'snd/move.ogg');
		game.load.audio('rotate', 'snd/rotate.ogg');
		game.load.audio('hold', 'snd/hold.ogg');
		game.load.audio('theme-a', 'snd/themeA.ogg');
	},

	create: function(){
		game.state.start('menu');
	}
};