<?php

/**
 * The VGestisciArea class views and retrieves area informations.
 * La classe VGestisciArea si occupa di visualizzare i template e le informazioni relative alla gestione delle aree.
 *
 * @package View
 * @author Claudia Di Marco
 */

class VGestisciArea extends View{
    /**
     * Retrieves area data from HTTP request.
     * Metodo che recupera  i dati di un'area dalla richiesta HTTP
     * per poter inserire una nuova area. I dati vengono memorizzati
     * nell'array $datiArea.
     * 
     * @access public
     * @return array Area data. I dati per memorizzare l'area
     */
    public function recuperaDatiArea() {
        $datiArea = array();
        $datiArea['Nome'] = $this->recuperaValore('NomeArea');
        $datiArea['NomeMappa'] = $this->recuperaValore('NomeMappa');
        if($datiArea['NomeMappa']===FALSE || $datiArea['NomeMappa']==='Corse')
        {
            $datiArea['NomeMappa']='Corsica';
        }
        $datiArea['ProbabilitaIniziale'] = $this->recuperaValore('ProbabilitaIniziale');
       
        if($datiArea['ProbabilitaIniziale']===FALSE)
        {
            $datiArea['ProbabilitaIniziale'] = 0;
        }
        else
        {
            $datiArea['ProbabilitaIniziale'] = str_replace(',', '.', $datiArea['ProbabilitaIniziale']); 
        }
        $datiArea['Peso'] = $this->recuperaValore('Peso');
        if($datiArea['Peso']===FALSE)
        {
            $datiArea['Peso']=0;
        }
        $datiArea['TypeFeature'] = $this->recuperaValore('TypeFeature');
        $datiArea['Confine'] = $this->recuperaValore('Confine');
        $datiArea['ProbabilitaPropagazioneIncendi'] = $this->recuperaValore('ProbabilitaPropagazioneIncendi');
        if($datiArea['ProbabilitaPropagazioneIncendi'] === FALSE)
        {
            $datiArea['ProbabilitaPropagazioneIncendi'] = 0;
        }
        else
        {
            $datiArea['ProbabilitaPropagazioneIncendi'] =  str_replace(',', '.',$datiArea['ProbabilitaPropagazioneIncendi']);
        }
        $datiArea['Centro'] = $this->recuperaValore('Centro');
        if($datiArea['Centro']===FALSE)
        {
            $datiArea['Centro']="POINT(0 0)";
        }
        return $datiArea;
    }
}
