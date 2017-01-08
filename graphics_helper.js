var extractBondedAtomCoordinates = function(){
	//code code code
}

var extractBondedAtomId = function(moveElementBondId)	{
	for (var j=0; j<findObjectInObjectArrayWithId(moveElementBondId).bonds.length; j++){
		if (findObjectInObjectArrayWithId(moveElementBondId).bonds[j] != selectedElement.id){
			// console.log("this atom is attached to atom number: "+findObjectInObjectArrayWithId(moveElementBondId).bonds[j])
			return findObjectInObjectArrayWithId(moveElementBondId).bonds[j];
		}
	}
}