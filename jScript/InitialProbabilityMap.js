// codice per la mappa delle probabilità iniziali
$(document).ready(function(){
        //rimuovo le info delle probabilità iniziali sulla mappa quando si clicca nuovamente sul tasto probIniz
        $('body').on('click touchEnd', '#probIniz.attivato', function(){
            removeMap('probabilitaIniziale');
        });
        
        // aggiungo le info riguardanti le probabilità iniziali
        $('body').on('click touchStart', '#probIniz.disattivato', function(){
           
            var mappaInizializzata = mappaCorsicaGeoSafe.mappaInizializzata;
            if(mappaInizializzata === true)
            {
                $('#probIniz').prop('disabled', true);
                $('#loadingModal').modal({
                    backdrop: 'static',
                    keyboard: false,
                    shown: true
                });
                if($('#fireProp').hasClass('attivato'))
                {
                    // elimina la mappa delle probabilità di propagazione incendi
                    removeMap('probabilitaPropagazione');
                }
                
                if($('#risk').hasClass('attivato'))
                {
                    // elimina la mappa di rischio
                    removeMap('risk');
                }
                if($('#simulaterisk').hasClass('attivato'))
                {
                    // elimina la mappa della simulazione di rischio
                    removeMap('simulaterisk');
                }
                if($('#simulatefireProp').hasClass('attivato'))
                {
                    // elimina la mappa della simulazione della probabilità di propagazione incendi
                    removeMap('simulateprobabilitaPropagazione');
                }
                $.ajax({
                    type:'GET',
                    url:'map/initial',
                    datatype:'json',
                    success:function(datiRisposta){
                        try{
                            var nomeProbIniz = JSON.parse(datiRisposta);
                            mappaCorsicaGeoSafe.addInitProbOnMap(nomeProbIniz);
                            
                            $('#loadingModal').modal('hide');
                            if($( "#link" ).hasClass( "attivato" )) // se sulla mappa c'è la mappa dei link
                            {
                                var linksLayer = mappaCorsicaGeoSafe.linksLayer;
                                linksLayer.bringToFront();// porto in primo piano la mappa dei link se attiva
                            }
                            $("#probIniz").removeClass( "disattivato" ).addClass( "attivato" );
                            $('#probIniz').prop("disabled",false);
                        }
                        catch(e){ //console.log(e);
                            
                            $('#loadingModal').modal('hide');
                            $('#container').html(datiRisposta);
                            if($('body').find("#error").length === 1) 
                            {
                                $('#container').html(datiRisposta);
                                $('#container').css("background-color","white");
                            }
                            else
                            {
                                creaFeebackTemplateBackHome();
                            }  
                        }  
                    }
                });
            }
            else
            {
                creaFeebackTemplateBackHome();
            }    
        });
});
