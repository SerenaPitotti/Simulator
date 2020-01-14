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
    $('body').on('click touchEnd', '#simulatefireProp.attivato', function(){
        removeMap('simulateprobabilitaPropagazione');
    });
    
    // aggiungo sulla mappa le informazioni relative alla probabilità di propagazione degli incendi
    $('body').on('click', '#simulatefireProp.disattivato', function(){
        var mappaInizializzata =  mappaCorsicaGeoSafe.mappaInizializzata;
        if(mappaInizializzata === true)
        {
            // disabilito il tasto nel frattempo che carico la mappa
            $('#simulatefireProp').prop('disabled', true);
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
            if($('#fireProp').hasClass('attivato'))
            {
                // elimina la mappa della probabilità di propagazione degli incendi
                removeMap('probabilitaPropagazione');
                
            }
            // aggiungo la giusta label allo spinner di loading
            $('#loading').after("<div id='textSpinner' class='text-center'><h4>Loading Simulate Fire Propagation Map</h4></div>");
            // loading attendendo la mappa 
            $('#loadingModal').modal({
                backdrop: 'static',
                keyboard: false,
                shown: true
            });
            $.ajax({
                type:'GET',
                url:'map/simulatefirePropagation',
                success:function(datiRisposta){
                    try{
                        var nomeProbProp = JSON.parse(datiRisposta);
                        if(nomeProbProp!=='Error.')
                        {
                            mappaCorsicaGeoSafe.addSimulateFirePropOnMap(nomeProbProp);

                            $('#loadingModal').modal('hide');
                            $('#textSpinner').remove();
                            if($( "#link" ).hasClass( "attivato" )) // se sulla mappa c'è la mappa dei link
                            {
                                var linksLayer = mappaCorsicaGeoSafe.linksLayer;
                                linksLayer.bringToFront();// porto in primo piano la mappa dei link se c'è
                            }

                            $("#simulatefireProp").removeClass( "disattivato" ).addClass( "attivato" );
                            $('#simulatefireProp').prop("disabled",false);
                        }
                        else{
                            $('#simulatefireProp').prop("disabled",false);
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






