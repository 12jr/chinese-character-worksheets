$(document).ready(function(){
	/*
	*	returns URL of stroke order picture for passed character.
	*	String character = the character you wanna get the image to
	*	String countryVersion = [ch | tw | jp] (=> bw / tbw / jbw)
	*		→ this param is ignored as of today. (@TODO)
	*	Function callback(result) = function that will be called after getWikiSOImageUrl is done
	*/
	function getWikiSOImageUrl(character, countryVersion, callback){
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
	}
	
	/*
	*	returns png image as Base64 for passed URL of the image.
	*	String url = the url to the image
	*	Function callback(result) = function that will be called after getImageAsBase64FromUrl is done
	*	based on https://stackoverflow.com/questions/32833797/convert-local-image-to-base64-string-in-javascript
	*/
	function getImageAsBase64FromUrl(url, callback){
		if(url.length == 0) callback("");
		else {
			var xhr = new XMLHttpRequest();       
			xhr.open("GET", url, true); 
			xhr.responseType = "blob";
			xhr.onload = function (e){
				var reader = new FileReader();
				reader.onload = function(event) {
					var res = event.target.result;
					callback(res);
				}
				var file = this.response;
				reader.readAsDataURL(file);
			}
			xhr.send();
		}
	}
	
	/*
	*	returns Pinyin for passed character string.
	*	String character = the character(s) you wanna get the image to
	*	Function callback(result) = function that will be called after getWikiSOImageUrl is done
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
				$("#substatus").html("<b>Error</b> occured when fetching Pīnyīn for character " + character + " from glosbe.com. Check if you're connected to the internet and are able to reach https://glosbe.com/a-api and https://cors.io/. Please read the <a href='#sec:errorHandling'>Error Handling section</a> below.");
				$("#substatus").addClass("errorStatus");
			}
		});
	}
	
	/*
	*	Creates Pdf from given params.
	*	characters, charPicUrl, charPinyin : String arrays
	*	numberOfGrayscaleSigns : int
	*	writePinyin, useGridlines, writeName : Booleans
	*	docTitle, filename, wayOfRetrieval : Strings
	*/
	function createPdf(docTitle, characters, numberOfGrayscaleSigns, writePinyin, useGridlines, writeName, filename, charPicUrl, charPicBase64, charPicAvailable, charPinyin, wayOfRetrieval){
		// make filename "filesystem-secure"
			filename = filename.replace(/[^a-z0-9öäüß\-\_\u4E00-\u9FFF]/gi, '');
			filename = filename == "" ? "my-chinese-exercise" : filename;
		// notify user
			$("#substatus").html("Starting to create your PDF");
		// Ich glaube pdfmake reicht nicht, insbes. nicht für die Gitterlinien (+ Font-Einbindung wird bisschen kompliziert)
		// new jsPDF-doc
			var doc = new jsPDF();
		// import font to jsPDF
			$("#substatus").html("Adding Chinese font");
			doc.addFileToVFS('AR PL UKai CN.ttf', ArPlUkaiCnBase64);
			doc.addFont('AR PL UKai CN.ttf', 'AR PL UKai CN', 'normal');
			$("#substatus").html("Adding Pīnyīn font");
			doc.addFileToVFS('NotoSans-Regular.ttf', pinyinFontBase64);
			doc.addFont('NotoSans-Regular.ttf', 'Noto Sans', 'normal');
		// draw character lines: 11 characters per page, 11 characters per line
			$("#substatus").html("Writing character lines (line <span class='amountDone'>0</span>/" + characters.length + ")");
			var i;
			var j;
			var xUpLeft = 14;								// x position of the first character line on a page = left indent
			var charLineHeight = 17;						// height of a character line
			var charCellWidth = 17;							// width of a character cell
			var yUpLeft = 25;								// y position of the first character line on a page = top indent + distance between character lines
			var charLineDistance = charLineHeight + 7.4;	// distance between the UPPER strokes of the char lines
			var thisLineYUpLeft;
			var curPage = 1;		// current page
			var charsPerPage = 11;
			var imgProp;
			for(i = 0; i < characters.length; ++i){
				if(i%charsPerPage == 0){ // if we're at the beginning of a page
					if(i != 0){ // if reached beginning of new page (i \in {9,19,29,...}) => add new page (& focus on it)
						doc.addPage();
						curPage++;
					}
					// top line
					doc.line(xUpLeft, 17, 201, 17);
					// write "姓名：" if the user wanted it
					if(writeName){
						doc.setFont('AR PL UKai CN');
						doc.setFontSize(11); //in pt
						doc.text("姓名：", xUpLeft, 16);
					}
					// write doc title
						doc.setFont('AR PL UKai CN');
						doc.setFontSize(14); //in pt
						doc.text(docTitle, 105, 16, 'center'); // A4_width/2 = 210 mm/2 = 105
					// write page number
						doc.setFontSize(11); //in pt
						doc.text("第" + curPage + "页", 201, 16, 'right'); // 201 is 210-rightIndent
				}
				thisLineYUpLeft = yUpLeft + (i%charsPerPage) * charLineDistance;
				// gridlines - part 1
					// @TODO
				// paste Wikimedia Stroke Order Images
					if(charPicAvailable[i]) { // if Wikimedia provides stroke order image
						imgProp = doc.getImageProperties(charPicBase64[i]);
						doc.addImage(charPicBase64[i], 'PNG', xUpLeft + 19, yUpLeft + (i%charsPerPage) * charLineDistance - 7, imgProp.width * 6.8 / imgProp.height, 6.8, "", "NONE", 0);
					}
				// upper line
				doc.line(xUpLeft, thisLineYUpLeft, xUpLeft + 11 * charCellWidth, thisLineYUpLeft);
				// lower line
				doc.line(xUpLeft, thisLineYUpLeft + charLineHeight, xUpLeft + 11 * charCellWidth, thisLineYUpLeft + charLineHeight);
				// write pinyin
					if(writePinyin){
						doc.setFont('Noto Sans');
						doc.setFontSize(11); //in pt
						doc.text(charPinyin[i], xUpLeft, thisLineYUpLeft-1.5); // "-1.5" looks better
					}
				// single characters along the character line
				doc.setFont('AR PL UKai CN');
				doc.setFontSize(40); //in pt
				for(j = 0; j < 12; ++j){ // 11 chars per line
					// gridlines - part 2
						// @TODO
					// vertical lines
					doc.line(xUpLeft + j * charCellWidth, thisLineYUpLeft, xUpLeft + j * charCellWidth, thisLineYUpLeft + charLineHeight);
					// todo: write first char (j=0) and grey chars (j=1,...,11)
					if(j == 1) doc.setTextColor("#C0C0C0");  // set color to grey, so the supporting characters will be in grey
					if(j == 11) doc.setTextColor("#000000"); // reset color to black
					if(j <= numberOfGrayscaleSigns){ // it's either the first, black sign (j==0) or one of the grayscale signs (j=1,2,...,numberOfGrayscaleSigns)
						doc.text(characters[i], xUpLeft + (j + 0.5) * charCellWidth, thisLineYUpLeft + charLineHeight - 3, 'center');
					}
				};
				$(".amountDone").html(i);
			};
			
		// return doc
			if(wayOfRetrieval == "window")
				doc.output('dataurlnewwindow');
			else if(wayOfRetrieval == "currentWindow")
				doc.output('datauri');
			else
				doc.save(filename + '.pdf');
			$("#mainstatus").html('PDF created. ');
			$("#substatus").removeClass("working").html('<a href="index.html">Start from the beginning for a new worksheet!</a>');
	}
	
	/*
	*	Function called when "create-pdf" button is clicked
	*	a.k.a. most important function of the tool
	*/
	$("#create-pdf").click(function(){
		// Hide button and display status
			$("#formFieldset *").prop("disabled", true); // doesnt work
			$("#create-pdf").hide();
			$("#mainstatus").html("Processing: ");
			$("#substatus").addClass("working").html("Reading user input");
			$(".status").show();
		// Read parameters ("p") from user input
			var docTitle = $("#doc-title").val();
			var charactersString =
				$("#characters").val()
				.replace(/[^\u4E00-\u9FFF]+/g,""); // replace everything except chinese chars
			var characters = charactersString.split("");
			if($("#removeDuplicates").is(':checked')){ // if user wants duplicates to be removed => remove them!
				characters = $.unique(characters);
				charactersString = characters.join("");
			}
			var strokeOrder = $('input[name=strokeOrder]:checked').val();
			var numberOfGrayscaleSigns = // 0 <= numberOfGrayscaleSigns <= 10
				Math.min(
					10
					Math.max(
						0,
						Number($("#number-gray-signs").val())));
			var writePinyin = $("#write-pinyin")	.is(':checked');
			var useGridlines = $("#use-gridlines")	.is(':checked');
			var writeName = $("#write-name")		.is(':checked');
			var filename = $("#doc-filename").val() == "" ? docTitle : $("#doc-filename").val();
			var wayOfRetrieval = $('input[name=way-of-retr]:checked').val();
		// fetch all "character stroke order picture urls"
		// let the user know
			$("#substatus").html("Fetching stroke order images from Wikimedia (<span class='amountDone'>0</span>/" + characters.length + ")");
		var i; // iteration counter
		var charPicUrl = []; // array in which we store the urls to the "character stroke order pictures"
		var charPicBase64 = []; // array in which we store the base64s to the "character stroke order pictures"
		var charPicAvailable = []; // array in which we store true, if a "character stroke order picture" is available; else: false.
		var picUrlCallbacksRemaining = characters.length; // let's count how many picture urls are still missing
		for (i = 0; i < characters.length; i++) {
			var currentI = i; // to avoid side effects....
			getWikiSOImageUrl(characters[i], strokeOrder, function(v){ // function(v) is a dirty trick to preserve currentI, see https://stackoverflow.com/a/7053992
				return function(r){
					charPicUrl[currentI] = r; // save url
						// get base64 of the image
						getImageAsBase64FromUrl(charPicUrl[currentI], function(w){ // function(v) is a dirty trick to preserve currentI, see https://stackoverflow.com/a/7053992
							return function(bRes){
								charPicBase64[v] = bRes; // Save base64 (v is currentI here)
								charPicAvailable[v] = bRes != ""; // 
								--picUrlCallbacksRemaining; // we got one url more! one less to go.
								$(".amountDone").html(characters.length - picUrlCallbacksRemaining);
								if(picUrlCallbacksRemaining <= 0){ // when all urls are fetched
									// let's get the pinyin to all the characters now (if the user chose to do so)
									var charPinyin = [];
									if(writePinyin){
										// @TODO can be done with only one API request by passing all characters as one string to the server and then split the retrieval.
										$("#substatus").html("Fetching the Pīnyīn transcripts for the characters from Glosbe");
										getPinyin(charactersString, function(r){
											charPinyin = r.split(" "); // save pinyin
											// create the pdf now
											createPdf(docTitle, characters, numberOfGrayscaleSigns, writePinyin, useGridlines, writeName, filename, charPicUrl, charPicBase64, charPicAvailable, charPinyin, wayOfRetrieval);
										});
									} else {
										// create the pdf now
										createPdf(docTitle, characters, numberOfGrayscaleSigns, writePinyin, useGridlines, writeName, filename, charPicUrl, charPicBase64, charPicAvailable, charPinyin, wayOfRetrieval);
									}
								}
						}}(v));
				}
			}(currentI));
		};
	});
	
	// Testing getWikiSOImageUrl
	/*getWikiSOImageUrl("影","ch", function(res){
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
	// Hide the div using jQuery rather than CSS, as if JavaScirpt is disabled
	// the user should still be able to access the inputs.
	$('#filenameTr').hide();
	$('input:radio[name="way-of-retr"]').change(function() {
		if (this.checked) {
			if (this.value == 'download')
				$('#filenameTr').show();
			else
				$('#filenameTr').hide();
		}
	});
});

// nice testing chars: 国國爱愛反對,共和}黨風格。混搭風格我爱你馬毌，öän
// (last 2 signs are japanese)































