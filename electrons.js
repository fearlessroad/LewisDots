function addElectron(atom){
	//if atom has a bond already or electron, find the best place to put the new electron
	var xpos = parseFloat(atom.getAttributeNS(null, "x"))-10;
	var ypos = parseFloat(atom.getAttributeNS(null, "y"))+10; 
	var matrix = getMatrix(atom)
	typeOfObject(atom.id);
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
	//console.log(ObjectArray)
}
function retrieveVectors(thing){

}
function findCoordinationSites(thing){
	var sites = [];
	//finds number of bonds or electrons attached to the atom
	currentAtomObject = findObjectInObjectArrayWithId(thing.id);
	//console.log(currentAtomObject);
	console.log(ObjectArray);
	var bondIdArray = currentAtomObject.bonds;
	//console.log(bondIdArray+" :bond ID array")
	console.log(bondIdArray.length+" :bond id array length") //bondIdArray contains a list of all the IDs of the attached bonds to thing
	var bonds = [];
	for (k = 0; k<bondIdArray.length; k++){
		bond = findObjectInObjectArrayWithId(bondIdArray[k])
		atomIdObject = bond.bonds[0]
		console.log(bond)
		console.log(atomIdObject.x1)
		console.log(thing.id)
		if(atomIdObject.x1 == thing.id){
			console.log('this is x1');
			bonds.push([
				bond.self.getAttributeNS(null, "x1"),
				bond.self.getAttributeNS(null, "y1")]);
		}
		else{
			console.log('this is x2');
			bonds.push([
				bond.self.getAttributeNS(null, "x2"),
				bond.self.getAttributeNS(null, "y2")]);
		}
	}
	console.log(bonds)

	//var electrons = currentAtomObject.electrons;
	//for (var i = 0; i<bonds.length; i++){//for bonds, find WHICH SIDE of the bond we are on, and what the x,y values are
		//console.log('bond length: '+bonds.length);
	//	var atomIds = findObjectInObjectArrayWithId(bonds[i]).bonds;
		//console.log(atomIds);
		//sites.append(findObjectInObjectArrayWithId(bonds[i]))
	//}
	//for (var j = 0; j<electrons.length; j++){//for electrons, grab cx, cy coordinates
	//	var electron = findObjectInObjectArrayWithId(electrons[j]).self;
	//	sites.append(electron)
	//}
	//return array of object SVG COORDINATES
}
function getCenterOfAtom(thing){
	var matrix = getMatrix(thing)
	var cx = parseFloat(thing.getAttributeNS(null, "x"))+parseFloat(thing.getAttributeNS(null, "font-size")/2.5)+matrix[4];
	var cy = parseFloat(thing.getAttributeNS(null, "y"))-parseFloat(thing.getAttributeNS(null, "font-size")/2.7)[5];
	return cx, cy;
}
function typeOfObject(id){
	var object = findObjectInObjectArrayWithId(id)
	var type = object.self.nodeName
	return type;
}