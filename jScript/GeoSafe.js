$(document).ready(function () {
    
    mappaCorsicaGeoSafe.init();
});

function clickFeature(e) {
    mappaCorsicaGeoSafe.clickFeature(e);
}

function  resetHighlightInitialMap(e){
    mappaCorsicaGeoSafe.resetHighlightInitialMap(e);
}

function highlightFeatureInitialMap(e){
    mappaCorsicaGeoSafe.highlightFeatureInitialMap(e);
}

function  clickLink(e){
    mappaCorsicaGeoSafe.clickLink(e);
}

/**
 * Funzione per ottenere tutti i comuni della corsica del nord.
 * 
 * @param {type} comuni
 * @returns {Array} i comuni della corsica del nord
 */
function getComuni(comuni){
    try{
        var nomiComuni = [];
        risposta = JSON.parse(comuni);
        var j=0;
        $.each(risposta, function(i, field){
            nomiComuni[j] = field['nome'];
            j++;
        });
        return nomiComuni;
    }
    catch(e){
        return 'Error';
    }            
}


//function recuperaComuneHauteCorse(datiRisposta, nome){
function recuperaComuneHauteCorse(nome){
   
    var deferred = new $.Deferred();

    var urlBase = "http://nominatim.openstreetmap.org/search.php?";
    var queryString="q=" + nome + "+Haute-Corse&city=" + nome + "&addressdetails=1&format=json&polygon_geojson=1" ;

    $.ajax({ 
            type: 'GET',
            url: urlBase + queryString,
            datatype:'json',
            success:function(datiRisposta){
                var comune = Array();
                $.each(datiRisposta,function(indice, elemento){
                    var elementoDaMemorizzare = true;
                    $.each(elemento,function(indice, valore){
                        switch(indice) {
                            case 'class':
                                if(valore !=='boundary')
                                {
                                    elementoDaMemorizzare = false;
                                }
                                break;

                            case 'type':
                                if(valore !=='administrative')
                                {
                                    elementoDaMemorizzare = false;
                                }
                                break;

                            case 'label':
                                if(valore !== 'City')
                                {
                                    elementoDaMemorizzare = false;
                                }
                                break;

                            case 'address':
                                if(valore['city']===undefined)
                                {
                                    elementoDaMemorizzare = false;
                                }
                            break;

                            // lat e long aggiunge per risolvere il problema del centro area.
                            case 'lat':
                                comune['Latitudine'] = elemento['lat'];
                            break;

                            case 'lon':
                                comune['Longitudine'] = elemento['lon'];
                            break;

                            case 'geojson':
                                if(elementoDaMemorizzare === true && (elemento[indice]['type']==='Polygon' || elemento[indice]['type']==='MultiPolygon'))
                                {
                                    comune['Nome'] = nome;
                                    comune['TypeFeature'] = elemento[indice]['type'];
                                    comune['Confine'] = elemento[indice]['coordinates'];

                                }
                                else
                                {
                                    elementoDaMemorizzare = false;
                                }

                                break;

                            default:
                                break;
                        }
                    });
                    if(elementoDaMemorizzare === true)
                    {
                        deferred.resolve(comune);
                    }
                    else
                    {
                        var errore ='Error';
                        deferred.resolve(errore);
                    }
                }); 
            },
            error:function(){
                var errore ='Error';
                deferred.resolve(errore);
            }  
        });
        return deferred.promise();
}
