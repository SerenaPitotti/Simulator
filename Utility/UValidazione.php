<?php

/** 
 * La classe UValidazione consente di effettuare la validazione lato server 
 * dei dati immessi nella form o dei dati passati durante la richiesta HTTP.
 * 
 * @package Utility
 * @author Claudia Di Marco 
 */

class UValidazione {
    
    /**
     * Array contenente tutti gli input giusti/validati .
     * 
     * @access private
     * @var array Array contenente tutti gli input validati
     */
    private $_datiValidi;
    
    /**
     * Array contenente tutti gli input sbagliati.
     * 
     * @access private
     * @var array Array contenente tutti gli input sbagliati 
     */
    private $_datiErrati;
    
    /**
     * Variabile booleana che permette di capire se i dati sono validi 
     * 
     * @access private
     * @var boolean TRUE i dati sono stati validati, FALSE altrimenti
     */
    private $_validati;
    
    /**
     * Costruttore della classe UValidazione.
     * 
     * @access public
     */
    public function __construct() 
    {
        $this->_datiValidi = Array();
        $this->_datiErrati = Array();
        $this->_validati = TRUE;
    }
    
    /**
     * Metodo che consente di conoscere i dati validati.
     * 
     * @access public
     * @return array I dati validi
     */
    public function getDatiValidi()                                             
    {
        return $this->_datiValidi;
    }
    
    /**
     * Metodo che consente di conoscere se i dati sono validati.
     * 
     * @access public
     * @return boolean TRUE dati validi, FALSE almeno un dato non era valido
     */
    public function getValidati()                                               
    {
        return $this->_validati;
    }
    
    /**
     * Metodo che consente di conoscere i dati che si sono rilevati errati
     * durante la validazione dei dati.
     * 
     * @access public
     * @return array I dati sbagliati
     */
    public function getDatiErrati() 
    {
        return $this->_datiErrati;
    }
   
    /**
     * Metodo che consente di impostare  $_validati a true.
     * 
     * @access private
     * @param boolean TRUE dati validi, FALSE almeno un dato non era valido
     */
    private function setValidati($validati) 
    {
        $this->_validati = $validati;
    }

    
   /**
     * Metodo che permette di effettuare la validazione di un dato.
     * 
     * @access private
     * @param string $pattern L'espressione regolare che il dato deve soddisfare
     * @param string $chiave  L'indice del dato da validare
     * @param string $valore Il valore da controllare
     * @param string $stringaErrore La stringa contenente l'errore 
     */
    private function validaDato($pattern, $chiave, $valore, $stringaErrore)     
    {
        
        if (preg_match($pattern, $valore)) 
        {
            $this->_datiErrati[$chiave] = FALSE;
            $this->_datiValidi[$chiave] = $valore;
        } 
        else
        {
            $this->_datiErrati[$chiave] = $stringaErrore;
            $this->_validati = FALSE;
        }
    }

    /**
     * Metodo che consente di validare dei dati.
     * 
     * @access public
     * @param array $dati Dati da validare
     */
    public function validaDati($dati) {
        $this->setValidati(TRUE);
        foreach ($dati as $chiave => $valore) 
        {
            $pattern = '/^.+$/';
            $stringaErrore = "";
            switch ($chiave) 
            {
                
                case "Nome": 
                case "NomeAreaStart":    
                case "NomeAreaEnd": 
                    $pattern = '/^[a-zA-ZàáèéìÎîíïùúüò\'\/’\s\_\-\.\$]{1,60}$/';
                    $stringaErrore = "Il " . $chiave . " del comune deve essere una sequenza di caratteri. Può contenere spazi bianchi, punti, _ e -";
                    break;
                
                case "NomeMappa":                
                    $pattern = '/^(Corsica)$/'; // al momento è solo Corsica
                    $stringaErrore = "Il nome della mappa è Corsica.";
                    break;
                
                case "Latitudine":
                case "Longitudine":
                    $pattern = '/^([0-9]+.[0-9]+)$/' ;
                    $stringaErrore = "La " . $chiave . " è in gradi decimali";
                    break;
                
                case "ProbabilitaIniziale": 
                case "ProbabilitaPropagazioneIncendi": 
                case "ProbabilitaPropagazione":
                    $valore = str_replace(",", ".", $valore);
                    $pattern = '/^((0)\.([0-9])+)|((0),([0-9])+)|(1\.0)|(0|1)$/' ;
                    $stringaErrore = "La probabilità di propagazione è un numero decimale compreso tra 0 e 1.";
                    break;
                
                case 'Centro':
                    $valore = str_replace("+", " ", $valore);
                    $pattern = '/^(POINT\([0-9]+.[0-9]+\s[0-9]+.[0-9]+\))$/' ;
                    $stringaErrore = "Il centro è costituito da latitudine e longitudine in gradi decimali";
                    break;
                
                default:
                    $this->_validati = FALSE;
                    break;  
            }
            $this->validaDato($pattern, $chiave, $valore, $stringaErrore);
        }
        return $this->_validati;
    }
    
    
    /**
     * Metodo che permette la validazione dei dati del log in.
     * 
     * @access public
     * @param array $datiDaValidare Dati da validare
     * @return boolean TRUE se tutti i dati sono stati validati, FALSE altrimenti.
     */
    public function validaDatiLogIn($datiDaValidare) {
        
        $this->setValidati(TRUE);
        foreach ($datiDaValidare as $chiave => $valore) 
        {
            $pattern = '/^.+$/';
            $stringaErrore = "";
            switch ($chiave) 
            {
                case "username":                
                    $pattern = '/^[0-9a-zA-Z\_\-\.\$]{4,15}$/';
                    $stringaErrore = "Il" . $chiave . "deve essere una sequenza alfanumerica";
                    break;
                
                case "password":
                    $pattern = '/^(((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])).{6,10})$/';
                    $stringaErrore = "La password deve contenere almeno un "
                            . "numero, una lettera maiusola, "
                            . "una minuscola e deve essere lunga minimo 6 e massimo 10 ";
                    break;
                
                default:
                    $this->_validati = FALSE;
                    break;  
            }
            $this->validaDato($pattern, $chiave, $valore, $stringaErrore);
        }
        return $this->_validati;
        
    }
    
 
    
    
    /**
     * Metodo che consente di validare i dati relativi ad un'area.
     * 
     * @access public
     * @param array $datiArea I dati dell'area da validare
     */
    public function validaDatiArea($datiArea) {
        
        $this->setValidati(TRUE);
        foreach ($datiArea as $chiave => $valore) 
        {
            $pattern = '/^.+$/';
            $stringaErrore = "";
            switch ($chiave) 
            {
                case "Nome":  
                    $pattern = '/^[a-zA-ZàáèéìÎîíïùúüò\'\/’\s\_\-\.\$]{1,60}$/';
                    $stringaErrore = "Il " . $chiave . " del comune deve essere una sequenza di caratteri. Può contenere spazi bianchi, punti, _ e -";
                    break;
                
                case "NomeMappa":
                    $pattern = '/^(Corsica)$/'; // al momento è solo Corsica
                    $stringaErrore = "Il nome della mappa è Corsica.";
                    break;

                
                case "Peso":
                case "Latitudine":
                case "Longitudine":
                   
                    $pattern = '/^(([0-9])+\.([0-9])+)|([0-9])+$/' ;
                    if($chiave==='Latitudine' || $chiave==='Longitudine' )
                    {
                        $stringaErrore = "La " . $chiave . " è in gradi decimali.";
                    }
                    elseif($chiave === 'Peso')
                    {
                        $stringaErrore = "Il peso è un numero che può essere decimale.";
                    }
                    else
                    {
                        $stringaErrore = "La probabilità è un numero decimale.";
                    }
                    break;
                    
                case "ProbabilitaIniziale": 
                case "ProbabilitaPropagazioneIncendi":
                case "ProbabilitaPropagazione": 
                    $valore = str_replace(",",".",$valore);
                    $pattern = '/^((0)\.([0-9])+)|((0),([0-9])+)|(1\.0)|(0|1)$/' ;
                    $stringaErrore = "La probabilità è un numero decimale compreso tra 0 e 1.";
                    break;
                
                case "TypeFeature":
                    $pattern = '/^(Polygon|MultiPolygon)$/';
                    $stringaErrore = "Il " . $chiave . " può assuere il valore Polygon o MultiPolygon.";
                    break;
                
                case 'Confine':// da migliorare 
                    $pattern = '/^[\[\]\.0-9,\s]+$/' ;
                    $stringaErrore = "Il confine è costituito da vertici separati da virgole";
                    break;
                
                case 'Centro':
                    $valore = str_replace("+", " ", $valore);
                    $pattern = '/^(POINT\([0-9]+\.[0-9]+\s[0-9]+\.[0-9]+\))$/' ;
                    $stringaErrore = "Il centro è costituito da latitudine e longitudine in gradi decimali";
                    break;
                
                default:
                    $this->_validati = FALSE;
                    break;  
            }
            $this->validaDato($pattern, $chiave, $valore, $stringaErrore);
        }
        return $this->_validati;
    }
}