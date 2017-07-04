var bootState = {
	create: function(){
		//Physics initiation
		//game.physics.startSystem(Phaser.Physics.ARCADE);
		//localStorage.clear(); //ACTIVATE FOR ITCH.IO BUILDS
		document.getElementById("gameDiv").children[0].id = "gameCanvas";
		if(localStorage.firstRun != "DONE"){
			console.log("fist run");
			firstRun();
		}
		game.state.start('load');
	}
};