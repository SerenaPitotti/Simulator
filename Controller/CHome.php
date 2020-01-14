<?php

/**
 * CHome is the controller class that allows you to call the appropriate controllers according to the requests.
 * CHome è la classe controller che permette di richiamare i controller appropriati a seconda delle richieste.
 *
 * @package Controller
 * @author Claudia Di Marco
 */
class CHome {

    /**
     * Switches HTTP requests based on the HTTP method.
     * Metodo che permette di smistare le richieste HTTP in base al metodo HTTP.
     * 
     * @access public
     */
    public function impostaPagina() {
        $vHome = USingleton::getInstance('VHome');
        switch ($vHome->getRequestMethod()) {
            case 'GET': // richieste GET
                $this->smistaControllerGET($vHome->getController());
                break;
            case 'POST':// richieste POST
                $this->smistaControllerPOST($vHome->getController());
                break;
            default:
                break;
        }
    }

    /**
     * Manages the GET type request based on the controller.
     * Metodo che consente di gestire la richiesta di tipo GET in base al controller.
     * Per cui in base al valore assunto dal controller, verrà eseguita un'azione.
     * 
     * @access private
     * @param string $controller The controller value. Il valore del controller. 
     */
    private function smistaControllerGET($controller) {
        $sessione = USingleton::getInstance('USession');
        $loggato = $sessione->leggiVariabileSessione('loggedIn');
        $tipoUser = $sessione->leggiVariabileSessione('tipoUser');
        $permesso = TRUE;

        $log = USingleton::getInstance('ULog');
        //$log->log($controller);

        switch ($controller) {
            case 'area': // GET area
                if ($tipoUser === 'root' || $tipoUser = 'user') 
                {
                    
                    $cArea = USingleton::getInstance('CGestisciArea');
                    $cArea->gestisciArea();
                }  
                else 
                {
                    $permesso=FALSE;
                }
                break;
            
            case 'check': // prova controller da eliminare per ora 
                $cMappa = USingleton::getInstance('CMappa');
                $cMappa->check();
                break;
            
            case 'comuni':
                // https://www.w3schools.com/php/php_file_open.asp
                $myfile = fopen("./comuniCorsica.json", "r") or die("Unable to open file!");
                echo fread($myfile,filesize("./comuniCorsica.json"));
                fclose($myfile);
                break;
            
            case 'link':
                if ($tipoUser === 'root' || $tipoUser = 'user') 
                {
                    $cLink = USingleton::getInstance('CGestisciCollegamento');
                    $cLink->gestisciCollegamento();
                }  
                else 
                {
                    $permesso=FALSE;
                }
                break;

          
                   
            case 'logout': // GEt logout
                if ($loggato) {
                    $cAutenticazione = USingleton::getInstance('CAutenticazione');
                    $cAutenticazione->logOut();
                }
                
                break;

             case 'logoutdiscard': // GEt logoutdiscard
                if ($loggato) {
                    $cAutenticazione = USingleton::getInstance('CAutenticazione');
                    $cAutenticazione->logOutDiscard();
                }
                
                break;
            
            case 'map': // GET map
                $cMappa = USingleton::getInstance('CMappa');
                $cMappa->gestisciMappe();
                
                break;
            

            
            case 'setup':
                $cSetup = USingleton::getInstance('CSetup');
                $cSetup->gestisciSetupGET();
                break;
            
            default:
                $vHome = USingleton::getInstance('VHome');
                $vHome->restituisciHomePage();
                break;
        }
    }
    
    /**
     * Manages the POST type request based on the controller.
     * Metodo che consente di gestire la richiesta POST in base al controller.
     * Per cui in base al valore assunto dal controller, verrà eseguita un'azione.
     * 
     * @access private
     * @param string $controller The controller value. Il valore del controller. 
     */
    private function smistaControllerPOST($controller) {
        $sessione = USingleton::getInstance('USession');
        $loggato = $sessione->leggiVariabileSessione('loggedIn');
        $tipoUser = $sessione->leggiVariabileSessione('tipoUser');
        $permesso = TRUE;

        $log = USingleton::getInstance('ULog');
        //$log->log($controller);

        switch ($controller) {
            case 'area':
                if ($tipoUser === 'root' || $tipoUser = 'user') {
                    $cArea = USingleton::getInstance('CGestisciArea');
                    $cArea->gestisciArea();
                }  else {
                    $permesso=FALSE;
                }
                
                break;
            
            case 'areas':
                if ($tipoUser === 'root' || $tipoUser = 'user') 
                {
                    
                    $cArea = USingleton::getInstance('CGestisciArea');
                    $cArea->gestisciArea();
                }  
                else 
                {
                    $permesso=FALSE;
                }
                break;
            
            case 'autenticazione': //POST autenticazione
                $cAutenticazione = USingleton::getInstance('CAutenticazione');
                $cAutenticazione->autenticaUser();
                break;
            
            case 'link':
                if ($tipoUser === 'root' || $tipoUser = 'user') {
                    $cCollegamento = USingleton::getInstance('CGestisciCollegamento');
                    $cCollegamento->gestisciCollegamento();
                }  else {
                    $permesso=FALSE;
                }
                
                break;
            
            case 'map': 
                $cMappa = USingleton::getInstance('CMappa');
                $cMappa->gestisciMappe();
                break;
            
            case 'setup':
                $cSetup = USingleton::getInstance('CSetup');
                $cSetup->gestisciSetup();
                break;
            
            
            default:
                break;
        }
        if (!$permesso) {
            if (!$loggato) {
                
//                $vAutenticazione = USingleton::getInstance('VAutenticazione');
//                $vAutenticazione->logIn('Necessaria Autenticazione');
            } else {
//                $vHome = USingleton::getInstance('VHome');
//                $vHome->senzaPermessi();
            }
        }
    }

}
