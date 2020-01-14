<?php

/**
 *  La classe  FMappa si occupa della gestione della tabella 'mappa'.
 * 
 * @package Foundation
 * @author Claudia Di Marco 
 * @author Serena Pitotti
 */
class FMappa extends FDatabase {
    
    private $_ta;
    private $_tc;

    /**
     * Costruttore della classe FMappa
     * 
     * @access public
     */
    public function __construct() {
        //richiama il costruttore della classe FDatabase
        parent::__construct();
        
        $sessione = USingleton::getInstance('USession');
       
        $loggato = $sessione->leggiVariabileSessione('loggedIn');
        $username = $sessione->leggiVariabileSessione('usernameLogIn');

        //recupero la tabella dalla sessione
        $this->_ta = $this->getTabellaDaChiave("areatab", "area");
        $this->_tc = $this->getTabellaDaChiave("colltab", "collegamento");
        // imposto il nome della tabella
        $this->_nomeTabella = "mappa";
        $this->_nomeColonnaPKTabella = "Nome";
        $this->_attributiTabella = "Nome,Nazione,Latitudine,Longitudine";

    }
    
    /**
     * Metodo che cerca il nome, il typeFeature e il confine di tutte le aree di una mappa il cui nome è passato come parametro.
     * 
     * @access public
     * @param string $nomeMappa Il nome della mappa di cui cercare il nome e il confine delle aree.
     * @return array Le info delle aree cercate
     * @throws XDBException Se la query non è stata eseguita con successo
     */
    public function cercaNomeConfineAree($nomeMappa) {  
   
        $query = "SELECT ". $this->_ta .".Nome, ". $this->_ta .".TypeFeature, ST_AsText(". $this->_ta .".Confine) AS Confine FROM " . $this->_nomeTabella . ",". $this->_ta ." WHERE  " . $this->_nomeTabella . ".Nome=". $this->_ta .".NomeMappa AND ". $this->_ta .".NomeMappa= '" . $nomeMappa . "' LOCK IN SHARE MODE"; 
        
        return $this->eseguiQuery($query);
    }
    
    /**
     * Metodo che consente di ottenere il centro di ogni area presente sulla mappa della Corsica.
     * 
     * @access public
     * @return array|boolean Il risultato della query.
     * @throws XDBException Se la query non è stata eseguita con successo
     */
    public function getCentriAree() {
        $query = "SELECT Nome, ST_AsText(" . $this->_ta . ".Centro) AS Centro "
                . "FROM " . $this->_ta . " LOCK IN SHARE MODE";
        return $this->eseguiQuery($query);
    }
    
    /**
     * Metodo che consente di cercare tutte le area della mappa il cui nome è passato come parametro.
     * 
     * @access public
     * @param string $nomeMappa Il nome della mappa
     * @return array Il risultato della query ovvero tutte le aree appartenenti alla mappa il cui nome è passato come parametro.
     * @throws XDBException Se la query non è stata eseguita con successo
     */
    public function cercaAreeMappa($nomeMappa) {
        $query = "SELECT " . $this->_nomeTabella .".*, " . $this->_ta . ".* "
                . "FROM " . $this->_nomeTabella .", " . $this->_ta . " "
                . "WHERE " . $this->_nomeTabella .".Nome = " . $this->_ta . ".NomeMappa AND " . $this->_ta . ".NomeMappa = '". $nomeMappa ."'  LOCK IN SHARE MODE";
        return $this->eseguiQuery($query);
    }
    
    /**
     * Metodo che consente di cercare tutti i collegamenti presenti su una mappa.
     * 
     * @access public
     * @param string $nomeMappa Il nome della mappa in cui cercare i collegamenti
     * @return array Il risultato della query ovvero tutte le aree appartenenti alla mappa il cui nome è passato come parametro.
     * @throws XDBException Se la query non è stata eseguita con successo
     */
    public function cercaCollegamentiMappa($nomeMappa) {
//        $query = "SELECT DISTINCT mappa.Nome AS NomeMappa , areaStart.Nome AS NomeAreaStart, ST_AsText(areaStart.Centro) AS CentroAreaStart,areaPropagation.Nome AS NomeAreaPropagation, ST_AsText(areaPropagation.Centro) AS CentroAreaPropagation, collegamento.StartFireArea, collegamento.FirePropagationArea , collegamento.ProbabilitaPropagazioni" .
//                " FROM mappa, area AS areaStart, area AS areaPropagation, collegamento" .
//                " WHERE mappa.Nome='" . $nomeMappa . "' AND mappa.Nome=areaStart.NomeMappa AND mappa.Nome=areaPropagation.NomeMappa AND (areaStart.Id=collegamento.StartFireArea AND collegamento.FirePropagationArea=areaPropagation.Id) LOCK IN SHARE MODE ";
        $query = "SELECT DISTINCT areaStart.Nome AS NomeAreaStart, ST_AsText(areaStart.Centro) AS CentroAreaStart,areaPropagation.Nome AS NomeAreaPropagation, ST_AsText(areaPropagation.Centro) AS CentroAreaPropagation, " . $this->_tc . ".ProbabilitaPropagazioni" .
                " FROM " . $this->_nomeTabella .", " . $this->_ta . " AS areaStart, " . $this->_ta . " AS areaPropagation, " . $this->_tc . " " .
                " WHERE " . $this->_nomeTabella .".Nome='" . $nomeMappa . "' AND " . $this->_nomeTabella .".Nome=areaStart.NomeMappa AND " . $this->_nomeTabella .".Nome=areaPropagation.NomeMappa AND (areaStart.Id=" . $this->_tc . ".StartFireArea AND " . $this->_tc . ".FirePropagationArea=areaPropagation.Id) LOCK IN SHARE MODE ";
        
        return $this->eseguiQuery($query);
        
    }
    
    /**
     * Metodo che consente di cercare il nome e la probabilità iniziale di tutte le area della mappa il cui nome è passato come parametro.
     * 
     * @access public
     * @param string $nomeMappa Il nome della mappa
     * @return array Il risultato della query ovvero il nome  e la probabilità iniziale di tutte le aree appartenenti alla mappa il cui nome è passato come parametro.
     * @throws XDBException Se la query non è stata eseguita con successo
     */
    public function cercaAreeMappaIniziali($nomeMappa) {
        $query = "SELECT " . $this->_ta . ".Nome,  ". $this->_ta . ".ProbabilitaIniziale "
                . "FROM  " . $this->_ta . "," . $this->_nomeTabella ." "
                . "WHERE " . $this->_ta . ".NomeMappa=" . $this->_nomeTabella .".Nome AND " . $this->_ta . ".NomeMappa='". $nomeMappa ."'  LOCK IN SHARE MODE";
        return $this->eseguiQuery($query); 
    }
     /**
     * Metodo che consente di cercare il nome e il peso di tutte le aree della mappa il cui nome è passato come parametro.
     * 
     * @access public
     * @param string $nomeMappa Il nome della mappa
     * @return array Il risultato della query
     * @throws XDBException Se la query non è stata eseguita con successo
     */
    public function getValoriAree($nomeMappa) {
        $query = "SELECT " . $this->_ta . ".Nome, " . $this->_ta . ".Peso, ST_AsText(Centro) AS Centro "
                . "FROM  " . $this->_ta . ", " . $this->_nomeTabella ." "
                . "WHERE " . $this->_nomeTabella .".Nome=" . $this->_ta . ".NomeMappa AND " . $this->_ta . ".NomeMappa='". $nomeMappa ."'  LOCK IN SHARE MODE"; 
        return $this->eseguiQuery($query); 
    }
    
    /**
     * Metodo che consente di cercare il nome e la probabilità di propagazione di tutte le aree della mappa il cui nome è passato come parametro.
     * 
     * @access public
     * @param string $nomeMappa Il nome della mappa
     * @return array Il risultato della query
     * @throws XDBException Se la query non è stata eseguita con successo
     */
    public function getFirePropagationMappa($nomeMappa) {
        $query = "SELECT " . $this->_ta . ".Nome, " . $this->_ta . ".ProbabilitaPropagazioneIncendi "
                . "FROM  " . $this->_ta . ", " . $this->_nomeTabella ." "
                . "WHERE " . $this->_ta . ".NomeMappa=" . $this->_nomeTabella .".Nome AND " . $this->_ta . ".NomeMappa='". $nomeMappa ."'  LOCK IN SHARE MODE";
        return $this->eseguiQuery($query);
    }
    
    /**
     * Metodo che consente di cercare il nome e il rischio di tutte le aree della mappa il cui nome è passato come parametro.
     * 
     * @access public
     * @param string $nomeMappa Il nome della mappa
     * @return array Il risultato della query
     * @throws XDBException Se la query non è stata eseguita con successo
     */
    public function getRiskMappa($nomeMappa) {
         $query = "SELECT " . $this->_ta . ".Nome, " . $this->_ta . ".Rischio "
                . "FROM  " . $this->_ta . " , " . $this->_nomeTabella ." "
                . "WHERE " . $this->_nomeTabella .".Nome=" . $this->_ta . ".NomeMappa AND " . $this->_ta . ".NomeMappa='". $nomeMappa ."'  LOCK IN SHARE MODE";
//        $query = "SELECT area.Nome, area.Rischio "
//                . "FROM  area "
//                . "WHERE area.NomeMappa='". $nomeMappa ."'  LOCK IN SHARE MODE";
//        $query = "SELECT a.Nome, (a.Rischio - at.Rischio) as Rischio "
//                . "FROM  area a, area.... at"
//                . "WHERE area.NomeMappa='". $nomeMappa ."' AND a.ID=at.ID LOCK IN SHARE MODE";
         return $this->eseguiQuery($query);
    }

    /**
     * Metodo che consente di cercare il nome e la differenza rischio di tutte le aree della mappa il cui nome è passato come parametro.
     * 
     * @access public
     * @param string $nomeMappa Il nome della mappa
     * @return array Il risultato della query
     * @throws XDBException Se la query non è stata eseguita con successo
     */

    public function getSimulateRiskMappa($nomeMappa) {
        // SELECT a.Nome, (at.Rischio - a.Rischio) as Rischio FROM area as a, `area_geosafe_1537950802` as at WHERE at.Id=a.Id AND a.NomeMappa='Corsica'
        $query = "SELECT a.Nome, (at.Rischio - a.Rischio) as Rischio "
                      . "FROM  area as a, " . $this->_ta . " as at "
                        . "WHERE a.NomeMappa='". $nomeMappa ."' AND a.Id=at.Id LOCK IN SHARE MODE";
            return $this->eseguiQuery($query);
    }

    /**
     * Metodo che consente di cercare il nome e la differenza della probabilità di propagazione di tutte le aree della mappa il cui nome è passato come parametro.
     * 
     * @access public
     * @param string $nomeMappa Il nome della mappa
     * @return array Il risultato della query
     * @throws XDBException Se la query non è stata eseguita con successo
     */
    public function getSimulateFirePropagationMappa($nomeMappa) {
        // SELECT a.Nome, (at.ProbabilitaPropagazioneIncendi - a.ProbabilitaPropagazioneIncendi) as Probabilità FROM area as a, `area_geosafe_1537994809` as at WHERE a.NomeMappa='Corsica' AND a.Id=at.Id
        $query = "SELECT a.Nome, (at.ProbabilitaPropagazioneIncendi - a.ProbabilitaPropagazioneIncendi) as ProbabilitaPropagazioneIncendi "
                . "FROM area as a, " . $this->_ta . " as at "
                . "WHERE a.NomeMappa='". $nomeMappa ."' AND a.Id=at.Id LOCK IN SHARE MODE";
        return $this->eseguiQuery($query);
    }
    
     /**
     * Metodo che consente di cercare tutti i nomi delle aree della mappa il cui nome è passato come parametro.
     * 
     * @access public
     * @param string $nomeMappa Il nome della mappa
     * @return array Il risultato della query ovvero tutti nomi delle aree appartenenti alla mappa il cui nome è passato come parametro.
     * @throws XDBException Se la query non è stata eseguita con successo
     */
    public function getNomiAreeMappa($nomeMappa) {
        $query = "SELECT " . $this->_ta . ".Nome "
                . "FROM " . $this->_nomeTabella .", " . $this->_ta . " "
                . "WHERE " . $this->_nomeTabella .".Nome = " . $this->_ta . ".NomeMappa AND " . $this->_ta . ".NomeMappa = '". $nomeMappa ."'  LOCK IN SHARE MODE";
        return $this->eseguiQuery($query);
    }
    
    
    
    
    // funzione prova intersezione di due poligoni
    public function check() {
        $query1 = '';$query2 = '';$query3 = '';$intersezione='';
        $query0 = " SELECT Nome, ST_AsText(area.Confine) AS Confine  FROM " . $this->_ta . "";
        $aree = $this->eseguiQuery($query0);
        foreach ($aree as $key => $value) {
            $query1 = "SET @g1 = ST_GEOMFROMTEXT('". $aree[0]['Confine'] . "')";
            if($key !== 0)
            {
                echo '-------';
                echo '   1:' . $aree[0]['Nome'];
                echo '   ' . $key . ':' . $aree[$key]['Nome'];
                $query2 = "SET @g2 = ST_GEOMFROMTEXT('". $aree[$key]['Confine'] . "')";
                $query3 = " SELECT ASTEXT(ST_INTERSECTION(@g1,@g2)) AS Intersezione";
                $this->eseguiQuery($query1);
                $this->eseguiQuery($query2);
                $intersezione = $this->eseguiQuery($query3);
                if($intersezione[0]['Intersezione']!=='GEOMETRYCOLLECTION EMPTY')
                {
                    echo '  intersezioni  ';
                    print_r($intersezione);
                    echo ' --------';
                }
                else {
                    echo 'nessuna intersezione';
                    
                }
            }

        }
        
        
//        print_r($x);
//        echo '\n';
        
        
//        $query = "SET @g3 = ST_GEOMFROMTEXT('". $x[2]['Confine'] . "')";
//        $query3 = " SELECT ASTEXT(ST_INTERSECTION(@g1,@g2))";
//        
//       $query4 = " SELECT ASTEXT(ST_INTERSECTION(@g1,@g3))";
//        $query5 = " SELECT ASTEXT(ST_INTERSECTION(@g2,@g3))";
//       $this->eseguiQuery($query);
//        $this->eseguiQuery($query2);
//        $this->eseguiQuery($query1);
//        $y = $this->eseguiQuery($query3);
//      $z = $this->eseguiQuery($query4);
//        $t = $this->eseguiQuery($query5);
//        print_r($y);
//        echo ' ';
//        print_r($z);
//        echo ' ';
//        print_r($t);
//        echo ' ';
        
    }
}