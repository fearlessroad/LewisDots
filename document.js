	var atomCount = 0;
	var mousedown = false;
	selected = null;

$(document).ready(function(){ 
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
// adding elements to the canvas
	var canvas = document.getElementById("canvas");
//this function MUST come first
	$(document).on("mousedown", ".element", function(e){
		var lastClick = click[click.length-1];
		if (lastClick.behavior == "start-single-bond"){
			startBond(this);
			//console.log(this.id);
			addClick(null, null, "end-single-bond", this.innerHTML)
			selected = this.id;
		}
		else if (lastClick.behavior == "end-single-bond"){
			endBond(this);
			addClick(null, null, "single-bond-ended", this.innerHTML);
		}
		else if (lastClick.behavior == "add-electron"){
			addElectron(this);
			console.log('addElectron function completed');
			addClick(null, null, "add-electron", false);
		}
		else{
		//console.log(click);
		selectElement(e);
		mousedown = true; //set this to true in order to distinguish this element from the svg container
		}
		// console.log(click);
		// console.log(ObjectArray);
	});
	$(document).on("mousemove", function(e){
		if (selectedElement != 0){
			moveElement(e);//graphics.js
		}
		else if(bondStarted == true){
			//console.log("bond started is working");
			manipulateBond(e)//bonding.js
		}
	})
	$(document).on("mouseup", ".element", function(e){
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
					//this is where a new atom is added to the page
					newAtom(e.pageX, e.pageY, lastClick.element);
					addClick(e.pageX, e.pageY, "placed", lastClick.element);
				}
				//this is a duplicate piece of code that could be added to the above piece
				else if(lastClick.behavior == "placed"){
					// console.log("placed an element")
					//this is where a new atom is added to the page
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
		$(".tool-active").css("background-color", "white");
		$(this).css("background-color", "#e6f3ff");
		if ($(this)[0].innerText == ""){
			//console.log($(this)[0].id);
			if($(this)[0].id == "edit-svg"){
				addClick(e.pageX, e.pageY, "edit", false)
				//console.log(click);
			}
			else if($(this)[0].id == "electron"){
				addClick(e.pageX, e.pageY, "add-electron", false)
			}
			else if($(this)[0].id == "single-bond"){
				//console.log(this);
				//$(this).css("background-color", "gray");
				addClick(e.pageX, e.pageY, "start-single-bond", false)
			}
		}
		else{
			var thisElement = $(this)[0].innerText;
			addClick(e.pageX, e.pageY, "select", thisElement);
		}
	});
});