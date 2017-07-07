var curLang;

function initLang(){
	curLang = localStorage.getItem("curLang");
}

function getText(section, index){
	return game.cache.getJSON('langs').langs[curLang][section].texts[index];
}

function setLang(l){
	curLang = l;
}

function createLanguageFlags(){
	game.add.button(5, 404, 'flags', function(){updateLanguage("PT_BR")}, this, 0, 0, 0);
	game.add.button(42, 404, 'flags', function(){updateLanguage("EN")}, this, 1, 1, 1);
	game.add.button(79, 404, 'flags', function(){updateLanguage("ES")}, this, 2, 2, 2);
	game.add.button(116, 404, 'flags', function(){updateLanguage("GE")}, this, 3, 3, 3);
	game.add.button(5, 441, 'flags', function(){updateLanguage("RU")}, this, 4, 4, 4);
	game.add.button(42, 441, 'flags', function(){updateLanguage("JP")}, this, 5, 5, 5);
	game.add.button(79, 441, 'flags', function(){updateLanguage("IT")}, this, 6, 6, 6);
	game.add.button(116, 441, 'flags', function(){updateLanguage("FR")}, this, 7, 7, 7);
}

function updateLanguage(newLang){
	setLang(newLang);
	localStorage.setItem("curLang", curLang);
	game.state.start(game.state.current)
}