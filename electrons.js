function addElectron(atom){
	//if atom has a bond already or electron, find the best place to put the new electron
	xpos = parseFloat(atom.getAttributeNS(null, "x"))-10;
	ypos = parseFloat(atom.getAttributeNS(null, "y"))+10; 
	matrix = getMatrix(atom)
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
	console.log(atom.x.baseVal[0].value)
	console.log(atom.getAttributeNS(null, "x"))
}
function retrieveVectors(thing){

}
function findCenterOfAtom(thing){
	var cx = parseFloat(thing.getAttributeNS(null, "x"))+parseFloat(thing.getAttributeNS(null, "font-size"));
	var cy = parseFloat(thing.getAttributeNS(null, "y"));
}