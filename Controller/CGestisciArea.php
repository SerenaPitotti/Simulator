<?php

/**
 * CGestisciArea è la classe controller che permette di gestire il controller 'area'.
 *
 * @package Controller
 * @author Claudia Di Marco
 */

class CGestisciArea {
    
    /**
     * Metodo che consente di gestire il controller 'area' in base al task.
     * 
     * @access public 
     */
    public function gestisciArea() {
        $sessione = USingleton::getInstance('USession');
        $nomeMappa = $sessione->leggiVariabileSessione('nomeMappaUser');
        $vArea = USingleton::getInstance('VGestisciArea');
        $uValidazione = USingleton::getInstance('UValidazione');
        $task = $vArea->getTask();
        
        switch ($task) {
            case 'add':
                $this->addArea($nomeMappa);
                break;
            
            case 'adjacent':
                $adiacenti = FALSE;
                $datiDaValidare = $vArea->recuperaDatidaValidare();
                if($uValidazione->validaDati($datiDaValidare)=== TRUE)
                {
                    try {
                        $eAreaStart = new EArea($datiDaValidare['NomeAreaStart']);
                        $eAreaEnd = new EArea($datiDaValidare['NomeAreaEnd']);
                        if($eAreaStart->esisteCollegamentoCon($eAreaEnd)===TRUE) // potrebbe lanciare XDBException
                        {
                            $adiacenti = TRUE; 
                        }


                    } catch (Exception $exc) {
                        $adiacenti = 'Errore';
                        // XDB
                        // XErea
                        echo $exc->getTraceAsString();
                    }                    
                    

                }
                else
                {
                    // dati non validati
                    $adiacenti = 'Errore';
                }
                $vArea->inviaDatiJSON($adiacenti);
                
                break;
                
            
            case 'edit':
                $this->modifyArea($nomeMappa);
                break;
            
            case 'remove':
                $this->removeArea($nomeMappa);
                break;

            default: // get area/nomeArea per ottenere le info modificabili di un'area
                $risposta='';
                $nomeArea = $vArea->recuperaValore('nomeArea') ;
                $nomeMappaArea = $vArea->recuperaValore('nomeMappa') ;
                if($nomeArea !== FALSE && $nomeMappa === $nomeMappaArea)
                {
                    $datiArea ['NomeMappa']= $nomeMappaArea;
                    $datiArea ['Nome']= $nomeArea;
                    if($uValidazione->validaDatiArea($datiArea)===TRUE)
                    {
                        try {
                            $eArea = new EArea($nomeArea);
                            $datiArea = $eArea->getInfoModificabili();
                            if (is_array($datiArea) && count($datiArea)===1)
                            {
                                $risposta = $datiArea;
                            }
                            else 
                            {
                                $risposta = 'Error';
                            }
                            
                        } catch (Exception $exc) {
                            // eccezione XDBException
                            $risposta = 'Error';
                        }
                                          
                    }
                    else
                    {
                        // nome Area non valido
                        $risposta = 'Error: invalid data.';
                    }
                }
                else
                {
                    
                    if($nomeMappa === $nomeMappaArea)
                    {
                        $risposta = 'Error: Not authorized user.';
                    }
                    else
                    {
                        // errore non c'è nomeArea 
                        $risposta = 'Error: no area name found.';
                    }
                    
                }
                $vArea->inviaDatiJSON($risposta);
                break;
        }
    }
    
    private function addArea($nomeMappa) {
        $vArea = USingleton::getInstance('VGestisciArea');
        $datiArea = $vArea->recuperaDatiArea();
        $uValidazione = USingleton::getInstance('UValidazione');
        $risposta = '';
        if($uValidazione->validaDatiArea($datiArea)===TRUE)
        {
            // dati validi
            if($datiArea['NomeMappa'] === $nomeMappa)
            {
                try 
                {
                    $datiArea = $uValidazione->getDatiValidi();
                    $eArea = new EArea($datiArea['Nome'], NULL, 'Corsica', $datiArea['ProbabilitaIniziale'], $datiArea['Peso'], $datiArea['TypeFeature'], $datiArea['Confine'], $datiArea['ProbabilitaPropagazioneIncendi'], $datiArea['Centro']);
                    if($eArea->getIdArea() === NULL)
                    {
                        $inserito = $eArea->inserisciAreaPolygonDB();
                        if($inserito===TRUE)
                        {
                            $eArea = new EArea($datiArea['Nome']);
                            if($eArea->centroContenutoInArea($datiArea['Centro'])==TRUE)
                            {
                                if (version_compare(phpversion(), '5.6.0', '>=')) 
                                {        
                                    // aggiunghi collegamenti a sud-est per l'area aggiunta
                                    $eMappa = new EMappa($nomeMappa);
                                    $aree = $eMappa->cercaAreeMappa();

                                    $eArea->inserisciCollegamentiAreaASudEst($aree);
                                }
                                $risposta = $inserito;
                            }
                            else
                            {
                                // elimina area
                                $eArea->eliminaAreaDB();
                                $risposta = 'Error: center out of area. ';
                                
                            }
                        }
                        else
                        {
                            //elimina area
                            $eArea->eliminaAreaDB();
                            $risposta = 'Error. ';
                        }
                    }
                    else {
                        $risposta = 'Error: Existing area. ';
                    }
                } 
                catch (Exception $ex) 
                {
                    //XDB exception se una query fallisce
                    // XMappaException('Mappa inesistente.');
                    //XAreaException Se viene trovata più di un'area con quel nome o quell'id o nessuna area con quell'id.
                        $risposta = 'Error. ';
                }
            }
            else
            {
                $risposta = 'Error: Not authorized user. ';
            } 
        }
        else 
        {
            $risposta = 'Error: invalid data. ';
        }
        $vArea->inviaDatiJSON($risposta);
    }
    
    /**
     * Metodo per modificare un'area.
     * 
     * @access private
     * @param string $nomeMappa Il nome della mappa
     */
    private function modifyArea($nomeMappa) {
        $vArea = USingleton::getInstance('VGestisciArea');
        $datiArea = $vArea->recuperaDatidaValidare();
        $uValidazione = USingleton::getInstance('UValidazione');
        $risposta = '';
        if($uValidazione->validaDatiArea($datiArea)===TRUE)
        {
            // dati validi
            if($datiArea['NomeMappa'] === $nomeMappa)
            {
                try {
                    $datiArea = $uValidazione->getDatiValidi();
                    $eArea = new EArea($datiArea['Nome']);
                    $daModificare  = array();
                    $daModificare['Peso'] = $datiArea['Peso'];
                    $daModificare['ProbabilitaIniziale'] = $datiArea['ProbabilitaIniziale'];
                    // controllo se il centro è contenuto nell'area altrimenti non lo modifico
                    $centro = "POINT(" . $datiArea['Longitudine'] . " " . $datiArea['Latitudine'] . ")";
                    if($eArea->centroContenutoInArea($centro))
                    {
                        $daModificare['Centro'] = $centro;
                        if($eArea->modificaAreaDB($daModificare))
                        {
                            $risposta = TRUE ;
                        }
                        else
                        {
                            $risposta = 'Error. ';
                        } 
                    }
                    else
                    {
                        $risposta = 'Error: center out of area. ';
                    }
                    
                } 
                catch (Exception $exc) {
                    // XDBException 
                    $risposta = 'Error. ';
                }
            }
            else
            {
                $risposta = 'Error: Not authorized user. ';
            } 
        }
        else 
        {
            $risposta = 'Error: invalid data. ';
        }
        $vArea->inviaDatiJSON($risposta);
    }
    
    /**
     * Metodo per eliminare un'area.
     * 
     * @access private
     * @param string $nomeMappa Il nome della mappa
     */
    private function removeArea($nomeMappa) {
        $vArea = USingleton::getInstance('VGestisciArea');
        $datiArea = $vArea->recuperaDatidaValidare();
        $uValidazione = USingleton::getInstance('UValidazione');
        $risposta = '';
        if($uValidazione->validaDatiArea($datiArea)===TRUE)
        {
            // dati validi
            if($datiArea['NomeMappa'] === $nomeMappa)
            {
                try {
                    $eArea = new EArea($datiArea['Nome']);
                    if($eArea->eliminaAreaDB())
                    {
                        $risposta = TRUE ;
                    }
                    else
                    {
                        $risposta = 'Error. ';
                    } 
                    
                    
                } 
                catch (Exception $exc) {
                    // XDBException 
                    $risposta = 'Error. ';
                }
            }
            else
            {
                $risposta = 'Error: Not authorized user. ';
            } 
        }
        else 
        {
            $risposta = 'Error: invalid data. ';
        }
        $vArea->inviaDatiJSON($risposta);
    }
}
