<?php

/**
 *  La classe  FCollegamento si occupa della gestione della tabella 'collegamento'.
 * 
 * @package Foundation
 * @author Claudia Di Marco 
 * @author Serena Pitotti
 */

class FCollegamento extends FDatabase {
    private $_tc;
    
    /**
     * Costruttore della classe FCollegamento
     * 
     * @access public
     */
    public function __construct() {
        //richiama il costruttore della classe FDatabase
        parent::__construct();
        
        /*imposto il nome della tabella in base al fatto se l'utente è loggato o meno*/

        $sessione = USingleton::getInstance('USession');
       
        $loggato = $sessione->leggiVariabileSessione('loggedIn');
        $username = $sessione->leggiVariabileSessione('usernameLogIn');

        //metodo che restituisce la tabella di sessione se presente, altriementi quella di default
        $this->_tc = $this->getTabellaDaChiave("colltab", "collegamento");
        $this->_nomeTabella = $this->_tc;

        //recupera la tabella undo messa in sessione al momento del login
        $this->_ut= $sessione->leggiVariabileSessione("undotab");
        $this->_nomeColonnaPKTabella = "StartFireArea,FirePropagationArea";
        $this->_attributiTabella = "StartFireArea, FirePropagationArea, ProbabilitaPropagazioni";
    }     
    
    /**
     * Metodo che consente di inserire un collegamento tra un'area e l'altra in entrambi i versi. Quindi 2 collegamenti.
     * 
     * @access public
     * @param ECollegamento $collegamento1 Collegamento in una direzione
     * @param ECollegamento $collegamento2 Collegamento nella direzione opposta al collegamento1
     * @return boolean TRUE se la modifica è andata a buon fine, altrimenti lancia l'eccezione
     * @throws XDBException Se la query non è stata eseguita con successo
     */
    public function inserisciCollegamentoEntrambiVersi($collegamento1, $collegamento2) {
        $valoriAttributi1 = $this->getValoriAttributi($collegamento1); 
        $valoriAttributi2 = $this->getValoriAttributi($collegamento2); 
        $query1 = "INSERT INTO " . $this->_nomeTabella . " (" . $this->_attributiTabella . ") "
        . "VALUES (" . $valoriAttributi1  . ")";
        $query1 = "INSERT INTO " . $this->_nomeTabella . " (" . $this->_attributiTabella . ") "
        . "VALUES (" . $valoriAttributi2  . ")";
        
        if (version_compare(phpversion(), '5.5.0', '>=')) 
        {
            try {
                // inzia la transazione
                $this->_connessione->begin_transaction();

                // le query che devono essere eseguite nella transazione. se una fallisce, un'exception è lanciata
                $this->eseguiquery($query1);
                $this->eseguiQuery($query2);

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
                $this->eseguiquery($query1);
                $this->eseguiQuery($query2);

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
     * Metodo che consente di inserire un collegamento nella tabella undo
     * 
     * @access public
     * @throws XDBException Se la query non è stata eseguita con successo
     */
    
    public function insertCollegamentoInUndo($link1, $link2, $prob){
        
        $query = "INSERT INTO " . $this->_ut . " (" . $this->_attributiTabella . ") "
        . "VALUES (" . $link1 . ", " . $link2 . ", " . $prob . ")";
        return $this->eseguiQuery($query);
    }

    /**
     * Metodo che consente di inserire un collegamento dalla tabella undo alla tabella collegamenti
     * 
     * @access public
     * @throws XDBException Se la query non è stata eseguita con successo
     */
    
    
    public function Undo(){
        $query = "INSERT INTO " . $this->_ct . "  "
        . "SELECT *" 
        . "FROM " . $this->_ct . "  ";
        return $this->eseguiQuery($query);

        

    }

    /**
     * Metodo che consente di cancellare tutti  i collegamenti presenti nella tabella undo
     * 
     * @access public
     * @throws XDBException Se la query non è stata eseguita con successo
     */
    

    public function DropUndo(){
        $query = "DELETE *  "
        . "FROM " . $this->_ut . "  ";
        return $this->eseguiQuery($query);

    }
    
    /**
     * Metodo che consente di cercare un collegamento inserito nel DB.
     * 
     * @access public
     * @param int $idAreaStart Id dell'area start del collegamento
     * @param int $idAreaEnd Id dell'area end del collegamento
     * @return array Il risultato della query.
     * @throws XDBException Se la query non è stata eseguita con successo
     */
//    public function cercaCollegamentoCreato($idAreaStart, $idAreaEnd) {
//        $query = "SELECT DISTINCT areaStart.Nome AS NomeAreaStart, ST_AsText(areaStart.Centro) AS CentroAreaStart,areaPropagation.Nome AS NomeAreaPropagation, ST_AsText(areaPropagation.Centro) AS CentroAreaPropagation, collegamento.ProbabilitaPropagazioni" .
//                " FROM area AS areaStart, area AS areaPropagation, collegamento" .
//                " WHERE (areaStart.Id=" . $idAreaStart . " AND areaPropagation.Id=" . $idAreaEnd . " AND areaStart.Id=collegamento.StartFireArea AND collegamento.FirePropagationArea=areaPropagation.Id) LOCK IN SHARE MODE ";
//        return $this->eseguiQuery($query);
//    }
}
