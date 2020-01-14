<?php

/**
 *  La classe  FDatabase si occupa dell'interazione con il database.
 * 
 * @package Foundation
 * @author Claudia Di Marco 
 * @author Serena Pitotti
 */
class FDatabase {
    
    /*
     * Attributi della classe FDatabase
     */
    
    /**
     * @access protected
     * @var mixed $_connessione contiene la variabile per la connessione al database. 
     *                          Se la connessione è andata a buon fine 
     *                          conterrà un oggetto mysqli/una risorsa 
     *                          altrimenti varrà false.
     */
    protected $_connessione; 
    
    /**
     * @access protected
     * @var array|booleana $_result contiene il risultato della query
     */
    protected $_result = array();


    /**
     * @access protected
     * @var string $_nomeTabella contiene il nome della tabella con cui si interagisce
     */
    protected $_nomeTabella; 
    
    /**
     * @access protected
     * @var string $_attributiTabella contiene la concatenazione degli attibuti
     *                                della tabella con cui si interagisce
     */
    protected static $_attributiTabella;
//    protected $_attributiTabella;
    
    /**
     * @access protected
     * @var string $_nomeColonnaPKTabella contiene la chiave primaria della tabella
     */
    protected $_nomeColonnaPKTabella;
    
    /**
     * Costruttore della classe FDatabase
     * 
     * @access public
     */
    public function __construct()
    {
        //se non esiste creo un'istanza della classe config (di config.php)
        $config = USingleton::getInstance('Config'); 
        //$dbConfig è un'array in cui memorizzo il necessario per poter
        //effettuare la connessione con il database
        $dbConfig = $config->getDBConfig();
        $this->connessioneDB($dbConfig['host'], $dbConfig['username'], 
                             $dbConfig['password'], $dbConfig['dbname']);   
    }
    
    /**
     * Metodo che controlla se in sessione c'è una tabella, in caso affermativo
     * la restituisce, altriementi restituisce quella di default.
     * @access public
     * @return string Il nome della tabella
     */
    
    public function getTabellaDaChiave($chiave, $default) {
        $session = USingleton::getInstance('USession');
        $tabella = $session->leggiVariabileSessione($chiave);
        if ($tabella === FALSE) {
            return $default;
        }
        else {
            return $tabella;
        }
    }

    /**
     * Metodo che permette di ottenere il nome della tabella.
     * 
     * @access public
     * @return string Il nome della tabella
     */
    public function getNomeTabella() 
    {
        return $this->_nomeTabella;
    }
    
    /**
     * Metodo che permette di ottenere la chiave della tabella.
     * 
     * @access public
     * @return string La chiave della tabella
     */
    public function getNomeColonnaPKTabella() 
    {
        return $this->_nomeColonnaPKTabella;
    }
    
    /**
     * Metodo che permette di ottenere gli attributi della tabella.
     * 
     * @access public
     * @return string Gli attributi della tabella
     */
    public function getAttributiTabella() 
    {
        return $this->_attributiTabella;
    }
    
    
    /**
     * Metodo per consente di connettersi ad un database server.
     * 
     * @final
     * @access public
     * @param string $hostname Il nome dell'host o l'indirizzo IP del server (in locale sarà localhost)
     *                         al quale si desidera connettersi(dove sta girando MySQL)                 
     * @param string $username Il nome utente dell'utente (che si utilizzerà) 
     *                         dell'utilizzatore abilitato ad inviare istruzioni
     *                         al DBMS sulla base dei permessi accordati 
     * @param string $password La password dell'utente che si utilizzerà
     * @param string $database Il nome del database su cui si eseguiranno le 
     *                         operazioni
     * @return boolean Ritorna true se è stata stabilita una connessione, 
     *                 false se non è stata stabilita una connessione
     */
    final public function connessioneDB($hostname, $username, $password, $database)
    {
        // memorizzo la resource della connessione in $_connessione
        $this->_connessione = new mysqli($hostname, $username, $password, $database);
        //mysqli_connect_errno() restituisce 0 quando non vi sono errori
        //durante la connessione o un codice di errore quando sorge un problema
        //ho cambiato la if: if(mysqli_connect_errno()!=0) sostituita con 
        if ($this->_connessione->connect_errno != 0)
        { 
            //mysqli_connect_error() usato per acquisire il messaggio di testo di errore
            $messaggioErrore = $this->_connessione->connect_error;
            die('Errore di connessione ('.mysqli_connect_errno().')'.$messaggioErrore);
           
        }
        else
        {
            //imposto il set di caratteri utf8 per la connessione
            $this->_connessione->query("SET NAMES 'utf8'");
            return true; 
        }
        /*
         * vorrei inserire una variabile booleana $connessioneStabilita che 
         * di default ha valore false, per fare una sola istruzione di return 
         * all'esterno dell'if-else. nel ramo if verrà rimpostato a false,
         * mentre in quello else verrà impostato a true.
         */             
    }

    /**
     * Metodo che permette di cancellare i separatori iniziali e finali (trim)
     * e di effettuare l'escape dei caratteri speciali di una stringa.
     * 
     * @final
     * @access public
     * @param string $stringa La stringa di cui si vuole effettuare l'escape e il trim
     * @return string La stringa di cui si è fatto l'escape e il trim
     */
    final public function trimEscapeStringa($stringa) 
    {
        //trim per cancellare i separatori iniziali e finali
        return $this->_connessione->real_escape_string(trim($stringa));
    }
 
    
    /**
     * Metodo che consente di eseguire una query. 
     * 
     * @final
     * @access public
     * @param string $query La query da eseguire
     * @return array|boolean Il risultato della query.
     * @throws XDBException Se la query non è stata eseguita con successo
     */
    final public function eseguiQuery($query) 
    {
        $log = USingleton::getInstance('ULog');
        $log->log($query);
        
        $this->_result = array();  //  è già stato inizializzata così, ma non lo eliminino perchè ne ho bisogno per essere sicuri che in questa variabile ci sia solo il risultato della query che si effettuerà e non quelle precedenti
        // eseguo la query e salvo il risultato in $queryResult
        $queryResult = $this->_connessione->query($query);
        // se il risultato della query è false
        if(!$queryResult)
            {
//                echo $this->_connessione->error;
                throw new XDBException("Errore mysql durante l'esecuzione della query: " . $this->_connessione->error);
            }
        else
            {
                if($queryResult === TRUE)
                {
                   $this->_result = TRUE;
                }
                else 
                {
                    /* una volta che si è sicuri che in $queryResult è contenuto il
                     * risultato della query, si può usare tale variabile per 
                     * estrarre i dati una alla volta usando il metodo fetch_assoc
                     * dell'oggetto.
                     * la funzione fetch_assoc() ritorna la riga successiva
                     */
                    while ($row =$queryResult->fetch_assoc())
                    {
                        $this->_result[] = $row;                       
                    }
                    // si libera la memoria associato a quel risultato
                    $queryResult->free();
                    
                }                
                
                return $this->_result;
            }
        
    }

    /**
     * Metodo che consente di eseguire più query contemporaneamente.
     * 
     * @final
     * @access public
     * @param string $query Le query da eseguire
     * @return array|boolean Il risultato della query, FALSE nel caso in cui la query non abbia prodotto risultato
     * @throws XDBException 
     */
    final public function eseguiQueryMultiple($query)
    {
        $log = USingleton::getInstance('ULog');
        $log->log($query);
        
        $this->_result = array(); //  è già stato inizializzata così, ma non lo eliminino perchè ne ho bisogno per essere sicuri che in questa variabile ci sia solo il risultato della query che si effettuerà e non quelle precedenti
//        // eseguo la query e salvo il risultato in $multiQueryResult
//        $multiQueryResult = $this->_connessione->multi_query($query); 
        $this->_connessione->multi_query($query);
        //cicla fino a quando c'è un risultato successivo della multi query
        do
            {
                /*
                 * la funzione store_result() ritorna l'oggetto risultato 
                 * oppure FALSE. False può significare che c'è stato un errore
                 * (allora in questo caso la stringa error non sarà vuota) oppure
                 * che la query non prodotto alcun risultato.
                 */
                $queryResult = $this->_connessione->store_result();
                
                if ($queryResult === FALSE) //o c'è stato un errore o la query non ritorna un risultato
                {
                    
                    if(empty($this->_connessione->error))
                    {
                        $this->_result = FALSE;
                    }
                    else
                    {
                        throw new XDBException("Errore mysql durante l'esecuzione della query: " . $this->_connessione->error);
                    }
                }
                else 
                {
                    //la query ha prodotto un risultato che deve essere catturato
                         // dal momento che o nessuna delle query o solo una delle tre 
                        // avrà un solo risultato, non inserisco un ciclo 
                        // all'interno di questo ciclo
                    while ($row = $queryResult->fetch_assoc()) 
                    {
                        //memorizzo la riga del risultato  nell'array _result[]
                        $this->_result[] = $row;
                    }
                    // si libera la memoria associato a quel risultato
                    $queryResult->free();
                }
            }while($this->_connessione->next_result());
            return $this->_result;
            
        }
    
    
    /**
     * Metodo per chiudere la connessione con il database.
     * 
     * @final
     * @access public
     */
    final public function terminaConnessioneDB()
    {
        //clean up, chiusura della connessione 
        $this->_connessione->close();
    }
    
   
    
    /**
     * Metodo che consente di ottenere in un'unica stringa tutti i valori degli attributi necessari
     * per l'inserimento di un elemento nel database.
     * 
     * @access public
     * @param object $oggetto L'oggetto che si vuole aggiungere
     * @return string La stringa contenente tutti i valori degli attributi
     */
    public function getValoriAttributi($oggetto) 
    {
        $nomeClasse = ucwords($this->_nomeTabella); // rendere la prima lettera di una parola in maiuscolo
        // splitta l'array in base alla virgola e lo memorizza in un array $attributiTabella
        $attributiTabella = explode(',', $this->_attributiTabella);
        $valoriAttributi = NULL;
        foreach ($attributiTabella as $valore) {
            $valore = trim($valore);
            $funzione = 'get'.$valore.$nomeClasse ;  
            $valoreAttributo = $oggetto->$funzione();
            switch (gettype($valoreAttributo)) {
                case 'string':
                    if (isset($valoriAttributi))
                    {
                        $valoriAttributi .= ", '" . $this->trimEscapeStringa($valoreAttributo) . "'";
                    }
                    else
                    {
                        $valoriAttributi .= "'" . $this->trimEscapeStringa($valoreAttributo)  . "'";
                    }
                    break;

                case 'NULL':
                    if (isset($valoriAttributi))
                    {
                        $valoriAttributi .= ", NULL ";
                    }
                    else
                    {
                        $valoriAttributi .= "NULL";
                    }
                    break;

                case 'double':
                    if (isset($valoriAttributi))
                    {
                        $valoriAttributi .= ", '" . $valoreAttributo . "'";
                    }
                    else
                    {
                        $valoriAttributi .= "'" . $valoreAttributo  . "'";
                    }
                    break;

                case 'boolean':
                    if($valoreAttributo === TRUE)
                    {
                        if (isset($valoriAttributi))
                        {
                            $valoriAttributi .= ", " . $valoreAttributo . "";
                        }
                        else
                        {
                            $valoriAttributi .=  $valoreAttributo  ;
                        }
                    }
                    else
                    {
                        if (isset($valoriAttributi))
                        {
                            $valoriAttributi .= ", FALSE";
                        }
                        else
                        {
                            $valoriAttributi .= "FALSE";
                        }
                    }

                    break;

                default:
                    if (isset($valoriAttributi))
                    {
                        $valoriAttributi .= ", " . $valoreAttributo ;
                    }
                    else
                    {
                        $valoriAttributi .=  $valoreAttributo;
                    }
                    break;
                }
        }
        return $valoriAttributi;
    }

    /**
     * Metodo che permette di aggiungere un oggetto nel DB.
     * 
     * @access public
     * @param object $oggetto L'oggetto che si vuole aggiungere 
     * @return boolean Se la query è stata eseguita con successo, in caso contrario lancerà l'eccezione.
     * @throws XDBException Se la query non è stata eseguita con successo
     */
    public function inserisci($oggetto) 
    {   
        $valoriAttributi = $this->getValoriAttributi($oggetto);
        $query = "INSERT INTO " . $this->_nomeTabella . " (" . $this->_attributiTabella . ") "
        . "VALUES (" . $valoriAttributi . ")";
        return $this->eseguiQuery($query);
    }

    public function inserisciPolygon($oggetto) 
    {   
        $query ='';
        $query1 ='';
        $valoriAttributi = $this->getValoriAttributi($oggetto);
        //$query2 = "SET @p = '" . $oggetto->getCentroArea() . "'; ";
        if ($oggetto->getTypeFeatureArea()==='Polygon')
        {
            $query1 = "SET @g = 'POLYGON" . $oggetto->geotoPoly($oggetto->getConfineArea()) . "'; ";
            $query = "INSERT INTO  area (NomeMappa, Nome, ProbabilitaIniziale, Peso, Rischio, Confine, TypeFeature, Centro, ProbabilitaPropagazioneIncendi) VALUES ('" . $oggetto->getNomeMappaArea() . "', '" . $oggetto->getNomeArea() . "', " . $oggetto->getProbabilitaInizialeArea() . ", " . $oggetto->getPesoArea() . ", NULL, ST_GeomFromText(@g), 'Polygon', ST_Centroid(ST_GeomFromText(@g)), NULL); ";
            
            //$query = "INSERT INTO  area (NomeMappa, Nome, ProbabilitaIniziale, Peso, Rischio, Confine, TypeFeature, Centro, ProbabilitaPropagazioneIncendi) VALUES ('" . $oggetto->getNomeMappaArea() . "', '" . $oggetto->getNomeArea() . "', " . $oggetto->getProbabilitaInizialeArea() . ", " . $oggetto->getPesoArea() . ", NULL, ST_GeomFromText(@g), 'Polygon', ST_GeomFromText(@p), NULL); ";

        }
        else
        {
            $query1 = "SET @g = 'MULTIPOLYGON" . $oggetto->geotoMultiPoly($oggetto->getConfineArea()) . "'; \n";
            $query= " INSERT INTO area (NomeMappa, Nome, ProbabilitaIniziale, Peso, Rischio, Confine, TypeFeature, Centro, ProbabilitaPropagazioneIncendi) VALUES ('" . $oggetto->getNomeMappaArea() . "', '" . $oggetto->getNomeArea() . "', " . $oggetto->getProbabilitaInizialeArea() . ", " . $oggetto->getPesoArea() . ", NULL, MultiPolygonFromText(@g), 'MultiPolygon', ST_Centroid(MultiPolygonFromText(@g)), NULL); ";
            //$query= " INSERT INTO area (NomeMappa, Nome, ProbabilitaIniziale, Peso, Rischio, Confine, TypeFeature, Centro, ProbabilitaPropagazioneIncendi) VALUES ('" . $oggetto->getNomeMappaArea() . "', '" . $oggetto->getNomeArea() . "', " . $oggetto->getProbabilitaInizialeArea() . ", " . $oggetto->getPesoArea() . ", NULL, MultiPolygonFromText(@g), 'MultiPolygon', ST_GeomFromText(@p), NULL); ";
      
        }
        $this->eseguiQuery($query1);
        return $this->eseguiQuery($query);
    }
    
    /**
     * Elimina una riga della tabella dal DB in cui id è passato come parametro.
     * 
     * @access public
     * @param string|array $id L'id che identifica la riga da eliminare o le righe da eliminare nel caso in cui l'elemento è definito da chiavi esterne. In questo caso scegliere gli indici dell'array come i nomi delle colonne pk della tabella
     * @return boolean TRUE se la query è eseguito con successo, altrimenti lancia eccezione
     * @throws XDBException  Se la query non viene eseguita con successo
     */
    public function elimina($id) {
        $queryLock = "SELECT * FROM " . $this->_nomeTabella ;
//            " WHERE (" . $this->_nomeColonnaPKTabella . "='" . $id . "') FOR UPDATE " ;
        // parte della query relativa alla clausola where
        $queryWhere =  " WHERE (";
        if(is_array($id))
        { 
            // vogliamo eliminare il collegamento
            $chiavi = $this->getNomeColonnaPKTabella(); 
            $chiavi = explode ( ',' , $chiavi ); 
            foreach ($chiavi as $key => $value)
            {
                if(is_string($id[$value]))
                {
                    $queryWhere .= $value . "='" . $id[$value] . "' AND ";
                }
                else
                {
                    $queryWhere .= $value . "=" . $id[$value] . " AND ";
                }
                
            }
             
        }
        else
        {
            if(is_string($id))
                {
                    $queryWhere .= $this->getNomeColonnaPKTabella() . "='" . $id . "' AND ";
                }
                else
                {
                    $queryWhere .= $this->getNomeColonnaPKTabella() . "=" . $id . " AND ";
                }
        }
        $length = strlen($queryWhere)-4;
        $queryWhere  = substr ( $queryWhere , 0 ,  $length ) . ")";
        $queryLock .= $queryWhere . "FOR UPDATE ";
        $query =  "DELETE FROM " . $this->_nomeTabella . $queryWhere;
        
        if (version_compare(phpversion(), '5.5.0', '>=')) 
        {
            try {

                // inzia la transazione
                $this->_connessione->begin_transaction();

                // le query che devono essere eseguite nella transazione. se una fallisce, un'exception è lanciata
                $this->eseguiquery($queryLock);
                $this->eseguiQuery($query);

                // se non ci sono state eccezioni, nessuna query della transazione è fallita per cui possiamo fare il commit
                return $this->_connessione->commit();
            } catch (Exception $e) {
                // un'eccezione è lanciata, per cui dobbiamo fare il rollback della transazione
                $this->_connessione->rollback();
                throw new XDBException('errore');
            }
        }
        else
        {
            // versione che non supporta la transazione
            try {

                $this->_connessione->autocommit(FALSE);

                // le query che devono essere eseguite nella transazione. se una fallisce, un'exception è lanciata
                $this->eseguiquery($queryLock);
                $this->eseguiQuery($query);

                // se non ci sono state eccezioni, nessuna query della transazione è fallita per cui possiamo fare il commit
                
                return $this->_connessione->autocommit(TRUE);
            } catch (Exception $e) {
                // un'eccezione è lanciata, per cui dobbiamo fare il rollback della transazione
                $this->_connessione->rollback();
                throw new XDBException('errore');
            } 
        }
        
         
    }
    
    /**
     * Metodo che consente di modificare un elemento di una tabella nel DB.
     * 
     * @access public
     * @param string $id L'id dell'elemento da modificare 
     * @param Array $daModificare array associativo il cui indice è il campo della tabella da modificare , il valore è il valore modificato
     * @return boolean TRUE se la query viene eseguito con successo altrimenti lancia un'eccezione
     * @throws XDBException Se la query non è eseguita con successo
     */
    public function update($id, $daModificare ) {
        
        // parte della query relativa alla clausola where
        $queryWhereLock =  " WHERE (";
        if(is_array($id))
        {
            // vogliamo modificare il collegamento
            $chiavi = $this->getNomeColonnaPKTabella(); 
            $chiavi = explode ( ',' , $chiavi ); 
            foreach ($chiavi as $key => $value)
            {
                if(is_string($id[$value]))
                {
                    $queryWhereLock .= $value . "='" . $id[$value] . "' AND ";
                }
                else
                {
                    $queryWhereLock .= $value . "=" . $id[$value] . " AND ";
                }
                
            }
            $length = strlen($queryWhereLock)-4;
            $queryWhereLock  = substr ( $queryWhereLock , 0 ,  $length ) . ")"; 
        }
        else
        {
            $queryWhereLock  .= $this->_nomeColonnaPKTabella . "='" . $id . "')" ;
        }
        $queryLock = "SELECT * FROM " . $this->_nomeTabella . $queryWhereLock . " FOR UPDATE ";

        $setQuery  = ' SET ';
        foreach ($daModificare as $attributo => $valore) {
            if(gettype($valore)==='string')
                {
                    $valore = $this->trimEscapeStringa($valore);
                    if($setQuery === ' SET ')
                    {
                        if($attributo==='Centro')
                        {
                            $setQuery .= $attributo . "=ST_PointFromText('" . $valore . "') ";
                        }
                        else
                        {
                            $setQuery .= $attributo . "='" . $valore . "' ";
                        }
                    }
                    else
                    {
                        if($attributo==='Centro')
                        {
                            $setQuery .= ", " . $attributo . "=ST_PointFromText('" . $valore . "') ";
                        }
                        else
                        {
                            $setQuery .=  ", " . $attributo . "='" . $valore . "' ";
                        }
                    }   
                }
                else
                {
                    if($setQuery === ' SET ')
                    {

                        $setQuery .= $attributo . "=" . $valore . " ";
                    }
                    else
                    {
                        $setQuery .=  ", " . $attributo . "=" . $valore . " ";
                    }  
                }
        }
        
        $query = "UPDATE " . $this->_nomeTabella . $setQuery . " " . $queryWhereLock;
//      
        
        if (version_compare(phpversion(), '5.5.0', '>=')) 
        {
            try {

                // inzia la transazione
                $this->_connessione->begin_transaction();

                // le query che devono essere eseguite nella transazione. se una fallisce, un'exception è lanciata
                $this->eseguiquery($queryLock);
                $this->eseguiQuery($query);

                // se non ci sono state eccezioni, nessuna query della transazione è fallita per cui possiamo fare il commit
                return $this->_connessione->commit();
            } catch (Exception $e) {
                // un'eccezione è lanciata, per cui dobbiamo fare il rollback della transazione
                $this->_connessione->rollback();
                throw new XDBException('errore');
            }
        }
        else
        {
            // versione che non supporta la transazione
            try {

                $this->_connessione->autocommit(FALSE);

                // le query che devono essere eseguite nella transazione. se una fallisce, un'exception è lanciata
                $this->eseguiquery($queryLock);
                $this->eseguiQuery($query);

                // se non ci sono state eccezioni, nessuna query della transazione è fallita per cui possiamo fare il commit
                
                return $this->_connessione->autocommit(TRUE);
            } catch (Exception $e) {
                // un'eccezione è lanciata, per cui dobbiamo fare il rollback della transazione
                $this->_connessione->rollback();
                throw new XDBException('errore');
            } 
        }
        
    }
    
    /**
     * Metodo che consente di effettuare una ricerca nel DB in base alla primary key.
     * 
     * @access public
     * @param string|int $id L'id della tabella
     * @return array L'elemento della tabella cercato
     * @throws XDBException Se la query non è stata eseguita con successo
     */
    public function cercaByPK($id) {
        if($this->_nomeTabella==='area')
        {
            $query = 'SELECT Id, NomeMappa, Nome, ProbabilitaIniziale, Peso, Rischio, ST_AsText(area.Confine) AS Confine, TypeFeature, ST_AsText(area.Centro) AS Centro, ProbabilitaPropagazioneIncendi FROM ' . $this->_nomeTabella .
                " WHERE " . $this->_nomeColonnaPKTabella . "='" . $id . "' LOCK IN SHARE MODE";
        }
        else
        {
            $query = 'SELECT * FROM ' . $this->_nomeTabella .
                " WHERE " . $this->_nomeColonnaPKTabella . "='" . $id . "' LOCK IN SHARE MODE";
        }
        return $this->eseguiQuery($query);
    }
    
    /**
     * Metodo che consente di cercare all'interno di una tabella gli elementi che abbiano i valori richiesti corrispondenti agli attributi della tabella.  
     * 
     * @access public
     * @param array $daCercare Array associativo i cui indici sono gli attributi della tabella e i valori rispettivi sono i valori da cercare.
     * @return array Gli elementi della tabella cercati
     * @throws XDBException Se la query non è stata eseguita con successo
     *
     */
    public function cerca($daCercare) {
        $parteWhere = '';
        $query='';
        foreach ($daCercare as $nomeAttributo => $valoreAttributo) {
            if(is_string($valoreAttributo))
            {
                $parteWhere .= $nomeAttributo . "='" . $valoreAttributo . "' AND ";
            }
            else 
                {
                    $parteWhere .= $nomeAttributo . "=" . $valoreAttributo . " AND ";
                }
        }
        $parteWhere = substr($parteWhere, 0, strlen($parteWhere)-4) . " LOCK IN SHARE MODE" ;
        if($this->_nomeTabella==='area')
        {
            $query = 'SELECT Id, NomeMappa, Nome, ProbabilitaIniziale, Peso, Rischio, TypeFeature, ST_AsText(area.Confine) AS Confine,  ST_AsText(area.Centro)AS Centro, ProbabilitaPropagazioneIncendi FROM ' . $this->_nomeTabella ;
        }
        else {
            $query = 'SELECT * FROM ' . $this->_nomeTabella ;
        }
        
        if(isset($parteWhere))
        {
            $query .=  " WHERE " . $parteWhere ;
        }
        return $this->eseguiQuery($query);
    }
    
    
}


