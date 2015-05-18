var myfonction = function(e) {
	// alert(e.target.innerHTML);
	var Action = encodeURIComponent("InfoSerie"), Key = encodeURIComponent(e.target.innerHTML);

	var xhrep = new XMLHttpRequest();
	var rqt = 'http://home.daisy-street.fr/ajax.php?action=' + Action + '&key=' + Key;
	// alert(rqt);
	xhrep.open('GET', rqt);
	xhrep.addEventListener('readystatechange', function() {
		// alert("function()(2)");
		if (xhrep.readyState === 4 && xhrep.status === 200) {
			// alert(xhrep.readyState + "-" + xhrep.status + "-" +
			// xhrep.getResponseHeader('Content-type'));
			// alert(xhrep.responseText);
			var champspossible = document.getElementById("contenu").getElementsByTagName('div');
			for (var i = 0, c = champspossible.length; i < c; i++) {
				// alert(champspossible[i].id);
				var champ = champspossible[i].id;
				// alert(champ);
				var valeurpossible = xhrep.responseXML.getElementsByTagName(champ);
				// var valeurpossible =
				// xhrep.responseXML.getElementsByTagName('nom');
				// alert(valeurpossible[0].childNodes[0].nodeValue);
				// alert(valeurpossible.length);
				if (valeurpossible[0] != null) {
					// alert(valeurpossible[0].childNodes[0].nodeValue);
					// alert(valeurpossible[0].childNodes.length);
					var nodevalue = "";
					for (var ii = 0, cc = valeurpossible[0].childNodes.length; ii < cc; ii++) {
						nodevalue += valeurpossible[0].childNodes[ii].nodeValue;
					}
					// alert(nodevalue);
					champspossible[i].innerHTML = nodevalue;
				}
				// alert("o");
			}

			/*
			 * var myArraySerie = xhrep.responseXML.getElementsByTagName('nom');
			 * //var myArraySerie = ['s1','s2','s3','s4']; for (var i = 0, c =
			 * myArraySerie.length; i < c; i++) { var row =
			 * document.createElement("TR");
			 * row.appendChild(document.createTextNode(myArraySerie[i].childNodes[0].nodeValue));
			 * row.addEventListener('click', myfonction, false);
			 * document.getElementById("menu").appendChild(row); }
			 */
		} else if (xhrep.readyState == 4 && xhrep.status != 200) { // En cas
			// d'erreur !

			alert('Une erreur est survenue !\n\nCode :' + xhrep.status + '\nTexte : ' + xhrep.statusText);

		}

	}, false);
	xhrep.send(null);

	var Action = encodeURIComponent("ListeEpisodes"), Key = encodeURIComponent(e.target.innerHTML);
	var xhrep2 = new XMLHttpRequest();
	var rqt = 'http://home.daisy-street.fr/ajax.php?action=' + Action + '&key=' + Key;
	// alert(rqt);
	xhrep2.open('GET', rqt);
	xhrep2.addEventListener('readystatechange', function() {
		// alert("function()(2)");
		if (xhrep2.readyState === 4 && xhrep2.status === 200) {
			
			var asupp = document.getElementById("lstEp");
			if (asupp != null) {
				asupp.parentNode.removeChild(asupp);
			}

			// alert(e.type + "." + e.target.innerText); 
			var listepisodes=document.createElement("div");
			listepisodes.id = "lstEp";
			
			// alert(xhrep.readyState + "-" + xhrep.status + "-" +
			// xhrep.getResponseHeader('Content-type'));
			// alert(xhrep.responseText);
			var myArrayEpisodes = xhrep2.responseXML.getElementsByTagName('nom');
			for (var i = 0, c = myArrayEpisodes.length; i < c; i++) {
				var row = document.createElement("TR");
				row.appendChild(document.createTextNode(myArrayEpisodes[i].childNodes[0].nodeValue));
				listepisodes.appendChild(row);
			}

			document.getElementById("listepisodes").appendChild(listepisodes);
			
			/*
			 * var myArraySerie = xhrep.responseXML.getElementsByTagName('nom');
			 * //var myArraySerie = ['s1','s2','s3','s4']; for (var i = 0, c =
			 * myArraySerie.length; i < c; i++) { var row =
			 * document.createElement("TR");
			 * row.appendChild(document.createTextNode(myArraySerie[i].childNodes[0].nodeValue));
			 * row.addEventListener('click', myfonction, false);
			 * document.getElementById("menu").appendChild(row); }
			 */
		} else if (xhrep2.readyState == 4 && xhrep2.status != 200) { // En cas
			// d'erreur !

			alert('Une erreur est survenue !\n\nCode :' + xhrep2.status + '\nTexte : ' + xhrep2.statusText);

		}

	}, false);
	xhrep2.send(null);



	// alert(this.innerText);
};

var Action = encodeURIComponent("ListeSeries"), Key = encodeURIComponent("null");

var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://home.daisy-street.fr/ajax.php?action=' + Action + '&key=' + Key);
xhr.addEventListener('readystatechange', function() {
	// alert("function()(1)");
	if (xhr.readyState === 4 && xhr.status === 200) {
		// alert(xhr.responseText);
		// alert(xhr.readyState + "-" + xhr.status + "-" +
		// xhr.getResponseHeader('Content-type'));
		var myArraySerie = xhr.responseXML.getElementsByTagName('nom');
		// var myArraySerie = ['s1','s2','s3','s4'];
		for (var i = 0, c = myArraySerie.length; i < c; i++) {
			var row = document.createElement("TR");
			row.appendChild(document.createTextNode(myArraySerie[i].childNodes[0].nodeValue));
			row.addEventListener('mouseover', myfonction, false);
			document.getElementById("menu").appendChild(row);
		}
	} else if (xhr.readyState == 4 && xhr.status != 200) { // En cas d'erreur !

		alert('Une erreur est survenue !\n\nCode :' + xhr.status + '\nTexte : ' + xhr.statusText);

	}

}, false);
xhr.send(null);

function htmlDecode(input) {
	var e = document.createElement('div');
	e.innerHTML = input;
	return e.childNodes[0].nodeValue;
}
