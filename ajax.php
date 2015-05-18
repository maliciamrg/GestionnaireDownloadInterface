<?php
$action = $_GET["action"];
$key =  $_GET["key"];
header('Content-type: text/xml'); 
echo "<?xml version=\"1.0\"?>\n";



echo "<".$action.">\n";
//echo "<".htmlentities($key).">\n";
//echo "</" .htmlentities($key).">\n";


//on connecte a la BDD
$dbhost="localhost";
$dbuser="seriedownload";
$dbpass="seriedownload";
$dblink=mysql_connect($dbhost,$dbuser,$dbpass);
mysql_select_db("seriedownload",$dblink);
 

//on lance la requete
$query = "";
switch ($action) {
    case "InfoSerie":
        $query = "SELECT * FROM series WHERE nom = \"" . $key . "\"";
        break;
    case "ListeSeries":
        $query = "SELECT nom FROM series ";
        break;
    case "ListeEpisodes":
        $query = "SELECT * FROM episodes WHERE serie = \"" . $key . "\"";
        break;
    case "ListeHashs":
        $query = "SELECT * FROM hash ";
        break;
    default:
        break;
}

if ($query != ""){
	//Mise en forme resultat
	$result = mysql_query($query,$dblink) or die (mysql_error($dblink));
	//On boucle sur le resultat
	while ($row = mysql_fetch_array($result, MYSQL_NUM))
	{
		for ($i=0; $i<mysql_num_fields($result); $i++) {
			$nomchamp = mysql_field_name($result,$i);
			$text=htmlentities($row[$i]);  /*preg_replace('/&(?!#?[a-z0-9]+;)/', '&amp;', $row[$i]);*/
			echo "<".$nomchamp.">";
			echo $text;
			echo"</".$nomchamp.">\n";
		}
	}
}

echo "</".$action.">\n";
?>