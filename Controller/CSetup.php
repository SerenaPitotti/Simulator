<?php

/**
 * CSetup is the controller class that allows you to manage the 'setup' controller.
 * CSetup è la classe controller che permette di gestire il controller 'setup'.
 *
 * @package Controller
 * @author Claudia Di Marco
 */

class CSetup {
    
    /**
     * Metodo che consente di gestisce l'azione del controller setup.
     * 
     * @access public
     */
    public function gestisciSetup() {
        $vSetup = USingleton::getInstance('VSetup');
        $task = $vSetup->getTask();
        $task2 = $vSetup->getTask2();
        switch ($task) {
            case 'area': 
                $modificato = FALSE; 
                if($task2===FALSE)
                {
                    $this->addArea('Corsica');// per aggiungere un'area nel setup POST setup/area
                }
                elseif($task2==='center') //POST setup/area/center modificare i centri delle aree
                {
                    $uValidazione = USingleton::getInstance('UValidazione');
                    $datiCentro = $vSetup->recuperaDatidaValidare();
                    if($uValidazione->validaDati($datiCentro)===TRUE)
                    {
                        $datiCentro = $uValidazione->getDatiValidi();
                        try {
                            $eArea = new EArea($datiCentro['Nome']); // lancia XDBEXception e XAreaException
                            // aggiornare il centro nel db
                            $modificato = $eArea->setCentroAreaDB($datiCentro['Latitudine'], $datiCentro['Longitudine']);
                        } catch (Exception $exc) {
                           $modificato = FALSE; 
                        }
                    }
                    else
                    {
                        $modificato = FALSE; 
                        //errore validazione dati
                    }
                }
                $vSetup->inviaDatiJSON($modificato);
                break;
            
            case 'link':
                // voglio inserire tutti i link
                    //// POST collegamento che sarebbe l'url per aggiungere tutti i collegamenti, 
                    //vorrei cambiarlo anche perchè il caso default deve fare altro.

                $this->addLinks();
                break;
            
            case 'probInit':
                $this->addProbInit();
                break;
            
            case 'value':
                $this->addValue();
                break;
            
            default :
                break;
        } 
    }
    
    
    public function gestisciSetupGET() {
        $vSetup = USingleton::getInstance('VSetup');
        $task = $vSetup->getTask();
        $task2 = $vSetup->getTask2();
        switch ($task) {
            case 'areas':
                if($task2==='centers')
                {
                    try {
                        // recupera i centri di ogni area
                        $eMappa = new EMappa('Corsica'); // lancia XMappaException o XDBException
                        $centri = $eMappa->getCentriAree(); // lancia  XDBException
                        $vSetup->inviaDatiJSON($centri);
                    } catch (Exception $ex) {
                        $vSetup->inviaDatiJSON('Error.');
                    }
                }
                break;
            
            default :
                break;
        } 
    }
    
    
    /**
     * Consente di leggere dal file csv contenente il nome del comune e la probabilità iniziale del comune associato.
     * Comune e probabilità sono separati da virgola.
     * 
     * @access private
     */
    private function addProbInit() {
        $vSetup = USingleton::getInstance('VSetup');
        try {
            $datiFile = $vSetup->recuperaDatidaValidare();
            $nomeFile = './' . $datiFile['nomeFileProbInit'];
            // leggendo da un file csv inserisco tutte le probabilità iniziali presenti su quel file
            $aggiunto = FALSE;
            // lettura da file csv le probabilità iniziali
            $handleFile = fopen($nomeFile,"r") or die("Unable to open file!"); ;
            //fgetcsv($handleFile,length,separator,enclosure);
            while(!feof($handleFile))// fino a quando non si arriva alla fine del file
            {
                $riga=fgetcsv($handleFile,100,',');
                $nomeComune = $riga[0] ;// contiene il nome del comune
                $nomeComune = str_replace("'", "’", $nomeComune);
                $nomeComune = str_replace("-", " ", $nomeComune);
                if($nomeComune!=='COMUNE')
                {
                    $prob = $riga[1]; //contiene la probabilità iniziale
                    try{
                        $eArea = new EArea($nomeComune);
                        $eArea->setProbabilitaInizialeArea($prob);
                        $daModificare['ProbabilitaIniziale']= $prob; // lancia eccezione XDBException
                        $aggiunto = $eArea->modificaAreaDB($daModificare);
                    }
                    catch(XAreaException $e)
                    {
                        // se non viene trovata l'area continua con il ciclo
                        //altrimenti l'eccezione deve essere gestita fuori da questo catch.
                        if($e->getMessage()==='Trovata più di una area.')
                        {
                            throw new XAreaException('Trovata più di una area.');
                        }
                    }
                }
            }
            fclose($handleFile);

        } catch (Exception $exc) {
            // file non si apre
            // eccezioni file 
            // eccezione earea
            // eccezione db
            $aggiunto = 'Error.';
        }
        $vSetup->inviaDatiJSON($aggiunto) ;
    }
    
    /**
     * Consente di leggere dal file csv contenente il nome del comune e il peso/valore del comune associato.
     * Comune e peso sono separati da ';'
     * 
     * @access private
     */
    private function addValue(){
        $vSetup = USingleton::getInstance('VSetup');
        try {
            $datiFile = $vSetup->recuperaDatidaValidare();
            $nomeFile = './' . $datiFile['nomeFileValue'];
            // leggendo da un file csv inserisco tutte le probabilità iniziali presenti su quel file
            $aggiunto = FALSE;
            // lettura da file csv le probabilità iniziali
            $handleFile = fopen($nomeFile,"r") or die("Unable to open file!"); 
            //fgetcsv($handleFile,length,separator,enclosure);
            while(!feof($handleFile))// fino a quando non si arriva alla fine del file
            {
                $riga=fgetcsv($handleFile,100,';');
                $nomeComune = $riga[0] ;// contiene il nome del comune
                $nomeComune = str_replace("'", "’", $nomeComune);
                $nomeComune = str_replace("-", " ", $nomeComune);
                if($nomeComune!=='COMUNE')
                {
                    $peso = $riga[1]; //contiene il peso dell'area
                    try{
                        $eArea = new EArea($nomeComune);
                        $eArea->setPesoArea($peso);
                        $daModificare['Peso']= $peso; // lancia eccezione XDBException
                        $aggiunto = $eArea->modificaAreaDB($daModificare);
                    }
                    catch(XAreaException $e)
                    {
                        // se non viene trovata l'area continua con il ciclo
                        //altrimenti l'eccezione deve essere gestita fuori da questo catch.
                        if($e->getMessage()==='Trovata più di una area.')
                        {
                            throw new XAreaException('Trovata più di una area.');
                        }
                    }
                }
            }
            fclose($handleFile);

        } catch (Exception $exc) {
            // file non si apre
            // eccezioni file 
            // eccezione earea
            // eccezione db
            $aggiunto = 'Error.';
        }
        $vSetup->inviaDatiJSON($aggiunto) ;
    }
    
    private function addArea($nomeMappa) {
        $vSetup = USingleton::getInstance('VSetup');
        $datiArea =  $vSetup->recuperaDatiArea();
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
                    if($eArea->getIdArea()===NULL)
                    {
                        $inserito = $eArea->inserisciAreaPolygonDB();
                        if($inserito===TRUE)
                        {
                            $eArea = new EArea($datiArea['Nome']);
                            $risposta = $inserito;
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
        $vSetup->inviaDatiJSON($risposta);
    }
    
    private function addLinks()
    {// POST collegamento
        try {
            // trovo tutte le aree  della mappa corsica
            $eMappa = new EMappa('Corsica');
            $aree = $eMappa->cercaAreeMappa();

            foreach ($aree as $areaStart) {
                $eAreaStart = new EArea($areaStart['Nome'], $areaStart['Id']);
                $eAreaStart->inserisciCollegamentiAreaASudEst($aree);
            }
        } catch (Exception $ex) {
         //XDB exception se una query fallisce
           // XMappaException('Mappa inesistente.');
            //XAreaException Se viene trovata più di un'area con quel nome o quell'id o nessuna area con quell'id.
        }
    }
}
