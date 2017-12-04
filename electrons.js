function addElectron(atom){
	//if atom has a bond already or electron, find the best place to put the new electron
	//var xpos = parseFloat(atom.getAttributeNS(null, "x"))-10;
	//var ypos = parseFloat(atom.getAttributeNS(null, "y"))+10; 
	var matrix = getMatrix(atom)
	var sites = findCoordinationSites(atom);
	var positions = getElectronCoordinates(atom, sites);
	var xpos = positions[0];
	var ypos = positions[1];
	var NS = "http://www.w3.org/2000/svg";
	var element = document.createElementNS(NS, "circle");
	element.setAttributeNS(null, "cx", xpos);
	element.setAttributeNS(null, "cy", ypos);
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
function getElectronCoordinates(atom, coords){
	//console.log('here!')
	var radius = getRadius(atom);
	var matrix = getMatrix(atom);
	var c = getCenterOfAtom(atom);
	var cx = c[0];
	var cy = c[1];
	//console.log(coords+"coords")
	//console.log(coords[0]+"coords[0]")
	//console.log(coords.length+"coords length")	
	if (coords.length == 0){
		//put electron on top
		xpos = cx;
		ypos = cy - radius;
	}
	//for zero sites, slap the electron on anywhere
	else if(coords.length == 1){
		xpos = (2*cx)-coords[0][0];
		ypos = (2*cy)-coords[0][1];
	//for 1 site, slap electron opposite
	}
	else if(coords.length ==2){
		console.log('2 bonds');
		//find vector 1 (z axis)
		//v1 = [cx, cy+radius]
		var v1 = [coords[0][0]-cx, coords[0][1]-cy];
		var v2 = [coords[1][0]-cx, coords[1][1]-cy];
		var dot = v1[0]*v2[0]+v1[1]*v2[1];
		var magv1 = mag(v1);
		var magv2 = mag(v2);
		var radians = Math.acos(dot/(magv1*magv2));
		var deg = radians*(180/Math.PI)
		console.log(deg);

		//xpos = cx;
		//ypos = cy - radius;
	}
	//for 2 sites, find vectors
	else if(coords.length >= 3){
		xpos = cx;
		ypos = cy - radius;
		alert('OOps we cant do that yet');
	}
	return [xpos, ypos];
	//for 3 or more sites, loop
}
function mag(vector){
	len = vector.length
	sum = 0
	for (var i =0; i<len; i++){
		sum += Math.pow(vector[i], 2)
	}
	return Math.pow(sum, 0.5)
}
function findCoordinationSites(thing){
	var sites = [];
	//finds number of bonds or electrons attached to the atom
	currentAtomObject = findObjectInObjectArrayWithId(thing.id);
	//console.log(currentAtomObject);
	//console.log(ObjectArray);
	var bondIdArray = currentAtomObject.bonds;
	//console.log(bondIdArray+" :bond ID array")
	//console.log(bondIdArray.length+" :bond id array length") //bondIdArray contains a list of all the IDs of the attached bonds to thing
	var bonds = [];
	for (k = 0; k<bondIdArray.length; k++){
		bond = findObjectInObjectArrayWithId(bondIdArray[k])
		atomIdObject = bond.bonds[0] //this stupid zero
		//console.log(bond)
		//console.log(atomIdObject.x1)
		//console.log(thing.id)
		if(atomIdObject.x1 == thing.id){
			//console.log('this is x1');
			sites.push([
				bond.self.getAttributeNS(null, "x1"),
				bond.self.getAttributeNS(null, "y1")]);
		}
		else{
			//console.log('this is x2');
			sites.push([
				bond.self.getAttributeNS(null, "x2"),
				bond.self.getAttributeNS(null, "y2")]);
		}
	}
	//sites.append(bonds);
	//console.log(sites)

	var electrons = currentAtomObject.electrons;
	for (var j = 0; j<electrons.length; j++){//for electrons, grab cx, cy coordinates
		var electron = electrons[j].self
		var elmatrix = getMatrix(electron)
		var elx = parseFloat(electron.getAttributeNS(null, "cx")) + elmatrix[4]
		var ely = parseFloat(electron.getAttributeNS(null, "cy")) + elmatrix[5]
		//console.log(electrons[j].self);
		//console.log(electrons.length+"length");
		//console.log(ObjectArray);
		//var electron = findObjectInObjectArrayWithId(electrons[j].id);
		//console.log(electron);
		sites.push([elx, ely])
	}
	//return array of object SVG COORDINATES
	return sites;
}
function getCenterOfAtom(thing){
	var matrix = getMatrix(thing)
	var cx = parseFloat(thing.getAttributeNS(null, "x"))+parseFloat(thing.getAttributeNS(null, "font-size")/2.5)+matrix[4];
	var cy = parseFloat(thing.getAttributeNS(null, "y"))-parseFloat(thing.getAttributeNS(null, "font-size")/2.7)+matrix[5];
	return [cx, cy];
}
function typeOfObject(id){
	var object = findObjectInObjectArrayWithId(id)
	var type = object.self.nodeName
	return type;
}