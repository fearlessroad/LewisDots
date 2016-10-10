$(document).ready(function(){ 
	var atomCount = 0;
	var mousedown = false;
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
	var CreateElementObject = function(element){
			count += 1; 
			if(element == "C"){
				name = "Carbon";
				valence = 4;
			}
			else if(element == "H"){
				name = "Hydrogen";
				valence =  1;
			}
			else if(element == "O"){
				name = "Oxygen";
				valence = 6;
			}
			else if(element == "N"){
				name = "Nitrogen";
				valence = 5;
			}
		var obj = {
			id: count,
			name: name,
			valence: valence,
			bonds: [],
			createBond: function(atom){
				console.log("bond created between "+this.name+" and "+atom.name)
				this.bonds.push({id: atom.id, name: atom.name});
				atom.bonds.push({id: this.id, name: this.name});
				return this;
			}
		}
		return obj; 
	}
//********end object functions**********************//

	//*********drag the element function*************//
	function dragElement(thing){
		selected = thing;
		x_elem = x_pos - selected.offsetLeft; 
		y_elem = y_pos - selected.offsetTop;
	}
	function moveElement(e){
		x_pos = e.pageX;
		y_pos = e.pageY;
		if(selected != null){
			selected.style.left = (x_pos - x_elem) + 'px';
			selected.style.top = (y_pos - y_elem) + 'px';
		}
	}
	function destroy(){
		selected = null;
	}
	//***********END DRAG METHOD*******************//
// logic for creating an atom on the canvas
	var newAtom = function(x, y, hi){
		var NS = "http://www.w3.org/2000/svg";
		var element = document.createElementNS(NS, "text");
		element.setAttributeNS(null, "x", x-30);
		element.setAttributeNS(null, "y", y-15);
		element.setAttributeNS(null, "font-size", "50");
		element.setAttributeNS(null, "font-family", "sans-serif")
		element.setAttributeNS(null, "class", "element");
		element.innerHTML = hi;
		element.id = createAtomId();
		document.getElementById("canvas").appendChild(element);
	}
// each atom is given an atom ID
	var createAtomId = function(){
		atomCount += 1;
		return atomCount;
	}
// adding elements to the canvas
	var canvas = document.getElementById("canvas");



	// $(".element").mousedown(function(e){ //this function MUST come first
	$(document).on("mousedown", ".element", function(e){
		mousedown = true; //set this to true in order to distinguish this element from the svg container
		var x0 = this.x.baseVal[0].value; // element original x
		var y0 = this.y.baseVal[0].value; // element original y
		var mx0 = e.pageX; //mouse original x position
		var my0 = e.pageY; //mouse original y position
		console.log("original element position: "+x0+","+y0)
		console.log("original mouse position: "+mx0+","+my0)

	});


	// $(".canvasDiv").mousedown(function(e){

	$(document).on("mousedown", ".canvasDiv", function(e){
		if (mousedown == true){
			mousedown = false;
			return;
		}
		else{
			var lastClick = click[click.length-1];
			if(lastClick){
			console.log("clicked");
				if(lastClick.behavior == "edit"){
					console.log("edit mode")
				}
				else if (lastClick.behavior == "select"){
					console.log("selected an element");
					newAtom(e.pageX, e.pageY, lastClick.element);
					addClick(e.pageX, e.pageY, "placed", lastClick.element);
				}
				else if(lastClick.behavior == "placed"){
					console.log("placed an element")
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
			console.log(thisElement);
			addClick(e.pageX, e.pageY, "select", thisElement);
		}
		console.log(click);
	});
	$('text#1.element').mousedown(function(e){
		e.stopPropagation();
		console.log("element clicked");
	})
});
