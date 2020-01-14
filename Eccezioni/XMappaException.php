<?php

/**
 * Classe XMappaException che definisce le eccezioni legate alla classe mappa.
 * 
 * @package Eccezioni
 * @author Claudia Di Marco
 */
class XMappaException extends Exception{
    /**
     * Costruttore di XMappaException.
     * 
     * @access public
     * @param string $messaggio Il messaggio dell'eccezione
     */
    public function __construct($messaggio) {
        parent::__construct($messaggio);
    }
}
