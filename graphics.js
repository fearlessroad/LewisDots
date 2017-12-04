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
var NS = "http://www.w3.org/2000/svg";
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
	console.log(selectedElement);
	selectedElement.setAttributeNS(null, "transform", newMatrix); 
	//console.log(selectedElement.getAttributeNS(null, "transform"));
	currentX = e.clientX;
	currentY = e.clientY;
	//console.log(findObjectInObjectArrayWithId(selectedElement.id).bonds);
	handleBondElementMovement();
}
function deselectElement(e){
	console.log("element deselected")
	if(selectedElement !== 0){
		selectedElement.removeAttributeNS(null, "onmouseout");
		selectedElement.removeAttributeNS(null, "onmouseup");
		selectedElement = 0;
		//$(window).off("mousemove", moveElement(e))
		$(document).off("mousemove", moveElement(e))
	}
}
var newAtom = function(x, y, hi){
	var NS = "http://www.w3.org/2000/svg";
	var element = document.createElementNS(NS, "text");
	element.setAttributeNS(null, "x", x-30);
	element.setAttributeNS(null, "y", y-15);
	element.setAttributeNS(null, "font-size", 50);
	element.setAttributeNS(null, "font-family", "sans-serif")
	element.setAttributeNS(null, "class", "element");
	element.setAttributeNS(null, "transform", "matrix(1 0 0 1 0 0)");
	element.innerHTML = hi;
	element.id = createObjectId(element);
	createObjectArray(element);
	//console.log(ObjectArray);
	document.getElementById("canvas").appendChild(element);
}