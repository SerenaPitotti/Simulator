/* 
 * Contiene il javascript legato alla barra draw
 */

function addToolbar(){
    var map = mappaCorsicaGeoSafe.map;
    mappaCorsicaGeoSafe.toolbar = L.toolbarControl().addTo(map);
    addTooltipToolbar();
    var link = '';
    
    $('body').on('click','.closeDrawLink', function(e){
        annullaInserimentoLink();      
    });
    
    
    $('body').on('click','.closeDrawLinkSuccess', function(e){
        $('.leaflet-draw-draw-polyline').tooltip('hide');
        $('#infoHelp').empty();
        mappaCorsicaGeoSafe.disabilitaListerInserimentoLink();
        if($('#fireProp').hasClass('attivato') || $('#simulatefireProp').hasClass('attivato') || $('#risk').hasClass('attivato')|| $('#simulaterisk').hasClass('attivato'))
        {
           addUpdateButton();
        }
        // vorrei le info per inserire solo il link 
        var nomeAreaStart = $('.closeDrawLinkSuccess').attr('data-areaStart');
        var nomeAreaEnd = $('.closeDrawLinkSuccess').attr('data-areaEnd');
        $.ajax({
            type:'GET',
            url:'link/' + nomeAreaStart + '/' + nomeAreaEnd,
            success:function(datiRisposta){
                try{
                    datiRisposta = JSON.parse(datiRisposta);
                    if(typeof(datiRisposta)==='string')
                    {
                        // c'è stato un errore.
                        if($('#link').hasClass('attivato'))
                        {
                            $('#link.attivato').click();
                        }
                        $('#link.disattivato').click();
                    }
                    else
                    {
                        mappaCorsicaGeoSafe.addLinkOnMap(datiRisposta);
                    }
                }catch(e){
                    // c'è stato un errore.
                        if($('#link').hasClass('attivato'))
                        {
                            $('#link.attivato').click();
                        }
                        $('#link.disattivato').click();
                }
            },
            error:function(){
                if($('#link').hasClass('attivato'))
                {
                    $('#link.attivato').click();
                }
                $('#link.disattivato').click();
            }
        });
      
    });
    
    
    $('body').on('click','.leaflet-draw-draw-polyline', function(e){
        
        $('#addLink').addClass('attivato');
        if($('#addArea').hasClass('attivato'))
        {
            annullaInserimentoArea(); // sta in DrawSection.js
        }
        // aggiungere il tip che indica cosa fare
        if($('#infoHelp'))
        {
            $('#infoHelp').empty();
        }
        var idDiv = 'infoHelp';
        var idTemplate = 'infoHelpTemplate';
        var dati = {drawLink: true};
        addTemplateCompilato(idTemplate, dati, idDiv);
        mappaCorsicaGeoSafe.abilitaListerInserimentoLink();
        
   
    }); 
    
}

/**
 * Funzione da eseguire in caso di click durante l'inserimento di un link.
 * 
 * @function
 * @param {event} e 
 */
function onClick(e) {
    var t0 = new Date();
    if (t0 - mappaCorsicaGeoSafe.doubleClickTime > mappaCorsicaGeoSafe.threshold) {
        setTimeout(function () {
            if (t0 - mappaCorsicaGeoSafe.doubleClickTime > mappaCorsicaGeoSafe.threshold) {
                infoAree(e);
            }
        },mappaCorsicaGeoSafe.threshold);
    }
}

/**
 * Funzione da eseguire in caso di double click. Permette di selezionare l'area per l'inserimento di un link.
 * 
 * @function
 * @param {event} e 
 */
function onDoubleClick(e) {
    mappaCorsicaGeoSafe.doubleClickTime = new Date();
    selectArea(e);
}


function selectArea(e){
    mappaCorsicaGeoSafe.selectAreaInserimentoLink(e);
    var area = e.target;
    if(mappaCorsicaGeoSafe.infoMap['infoLink'] === undefined)
    {
        $('#infoHelp>div').empty();
        var idDiv = 'infoHelp';
        var idTemplate = 'infoHelpTemplate';
        var dati = {drawLinkEnd:true};
        addTemplateCompilato(idTemplate, dati, idDiv );
        $('.leaflet-draw-draw-polyline').tooltip('hide');
        mappaCorsicaGeoSafe.infoMap['infoLink'] = {"NomeAreaStart":area.feature.properties.nome, "BoundAreaStart": area.getBounds()};
    }
    else
    {
        mappaCorsicaGeoSafe.infoMap['infoLink']['NomeAreaEnd'] = area.feature.properties.nome ;
        mappaCorsicaGeoSafe.infoMap['infoLink']['BoundAreaEnd'] = area.getBounds();
        if(mappaCorsicaGeoSafe.infoMap['infoLink']['NomeAreaEnd'] === mappaCorsicaGeoSafe.infoMap['infoLink']['NomeAreaStart'])
        {
            addModalDialogContent('Errore');
        }
        else
        {
            if(mappaCorsicaGeoSafe.infoMap['infoLink']['BoundAreaEnd'].overlaps(mappaCorsicaGeoSafe.infoMap['infoLink']['BoundAreaStart'])=== true)
            {
                // nel caso i due bounds presentano un'intersezione, controllo lato server che siano effettivamente adiacenti
                var adiacenti = false;
                var dati = {NomeAreaStart:mappaCorsicaGeoSafe.infoMap['infoLink']['NomeAreaStart'], NomeAreaEnd:mappaCorsicaGeoSafe.infoMap['infoLink']['NomeAreaEnd']};

                $.ajax({
                    type: 'POST',
                    url: 'areas/adjacent',
                    data:dati,
                    success: function(datiRisposta){
                        adiacenti = datiRisposta;
                        if(adiacenti === true || adiacenti === 'true' || adiacenti === 'TRUE')
                        {
                            addModalDialogContent('Prob');
                        }    
                        else
                        {
                            // aree non adiacenti
                            addModalDialogContent();
                        }
                    },
                    error: function(){
                        alert('Error.');
                    }
                });
            }
            else
            {
                // aree non adiacenti
                addModalDialogContent();               
            }
        }
    }
    
}


function addModalDialogContent(valore, dati)
{
    $('#dialogModal').empty();
    var idDiv = 'dialogModal';
    switch(valore) {
        case 'SureRemoveLink':
            var idTemplate = 'dialogModalRemoveLinkTemplate';
            addTemplateCompilato(idTemplate, dati, idDiv );
            
            $('#dialogModal').modal({
                backdrop: 'static',
                keyboard: false,
                shown: true
            });
            
        break;

        case 'Errore':
            var idTemplate = 'erroreTemplate';
            var dati ={title: 'Draw a Link', text:'Insertion failed: Twice click on the same area. ', drawLink:true};
            addTemplateCompilato(idTemplate, dati, idDiv );
            $('#dialogModal').modal({
                backdrop: 'static',
                keyboard: false,
                shown: true
            });
            delete mappaCorsicaGeoSafe.infoMap['infoLink'];
            break;
        
        
        case 'Prob':
            var nomestart = mappaCorsicaGeoSafe.infoMap['infoLink']['NomeAreaStart'];
            var nomeend = mappaCorsicaGeoSafe.infoMap['infoLink']['NomeAreaEnd'];
            var dati = {NomeAreaStart: nomestart, NomeAreaEnd:nomeend};
            var idTemplate = 'inserisciLinkTemplate';
            addTemplateCompilato(idTemplate, dati, idDiv );
            validazioneInserisciLink();
            $('#dialogModal').modal({
                backdrop: 'static',
                keyboard: false,
                shown: true
            });
            break;
            
        case 'ModifyLink':
            $('#dialogModal').empty();
            var nomeAreaStart = dati['NomeAreaStart'];
            var nomeAreaEnd = dati['NomeAreaEnd'];
            var probprop = dati['ProbabilitaPropagazione'];
            var dati = { NomeAreaStart : nomeAreaStart, NomeAreaEnd : nomeAreaEnd, ProbabilitaPropagazione: probprop};
            var idTemplate = 'editLinkTemplate';
            addTemplateCompilato(idTemplate, dati, idDiv );
            validazioneModificaLink();
            $('#dialogModal').modal({
                backdrop: 'static',
                keyboard: false,
                shown: true
            });
            break;
        
        case 'addArea':
            var aree = ['Select a name'];
            $.each(dati, function( index, value ) {
                aree.push(value);
            });
            idTemplate = 'addAreaTemplate';
            dati ={aree: aree};
            addTemplateCompilato(idTemplate, dati, idDiv );
            validazioneAddArea();
            $('#dialogModal').modal({
                backdrop: 'static',
                keyboard: false,
                shown: true
            });
            break;
        
        case 'EditArea':
            var latlng = dati['Centro'].replace('POINT(','');
            latlng = latlng.replace(')','');
            latlng = latlng.split(" ");
            var latitudine =latlng[1];
            var longitudine =latlng[0]; 
            var nome = dati['Nome'];
            var nomeMappa = dati['NomeMappa'];
            if(nomeMappa === 'Corsica')
            {
                nomeMappa = 'Corse';
            }
            var probIniz = dati['ProbabilitaIniziale'];
            var peso = dati['Peso'];
            var dati = { Nome: nome, NomeMappa: nomeMappa, ProbIniz: probIniz, Peso: peso, Latitudine: latitudine, Longitudine: longitudine};
            var idTemplate = 'editAreaTemplate';
            addTemplateCompilato(idTemplate, dati, idDiv );
            validazioneModificaArea();
       
            $('#dialogModal').modal({
                backdrop: 'static',
                keyboard: false,
                shown: true
            });
            break;
        
        case 'ErroreArea':
            var idTemplate = 'errorTemplate';
            addTemplateCompilato(idTemplate, dati, idDiv );
            $('#dialogModal').modal({
                backdrop: 'static',
                keyboard: false,
                shown: true
            });
            break;
        
        default:
            var idTemplate = 'errorTemplate';
            var dati = {title:'Draw a Link', text: 'Insertion failed: Not adjacent areas. ', drawLink:true};
            addTemplateCompilato(idTemplate, dati, idDiv );
            $('#dialogModal').modal({
                backdrop: 'static',
                keyboard: false,
                shown: true
            });
            
    }   
}


/**
 * Funzione che imposta la mappa relativa all'oggetto e passato (ovvero la città passata).
 * Inoltre implementa la stessa funzionalità dell'evento mouseover, evento inesistente nei dispositivi mobili.
 * Per cui evidenzia l'area cliccata e ne indica alcune informazioni.
 * 
 * @param {event} e
 */
function infoAree(e) { 
    mappaCorsicaGeoSafe.clickAreaDuranteInserimentoLink(e);
}


function addTooltipToolbar(){
    // aggiungo gli id ai div
    $('.leaflet-draw-draw-polyline').attr('id', 'addLink'); 
    $('.leaflet-draw-draw-polygon').attr('id', 'addArea');
    $('.leaflet-edit-area').attr('id', 'modifyArea');
    $('.leaflet-remove-area').attr('id', 'removeArea');

    // aggiungo tooltip per ogni tasto che ho inserito
    $('#addLink').attr('data-toggle', 'tooltip');
    $('#addLink').attr('data-placement', 'right');
    $('#addLink').attr('title', 'Insert a link');
    $('#addLink').tooltip();
    $('#addLink').tooltip({trigger: "click"});
    
    $('#addArea').attr('data-toggle', 'tooltip');
    $('#addArea').attr('data-placement', 'right');
    $('#addArea').attr('title', 'Insert an area');
    $('#addArea').tooltip();
    $('#addArea').tooltip({trigger: "click"});
    
}

/**
 * Funzione che consente l'annullamento dell'operazione di inserimento di un link.
 */
function annullaInserimentoLink(){
//     $("[data-toggle='tooltip']").tooltip('hide');
        $('.leaflet-draw-draw-polyline').tooltip('hide');
//        $('.leaflet-insert-link').tooltip('hide');
        $('#infoHelp').empty();
        mappaCorsicaGeoSafe.annullaInserimentoLink();
}


/**
 * Funzione che annulla l'inserimento dell'area. Quindi se si sta aggiungendo un'area, 
 * si eliminano tutte le informazioni  di tale area sulla mappa e tutte i suggerimenti per l'user.
 * 
 * @function
 * @name annullaInserimentoArea
 */
function annullaInserimentoArea(){
    mappaCorsicaGeoSafe.annullaInserimentoArea();
    
    if($('#infoHelp'))
    {
        // eliminare suggerimenti
        $('#infoHelp').empty();
    } 
}