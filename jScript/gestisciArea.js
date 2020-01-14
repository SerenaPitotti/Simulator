/* 
 * javascript per i click relativi alle aree da inserire, cancellare, modificare
 */

$(document).ready(function(){
    
    $('body').on('click', '#addArea', function(){
        $('#addArea').addClass('attivato');
        if($('#addLink').hasClass('attivato'))
        {
            annullaInserimentoLink(); // sta in DrawSection.js
        }
        if(navigator.onLine===false)
        {
            var dati = {title: 'Add an area', text: 'Need Internet connection. '};
            addModalDialogContent('ErroreArea', dati); 
        }
        else
        {
           // richiedo i nomi di tutte le aree
            $.when( $.ajax( "map/area/comuni" ) ).done(function( datiRisposta, textStatus, jqXHR ) {
                var nomiComuni = getComuni(datiRisposta); 

                if(typeof(nomiComuni) === 'object' && nomiComuni.length>0)
                {
                    addModalDialogContent('addArea', nomiComuni);
                }
                else if(nomiComuni==='Error')
                {
                    var dati = {title: 'Add an area', text: 'There was an error. '};
                    addModalDialogContent('ErroreArea', dati); 

                }
                else
                {
                    //non si possono aggiungere aree. Sono state aggiunte tutte  
                    var dati = {title: 'Add an area', text: 'Every area is added yet. '};
                    addModalDialogContent('ErroreArea', dati); 
                } 
            }).fail(function(){
                var dati = {title: 'Add an area', text: 'There was an error. '};
                addModalDialogContent('ErroreArea', dati); 
            });
        }
    });
    
    $('body').on('click', '.closeSuccessArea',function(){
        if($('#fireProp').hasClass('attivato') || $('#simulatefireProp').hasClass('attivato') || $('#risk').hasClass('attivato')|| $('#simulaterisk').hasClass('attivato'))
        {
           addUpdateButton();
        }
    });
    
    $('body').on('click', '#annullaInserimentoArea', function(){
        annullaInserimentoArea();
    });
    
    $('body').on('click','.offChangeNameArea',function(){
        //elimino il event handler relativo al cambio del nome dell'area nella form di inserimento area
        $('body').off('change','#nomeArea');
    });
    
    $('body').on('click','.removeDialogModal',function(){
        $('#dialogModal').empty();
    });
    

    $('body').on('click', '#removeAreaDialog', function(){
        var nomeArea = $(this).attr("data-nomeArea");
        if($('#addLink').hasClass('attivato'))
        {
            annullaInserimentoLink(); // sta in DrawSection.js
        }
        if($('#addArea').hasClass('attivato'))
        {
            annullaInserimentoArea(); // sta in DrawSection.js
        }
        $.when( getArea(nomeArea) ).then(function( datiRisposta, textStatus, jqXHR ) {
            try{
                // visualizzare la form con i dati recuperati
                var dati = JSON.parse(datiRisposta);
                dati = dati[0];
                $('#dialogModal').empty();                
                var nomeMappa = dati['NomeMappa'];
                if(nomeMappa === 'Corsica')
                {
                    nomeMappa = 'Corse';
                }
                var probIniz = dati['ProbabilitaIniziale'];
                var peso = dati['Peso'];
                var centro = mappaCorsicaGeoSafe.trovaPunto(dati['Centro']);
                var idDiv = 'dialogModal';
                var idTemplate = 'removeAreaTemplate';
                var dati = {peso:peso, latitudine: centro['Latitudine'],longitudine: centro['Longitudine'],nomeMappa : nomeMappa, nomeArea: nomeArea, probIniz: probIniz };
                addTemplateCompilato(idTemplate, dati, idDiv ); 
                $('#dialogModal').modal({
                    backdrop: 'static',
                    keyboard: false,
                    shown: true
                });
            }
            catch(e)
            { 
                var dati  = {title: 'Remove an area', text: 'There was an error. '};
                addModalDialogContent('ErroreArea', dati);
                $('.modal-footer>.btn').addClass('reload');
                
            }
        }).fail(function(){
            var dati  = {title: 'Remove an area', text: 'There was an error.'};
            addModalDialogContent('ErroreArea', dati);
        });
    });
    
    $('body').on('click', '#removeArea', function(e){
        var nomeArea = $(this).attr("data-nomeArea");
        var dati ={ Nome: nomeArea, NomeMappa:'Corsica'};
        $.ajax({
            type:'POST',
            url:'area/remove',
            data:dati,
            success:function(datiRisposta){
                var risposta = '';
                if(datiRisposta ==='true')
                {
                    risposta = 'Area successfully deleted.';
                    $('#dialogModal').empty();
                    var idDiv = 'dialogModal';
                    var dati = {risposta:risposta, nomeArea: nomeArea};
                    var idTemplate = 'successRemoveAreaTemplate';
                    addTemplateCompilato(idTemplate, dati, idDiv );
                    $('#dialogModal').modal({
                        backdrop: 'static',
                        keyboard: false,
                        shown: true
                    });
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
                    $('#dialogModal').empty();
                    var idDiv = 'dialogModal';
                    var dati = {text :risposta, title: 'Remove an Area'};
                    var idTemplate = 'errorTemplate';
                    addTemplateCompilato(idTemplate, dati, idDiv );
                    $('#dialogModal').modal({
                        backdrop: 'static',
                        keyboard: false,
                        shown: true
                    });
                }
            },
            error: function()
            {
                $('#loadingModal').modal('hide');
                $('#dialogModal').modal('hide');
                creaFeebackTemplateBackHome();
            }
        });
    }); 
    
    $('body').on('click', '#closeDeleteAreaSuccess', function(){
        mappaCorsicaGeoSafe.removeAreaFromMap();
    });
    
    $('body').on('click', '#editArea', function(){
        // se si stava inserendo un link
        if($('#addLink').hasClass('attivato'))
        {
            annullaInserimentoLink(); // sta in DrawSection.js
        }
        if($('#addArea').hasClass('attivato'))
        {
            annullaInserimentoArea(); // sta in DrawSection.js
        }
        //recupero il nome dell'area
        var nomeArea = $('#editArea').attr('data-nomeArea');
        $.when( getArea(nomeArea) ).then(function( datiRisposta, textStatus, jqXHR ) {
            try{
                // visualizzare la form con i dati recuperati
                var risposta = JSON.parse(datiRisposta);
                if(typeof(risposta) === 'string')
                {
                    //aggiungere la dialog per l'errore
                    var dati = {title: 'Edit an Area', text: risposta};
                    addModalDialogContent('ErroreArea', dati); 
                    if(risposta === 'Error')
                    {
                        $('.modal-footer>.btn').addClass('reload');
                    }
                }
                else
                {
                    addModalDialogContent('EditArea', risposta[0]);
                }
            }
            catch(e)
            { 
                var dati = {title: 'Edit an Area', text: 'There was an error. '};
                addModalDialogContent('ErroreArea', dati);
            }
        }).fail(function(){
            var dati = {title: 'Edit an Area', text: 'There was an error. '};
            addModalDialogContent('ErroreArea', dati);});

    });
});



function changeColorIconValue(){
    var $el = $(".modificato"),
    x = 3000,
    originalColor = $el.css("background");

    $el.css("background", "deepskyblue");
    setTimeout(function(){
      $el.css("background", originalColor);
    }, x);
}

