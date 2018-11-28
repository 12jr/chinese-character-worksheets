/*
*	returns Pinyin for passed character string.
*	String character = the character(s) you wanna get the image to
*	Function callback(result) = function that will be called after getPinyin is done
*/
function getPinyin(character, callback){
	var requestUrl = "https://cors.io/?https://glosbe.com/transliteration/api?from=Han&dest=Latin&text="
			+ encodeURI(character)
			+ "&format=json";
	$.getJSON(requestUrl, function(data){
		if(data.result == "ok"){
			callback(data.text); // return the pinyin of the character
		} else {
			console.error("Error occured when fetching Pīnyīn for character " + character + " from glosbe.com. Check if you're connected to the internet and are able to reach https://glosbe.com/a-api and https://cors.io/.");
			$("#statusTr").addClass("error").removeClass("processing");
			$("#substatus").html("<b>Error</b> occured when fetching Pīnyīn for character " + character + " from glosbe.com. Check if you're connected to the internet and are able to reach https://glosbe.com/a-api and https://cors.io/. Please read the <a href='#sec:errorHandling'>Error Handling section</a> below.");
		}
	});
}