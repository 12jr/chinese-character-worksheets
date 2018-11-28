/*
*	Checks for an update when doc is opened
*	@TODO: 	Implement more. And dont forget the case when there's no connection to
*			Github.
*	* Suggestion for the check which file is the the tool:
*		check if it's html || exe and contains "tool"
*	* Another suggestion for important messages:
*		check for file with name "display_as_notification.txt"
*		=> get content and display it as a notification
*/
$(document).ready(function(){
	function printRepoCount() {
		var responseObj = JSON.parse(this.responseText);
		console.log(responseObj);
	}
	var request = new XMLHttpRequest();
	request.onload = printRepoCount;
	request.open('get', 'https://api.github.com/repos/12jr/test-rep-for-update-checks/releases/latest', true); // true = async request
	request.send();
});