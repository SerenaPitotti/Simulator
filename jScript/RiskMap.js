$(document).ready(function(){
    
    //rimuovo le info relative al  rischio sulla mappa quando si clicca nuovamente sul tasto risk
    $('body').on('click touchEnd', '#risk.attivato', function(){
        removeMap('risk');
    });
    
    // aggiungo sulla mappa le info relative al rischio 
    $('body').on('click', '#risk.disattivato', function(){
        var mappaInizializzata =  mappaCorsicaGeoSafe.mappaInizializzata;
        if(mappaInizializzata === true)
        {
            // disabilito il tasto nel frattempo che carico la mappa
            $('#risk').prop('disabled', true);
            // aggiungo la giusta label allo spinner di loading
            $('#loading').after("<div id='textSpinner' class='text-center'><h4>Loading Risk Map</h4></div>");
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
                // elimina la mappa delle simulazioni delle probabilità di propagazione degli incendi
                removeMap('simulateprobabilitaPropagazione');
                
            }
            if($('#simulaterisk').hasClass('attivato'))
            {
                // elimina la mappa delle simulazione di rischio
                removeMap('simulaterisk');
            }
            if($('#probIniz').hasClass('attivato'))
            {
                // elimina la mappa delle probabilità iniziali
                removeMap('probabilitaIniziale');
            }
            $.ajax({
                type:'GET',
                url:'map/risk',
                success:function(datiRisposta){
                    try{
                        var nomeRisk = JSON.parse(datiRisposta);
                        if(nomeRisk !== 'Error.')
                        {
                            mappaCorsicaGeoSafe.addRiskOnMap(nomeRisk);
                            $('#loadingModal').modal('hide');
                            $('#textSpinner').remove();
                            if($( "#link" ).hasClass( "attivato" )) // se sulla mappa c'è la mappa dei link
                            {
                                var linksLayer =  mappaCorsicaGeoSafe.linksLayer;
                                linksLayer.bringToFront();// porto in primo piano la mappa dei link se c'è
                            }
                            $("#risk").removeClass( "disattivato" ).addClass( "attivato" );
                            $('#risk').prop("disabled",false);
                        }
                        else{
                            $('#risk').prop("disabled",false);
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
