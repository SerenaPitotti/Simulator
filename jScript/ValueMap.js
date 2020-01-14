$(document).ready(function(){
    
        // aggiungo le info riguardanti i valori/pesi delle aree
        $('body').on('click touchStart' , '#value.disattivato', function(){
            var mappaInizializzata = mappaCorsicaGeoSafe.mappaInizializzata;
            if(mappaInizializzata === true)
            {
                $('#value').prop('disabled', true);
                var idEventoPassato = mappaCorsicaGeoSafe.idEventoPassato;
                if(idEventoPassato !== '')
                {
                    var areeLayer = mappaCorsicaGeoSafe.areeLayer;
                    // se in precedenza un'area era stata cliccata, resetta lo style dell'area.
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
                    url:'map/value',
                    success:function(datiRisposta){
                        try{
                            var areeValori = JSON.parse(datiRisposta);
                            mappaCorsicaGeoSafe.addValueOnMap(areeValori);
                            
                        }catch(e)
                        {
                            $('#loadingModal').modal('hide');
                            creaFeebackTemplateBackHome();
                        }
                        $('#loadingModal').modal('hide');
                        $("#value").removeClass( "disattivato" ).addClass( "attivato" );
                        $('#value').prop("disabled",false);
                    },
                    error: function(){
                        $('#loadingModal').modal('hide');
                        $('#container').empty();
                        creaFeebackTemplateBackHome();
                    }
                });
            }
            else{
                $('#loadingModal').modal('hide');
                creaFeebackTemplateBackHome();
            }
        });
        
        // rimuovo le info riguardanti i valori/pesi delle aree
        $('body').on('click touchEnd', '#value.attivato', function(){
            var mappaInizializzata = mappaCorsicaGeoSafe.mappaInizializzata;
            if(mappaInizializzata === true)
            {
                $('#value').prop('disabled', true);
                $('#loadingModal').modal({
                    backdrop: 'static',
                    keyboard: false,
                    shown: true
                });
                mappaCorsicaGeoSafe.removeValueFromMap();
                $('#loadingModal').modal('hide');
                $("#value").removeClass( "attivato" ).addClass( "disattivato" );
                $('#value').prop("disabled",false);
                
            }
            else
            {
               $('#loadingModal').modal('hide');
               creaFeebackTemplateBackHome(); 
            }
        });
       
});

/**
 * Funzione che consente in base allo zoom di rimpicciolire o ingrandire i pallini dei pesi della mappa se la mappa dei pesi è attiva, 
 * e di aumentare l'area cliccabile dei link mano a mano che si ingrandiscono le aree.
 * 
 * @function
 * @name zoom_based_layerchange
 */
function zoom_based_layerchange() {

    var map = mappaCorsicaGeoSafe.map;
    var currentZoom = map.getZoom();
    switch (currentZoom) {
        case 8:
            // ridurre numeri all'interno del pallino
            if($( "#value" ).hasClass( "attivato" ))
            {
                $('.iconCircle').css("font-size", "3px");
                $('.iconCircle').css("width", "5px");
                $('.iconCircle').css("height", "5px");
                $('.iconCircle').css("margin-left", "-2.5px");
                $('.iconCircle').css("margin-top", "-2.5px");                
            }
            if($( "#link" ).hasClass( "attivato" ))
            {
                // le seguenti operazioni sono sulla base  di addLink di LinksMap.js
                var layers = mappaCorsicaGeoSafe.linksLayer.getLayers(); // tutti i layer di linksLayer
                $.each(layers, function(indice, linklayer) // per ogni layer 
                {
                    var x = linklayer.getLayers(); // ttutti i layer di questo layer
                    x = x[0].getLayers();// memorizzo in x i layer di collegamento
                    x[0].setStyle({ opacity: 0, fillOpacity: 0 , weight: '5'});// imposto al layer L.polyline di collegamento lo spessore
                });
            }
            break;
            
        case 9:
            //rimpicciolire pallino e numerostyle="margin-left: -7.5px; margin-top: -7.5px; width: 15px; height: 15px; transform: translate3d(619px, 280px, 0px); z-index: 280; font-size: 5px;"
            if($( "#value" ).hasClass( "attivato" ))
            {
                $('.iconCircle').css("font-size", "5px");
                $('.iconCircle').css("width", "8px");
                $('.iconCircle').css("height", "8px");
                $('.iconCircle').css("margin-left", "-5px");
                $('.iconCircle').css("margin-top", "-5px");
            }
            if($( "#link" ).hasClass( "attivato" ))
            {
                // le seguenti operazioni sono sulla base  di addLink di LinksMap.js
                var layers = mappaCorsicaGeoSafe.linksLayer.getLayers(); // tutti i layer di linksLayer
                $.each(layers, function(indice, linklayer) // per ogni layer 
                {
                    var x = linklayer.getLayers(); // ttutti i layer di questo layer
                    x = x[0].getLayers();// memorizzo in x i layer di collegamento
                    x[0].setStyle({ opacity: 0, fillOpacity: 0 , weight: '8'});// imposto al layer L.polyline di collegamento lo spessore
                });
            }
            break;
        
        case 10:
            //rimpicciolinre pallino e numerostyle="margin-left: -7.5px; margin-top: -7.5px; width: 15px; height: 15px; transform: translate3d(619px, 280px, 0px); z-index: 280; font-size: 5px;"
            if($( "#value" ).hasClass( "attivato" ))
            {
                $('.iconCircle').css("font-size", "7px");
                $('.iconCircle').css("width", "10px");
                $('.iconCircle').css("height", "10px");
                $('.iconCircle').css("margin-left", "-7.5px");
                $('.iconCircle').css("margin-top", "-7.5px");
            }
            if($( "#link" ).hasClass( "attivato" ))
            {
                var layers = mappaCorsicaGeoSafe.linksLayer.getLayers();
                $.each(layers, function(indice, linklayer)
                {
                    var x = linklayer.getLayers();
                    x = x[0].getLayers();
                    x[0].setStyle({ opacity: 0, fillOpacity: 0 , weight: '10'});
                });
            }
            break;
            
         case 11:
            if($( "#value" ).hasClass( "attivato" ))
            {
                $('.iconCircle').css("font-size", "9px");
                $('.iconCircle').css("width", "12px");
                $('.iconCircle').css("height", "12px");
                $('.iconCircle').css("margin-left", "-8px");
                $('.iconCircle').css("margin-top", "-7.5px");
            }
            if($( "#link" ).hasClass( "attivato" ))
            {
                var layers = mappaCorsicaGeoSafe.linksLayer.getLayers();
                $.each(layers, function(indice, linklayer)
                {
                    var x = linklayer.getLayers();
                    x = x[0].getLayers();
                    x[0].setStyle({ opacity: 0, fillOpacity: 0 , weight: '20'});
                });
            }
            break;
        
        
        case 12:
            if($( "#link" ).hasClass( "attivato" ))
            {
                // le seguenti operazioni sono sulla base  di addLink di LinksMap.js
                var layers = mappaCorsicaGeoSafe.linksLayer.getLayers(); // tutti i layer di linksLayer
                $.each(layers, function(indice, linklayer) // per ogni layer 
                {
                    var x = linklayer.getLayers(); // ttutti i layer di questo layer
                    x = x[0].getLayers();// memorizzo in x i layer di collegamento
                    x[0].setStyle({ opacity: 0, fillOpacity: 0 , weight: '25'});// imposto al layer L.polyline di collegamento lo spessore
                });
            }
            break;
        case 13:
            break;
        case 14:
            
            break;

        default:
            // do nothing
            break;
    }
}
