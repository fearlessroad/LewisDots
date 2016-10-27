
		var selectedElement = 0;
		var currentX = 0;
		var currentY = 0;
		var currentMatrix = 0;
		var AtomArray = [];
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
		function startBond(start){ //start must be an element object
			var x = start.x.baseVal[0].value;
			var y = start.y.baseVal[0].value; // grab x and y coordinates of the object
			var NS = "http://www.w3.org/2000/svg";
			////still working on this
			var element = document.createElementNS(NS, "line");
			element.setAttributeNS(null, "x1", x);
			element.setAttributeNS(null, "y1", y);
			///still working on this
		}
		function endBond(end){

		}
$(document).ready(function(){ 
	console.log(testVariable);
	var atomCount = 0;
	var mousedown = false;
	selected = null;
	x0 = 0;
	y0 = 0;
	mx0 = 0;
	my0 = 0;
	// addClick function that saves click position
	var click = new Array();
// each click is assigned a set of values 
	function addClick(x, y, behavior, element){
		click.push({
			x: x,
			y: y,
			behavior: behavior,
			element: element
		});
	}

//********OBJECT FUNCTIONS***************************//
	var count = 0;
	var valence = null;
	var CreateElementObject = function(element){
			count += 1; 
			if(element.innerHTML == "C"){
				name = "Carbon";
				valence = 4;
			}
			else if(element.innerHTML == "H"){
				name = "Hydrogen";
				valence =  1;
			}
			else if(element.innerHTML == "O"){
				name = "Oxygen";
				valence = 6;
			}
			else if(element.innerHTML == "N"){
				name = "Nitrogen";
				valence = 5;
			}
		var obj = {
			id: count,
			name: name,
			valence: valence,
			self: element,
			bonds: [],
			createBond: function(atom){
				console.log("bond created between "+this.name+" and "+atom.name)
				this.bonds.push({id: atom.id, name: atom.name});
				atom.bonds.push({id: this.id, name: this.name});
				return this;
			}
		}
		AtomArray.push(obj);
		return obj; 
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
		element.id = createAtomId();
		CreateElementObject(element);
		console.log(AtomArray);
		document.getElementById("canvas").appendChild(element);
	}
// each atom is given an atom ID
	var createAtomId = function(){
		atomCount += 1;
		return atomCount;
	}
// adding elements to the canvas
	var canvas = document.getElementById("canvas");

//this function MUST come first

	$(document).on("mousedown", ".element", function(e){
		var lastClick = click[click.length-1];
		if (lastClick.behavior == "single-bond"){
			console.log("i want to bond");
			startBond(this);
		}
		else{

		selectElement(e);
		mousedown = true; //set this to true in order to distinguish this element from the svg container
		}
	});
	$(document).on("mousemove", function(e){
		if (selectedElement != 0){
			moveElement(e);
		}
	})
	$(document).on("mouseup", ".element", function(e){
		// destroy();
	})

	$(document).on("mousedown", ".canvasDiv", function(e){
		if (mousedown == true){
			mousedown = false;
			return;
		}
		else{
			var lastClick = click[click.length-1];
			if(lastClick){
			// console.log("clicked");
				if(lastClick.behavior == "edit"){
					// console.log("edit mode")
				}
				else if (lastClick.behavior == "select"){
					// console.log("selected an element");
					newAtom(e.pageX, e.pageY, lastClick.element);
					addClick(e.pageX, e.pageY, "placed", lastClick.element);
				}
				else if(lastClick.behavior == "placed"){
					// console.log("placed an element")
					newAtom(e.pageX, e.pageY, lastClick.element);
					addClick(e.pageX, e.pageY, "placed", lastClick.element);
				}
			}
		}
	})

	$('#canvas').mouseup(function(e){
		// paint = false;
	});
	$('#canvas').mouseleave(function(e){
		// paint = false;
	})
	$('.tool-active').mousedown(function(e){
		if ($(this)[0].innerText == ""){
			console.log($(this)[0].id);
			if($(this)[0].id == "edit-svg"){
				addClick(e.pageX, e.pageY, "edit", false)
				console.log(click);
			}
			else if($(this)[0].id == "electron"){
				addClick(e.pageX, e.pageY, "electron", false)
			}
			else if($(this)[0].id == "single-bond"){
				addClick(e.pageX, e.pageY, "single-bond", false)
			}
		}
		else{
			var thisElement = $(this)[0].innerText;
			// console.log(thisElement);
			addClick(e.pageX, e.pageY, "select", thisElement);
		}
	});
});