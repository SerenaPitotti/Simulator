<?php

/**
 * La classe UCookie si occupa di gestire i cookie.
 *
 * @package Utility
 * @author Claudia Di Marco 
 */
class UCookie {

    const ORA = 3600;
    const GIORNO = 86400; //in secondi
    const SETTIMANA = 604800;
    const MESE = 2592000;
    const ANNO = 31536000;

    /**
     * Costruttore di UCookie
     *  
     * @access public
     * @param string $name Nome del cookie
     * @param string $value Valore del cookie
     * @param time $expire Il tempo in cui il cookie scade
     * @param string $path Il percorso sul server in cui il cookie sarà disponibile.
     * @param string $domain Il (sotto)dominio in cui il cookie è disponibile.
     * @param boolean $secure Indica se il cookie sarà trasmesso su HTTPS( se TRUE) o anche su HTTP (se FALSE)
     * @param boolean $httponly Quando è TRUE vuol dire che il cookie è trasmesso solo su HTTP.
     */
    public function __construct($name = 'cookieDefault', $value = 'valoreDefault', $expire = self::ORA, $path = '/', $domain = 'sanitapp.it', $secure = 'FALSE', $httponly = 'FALSE') {
        setcookie($name, $value, $expire, $path, $domain, $secure, $httponly);
    }

    /**
     * Metodo che consente di impostare un cookie.
     * 
     * @access public
     * @param string $name Nome del cookie
     * @param string $value Valore del cookie
     * @param time $expire Il tempo in cui il cookie scade
     * @param string $path Il percorso sul server in cui il cookie sarà disponibile.
     * @param string $domain Il (sotto)dominio in cui il cookie è disponibile.
     * @param boolean $secure Indica se il cookie sarà trasmesso su HTTPS( se TRUE) o anche su HTTP (se FALSE)
     * @param boolean $httponly Quando è TRUE vuol dire che il cookie è trasmesso solo su HTTP.
     */
    public function impostaCookie($name = 'cookieDefault', $value = 'valoreDefault', $expire = self::ORA, $path = '/', $domain = 'sanitapp.it', $secure = 'FALSE', $httponly = 'FALSE') {
        setcookie($name, $value, $expire, $path, $domain, $secure, $httponly);
    }

    /**
     * Metodo che permette di controllare se esiste un cookie con il nome
     * passato per parametro.
     * 
     * @access public
     * @param string $name Il nome del cookie
     * @return boolean TRUE se il cookie esiste, FALSE altrimenti
     */
    public function esisteCookie($name) {
        if (isset($_COOKIE[$name])) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    /**
     * Metodo che permette di controllare se il cookie con il nome
     * passato per parametro è vuoto.
     * 
     * @access public
     * @param string $name Il nome del cookie
     * @return boolean TRUE se il cookie è vuoto o se non esiste alcun 
     *                 cookie con questo nome, FALSE altrimenti
     */
    public function cookieVuoto($name) {
        if (empty($_COOKIE[$name])) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    /**
     * Metodo che restituisce il valore del cookie.
     * 
     * @access public
     * @param string $name Il nome del cookie 
     * @return mixed Valore del cookie se esiste, FALSE altrimenti.
     */
    public function getCookie($name) {
        if (isset($_COOKIE[$name])) {
            return $_COOKIE[$name];
        } else
            return FALSE;
    }

    /**
     * Metodo che consente di eliminare un cookie esistente.
     * 
     * @access public
     * @param string $name Il nome del cookie
     */
    public function eliminaCookie($name) {
        if (isset($_COOKIE[$name])) {
            // imposto l'expiration date un'ora prima
            setcookie($name, "", time() - 3600);
        }
    }

    /**
     * Metodo che consente di capire se i cookie sono abilitati.
     * 
     * @access public
     * @return boolean true se sono abilitati, false altrimenti.
     */
    public function cookieAbilitati() {
        if (count($_COOKIE) > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Metodo che consente di incrementare il cookie. 
     * 
     * @access public
     * @param string $nomeCookie Il nome del cookie
     */
    public function incrementaCookie($nomeCookie) 
    {
        $uCookie = USingleton::getInstance('UCookie');
        $valoreCookie = $uCookie->getCookie($nomeCookie); // supponiamo che $nomeCookie sia 'Tentativi'
        if (is_bool($valoreCookie)) 
        {
            setcookie($nomeCookie, '1', time() + 15 * 60);// imposta il cookie Tentativi
        }
        else 
        {
            $valoreCookie = $valoreCookie + 1; // incrementa il valore del cookie Tentativi
            setcookie($nomeCookie, $valoreCookie, time() + 15 * 60); // imposta il nuovo valore del cookie Tentativi
        }
    }

    /**
     * Controlla la validità del cookie tentativi.
     * 
     * @access public
     * @return boolean TRUE se i tentativi sono < 4, FALSE altrimenti
     */
    public function checkValiditaTentativi() {

        if ($this->getCookie("Tentativi") < 4) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

}
