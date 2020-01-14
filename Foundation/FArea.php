<?php

/**
 *  La classe  FArea si occupa della gestione della tabella 'area'.
 * 
 * @package Foundation
 * @author Claudia Di Marco 
 * @author Serena Pitotti
 */
class FArea extends FDatabase {
    private $_ta;
    
    /**
     * Costruttore della classe FArea
     * 
     * @access public
     */
    public function __construct() {
        //richiama il costruttore della classe FDatabase
        parent::__construct();
         /*imposto il nome della tabella in base al fatto se l'utente sia loggato o meno*/

         $sessione = USingleton::getInstance('USession');
       
         $loggato = $sessione->leggiVariabileSessione('loggedIn');
         $username = $sessione->leggiVariabileSessione('usernameLogIn');


         $this->_ta = $this->getTabellaDaChiave("areatab", "area");
         $this->_nomeTabella = $this->_ta;


         $this->_nomeColonnaPKTabella = "Id";
        // manca id tra gli attrbuti perchè è di tipo autoincremnet
         $this->_attributiTabella = "Id, NomeMappa, Nome, ProbabilitaIniziale, Peso, Rischio, Confine, TypeFeature, Centro, ProbabilitaPropagazioneIncendi";
    }
  
    /**
     * Metodo per trovare il minimum bounding rectangle di un'area.
     * 
     * @access public
     * @param int $id L'id dell'area di cui vogliamo trovare il minimum bounding rectangle
     */
    public function trovaMBRArea($id) {
        $query = "SELECT AsText(ST_ENVELOPE(area.Confine)) AS MBR "
                . "FROM " . $this->_ta . " "
                . "WHERE " . $this->_ta . ".Id=" . $id ;
        $risultato = $this->eseguiQuery($query);
        $MBR =  $risultato[0]['MBR']; 
        return $MBR;
    }
    
    /**
     * Metodo che consente di capire se due MBR si intersecano( hanno qualcosa in comune).
     * 
     * @access public
     * @param string $MBR1 MBR dell'area1
     * @param string $MBR2 MBR dell'area2
     * @return boolean TRUE se c'è un'intersezione, FALSE se non c'è un'intersezione.
     * @throws XDBException Se una delle query fallisce
     */
    public function intersezioneMBR($MBR1,$MBR2) {
        $query1 = "SET @g1 = ST_GeomFromText('" . $MBR1 . "')";
        $query2 = "SET @g2 = ST_GeomFromText('" . $MBR2 . "')";
        $query3 = "SELECT MBROverlaps(@g1,@g2) AS Intersezione";
        $query4 = "SELECT MBRContains(@g2,@g1) AS Contenuto";
        
        if (version_compare(phpversion(), '5.5.0', '>=')) 
        {
            try {

                // inzia la transazione
                $this->_connessione->begin_transaction();

                // le query che devono essere eseguite nella transazione. se una fallisce, un'exception è lanciata
                $this->eseguiQuery($query1);
                $this->eseguiQuery($query2);
                $x = $this->eseguiQuery($query3);
                $y = $this->eseguiQuery($query4);

                // se non ci sono state eccezioni, nessuna query della transazione è fallita per cui possiamo fare il commit
                return $this->_connessione->commit();
            } catch (Exception $e) {
                // un'eccezione è lanciata, per cui dobbiamo fare il rollback della transazione
                $this->_connessione->rollback();
                throw new XDBException('errore');
            }
        }
        else
        {
            // versione che non supporta la transazione
            try {

                $this->_connessione->autocommit(FALSE);

                // le query che devono essere eseguite nella transazione. se una fallisce, un'exception è lanciata
                $this->eseguiQuery($query1);
                $this->eseguiQuery($query2);
                $x = $this->eseguiQuery($query3);
                $y = $this->eseguiQuery($query4);

                // se non ci sono state eccezioni, nessuna query della transazione è fallita per cui possiamo fare il commit
                
                return $this->_connessione->autocommit(TRUE);
            } catch (Exception $e) {
                // un'eccezione è lanciata, per cui dobbiamo fare il rollback della transazione
                $this->_connessione->rollback();
                throw new XDBException('errore');
            } 
        }
        
        if($x[0]['Intersezione']==1 || $y[0]['Contenuto']==1 )
        {
            return TRUE;
        }
        else
        {
            return FALSE;
        } 
    }
    
    /**
     * Metodo che consente di sapere se due aree sono adiacenti ovvero se c'è un collegamento tra loro.
     * 
     * @access public
     * @param EArea $area1 Area
     * @param EArea $area2 Area  
     * @return boolean TRUE se c'è un'intersezione tra le aree, FALSE altrimenti
     * @throws XDBException Se una delle query non è stata eseguita con successo
     */
    public function esisteCollegamento($area1, $area2) {
        $query1 = "SET @g1 = ST_GEOMFROMTEXT('". $area1->getConfineArea() . "')";
        $query2 = "SET @g2 = ST_GEOMFROMTEXT('". $area2->getConfineArea() . "')"; 
        $query3 = " SELECT ASTEXT(ST_INTERSECTION(@g1,@g2)) AS Intersezione";
//        $query3 = " SELECT mbrintersects(@g1,@g2) AS Intersezione"; // non va bene poichè alcune volte aggiunge collegamento tra aree appartenenti nello stesso rettangolo definito dai confini dell'area anche se due aree non sono fisicamente vicine 
        if (version_compare(phpversion(), '5.5.0', '>=')) 
        {
            try {
                $this->_connessione->begin_transaction();
                $this->eseguiQuery($query1);
                $this->eseguiQuery($query2);
                $intersezione = $this->eseguiQuery($query3);
                $this->_connessione->commit();
            } catch (Exception $e) {
                $this->_connessione->rollback();
                throw new XDBException('errore');
            }
        }
        else
        {
            try{
                $this->_connessione->autocommit(FALSE);
                $this->eseguiQuery($query1);
                $this->eseguiQuery($query2);
                $intersezione = $this->eseguiQuery($query3);
                $this->_connessione->autocommit(TRUE);
            } catch (Exception $e) {
                $this->_connessione->rollback();
                throw new XDBException('errore');
            } 
            
        }
        if($intersezione[0]['Intersezione']!=='GEOMETRYCOLLECTION EMPTY')
//        if($intersezione[0]['Intersezione'] == 1) // nel caso avessi usato  mbrintersects
        {
           return TRUE;
        }
        else
        {
            return FALSE;
        }
    }
    
    
    /**
     * Metodo che cerca tutte le aree eccetto quella il cui nome è passato come parametro.
     * 
     * @access public
     * @param string $nomeAreaDaNonCercare Il nome dell'area da non cercare.
     * @return array Le aree cercate
     * @throws XDBException Se la query non è stata eseguita con successo
     *
     */
    public function cercaAltreAree($nomeAreaDaNonCercare) {
        $query = 'SELECT Id, Nome, ST_AsText('. $this->_ta .'.Confine) AS Confine FROM ' . $this->_ta . " WHERE Nome<>'" . $nomeAreaDaNonCercare . "' LOCK IN SHARE MODE"; 
        return $this->eseguiQuery($query);
    }
    
    /**
     * Metodo che cerca il nome, il typeFeature e il confine di tutte le aree di una mappa se il parametro 
     * $idArea è NULL, altrimenti cerca il nome, il typeFeature e il confine di un'area in particolare.
     * 
     * @access public
     * @param string $nomeMappa Il nome della mappa di cui cercare il nome e il confine delle aree.
     * @param int $idArea L'id dell'area da cercare. Può essere NULL.
     * @return array Le info delle aree cercate o le info dell'area cercata
     * @throws XDBException Se la query non è stata eseguita con successo
     */
    public function cercaNomeConfineAree($nomeMappa, $idArea=NULL) {
        if($idArea===NULL)
        {
            $query = 'SELECT Nome, TypeFeature, ST_AsText(' . $this->_ta . '.Confine) AS Confine FROM ' . $this->_ta . " WHERE NomeMappa='" . $nomeMappa . "' LOCK IN SHARE MODE"; 
        }
        else
        {
            $query = 'SELECT Nome, TypeFeature, ST_AsText(' . $this->_ta . '.Confine) AS Confine FROM ' . $this->_ta . " WHERE NomeMappa='" . $nomeMappa . "' AND " . $this->getNomeColonnaPKTabella() . "=" . $idArea . " LOCK IN SHARE MODE"; 
        }
        return $this->eseguiQuery($query);
    }
    
    public function cercaInterserzioni($area) {
        $areeAdiacenti = array();
        $intersezione = '';
        $i=0;
        $aree = $this->cercaAltreAree($area['Nome']);
        $query1 = "SET @g1 = ST_GEOMFROMTEXT('". $area['Confine'] . "')"; 
       
        foreach ($aree as $area){
            $query2 = "SET @g2 = ST_GEOMFROMTEXT('". $area['Confine'] . "')";
            $query3 = " SELECT ASTEXT(ST_INTERSECTION(@g1,@g2)) AS Intersezione";
            if (version_compare(phpversion(), '5.5.0', '>=')) 
            {
                try {
                    $this->_connessione->begin_transaction();
                    $this->eseguiQuery($query1);
                    $this->eseguiQuery($query2);
                    $intersezione = $this->eseguiQuery($query3);
                    $this->_connessione->commit();
                } catch (Exception $e) {
                    $this->_connessione->rollback();
                    throw new XDBException('errore');
                }
            }
            else
            {
                try {
                    $this->_connessione->autocommit(FALSE);
                    $this->eseguiQuery($query1);
                    $this->eseguiQuery($query2);
                    $intersezione = $this->eseguiQuery($query3);
                    $this->_connessione->autocommit(TRUE);
                } catch (Exception $e) {
                    $this->_connessione->rollback();
                    throw new XDBException('errore');
                }
            }
            $areeAdiacenti[$i] = array('Id'=>$area['Id'],'Nome'=>$area['Nome']);
        }
        return $areeAdiacenti;
    }
    
    // prova
    public function trovaRettangoloInternoArea($nomeArea) {
        $query = "SELECT ST_ASTEXT(ST_CONVEXHULL(" . $this->_ta . ".Confine)) AS Rettangolo "
                . "FROM " . $this->_ta . " "
                . "WHERE " . $this->_ta . ".Nome='" . $nomeArea ."'";
        return $this->eseguiQuery($query);
    }
    
//    //prova
//    public function setCentro($poligono) {
//        $query1  = "SET @poly = ST_GeomFromText('". $poligono ."')";
//        $query2  = "UPDATE area  SET Centro=(ST_Centroid(@poly)) WHERE area.Nome='Sant’Andréa di Bozio'";
//        $query3 =  "SELECT ST_AsText(area.Centro) FROM area WHERE area.Nome='Sant’Andréa di Bozio'";
//        $this->eseguiQuery($query1);
//        $this->eseguiQuery($query2);
//        print_r($this->eseguiQuery($query3));
//    }
    
    /**
     * Metodo che consente di impostare il centro di un area.
     * 
     * @access public
     * @param string $nome
     * @param string $latitudine La latitudine del centro
     * @param string $longitudine La longitudine del centro
     * @return array|boolean Il risultato della query.
     * @throws XDBException Se una query non è stata eseguita con successo.
     */
    public function setCentro($nome, $latitudine, $longitudine) {
        $centroPoint = "POINT(" . $longitudine . " " . $latitudine . ")";
        $queryLock = "SELECT * FROM " . $this->_ta .
            " WHERE (Nome='" . $nome . "') FOR UPDATE " ;
        
        $query = "UPDATE " . $this->_ta . " SET Centro=ST_PointFromText('". $centroPoint . "') "
                . "WHERE " . $this->_ta . ".Nome='" . $nome . "'";
        if (version_compare(phpversion(), '5.5.0', '>=')) 
        {
            try {
                // inzia la transazione
                $this->_connessione->begin_transaction();
                // le query che devono essere eseguite nella transazione. se una fallisce, un'exception è lanciata
                $this->eseguiquery($queryLock);
                $this->eseguiQuery($query);
                // se non ci sono state eccezioni, nessuna query della transazione è fallita per cui possiamo fare il commit
                return $this->_connessione->commit();
            } catch (Exception $e) {
                // un'eccezione è lanciata, per cui dobbiamo fare il rollback della transazione
                $this->_connessione->rollback();
                throw new XDBException('errore');
            } 
        }
        else
        {
            try {
                $this->_connessione->autocommit(TRUE);

                // le query che devono essere eseguite nella transazione. se una fallisce, un'exception è lanciata
                $this->eseguiquery($queryLock);
                $this->eseguiQuery($query);
                // se non ci sono state eccezioni, nessuna query della transazione è fallita per cui possiamo fare il commit 
                return $this->_connessione->autocommit(TRUE);
            } catch (Exception $e) {
                // un'eccezione è lanciata, per cui dobbiamo fare il rollback della transazione
                $this->_connessione->rollback();
                throw new XDBException('errore');
            } 
        }
                
    }
    
    /**
     * Metodo che consente di ottenere le informazioni modificabili di un'area.
     * 
     * @access public
     * @param int $idArea L'id dell'area di cui si vogliono i dati modificabili
     * @return array Il risultato della query.
     * @throws XDBException Se la query non è stata eseguita con successo
     */
    public function getInfoModificabili($idArea) {
        $query = "SELECT NomeMappa, Nome, ProbabilitaIniziale, Peso, ST_ASTEXT(Centro) AS Centro "
                . "FROM " . $this->_ta . " "
                . "WHERE (Id=" . $idArea . ") LOCK IN SHARE MODE " ;
        return $this->eseguiQuery($query);
    }
    
    /**
     * Metodo che consente di capire se un punto è contenuto all'interno di un'area.
     * 
     * @access public
     * @param string $confine Il confine dell'area in formato testuale.
     * @param string $punto Stringa del tipo "POINT(" . $Latitudine . " " . $Longitudine . ")"
     * @param int $idArea L'id dell'area
     * @param string $nomeArea Il nome dell'area se l'id dell'area dovesse essere NULL
     * @return boolean TRUE se il punto è contenuto, FALSE altrimenti.
     * @throws XDBException Se una query non è stata eseguita con successo.
     */
    public function centroContenutoInArea($confine, $punto, $idArea=NULL , $nomeArea = NULL) {
        if($idArea!==NULL)
        {
            $queryLock = "SELECT * FROM " . $this->_ta . " WHERE (Id=" . $idArea . ") LOCK IN SHARE MODE ";
        }
        else
        {
            $queryLock = "SELECT * FROM " . $this->_ta . " WHERE (Nome='" . $nomeArea . "') LOCK IN SHARE MODE ";
        }
        $query1 = "SET @g1 = ST_GEOMFROMTEXT('" . $confine . "')";
        $query2 = "SET @g2 = ST_GEOMFROMTEXT('" . $punto . "')";
        $query = "SELECT ST_CONTAINS(@g1,@g2) ";
        if (version_compare(phpversion(), '5.5.0', '>=')) 
        {
            try {
                // inzia la transazione
                $this->_connessione->begin_transaction();
                // le query che devono essere eseguite nella transazione. se una fallisce, un'exception è lanciata
                $this->eseguiquery($queryLock);
                $this->eseguiQuery($query1);
                $this->eseguiQuery($query2);
                $risultato = $this->eseguiQuery($query);
                // se non ci sono state eccezioni, nessuna query della transazione è fallita per cui possiamo fare il commit
                $this->_connessione->commit();
                return $risultato[0]['ST_CONTAINS(@g1,@g2)'];
            } catch (Exception $e) {
                // un'eccezione è lanciata, per cui dobbiamo fare il rollback della transazione
                $this->_connessione->rollback();
                throw new XDBException('Error');
            } 
        }
        else
        {
            try {
                $this->_connessione->autocommit(FALSE);
                // le query che devono essere eseguite nella transazione. se una fallisce, un'exception è lanciata
                $this->eseguiquery($queryLock);
                $this->eseguiQuery($query1);
                $this->eseguiQuery($query2);
                $risultato = $this->eseguiQuery($query);
                $this->_connessione->autocommit(TRUE);
                return $risultato[0]['ST_CONTAINS(@g1,@g2)'];
            } catch (Exception $e) {
                // un'eccezione è lanciata, per cui dobbiamo fare il rollback della transazione
                $this->_connessione->rollback();
                throw new XDBException('Error');
            } 
        }
    }
    
}

    
