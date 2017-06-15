var loadState = {
	preload: function(){
		var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill:'#ffffff'});
		//game.load.atlas('blocoatlas', 'img/blocoatlas.png', 'js/blocoatlas.json');
		game.load.atlas('blocoatlas', 'img/blocoatlas_v3.png', 'js/blocoatlas_v2.json');
		game.load.json('tetraminosJSON', 'js/tetraminos.json');
		game.load.image('board', 'img/bg1.png');
		console.log("images loaded");
		//bgs
		bgsNames = ["img/phaser_universe_bg.png", "img/bg_PROERD.png", "img/bg_PROERD2.png", "img/virgilio_pokemon_ghosts.png", "img/virgilio_master_sword.png","img/ratinho.png"];
		bgsTexts = ["Phaser Universe\nby Phaser", "Proerd\nby Nestablo Ramos", "Proerd2\nby Nestablo Ramos", "Pokemon Ghosts\nby Virgilio Silveira", "Master Sword\nby Virgilio Silveira", "Ratinho in space\nby Caio Marchi"];
		var bgsCount = bgsNames.length;
		for(var i=0; i < bgsCount; i++){
			game.load.image('bg'+i,bgsNames[i]);
		}
		console.log("bgs loaded");
		//load sounds
		console.log("loading sounds");
		game.load.audio('piecePlaced', 'snd/placed.ogg');
		game.load.audio('lineClear', 'snd/clear.ogg');
		game.load.audio('tetris', 'snd/tetris.ogg');
		game.load.audio('combo', 'snd/combo_ext.ogg');
		game.load.audio('move', 'snd/move.ogg');
		game.load.audio('rotate', 'snd/rotate.ogg');
		game.load.audio('hold', 'snd/hold.ogg');
		game.load.audio('theme-a', 'snd/themeA.ogg');
		console.log('sounds loaded');
	},

	create: function(){
		game.state.start('menu');
	}
};