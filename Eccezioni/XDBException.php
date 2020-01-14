<?php

/**
 * Classe XDBException che definisce le eccezioni del DB.
 * 
 * @package Eccezioni
 * @author Claudia Di Marco
 */
class XDBException extends Exception{
    
    /**
     * Costruttore di XDBException.
     * 
     * @access public
     * @param string $messaggio Il messaggio dell'eccezione
     */
    public function __construct($messaggio) {
        parent::__construct($messaggio);
    }
}
