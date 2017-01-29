//Flow chart
//1. Each atom is connected to another atom through a bond. the bond has a unique id, as do each of the atoms. The bond SVG's have two positions (via SVG line) : x1,y1 and x2,y2 that specify which side the atoms are bonded to. Each bond OBJECT has a bonds array that contains the ID's of each atom it connects
//2. the atom OBJECTS each contain a bonds array also that contain the ID of the bond SVG
//3. In the process of MOVING an atom: it must go through the following steps: 

	//1. Find the bonds of the atom that is currently being moved. Here are the variables we need
		//currently selected atom object = selectedElementObj
		//currently selected atom SVG = selectedElementSVG
		//current bond svg = currentBondSVG
		//current bond object = currentBondObj
		//the bonded atom to the current atom object = bondedElementObj (?)
		//the bonded atom to the current atom SVG = bondedElementSVG
	//2. the functions that we need to identify and create variables for the current two atoms we look at 
		//createCurrentElementVariables
		//createCurrentBondVariables
		//createBondedElementVariables
	//3. We then need to determine which atom is located on which end of the bond --> would this be best to do in one function, to create a global object variable that we can then access? or should this go inside a function? 
	//4. Once we have each atom attached to which side of the atom (is there a better way to store this information?)??? Perhaps in object format directly in the bond SVG bonds array (instead of an array, it can be a bonds object that will look something like this:{"x1":id1, "x2":id2} then it can be more readily accessed... let's get this going TODAY 27 January 2017)