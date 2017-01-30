var bondedMatrix = null;
// var matrix = null;
var bondedAtomSVG = null;
var bondedAtomObject = null; 
var currentAtomSVG = null; 
var currentAtomObject = null; 
var currentBondSVG = null; 
var currentBondObject = null;
var handleBondElementMovement = function(){
	currentAtomObject = findObjectInObjectArrayWithId(selectedElement.id);
	currentAtomSVG = document.getElementById(selectedElement.id);
	for (var i = 0; i<currentAtomObject.bonds.length; i++){ 
		currentBondId = currentAtomObject.bonds[i];
		currentBondSVG = document.getElementById(currentBondId);
		currentBondObject = findObjectInObjectArrayWithId(currentBondId);
	////----------------------------------------
		setBondedAtomVariables(currentBondObject); 
	////----------------------------------------
		setNewCoordinates();
	}
}
var setNewCoordinates = function(){
	var firstSVG = document.getElementById(currentBondObject.bonds[0]["x1"]);
	var firstMatrix = getMatrix(firstSVG);
	var secondSVG = document.getElementById(currentBondObject.bonds[0]["x2"]);
	var secondMatrix = getMatrix(secondSVG);
	var firstX = firstSVG.x.baseVal[0].value+(firstSVG.scrollWidth/2)+firstMatrix[4];
	var firstY = firstSVG.y.baseVal[0].value-(firstSVG.scrollHeight/3)+firstMatrix[5];
	var secondX = secondSVG.x.baseVal[0].value+(secondSVG.scrollWidth/2)+secondMatrix[4];
	var secondY = secondSVG.y.baseVal[0].value-(secondSVG.scrollHeight/3)+secondMatrix[5];
	var firstRadius = getRadius(firstSVG);
	var secondRadius = getRadius(secondSVG);
	if (firstX>secondX){
		console.log('firstX >second X');
		currentBondSVG.setAttributeNS(null, "x1", firstX-(1/2)*firstRadius*Math.cos(Math.atan((secondY-firstY)/(secondX-firstX))));
		currentBondSVG.setAttributeNS(null,"y1", firstY-(1/2)*firstRadius*Math.sin(Math.atan((secondY-firstY)/(secondX-firstX))));
		currentBondSVG.setAttributeNS(null, "x2", secondX+(1/2)*secondRadius*Math.cos(Math.atan((firstY-secondY)/(firstX-secondX))));
		currentBondSVG.setAttributeNS(null, "y2", secondY+(1/2)*secondRadius*Math.sin(Math.atan((firstY-secondY)/(firstX-secondX))));
	}
	else{
		console.log('secondX > firstX');
		currentBondSVG.setAttributeNS(null, "x1", firstX+(1/2)*firstRadius*Math.cos(Math.atan((secondY-firstY)/(secondX-firstX))));
		currentBondSVG.setAttributeNS(null,"y1", firstY+(1/2)*firstRadius*Math.sin(Math.atan((secondY-firstY)/(secondX-firstX))));
		currentBondSVG.setAttributeNS(null, "x2", secondX-(1/2)*secondRadius*Math.cos(Math.atan((firstY-secondY)/(firstX-secondX))));
		currentBondSVG.setAttributeNS(null, "y2", secondY-(1/2)*secondRadius*Math.sin(Math.atan((firstY-secondY)/(firstX-secondX))));

	}
	//currentBondSVG.setAttributeNS(null, "x1", firstX);
	//currentBondSVG.setAttributeNS(null, "x2", secondX);
	//currentBondSVG.setAttributeNS(null, "y1", firstY);
	//currentBondSVG.setAttributeNS(null, "y2", secondY);
}
var getMatrix = function(SVG){
	bondedMatrix = SVG.getAttributeNS(null, "transform").slice(7, -1).split(' ');
	for (var i = 0; i < bondedMatrix.length; i++){
		bondedMatrix[i] = parseFloat(bondedMatrix[i]);
	}
	return bondedMatrix;
}
var setBondedAtomVariables = function(currentBondObject)	{
	var bondsObject = currentBondObject.bonds[0];
	for (prop in bondsObject){
		if (bondsObject[prop] != selectedElement.id){
			bondedAtomObject = findObjectInObjectArrayWithId(bondsObject[prop]);
			bondedAtomSVG = document.getElementById(bondsObject[prop]);
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
// var radius1 = null; 
// var radius2 = null;
// var x1 = null;
// var y1 = null;
// var x2 = null;
// var y2 = null; 
// var manipulateFinishedBond = function(){
// 	if (extractBondedAtomId[0]=="x2"){
// 		radius2 = getRadius(bondedAtomSVG);
// 		radius1 = getRadius(currentAtomSVG);
// 	}
// 	else{
// 		radius2 = getRadius(currentAtomSVG);
// 		radius1 = getRadius(bondedAtomSVG);
// 	}
// }
var getRadius = function(SVG){
	var rad = (((SVG.scrollHeight/2)^2)+((SVG.scrollWidth/2)^2))^(1/2);
	return rad; 
}
// var determineRadialCoordinate = function(radius, SVG){
// 	var coords = getRadialCoordinates(radius, SVG);
// 	if (currentAtomSVG.x.baseVal[0].value > bondedAtomSVG.x.baseVal[0].value){
// 		currentBondSVG.setAttributeNS(null, moveElementBondedAtomId[1], x + coords[0]);
// 		currentBondSVG.setAttributeNS(null, moveElementBondedAtomId[2], y + coords[1]);
// 	}
// 	else if(currentAtomSVG.x.baseVal[0].value < bondedAtomSVG.x.baseVal[0].value){
// 		currentBondSVG.setAttributeNS(null, moveElementBondedAtomId[1], x - coords[0]);
// 		currentBondSVG.setAttributeNS(null, moveElementBondedAtomId[2], y - coords[1]);
// 	}
// 	currentBond.setAttributeNS(null, "x1", null);
// 	currentBond.setAttributeNS(null, "x2", null);
// 	currentBond.setAttributeNS(null, "y1", null);
// 	currentBond.setAttributeNS(null, "y2", null);
	
// }
// var getRadialCoordinates = function(radius, SVG){
// 	x = SVG.x.baseVal[0].value + (SVG.scrollWidth/2)+extractMatrix(SVG.id)[4]; //this is the adjusted actual x value according to the transform matrix
// 	y = SVG.y.baseVal[0].value + (SVG.scrollWidth/2)-	extractMatrix(SVG.id)[5]; //adjusted actual y value according to transform matrix
// 	var radx = (1/2)*radius*Math.cos(Math.atan((currentAtomSVG.y.baseVal[0].value-y)/(currentAtomSVG.x.baseVal[0].value-x)));
// 	var rady = (1/2)*radius*Math.sin(Math.atan((currentAtomSVG.y.baseVal[0].value-y)/(currentAtomSVG.x.baseVal[0].value-x)));
// 	var arr = new Array;
// 	arr.push(radx, rady);
// 	return arr; 
// }