<?php
/**
 * Classe XAreaException che definisce le eccezioni legate alla classe area.
 * 
 * @package Eccezioni
 * @author Claudia Di Marco
 */
class XAreaException extends Exception{
    /**
     * Costruttore di XAreaException.
     * 
     * @access public
     * @param string $messaggio Il messaggio dell'eccezione
     */
    public function __construct($messaggio) {
        parent::__construct($messaggio);
    }
}

