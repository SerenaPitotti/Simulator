$(document).ready(function(){
    
    // click su ok nel caso di errore
    $('body').on('click', '#backHome', function(){
        var idDiv = 'body' ;
        var idTemplate = 'bodyHomePage';
        var dati = '';
        addTemplateCompilato(idTemplate, dati, idDiv);
        $('#loadingModal').modal({
        backdrop: 'static',
        keyboard: false,
        shown: true
        });
        mappaCorsicaGeoSafe.init();
       
    });
    
    // ricaricare dopo un errore magari dovuto al fatto che alcune aree sono state eliminate da un utenteA mentre l'utenteB sta navigando
    $('body').on('click', '.reload', function(){
        $('body').empty();
        var idDiv = 'body' ;
        var idTemplate = 'bodyHomePage';
        var dati = '';
        addTemplateCompilato(idTemplate, dati, idDiv);
        $('#loadingModal').modal({
        backdrop: 'static',
        keyboard: false,
        shown: true
        });
        mappaCorsicaGeoSafe.init();
       
    });
    
    // ricaricare dopo un errore magari dovuto al fatto che alcunei link sono stati eliminati da un utenteA mentre l'utenteB sta navigando
    $('body').on('click', '.reloadLink', function(){
        if($("#link").hasClass('attivato'))
        {
           $('#link.attivato').click();
           $('#link.disattivato').click();
        }
        else
        {
            $('#link.disattivato').click();
        }
    });
    
});

/**
 * 
 * Funzione che crea il template Feedback (segnala errore ma non permette di fare niente)
 */
function creaFeebackTemplateBody()
{
    $('#body').empty();
    var idDiv = 'body';
    var idTemplate = 'erroreGeoSafeTemplate';
    var dati = '';
    addTemplateCompilato(idTemplate, dati, idDiv );
    
}

/*
 * Funzione che crea il template Feedback e permette di tornare alla HomePage
 */
function creaFeebackTemplateBackHome()
{
    $('#body').empty();
    var idDiv = 'body';
    var idTemplate = 'erroreGeoSafeTemplate';
    var dati = {ritenta:true};
    addTemplateCompilato(idTemplate, dati, idDiv );
}

function addTemplateCompilato(idTemplate, dati, idDiv ){
    var template = Handlebars.templates[idTemplate];
    // Pass our data to the template
    var theCompiledHtml = template(dati);
    $('#' + idDiv).html(theCompiledHtml);
}
