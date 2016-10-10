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
// C1 = CreateElementObject("C");
// C2 = CreateElementObject("C");
// C3 = CreateElementObject("N");
// console.log(C1)
// console.log(C2)
// C2.createBond(C1);
// console.log(C2)
// console.log(C1)
// console.log(CreateElementObject("C").name);
// console.log(CreateElementObject("C").valence)
// CreateElementObject("Carbon").createBond("Hydrogen").createBond("Carbon")

