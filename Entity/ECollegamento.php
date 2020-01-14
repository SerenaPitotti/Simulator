<?php

/**
 * La classe ECollegamento si occupa della gestione in ram del collegamento tra due aree.
 *
 * @package Entity
 * @author Claudia Di Marco 
 * @author Serena Pitotti
 */
class ECollegamento {
    /*
     * Attributi della classe ECollegamento.
     */
    
    /**
     * @var int $_startFireArea L'id dell'area in cui si innesca l'incendio.
     */
    private $_startFireArea;
    
    /**
     * @var int $_firePropagationArea L'id dell'area in cui si propaga l'incendio.
     */
    private $_firePropagationArea;
    
    /**
     * @var double $_probabilitaPropagazione probabilità che un incendio divampato si propaghi lungo il collegamento.
     */
    private $_probabilitaPropagazione;
    
    /**
     * Costruttore di ECollegamento
     * 
     * @access public
     * @param int $startFireArea L'id dell'area in cui si innesca l'incendio. 
     * @param int $firePropagationArea L'id dell'area in cui si propaga l'incendio.
     * @param string $probabilitaPropagazioneCollegamento La probabilità che un incendio divampato si propaghi lungo il collegamento.
     */
    public function __construct($startFireArea,$firePropagationArea, $probabilitaPropagazioneCollegamento=0 ) {
        $this->_startFireArea = $startFireArea;
        $this->_firePropagationArea = $firePropagationArea;
        $this->_probabilitaPropagazione = $probabilitaPropagazioneCollegamento;
    }
    
    /**
     * Metodo che consente di ottenere l'id dell'area da cui parte l'incendio.
     * 
     * @access public
     * @return int L'id dell'area
     */
    public function getStartFireAreaCollegamento() {
        return $this->_startFireArea;
    }
    
    
    /**
     * Metodo che consente di ottenere l'id dell'area in cui si propagal'incendio.
     * 
     * @access public
     * @return int L'id dell'area
     */
    public function getFirePropagationAreaCollegamento() {
        return $this->_firePropagationArea;
    }
    
    /**
     * Metodo che consente di ottenere la probabilità di propagazione dall'area in cui l'incendio parte all'area adiacente ovvero l'area in cui si propaga.
     * 
     * @access public
     * @return double La probabilità di propagazione del collegamento
     */
    public function getProbabilitaPropagazioniCollegamento() {
        return $this->_probabilitaPropagazione;
    }
    
    /**
     * Metodo che consente di impostare l'id dell'area da cui si propaga l'incendio.
     * 
     * @access public
     * @param int $id L'id dell'area da cui si propaga l'incendio
     */
    public function setStartFireAreaCollegamento($id) {
        $this->_startFireArea = $id;
    }
    
    /**
     * Metodo che consente di impostare l'id dell'area in cui si propaga l'incendio.
     * 
     * @access public
     * @param int $id L'id dell'area in cui si propaga l'incendio
     */
    public function setFirePropagationAreaCollegamento($id) {
        $this->_firePropagationArea = $id;
    }
    
    /**
     * Metodo che consente di impostare la probabilità di propagazione del collegamento.
     * 
     * @access public
     * @param double $prob La probabilità di propagazione
     */
    public function setProbabilitaPropagazioniCollegamento($prob) {
        $this->_probabilitaPropagazione = $prob;
    }
    
    /**
     * Metodo che consente l'inserimento di un collegamento nel DB.
     * 
     * @access public
     * @return boolean Se la query è stata eseguita con successo, in caso contrario lancerà l'eccezione.
     * @throws XDBException Se la query non è stata eseguita con successo
     */
    public function inserisciCollegamentoDB() {
        $fCollegamento = USingleton::getInstance('FCollegamento');
        return $fCollegamento->inserisci($this);  
    }

   
    
    
    /**
     * Metodo che consente di eliminare un collegamento nel DB e di inserirlo nella tabella undo
     * 
     * @access public
     * @return boolean Se la query è stata eseguita con successo, in caso contrario lancerà l'eccezione.
     * @throws XDBException Se la query non è stata eseguita con successo
     */
    public function eliminaCollegamentoDB() {
        $fCollegamento = USingleton::getInstance('FCollegamento');
        $id['StartFireArea'] = $this->getStartFireAreaCollegamento();
        $id['FirePropagationArea'] = $this->getFirePropagationAreaCollegamento();
        
        $link1=$this->getStartFireAreaCollegamento();
        $link2= $this->getFirePropagationAreaCollegamento();
        $prob= 0.5;
        $fCollegamento->insertCollegamentoInUndo($link1, $link2, $prob);
        return $fCollegamento->elimina($id);  
    }


      /**
     * Metodo che consente di reinserire i link eliminati all'interno della tabella collegamenti
     * 
     * @access public
     * @return boolean Se la query è stata eseguita con successo, in caso contrario lancerà l'eccezione.
     * @throws XDBException Se la query non è stata eseguita con successo
     */


    public function Undo(){
        $fCollegamento = USingleton::getInstance('FCollegamento');
        $fCollegamento->Undo();
        $log= USingleton::getInstance('ULog');
        $log->log("entity");
        return $fCollegamento->DropUndo();

    }
    
    /**
     * Metodo che consente di cercare un collegamento nel DB.
     * @access public
     * @return array Il collegamento cercato 
     * @throws XDBException Se la query non è stata eseguita con successo
     */
    public function cercaCollegamentoDB() {
        $fCollegamento = USingleton::getInstance('FCollegamento');
        $daCercare['StartFireArea'] = $this->getStartFireAreaCollegamento();
        $daCercare['FirePropagationArea'] = $this->getFirePropagationAreaCollegamento();
        return $fCollegamento->cerca($daCercare); 
    }
    
    /**
     * Metodo che consente di modifica un collegamento nel DB.
     * 
     * @access public
     * @return boolean Se la query è stata eseguita con successo, in caso contrario lancerà l'eccezione.
     * @throws XDBException Se la query non è stata eseguita con successo
     */
    public function modificaCollegamentoDB() {
        $fCollegamento = USingleton::getInstance('FCollegamento');
        $id['StartFireArea'] = $this->getStartFireAreaCollegamento();
        $id['FirePropagationArea'] = $this->getFirePropagationAreaCollegamento();
        $daModificare['ProbabilitaPropagazioni'] = $this->getProbabilitaPropagazioniCollegamento();
        return $fCollegamento->update($id, $daModificare);  
    }
    
    /**
     * Metodo per cercare ne DB un collegamento appena creato.
     * 
     * @access public
     * @return array Il risultato della query ovvero il collegamento cercato.
     * @throws XDBException Se la query non è stata eseguita con successo
     */
//    public function cercaCollegamentoCreatoDB() {
//        $fCollegamento = USingleton::getInstance('FCollegamento');
//        return $fCollegamento->cercaCollegamentoCreato($this->getStartFireAreaCollegamento(), $this->getFirePropagationAreaCollegamento());
//        
//    }
    
    
    
    public function scriviCollegamentoSuFile(){
        $filename = "collegamenti.sql";
        try{
            // mode a : file aperto in modalità Solo scrittura, puntatore puntatore alla fine del file. Se il file non file non esiste, tenta di crearlo
            $handle = fopen($filename, 'a');
            $stringaDaScrivere = '';
            if(filesize($filename) === 0)
            {
                    $stringaDaScrivere = "USE geosafe; ";
            }
            $stringaDaScrivere .= " INSERT INTO collegamento(StartFireArea, FirePropagationArea, ProbabilitaPropagazioni) VALUES (" . $this->getStartFireAreaCollegamento() . ", " . $this->getFirePropagationAreaCollegamento() . ", " . $this->getProbabilitaPropagazioniCollegamento() . " ); ";
      
            fwrite($handle, $stringaDaScrivere);
            fclose($handle);// per chiudere il file
        } 
        catch (Exception $ex)
        {
            echo 'eccezione';
        } 
    }
}
