var bondedMatrix = null;
// var matrix = null;
var bondedAtomSVG = null;
var bondedAtomObject = null; 
var currentAtomSVG = null; 
var currentAtomObject = null; 
var currentBondSVG = null; 
var currentBondObject = null;
var handleBondElementMovement = function(){
	console.log('handleBondElementMovement')
	currentAtomObject = findObjectInObjectArrayWithId(selectedElement.id);
	currentAtomSVG = document.getElementById(selectedElement.id);
	for (var i = 0; i<currentAtomObject.bonds.length; i++){ 
		currentBondId = currentAtomObject.bonds[i];
		currentBondSVG = document.getElementById(currentBondId);
		currentBondObject = findObjectInObjectArrayWithId(currentBondId);
		//console.log(currentBondObject);
	////----------------------------------------
		setBondedAtomVariables(currentBondObject); 
	////----------------------------------------
		setNewCoordinates();
		//currentBondSVG.setAttributeNS(null, moveElementBondedAtomId[0], selectedElement.x.baseVal[0].value+currentMatrix[4]);
		//currentBondSVG.setAttributeNS(null, moveElementBondedAtomId[1], selectedElement.y.baseVal[0].value+currentMatrix[5]);
	}
}
var setNewCoordinates = function(){
	for (key in currentBondObject.bonds[0]){
		var el = document.getElementById(currentBondObject.bonds[0][key]);
		var matrix = getMatrix(el);
		currentBondSVG.setAttributeNS(null, key, el.x.baseVal[0].value+matrix[4]);
		if (key == "x1"){
			currentBondSVG.setAttributeNS(null, "y1", el.y.baseVal[0].value+matrix[5]);	
		}
		else{
			currentBond.setAttributeNS(null, "y2", el.y.baseVal[0].value+matrix[5]);
		}	
	}
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