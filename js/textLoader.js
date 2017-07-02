var curLang = "PT_BR";

function getText(section, index){
	return game.cache.getJSON('langs').langs[curLang][section].texts[index];
}

function setLang(l){
	curLang = l;
}