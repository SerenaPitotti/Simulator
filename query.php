<?php
function db_connect($host,$user,$pass,$db) {
        $mysqli = new mysqli($host, $user, $pass, $db);
        $mysqli->set_charset("latin1_swedish_ci");

        if($mysqli->connect_error) 
          die('Connect Error (' . mysqli_connect_errno() . ') '. mysqli_connect_error());
        return $mysqli;
     }
    $mysqli = db_connect('localhost','root','','geosafe');

    $queryCollegamento1 = 'CREATE TABLE collegamento_temp LIKE collegamento;';
    if ($mysqli->query($queryCollegamento1) === TRUE) {
        echo "Query 1 eseguita.";
    }
    $queryCollegamento2 = 'INSERT collegamento_temp SELECT * FROM collegamento;';
    if ($mysqli->query($queryCollegamento2) === TRUE) {
        echo "Query 2 eseguita";
    }


    $queryArea1 = 'CREATE TABLE area_temp LIKE area;';
    if ($mysqli->query($queryArea1) === TRUE) {
        echo "Query 3 eseguita";
    }
    $queryArea2 = 'INSERT area_temp SELECT * FROM area;';
    if ($mysqli->query($queryArea2) === TRUE) {
        echo "Query 4 eseguita";
    }



   
    }




?>