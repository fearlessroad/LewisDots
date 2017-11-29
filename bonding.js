function startBond(start){ //start must be an element object
	bondStarted = true;  //here!!!
	console.log(start.dx); //this is the element object id of the first atom to be connected through bonds
	console.log("x-value"+start.x.baseVal[0].value);
	//console.log(extractMatrix(start.id)); // this is a matrix that represents the position of the first element in the bond
	console.log(extractMatrix(start.id)[4]); // this is the x element in the transform matrix for translations; similarly, the 6th element (i=5) corresponds to the y value for translation 
	//x = start.x.baseVal[0].value//(start.scrollWidth/2)//+extractMatrix(start.id)[4];
	//y = start.y.baseVal[0].value;//-(start.scrollHeight/3)//+ extractMatrix(start.id)[5]; // grab x and y coordinates of the object

	var bottomLeftCornerX = start.getAttributeNS(null, "x");
	var halfWidth = start.getAttributeNS(null, "font-size")/3; //randomly assuming that a factor of three will work
	x = parseInt(bottomLeftCornerX) + halfWidth; //parseInt is used because bottomLeftCornerX is a string
	
	console.log("bottomLeftCornerX "+ bottomLeftCornerX);

	var bottomLeftCornerY = start.getAttributeNS(null, "y");
	var halfHeight = start.getAttributeNS(null, "font-size")/2; 
	y = bottomLeftCornerY - halfHeight;
	console.log("x,y: "+x+" , "+y)
	//why did I comment this out?? We aren't doing any transformations, so it doesn't make sense that we would be *adding* a transformation element to actual values for x and y...? Still trying to figure this out

	var element = document.createElementNS(NS, "line");
	element.setAttributeNS(null, "stroke", "#000000");
	element.setAttributeNS(null, "stroke-width", "2");
	element.setAttributeNS(null, "x1", x);
	element.setAttributeNS(null, "y1", y);
	element.setAttributeNS(null, "x2", x);
	element.setAttributeNS(null, "y2", y);
	document.getElementById("canvas").appendChild(element);
	currentBond = element;
	currentAtom = start;
		}
function endBond(end){
	bondStarted = false;
	console.log(end.x.baseVal[0].value);
	//currentBond.setAttributeNS(null, "x2", end.x.baseVal[0].value+(end.scrollWidth/2)+extractMatrix(end.id)[4]);
	//currentBond.setAttributeNS(null, "y2", end.y.baseVal[0].value-(end.scrollHeight/3)+extractMatrix(end.id)[5]);
	newX = parseFloat(end.getAttributeNS(null, "x"));
	newY = parseFloat(end.getAttributeNS(null, "y"));
	mat = end.getAttributeNS(null, "transform").split('(')[1].split(')')[0].split(' ');
	matX = parseFloat(mat[4]);
	matY = parseFloat(mat[5]);
	correction = currentAtom.getAttributeNS(null, "font-size")/3;
	console.log(correction)
	console.log(mat)
	console.log("matX"+matX)
	console.log(newX+matX)
	console.log(currentBond)
	//newMatY = end.getAttributeNS(null, "transform").split('(')[1]
	currentBond.setAttributeNS(null, "x2", newX+matX);
	console.log(end)//you need to add to this x the matrix value 
	currentBond.setAttributeNS(null, "y2", newY+matY-correction);
	end.setAttributeNS(null, "transform", "matrix(1 0 0 1 0 0)")
	createObjectId(currentBond);
	createObjectArray(currentBond);
	findObjectInObjectArrayWithId(currentBond.id).bonds.push({
			"x1":currentAtom.id, 
			"x2":end.id
		});
	findObjectInObjectArrayWithId(currentAtom.id).bonds.push(currentBond.id);
	findObjectInObjectArrayWithId(end.id).bonds.push(currentBond.id);
}
function manipulateBond(e){ //manipulating bond after the bond was started, THIS HAS NOTHING TO DO WITH MOVING THE ELEMENTS
	//radius = (((currentAtom.scrollHeight/2)^2)+((currentAtom.scrollWidth/2)^2))^(1/2);
	console.log('manipulating bond')
	radius = (((currentAtom.getAttributeNS(null, "font-size")/2)^2)+(currentAtom.getAttributeNS(null, "font-size")/3)^2)^(1/2);
	console.log(radius);
	if(e.pageX>x){ // && e.pageY>y){ //quadrant IV (lower right) 
		console.log(x)
		console.log(e.pageX)
		//currentBond.setAttributeNS(null, "x1", x-(1/2)*radius*Math.cos(Math.atan((e.pageY-y)/(e.pageX-x))));
		//currentBond.setAttributeNS(null, "y1", y+(1/2)*radius*Math.sin(Math.atan((e.pageY-y)/(e.pageX-x))));
		currentBond.setAttributeNS(null, "x1", x+(1/2)*radius*Math.cos(Math.atan((e.pageY-y)/(e.pageX-x))));
		currentBond.setAttributeNS(null, "y1", y+(1/2)*radius*Math.sin(Math.atan((e.pageY-y)/(e.pageX-x))));
	}
	else if(e.pageX<x){ //&& e.pageY>y){ //quadrant III (lower left)
		console.log(x)
		console.log(e.pageX)
		//currentBond.setAttributeNS(null, "x1", x+(1/2)*radius*Math.cos(Math.atan((e.pageY-y)/(e.pageX-x))));
		//currentBond.setAttributeNS(null, "y1", y-(1/2)*radius*Math.sin(Math.atan((e.pageY-y)/(e.pageX-x))));
		currentBond.setAttributeNS(null, "x1", x-(1/2)*radius*Math.cos(Math.atan((e.pageY-y)/(e.pageX-x))));
		currentBond.setAttributeNS(null, "y1", y-(1/2)*radius*Math.sin(Math.atan((e.pageY-y)/(e.pageX-x))));
	}
	currentBond.setAttributeNS(null, "x2", e.pageX);
	currentBond.setAttributeNS(null, "y2", e.pageY);


	// currentBond.setAttributeNS(null, "x2", e.pageX);
	// currentBond.setAttributeNS(null, "y2", e.pageY);

}