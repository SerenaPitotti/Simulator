// codice per la mappa delle probabilità di propagazione
$(document).ready(function(){
    
       // elimina la mappa dei link (2° caso d'uso)
        $('body').on('click touchEnd', '#link.attivato', function(){
            var mappaInizializzata =  mappaCorsicaGeoSafe.mappaInizializzata;
            if(mappaInizializzata === true)
            {
                mappaCorsicaGeoSafe.removeLinksMap();
                $("#link").removeClass( "attivato" ).addClass( "disattivato" );
                
            }
            else
            {
                creaFeebackTemplateBackHome();
            }
        });
        
        // aggiungo le informazioni per la mappa dei collegamenti con le probabilità di collegamento
        $('body').on('click touchStart', '#link.disattivato', function(){
            var mappaInizializzata =  mappaCorsicaGeoSafe.mappaInizializzata;
            if(mappaInizializzata === true)
            {
                $('#link').prop("disabled",true);
                var idEventoPassato = mappaCorsicaGeoSafe.idEventoPassato;
                if(idEventoPassato !== '')
                {
                    var areeLayer = mappaCorsicaGeoSafe.areeLayer;
                    var layerEventPassato = areeLayer.getLayer(idEventoPassato);
                    mappaCorsicaGeoSafe.resetTargetStyle(layerEventPassato);
                }
                $('#loadingModal').modal({
                    backdrop: 'static',
                    keyboard: false,
                    shown: true
                });
                $.ajax({
                    type:'GET',
                    url: 'map/links',
                    success:function(datiRisposta){
                        try{
                            var links = JSON.parse(datiRisposta);
                            mappaCorsicaGeoSafe.addLinksOnMap(links);
                            $('#loadingModal').modal('hide');
                            $("#link").removeClass( "disattivato" ).addClass( "attivato" );
                            $('#link').prop("disabled",false);
                        }catch(e)
                        {
                            $('#loadingModal').modal('hide');
                            $('#container').empty();
                            creaFeebackTemplateBackHome();
                        }
                    },
                    error:function(){
                        $('#loadingModal').modal('hide');
                        $('#container').empty();
                        creaFeebackTemplateBackHome();
                    }
                });
            }
            else
            {
                $('#loadingModal').modal('hide');
                creaFeebackTemplateBackHome();
            }
        });
    
});
    