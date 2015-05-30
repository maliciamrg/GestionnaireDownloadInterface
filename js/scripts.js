var local = false;
var xhr = new XMLHttpRequest();
var xhrep = new XMLHttpRequest();
var xhrep2 = new XMLHttpRequest();
var xhrgitpull = new XMLHttpRequest();

var elementsmenulistfonction = infoseriefonction;

document.getElementsByClassName("listepisodesserie")[0].style.display = "none"
document.getElementsByClassName("listepisodesserie")[0].getElementsByClassName("rownsaison")[0].style.display = "none";
document.getElementsByClassName("listepisodesserie")[0].getElementsByClassName("rownsaison")[0].getElementsByClassName("rowepisode")[0].style.display = "none";
document.getElementById("infoserie").style.display = 'none';
document.getElementById("listepisodes").style.display = 'none';
document.getElementById("listhash").style.display = 'none';
document.getElementById("ListeQuestion").style.display = 'none';



// creation bandeau haut
// var elementsbandeau = document.createElement("li");
// elementsbandeau.className = "elementsbandeau";
// elementsbandeau.appendChild(document.createTextNode("Git Pull"));
// elementsbandeau.addEventListener('click', elementsbandeaugitpull, false);

var elementsbandeau = document.getElementsByClassName("elementsbandeau")[0];
elementsbandeau.style.display = 'none';

/*elements menus*/
var elementsbandeauSeries = elementsbandeau.cloneNode(true);
elementsbandeauSeries.style.display = 'block';
var elementsbandeauSeriesa = document.createElement("a");
elementsbandeauSeriesa.appendChild(document.createTextNode("Series"));
elementsbandeauSeries.appendChild(elementsbandeauSeriesa);
elementsbandeauSeries.addEventListener('click', elementsbandeauSeriesfonction, false);
document.getElementById("bandeauhaut").appendChild(elementsbandeauSeries);

var elementsbandeauQuestions = elementsbandeau.cloneNode(true);
elementsbandeauQuestions.style.display = 'block';
var elementsbandeauQuestionsa = document.createElement("a");
elementsbandeauQuestionsa.appendChild(document.createTextNode("Questions"));
elementsbandeauQuestions.appendChild(elementsbandeauQuestionsa);
elementsbandeauQuestions.addEventListener('click', elementsbandeauQuestionsfonction, false);
document.getElementById("bandeauhaut").appendChild(elementsbandeauQuestions);

var elementsbandeauHash = elementsbandeau.cloneNode(true);
elementsbandeauHash.style.display = 'block';
var elementsbandeauHasha = document.createElement("a");
elementsbandeauHasha.appendChild(document.createTextNode("Hash"));
elementsbandeauHash.appendChild(elementsbandeauHasha);
elementsbandeauHash.addEventListener('click', elementsbandeauHashfonction, false);
document.getElementById("bandeauhaut").appendChild(elementsbandeauHash);

var elementsbandeauGitPull = elementsbandeau.cloneNode(true);
elementsbandeauGitPull.style.display = 'block';
var elementsbandeauGitPulla = document.createElement("a");
elementsbandeauGitPulla.appendChild(document.createTextNode("Git Pull"));
elementsbandeauGitPull.appendChild(elementsbandeauGitPulla);
elementsbandeauGitPull.addEventListener('click', elementsbandeauGitPullfonction, false);
document.getElementById("bandeauhaut").appendChild(elementsbandeauGitPull);

// creation liste serie
var Action = encodeURIComponent("ListeSeries"), Key = encodeURIComponent("null");
xhr.open('GET', 'http://home.daisy-street.fr/ajax.php?action=' + Action + '&key=' + Key);
if (local == true) {
	xhr.open('GET', 'listeseries.xml');
}
xhr.addEventListener('readystatechange', listeSerieFonction, false);
xhr.send(null);

function elementsbandeauSeriesfonction(){}
function elementsbandeauQuestionsfonction(){}
function elementsbandeauHashfonction() {}
// saut git pull
function elementsbandeauGitPullfonction(e) {
	var Action = encodeURIComponent("exec"), Key = encodeURIComponent("cd /media/kitchen/source_code/GestionnaireDownloadInterface;git pull");
	var rqt = 'http://home.daisy-street.fr/ajax.php?action=' + Action + '&key=' + Key;
	xhrgitpull.open('GET', rqt);
	xhrgitpull.addEventListener('readystatechange', gitpullfonction, false);
	xhrep.send(null);
};


function gitpullfonction() {
	if (xhrgitpull.readyState === 4 && xhrgitpull.status === 200) {
		alert('Git Pull' + xhrgitpull.responseText);
		document.reload();
	} else if (xhrgitpull.readyState == 4 && xhrgitpull.status != 200) {
		alert('Une erreur est survenue !\n\nCode :' + xhrgitpull.status + '\nTexte : ' + xhrgitpull.statusText);
	}
}

function listeSerieFonction() {
	// alert("function()(1)");
	if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)) {
		// alert(xhr.readyState + "-" + xhr.status + "-" +
		// xhr.getResponseHeader('Content-type'));
		var myArraySerie = xhr.responseXML.getElementsByTagName('nom');
		var elementsmenulist = document.getElementsByClassName("elementsmenulist")[0];
		// var myArraySerie = ['s1','s2','s3','s4'];
		for (var i = 0, c = myArraySerie.length; i < c; i++) {
			var elementsmenulistiterate = elementsmenulist.cloneNode(true);
			elementsmenulistiterate.appendChild(document.createTextNode(myArraySerie[i].childNodes[0].nodeValue));
			elementsmenulistiterate.addEventListener('click', infoseriefonction, false);
			document.getElementById("menulist").appendChild(elementsmenulistiterate);

			// var row = document.createElement("li");
			// row.className = "elementsmenulist";
			// row.appendChild(document.createTextNode(myArraySerie[i].childNodes[0].nodeValue));
			// row.addEventListener('click', myfonction, false);
			// document.getElementById("menulist").appendChild(row);

		}
		elementsmenulist.style.display = 'none';
	} else if (xhr.readyState == 4 && xhr.status != 200) { // En cas d'erreur !

		alert('Une erreur est survenue !\n\nCode :' + xhr.status + '\nTexte : ' + xhr.statusText);

	}

}

function infoseriefonction(e) {
	// alert(e.target.innerHTML);
	var Action = encodeURIComponent("InfoSerie"), Key = encodeURIComponent(e.target.innerHTML);

	var rqt = 'http://home.daisy-street.fr/ajax.php?action=' + Action + '&key=' + Key;
	// alert(rqt);
	xhrep.open('GET', rqt);
	if (local == true) {
		xhrep.open('GET', 'infoserie.xml');
	}
	xhrep.addEventListener('readystatechange', infoseriefonctiondetail, false);
	xhrep.send(null);

	// liste episodes
	var Action = encodeURIComponent("ListeEpisodes"), Key = encodeURIComponent(e.target.innerHTML);
	var rqt = 'http://home.daisy-street.fr/ajax.php?action=' + Action + '&key=' + Key;
	// alert(rqt);
	xhrep2.open('GET', rqt);
	if (local == true) {
		xhrep2.open('GET', 'listeepisodes.xml');
	}
	xhrep2.addEventListener('readystatechange', listeepisodesfonction, false);
	xhrep2.send(null);

	// alert(this.innerText);
}

function infoseriefonctiondetail() {
	// alert("function()(2)");
	if (xhrep.readyState === 4 && xhrep.status === 200) {
		// alert(xhrep.readyState + "-" + xhrep.status + "-" +
		// xhrep.getResponseHeader('Content-type'));
		// alert(xhrep.responseText);
		document.getElementById("infoserie").style.display = 'block';
		var champspossible = document.getElementById("infoserie").getElementsByTagName('div');
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

}

function listeepisodesfonction() {
	// alert("function()(2)");
	if (xhrep2.readyState === 4 && xhrep2.status === 200) {

		document.getElementById("listepisodes").style.display = 'block';
		
		var listepisodesserie =document.getElementsByClassName("listepisodesserie")[0];
		
		var asupp = document.getElementById("listepisodesserieencours");
		if (asupp != null) {
			asupp.parentNode.removeChild(asupp);
		}
		/*
		 * // alert(e.type + "." + e.target.innerText); var listepisodes =
		 * document.createElement("ul"); listepisodes.id = "listepisodesserie";
		 * listepisodes.className = "listepisodesserie";
		 * 
		 * var rownsaison = document.createElement('li'); var nbsaison = 0;
		 */

		var numsaison = 0;
		var numsaisonprev = 0;

		var listepisodesserieencours = listepisodesserie.cloneNode(true);
		listepisodesserieencours.style.display = 'block';
		listepisodesserieencours.id = "listepisodesserieencours"

		var rowsaisonencours = listepisodesserieencours.getElementsByClassName("rownsaison")[0].cloneNode(true);
		
		var rowxml = xhrep2.responseXML.getElementsByTagName('row');
		for (var i = 0, c = rowxml.length; i < c; i++) {

			var rowepisodeencours  = rowsaisonencours.getElementsByClassName("rowepisode")[0].cloneNode(true);
			rowepisodeencours.style.display = 'block';
			/*
			 * var numep = 0; var row = document.createElement("ul");
			 * row.className = "elementEp";
			 */
			var elerowxml = rowxml[i].children;

			for (var ii = 0, cc = elerowxml.length; ii < cc; ii++) {

				var elerow = rowepisodeencours.getElementsByClassName("elementEp" + elerowxml[ii].nodeName)[0];

				if (elerow != null) {
					/*
					 * var elerow = document.createElement("li");
					 * elerow.className = "elementslstEp" +
					 * elerowxml[ii].nodeName;
					 */
					if (elerowxml[ii].childNodes.length > 0) {
						elerow.appendChild(document.createTextNode(elerowxml[ii].innerHTML));// childNodes[0].nodeValue));
					} else {
						elerow.appendChild(document.createTextNode("_"));// childNodes[0].nodeValue));
					}
				}
				/*
				 * row.appendChild(elerow);
				 */
				if (elerowxml[ii].nodeName == "num_saison") {
					numsaison = elerowxml[ii].innerHTML;
				}
				if (elerowxml[ii].nodeName == "num_episodes") {
					var rowepisodeencourstextea = document.createElement("a");
					rowepisodeencourstextea.appendChild(document.createTextNode("Episode "+elerowxml[ii].innerHTML));
					var rowepisodeencourstitre =rowepisodeencours.getElementsByClassName("elementTitre")[0];
					rowepisodeencourstitre.appendChild(rowepisodeencourstextea);
				}
				// alert("|"+elerowxml[ii].nodeName+"|");

			}

			if (numsaisonprev - numsaison < 0) {
				listepisodesserieencours.appendChild(rowsaisonencours);
				var rowsaisonencours = listepisodesserieencours.getElementsByClassName("rownsaison")[0].cloneNode(true);
				rowsaisonencours.style.display = 'block';
				var rowsaisonentexte = rowsaisonencours.children[0];
				var rowsaisonentextea = document.createElement("a");
				rowsaisonentextea.appendChild(document.createTextNode("Saison "+numsaison));
				rowsaisonentexte.appendChild(rowsaisonentextea);
				numsaisonprev = numsaison;
			}

			rowsaisonencours.appendChild(rowepisodeencours);

			/*
			 * if (nbsaison - numsaison < 0) { if (nbsaison > 0) {
			 * listepisodes.appendChild(rownsaison); var rownsaison =
			 * document.createElement('li'); }
			 * 
			 * var tits = document.createElement("h4");
			 * tits.appendChild(document.createTextNode("saison " + numsaison));
			 * rownsaison.appendChild(tits);
			 * 
			 * nbsaison = numsaison; }
			 * 
			 * var rowepisode = document.createElement("ul");
			 * rowepisode.className = "rowepisode";
			 * 
			 * var ep = document.createElement("li"); var tite =
			 * document.createElement("h5");
			 * tite.appendChild(document.createTextNode("episode " + numep));
			 * 
			 * ep.appendChild(tite); ep.appendChild(row);
			 * rowepisode.appendChild(ep); rownsaison.appendChild(rowepisode); //
			 * rownsaison.appendChild(row);
			 */
		}
		listepisodesserieencours.appendChild(rowsaisonencours);
		document.getElementById("listepisodes").appendChild(listepisodesserieencours);
		/*
		 * 
		 * listepisodes.appendChild(rownsaison);
		 * 
		 * document.getElementById("listepisodes").appendChild(listepisodes); /*
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

}

function htmlDecode(input) {
	var e = document.createElement('div');
	e.innerHTML = input;
	return e.childNodes[0].nodeValue;
}
