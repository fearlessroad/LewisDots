//moving atoms
		var selectedElement = 0;
		var currentX = 0;
		var currentY = 0;
		var currentMatrix = 0;
		var AtomArray = [];
		var bondStarted = false;
		var currentBond = null; 
		function selectElement(evt){
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
			currentX = evt.clientX;
			currentY = evt.clientY;
		}
		function deselectElement(evt){
			console.log("element deselected")
			if(selectedElement != 0){
				// selectedElement.removeAttributeNS(null, "onmousemove");
				selectedElement.removeAttributeNS(null, "onmouseout");
				selectedElement.removeAttributeNS(null, "onmouseup");
				selectedElement = 0;
				$(window).off("mousemove", moveElement(evt))
			}
		}
// bonding 
		function startBond(start){ //start must be an element object
			bondStarted = true;  
			var x = start.x.baseVal[0].value+(start.scrollWidth/2);
			var y = start.y.baseVal[0].value-(start.scrollHeight/3); // grab x and y coordinates of the object
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
		function manipulateBond(e){
			console.log("inside manipulateBond function")
			var x1 = currentBond.x1.baseVal.value;
			var y1 = currentBond.y1.baseVal.value;
			dx = currentAtom.scrollWidth/2;
			console.log(currentBond.x1.baseVal.value);

			// console.log(e.pageX);
			currentBond.setAttributeNS(null, "x2", e.pageX);
			currentBond.setAttributeNS(null, "y2", e.pageY);

		}

