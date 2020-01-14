<?php

/**
 * la classe USession si occupa di gestire le sessioni.
 *
 * @package Utility
 * @author Claudia Di Marco
 */
class USession {
    
    /**
     * Costruttore della classe USession. 
     * Inizia una sessione
     * 
     * @access public
     */
    public function __construct() 
    {
        /*
         * Una sessione inizia grazie alla funzione session_start()
         * Le variabili di sessione sono impostate nella variabile globale PHP
         * $_SESSION
         */
        session_start();
    }
    
    /**
     * Metodo che permette di terminare la Sessione.
     * 
     * @access public
     */
    public function terminaSessione() 
    {
        // con session_destroy() si distruggono  i dati di sessione sul disco
        session_destroy();
        // con setcookie si cancella il cookie di sessione
        setcookie(session_name(), '', time()-3600);
        //distruggere l'array superglobale $_SESSION per cancellare i dati associati alla sessione
        $_SESSION = array();
    }
    
    /**
     * Metodo che consente di impostare il valore di una variabile di sessione.
     * 
     * @access public
     * @param string $chiave Variabile di sessione da impostare
     * @param type $valore Valore che si vuole assegnare alla variabile di sessione $chiave
     */
    public function impostaVariabileSessione($chiave, $valore) 
    { 
        /*
         * Le variabili di sessione sono contenute nell'array associativo $_SESSION 
         * per cui per impostare il valore di una variabile di sessione, 
         * bisogna avere la chiave e il valore
         */
        $_SESSION[$chiave] = $valore;
    }
    
    /**
     * Metodo che consente di ottenere il valore della variabile di sessione 
     * passata come parametro se presente.
     * 
     * @access public
     * @param string $chiave Variabile di sessione di cui si vuole conoscere il valore
     * @return string|boolean Se la variabile è stata definita precedentemente, ritorna il
     *               valore della variabile di sessione, FALSE altrimenti.
     */
    public function leggiVariabileSessione($chiave) 
    {
        //se una variabile è stata definita 
        if(isset($_SESSION[$chiave]))
        {
            return $_SESSION[$chiave];
        }
        return FALSE;   
    }
    
    /**
     * Metodo che consente di controllare se la variabile di sessione 
     * passata come parametro è vuota o meno.
     * 
     * @access public
     * @param string $chiave Variabile di sessione 
     * @return boolean TRUE se la variabile è stata definita precedentemente, 
     *                 FALSE se non è stata definita oppure la variabile è false.
     */
    public function checkVariabileSessione($chiave) 
    {
        if(!empty($_SESSION[$chiave]))
        {
            return TRUE;
        }
        else
        {
            return FALSE;
        }
        
    }
    
    /**
     * Metodo che consente di eliminare la variabile di sessione passata come 
     * parametro se presente.
     * 
     * @access public
     * @param string $chiave Variabile di sessione da eliminare
     */
    public function eliminaVariabileSessione($chiave) 
    {
        if(isset($_SESSION[$chiave]))
        {
            unset($_SESSION[$chiave]);
        }
    }
}
