<?php

/**
 * La classe EArea si occupa della gestione in ram dell'area.
 *
 * @package Entity
 * @author Claudia Di Marco 
 */
class EArea {
    /*
     * Attributi della classe EArea.
     */
    
    /**
     * @var int $_id L'id dell'area.
     */
    private $_id;
    
     /**
     * @var string $_nomeMappa Il nome della mappa che contiene l'area.
     */
    private $_nomeMappa;
    
    /**
     * @var string $_nome Il nome dell'area.
     */
    private $_nome;
    
    /**
     * @var double $_probabilitaIniziale La probabilità che l'incendio si inneschi nell'area.
     */
    private $_probabilitaIniziale;
    
    /**
     * @var double $_peso Il valore dell'area.
     */
    private $_peso;
    
    /**
     * @var double $_rischio Il prodotto del peso e della probabilità d'incendio dell'area.
     */
    private $_rischio;
    
    /**
     * @var string $_typeFeature Il tipo di feature del confine. Può essere Polygon o MultiPolygon 
     */
    private $_typeFeature;
    
    /**
     * @var string $_confine Vertici del poligono che forma il confine dell'area. 
     */
    private $_confine;
    
    /**
     * @var array $_centro Il centro dell'area. 
     */
    private $_centro;
    
    /**
     * @var double $_probabilitaPropagazioneIncendi La probabilità che l'incendio si propaghi attraverso l'area.
     */
    private $_probabilitaPropagazioneIncendi;
    
    /**
     * @var array $_startCollegamenti Array di collegamenti con le aree vicine che possono essere interessate se l'area stessa si incendiasse. 
     */
    private $_startCollegamenti;
    
    /**
     * @var array $_propagationCollegamenti Array di collegamenti con le aree vicine (da cui potrebbe porpagarsi il fuoco oppure) che se si dovessero incendiare, potrebbero far incendiare l'area stessa . 
     */
    private $_propagationCollegamenti;
    
    /**
     * Costruttore di EArea
     * 
     * @access public
     * @param int $id L'id dell'area
     * @param string $nome Il nome dell'area
     * @param string $nomeMappa Il nome della mappa a cui appartiene l'area
     * @param double $probIniz La propabilità che un incendio si inneschi nell'area
     * @param double $peso Il valore dell'area
     * @param string $typeFeature Il tipo di confine. Può assumere il valore Polygon o MultiPolygon
     * @param string|array $confine I punti che compongono il poligono del confine
     * @param double $probIncendi La probabilità che un incendio si propaghi nell'area
     * @param array $centro Il centro dell'area. L'array possiede due indici: Latitudine e Longitudine
     * @throws XDBException Se la query non è stata eseguita con successo
     * @throws XAreaException Se viene trovata più di un'area con quel nome o quell'id o nessuna area con quell'id.
     */
    public function __construct($nome, $id=NULL, $nomeMappa='Corsica', $probIniz = 0, $peso = 0, $typeFeature= 'Polygon', $confine = '', $probIncendi=0, $centro = NULL ) {
        if(isset($id))
        {
            //cerca per id
            // trova nel db l'area con quell'id
            $area = $this->cercaAreaByIdDB($id);
            // non è stata lanciata nessuna eccezione quindi sono sicura che sia stata trovata ed è unica l'area.
            $this->_id = $area[0]['Id'];
            $this->_nome = $area[0]['Nome'];
            $this->_nomeMappa = $area[0]['NomeMappa'];
            $this->_probabilitaIniziale = $area[0]['ProbabilitaIniziale'] ;
            $this->_peso = $area[0]['Peso'];
            $this->_rischio = $area[0]['Rischio'];
            $this->_typeFeature = $area[0]['TypeFeature'];
            $this->_confine = $area[0]['Confine'];
//            $this->_centro = $area[0]['Centro'];
            $this->_centro = $this->puntoDaTextToArray($area[0]['Centro']);
            $this->_probabilitaPropagazioneIncendi = $area[0]['ProbabilitaPropagazioneIncendi']; 
            $this->_startCollegamenti = array();
            $this->_propagationCollegamenti = array();
        }
        elseif($probIniz === 0)
        {
            
            $this->_id = NULL;
            $area = $this->cercaAreaDB($nome, $nomeMappa);
            if(count($area)===1)
            {
                // sono sicura che esista già una sola area
                $this->_id = $area[0]['Id'];
                $this->_nome = $area[0]['Nome'];
                $this->_nomeMappa = $area[0]['NomeMappa'];
                $this->_probabilitaIniziale = $area[0]['ProbabilitaIniziale'] ;
                $this->_peso = $area[0]['Peso'];
                $this->_rischio = $area[0]['Rischio'];
                $this->_typeFeature = $area[0]['TypeFeature'];
                $this->_confine = $area[0]['Confine'];
                $this->_centro = $this->puntoDaTextToArray($area[0]['Centro']);
                //$this->_centro = $area[0]['Centro'];
                $this->_probabilitaPropagazioneIncendi = $area[0]['ProbabilitaPropagazioneIncendi']; 
                $this->_startCollegamenti = array();
                $this->_propagationCollegamenti = array();
            }
        }
        else
        {
            // non ci sono aree con quel nome
            $this->_nome = $nome;
            $this->_nomeMappa = $nomeMappa;
            $this->_probabilitaIniziale = $probIniz ;
            $this->_peso = $peso;
            $this->_rischio = $peso*$probIniz;
            $this->_typeFeature = $typeFeature;
            $this->_confine = $confine;
            $this->_centro = $centro;
            $this->_probabilitaPropagazioneIncendi = $probIncendi; 
            $this->_startCollegamenti = array();
            $this->_propagationCollegamenti = array();

        }
        
    }
    
    /*
     * Metodi get della classe EMappa.
     */
    
    /**
     * Metodo che restituisce l'id dell'area.
     * 
     * @access public
     * @return int L'id dell'area.
     */
    public function getIdArea() {
        return $this->_id;     
    }
    
    /**
     * Metodo che restituisce il nome della mappa.
     * 
     * @access public
     * @return string Il nome della mappa.
     */
    public function getNomeMappaArea() {
        return $this->_nomeMappa;     
    }
    
    /**
     * Metodo che restituisce il nome dell'area.
     * 
     * @access public
     * @return string Il nome dell'area.
     */
    public function getNomeArea() {
        return $this->_nome;     
    }
    
    /**
     * Metodo che restituisce la probabilità per cui un incendio inizi nell'area.
     * 
     * @access public
     * @return double La probabilità iniziale che l'incendio si inneschi nell'area.
     */
    public function getProbabilitaInizialeArea() {
        return $this->_probabilitaIniziale;     
    }
    
    /**
     * Metodo che restituisce il peso/valore dell'area.
     * 
     * @access public
     * @return double Il peso dell'area.
     */
    public function getPesoArea() {
        return $this->_peso;     
    }
    
    /**
     * Metodo che restituisce il rischio dell'area.
     * 
     * @access public
     * @return double Il rischio dell'area.
     */
    public function getRischioArea() {
        return $this->_rischio;     
    }
    
    /**
     * Metodo che restituisce il tipo di feature del confine dell'area.
     * 
     * @access public
     * @return string Il tipo di feature del confine dell'area.
     */
    public function getTypeFeatureArea() {
        return $this->_typeFeature;     
    }
    
    /**
     * Metodo che restituisce il confine dell'area.
     * 
     * @access public
     * @return string|array Il confine dell'area.
     */
    public function getConfineArea() {
        return $this->_confine;     
    }
    
    /**
     * Metodo che restituisce il centro dell'area in formato testuale.
     * 
     * @access public
     * @return string Il centro dell'area.
     */
    public function getCentroArea() {
        return $this->_centro;     
    }
    
   
    
    /**
     * Metodo che restituisce la probabilità che un incendio si propaghi nell'area.
     * 
     * @access public
     * @return double La probabilità che un incendio si propaghi nell'area.
     */
    public function getProbabilitaPropagazioneIncendiArea() {
        return $this->_probabilitaPropagazioneIncendi;     
    }
    
    /**
     * Metodo che permette di ottenere l'array di collegamenti verso cui l'incendio si potrebbe propagare.
     * 
     * @access public
     * @return array Array di collegamenti verso cui l'incendio si potrebbe propagare.
     */
    public function getPropagationCollegamentiArea() {
        return $this->_propagationCollegamenti;   
    }
    
    /**
     * Metodo che permette di ottenere l'array di collegamenti dai quali l'incendio potrebbe sopraggiungere.
     * 
     * @access public
     * @param array Array di collegamenti da cui l'incendio potrebbe sopraggiungere.
     */
    public function getStartCollegamentiArea() {
        return $this->_startCollegamenti;    
    }
    
    /*
     * Metodi set della classe EArea.
     */
    
    /**
     * Metodo che permette di impostare l'id dell'area.
     * 
     * @access public
     * @param int $id L'id dell'area.
     */
    public function setIdArea($id) {
        $this->_id = $id;   
    }
    
    /**
     * Metodo che permette di impostare il nome della mappa.
     * 
     * @access public
     * @param string $nome Nome della mappa.
     */
    public function setNomeMappaArea($nome) {
        $this->_nomeMappa = $nome;   
    }
    
    /**
     * Metodo che permette di impostare il nome dell'area.
     * 
     * @access public
     * @param string $nome Nome dell'area.
     */
    public function setNomeArea($nome) {
        $this->_nome = $nome;   
    }
    
    /**
     * Metodo che permette di impostare il centro dell'area.
     * 
     * @access public 
     * @param type $latitudine
     * @param type $longitudine
     */
    public function setCentroArea($latitudine, $longitudine) {
        $this->_centro = array();  
        $this->_centro['Latitudine'] = $latitudine;
        $this->_centro['Longitudine'] = $longitudine;
        
    }
    
    /**
     * Metodo che permette di impostare il centro dell'area nel database.
     * 
     * @access public 
     * @param type $latitudine La latitudine del centro
     * @param type $longitudine La longitudine del centro
     * @return boolean TRUE se è stato impostato nel db.
     * @throws XBException Se c'è stato un problema nel db
     */
    public function setCentroAreaDB($latitudine, $longitudine) {
        $this->setCentroArea($latitudine, $longitudine); 
        $fArea = USingleton::getInstance('FArea');
        return $fArea->setCentro($this->getNomeArea(), $latitudine, $longitudine);
        
    }
    
    /**
     * Metodo che permette di impostare il peso/valore dell'area.
     * 
     * @access public
     * @param double $peso Il valore/peso dell'area.
     */
    public function setPesoArea($peso) {
        $this->_peso = $peso;   
    }
    
    
    /**
     * Metodo che permette di impostare il type feature del confine dell'area. Può essere Polygon e MultiPolygon.
     * 
     * @access public
     * @param string $typeFeature Il tipo di feature del confine dell'area.
     */
    public function setTypeFeatureArea($typeFeature) {
        $this->_typeFeature = $typeFeature;   
    }
    
    /**
     * Metodo che permette di impostare il confine dell'area.
     * 
     * @access public
     * @param string|array $confine Confine dell'area.
     */
    public function setConfineArea($confine) {
        $this->_confine = $confine;   
    }
    
    /**
     * Metodo che permette di impostare il rischio dell'area.
     * 
     * @access public
     * @param double $rischio Rischio dell'area.
     */
    public function setRischioArea($rischio) {
        $this->_rischio = $rischio;   
    }
    
    /**
     * Metodo che permette di impostare il valore della probabilità iniziale dell'area 
     * ovvero il valore della probabilità che un incendio parta da questa area.
     * 
     * @access public
     * @param double $prob Probabilità iniziale dell'area.
     */
    public function setProbabilitaInizialeArea($prob) {
        $this->_probabilitaIniziale = $prob;   
    }
    
    /**
     * Metodo che permette di impostare la probabilità che l'incendio si propaghi nell'area.
     * 
     * @access public
     * @param double $prob Probabilità che l'incendio si propaghi nell'area.
     */
    public function setProbabilitaPropagazioneIncendiArea($prob) {
        $this->_probabilitaPropagazioneIncendi = $prob;   
    }
    
    /**
     * Metodo che permette di impostare i collegamenti verso cui l'incendio si potrebbe propagare.
     * 
     * @access public
     * @param array $collegamenti Array di collegamenti verso cui l'incendio si potrebbe propagare.
     */
    public function setPropagationCollegamentiArea($collegamenti) {
        $this->_propagationCollegamenti = $collegamenti;   
    }
    
    /**
     * Metodo che permette di impostare i collegamenti dai quali l'incendio potrebbe sopraggiungere.
     * 
     * @access public
     * @param array $collegamenti Array di collegamenti da cui l'incendio potrebbe sopraggiungere.
     */
    public function setStartCollegamentiArea($collegamenti) {
        $this->_startCollegamenti = $collegamenti;      
    }
    
    /**
     * Metodo che consente di aggiungere un'area nel database.
     * 
     * @access public
     * @return boolean Se la query è stata eseguita con successo, in caso contrario lancerà l'eccezione.
     * @throws XDBException Se la query non è stata eseguita con successo
     */
    public function inserisciAreaDB() {
        //crea un oggetto fArea se non è esistente, si collega al DB e lo inserisce
        
        $fArea = USingleton::getInstance('FArea');
        return $fArea->inserisci($this);   
        
    }
    
    public function inserisciAreaPolygonDB() {
        //crea un oggetto fArea se non è esistente, si collega al DB e lo inserisce
        $fArea = USingleton::getInstance('FArea');
        return $fArea->inserisciPolygon($this);   
        
    }
    
    /**
     * Metodo che consente di cercare un'area nel DB.
     * 
     * @access public
     * @param string $nome Il nome dell'area
     * @param string $nomeMappa Il nome della mappa. Di default è Corsica
     * @return array L'elemento cercarto o un array vuoto se non viene trovato nessun elemento 
     * @throws XDBException Se la query non è stata eseguita con successo
     * @throws XAreaException Se viene trovata più di un'area 
     */
    public function cercaAreaDB($nome, $nomeMappa='Corsica') {
        $fArea = USingleton::getInstance('FArea');
        $daCercare = array('NomeMappa'=>$nomeMappa, 'Nome'=>$nome) ;
        $areaCercata = $fArea->cerca($daCercare);
        if(count($areaCercata)>1)
        {
            throw new XAreaException('Trovata più di una area.');   
        }
        elseif(count($areaCercata)===1)
        {
            return $areaCercata;
        }
        else
        {
            throw new XAreaException('Area inesistente.');  
        }
    }
    
    /**
     * Metodo che consente di cercare un'area nel DB.
     * 
     * @access public
     * @param int $id L'id dell'area
     * @return array L'elemento della tabella cercato
     * @throws XDBException Se la query non è stata eseguita con successo
     * @throws XAreaException Se viene trovata più di un'area o nessuna
     */
    public function cercaAreaByIdDB($id) {
        $fArea = USingleton::getInstance('FArea');
        $areaCercata = $fArea->cercaByPK($id);
        if(count($areaCercata)===1)
        {
            return $areaCercata;
        }
        elseif(count($areaCercata)>=1)
        {
            throw new XAreaException('Trovata più di una area');
        }
        else 
        {
            throw new XAreaException('Nessuna area trovata');
        }
       
    }
    
    /**
     * Metodo che consente di modificare un'area nel database.
     * 
     * @access public
     * @param Array $daModificare array associativo il cui indice è il campo della tabella da modificare , il valore è il valore modificato
     * @return boolean TRUE se la query viene eseguito con successo altrimenti lancia un'eccezione
     * @throws XDBException Se la query non è eseguita con successo
     */
    public function modificaAreaDB($daModificare) {
        $fArea = USingleton::getInstance('FArea');
        return $fArea->update($this->getIdArea(), $daModificare);
    }
    
    /**
     * Metodo che consente di capire se un'area passata come parametro è adiacente all'area che richiama la funzione.
     * 
     * @access public
     * @param EArea $area Un altro oggetto di tipo EArea 
     * @return boolean TRUE se c'è un'intersezione tra le aree, FALSE altrimenti
     * @throws XDBException Se una delle query non è stata eseguita con successo
     */
    public function esisteCollegamentoCon($area) {
        $fArea = USingleton::getInstance('FArea');
        return $fArea->esisteCollegamento($this, $area);
    }
    
    public function esisteCollegamentoSudEst($area) {
        $fArea = USingleton::getInstance('FArea');
        $rettangle[0]['MBR'] = $fArea->trovaMBRArea($this->getIdArea());
        $daEliminare = array('POLYGON(', ')','(');
        $rettangle= str_replace($daEliminare, "", $rettangle[0]['MBR']);
        $puntiRettangolo = explode(',', $rettangle);
        $minxminy =$puntiRettangolo[0]; 
        $maxxminy =$puntiRettangolo[1];
        $maxxmaxy =$puntiRettangolo[2];
//        $minxmaxy =$puntiRettangolo[3]; 
        
        $xy = explode(' ', $maxxmaxy);
        $maxx = $xy[0];
        $maxy = $xy[1];
        $zz = explode(' ', $minxminy);
        
        $minx = $zz[0];
        $miny = $zz[1];
         
        $newMinX = ($maxx - $minx)/4 * 3 + $minx;
        $newMaxY = ($maxy - $miny)/4   + $miny ; 
        $MBR1= 'POLYGON((' . $newMinX . " ". $miny . ',' . $maxxminy . ',' . $maxx . " " . $newMaxY . ',' . $newMinX . " " . $newMaxY .','. $newMinX . " ". $miny .'))';// costruisco un MBR un quarto di quello iniziale
        $MBR2 = $fArea->trovaMBRArea($area->getIdArea());
        return $fArea->intersezioneMBR($MBR1,$MBR2);
        
           
        
        
        
        
        
    }
    
    /**
     * Metodo che consente di capire se un'area passata come parametro è adiacente ed a SUD-EST all'area che richiama la funzione.
     * 
     * @access public
     * @param EArea $area Un altro oggetto di tipo EArea 
     * @return boolean TRUE se c'è un'intersezione tra le aree e l'area si trova a Sud-Est, FALSE altrimenti
     * @throws XDBException Se una delle query non è stata eseguita con successo
     */
    public function esisteCollegamentoSudEst2($area) {
        $fArea = USingleton::getInstance('FArea');
        if($fArea->esisteCollegamento($this, $area))
        {
            $centroStart = $this->getCentroArea();
            $centroEnd = $area->getCentroArea();
            $yCentroStart = strval($centroStart['Latitudine']); //latitudine
            $xCentroStart = strval($centroStart['Longitudine']); // longitudine
            $yCentroEnd = strval($centroEnd['Latitudine']);
            $xCentroEnd = strval($centroEnd['Longitudine']);
//            $xCentroStart = explode(".", $xCentroStart);
//            $xCentroEnd = explode(".", $xCentroEnd);
//            $xCentroEnd[0] = intval($xCentroEnd[0]);
//            $xCentroEnd[1] = intval($xCentroEnd[1]);
//            $xCentroStart[0] = intval($xCentroStart[0]);
//            $xCentroStart[1] = intval($xCentroStart[1]);

//            $x = $xCentroEnd[0] - $xCentroStart[0];
//            $z = $xCentroEnd[1] - $xCentroStart[1];
            
            
            $x = $xCentroEnd - $xCentroStart;
            $y = $yCentroStart - $yCentroEnd;
//            $yCentroEnd[0] = intval($yCentroEnd[0]);
//            $yCentroEnd[1] = intval($yCentroEnd[1]);
//            $yCentroStart[0] = intval($yCentroStart[0]);
//            $yCentroStart[1] = intval($yCentroStart[1]);
//            $y = $yCentroStart[0] - $yCentroEnd[0];
//            $w = $yCentroStart[1]  - $yCentroEnd[1] ;
            
            if($x>0 && $y>0)
            {
                return TRUE;
            }
            else
            {
//                if($z>0 && $w>0)
//                {
//                    return TRUE;
//                }
//                else 
                { 
                    return FALSE;
                }
                
            }
        }  
        else
        {
            return FALSE;
        }
    }
    
    /**
     * Metodo che consente di convertire un punto in forma testuale  del tipo POINT(x y) in un array del tipo punto[x]=x e punto[y]=y.
     * 
     * @access public
     * @param string $punto Un punto POINT(x y)
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
    
     
    public function scriviAreaSuFile() {
            $filename = "aree.sql";
            try{
                // mode a : file aperto in modalità Solo scrittura, puntatore puntatore alla fine del file. Se il file non file non esiste, tenta di crearlo
                $handle = fopen($filename, 'a');
                $stringaDaScrivere = '';
                if(filesize($filename) === 0)
                {
                    $stringaDaScrivere = "DROP DATABASE IF EXISTS geosafe;
                    CREATE DATABASE geosafe;
                    USE geosafe;
                    
                    CREATE TABLE mappa (
                        Nome varchar(15) NOT NULL,
                        Nazione varchar(60) NOT NULL,
                        Latitudine double NOT NULL,
                        Longitudine double NOT NULL,
                        PRIMARY KEY (Nome)
                    ) ;
                    
                    INSERT INTO mappa (Nome, Nazione, Latitudine, Longitudine) VALUES
                    ('Corsica', 'Francia', 42.3060908, 9.1504022);
                    
                    CREATE TABLE area (
                        Id int NOT NULL AUTO_INCREMENT,
                        NomeMappa varchar(15) NOT NULL,
                        Nome varchar(60) NOT NULL,
                        ProbabilitaIniziale double NOT NULL,
                        Peso double NOT NULL,
                        Rischio double NULL,
                        Confine GEOMETRY NOT NULL,
                        TypeFeature ENUM('Polygon', 'MultiPolygon'),
                        Centro GEOMETRY NOT NULL,
                        ProbabilitaPropagazioneIncendi double NULL,
                        PRIMARY KEY (id),
                        UNIQUE (Nome),
                        FOREIGN KEY (NomeMappa) REFERENCES mappa (Nome) ON DELETE CASCADE ON UPDATE CASCADE
                    ) ;
                    
                    CREATE TABLE collegamento (
                        StartFireArea int NOT NULL,
                        FirePropagationArea int NOT NULL,
                        ProbabilitaPropagazioni double NOT NULL,
                        PRIMARY KEY (StartFireArea,FirePropagationArea),
                        FOREIGN KEY (StartFireArea) REFERENCES area (Id) ON DELETE CASCADE ON UPDATE CASCADE,
                        FOREIGN KEY (FirePropagationArea) REFERENCES area (Id) ON DELETE CASCADE ON UPDATE CASCADE
                    ) ;
                    ";
                }
                if ($this->getTypeFeatureArea()==='Polygon')
                {
                    $stringaDaScrivere .= "SET @g = 'POLYGON" . $this->geotoPoly($this->getConfineArea()) . "'; \n";
                    $stringaDaScrivere .= " INSERT INTO area (NomeMappa, Nome, ProbabilitaIniziale, Peso, Rischio, Confine, TypeFeature,ProbabilitaPropagazioneIncendi) VALUES ('" . $this->getNomeMappaArea() . "', '" . $this->getNomeArea() . "', " . $this->getProbabilitaInizialeArea() . ", " . $this->getPesoArea() . ", NULL, ST_GeomFromText(@g), 'Polygon', NULL); ";
                }
                else
                {
                    $stringaDaScrivere .= "SET @g = 'MULTIPOLYGON" . $this->geotoMultiPoly($this->getConfineArea()) . "'; \n";
                    $stringaDaScrivere .= " INSERT INTO area (NomeMappa, Nome, ProbabilitaIniziale, Peso, Rischio, Confine, TypeFeature,ProbabilitaPropagazioneIncendi) VALUES ('" . $this->getNomeMappaArea() . "', '" . $this->getNomeArea() . "', " . $this->getProbabilitaInizialeArea() . ", " . $this->getPesoArea() . ", NULL, MultiPolygonFromText(@g), 'MultiPolygon', NULL); ";
                
                }
                fwrite($handle, $stringaDaScrivere);
                fclose($handle);// per chiudere il file
            } 
            catch (Exception $ex)
            {
                echo 'eccezione';
            }
        }  
        
    public function scriviCentrosuFile() {
        $centro = $this->getCentroArea();
        $centroPoint = "POINT(" . strval($centro[0]) . " " . strval($centro[1]) . ")";
        $filename = "./centriAree.sql";
        try{
                // mode a : file aperto in modalità Solo scrittura, puntatore puntatore alla fine del file. Se il file non file non esiste, tenta di crearlo
                $handle = fopen($filename, 'a');
                $stringaDaScrivere = '';
                if(filesize($filename) === 0)
                {
                    $stringaDaScrivere = "USE geosafe; "
                        . "UPDATE area SET Centro=ST_PointFromText('". $centroPoint . "') "
                        . "WHERE area.Nome='" . $this->getNomeArea() . "'; ";
                }
                else
                {
                    $stringaDaScrivere = "UPDATE area SET Centro=PointFromText('". $centroPoint . "') "
                        . "WHERE area.Nome='" . $this->getNomeArea() . "'; ";
                }
                fwrite($handle, $stringaDaScrivere);
                fclose($handle);// per chiudere il file
            } 
            catch (Exception $ex)
            {
                echo 'eccezione';
            }
    }    

   public function geotoMultiPoly($geoJson) {
        $multiPoly = '(';
        $geoJson = str_replace(array("\r", "\n", " "), '', $geoJson);
        $poligoni = json_decode($geoJson);
        foreach ($poligoni as $poligono) {
            $multiPoly .= '(';
            foreach ($poligono as $confine) {
                $multiPoly .= '(';
                foreach ($confine as $vertice) {
                    $multiPoly .= $vertice[0] . ' ' . $vertice[1] . ',';
                }
                $multiPoly = substr($multiPoly, 0, strlen(($multiPoly))-1);
                $multiPoly  .= '),';
            }
            $multiPoly = substr($multiPoly, 0, strlen(($multiPoly))-1);
            $multiPoly  .= '),';
        }
        $multiPoly = substr($multiPoly, 0, strlen(($multiPoly))-1) . ')';
        return $multiPoly;   
    } 
    
   /**
    * Metodo che consente di convertire l'input di tipo JSON nel formato adatto alla funzione POLYGON
    * 
    * @access public
    * @param type $geoJson
    * @return string
    */
    public function geotoPoly($geoJson) {
        $poly = '(';
        $geoJson = str_replace(array("\r", "\n", " "), '', $geoJson);
        $poligono = json_decode($geoJson);
        foreach ($poligono as $confine) {
            $poly .= '(';
            foreach ($confine as $vertice) 
                {
                    $poly .= $vertice[0] . ' ' . $vertice[1] . ',';
                }
                $poly = substr($poly, 0, strlen(($poly))-1);
                $poly  .= '),';
            }
        $poly = substr($poly, 0, strlen(($poly))-1);
        $poly  .= ')';
        return $poly;   
    } 
    
    /**
     * Metodo che consente di aggiungere tutti i collegamenti di un'area.
     * 
     * @access public
     * @throws XDBException Se la query non è stata eseguita con successo. Le aree non sono cercate con successo.
     *
     */
    public function addTuttiCollegamentiAreaDB() {
        // cerco le aree che non siano quella che ho aggiunto
        $fArea = USingleton::getInstance('FArea');
        $daCercare= array('Nome'=> $this->getNomeArea());
        $areaConId= $fArea->cerca($daCercare);
        $id = $areaConId[0]['Id'];
        $this->setIdArea($id);
        $aree = $fArea->cercaAltreAree($this->getNomeArea());
        // per ogni area trovata, controllo se possiede un'intersezione con l'area aggiunta poichè questo significa che sono adiacenti dal momento che le area non si sovrappongono.
        foreach ($aree as $area) {
            $intersezioni = $fArea->cercaInterserzioni($area);
            // per ogni intersezione aggiungi un collegamente
            if(count($intersezioni)>=1)
            {
                foreach ($intersezioni as $intersezione) {
                    $eCollegamento = new ECollegamento($this->getIdArea(), $intersezione['Id']);
                    $eCollegamento->inserisciCollegamentoDB();
                    $eCollegamento->scriviCollegamentoSuFile();
                }
            }
        }    
    }

    /**
     * Metodo che consente di ottenere tutte le informazioni dell'area modificabili dall'utente ovvero
     * NomeMappa, Nome, ProbabilitàIniziale, Peso, Centro  (questi ultimi modificabili)
     * 
     * @access public
     * @return array Il risultato della query.
     * @throws XDBException Se la query non è stata eseguita con successo
     */
    public function getInfoModificabili() {
        
        // potrei non passare per il db ma passo cmq per il db perchè così sono sicura che le info che recupero sono le più aggiornate
        // caso in cui un altro utente avesse modificato i dati nel contempo che si è richiamata la funzione
        $fArea = USingleton::getInstance('FArea');
        return $fArea->getInfoModificabili($this->getIdArea());
    }
    
    /**
     * Metodo che consente di controllare se il punto passsato come paramentro è contenuto all'interno dell'area.
     * 
     * @access public
     * @param string $punto Stringa del tipo "POINT(" . $Longitudine . " " . $Latitudine . ")"
     * @return boolean TRUE se il punto è contenuto, FALSE altrimenti.
     * @throws XDBException Se una query non è stata eseguita con successo.
     */
    public function centroContenutoInArea($punto) {
        $fArea  = USingleton::getInstance('FArea');
        if($this->getIdArea()!==NULL)
        {
            return $fArea->centroContenutoInArea($this->getConfineArea(), $punto, $this->getIdArea());
        }
        else
        {
            return $fArea->centroContenutoInArea($this->getConfineArea(), $punto, NULL, $this->getNomeArea());
        }
    }
   
    /**
     * Metodo che consente di eliminare l'area nel DB.
     * 
     * @access public
     * @return boolean TRUE se la query è eseguito con successo ovvero se è stata eliminata l'area, altrimenti lancia eccezione
     * @throws XDBException  Se la query non viene eseguita con successo
     */
    public function eliminaAreaDB() {
        $fArea = USingleton::getInstance('FArea');
        return $fArea->elimina($this->getIdArea());
    }
    
    /**
     * Metodo che consente di ottenere il nome, typeFeature, confine dell'area
     * 
     * @access public
     * @return array Nome, typeFeature, confine dell'area
     * @throws XDBException Se la query non è stata eseguita con successo
     */
    public function getNomeTypeFeatureConfineArea() {
        $fArea = USingleton::getInstance('FArea');
        return $fArea->cercaNomeConfineAree($this->getNomeMappaArea(), $this->getIdArea());
    }
    
    /**
     * Metodo che consente di cercare le aree a sud-est dell'area e con esse aggiungere un collegamento.
     * 
     * @access public
     * @param array $aree Array di aree con cui cercare se esistono collegamenti a sud-est
     */
    public function inserisciCollegamentiAreaASudEst($aree) {
        
        foreach ($aree as $areaEnd) 
        {
            if($this->getIdArea() !== $areaEnd['Id'] )
            {
                $eAreaEnd = new EArea($areaEnd['Nome'], $areaEnd['Id']);// potrei eliminarlo e usare l'array ma poi in esiste collegamento tra aree userei un oggetto e un array
                if($this->esisteCollegamentoCon($eAreaEnd)===TRUE) // esisteCollegamentoCon potrebbe lanciare un XDBException
                {
    //                                    echo ' esite collegamento ';
                    if($this->esisteCollegamentoSudEst($eAreaEnd) === TRUE)//  per la Corsica essendoci venti dominanti colleghiamo solo aree adiacenti e con Area1 a sud-est di Area2
    //                                if($eAreaStart->esisteCollegamentoCon($eAreaEnd) === TRUE)
                    { 
    //                    echo ' sud-est collegamento ';
                        $eCollegamento = new ECollegamento($this->getIdArea(), $eAreaEnd->getIdArea(), 0.5);
                        $eCollegamento->inserisciCollegamentoDB(); //@return boolean Se la query è stata eseguita con successo, in caso contrario lancerà l'eccezione.@throws XDBException Se la query non è stata eseguita con successo
    //                            //le due righe seguenti sono stati aggiunti per il collegamento sud-est altrimenti 
    //                                $eCollegamento = new ECollegamento( $areaEnd['Id'],$areaStart['Id']);
    //                                $eCollegamento->inserisciCollegamentoDB();
                    } 
                }
            }
        }
        
    }
}
