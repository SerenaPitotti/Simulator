<?php

/**
 * Classe XUserException che definisce le eccezioni legate alla classe user.
 * 
 * @package Eccezioni
 * @author Claudia Di Marco
 */
class XUserException extends Exception{
    /**
     * Costruttore di XUserException.
     * 
     * @access public
     * @param string $messaggio Il messaggio dell'eccezione
     */
    public function __construct($messaggio) {
        parent::__construct($messaggio);
    }
}
