<?php

/**
 * La classe EMappa si occupa della gestione in ram della mappa.
 *
 * @package Entity
 * @author Claudia Di Marco 
 * @author Serena Pitotti
 */
class EMappa {
    
    /*
     * Attributi della classe EMappa.
     */
    
    /**
     * @var string $_nome Il nome della mappa.
     */
    private $_nome;
    
    /**
     * @var string $_nazione Il nome della nazione che viene visualizzata della mappa.
     */
    private $_nazione;
    
    /**
     * @var double $_latitudine La latitudine in cui è centrata la mappa.
     */
    private $_latitudine;
    
    /**
     * @var double $_logitudine La logitudine in cui è centrata la mappa.
     */
    private $_logitudine;
    
    /**
     * @var array $_aree Le aree che compongono la mappa.
     */
    private $_aree;
    
    /**
     * @var array $_utenti Gli utenti che interagiscono/modificano con la mappa.
     */
    private $_utenti;
    
    /**
     * Costruttore di EMappa
     * 
     * @access public
     * @param string $nome Il nome della mappa.
     * @param string $nazione La nazione o parte di essa che viene visualizzata dalla mappa
     * @param double $lat La latitudine in cui è centrata la mappa
     * @param double $lng La longitudine in cui è centrata la mappa
     * @throws XMappaException
     * @throws XDBException
     */
    public function __construct($nome=NULL, $nazione=NULL, $lat=0, $lng=0) {
        if($nome !== NULL && $nazione !== NULL && $lat!==0 && $lng!==0)
        {
            $this->_nome = $nome;
            $this->_nazione = $nazione;
            $this->_latitudine= $lat;
            $this->_logitudine = $lng;
            $this->_aree = array();
            $this->_users = array();
        }
        else
        {
            $fMappa = USingleton::getInstance('FMappa');
            $attributiMappa = $fMappa->cercaByPK($nome);
            if(is_array($attributiMappa) && count($attributiMappa) === 1)
            {
                $this->_nome = $attributiMappa[0]['Nome'];
                $this->_nazione = $attributiMappa[0]['Nazione'];
                $this->_latitudine= $attributiMappa[0]['Latitudine'];
                $this->_logitudine = $attributiMappa[0]['Longitudine'];
                $this->_aree = array(); // le aree non le carico volontariamente
                $this->_users = array();
            }
            else 
            {
                throw new XMappaException('Mappa inesistente.');
            }
               
        }
    }
    
    /*
     * Metodi get della classe EMappa.
     */
    
    /**
     * Metodo che restituisce il nome della mappa.
     * 
     * @access public
     * @return string Il nome della mappa.
     */
    public function getNomeMappa() {
        return $this->_nome;     
    }
    
    /**
     * Metodo che restituisce la nazione o parte di essa che la mappa visualizza.
     * 
     * @access public
     * @return string La nazione della mappa.
     */
    public function getNazioneMappa() {
        return $this->_nazione;     
    }
    
    /**
     * Metodo che restituisce la latitudine in cui è centrata la mappa.
     * 
     * @access public
     * @return double La latitudine della mappa.
     */
    public function getLatitudineMappa() {
        return $this->_latitudine;     
    }
    
    /**
     * Metodo che restituisce la longitudine in cui è centrata la mappa.
     * 
     * @access public
     * @return double La longitudine della mappa.
     */
    public function getLongitudineMappa() {
        return $this->_logitudine;     
    }
    
    /**
     * Metodo che restituisce le aree della mappa.
     * 
     * @access public
     * @return array Le aree della mappa.
     */
    public function getAreeMappa() {
        return $this->_aree;     
    }
    
    /**
     * Metodo che restituisce gli utenti che interagiscono e gestiscono la mappa.
     * 
     * @access public
     * @return array Gli utenti della mappa.
     */
    public function getUtentiMappa() {
        return $this->_aree;     
    }
    
    /*
     * Metodi set della classe EMappa.
     */
    
    /**
     * Metodo che permette di impostare il nome della mappa.
     * 
     * @access public
     * @param string $nome Nome della mappa.
     */
    public function setNomeMappa($nome) {
        $this->_nome = $nome;   
    }
    
    /**
     * Metodo che permette di impostare la nazione della mappa.
     * 
     * @access public
     * @param string $nazione La nazione della mappa.
     */
    public function setNazioneMappa($nazione) {
        $this->_nazione = $nazione;   
    }
    
    /**
     * Metodo che permette di impostare la latitudine della mappa.
     * 
     * @access public
     * @param string $latitudine La latitudine della mappa.
     */
    public function setLatitudineMappa($latitudine) {
        $this->_latitudine = $latitudine;   
    }
    
    /**
     * Metodo che permette di impostare la longitudine della mappa.
     * 
     * @access public
     * @param string $longitudine La longitudine della mappa.
     */
    public function setLongitudineMappa($longitudine) {
        $this->_longitudine = $longitudine;   
    }
    
    /**
     * Metodo che permette di impostare le aree della mappa.
     * 
     * @access public
     * @param array $aree Le aree della mappa.
     */
    public function setAreeMappa($aree) {
        $this->_aree = $aree;   
    }
    
    /**
     * Metodo che permette di impostare gli utenti che possono gestire/modificare la mappa.
     * 
     * @access public
     * @param array $utenti Le aree della mappa.
     */
    public function setUtentiMappa($utenti) {
        $this->_users = $utenti;   
    }
    
    /**
     * Metodo che consente di recuperare tutte le informazioni necessarie per la 
     * visualizzazione della mappa.
     * 
     * @access public
     * @return array Array contenenti le informazioni della mappa
     */
    public function getInfoMappa() { 
        $infoMappa = array('Nome'=> $this->_nome, 'Nazione'=> $this->_nazione, 
            'Latitudine' => $this->_latitudine, 'Longitudine'=> $this->_logitudine);
        return $infoMappa;
    }
    
    
    
    /**
     * Metodo che consente di recuperare tutte le informazioni necessarie per la mappa
     * delle probabilità iniziali.
     * 
     * @access public
     * @return array Le aree appartenenti alla mappa.
     * @throws XDBException Se la query non è stata eseguita con successo
     */
    public function getMappaProbabilitaIniziali() {
        $fMappa = USingleton::getInstance('FMappa');
        return $fMappa->cercaAreeMappaIniziali($this->getNomeMappa());       
    }
    
    /**
     * Metodo che consente di cercare il nome e il peso di tutte le aree della mappa.
     * 
     * @access public
     * @return array Il nome e il peso delle aree della mappa
     * @throws XDBException Se la query non è stata eseguita con successo
     */
    public function getMappaValoriAree() {
        $fMappa = USingleton::getInstance('FMappa');
        return $fMappa->getValoriAree($this->getNomeMappa());  
    }
    
    
    
    /**
     * Metodo che richiama la funzione dell'algoritmo di spread e accede nel DB 
     * per recuperare i nomi e le probabilità di propagazioni degli incendi di tutte le aree della mappa.
     * 
     * @access public
     * @return array|string Il risultato della query o la stringa Errore in caso in cui l'algoritmo non abbia eseguito le operazioni con successo. 
     * @throws XDBException Se la query non è stata eseguita con successo
     */
   
     public function getFirePropagationMappa() {
        $ctype = "-ctype mariadb"; // può essere mariadb o mysql
        $pathConfigFile = "-config /opt/lampp/htdocs/GeoSafe/include/Config.php";//"path completa al file Config.php" ; 
        $algoritmoInvocato = "-algo ppi"; //'FirePropagation';

        $tabelle = ""; // vertex and edges

        $session = USingleton::getInstance('USession');
        $at = $session->leggiVariabileSessione("areatab");
        $ct = $session->leggiVariabileSessione("colltab");
        if ($at !== FALSE) {
            $tabelle = " -vtable " . $at;
        }
            if ($ct !== FALSE) {
            $tabelle = " -etable " . $ct;
        }
         $parametri = $ctype . " " . $pathConfigFile . " " . $algoritmoInvocato . " " . $tabelle;
            exec('java -jar ./Algoritmo/dist/GEOSAFE2.jar ' . $parametri . ' 2>&1', $output2);

            if(is_array($output2)=== TRUE && count($output2)===1 && is_string($output2[0]) === TRUE)
            {
                $fMappa = USingleton::getInstance('FMappa');
                return $fMappa->getFirePropagationMappa($this->getNomeMappa());
            }
            else
            {
                return 'Error.';
            } 
        
       
    }


    /**
     *  public function getFirePropagationMappa() {
     *  $ctype = "-ctype mariadb"; // può essere mariadb o mysql
     *  $pathConfigFile = "-config /opt/lampp/htdocs/GeoSafe/include/Config.php";//"path completa al file Config.php" ; 
     *  $algoritmoInvocato = "-algo ppi"; //'FirePropagation';
     *  $parametri = $ctype . " " . $pathConfigFile . " " . $algoritmoInvocato;
     *  exec('java -jar ./Algoritmo/dist/GEOSAFE.jar ' . $parametri . ' 2>&1', $output);
     *  if(is_array($output)=== TRUE && count($output)===1 && is_string($output[0]) === TRUE)
     *  {
     *  $fMappa = USingleton::getInstance('FMappa');
     *  return $fMappa->getFirePropagationMappa($this->getNomeMappa());
     *  }
     *  else
     *  {
     *  return 'Error.';
     *  } 
     * }
     */
    
    /**
     * Metodo che richiama la funzione dell'algoritmo di spread e accede nel DB 
     * per recuperare i nomi e il rischio di tutte le aree della mappa.
     * 
     * @access public
     * @return array|string Il risultato della query o la stringa Errore in caso in cui l'algoritmo non abbia eseguito le operazioni con successo. 
     * @throws XDBException Se la query non è stata eseguita con successo
     */



    /**
     * public function getRiskMappa() {
     * $ctype = "-ctype mariadb"; // può essere mariadb o mysql
     * $pathConfigFile = "-config /opt/lampp/htdocs/GeoSafe/include/Config.php";//"path completa al file Config.php" ; 
     * $algoritmoInvocato = "-algo risk"; //'Risk';
     * $parametri = $ctype . " " . $pathConfigFile . " " . $algoritmoInvocato;
     * exec('java -jar ./Algoritmo/dist/GEOSAFE.jar ' . $parametri . ' 2>&1', $output);
     * if(is_array($output)=== TRUE && count($output)===1 && is_string($output[0]) === TRUE)
     *  {
     *     $fMappa = USingleton::getInstance('FMappa');
     *     return $fMappa->getRiskMappa($this->getNomeMappa());
     *   }
     *  else
     *  {
     *   return 'Error.';
     *  } 
     * }
     */
    
    public function getRiskMappa() {
        $ctype = "-ctype mariadb"; // può essere mariadb o mysql
        $pathConfigFile = "-config /opt/lampp/htdocs/GeoSafe/include/Config.php";//"path completa al file Config.php" ; 
        $algoritmoInvocato = "-algo risk"; //'Risk';

        $tabelle = ""; // vertex and edges
        $log = USingleton::getInstance('ULog');
        $session = USingleton::getInstance('USession');
        $at = $session->leggiVariabileSessione("areatab");
        $ct = $session->leggiVariabileSessione("colltab");
        if ($at !== FALSE) {
            $tabelle = " -vtable " . $at;
        }
        if ($ct !== FALSE) {
            $tabelle = " -etable " . $ct;
        }
         $parametri = $ctype . " " . $pathConfigFile . " " . $algoritmoInvocato . " " . $tabelle;
            exec('java -jar ./Algoritmo/dist/GEOSAFE2.jar ' . $parametri . ' 2>&1', $output);
         
            $log->log($output);
            if(is_array($output)=== TRUE && count($output)===1 && is_string($output[0]) === TRUE)
            {
                $fMappa = USingleton::getInstance('FMappa');
                return $fMappa->getRiskMappa($this->getNomeMappa());
            }
            else
            {
                return 'Error.';
            } 
        
       
}


     /**
     * Metodo che richiama la funzione dell'algoritmo di spread e accede nel DB 
     * per recuperare i nomi e il rischio di tutte le aree della mappa.
     * 
     * @access public
     * @return array|string Il risultato della query o la stringa Errore in caso in cui l'algoritmo non abbia eseguito le operazioni con successo. 
     * @throws XDBException Se la query non è stata eseguita con successo
     */
    
    public function getSimulateRiskMappa() {
        $ctype = "-ctype mariadb"; // può essere mariadb o mysql
        $pathConfigFile = "-config /opt/lampp/htdocs/GeoSafe/include/Config.php";//"path completa al file Config.php" ; 
        $algoritmoInvocato = "-algo risk"; //'Risk';

        $tabelle = ""; // vertex and edges

        $session = USingleton::getInstance('USession');
        $at = $session->leggiVariabileSessione("areatab");
        $ct = $session->leggiVariabileSessione("colltab");
        if ($at !== FALSE) {
            $tabelle = " -vtable " . $at;
        }
        if ($ct !== FALSE) {
            $tabelle = " -etable " . $ct;
        }

        $parametri = $ctype . " " . $pathConfigFile . " " . $algoritmoInvocato ;
        exec('java -jar ./Algoritmo/dist/GEOSAFE.jar ' . $parametri . ' 2>&1', $output1);
        
        if(is_array($output1)=== TRUE && count($output1)===1 && is_string($output1[0]) === TRUE)
        {
            $parametri = $ctype . " " . $pathConfigFile . " " . $algoritmoInvocato . " " . $tabelle;
            exec('java -jar ./Algoritmo/dist/GEOSAFE2.jar ' . $parametri . ' 2>&1', $output2);

            if(is_array($output2)=== TRUE && count($output2)===1 && is_string($output2[0]) === TRUE)
            {
                $fMappa = USingleton::getInstance('FMappa');
                return $fMappa->getSimulateRiskMappa($this->getNomeMappa());
            }
            else
            {
                return 'Error.';
            } 
        }
        else
        {
            return 'Error.';
        } 
}



 /**
     * Metodo che richiama la funzione dell'algoritmo di spread e accede nel DB 
     * per recuperare i nomi e la probabilità di propagazione di tutte le aree della mappa.
     * 
     * @access public
     * @return array|string Il risultato della query o la stringa Errore in caso in cui l'algoritmo non abbia eseguito le operazioni con successo. 
     * @throws XDBException Se la query non è stata eseguita con successo
     */


public function getSimulateFirePropagationMappa() {
    $ctype = "-ctype mariadb"; // può essere mariadb o mysql
    $pathConfigFile = "-config /opt/lampp/htdocs/GeoSafe/include/Config.php";//"path completa al file Config.php" ; 
    $algoritmoInvocato = "-algo ppi"; //'FirePropagation';

    $tabelle = ""; // vertex and edges

    $session = USingleton::getInstance('USession');
    $at = $session->leggiVariabileSessione("areatab");
    $ct = $session->leggiVariabileSessione("colltab");
    if ($at !== FALSE) {
        $tabelle = " -vtable " . $at;
    }
    if ($ct !== FALSE) {
        $tabelle = " -etable " . $ct;
    }
   
  
    $parametri = $ctype . " " . $pathConfigFile . " " . $algoritmoInvocato ;
    exec('java -jar ./Algoritmo/dist/GEOSAFE.jar ' . $parametri . ' 2>&1', $output1);

    if(is_array($output1)=== TRUE && count($output1)===1 && is_string($output1[0]) === TRUE)
    {
        $parametri = $ctype . " " . $pathConfigFile . " " . $algoritmoInvocato . " " . $tabelle;
        exec('java -jar ./Algoritmo/dist/GEOSAFE2.jar ' . $parametri . ' 2>&1', $output2);

        if(is_array($output2)=== TRUE && count($output2)===1 && is_string($output2[0]) === TRUE)
        {
            $fMappa = USingleton::getInstance('FMappa');
            return $fMappa->getSimulateFirePropagationMappa($this->getNomeMappa());
        }
        else
        {
            return 'Error.';
        } 
    }
    else
    {
        return 'Error.';
    } 
}
    
    /**
     * Metodo che consente di cercare tutte le aree della mappa.
     * 
     * @access public
     * @return array Le aree cercate
     * @throws XDBException Se la query non è stata eseguita con successo
     */
    public function cercaAreeMappa() {
        $daCercare['NomeMappa'] = $this->getNomeMappa();
        $fArea = USingleton::getInstance('FArea');
        return $fArea->cerca($daCercare);
    }
    
    /**
     * Metodo che consente di cercare un'area della mappa il cui nome è passato come parametro.
     * 
     * @access public
     * @return array L'area cercata
     * @throws XDBException Se la query non è stata eseguita con successo
     */
    // creata per l'aggiunta dell'arco
//    public function cercaAreaMappa($nomeArea) {
//        $daCercare['NomeMappa'] = $this->getNomeMappa();
//        $daCercare['Nome'] = $nomeArea;
//        $fArea = USingleton::getInstance('FArea');
//        return $fArea->cerca($daCercare);
//    }
    
    /**
     * Metodo che consente di conoscere se già esiste un collegamento tra due aree passate come parametri.
     * 
     * @access public
     * @param int $idArea1 L'id dell'area1 della mappa.
     * @param int $idArea2 L'id dell'area2 della mappa.
     * @return boolean TRUE se esiste nel database un collegamento tra le due aree, FALSE se non esiste.
     * @throws XDBException Se la query non è stata eseguita con successo.
     */
    public function esisteCollegamentoTraAree($idArea1, $idArea2) {
        $daCercare['StartFireArea'] = $idArea1;
        $daCercare['FirePropagationArea'] = $idArea2;
        $fCollegamento = USingleton::getInstance('FCollegamento');
        if(count($fCollegamento->cerca($daCercare))===0)
        {
            return FALSE;
        }
        else
        {
            return TRUE;
        }
        
    }
    
    
    /**
     * Metodo che consente di ottenere solo il nome e il confine di tutte le aree della mappa.
     * 
     * @access public
     * @return array Le aree cercate
     * @throws XDBException Se la query non è stata eseguita con successo
     */
    public function getNomeConfineAreeMappa() {
//        $fArea = USingleton::getInstance('FArea');
//        return $fArea->cercaNomeConfineAree($this->getNomeMappa());
        $fMappa = USingleton::getInstance('FMappa');
        return $fMappa->cercaNomeConfineAree($this->getNomeMappa());
    }
    
    /**
     * Metodo che consente di ottenere tutti i collegamenti presenti sulla mappa.
     */
    public function getCollegamentiMappa() {
        $fMappa = USingleton::getInstance('FMappa');
        return $fMappa->cercaCollegamentiMappa($this->getNomeMappa());
    }
    
     /**
     * Metodo che consente di ottenere il centro di ogni area presente sulla mappa.
     * 
     * @access public
     * @return array I centri cercati.
     * @throws XDBException Se la query non è stata eseguita con successo
     */
    public function getCentriAree() {
        $fMappa = USingleton::getInstance('FMappa');
        $centri = $fMappa->getCentriAree();
        if(count($centri)>0)
        {
            foreach ($centri as $indice => $valore) {
                $centri[$indice]['Nome'] = $valore['Nome'];
                $valore = $this->puntoDaTextToArray($valore['Centro']);
                unset($centri[$indice]['Centro']);
                $centri[$indice]['Latitudine'] = $valore['Latitudine'];
                $centri[$indice]['Longitudine'] = $valore['Longitudine'];
            }
        }
        return $centri;
    }
    
    /**
     * Metodo che consente di convertire un punto in forma testuale  del tipo POINT(x y) in un array del tipo punto[x]=x e punto[y]=y.
     * 
     * @access public
     * @param string $punto Un punto POINT(x y) dove x è la longitudine e y la latitudine
     * @return array Le coordinate del punto nell'array
     */
    public function puntoDaTextToArray($punto) {
        $punto  = str_replace('POINT(', "", $punto);
        $punto  = str_replace(')', "", $punto);
        $punto = explode(" ", $punto);
        $centro = array();
        $centro['Longitudine'] = $punto[0];
        $centro['Latitudine'] = $punto[1];
        return $centro;
    }
    
    /**
     * Metodo che restituisce tutti i nomi delle aree della mappa.
     * 
     * @access public
     * @return array I nomi delle aree della mappa.
     */
    public function getNomiAreeMappaDB() {
        $fMappa = USingleton::getInstance('FMappa');
        return $fMappa->getNomiAreeMappa($this->getNomeMappa());
    }
}
