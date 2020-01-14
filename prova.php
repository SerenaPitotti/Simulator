<?php

    function db_connect($host,$user,$pass,$db) {
        $mysqli = new mysqli($host, $user, $pass, $db);
        $mysqli->set_charset("utf8");

        if($mysqli->connect_error) 
          die('Connect Error (' . mysqli_connect_errno() . ') '. mysqli_connect_error());
        return $mysqli;
     }
    $mysqli = db_connect('localhost','root','','geosafe');

    $username = $vAutenticazione->recuperaValore('username');
    echo'$username';

    /*$dropqueryCollegamento = 'drop table if exists collegamento_temp;';
    if ($mysqli->query($dropqueryCollegamento) === TRUE) {
        echo "Drop 1 eseguito.";
    }

    $dropqueryArea = 'drop table if exists area_temp;';
    if ($mysqli->query($dropqueryArea) === TRUE) {
        echo "Drop 2 eseguito.";
    }

    $query = 'create table collegamento_temp select * from collegamento;';
    if ($mysqli->query($query) === TRUE) {
        echo "Copia eseguita 1.";
    }
    else {
        echo "Errore!";
    }

    $query = 'create table area_temp select * from area;';
    if ($mysqli->query($query) === TRUE) {
        echo "Copia eseguita 2.";
    }
    else {
        echo "Errore!";
    }
    */


    

?>