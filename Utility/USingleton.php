<?php

/** 
 * La classe USingleton garantisce che ci sia una sola istanza di 
 * data classe e fornisce un punto di accesso globale a tale istanza.
 *
 * @package Utility
 * @author Claudia Di Marco 
 */
class USingleton {
    
    /**
     * @access public
     * @static 
     * @var array $instances è Array in cui memorizzare un esemplare/un'istanza di una classe 
     */
    public static $instances = array(); // attributo di classe

    
    /**
     * Il costruttore della classe USingleton. Esso è dichiarato private
     * in modo che possa essere visto solo  dall'interno della classe USingleton
     * e non da altre classi o programmi. Ciò rende impossibile l'istanziazione
     * di un oggetto dall'esterno della classe USingleton
     * 
     * @access private
     */
    private function __construct()
    {
        
    }

    /**
     * Metodo che istanzia un esemplare della classe il cui nome è passato come 
     * paramentro della funzione se tale esemplare non è già stato istanziato in
     * precedenza. Restituisce un'istanza della classe il cui nome viene passato
     * come parametro della funzione. Tale oggetto può essere l'oogetto 
     * già istanziato in precedenza senza istanziare ulteriori esemplari oppure 
     * l'oggetto che la funzione ha appena istanziato.
     * 
     * @access public
     * @static
     * @param string $nomeClasse è la stringa contenente il nome della classe
     *               di cui si vorrebbe creare un'istanza qualora non ne 
     *               esistesse già una di tale classe.
     * @return mixed          
     */

    public static function getInstance($nomeClasse)
    {
        if(!isset(self::$instances[$nomeClasse]))
        {
            self::$instances[$nomeClasse] = new $nomeClasse;
        }
        return self::$instances[$nomeClasse];
    }
    

}
