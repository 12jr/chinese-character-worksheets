/*
*	Draws stroke order of the given character on the page in the (hidden) "#strokeOrderSvgs" div.
*	String character = the given character
*	Function callback() = function that will be called after drawSO is done
*/
// helper function
	function renderFanningStrokes(target, strokes) {
	  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	  svg.style.width  = '7px';
	  svg.style.height = '7px';
	  svg.style.marginRight = '3px';
	  target.appendChild(svg);
	  var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');

	  // set the transform property on the g element so the character renders at 75x75
	  var transformData = HanziWriter.getScalingTransform(7,7);
	  group.setAttributeNS(null, 'transform', transformData.transform);
	  svg.appendChild(group);

	  strokes.forEach(function(strokePath) {
		var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		path.setAttributeNS(null, 'd', strokePath);
		// style the character paths
		path.style.fill = '#000';
		group.appendChild(path);
	  });
	}
// main function
function drawSO(reallyDoIt, character, callback){
	if(reallyDoIt){
		HanziWriter.loadCharacterData(character).then(function(charData) {
			var target = document.getElementById('strokeOrderSvgs-' + character);
			for (var drawSOiterator = 0; drawSOiterator < charData.strokes.length; drawSOiterator++) {
				var strokesPortion = charData.strokes.slice(0, drawSOiterator + 1);
				renderFanningStrokes(target, strokesPortion);
			}
		});
	}
	callback();
}
