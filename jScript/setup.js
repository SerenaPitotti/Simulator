$(document).ready(function(){
    //aggiungo alle aree le prob iniziali 
    $('body').on('click', '#addProbIniz', function(){
        var dati ={ nomeFileProbInit : 'vertices-data.csv'};
        $.ajax({
            type:'POST',
            url: 'setup/probInit',
            data: dati,
            success:function(datiRisposta){
                if(datiRisposta===true)
                {
                    alert('OK');
                }
                else
                {
                    alert('Error');
                }
            },
            error:function(){
                alert('errore lettura probInit');
            }
        });
    }); 
    
    //aggiungo i valori/pesi delle aree 
    $('body').on('click', '#addValue', function(){
        var dati ={ nomeFileValue : 'valueAreas.csv'};
        $.ajax({
            type:'POST',
            url: 'setup/value',
            data: dati,
            success:function(datiRisposta){
                if(datiRisposta==='true')
                {
                    alert('OK');
                }
                else
                {
                    alert('Error');
                }
            },
            error:function(){
                alert('errore lettura value');
            }
        });
    });


    // aggiungo tutti i collegamenti a sud-est tra aree. oss: tabella collegamenti vuota
    $('body').on('click', '#cc', function(){
        $.ajax({
            type:'POST',
            url: 'setup/link',
            success:function(datiRisposta){
               alert('ok');
            },
            error:function(){
                alert('errore check');
            }
        });
    }); 
  
    // aggiunge le aree del nord della corsica ma poi sono da aggiustare i centri
    $('body').on('click', '#addAree', function(){
        var requests = [];
        nomiComuni = Array();
        areeComuni = Array();
        i=0;
        $.ajax({ 
            type: 'GET',
            url: 'comuni',
            async: false,
            success:function(risposta){
                try{
                    risposta = JSON.parse(risposta);
                    $.each(risposta, function(i, field){
                        nomiComuni[i] = risposta[i]['nome'];
                    });
                }
                catch(e){
                    alert('errore');
                } 
            },
            error:function(){
                // nel caso di errore creo il template Feedback
                creaFeebackTemplateBody();
            }  
        });
            
        $.each(nomiComuni, function(i, valore){
           var nome = nomiComuni[i] ;
           setInterval(requests.push(recuperaComune(nome)), 3);
        });
        
        $.when.apply($, requests).done(function(schemas) {
          //  console.log("All requests complete");
            $.each(areeComuni, function(i, area){
                var nome = area['Nome'];
                var typeFeature = area['TypeFeature'];
                var confine = JSON.stringify(area['Confine']); 
                var centro = "POINT(" + area['Longitudine']  + " " + area['Latitudine'] + ")";
                var dati ={NomeArea : nome, TypeFeature : typeFeature, Confine : confine, Centro: centro};
                setInterval(addComuni(dati), 1);
            });
       });

    });
    
    // aggiungo ogni centro dell'area sulla mappa per il setup
    $('body').on('click', '#centriAree', function(){
        $.ajax({ 
            type: 'GET',
            url: 'setup/areas/centers',
            async: false,
            success:function(risposta){
                try{
                    var centri = JSON.parse(risposta);
                    mappaCorsicaGeoSafe.showCentersOnMap(centri);
                    $('#container').append("<input type='button' id='ModificaCentri' value='Modifica Centri' />");                   
                }
                catch(e){
                    alert('errore');
                } 
            },
            error:function(){
                // nel caso di errore creo il template Feedback
                creaFeebackTemplateBody();
            }  
        });
    });
    
    // per la modifica dei centri delle aree sulla mappa per il setup
    $('body').on('click', '#ModificaCentri', function(){
        var centersLayer = mappaCorsicaGeoSafe.centersLayer;
        if($('#ModificaCentri').val()==='Salva Centri')
        {
            $('#ModificaCentri').prop('value', 'Modifica Centri');
                centersLayer.eachLayer(function (marker) {
                marker.dragging.disable();// per disabilitare il dragging
                var coordinate = String(marker.getLatLng()).replace("LatLng", "");
                var coordinate = coordinate.split(',');
                var nome = marker.options.title;
                var latitudine = coordinate[0].replace("(","");
                var longitudine = coordinate[1].replace(")","");
                var longitudine = longitudine.replace(" ","");
                var dati = {Nome: nome, Latitudine: latitudine, Longitudine:longitudine};
                $.ajax({ 
                    type: 'POST',
                    url: 'setup/area/center',
                    data: dati,
                    async: false,
                    success:function(risposta){
                    },
                    error:function(){
                        // nel caso di errore creo il template Feedback
                        creaFeebackTemplateBody();
                    }  
                });
            });
            centersLayer.remove();
            mappaCorsicaGeoSafe.centersLayer = '';
            $('#ModificaCentri').remove();
        }
        else
        {
            $('#ModificaCentri').prop('value', 'Salva Centri');
            centersLayer.eachLayer(function (marker) {
                marker.dragging.enable(); // abilito il dragging
            });
        }
    });


});

   
function addComuni(dati){
    $.ajax({
        type: 'POST',
        url: 'setup/area',
        data: dati,
        success: function(datiRisposta){
            
            // gli inserimenti li effettua ora bisogna capire cosa fargli fare
        },
        error: function(){
            alert('error add comune');
        }
    });
}

function recuperaComune(nome){

    var urlBase = "http://nominatim.openstreetmap.org/search.php?";
    var queryString="q=" + nome + "+Haute-Corse&city=" + nome + "&addressdetails=1&format=json&polygon_geojson=1" ;
//    var queryString="q=" + nome + "+Corse-du-Sud&city=" + nome + "&addressdetails=1&format=json&polygon_geojson=1" ;

//&city='Campana'&country='Corsica'
    return $.ajax({ 
            type: 'GET',
            url: urlBase + queryString,
            datatype:'json',
            
            success:function(datiRisposta){
                var comune = Array();
                $.each(datiRisposta,function(indice, elemento){
                    var elementoDaMemorizzare = true;
                    $.each(elemento,function(indice, valore){
//                        if(elementoDaMemorizzare === true)
//                        {
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
//                        }
                    });
                    if(elementoDaMemorizzare === true)
                    {
                        areeComuni[i] = comune;
                        i++;
                    }
                }); 
            },
            error:function(){
                // nel caso di errore creo il template Feedback
                alert('errore ssss' +  nome);
            }  
        });
}
    





