/*
*	This takes care about the footnotes
*	Note: this doesn't take care of the order of the footnotes. Run the script and adjust the dt elements by hand.
*	@TODO: don't do that dynamically on every page load but just once and then copy the result to the release code.
*
*	Template for the html "code":
*		REFERENCES (multiple references to the same footnote are possible):
*			<sup class="refSup" data-ref="nameOfFootnoteX"></sup>
*		FOOTNOTES:
*			<dl id="footnotes">
*				<dt data-footnote="nameOfFootnoteA"></dt>
*					<dd>Content of footnote A.</dd>
*				<dt data-footnote="nameOfFootnoteB"></dt>
*					<dd>Content of footnote B.</dd>
*				<!-- and so on... -->
*			</dl>
*/
$(document).ready(function(){
	var fnNumber = []; // key: name of footnote ("data-ref" in html) → value: number of footnote
	var fnOccurrence = []; // key: number of footnote → value: amount of references in the document
	// vars inside the loop
		var i = 0;			//
		var thisRefName;	// name   of the footnote this reference is referencing
		var thisRefNumber;	// number of the footnote this reference is referencing
		var thisRefOccur;	// 1 if its the footnote's 1st reference; 2 if its the footnote's 2nd reference; ...
		var thisRefId;		// ID which will be assigned to the reference
	$.each($("sup.refSup"), function(){
		thisRefName = $(this).data("ref");
		if(typeof fnNumber[thisRefName] == 'undefined'){
			i++; // new "unique" reference
			fnNumber[thisRefName] = i;	// assign ref number i to ref name thisRefName
			fnOccurrence[i] = 1;	// first reference => 1 reference in total
			thisRefOccur = 1;
			thisRefNumber = i;
			// link footnote bc it's referenced for the first time
				$('#footnotes dt[data-footnote="' + thisRefName + '"]')
					.attr('id', 'ref' + thisRefNumber)
					.html('[<a href="#ref' + thisRefNumber + '-origin">' + thisRefNumber + '</a>]');
		} else {
			thisRefNumber = fnNumber[thisRefName];
			fnOccurrence[thisRefNumber]++; // one more reference of this footnote
			thisRefOccur = fnOccurrence[thisRefNumber];
		}
		$(this).append('<a href="#ref' + thisRefNumber + '">' + thisRefNumber + '</a>');
		// assign id: refX-origin if it's the footnote's first reference, else: refX-originY
		$(this).attr('id', 'ref' + thisRefNumber + '-origin' + ((thisRefOccur == 1) ? '' : thisRefOccur));
	});
});