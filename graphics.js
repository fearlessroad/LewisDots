//moving atoms
		var selectedElement = 0;
		var currentX = 0;
		var currentY = 0;
		var currentMatrix = 0;
		var AtomArray = [];
		var BondArray = [];
		var bondStarted = false;
		var currentBond = null; 
		var x = null; 
		var y = null;
		var radius = null; 
		function selectElement(evt){
			selectedElement = evt.target;
			currentX = evt.clientX;
			currentY = evt.clientY;
			currentMatrix = selectedElement.getAttributeNS(null, "transform").slice(7, -1).split(' ');
				for (var i = 0; i < currentMatrix.length; i++){
					currentMatrix[i] = parseFloat(currentMatrix[i]);
				}
			selectedElement.setAttributeNS(null, "onmousemout", "deselectElement(evt)");
			selectedElement.setAttributeNS(null, "onmouseup", "deselectElement(evt)");
		}
		function moveElement(e){
			dx = e.clientX - currentX;
			dy = e.clientY - currentY;
			currentMatrix[4] += dx;
			currentMatrix[5] += dy;
			newMatrix = "matrix("+currentMatrix.join(' ')+")";
			selectedElement.setAttributeNS(null, "transform", newMatrix); 
			currentX = e.clientX;
			currentY = e.clientY;
		}
		function deselectElement(e){
			console.log("element deselected")
			if(selectedElement !== 0){
				selectedElement.removeAttributeNS(null, "onmouseout");
				selectedElement.removeAttributeNS(null, "onmouseup");
				selectedElement = 0;
				$(window).off("mousemove", moveElement(e))
			}
		}
// bonding 
		function startBond(start){ //start must be an element object
			bondStarted = true;  
			x = start.x.baseVal[0].value+(start.scrollWidth/2);
			y = start.y.baseVal[0].value-(start.scrollHeight/3); // grab x and y coordinates of the object
			var NS = "http://www.w3.org/2000/svg";
			////still working on this
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
			currentBond.setAttributeNS(null, "x2", end.x.baseVal[0].value+(end.scrollWidth/2));
			currentBond.setAttributeNS(null, "y2", end.y.baseVal[0].value-(end.scrollHeight/3));
			returnObjectWithId(1);
			console.log(end.id + " is the ending atom");
			console.log(currentAtom.id + " is the starting atom");

		}
//function to find a particular svg object with a specific id
		function returnObjectWithId(id){
			for (var i = 0; i<ObjectArray.length; i++){
				if (ObjectArray[i].id == id){
					return ObjectArray[i].self
				}
			}
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

