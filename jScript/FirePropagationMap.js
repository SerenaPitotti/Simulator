$(document).ready(function(){
    //aggiorno la mappa dopo una modifica del grafo
    $('body').on('click', '#updateMap', function(){
        if($('#fireProp').hasClass('attivato'))
        {
           aggiornaMappa('probabilitaPropagazione'); 
        }
        if($('#simulatefireProp').hasClass('attivato'))
        {
           aggiornaMappa('simulateprobabilitaPropagazione'); 
        }
        if($('#risk').hasClass('attivato'))
        {
           aggiornaMappa('risk'); 
        }
        if($('#simulaterisk').hasClass('attivato'))
        {
           aggiornaMappa('simulaterisk'); 
        }
        $('#infoHelp').empty();
    });
    
    
    //rimuovo le info delle probabilità propagazione sulla mappa quando si clicca nuovamente sul tasto probIniz
    $('body').on('click touchEnd', '#fireProp.attivato', function(){
        removeMap('probabilitaPropagazione');
    });
    
    // aggiungo sulla mappa le informazioni relative alla probabilità di propagazione degli incendi
    $('body').on('click', '#fireProp.disattivato', function(){
        var mappaInizializzata =  mappaCorsicaGeoSafe.mappaInizializzata;
        if(mappaInizializzata === true)
        {
            // disabilito il tasto nel frattempo che carico la mappa
            $('#fireProp').prop('disabled', true);
            if($('#probIniz').hasClass('attivato'))
            {
                // elimina la mappa delle probabilità iniziali
                removeMap('probabilitaIniziale');
            }
            if($('#risk').hasClass('attivato'))
            {
                // elimina la mappa di rischio
                removeMap('risk');
            }
            if($('#simulaterisk').hasClass('attivato'))
            {
                // elimina la mappa di simulazione rischio
                removeMap('simulaterisk');
            }
            if($('#simulatefireProp').hasClass('attivato'))
            {
                // elimina la mappa delle probabilità di propagazione degli incendi
                removeMap('simulateprobabilitaPropagazione');
                
            }
            // aggiungo la giusta label allo spinner di loading
            $('#loading').after("<div id='textSpinner' class='text-center'><h4>Loading Fire Propagation Map</h4></div>");
            // loading attendendo la mappa 
            $('#loadingModal').modal({
                backdrop: 'static',
                keyboard: false,
                shown: true
            });
            $.ajax({
                type:'GET',
                url:'map/firePropagation',
                success:function(datiRisposta){
                    try{
                        var nomeProbProp = JSON.parse(datiRisposta);
                        if(nomeProbProp!=='Error.')
                        {
                            mappaCorsicaGeoSafe.addFirePropOnMap(nomeProbProp);

                            $('#loadingModal').modal('hide');
                            $('#textSpinner').remove();
                            if($( "#link" ).hasClass( "attivato" )) // se sulla mappa c'è la mappa dei link
                            {
                                var linksLayer = mappaCorsicaGeoSafe.linksLayer;
                                linksLayer.bringToFront();// porto in primo piano la mappa dei link se c'è
                            }

                            $("#fireProp").removeClass( "disattivato" ).addClass( "attivato" );
                            $('#fireProp').prop("disabled",false);
                        }
                        else{
                            $('#fireProp').prop("disabled",false);
                            $('#loadingModal').modal('hide');
                            creaFeebackTemplateBackHome();
                        }
                        
                        
                    }catch(e){
                        $('#loadingModal').modal('hide');
                        creaFeebackTemplateBackHome();
                    }
                       
                    
                },
                error:function(){
                    $('#loadingModal').modal('hide');
                    creaFeebackTemplateBackHome();
                }
            });
            
            
        }
        else
        {
            creaFeebackTemplateBackHome();
        }
    });
    
    
});

/**
 * Consente di rimuovere la mappa il cui nome è passato come parametro.
 * Può essere rischio, probabilitaIniziale, probabilitaPropagazione.
 * 
 * @param {string} nomeMappa Il nome della mappa che da eliminare. Può essere rischio, probabilitaIniziale, probabilitaPropagazione
 */
function removeMap(nomeMappa){
    
    if( mappaCorsicaGeoSafe.mappaInizializzata=== true)
    {
        mappaCorsicaGeoSafe.removeMap(nomeMappa);
    }
    else
    {
        creaFeebackTemplateBackHome();
    }
}


/**
 * Funzione che consente di aggiornare la mappa delle propabilità di propagazione degli 
 * incendi o di rischio.
 * Da utilizzare in seguito ad una modifica del grafo (inserimento|rimozione|modifica area o link)
 * 
 * @param {string} nomeMappa Può essere probabilitaPropagazione o risk
 */
function aggiornaMappa(nomeMappa)
{
    var task = '';
    if(nomeMappa==='probabilitaPropagazione')
    {
        task = 'firePropagation';
        $('#loading').after("<div id='textSpinner' class='text-center'><h4>Loading Fire Propagation Map</h4></div>");
    }
    if(nomeMappa==='risk')
    {
        task = 'risk';
        $('#loading').after("<div id='textSpinner' class='text-center'><h4>Loading Risk Map</h4></div>");
    }
    if(nomeMappa==='simulaterisk')
    {
        task = 'simulaterisk';
        $('#loading').after("<div id='textSpinner' class='text-center'><h4>Loading Simulate Risk Map</h4></div>");
    }
    if(nomeMappa==='simulateprobabilitaPropagazione')
    {
        task = 'simulatefirePropagation';
        $('#loading').after("<div id='textSpinner' class='text-center'><h4>Loading Simulate Fire Propagation Map</h4></div>");
    }
    // loading attendendo la mappa 
    $('#loadingModal').modal({
        backdrop: 'static',
        keyboard: false,
        shown: true
    });
    $.ajax({
        type:'GET',
        url:'map/' + task,
        success:function(datiRisposta){
            try{
                var nomeProbProp = JSON.parse(datiRisposta);
                mappaCorsicaGeoSafe.aggiornaMappa(nomeProbProp, task);
                $('#loadingModal').modal('hide');
                $('#textSpinner').remove();
                if($( "#link" ).hasClass( "attivato" )) // se sulla mappa c'è la mappa dei link
                {
                    var linksLayer = mappaCorsicaGeoSafe.linksLayer;
                    linksLayer.bringToFront();// porto in primo piano la mappa dei link se c'è
                }
            }catch(e){
                $('#loadingModal').modal('hide');
                creaFeebackTemplateBackHome();
            }


        },
        error:function(){
            $('#loadingModal').modal('hide');
            creaFeebackTemplateBackHome();
        }
    });
}

/**
 * Metodo che consente di aggiungere il tasto per l'aggiornamento della mappa di rischio o di fire propagation
 * nel div precendente il div della mappa.
 * 
 */
function addUpdateButton()
{   var nomeMappa = '';
    $('#infoHelp').empty();
    if($('#fireProp').hasClass('attivato'))
    {
       nomeMappa = 'Fire Propagation '; 
    }
    if($('#simulatefireProp').hasClass('attivato'))
    {
       nomeMappa = 'Simulate Fire Propagation '; 
    }
    if($('#risk').hasClass('attivato'))
    {
       nomeMappa = 'Risk '; 
    }
    if($('#simulaterisk').hasClass('attivato'))
    {
       nomeMappa = 'Simulate Risk '; 
    }
    var idDiv = 'infoHelp';
    var idTemplate = 'infoHelpTemplate';
    var dati = {nomeMappa:nomeMappa};
    addTemplateCompilato(idTemplate, dati, idDiv );
}

