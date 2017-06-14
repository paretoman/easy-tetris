var bootState = {
	create: function(){
		//Physics initiation
		//game.physics.startSystem(Phaser.Physics.ARCADE);
		game.state.start('load');
	}
};