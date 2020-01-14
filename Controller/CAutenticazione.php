<?php

/**
 * La classe CAutenticazione si occupa di gestire il necessario per l'autenticazione degli user.
 *
 * @package Controller
 * @author Claudia Di Marco 
 * @author Serena Pitotti
 */
class CAutenticazione {
    
    /**
     * Metodo che tenta di autenticare un user, in caso contrario lancia eccezione.
     * 
     * @access public
     * @throws DatiLogInException Se i dati di log in non validi o uno dei due campi risulta vuoto.
     * @throws XUserException Quando lo user da istanziare non esiste.
     * @throws XDBException Se la query per cercare un user non è eseguita con successo.
     * @throws XDatiLogInException Se i dati inseriti non validi o un campo è vuoto.
     */
    public function autenticaUser() {
        $sessione = USingleton::getInstance('USession');
        $uCookie = USingleton::getInstance('UCookie');
        $vAutenticazione = USingleton::getInstance('VAutenticazione');
        $autenticato = FALSE;
        $risposta = array();
        if($this->controllaUserAutenticato() === FALSE)
        {
            $username = $vAutenticazione->recuperaValore('username');
            $password = $vAutenticazione->recuperaValore('password');
            if (!empty($username) && !empty($password)) { // se non è stato ancora autenticato ma ha inserito di dati di log in
                $datiLogIn = array('username' => $username, 'password' => $password);
                $validazione = USingleton::getInstance('UValidazione');
                if ($validazione->validaDatiLogIn($datiLogIn) === TRUE) {
                    try{
                        $eUser = new EUser($username, $password);
                        $uCookie->eliminaCookie('Tentativi');
                        $eUser->attivaSessioneUser($username, $eUser->getTipoUser());
                        $autenticato = TRUE;

                        // codice di cloning tabelle
                        //connessione al DB
                        function db_connect($host,$user,$pass,$db) {
                            $mysqli = new mysqli($host, $user, $pass, $db);
                            $mysqli->set_charset("utf8");
                    
                            if($mysqli->connect_error) 
                            die('Connect Error (' . mysqli_connect_errno() . ') '. mysqli_connect_error());
                            return $mysqli;
                        }
                        $mysqli = db_connect('localhost','root','','geosafe'); 

                        $ts = time(); //numero di secondi dal 1 gennaio 1970
                        //definisco la tabella collegamento
                        $colltab = "collegamento_" . $username . "_" . $ts;
                        //definisco la tabella area
                        $areatab = "area_" . $username . "_" . $ts;
                        //definisco la tabella undo
                        $undotab = "undo_" . $username . "_" . $ts;
                        
                        //metto le tabelle insessione
                        $sessione->impostavariabileSessione("colltab", $colltab);
                        $sessione->impostavariabileSessione("areatab", $areatab);
                        $sessione->impostavariabileSessione("undotab", $undotab);

                        //creazione tabelle 
                        $queryCollegamento="create table $colltab  select * from collegamento;";
                        $queryArea="create table $areatab  select * from area;";
                        $queryUndo="create table  $undotab like collegamento;"; //crea una tabella vuota che ha la stessa struttura di collegamento
                        //eseguo le query di creazione tabelle
                        $mysqli->query($queryCollegamento);
                        $mysqli->query($queryArea);
                        $mysqli->query($queryUndo);


                        
                    }
                    catch (XDBException $e) {
                        $errore = "There was an error during the authentication."; 
                        $risposta['Errore'] = $errore;
                         
                    }
                    catch (XUserException $e) {
                        $errore ='User does not exist or wrong data.'; 
                        $risposta['Errore'] = $errore;
                    }

                } else { // dati non validi
                    $errore = "Invalid data entered.";
                    $risposta['Errore'] = $errore;
    //                throw new XAutenticazioneException('Dati inseriti non validi.');
                }
            } else {//campi/o vuoti/o 
                $errore = "At least a blank log field.";
                $risposta['Errore'] = $errore;
    //            throw new XAutenticazioneException('Almeno un campo del log in vuoto.');
            }
        }
        $risposta['Autenticato'] = $autenticato;
        if(isset($risposta['Errore']))
        {
            $uCookie->incrementaCookie('Tentativi');  //incremento il cookie Tentativi                    
            if ($uCookie->checkValiditaTentativi()) { // massimo 3 tentativi
                // pagina di log 
                $risposta['PaginaLog'] = true;
            } else {
                // pagina recupero credenziali 
                $uCookie->eliminaCookie('Tentativi');
                $risposta['PaginaLog'] = false;
            }
        }
        $vAutenticazione->inviaDatiJSON($risposta);
    }
    
    /**
     * Checks if a user is authenticated.
     * Metodo che permette di controllare se un user è autenticato.
     * 
     * @access public
     * @return boolean TTRUE if authenticated, FALSE otherwise. TRUE se autenticato, FALSE altrimenti.
     */
    public function controllaUserAutenticato() {                  
        $username = NULL;
        $sessione = USingleton::getInstance('USession');
        if ($sessione->checkVariabileSessione("loggedIn") === TRUE) { // se è già autenticato
            //user autenticato            
            $username = $sessione->leggiVariabileSessione('usernameLogIn');
//            throw new XAutenticazioneException('User già autenticato.');
            $autenticato = TRUE;
        }
        else
        {
            $autenticato = FALSE;
        }
        return $autenticato;
    }
    
    /**
     * Allows to user log out.
     * Metodo che consente il log out dell'utente senza salvare i progressi.
     * 
     * @access public
     */
    public function logOutDiscard() {
        $sessione = USingleton::getInstance('USession');
        $log = USingleton::getInstance('ULog');

        function db_connect($host,$user,$pass,$db) {
            $mysqli = new mysqli($host, $user, $pass, $db);
            $mysqli->set_charset("utf8");
    
            if($mysqli->connect_error) 
            die('Connect Error (' . mysqli_connect_errno() . ') '. mysqli_connect_error());
            return $mysqli;
        }
        //connessione al db
        $mysqli = db_connect('localhost','root','','geosafe'); 

        $log->log('cautenticazione');

        //recupero le tabelle messe in sessione al momento del login
        $colltab = $sessione->leggiVariabileSessione('colltab');
        $areatab = $sessione->leggiVariabileSessione('areatab');
        $undotab = $sessione->leggiVariabileSessione('undotab');

        //termino la sessione
        $sessione->terminaSessione();
        $risposta['Autenticato'] = $this->controllaUserAutenticato();
        $vAutenticato = USingleton::getInstance('VAutenticazione');
        $vAutenticato->inviaDatiJSON($risposta);

       
        //drop delle tabelle
        $dropTabColl = "drop table if exists " . $colltab . ";";
        $dropTabArea = "drop table if exists " . $areatab .";";
        $dropTabUndo = "drop table if exists " . $undotab .";";
        //esegui query
        $mysqli->query($dropTabColl);
        $mysqli->query($dropTabArea);
        $mysqli->query($dropTabUndo);

        
    }

    /**
     * Allows to user log out.
     * Metodo che consente il log out dell'utente salvando nel db i progressi.
     * 
     * @access public
     */
    public function logOut() {
        $sessione = USingleton::getInstance('USession');
        $sessione->terminaSessione();
        $risposta['Autenticato'] = $this->controllaUserAutenticato();
        $vAutenticato = USingleton::getInstance('VAutenticazione');
        $vAutenticato->inviaDatiJSON($risposta);
    }
 
}
