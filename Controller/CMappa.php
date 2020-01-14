<?php

/**
 * CMappa is the controller class that allows you to manage the 'map' controller.
 * CMappa è la classe controller che permette di gestire il controller 'map'.
 *
 * @package Controller
 * @author Claudia Di Marco
 * @author Serena Pitotti
 */

class CMappa {
    
    /**
     * Metodo che consente di gestire la richiesta di tipo GET del controller 'map in base al task.
     * 
     * @access public
     */
    public function gestisciMappe() {
        $sessione = USingleton::getInstance('USession');
        $loggato = $sessione->leggiVariabileSessione('loggedIn');
        $vMappa = USingleton::getInstance('VMappa');
        $task = $vMappa->getTask();
        $task2 = $vMappa->getTask2();

        $log = USingleton::getInstance('ULog');
        //$log->log($task);
        //$log->log($task2);

        switch ($task) {
            case 'area':
                switch ($task2) {
                    
                    
                    case 'comuni':
                        try {
                            $eMappa = new EMappa('Corsica');
                            $nomiAreeMappa = $eMappa->getNomiAreeMappaDB();
                            $nomiAreeFile = '';
                            $myfile = fopen("./comuniCorsica.json", "r") or die("Unable to open file!");
                            $nomiAreeFile .= fread($myfile,filesize("./comuniCorsica.json"));
                            fclose($myfile);
                            if(is_array($nomiAreeMappa) && count($nomiAreeMappa)===0)
                            {
                                //non ci sono aree inserite nel DB per cui invio solo i nomi dei comuni del file
                                echo $nomiAreeFile; // è sbagliato devo farlo passare atttravero una view
                            }
                            else
                            {
                                $nomiAreeFile = json_decode($nomiAreeFile);
                                foreach ($nomiAreeFile as $key => $value) {
                                    foreach ($nomiAreeMappa as $chiave => $valore) {
                                        if($valore['Nome'] ===$value->nome)
                                        {
                                            unset($nomiAreeFile[$key]);
                                            unset($nomiAreeMappa[$chiave]);
                                        }
                                    }
                                }
                                
                                
                                
                            }
                            $vMappa->inviaDatiJSON($nomiAreeFile);
                            
                            
                        } catch (Exception $exc) {
                            // XMappaException
                            echo $exc->getTraceAsString();
                        }

                        
                        break;

                    default: // booo errore forse!
                        break;
                }
                
                
                break;
            
            case 'areas':
                 // get map/areas  per ottenere tutte le 

                // recupera le aree di una mappa
                try{
                    ini_set('memory_limit', '512M');
                    $datiMappa = $vMappa->recuperaDatiMappa();
                    $eMappa = new EMappa($datiMappa['Nome']); // lancia eccezione da gestire
                    $aree = $eMappa->getNomeConfineAreeMappa(); // lancia eccezione da gestire
                    $vMappa->inviaDatiGeoJSON($aree);
                } 
                catch (Exception $ex)
                {
                    $log->log($ex->getMessage());
                    //XMappaException // XDBException
                    $vMappa->inviaDatiJSON('Error.');
                }
                
                break;
            
            case 'links':
                try{
                    ini_set('memory_limit', '1024M');
                    $datiMappa = $vMappa->recuperaDatiMappa();
                   // $eMappa = new EMappa('Corsica');
                    $eMappa = new EMappa($datiMappa['Nome']);
                    $dati = $eMappa->getCollegamentiMappa();
                    $vMappa->inviaDatiJSON($dati);
                }catch(Exception $ex)
                {
                    $vMappa->inviaDatiJSON('Error.');
                }
                break; 
            
            case 'firePropagation':
                $risposta = '';
                try {
                    $datiMappa = $vMappa->recuperaDatiMappa();
                   // $eMappa = new EMappa('Corsica');
                    $eMappa = new EMappa($datiMappa['Nome']); 
                    $dati = $eMappa->getFirePropagationMappa();
                    if(!is_array($dati))
                    {
                        $risposta= 'Error.';
                    }
                    else{
                        $risposta = $dati;
                    }
                } catch (Exception $exc) {
                    // Mappa inesistente
                    //XDBException
                    $risposta= 'Error. ';
                }
                $vMappa->inviaDatiJSON($risposta);
                break;

            case 'initial': // mappe delle probabilità iniziali GET map/initial
                try {
                    $datiMappa = $vMappa->recuperaDatiMappa();
                   // $eMappa = new EMappa('Corsica');
                    $eMappa = new EMappa($datiMappa['Nome']); 
                    $dati = $eMappa->getMappaProbabilitaIniziali();  // al momento la query non è generica (evito il join) per velocizzare la riposta.
                    $vMappa->inviaDatiJSON($dati);
                } catch (Exception $ex) {
                    // inviare il messaggio di errore
                    $risposta = 'Error.';
                    $vMappa->inviaDatiJSON($risposta);
                }
                break;
            
            case 'risk':
                $risposta = '';
                try {
                    $datiMappa = $vMappa->recuperaDatiMappa();
                   // $eMappa = new EMappa('Corsica');
                    $eMappa = new EMappa($datiMappa['Nome']); 
                    $dati = $eMappa->getRiskMappa();
                    if(!is_array($dati))
                    {
                        $risposta= 'Error.';
                    }
                    else
                    {
                        $risposta = $dati;
                    }
                } catch (Exception $exc) {
                    // Mappa inesistente
                    //XDBException
                    $risposta= 'Error.';
                }
                $vMappa->inviaDatiJSON($risposta);
                break;

                case 'simulaterisk':
                $risposta = '';
                try {
                    $datiMappa = $vMappa->recuperaDatiMappa();
                   // $eMappa = new EMappa('Corsica');
                    $eMappa = new EMappa($datiMappa['Nome']); 
                    $dati = $eMappa->getSimulateRiskMappa();
                    if(!is_array($dati))
                    {
                        $risposta= 'Error.';
                    }
                    else
                    {
                        $risposta = $dati;
                    }
                } catch (Exception $exc) {
                    // Mappa inesistente
                    //XDBException
                    $risposta= 'Error.';
                }
                $vMappa->inviaDatiJSON($risposta);
                break;

             case 'simulatefirePropagation':
                $risposta = '';
                try {
                    $datiMappa = $vMappa->recuperaDatiMappa();
                   // $eMappa = new EMappa('Corsica');
                    $eMappa = new EMappa($datiMappa['Nome']); 
                    $dati = $eMappa->getSimulateFirePropagationMappa();
                    if(!is_array($dati))
                    {
                        $risposta= 'Error.';
                    }
                    else{
                        $risposta = $dati;
                    }
                } catch (Exception $exc) {
                    // Mappa inesistente
                    //XDBException
                    $risposta= 'Error. ';
                }
                $vMappa->inviaDatiJSON($risposta);
                break;   
                
            case 'value': // GET map/value  il peso delle aree
                try{
                    $datiMappa = $vMappa->recuperaDatiMappa();
                   // $eMappa = new EMappa('Corsica');
                    $eMappa = new EMappa($datiMappa['Nome']);
                    $dati = $eMappa->getMappaValoriAree(); 
                    $vMappa->inviaDatiJSON($dati);
                } catch (Exception $ex) {
                    // inviare il messaggio di errore
                    $risposta = 'Error.';
                    $vMappa->inviaDatiJSON($risposta);
                }
            break;
            
            default: // GET map
                $daInviare = array();
                try{
                    $eMappa = new EMappa('Corsica');
                    $daInviare['InfoMappa'] = $eMappa->getInfoMappa();
                    $daInviare['Autenticato'] = $loggato;
                }
                catch (Exception $ex) {
                    // inviare il messaggio di errore
                    $daInviare['Error'] = TRUE; 
                }
                $vMappa->inviaDatiJSON($daInviare);
            break;
        }
        
    }
    
//    // funzione prova per vedere se aghione e aleria sono adiacenti
//    public function check() {
//        $vMappa = USingleton::getInstance('VMappa');
//        
//        
//        $fMappa = USingleton::getInstance('FMappa');
//        $fMappa->check();
//    }
}
