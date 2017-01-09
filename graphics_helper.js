var bondedMatrix = null;
var extractBondedAtomCoordinates = function(){
	//function function function 
	for (var i = 0; i<findObjectInObjectArrayWithId(selectedElement.id).bonds.length; i++){ // finding the bonds of the ATOM that is currently beind moved(selectedElement)
		var moveElementBondId = findObjectInObjectArrayWithId(selectedElement.id).bonds[i] // this should return the id of the bond itself. 
		//now you need to set currentBond to THIS BOND
		currentBond = document.getElementById(moveElementBondId);
		//The bond itself, when searched for its "bond" array in the ObjectArray, should return TWO atom ids. 
		var moveElementBondedAtomId = extractBondedAtomId(moveElementBondId); // this should return the Bonded Atom Id so we now have that Id and the Bond Id
		console.log("function works"+extractBondedMatrix(moveElementBondedAtomId));
		console.log(bondedMatrix); // the matrix extracted from the bonded Atom Id
		console.log("this is the bonded atom matrix: "+document.getElementById(moveElementBondedAtomId[1]).getAttributeNS(null, "transform"));//this logs the elements transform matrix
		console.log("this is the bonded atom current x,y coordinates: "+document.getElementById(moveElementBondedAtomId[1]).x.baseVal[0].value+","+document.getElementById(moveElementBondedAtomId[1]).y.baseVal[0].value)
		//One will be the selected object (selectedElement.id), the other will be the attached atom. We need to grab the attached atom x,y coordinates by looking it up with document.getElementById (the one that is NOT selectedElement)
		//console.log("testing: "+document.getElementById(moveElementBondedAtomId));
		currentBond.setAttributeNS(null, "x2", selectedElement.x.baseVal[0].value+currentMatrix[4]);
		currentBond.setAttributeNS(null, "y2", selectedElement.y.baseVal[0].value+currentMatrix[5]);
	}
	//current problem: January 8, 2017: 
	//need to distinguish between the x1,y1 and x2,y2 of the bond while we move atoms. determine which atom is bonded to x1,y1 side and which atom is bonded to x2,y2 side. then we know which side of the bond to edit in what way... right? 
	//simple option 1: use distance formula? determine to which end of the bond the selected element is closest. THAT bond will follow the new atom. 
}
var extractBondedMatrix = function(moveElementBondedAtomId){
	bondedMatrix = document.getElementById(moveElementBondedAtomId[1]).getAttributeNS(null, "transform").slice(7, -1).split(' ');
	for (var i = 0; i < bondedMatrix.length; i++){
		bondedMatrix[i] = parseFloat(bondedMatrix[i]);
	}
	return bondedMatrix;
}
var extractBondedAtomId = function(moveElementBondId)	{
	for (var j=0; j<findObjectInObjectArrayWithId(moveElementBondId).bonds.length; j++){
		if (findObjectInObjectArrayWithId(moveElementBondId).bonds[j] != selectedElement.id){
			var bob = new Array();
			bob[1] = findObjectInObjectArrayWithId(moveElementBondId).bonds[j];
			if(j==0){
				bob[0] = "x1";
				return bob;
			}
			else{
				bob[0] = "x2";
				return bob;	
			}
			// console.log("this atom is attached to atom number: "+findObjectInObjectArrayWithId(moveElementBondId).bonds[j])
		}
	}
}