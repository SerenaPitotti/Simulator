$(document).ready(function(){
    /**
     * rimuovo le info relative alla simulazione di  rischio 
     * sulla mappa quando si clicca nuovamente sul tasto Simulate Risk Map (#simulaterisk)
     */
     
    $('body').on('click touchEnd', '#simulaterisk.attivato', function(){
        removeMap('simulaterisk');
    });
    
    // aggiungo sulla mappa le info relative alla simulazione di rischio 
    $('body').on('click', '#simulaterisk.disattivato', function(){
        var mappaInizializzata =  mappaCorsicaGeoSafe.mappaInizializzata;
        if(mappaInizializzata === true)
        {
            // disabilito il tasto nel frattempo che carico la mappa
            $('#simulaterisk').prop('disabled', true);
            // aggiungo la giusta label allo spinner di loading
            $('#loading').after("<div id='textSpinner' class='text-center'><h4>Loading Simulate Risk Map</h4></div>");
            // loading attendendo la mappa 
            $('#loadingModal').modal({
                backdrop: 'static',
                keyboard: false,
                shown: true
            });
            if($('#fireProp').hasClass('attivato'))
            {
                // elimina la mappa delle probabilità di propagazione degli incendi
                removeMap('probabilitaPropagazione');
                
            }
            if($('#simulatefireProp').hasClass('attivato'))
            {
                // elimina la mappa della simulazione  di propagazione degli incendi
                removeMap('simulateprobabilitaPropagazione');
                
            }
            if($('#risk').hasClass('attivato'))
            {
                // elimina la mappa di rischio
                removeMap('risk');
            }
            if($('#probIniz').hasClass('attivato'))
            {
                // elimina la mappa delle probabilità iniziali
                removeMap('probabilitaIniziale');
            }
            $.ajax({
                type:'GET',
                url:'map/simulaterisk',
                success:function(datiRisposta){
                    try{
                        var nomeRisk = JSON.parse(datiRisposta);
                        if(nomeRisk !== 'Error.')
                        {
                            mappaCorsicaGeoSafe.addSimulateRiskOnMap(nomeRisk);
                            $('#loadingModal').modal('hide');
                            $('#textSpinner').remove();
                            if($( "#link" ).hasClass( "attivato" )) // se sulla mappa c'è la mappa dei link
                            {
                                var linksLayer =  mappaCorsicaGeoSafe.linksLayer;
                                linksLayer.bringToFront();// porto in primo piano la mappa dei link se c'è
                            }
                            $("#simulaterisk").removeClass( "disattivato" ).addClass( "attivato" );
                            $('#simulaterisk').prop("disabled",false);
                        }
                        else{
                            $('#simulaterisk').prop("disabled",false);
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
