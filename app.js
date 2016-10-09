$(document).ready(function(){ 
	var atomCount = 0;
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
// logic for creating an atom on the canvas
	var newAtom = function(x, y, hi){
		var NS = "http://www.w3.org/2000/svg";
		var element = document.createElementNS(NS, "text");
		element.setAttributeNS(null, "x", x);
		element.setAttributeNS(null, "y", y);
		element.setAttributeNS(null, "font-size", "50");
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
	$(canvas).mousedown(function(e){
		console.log('clicked')
		var mouseX = e.pageX;
		var mouseY = e.pageY;
		if(click[click.length-1]){
			if(click[click.length-1].behavior == "select"){
				newAtom(mouseX, mouseY, click[click.length-1].element);
				console.log(click[click.length-1].element);
				addClick(mouseX, mouseY, "placed", click[click.length-1].element);
			}
			else if(click[click.length-1].behavior == "placed"){
				newAtom(mouseX, mouseY, click[click.length-1].element);
				addClick(mouseX, mouseY, "placed", click[click.length-1].element);
			}
		}
	})

	// $('#canvas').mousemove(function(e){
	// 	if(paint){
	// 		addClick(e.pageX-this.offsetLeft, e.pageY - this.offsetTop, true, false);
	// 		redraw();
	// 	}
	// })

	$('#canvas').mouseup(function(e){
		// paint = false;
	});
	$('#canvas').mouseleave(function(e){
		// paint = false;
	})
	$('.tool-active').mousedown(function(e){
		var thisElement = $(this)[0].innerText;
		addClick(e.pageX, e.pageY, "select", thisElement);
		console.log(click);
	});
	$('element').mousedown(function(e){
		console.log("element clicked");
	})
});
