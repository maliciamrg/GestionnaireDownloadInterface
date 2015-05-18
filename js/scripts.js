

var  divs  =  document.getElementById("contenu").getElementsByTagName('div'); 
for (var i = 0, c = divs.length ; i < c ; i++)
{ 
	alert(divs[i].id); 
} 


var myfonction =  function(e) { 

	var Action = encodeURIComponent("InfoSerie"),
		Key = encodeURIComponent(e.target.innerText);

	var xhrep = new XMLHttpRequest();
	xhr.open('GET', 'http://home.daisy-street.fr/ajax.php?action=' + Action + '&key=' + Key);
	xhrep.addEventListener('readystatechange', 
						   function() {
							   if (xhrep.readyState === 4 && xhrep.status === 200)
							   {
								   //		   alert(xhrep.readyState + "-" + xhrep.status + "-" + xhrep.getResponseHeader('Content-type'));

								   var  divs  =  document.getElementById("contenu").getElementsByTagName('div'); 
								   for (var i = 0, c = divs.length ; i < c ; i++)
								   { 
									   alert(divs[i].id); 
								   } 

								   var myArraySerie = xhrep.responseXML.getElementsByTagName('nom');
								   //var myArraySerie = ['s1','s2','s3','s4'];
								   for (var i = 0, c = myArraySerie.length; i < c; i++)
								   { 
									   var row = document.createElement("TR");
									   row.appendChild(document.createTextNode(myArraySerie[i].childNodes[0].nodeValue));
									   row.addEventListener('click', myfonction,  false); 
									   document.getElementById("menu").appendChild(row);
								   }

							   }
							   else if (xhr.readyState == 4 && xhr.status != 200)
							   { // En cas d'erreur !

								   alert('Une erreur est survenue !\n\nCode :' + xhr.status + '\nTexte : ' + xhr.statusText);

							   }

						   }, false);
	xhrep.send(null);

	var asupp =document.getElementById("lstEp");
	if (asupp != null)
	{
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

var Action = encodeURIComponent("ListeSeries"),
    Key = encodeURIComponent("null");

var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://home.daisy-street.fr/ajax.php?action=' + Action + '&key=' + Key);
xhr.addEventListener('readystatechange', 
					 function() {
						 if (xhr.readyState === 4 && xhr.status === 200)
						 {
							 //	 alert(xhr.readyState + "-" + xhr.status + "-" + xhr.getResponseHeader('Content-type'));
							 var myArraySerie = xhr.responseXML.getElementsByTagName('nom');
							 //var myArraySerie = ['s1','s2','s3','s4'];
							 for (var i = 0, c = myArraySerie.length; i < c; i++)
							 { 
								 var row = document.createElement("TR");
								 row.appendChild(document.createTextNode(myArraySerie[i].childNodes[0].nodeValue));
								 row.addEventListener('click', myfonction,  false); 
								 document.getElementById("menu").appendChild(row);
							 }
						 }
						 else if (xhr.readyState == 4 && xhr.status != 200)
						 { // En cas d'erreur !

							 alert('Une erreur est survenue !\n\nCode :' + xhr.status + '\nTexte : ' + xhr.statusText);

						 }

					 }, false);
xhr.send(null);
