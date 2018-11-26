/*
*	this allows the user to hide sections in the tool
*	all content that should be toggled has to be nested in ONE
* element directly under the heading, e.g., a span
*/
$(document).ready(function() {
	function headingToggled(togglerElement, animation) {
		var thisTag = togglerElement.parent().prop("tagName");
		var animationArg = (animation) ? "fast" : null;
		togglerElement.parent().next().toggle(animationArg);
		/*
		// OLDER VERSION OF THIS
		// --> more general, but text under the heading must be
		//    wrapped in some tag (e.g., span) for this to work
		var nextUntilDelimiter;
		console.log(thisTag);
		if(thisTag == "H1"){
			nextUntilDelimiter = "hr,h1";
		} else if(thisTag == "H2"){
			nextUntilDelimiter = "hr,h1,h2";
		} else if(thisTag == "H3"){
			nextUntilDelimiter = "hr,h1,h2,h3";
		} else if(thisTag == "H4"){
			nextUntilDelimiter = "hr,h1,h2,h3,h4";
		} else if(thisTag == "H5"){
			nextUntilDelimiter = "hr,h1,h2,h3,h4,h5";
		} else {
			console.error("Error in trying to toggle show/hide for some section.");
			return;
		}
		togglerElement.parent().nextUntil(nextUntilDelimiter).slideToggle("fast");
		*/
		var val = togglerElement.text() == "hide" ? "show" : "hide";
		togglerElement.hide().text(val).show(animationArg);
	}
	
	/* toggle if the user clicks hide/show */
	$('.togglingHeading .toggle').click(function(e){
		headingToggled($(this), true);
		e.preventDefault();
	});
	
	/* toggle footnotes section if the user clicks a reference */
	$('.refSup a').click(function(e){
		// if footnotes are not shown right now
		if($("#footnoteToggle").text() == "show"){
			headingToggled($("#footnoteToggle"), false);
		}
	});
	
	/* hide footnotes when opening the tool */
	//headingToggled($("#footnoteToggle"), false);
});













