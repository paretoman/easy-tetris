var bootState = {
	create: function(){
		//Physics initiation
		//game.physics.startSystem(Phaser.Physics.ARCADE);
		if(localStorage.firstRun != "DONE"){
			console.log("fist run");
			firstRun();
		}
		game.state.start('load');
	}
};