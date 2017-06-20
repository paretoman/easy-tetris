function firstRun(){
	localStorage.clear();
	initScoreSystem();
	localStorage.setItem("curBg", "0");
	localStorage.setItem("firstRun", "DONE");
}

function initScoreSystem(){
	for(i = 0; i < 5; i++){
		localStorage.setItem("leaderboard_" + i, 1000 - (i * 100));
	}

	//Leaderboard
	localStorage.setItem("leaderNames_0", "Caio");
	localStorage.setItem("leaderNames_1", "Dalton");
	localStorage.setItem("leaderNames_2", "Rogers");
	localStorage.setItem("leaderNames_3", "Zumba");
	localStorage.setItem("leaderNames_4", "Pajitnov");

	//sounds
	localStorage.setItem("musicVolume", "1.5");
	localStorage.setItem("fxVolume", "1.5");
	localStorage.setItem("musicTrack", "chaves");
}