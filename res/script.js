$(document).ready(function(){
	/*
	*	Function called when "create-pdf" button is clicked
	*	a.k.a. most important function of the tool
	*/
	$("#create-pdf").click(function(){
		// Hide button and display status
			$("#formFieldset *").prop("disabled", true);
			$("#create-pdf").hide();
			$("#statusTr").addClass("processing");
			$("#mainstatus").html("Processing:");
			$("#substatus").html("Reading user input");
			$(".status").show();
		// Read parameters ("p") from user input
			var docTitle = $("#doc-title").val();
			var charactersString =
				$("#characters").val()
				.replace(/[^\u4E00-\u9FFF]+/g,""); // replace everything except chinese chars
			var characters = charactersString.split("");
			if($("#removeDuplicates").is(':checked')){ // if user wants duplicates to be removed => remove them!
				function onlyUnique(value, index, self) { 
					return self.indexOf(value) === index;
				}
				characters = characters.filter(onlyUnique);
				charactersString = characters.join("");
			}
			if(charactersString == ""){
				$("#statusTr").addClass("error").removeClass("processing");
				$("#mainstatus").html('Error:');
				$("#substatus").html('You did not enter any Chinese characters (and maybe no characters at all) under "Characters to practice". So: <a href="index.html">Start from the beginning for a new worksheet!</a><br/>(You can also press F5 in order to keep the values you entered in the form.)<br/><br/>If you did enter Chinese characters, please post that character(s) on <a href="https://github.com/12jr/chinese-character-worksheets/issues" target="_blank">the Github Issues page</a> or <a href="https://github.com/12jr/" target="_blank">contact me</a>.');
				return;
			}
			var strokeOrder = $('input[name=strokeOrder]:checked').val();
			var numberOfGrayscaleSigns = // 0 <= numberOfGrayscaleSigns <= 10
				Math.min(
					10,
					Math.max(
						0,
						Number($("#number-gray-signs").val())));
			var pasteSoImages = $("#paste-so-images")	.is(':checked');
			var writePinyin = $("#write-pinyin")		.is(':checked');
			var useGridlines = $("#use-gridlines")		.is(':checked');
			var writeName = $("#write-name")			.is(':checked');
			var filename = $("#doc-filename").val() == "" ? docTitle : $("#doc-filename").val();
			var wayOfRetrieval = $('input[name=way-of-retr]:checked').val();
		// fetch all "character stroke order picture urls"
		// let the user know
			$("#substatus").html("Fetching stroke order images from Hanzi Writer (<span class='amountDone'>0</span>/" + characters.length + ")");
		var strokeOrderDrawingCallbacksRemaining = characters.length; // let's count how many (hidden) drawings of character stroke orders on the page are still missing
		for (var i = 0; i < characters.length; i++) {
			// create the container for the stroke order of the current character
			$("#strokeOrderSvgs-template").clone().attr("id","strokeOrderSvgs-" + characters[i]).insertAfter("#strokeOrderSvgs-template");
			// draw the stroke order of the current character (if the user chose to do so)
			drawSO(pasteSoImages, characters[i], function(){
				return function(){
					--strokeOrderDrawingCallbacksRemaining; // we drew one stroke order (equals 1 character) more! one less to go.
					$(".amountDone").html(characters.length - strokeOrderDrawingCallbacksRemaining);
					if(strokeOrderDrawingCallbacksRemaining <= 0){ // when all stroke orders are drawn
						// let's get the pinyin to all the characters now (if the user chose to do so)
						var charPinyin = [];
						if(writePinyin){
							$("#substatus").html("Fetching the Pīnyīn transcripts for the characters from Glosbe");
							// we can do the request with the whole character string (= all characters) and then split up the string
							getPinyin(charactersString, function(r){
								charPinyin = r.split(" "); // save pinyin
								// create the pdf now
								createPdf(docTitle, characters, numberOfGrayscaleSigns, pasteSoImages, writePinyin, useGridlines, writeName, filename, charPinyin, wayOfRetrieval);
							});
						} else {
							// create the pdf now
							createPdf(docTitle, characters, numberOfGrayscaleSigns, pasteSoImages, writePinyin, useGridlines, writeName, filename, charPinyin, wayOfRetrieval);
						}
					}
				}
			}());
		};
	});
	
	// Testing getWikiSOImageUrl
	/*getWikiSOImageUrl(true, "影", "ch", function(res){
		console.log(res);
	});*/
	
	// Testing getPinyin
	/*getPinyin("影", function(res){
		console.log(res);
	})*/

	/*
	*	Hide filename setting and only show it if the user chooses "download"
	*	https://stackoverflow.com/a/4643760
	*/
	// Hide the div using jQuery rather than CSS, as the user should still
	// be able to access the inputs if JavaScirpt is disabled.
	$('input:radio[name="way-of-retr"]').change(function() {
		if (this.checked) {
			if (this.value == 'download')
				$('#filenameTr').show();
			else
				$('#filenameTr').hide();
		}
	});
	// check for the first time when html doc ready
	$('input:radio[name="way-of-retr"]').change();
});