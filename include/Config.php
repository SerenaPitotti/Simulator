<?php

/**
 * La classe Config si occupa della configurazione.
 *
 * @package include
 * @author Claudia Di Marco 
 */

 

class Config {
    
    /**
     * @var array Array associativo: come chiavi username, password, host, dbname
     *            e come valori i rispettivi valori
     */
    private $dbConfig;
    

    /**
     * Inizializza gli array necessari per la configurazione
     */
    public function __construct() 
    {
        $this->setDBConfig();
    }
    
    /**
     * Metodo che restituisce un array contenente il necessario per la 
     * configurazione del database
     * 
     * @access public
     * @return array Array associativo: come chiavi username, password, host, dbname
     *               e come valori i rispettivi valori
     */
    public function getDBConfig() 
    {
        return $this->dbConfig;
    }
    
    /**
     * Metodo che consente di configurare le impostazioni per il database.
     * 
     * @access private 
     */
    private function setDBConfig() 
    {
           $this->dbConfig['username'] ='root';
           $this->dbConfig['password'] ='';
           $this->dbConfig['host'] ='localhost';
           $this->dbConfig['dbname'] ='geosafe';
    }

}
