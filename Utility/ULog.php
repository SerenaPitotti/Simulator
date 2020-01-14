<?php

/**
 * la classe USession si occupa di gestire le sessioni.
 *
 * @package Utility
 * @author Serena Pitotti
 */
class ULog {
    
    private $_logf;

    /**
     * Costruttore della classe ULog. 
     * 
     * 
     * @access public
     */
    public function __construct() 
    {
  
        $this->_logf = fopen("/opt/lampp/temp/geosafe.log", "a+");
    }
    
    /**
     * Metodo che permette di scrivere nel file di log
     * 
     * @access public
     */
    public function log($string) 
    {
        if (isset($this->_logf)) {
            $stat = fstat($this->_logf);
            if ($stat['nlink'] == 0) {
                $this->_logf = fopen("/opt/lampp/temp/geosafe.log", "a+");
            }
        }
        else {
            $this->_logf = fopen("/opt/lampp/temp/geosafe.log", "a+");
        }
        fwrite($this->_logf, $string . "\n");
    }

    
    /**
     * Metodo che permette di chiudere il file
     * 
     * @access public
     */
    public function close() 
    {
        fclose($this->_logf);
        unset($this->_logf);
    }

    
}

?>