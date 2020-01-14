/* 
 * javascript per i click relativi ai link da inserire, cancellare, modificare
 */

$(document).ready(function(){
    
    $('body').on('click', '#cancelLink', function(e){
        annullaInserimentoLink();
    });
    
    $('body').on('click', '#removeLinkDialog', function(){
        var idLayer = $(this).attr("data-idLayer");
        if($('#addLink').hasClass('attivato'))
        {
            annullaInserimentoLink(); // sta in DrawSection.js
        }
        if($('#addArea').hasClass('attivato'))
        {
            annullaInserimentoArea(); // sta in DrawSection.js
        }
        
        $('#dialogModal').empty();
        var nomeAreaStart = $('.info p')[0].childNodes[1]['data'].trim().substring(2);
        var nomeAreaEnd = $('.info p')[0].childNodes[4]['data'].trim().substring(2);  

        console.log(nomeAreaStart);
        console.log(nomeAreaEnd);

        var prob = $('.info p')[0].childNodes[7]['data'].trim().substring(2);
        var dati = {nomeAreaStart: nomeAreaStart, nomeAreaEnd: nomeAreaEnd, prob: prob };
        addModalDialogContent('SureRemoveLink', dati);
    });
    
    // click per rimuovere  un link
    $('body').on('click', '#removeLink', function(e){
        var nomeAreaStart = $('.info p')[0].childNodes[1]['data'].trim().substring(2);
        var nomeAreaEnd = $('.info p')[0].childNodes[4]['data'].trim().substring(2);
        var prob = $('.info p')[0].childNodes[7]['data'].trim().substring(2);
        var idLayer = $(this).attr("data-idLayer");
        
        var dati ={ NomeAreaStart: nomeAreaStart, NomeAreaEnd:nomeAreaEnd, NomeMappa:'Corsica'};

        
        $.ajax({
            type:'POST',
            url:'link/remove',
            data:dati,
            success:function(datiRisposta){
                
                var risposta = '';
                if(datiRisposta ==='true')
                {
                    risposta = 'Successfully deleted link.';
                }
                else
                {
                    if(typeof(datiRisposta)==='string')
                    {
                        risposta =  datiRisposta;
                    }
                    else
                    {
                        risposta = 'Error.';
                    }
                }
                $('#dialogModal').empty();
                var dati = '';
                if(risposta = 'Successfully deleted link.')
                {
                    dati = {risposta: risposta, success:true, idLayer: idLayer};
                }
                else
                {
                    dati = {risposta: risposta};
                   
                }
                var idDiv = 'dialogModal';
                var idTemplate = 'linkTemplate';
                addTemplateCompilato(idTemplate, dati, idDiv );
                $('#dialogModal').modal({
                        backdrop: 'static',
                        keyboard: false,
                        shown: true
                    });
            },
            error: function()
            {
                $('#loadingModal').modal('hide');
                $('#dialogModal').modal('hide');
                creaFeebackTemplateBackHome();
            }
        });
    });  
    
    $('body').on('click', '.closeDeleteSuccess', function(){
        mappaCorsicaGeoSafe.removeLinkFromMap();
    });
    
    $('body').on('click', '#modifyLink', function(){
        if($('#addLink').hasClass('attivato'))
        {
            annullaInserimentoLink(); // sta in DrawSection.js
        }
        if($('#addArea').hasClass('attivato'))
        {
            annullaInserimentoArea(); // sta in DrawSection.js
        }
        var nomeAreaStart = $('.info p')[0].childNodes[1]['data'].trim().substring(2);
        var nomeAreaEnd = $('.info p')[0].childNodes[4]['data'].trim().substring(2);
        var prob = $('.info p')[0].childNodes[7]['data'].trim().substring(2);
        var dati = [];
        dati['NomeAreaEnd'] = nomeAreaEnd;
        dati['NomeAreaStart'] = nomeAreaStart;
        dati['ProbabilitaPropagazione'] = prob;
        addModalDialogContent('ModifyLink', dati);
    });
    
    $('body').on('click', '.closeModifyLinkSuccess', function(){
        mappaCorsicaGeoSafe.aggiornaLink();
    });
 
   
});

/**
 * Funzione che consente di effettuare una chiamata ajax per avere informazioni su un'area.
 * 
 * @param {string} nomeArea
 * @returns {jqXHR}
 */
function getArea(nomeArea) {
    return $.ajax({
        type: 'GET',
        url: "area/" + nomeArea
    });
}

function changeColorLayer(layer){
    mappaCorsicaGeoSafe.changeColorLayer(layer);
}



function Undo(nomeMappa)
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