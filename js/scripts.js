var myfonction =  function(e) { 
	switch (e.target.innerText)
	{
		case"s1":
			var myArrayEpisodes = ['ep1','ep2','ep3','ep4'];
			break;
		case"s2":
			var myArrayEpisodes = ['ep1','ep2','ep3'];
			break;
		case"s3":
			var myArrayEpisodes = ['ep1','ep2'];
			break;
		case"s4":
			var myArrayEpisodes = ['ep1'];
			break;

	}
	
	var asupp =document.getElementById("lstEp");
	if(asupp != null){
	asupp.parentNode.removeChild(asupp);
	}
	
	//alert(e.type + "." + e.target.innerText);
	var listepisodes= document.createElement("div");
	listepisodes.id = "lstEp";
	for (var i = 0, c = myArrayEpisodes.length; i < c; i++)
	{ 
		var row = document.createElement("TR");
		row.appendChild(document.createTextNode(myArrayEpisodes[i]));
		row.addEventListener('click', myfonction,  false); 
		listepisodes.appendChild(row);
	}
	document.getElementById("contenu").appendChild(listepisodes);
//		alert(this.innerText);
};

var myArraySerie = ['s1','s2','s3','s4'];
for (var i = 0, c = myArraySerie.length; i < c; i++)
{ 
	var row = document.createElement("TR");
	row.appendChild(document.createTextNode(myArraySerie[i]));
	row.addEventListener('click', myfonction,  false); 
	document.getElementById("menu").appendChild(row);
}
