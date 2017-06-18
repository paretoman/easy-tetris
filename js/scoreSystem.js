highscores = [];
leaderNames = [];
hsLen = 5;
function getLeaderboard(){
	highscores = [];
	leaderNames = []
	for(i = 0; i < hsLen; i++){
		highscores.push(parseInt(localStorage.getItem("leaderboard_" + i)));
		leaderNames.push(localStorage.getItem("leaderNames_" + i));
	}
}

function submitScore(s, player){
	index = testScore(s);
	if( index > -1){
		highscores.push(0);
		hsLen++;
		foo = highscores[index];
		highscores[index] = s;

		for(i = index+1; i < hsLen; i++){
			bar = highscores[i];
			highscores[i] = foo;
			foo = bar;
		}
		highscores.pop();
		hsLen--;
		updateLeaderboard();
	}
}

function testScore(s){
	for(i = 0; i < hsLen; i++){
		if (s > highscores[i]){
			return i;
		}
	}
	return -1;
}

function updateLeaderboard(){
	for(i = 0; i < hsLen; i ++){
		localStorage.setItem("leaderboard_" + i, highscores[i]);
	}
}

function getLeaderboardName(index){
	return localStorage.getItem("leaderNames_"+index);
}

function getLeaderboardScore(index){
	return localStorage.getItem("leaderboard_"+index);
}