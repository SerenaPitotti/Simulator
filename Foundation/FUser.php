<?php

/**
 *  La classe  FUser si occupa della gestione della tabella 'user'.
 * 
 * @package Foundation
 * @author Claudia Di Marco 
 */

class FUser extends FDatabase{
    /**
     * Costruttore della classe FUser
     * 
     * @access public
     */
    public function __construct() {
        //richiama il costruttore della classe FDatabase
        parent::__construct();
        // imposto il nome della tabella
        $this->_nomeTabella = "utente";
        $this->_nomeColonnaPKTabella = "Username";
        $this->_attributiTabella = "Username, Password, Tipo, NomeMappa";
    }
}
