var valence = null;
var objectCount = 0;
var ObjectArray = [];
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
			electrons:[],
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
	function returnObjectWithId(id){
		for (var i = 0; i<ObjectArray.length; i++){
			if (ObjectArray[i].id == id){
				return ObjectArray[i].self
			}
		}
	}
