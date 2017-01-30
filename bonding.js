function startBond(start){ //start must be an element object
	bondStarted = true;  //here!!!
	console.log(start.id)
	console.log(extractMatrix(start.id)[4]);
	x = start.x.baseVal[0].value+(start.scrollWidth/2)+extractMatrix(start.id)[4];
	y = start.y.baseVal[0].value-(start.scrollHeight/3)+ extractMatrix(start.id)[5]; // grab x and y coordinates of the object
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
	currentBond.setAttributeNS(null, "x2", end.x.baseVal[0].value+(end.scrollWidth/2)+extractMatrix(end.id)[4]);
	currentBond.setAttributeNS(null, "y2", end.y.baseVal[0].value-(end.scrollHeight/3)+extractMatrix(end.id)[5]);
	createObjectId(currentBond);
	createObjectArray(currentBond);
	findObjectInObjectArrayWithId(currentBond.id).bonds.push({
			"x1":currentAtom.id, 
			"x2":end.id
		});
	findObjectInObjectArrayWithId(currentAtom.id).bonds.push(currentBond.id);
	findObjectInObjectArrayWithId(end.id).bonds.push(currentBond.id);
}
function manipulateBond(e){
	radius = (((currentAtom.scrollHeight/2)^2)+((currentAtom.scrollWidth/2)^2))^(1/2);
	if(e.pageX>x){ // && e.pageY>y){ //quadrant IV (lower right) 
		currentBond.setAttributeNS(null, "x1", x+(1/2)*radius*Math.cos(Math.atan((e.pageY-y)/(e.pageX-x))));
		currentBond.setAttributeNS(null, "y1", y+(1/2)*radius*Math.sin(Math.atan((e.pageY-y)/(e.pageX-x))));
	}
	else if(e.pageX<x){ //&& e.pageY>y){ //quadrant III (lower left)
		currentBond.setAttributeNS(null, "x1", x-(1/2)*radius*Math.cos(Math.atan((e.pageY-y)/(e.pageX-x))));
		currentBond.setAttributeNS(null, "y1", y-(1/2)*radius*Math.sin(Math.atan((e.pageY-y)/(e.pageX-x))));
	}
	currentBond.setAttributeNS(null, "x2", e.pageX);
	currentBond.setAttributeNS(null, "y2", e.pageY);
}