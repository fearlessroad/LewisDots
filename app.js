$(document).ready(function(){ 
	var atomCount = 0;
	// addClick function that saves click position
	var click = new Array();

	function addClick(x, y, behavior, element){
		click.push({
			x: x,
			y: y,
			behavior: behavior,
			element: element
		});
	}
	var canvas = document.getElementById("canvas");
	
	var newAtom = function(x, y, hi){
		var NS = "http://www.w3.org/2000/svg";
		var element = document.createElementNS(NS, "text");
		element.setAttributeNS(null, "x", x);
		element.setAttributeNS(null, "y", y);
		element.setAttributeNS(null, "font-size", "50");
		element.innerHTML = hi;
		element.id = createAtomId();

		document.getElementById("canvas").appendChild(element);
	}
	var createAtomId = function(){
		atomCount += 1;
		return atomCount;
	}
	$(canvas).mousedown(function(e){
		console.log('clicked')
		// var mouseX = e.pageX - this.offsetLeft;
		// var mouseY = e.pageY - this.offsetTop; 
		var mouseX = e.pageX;
		var mouseY = e.pageY;
		if(click[click.length-1]){
			if(click[click.length-1].behavior == "select"){
				// var r = rect(100, 100, "blue");
				// canvas.appendChild(r);
				newAtom(mouseX, mouseY, click[click.length-1].element);
				console.log(click[click.length-1].element);
				// context.font = '20px helvetica';
				// context.fillText(click[click.length-1].element, mouseX, mouseY);
				// addClick(mouseX, mouseY, "placed", click[click.length-1].element);
				// console.log("placed "+click[click.length-1].element);
				// console.log($(this));
			}
			if(click[click.length-1].behavior == "placed"){
				// context.fond = '20px helvetica';
				// context.fillText(click[click.length-1].element, mouseX, mouseY);
				// addClick(mouseX, mouseY, "placed", click[click.length-1].element);
				// console.log("placed "+click[click.length-1].element);
			}
		}
		// addClick(mouseX, mouseY, false, false);
		// console.log(click[click.length-1])
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
		click.push({
			x: e.pageX,
			y: e.pageY,
			behavior: "select",
			element: thisElement
		});
		console.log(click);
	});
});
