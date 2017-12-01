function addElectron(atom){
	//if atom has a bond already or electron, find the best place to put the new electron
	xpos = parseFloat(atom.getAttributeNS(null, "x"))-10;
	ypos = parseFloat(atom.getAttributeNS(null, "y"))+10; 
	matrix = getMatrix(atom)
	findCoordinationSites(atom);
	var NS = "http://www.w3.org/2000/svg";
	var element = document.createElementNS(NS, "circle");
	element.setAttributeNS(null, "cx", xpos+matrix[4]);
	element.setAttributeNS(null, "cy", ypos+matrix[5]);
	element.setAttributeNS(null, "r", 5);
	element.setAttributeNS(null, "fill", "black");
	element.setAttributeNS(null, "transform", "matrix(1 0 0 1 0 0)");
	//find atom and add electron to it
	document.getElementById("canvas").appendChild(element);
	createObjectId(element);
	findObjectInObjectArrayWithId(atom.id).electrons.push({
		"id":element.id,
		"self":element
	});
}
function retrieveVectors(thing){

}
function findCoordinationSites(thing){
	//finds number of bonds or electrons attached to the atom
	currentAtomObject = findObjectInObjectArrayWithId(thing.id);
	console.log(currentAtomObject)
	console.log(currentAtomObject.bonds)
	//return array of object SVGS 
}
function getCenterOfAtom(thing){
	matrix = getMatrix(thing)
	var cx = parseFloat(thing.getAttributeNS(null, "x"))+parseFloat(thing.getAttributeNS(null, "font-size")/2.5)+matrix[4];
	var cy = parseFloat(thing.getAttributeNS(null, "y"))-parseFloat(thing.getAttributeNS(null, "font-size")/2.7)[5];
	return cx, cy;
}