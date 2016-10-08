$(document).ready(function(){ 
	// var canvasDiv = document.getElementById('canvasDiv');
	// var canvasWidth = "700px"; 
	// var canvasHeight = "700px";

	// // create a canvas element 
	// canvas = document.createElement('canvas');
	// canvas.setAttribute('width', canvasWidth); //set the width 
	// canvas.setAttribute('height', canvasHeight); // set the height
	// canvas.setAttribute('id', 'canvas'); //give element an id
	// // canvasDiv.appendChild(canvas); //append element to the canvas div

	// if(canvasDiv !== null){
	// 	canvasDiv.appendChild(canvas);
	// }
	// else{
	// 	console.log('did not append');
	// }
	// if(typeof G_vmlCanvasManager != 'undefined'){
	// 	canvas = G_vmlCanvasManager.initElement(canvas);
	// }
	// context = canvas.getContext("2d");


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

	// var SVG = function(h,w){
	// 	var NS = "http://www.w3.org/2000/svg";
	// 	var svg = document.createElementNS(NS, "svg");
	// 	svg.width = w;
	// 	svg.height = h;
	// 	return svg; 
	// }
	var canvas = document.getElementById("canvas");

// var rect=function(h,w,fill){
//  var NS="http://www.w3.org/2000/svg";
//  var SVGObj= document.createElementNS(NS,"rect");
//  SVGObj.width.baseVal.value=w;
//  SVGObj.height.baseVal.value=h;
//  SVGObj.setAttribute("height",h);
//  SVGObj.style.fill=fill;
//  console.log('created a rectangle')
//  return SVGObj;
// }



	// magic drawing function

	// function redraw(){
	// 	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	// 	context.lineJoin = "round";
	// 	context.lineWidth = 5;

	// 	for (var i=0; i<clickX.length; i++){
	// 		if(clickElement[i]){
	// 			context.font = '20px Georgia';
	// 			context.fillText(clickElement[i], clickX[i], clickY[i]);
	// 		}
	// 		else{
	// 			context.beginPath();
	// 			if(clickDrag[i] && i){
	// 				context.moveTo(clickX[i-1], clickY[i-1]);
	// 			}
	// 			else{
	// 				context.moveTo(clickX[i]-1, clickY[i]);
	// 			}
	// 			context.lineTo(clickX[i], clickY[i]);
	// 			context.closePath();
	// 			context.strokeStyle = clickColor[i];
	// 			context.stroke(); //draw 
	// 		}
	// 	}
	// }
	$(canvas).mousedown(function(e){
		console.log('clicked')
		var mouseX = e.pageX - this.offsetLeft;
		var mouseY = e.pageY - this.offsetTop; 
		if(click[click.length-1]){
			if(click[click.length-1].behavior == "select"){
				html = "<text style='font-size:30;stroke: blue' x='10'  y='20'>Hello SVG World</text>";
				$('#canvasDiv').appendHTML(html);
				// context.font = '20px helvetica';
				// context.fillText(click[click.length-1].element, mouseX, mouseY);
				// addClick(mouseX, mouseY, "placed", click[click.length-1].element);
				// console.log("placed "+click[click.length-1].element);
				console.log($(this));
			}
			if(click[click.length-1].behavior == "placed"){
				context.fond = '20px helvetica';
				context.fillText(click[click.length-1].element, mouseX, mouseY);
				addClick(mouseX, mouseY, "placed", click[click.length-1].element);
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
