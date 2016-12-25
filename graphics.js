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
			//console.log('inside selectElement function')
			selectedElement = evt.target;
			currentX = evt.clientX;
			currentY = evt.clientY;
			currentMatrix = selectedElement.getAttributeNS(null, "transform").slice(7, -1).split(' ');
				for (var i=0; i<currentMatrix.length; i++){
					currentMatrix[i] = parseFloat(currentMatrix[i]);
				}
			// selectedElement.setAttributeNS(null, "onmousemove", "moveElement(evt)");
			selectedElement.setAttributeNS(null, "onmousemout", "deselectElement(evt)");
			selectedElement.setAttributeNS(null, "onmouseup", "deselectElement(evt)");
		
		}
		function moveElement(evt){
			dx = evt.clientX - currentX;
			dy = evt.clientY - currentY;
			currentMatrix[4] += dx;
			currentMatrix[5] += dy;
			newMatrix = "matrix("+currentMatrix.join(' ')+")";
			selectedElement.setAttributeNS(null, "transform", newMatrix);
			// console.log(selectedElement.x.baseVal[0].value); 
			currentX = evt.clientX;
			currentY = evt.clientY;
			// selectedElement.x.baseVal[0].value = dx;
			// selectedElement.y.baseVal[0].value = dy;
			// selectedElement.setAttributeNS(null, "x", dx);
			// selectedElement.setAttributeNS(null, "y", dy);
		}
		function deselectElement(evt){
			console.log("element deselected")
			if(selectedElement !== 0){
				// selectedElement.removeAttributeNS(null, "onmousemove");
				// console.log('hi');
				// console.log(selectedElement.x);
				// console.log(selectedElement.x.baseVal[0].value);
				// console.log(selectedElement.transform.baseVal[0].matrix.e);
				selectedElement.removeAttributeNS(null, "onmouseout");
				selectedElement.removeAttributeNS(null, "onmouseup");
				selectedElement = 0;
				$(window).off("mousemove", moveElement(evt))
			}
			else{
				console.log("selected element must be zero?")
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
			console.log('hi, i will try to end the bond now');
			console.log('this is object array: '+ ObjectArray[0].id)
			bondStarted = false;
			currentBond.setAttributeNS(null, "x2", end.x.baseVal[0].value+(end.scrollWidth/2));
			currentBond.setAttributeNS(null, "y2", end.y.baseVal[0].value-(end.scrollHeight/3));
			returnObjectWithId(1);
			console.log(end.id + " is the ending atom");
			console.log(currentAtom.id + " is the starting atom");

		}
//function to find a particular svg object with a specific id
		function returnObjectWithId(id){
			for (var i = 0; i<ObjectArray.length-1; i++){
				if (ObjectArray[i].id == id){
					return ObjectArray[i].self
				}
			}
		}
		function manipulateBond(e){
			// console.log("inside manipulateBond function")
			// var x1 = currentBond.x1.baseVal.value;
			// var y1 = currentBond.y1.baseVal.value;
			radius = (((currentAtom.scrollHeight/2)^2)+((currentAtom.scrollWidth/2)^2))^(1/2);
			// console.log(currentBond.x1.baseVal.value);
			if(e.pageX>x){ // && e.pageY>y){ //quadrant IV (lower right) 
				currentBond.setAttributeNS(null, "x1", x+(1/2)*radius*Math.cos(Math.atan((e.pageY-y)/(e.pageX-x))));
				currentBond.setAttributeNS(null, "y1", y+(1/2)*radius*Math.sin(Math.atan((e.pageY-y)/(e.pageX-x))));

			}
			// else if(e.pageX>x){ // && e.pageY<y){ //quadrant I (upper right)
			// 	currentBond.setAttributeNS(null, "x1", x+(1/2)*radius*Math.cos(Math.atan((e.pageY-y)/(e.pageX-x))));
			// 	currentBond.setAttributeNS(null, "y1", y+(1/2)*radius*Math.sin(Math.atan((e.pageY-y)/(e.pageX-x))));
			// }
			else if(e.pageX<x){ //&& e.pageY>y){ //quadrant III (lower left)
				currentBond.setAttributeNS(null, "x1", x-(1/2)*radius*Math.cos(Math.atan((e.pageY-y)/(e.pageX-x))));
				currentBond.setAttributeNS(null, "y1", y-(1/2)*radius*Math.sin(Math.atan((e.pageY-y)/(e.pageX-x))));
			}
			// else if(e.pageX<x){// && e.pageY<y){ //quadrant II (upper left)
			// 	currentBond.setAttributeNS(null, "x1", x-(1/2)*radius*Math.cos(Math.atan((e.pageY-y)/(e.pageX-x))));
			// 	currentBond.setAttributeNS(null, "y1", y-(1/2)*radius*Math.sin(Math.atan((e.pageY-y)/(e.pageX-x))));
			// }
			currentBond.setAttributeNS(null, "x2", e.pageX);
			currentBond.setAttributeNS(null, "y2", e.pageY);

		}

