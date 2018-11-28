/*
*	returns URL of stroke order picture for passed character.
*	Boolean reallyDoIt:
*		if true: will do request
*		if false: will just return ""
*		(Note: This is part of a dirty fix to issue #3)
*	String character = the character you wanna get the image to
*	String countryVersion = [ch | tw | jp] (=> bw / tbw / jbw)
*		→ this param is ignored as of today. (@TODO)
*	Function callback(result) = function that will be called after getWikiSOImageUrl is done
*/
function getWikiSOImageUrl(reallyDoIt, character, countryVersion, callback){
	if(reallyDoIt){
		var ending = "bw"; // @TODO handle countryVersion to get different ending
		var requestUrl = "https://cors.io/?https://commons.wikimedia.org/w/api.php?action=query&titles=Image:"
				+ encodeURI(character)
				+ "-"
				+ ending
				+ ".png&prop=imageinfo&iiprop=url&format=json";
				// also see https://stackoverflow.com/questions/8363531/accessing-main-picture-of-wikipedia-page-by-api
		$.getJSON(requestUrl, function(data){
			Object.keys(data.query.pages).forEach(function(key) { // there will be only 1 object in the array
				if(key == "-1") // if the database doesn't have the image...
					callback(""); // ...we will just leave the url empty (and handle that later)
				else
					callback(data.query.pages[key]["imageinfo"][0]["url"]); // return the url of the png image
			});
		});
	} else
		callback("");
}