<?php

    echo "Reset in corso...";

    
    //connessione al db
    function db_connect($host,$user,$pass,$db) {
        $mysqli = new mysqli($host, $user, $pass, $db);
        $mysqli->set_charset("utf8");

        if($mysqli->connect_error) 
          die('Connect Error (' . mysqli_connect_errno() . ') '. mysqli_connect_error());
        return $mysqli;
     }
    $mysqli = db_connect('localhost','root','','geosafe');

   
     //cancella i contenuti della tabella collegamento
     $dropqueryCollegamento = 'drop table if exists collegamento;';
     if ($mysqli->query($dropqueryCollegamento) === TRUE) {
         echo "Drop 1 eseguito.";
     }
      
    
 
    //cancella i contenuti della tabella mappa
 
    $dropqueryMappa = 'drop table if exists mappa;';
     if ($mysqli->query($dropqueryMappa) === TRUE) {
         echo "Drop 3 eseguito.";
     }



      
 
    
    exec("/opt/lampp/bin/mysql -u root < /opt/lampp/htdocs/GeoSafe/geosafe.sql");

   echo "Reset effettuato.";

   header('Location: index.php');
   die();
    //$mysqlDatabaseName ='geosafe';
    //$mysqlUserName ='root';
    //$mysqlPassword ='';
    //$mysqlHostName ='localhost';
   // $mysqlImportFilename ='/opt/lampp/htdocs/GeoSafe/geosafe1.sql';
     
    //Export the database and output the status to the page
    //$command='mysql -h' .$mysqlHostName .' -u' .. $mysqlUserName . ' ' . $mysqlDatabaseName.' < ' .$mysqlImportFilename;
    //exec($command,$output=array(),$worked); 
    //switch($worked){
        //case 0:
            //echo 'Import file <b>' .$mysqlImportFilename .'</b> successfully imported to database <b>' .$mysqlDatabaseName .'</b>';
            //break;
        //case 1:
           // echo 'There was an error during import. Please make sure the import file is saved in the same folder as this script and check your values:<br/><br/><table><tr><td>MySQL Database Name:</td><td><b>' .$mysqlDatabaseName .'</b></td></tr><tr><td>MySQL User Name:</td><td><b>' .$mysqlUserName .'</b></td></tr><tr><td>MySQL Password:</td><td><b>NOTSHOWN</b></td></tr><tr><td>MySQL Host Name:</td><td><b>' .$mysqlHostName .'</b></td></tr><tr><td>MySQL Import Filename:</td><td><b>' .$mysqlImportFilename .'</b></td></tr></table>';
            //break;
 //   }
?>