<?php

/**
 * CGestisciCollegamento è la classe controller che permette di gestire il controller 'collegamento'.
 *
 * @package Controller
 * @author Claudia Di Marco
 */

class CGestisciCollegamento {
    
    
    public function gestisciCollegamento() {
        $sessione = USingleton::getInstance('USession');
        $username = $sessione->leggiVariabileSessione('usernameLogIn');
        $nomeMappa = $sessione->leggiVariabileSessione('nomeMappaUser');
        $vCollegamento = USingleton::getInstance('VGestisciCollegamento');
        
        $task = $vCollegamento->getTask();
       
        switch ($task) {
            case 'add': // POST link/add
                $this->addLink($nomeMappa);
                break;

            case 'modify':
                $this->modifyLink($nomeMappa);
                break;
            
            case 'remove':
                $this->removeLink($nomeMappa);
                break;
            

            default:
                $vCollegamento = USingleton::getInstance('VGestisciCollegamento');
                $datiLink['NomeAreaStart'] = $vCollegamento->recuperaValore('nomeAreaStart');
                $datiLink['NomeAreaEnd'] = $vCollegamento->recuperaValore('nomeAreaEnd');
                $datiLink['NomeMappa'] = $vCollegamento->recuperaValore('nomeMappa');
                if($datiLink['NomeAreaStart']!==FALSE && $datiLink['NomeAreaEnd']!==FALSE )
                {
                    // voglio vedere un link in particolare
                    $uValidazione = USingleton::getInstance('UValidazione');
                    $risposta;
                    if($uValidazione->validaDati($datiLink)===TRUE)
                    {   //dati validi
                        if($datiLink['NomeMappa'] === $nomeMappa)
                        {
                            try 
                            {
                                $eAreaStart = new EArea($datiLink['NomeAreaStart'], NULL, $nomeMappa);
                                $eAreaEnd = new EArea($datiLink['NomeAreaEnd'], NULL, $nomeMappa);
                                $eCollegamento = new ECollegamento($eAreaStart->getIdArea(),$eAreaEnd->getIdArea());
                                $collegamento = $eCollegamento->cercaCollegamentoDB();
                                if(is_array($collegamento) && count($collegamento)===1)
                                {
                                    $risposta['ProbabilitaPropagazioni'] = $collegamento[0]['ProbabilitaPropagazioni'];
                                    $risposta['CentroAreaStart'] = $eAreaStart->getCentroArea();
                                    $risposta['CentroAreaEnd'] = $eAreaEnd->getCentroArea(); 
                                    $risposta['NomeAreaStart'] = $eAreaStart->getNomeArea();
                                    $risposta['NomeAreaEnd'] = $eAreaEnd->getNomeArea();
                                }
                                else{
                                    $risposta = 'Error.';
                                }
                                
                            } catch(Exception $ex)
                            {
                                $risposta = 'Error.';
                            }
                        }
                        else
                        {
                            // user non gestisce questa mappa quindi bisogna generare un errore
                            $risposta = 'Error: Not authorized user. ';
                        }
                    }
                    else 
                    {
                        // dati non validi
                        $risposta = 'Error: invalid data. ';
                    }
                    $vCollegamento->inviaDatiJSON($risposta);  
                }
            
                break;
                
        }
    }
    
    
    

    /**
     * Metodo che consente di aggiungere un link alla mappa.
     * 
     * @access private
     * @param string $nomeMappa Il nome della mappa del link.
     */
    private function addLink($nomeMappa) {
        $vCollegamento = USingleton::getInstance('VGestisciCollegamento');
        $datiLink = $vCollegamento->recuperaDatidaValidare();
        $uValidazione = USingleton::getInstance('UValidazione');
        $errore;
        if($uValidazione->validaDati($datiLink)===TRUE)
        {   //dati validi
            if($datiLink['NomeMappa'] === $nomeMappa)
            {
                try {
                    $inserito = FALSE;
                    $eMappa = new EMappa($nomeMappa);
                    $eAreaStart = new EArea($datiLink['NomeAreaStart'], NULL, $nomeMappa);
                    $eAreaEnd = new EArea($datiLink['NomeAreaEnd'], NULL, $nomeMappa);

                    // devo controllare che un collegamento tra le due aree non sia già esistente
                    if($eMappa->esisteCollegamentoTraAree($eAreaStart->getIdArea(), $eAreaEnd->getIdArea())===FALSE)
                    {
                        // non c'è sul db un collegamento tra le due aree

                        // non esiste il collegamento per cui controllo se le aree sono adiacenti
                        if($eAreaStart->esisteCollegamentoCon($eAreaEnd) === TRUE)
                        {
                            // aree adiacenti
                            // se sono adiacenti aggiungo il collegamento nel db
                            $dv = $uValidazione->getDatiValidi();
                            $eCollegamento = new ECollegamento($eAreaStart->getIdArea(), $eAreaEnd->getIdArea(), $dv['ProbabilitaPropagazione']);
                            $inserito = $eCollegamento->inserisciCollegamentoDB();

                        }
                        else
                        {
                            // aree non adiacenti non aggiungo il collegamento nel db
                            $errore = 'Error: Not adjacent areas.';
                        }
                    }
                    else
                    {
                        //se esiste collegamento e  modifico la probabilità
                        $errore = 'Error: Existing link. If you want modify a link, click on Modify Link.';

                    }
                } catch (Exception $exc) {
                    // eccezione della mappa
                    // eccezione dell'area
                    // eccezone del db
                    $errore = 'Error.';
                }  
            }
            else
            {
                // user non gestisce questa mappa quindi bisogna generare un errore
                $errore = 'Error: Not authorized user. ';
            }
        }
        else
        {
            // dati non validi
            $errore = 'Error: invalid data. ';
        }
        if(isset($errore))
        {
            $vCollegamento->inviaDatiJSON($errore);
        }
        else
        {
            $vCollegamento->inviaDatiJSON($inserito);
        }
    }
    
    /**
     * Metodo che consente di eliminare un link dalla mappa.
     * 
     * @access private
     * @param string $nomeMappa Il nome della mappa del link.
     */
    private function removeLink($nomeMappa) {
        $vCollegamento = USingleton::getInstance('VGestisciCollegamento');
        $datiLink = $vCollegamento->recuperaDatidaValidare();
        $uValidazione = USingleton::getInstance('UValidazione');
        $log= USingleton::getInstance('ULog');
        //$log->log("removeLink");
       
        $errore;
        if($uValidazione->validaDati($datiLink)===TRUE)
        {
            //$log->log("dati validi");
            // dati validi
            if($datiLink['NomeMappa'] === $nomeMappa)
            {
                //$log->log("nome mappa");
                // l'user ha il permesso e gestisce questa mappa.
                try {
                    $eMappa = new EMappa($nomeMappa);
                    $eAreaStart = new EArea($datiLink['NomeAreaStart'], NULL, $nomeMappa);
                    $eAreaEnd = new EArea($datiLink['NomeAreaEnd'], NULL, $nomeMappa);
                    
                    

                    //$log->log("elimina: da " . $eAreaStart->getIdArea() . " a " . $eAreaEnd->getIdArea());
                    // se sulla mappa esiste il collegamento da eliminare
                    if($eMappa->esisteCollegamentoTraAree($eAreaStart->getIdArea(), $eAreaEnd->getIdArea())===TRUE)
                    {
                        $eCollegamento = new ECollegamento($eAreaStart->getIdArea(), $eAreaEnd->getIdArea());
                        //$log->log("elimino");
                        
                        $eliminato = $eCollegamento->eliminaCollegamentoDB();
                       
                        
                        //$log->log($eliminato);
                      



                      
                    }
                    else
                    {
                        $errore = 'Error: Inexistent link.';
                    }
                    
                } catch (Exception $exc) {
//                    echo $exc->getMessage();
                    // eccezioni dovute alla mappa
                    // eccezioni dovute alle aree
                    // XDBException dovuto all'eliminazione
                    $log->log($exc->getMessage());
                    $errore = 'Error. ';
                }
            }
            else
            {
                // user ha il permesso ma non gestisce questa mappa quindi non può effettuare modifiche
                $errore = 'Error: Not authorized user. ';
            }

        }
        else
        {
            // dati non validi
            $errore = 'Error: invalid data. ';
        }
        if(isset($errore))
        {
            $vCollegamento->inviaDatiJSON($errore);
        }
        else
        {
            $vCollegamento->inviaDatiJSON($eliminato);
        }
    }
    
    /**
     * Metodo che consente di modificare un link dalla mappa.
     * 
     * @access private
     * @param string $nomeMappa Il nome della mappa del link.
     */
    private function modifyLink($nomeMappa) {
        $vCollegamento = USingleton::getInstance('VGestisciCollegamento');
        $datiLink = $vCollegamento->recuperaDatidaValidare();
        $uValidazione = USingleton::getInstance('UValidazione');
        $errore;
        if($uValidazione->validaDati($datiLink)===TRUE)
        {
            // dati validi
            if($datiLink['NomeMappa'] === $nomeMappa)
            {
                // l'user ha il permesso e gestisce questa mappa.
                // l'user ha il permesso e gestisce questa mappa.
                try {
                    $eMappa = new EMappa($nomeMappa);
                    $eAreaStart = new EArea($datiLink['NomeAreaStart'], NULL, $nomeMappa);
                    $eAreaEnd = new EArea($datiLink['NomeAreaEnd'], NULL, $nomeMappa);
                    // se sulla mappa esiste il collegamento da eliminare
                    if($eMappa->esisteCollegamentoTraAree($eAreaStart->getIdArea(), $eAreaEnd->getIdArea())===TRUE)
                    {
                        $dv = $uValidazione->getDatiValidi();
                        $eCollegamento = new ECollegamento($eAreaStart->getIdArea(), $eAreaEnd->getIdArea(), $dv['ProbabilitaPropagazione']);
                        $modificato = $eCollegamento->modificaCollegamentoDB();
                    }
                    else
                    {
                        $errore = 'Error: Inexistent link.';
                    }
                    
                } catch (Exception $exc) {
                    // eccezioni dovute alla mappa
                    // eccezioni dovute alle aree
                    // XDBException dovuto all'eliminazione
                    $errore = 'Error. ';
                }
            }
            else
            {
                // user ha il permesso ma non gestisce questa mappa quindi non può effettuare modifiche
                $errore = 'Error: Not authorized user. ';
            }

        }
        else
        {
            // dati non validi
            $errore = 'Error: invalid data. ';
        }
        if(isset($errore))
        {
            $vCollegamento->inviaDatiJSON($errore);
        }
        else
        {
            $vCollegamento->inviaDatiJSON($modificato);
        }
            
    }




}
