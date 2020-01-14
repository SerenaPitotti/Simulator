$(document).ready(function(){

    // comportamento per il click su logIn
    $('body').on('click touchStart', '#logIn', function(){
        $(".loginFormMessage").empty();
        validazioneLogIn();
    });

    // comportamento per il click su logOut
    $('body').on('click touchStart', '#logOut', function(){
        $('#SaveOrDiscard').modal('show');
    });

    $('body').on('click touchStart', '#SaveAll', function(){
       
        $.ajax({
            type:'GET',
            url: 'logout',
            success:function(datiRisposta){
                try{
                    var datiRisposta = JSON.parse(datiRisposta);
                    if(datiRisposta['Autenticato'] == false)
                    {  
                    
                        

                        addLogInButton();
                        //nasconde i div relativi alle simulazioni (metodo jQuery)
                        $('#simulaterisk').hide();
                        $('#simulatefireProp').hide();
                       
                    
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
                        // se è attivato l'inserimento di un link, annullo l'operazione
                        if($('#addLink').hasClass('attivato'))
                        {
                            annullaInserimentoLink(); // sta in DrawSection.js
                        }

                        // rimuovere la toolbar
                        mappaCorsicaGeoSafe.removeToolbarFromMap();
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
    });
  
    //logout discard invocata se, al momento del logout, si clicca sul botton discard
    $('body').on('click touchStart', '#DiscardAll', function(){
       
        $.ajax({
            type:'GET',
            url: 'logoutdiscard',
            success:function(datiRisposta){
                try{
                    var datiRisposta = JSON.parse(datiRisposta);
                    if(datiRisposta['Autenticato'] == false)
                    {  
                    
                        
                        //mostra il login button
                        addLogInButton();
                        //nasconde i div relativi alle simulazioni (metodo jQuery)
                        $('#simulaterisk').hide();
                        $('#simulatefireProp').hide();
                       
                    
                        
                        // se è attivato l'inserimento di un link, annullo l'operazione
                        if($('#addLink').hasClass('attivato'))
                        {
                            annullaInserimentoLink(); // sta in DrawSection.js
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

                        // rimuovere la toolbar
                        mappaCorsicaGeoSafe.removeToolbarFromMap();
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
    });
});



function validazioneLogIn()
{
    jQuery.validator.addMethod("password", function (valore) {
        //espressione regolare per la password
        var regex = /(((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])).{6,10})/;
        return valore.match(regex);
    }, "The password consists from 6 to 10 characters, contains at least one number, an uppercase letter,a lowercase letter.");
    jQuery.validator.addMethod("username", function (valore) {
        //espressione regolare per codice fiscale
        var regex = /[0-9a-zA-Z\_\-]{4,15}/;
        return valore.match(regex);
    }, "The username only contains _ , - , numbers, uppercase or lowercase letters");
    
    $('#loginForm').validate({
        rules:
                {
                    username:
                            {
                                required: true,
                                username: true
                            },
                    password:
                            {
                                required: true,
                                maxlength: 10,
                                password: true
                            }
                },
        messages:
                {
                    username:
                            {
                                required: "Insert Username"
                            },
                    password:
                            {
                                required: "Insert Password",
                                maxlength: "Maximum 10 characters"
                            }
                },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        submitHandler: function ()
        {
            $('#loadingModal').modal({
                backdrop: 'static',
                keyboard: false,
                shown: true
            });
            var dati =  $('#loginForm').serialize();
            $.ajax({
                type: 'POST',
                url: 'autenticazione',
                data:  dati,
                success: function(risposta)
                {
                    try{
                        var risposta = JSON.parse(risposta);
                        if(risposta['Autenticato'] == true)
                        {
                            addLogOutButton();
                            addToolbar();

                            //permette la visualizzazione dei div riguardanti la simulazione (metodojQuery)
                            $('#simulaterisk').show();
                            $('#simulatefireProp').show();
                           
                       
                            mappaCorsicaGeoSafe.info.update();
                        }
                        else
                        {
                            if(risposta['PaginaLog'] === false)
                            {
                                //imposta pagina recupero credenziali non essedoci 
                                creaFeebackTemplateBody();
                            }
                            else
                            {
                                $('#loadingModal').modal('hide');
                                $(".loginFormMessage").empty();
                                if(risposta['Errore'] !== undefined)
                                {
                                    $(".loginFormMessage").append("<div>" + risposta['Errore'] + "</div><br>");
                                }  
                            }
                        }
                    }catch(e){
                        $('#loadingModal').modal('hide');
                        $('#container').empty();
                        creaFeebackTemplateBackHome();
                    }
                },
                error: function(xhr, status, error) 
                {
                    alert("Chiamata fallita, si prega di riprovare... XHR: " + xhr + "status: " + status + " error: " + error);
                }
            });
           // inviaDatiGenerico('loginForm', 'autenticazione', '#headerMain');

        }
    });
}

function validazioneModificaLink()
{
    jQuery.validator.addMethod("probability", function (valore) {
        //espressione regolare per la password
        var regex = /((0)\.([0-9])+)|((0),([0-9])+)|(1\.0)/;
        return valore.match(regex);
    }, "Required decimal number between 0 and 1, 1.0 or 0.0 ");
    
    $('#linkForm').validate({
        rules:
                {
                    startArea:
                            {
                                required: true
                            },
                    endArea:
                            {
                                required: true
                            },
                    probProp:
                            {
                                required:true,
                                probability:true
                            }        
                },
        messages:
                {
                    startArea:
                            {
                                required: "Needed Start Area"
                            },
                    endArea:
                            {
                                required: "Needed End Area"
                            },
                    probProp:
                            {
                                required: "Insert Propagation Probability"
                            }
                },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        submitHandler: function ()
        {
            var probProp = $('#probProp').val();
            var nomeStart = $('#NomeAreaStart').text();
            var nomeEnd = $('#NomeAreaEnd').text();
            var dati = {NomeAreaStart: nomeStart, NomeAreaEnd: nomeEnd, ProbabilitaPropagazione: probProp, NomeMappa: 'Corsica'};

            $('#dialogModal').modal('hide');
            
            $('#loadingModal').modal({
                backdrop: 'static',
                keyboard: false,
                shown: true
            });
            
            $.ajax({
                type: 'POST',
                url: 'link/modify',
                data:  dati,
                success: function(risposta)
                {
                    $('#dialogModal').empty();
                    var idDiv = 'dialogModal';
                    var idTemplate ='';
                    try{
                        var risposta = risposta;
                        $('#loadingModal').modal('hide');
                        if(risposta == 'true')
                        {
                            idTemplate = 'successModifyLink';
                            dati = {probProp:probProp};
                            addTemplateCompilato(idTemplate, dati, idDiv );
                        }
                        else
                        {
                            risposta = risposta.substring(1, risposta.length-1);
                            idTemplate = 'errorTemplate';
                            dati ={title: 'Modify a Link', text: risposta};
                            addTemplateCompilato(idTemplate, dati, idDiv );
                            if (risposta === 'Error. ')
                            {
                                $('.modal-footer>.btn').addClass('reload');   
                            }
                            else if(risposta === 'Error: Inexistent link.'){
                                 $('.modal-footer>.btn').addClass('reloadLink');
                            }
                        }
                        
                        $('#dialogModal').modal({
                            backdrop: 'static',
                            keyboard: false,
                            shown: true
                        });
                    }catch(e){
                        $('#loadingModal').modal('hide');
                        $('#container').empty();
                        creaFeebackTemplateBackHome();
                    }
                },
                error: function(xhr, status, error) 
                {
                    $('#loadingModal').modal('hide');
                    $('#container').empty();
                    creaFeebackTemplateBackHome();
                }
            });

        }
    });
}

function validazioneModificaArea(){
    jQuery.validator.addMethod("probability", function (valore) {
        //espressione regolare per la password
        var regex = /((0)\.([0-9])+)|((0),([0-9])+)|(1\.0)/;
        return valore.match(regex);
    }, "Required decimal number between 0 and 1, 1.0 or 0.0");
    
    jQuery.validator.addMethod("decimale", function (valore) {
        //espressione regolare per la password
        var regex = /(([0-9])+.([0-9])+)|([0-9])+/;
        return valore.match(regex);
    }, "Required decimal number.");
    
    $('#editAreaForm').validate({
        rules:
                {
                    nomeArea:
                            {
                                required: true
                            },
                    nomeMappaArea:
                            {
                                required: true
                            },
                    probIniziale:
                            {
                                required:true,
                                probability:true
                            },
                    pesoArea:
                            {
                                required:true,
                                number:true
                            },
                    latitudineCentroAreaEdit:
                            {
                                required:true,
                                decimale:true
                            },
                    longitudineCentroAreaEdit:
                            {
                                required:true,
                                decimale:true
                            }
                },
        messages:
                {
                    nomeArea:
                            {
                                required: "Needed Area Name"
                            },
                    nomeMappaArea:
                            {
                                required: "Needed Map Area Name"
                            },
                    probIniziale:
                            {
                                required: "Insert Area Initial Probability"
                            },
                    pesoArea:
                            {
                                required:"Insert Area Weight"
                            },
                    latitudineCentroAreaEdit:
                            {
                                required:"Insert Center Area Latitude"
                            },
                    longitudineCentroAreaEdit:
                            {
                                required:"Insert Center Area Longitude"
                            }
                },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        submitHandler: function ()
        {
            var probIniz = $('#probIniziale').val();
            var nome = $('#nomeArea').text();
            var peso = $('#pesoArea').val();
            var lat = $('#latitudineCentroAreaEdit').val();
            var lng = $('#longitudineCentroAreaEdit').val();
            var contenuto = mappaCorsicaGeoSafe.puntoContenutoInArea(lat, lng);
            if(contenuto === true)
            {
                var dati = {Nome: nome, NomeMappa: 'Corsica', ProbabilitaIniziale: probIniz, Peso: peso, Latitudine:lat, Longitudine: lng};
                $('#dialogModal').modal('hide');

                $('#loadingModal').modal({
                    backdrop: 'static',
                    keyboard: false,
                    shown: true
                });

                $.ajax({
                    type: 'POST',
                    url: 'area/edit',
                    data:  dati,
                    success: function(datiRisposta)
                    {
                        try{
                            var risposta = JSON.parse(datiRisposta);
                            $('#loadingModal').modal('hide');
                            if(risposta == true)
                            {
                                var daModificare = [];
                                daModificare['peso'] = peso;
                                daModificare['probabilitaIniziale'] = probIniz;
                                daModificare['latitudine'] = lat;
                                daModificare['longitudine'] = lng;
                                $('#dialogModal').empty();
                                var dati = {title: 'Edit an Area', text:'Area successfully modified.'};
                                var idDiv = 'dialogModal';
                                var idTemplate = 'errorTemplate';
                                addTemplateCompilato(idTemplate, dati, idDiv );
                                mappaCorsicaGeoSafe.modificaAreaOnMap(daModificare);
                            }
                            else
                            {
                                $('#dialogModal').empty();
                                var dati = {title: 'Edit an Area', text:risposta};
                                var idDiv = 'dialogModal';
                                var idTemplate = 'errorTemplate';
                                addTemplateCompilato(idTemplate, dati, idDiv );
                                if(risposta === 'Error. ')
                                {
                                    $('.modal-footer>.btn').addClass('reload');
                                }
                            }
                            $('#dialogModal').modal({
                                backdrop: 'static',
                                keyboard: false,
                                shown: true
                            });
                        }catch(e){
                            $('#loadingModal').modal('hide');
                            $('#container').empty();
                            creaFeebackTemplateBackHome();
                        }
                    },
                    error:function()
                    {
                        $('#loadingModal').modal('hide');
                        creaFeebackTemplateBackHome();
                    }
                });
            }
            else
            {
                $('#dialogModal').empty();
                var dati = {title: 'Edit an Area', text:'Error: Center out of area. ' };
                var idDiv = 'dialogModal';
                var idTemplate = 'errorTemplate';
                addTemplateCompilato(idTemplate, dati, idDiv );
            }
        }
    });
}

function validazioneAddArea(){
    var datiComune = '';
    $('body').on('change', '#nomeArea',function() {
        $('#okAddArea1').addClass('disabled'); // fino a quando non ottengo la risposta da OSM
        var nome = this.value;
        $("#nomeArea option[value='" + nome + "']").prop('selected',true);
        recuperaComuneHauteCorse(nome).done(function(result){
            if(typeof(result)==='string')
            {
                var dati = {title: 'Add an area', text: 'There was an error. '};
                addModalDialogContent('ErroreArea', dati); 

            }
            else
            {
                datiComune = result;
                $('#okAddArea1').removeClass('disabled');
            }
        });
    });
    jQuery.validator.addMethod("probability", function (valore) {
        //espressione regolare per la password
        var regex = /((0)\.([0-9])+)|((0),([0-9])+)|(1\.0)/;
        return valore.match(regex);
    }, "Required decimal number between 0 and 1, 1.0 or 0.0");
    
    jQuery.validator.addMethod("decimale", function (valore) {
        //espressione regolare per la password
        var regex = /(([0-9])+.([0-9])+)|([0-9])+/;
        return valore.match(regex);
    }, "Required decimal number.");
    
    $('#addAreaForm').validate({
        rules:
                {
                    nomeArea:
                            {
                                required: true
                            },
                    probIniziale:
                            {
                                required:true,
                                probability:true
                            },
                    pesoArea:
                            {
                                required:true,
                                number:true
                            },
                },
        messages:
                {
                    nomeArea:
                            {
                                required: "Needed Area Name"
                            },
                    probIniziale:
                            {
                                required: "Insert Area Initial Probability"
                            },
                    pesoArea:
                            {
                                required:"Insert Area Weight"
                            },
                },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        submitHandler: function ()
        {
            var probIniz = $('#probIniziale').val();
            var nome = $('#nomeArea option:selected').text();
            var nomeMappa = $('#nomeMappaArea').text();
            var peso = $('#pesoArea').val();
            var typeFeature = datiComune['TypeFeature'];
            var confine = JSON.stringify(datiComune['Confine']); 
            var lat = datiComune['Latitudine'];
            var lng = datiComune['Longitudine'];
            var geojsonArea = {
                "type": "FeatureCollection",
                "features": [
                    { 
                        "type": "Feature",
                        "geometry": {
                            "type": typeFeature,
                            "coordinates": datiComune['Confine']
                        },
                        "properties": {
                            "nome": nome
                        }
                   }
                ]
            };
            try{
                mappaCorsicaGeoSafe.addAreaConCentroDaSpostareOnMap(geojsonArea, lat, lng);
                // aggiungere il tip che indica cosa fare
                if($('#infoHelp').length>0)
                {
                    $('#infoHelp').empty();
                }
                $('body').off('click', '#setCenter');
                var idDiv = 'infoHelp';
                var idTemplate = 'infoHelpTemplate';
                var dati = {center:true};
                addTemplateCompilato(idTemplate, dati, idDiv );
                $('#dialogModal').modal('hide');
                
                $('body').on('click', '#setCenter', function(){
                    var risultato = mappaCorsicaGeoSafe.centroContenutoInArea();
                    if(risultato['Contenuto'] === true)
                    {
                        var dati ={NomeArea : nome, TypeFeature : typeFeature, Confine : confine, Centro: risultato['Centro'], Peso: peso, ProbabilitaIniziale:probIniz, NomeMappa: nomeMappa};
                        addAreaDB(dati);
                    }
                    else
                    {
                        // rimuovo il layer aggiunto in areeLayer
                        mappaCorsicaGeoSafe.removeAreaAppenaAggiunta();
                        // rimuovo le info 
                        $('#infoHelp').empty();
                        
                        var dati = {title: 'Add an area', text: 'Error: center out of area. '};
                        addModalDialogContent('ErroreArea', dati); 
                    }
                });
            }catch(e){
                var dati = {title: 'Add an area', text: 'There was an error. '};
                addModalDialogContent('ErroreArea', dati); 
            }
        }  
    });
   
}

function validazioneInserisciLink()
{
    jQuery.validator.addMethod("probability", function (valore) {
        //espressione regolare per la password
        var regex = /((0)\.([0-9])+)|((0),([0-9])+)|(1\.0)/ ;
        return valore.match(regex);
    }, "Required decimal number between 0 and 1, 1.0 or 0.0");
    
    $('#linkForm').validate({
        rules:
                {
                    startArea:
                            {
                                required: true
                            },
                    endArea:
                            {
                                required: true
                            },
                    probProp:
                            {
                                required:true,
                                probability:true
                            }        
                },
        messages:
                {
                    startArea:
                            {
                                required: "Needed Start Area"
                            },
                    endArea:
                            {
                                required: "Needed End Area"
                            },
                    probProp:
                            {
                                required: "Insert Propagation Probability"
                            }
                },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        submitHandler: function ()
        {
            var probProp = $('#probProp').val();
            var nomeStart = $('#NomeAreaStart').text();
            var nomeEnd = $('#NomeAreaEnd').text();
            var dati = {NomeAreaStart: nomeStart, NomeAreaEnd: nomeEnd, ProbabilitaPropagazione: probProp, NomeMappa: 'Corsica'};

            $('#dialogModal').modal('hide');
            
            $('#loadingModal').modal({
                backdrop: 'static',
                keyboard: false,
                shown: true
            });
            
            $.ajax({
                type: 'POST',
                url: 'link/add',
                data:  dati,
                success: function(risposta)
                {
                    try{
                        var risposta = JSON.parse(risposta);
                        $('#loadingModal').modal('hide');
                        if(risposta == true)
                        {
                            $('#dialogModal').empty();
                            var dati = {nomeStart:nomeStart, nomeEnd:nomeEnd, probProp:probProp};
                            var idTemplate = 'successDrawLink';
                            var idDiv = 'dialogModal';
                            addTemplateCompilato(idTemplate, dati, idDiv );
                            
                            $('#dialogModal').modal({
                                backdrop: 'static',
                                keyboard: false,
                                shown: true
                            });
                            
                        }
                        else
                        {
                            $('#dialogModal').empty();
                            var idDiv = 'dialogModal';
                            var dati = {title: 'Draw a Link', text:risposta, drawLink:true};
                            var idTemplate = 'errorTemplate';
                            addTemplateCompilato(idTemplate, dati, idDiv );
                            if(risposta === 'Error.')
                            {
                                $('.modal-footer>.btn').addClass('reload');
                            }
                            $('#dialogModal').modal({
                                backdrop: 'static',
                                keyboard: false,
                                shown: true
                            });
                            
                        }
                    }catch(e){
                        $('#loadingModal').modal('hide');
                        $('#container').empty();
                        creaFeebackTemplateBackHome();
                    }
                },
                error: function(xhr, status, error) 
                {
                    $('#loadingModal').modal('hide');
                    $('#container').empty();
                    creaFeebackTemplateBackHome();
                }
            });
        }
    });
}


function addLogOutButton()
{
    $('#logInModal').modal('hide');
    $('#logIn').removeAttr('data-toggle');
    $('#logIn').removeAttr('data-target');
    $('#logIn').text($('#logIn').text().replace(" LogIn", "")); 
    $('#logIn').append("<span class='glyphicon glyphicon-log-out'></span> LogOut");
    $('#logIn').attr('id','logOut');
    $('#loadingModal').modal('hide');
}


function addLogInButton()
{
    $('#logOut').text($('#logOut').text().replace(" LogOut", "")); 
    $('#logOut').append("<span class='glyphicon glyphicon-log-in'></span> LogIn");
    $('#logOut').attr('id','logIn');
    $('#logIn').attr('data-toggle', 'modal');
    $('#logIn').attr('data-target', '#logInModal');
}


function addAreaDB(dati){
    var datiPerAggiornamento = dati;
    $.ajax({
        type: 'POST',
        url: 'area/add',
        data: dati,
        success: function(datiRisposta){
            $('#infoHelp').empty();
            datiRisposta = JSON.parse(datiRisposta);
            
            if(datiRisposta === true)
            {
                // area aggiunta
                $('#dialogModal').empty();
                var dati = {title :'Add an Area', text :'Area successfully inserted. '} ;
                var idTemplate = 'addAreaSuccess';
                var idDiv = 'dialogModal';
                addTemplateCompilato(idTemplate, dati, idDiv );
                $('#dialogModal').modal({
                    backdrop: 'static',
                    keyboard: false,
                    shown: true
                });  
                var centro = datiPerAggiornamento['Centro'];
                centro.replace("POINT(", "");
                centro.replace(")", "");
                var centro = centro.split(" ");
                var latitudine = centro[1].replace(" ", "");
                var longitudine = centro[0].replace(" ", "");
                var datiArea = [];
                datiArea['probabilitaIniziale'] = datiPerAggiornamento['ProbabilitaIniziale'];
                datiArea['peso'] = datiPerAggiornamento['Peso'];
                datiArea['latitudine'] = latitudine;
                datiArea['longitudine'] = longitudine; 
                mappaCorsicaGeoSafe.aggiornaArea(mappaCorsicaGeoSafe.idNuovoLayer, datiArea);
                mappaCorsicaGeoSafe.idNuovoLayer = '';
            }
            else
            {
                // rimuovo il layer aggiunto in areeLayer
                mappaCorsicaGeoSafe.removeAreaAppenaAggiunta();
                // rimuovo le info 
                $('#infoHelp').empty();
                // c'è stato un errore.
                var dati = {title: 'Add an area', text: datiRisposta};
                addModalDialogContent('ErroreArea', dati); 
            }

        },
        error: function(){
            var dati = {title: 'Add an area', text: 'There was an error. '};
            addModalDialogContent('ErroreArea', dati); 
            annullaInserimentoArea();
        }
    }); 
}

