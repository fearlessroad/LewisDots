//********OBJECT FUNCTIONS***************************//
	// var count = 0;
	var valence = null;
	var objectCount = 0;
	var ObjectArray = [];

//change this to findValenceNumber(object); 
	// var createAtomObject = function(element){
	// 		// count += 1; 
	// 		if(element.innerHTML == "C"){
	// 			name = "Carbon";
	// 			valence = 4;
	// 		}
	// 		else if(element.innerHTML == "H"){
	// 			name = "Hydrogen";
	// 			valence =  1;
	// 		}
	// 		else if(element.innerHTML == "O"){
	// 			name = "Oxygen";
	// 			valence = 6;
	// 		}
	// 		else if(element.innerHTML == "N"){
	// 			name = "Nitrogen";
	// 			valence = 5;
	// 		}
	// 		else{
	// 			name = "unknown";
	// 			valence = "unknown";
	// 		}
	// 	var obj = {
	// 		id: element.id,
	// 		name: name,
	// 		valence: valence,
	// 		self: element,
	// 		bonds: [],
	// 		createBond: function(atom){
	// 			console.log("bond created between "+this.name+" and "+atom.name)
	// 			this.bonds.push({id: atom.id, name: atom.name});
	// 			atom.bonds.push({id: this.id, name: this.name});
	// 			return this;
	// 		}
	// 	}
	// 	AtomArray.push(obj);
	// 	return obj; 
	// }
var findValenceNumber = function(object){ //takes the atom object, assigns a valence number and returns the valence number
	if(object.innerHTML == "C"){
		name = "Carbon";
		valence = 4;
	}
	else if(object.innerHTML == "H"){
		name = "Hydrogen";
		valence =  1;
	}
	else if(object.innerHTML == "O"){
		name = "Oxygen";
		valence = 6;
	}
	else if(object.innerHTML == "N"){
		name = "Nitrogen";
		valence = 5;
	}
	else{
		name = "unknown";
		valence = null;
	} 
	return valence;
}


// logic for creating an atom on the canvas
	var newAtom = function(x, y, hi){
		var NS = "http://www.w3.org/2000/svg";
		var element = document.createElementNS(NS, "text");
		element.setAttributeNS(null, "x", x-30);
		element.setAttributeNS(null, "y", y-15);
		element.setAttributeNS(null, "font-size", "50");
		element.setAttributeNS(null, "font-family", "sans-serif")
		element.setAttributeNS(null, "class", "element");
		element.setAttributeNS(null, "transform", "matrix(1 0 0 1 0 0)");
		// element.setAttributeNS(null, "onmousedown", "selectElement(evt)");
		element.innerHTML = hi;
		element.id = createObjectId(element);
		// createAtomObject(element);
		//this is where the atom is added to the object array
		createObjectArray(element);
		// console.log(AtomArray);
		console.log(ObjectArray);
		document.getElementById("canvas").appendChild(element);
	}




	//this is for keeping track of each individual SVG object on the page-- each one gets its own ID so it can be accessed individually
	var createObjectId = function(object){
		 objectCount += 1; 
		 object.id = objectCount; 
		 return object.id;
	}
	var createObjectArray = function(svg){ 
		var obj = {
			id:svg.id,
			self:svg,
			bonds: [], 
			valence: findValenceNumber(svg)
		}
		ObjectArray.push(obj);
		return obj;
	}
	var findObjectInObjectArrayWithId = function(id){
		for (var i = 0; i < ObjectArray.length; i++){
			if (ObjectArray[i].id == id){
				return ObjectArray[i];
			}
		}
	}
