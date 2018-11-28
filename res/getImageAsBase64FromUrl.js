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