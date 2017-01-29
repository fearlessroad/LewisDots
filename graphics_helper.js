var bondedMatrix = null;
var bondedAtomSVG = null;
var currentAtomObject = null; 
var currentAtomSVG = null; 
var currentBondSVG = null; 
var handleBondElementMovement = function(){
	console.log('inside extract bonded atom coords')
	currentAtomObject = findObjectInObjectArrayWithId(selectedElement.id);
	currentAtomSVG = document.getElementById(selectedElement.id);
	for (var i = 0; i<currentAtomObject.bonds.length; i++){ 
		currentBondId = currentAtomObject.bonds[i];
		currentBondSVG = document.getElementById(currentBondId);
		var moveElementBondedAtomId = extractBondedAtomId(currentBondId);// this should return the Bonded Atom Id AND a designation of whether its part of the x1 or x2 side of the line, so we now have that Id and the Bond Id AND we know which side of the line svg we are dealing with
		bondedAtomSVG = document.getElementById(moveElementBondedAtomId[2]); 
		//console.log("function works"+extractBondedMatrix(moveElementBondedAtomId));
		//console.log(bondedMatrix); // the matrix extracted from the bonded Atom Id
		//console.log("this is the bonded atom matrix: "+document.getElementById(moveElementBondedAtomId[2]).getAttributeNS(null, "transform"));//this logs the elements transform matrix
		console.log("the bonded atom current x,y coordinates are: "+bondedAtomSVG.x.baseVal[0].value+","+bondedAtomSVG.y.baseVal[0].value)
		//One will be the selected object (selectedElement.id), the other will be the attached atom. We need to grab the attached atom x,y coordinates by looking it up with document.getElementById (the one that is NOT selectedElement)
		currentBondSVG.setAttributeNS(null, moveElementBondedAtomId[0], selectedElement.x.baseVal[0].value+currentMatrix[4]);
		currentBondSVG.setAttributeNS(null, moveElementBondedAtomId[1], selectedElement.y.baseVal[0].value+currentMatrix[5]);
	}
}
var extractBondedMatrix = function(moveElementBondedAtomId){
	bondedMatrix = document.getElementById(moveElementBondedAtomId[2]).getAttributeNS(null, "transform").slice(7, -1).split(' '); //moveElementBondedAtomId is an array, the first position [0] should be a designation of whether we are looking at x1 or x2, the second [1] should give y1 or y2, but [2] will give the id
	for (var i = 0; i < bondedMatrix.length; i++){
		bondedMatrix[i] = parseFloat(bondedMatrix[i]);
	}
	return bondedMatrix;
}
var extractBondedAtomId = function(currentBondId)	{
	for (var j=0; j<findObjectInObjectArrayWithId(currentBondId).bonds.length; j++){
		if (findObjectInObjectArrayWithId(currentBondId).bonds[j] != selectedElement.id){
			// var bob = new Array();
			// bob[2] = findObjectInObjectArrayWithId(currentBondId).bonds[j];
			// if(j==0){ //checking to see whether we are at first or second position (this will tell us whether we are dealing with the x1 position or x2 position)
			// 	bob[0] = "x2";
			// 	bob[1] = "y2";
			// 	return bob;
			// }
			// else{
			// 	bob[0] = "x1";
			// 	bob[1] = "y1";
			// 	return bob;	
			// }
			// // bob is a length 3 matrix where bob[0] is x-position, bob[1] is y-position, and bob[2] is actual id
		}
	}
}
var extractMatrix = function(atomId){
	bondedMatrix = document.getElementById(atomId).getAttributeNS(null, "transform").slice(7, -1).split(' ');
		for (var i = 0; i < bondedMatrix.length; i++){
			bondedMatrix[i] = parseFloat(bondedMatrix[i]);
		}
		return bondedMatrix;
}
var radius1 = null; 
var radius2 = null;
var x1 = null;
var y1 = null;
var x2 = null;
var y2 = null; 
var manipulateFinishedBond = function(){
	if (extractBondedAtomId[0]=="x2"){
		radius2 = getRadius(bondedAtomSVG);
		radius1 = getRadius(currentAtomSVG);
		// x2 = bondedAtomSVG.x.baseVal[0].value;
		// y2 = bondedAtomSVG.y.baseVal[0].value;	
		// x1 = currentAtomSVG.x.baseVal[0].value;
		// y1 = currentAtomSVG.y.baseVal[0].value; 
	}
	else{
		radius2 = getRadius(currentAtomSVG);
		radius1 = getRadius(bondedAtomSVG);
		// x1 = bondedAtomSVG.x.baseVal[0].value;
		// y1 = bondedAtomSVG.y.baseVal[0].value;	
		// x2 = currentAtomSVG.x.baseVal[0].value;
		// y2 = currentAtomSVG.y.baseVal[0].value; 
	}
}
var getRadius = function(SVG){
	var rad = (((SVG.scrollHeight/2)^2)+((SVG.scrollWidth/2)^2))^(1/2);
	return rad; 
}
var determineRadialCoordinate = function(radius, SVG){
	var coords = getRadialCoordinates(radius, SVG);
	if (currentAtomSVG.x.baseVal[0].value > bondedAtomSVG.x.baseVal[0].value){
		currentBondSVG.setAttributeNS(null, moveElementBondedAtomId[1], x + coords[0]);
		currentBondSVG.setAttributeNS(null, moveElementBondedAtomId[2], y + coords[1]);
	}
	else if(currentAtomSVG.x.baseVal[0].value < bondedAtomSVG.x.baseVal[0].value){
		currentBondSVG.setAttributeNS(null, moveElementBondedAtomId[1], x - coords[0]);
		currentBondSVG.setAttributeNS(null, moveElementBondedAtomId[2], y - coords[1]);
	}
	currentBond.setAttributeNS(null, "x1", null);
	currentBond.setAttributeNS(null, "x2", null);
	currentBond.setAttributeNS(null, "y1", null);
	currentBond.setAttributeNS(null, "y2", null);
	
}
var getRadialCoordinates = function(radius, SVG){
	x = SVG.x.baseVal[0].value + (SVG.scrollWidth/2)+extractMatrix(SVG.id)[4]; //this is the adjusted actual x value according to the transform matrix
	y = SVG.y.baseVal[0].value + (SVG.scrollWidth/2)-	extractMatrix(SVG.id)[5]; //adjusted actual y value according to transform matrix
	var radx = (1/2)*radius*Math.cos(Math.atan((currentAtomSVG.y.baseVal[0].value-y)/(currentAtomSVG.x.baseVal[0].value-x)));
	var rady = (1/2)*radius*Math.sin(Math.atan((currentAtomSVG.y.baseVal[0].value-y)/(currentAtomSVG.x.baseVal[0].value-x)));
	var arr = new Array;
	arr.push(radx, rady);
	return arr; 
}