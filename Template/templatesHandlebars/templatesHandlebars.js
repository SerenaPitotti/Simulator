!function(){var a=Handlebars.template,n=Handlebars.templates=Handlebars.templates||{};n.addAreaSuccess=a({compiler:[7,">= 4.0.0"],main:function(a,n,l,e,o){var t,s=null!=n?n:a.nullContext||{},i=l.helperMissing,r=a.escapeExpression;return"<div class='modal-dialog' role='document'>\n    <div class='modal-content'>\n        <div class='modal-header'>\n            <h5 class='modal-title text-center'>"+r((t=null!=(t=l.title||(null!=n?n.title:n))?t:i,"function"==typeof t?t.call(s,{name:"title",hash:{},data:o}):t))+"<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></h5>\n        </div>\n        <div class='modal-body'>\n            <p>"+r((t=null!=(t=l.text||(null!=n?n.text:n))?t:i,"function"==typeof t?t.call(s,{name:"text",hash:{},data:o}):t))+"</p>\n        </div>\n        <div class='modal-footer'>\n            <button type='button' class='btn btn-primary closeSuccessArea' data-dismiss='modal'>OK</button>\n        </div>\n    </div>\n</div>\n\n"},useData:!0}),n.addAreaTemplate=a({1:function(a,n,l,e,o){var t;return(null!=(t=l.if.call(null!=n?n:a.nullContext||{},o&&o.first,{name:"if",hash:{},fn:a.program(2,o,0),inverse:a.program(4,o,0),data:o}))?t:"")+"                                \n"},2:function(a,n,l,e,o){var t=a.lambda,s=a.escapeExpression;return'                                    <option value="'+s(t(n,n))+'" disabled selected>'+s(t(n,n))+"</option>\n"},4:function(a,n,l,e,o){var t=a.lambda,s=a.escapeExpression;return'                                    <option value="'+s(t(n,n))+'" >'+s(t(n,n))+"</option>\n"},compiler:[7,">= 4.0.0"],main:function(a,n,l,e,o){var t;return"\n<div class='modal-dialog' role='document'>\n    <div class='modal-content'>\n        <div class='modal-header'>\n            <h5 class='modal-title text-center'>Add an area<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></h5>\n        </div>\n        <div class='modal-body'>\n            <form id='addAreaForm' >\n                <div class='form-group row'>\n                    <label for='nomeMappaArea' class='col-sm-5 col-form-label'>Map area:</label>\n                    <div class='col-sm-7'><p class='form-control-static' id='nomeMappaArea'>Corse</p></div>\n                </div>\n                <div class='form-group row'>\n                    <label for='nomeArea' class='col-sm-5 col-form-label'>Name Area:</label>\n                    <div class='col-sm-7'>          \n                        <select class='form-control' id='nomeArea' required='required' >\n"+(null!=(t=l.each.call(null!=n?n:a.nullContext||{},null!=n?n.aree:n,{name:"each",hash:{},fn:a.program(1,o,0),inverse:a.noop,data:o}))?t:"")+"                        </select>\n                    </div>\n                </div>\n                <div class='form-group row'>\n                    <label class='col-sm-5 col-form-label' for='probIniziale'>Area Initial Probability:  </label>\n                    <div class='col-sm-7'><input type='text' class='form-control' name='probIniziale' id='probIniziale' /></div>\n                </div>\n                <div class='form-group row'>\n                    <label class='col-sm-5 col-form-label' for='pesoArea'>Area Weight:  </label>\n                    <div class='col-sm-7'><input type='text' class='form-control' name='pesoArea' id='pesoArea' /></div>\n                </div>\n                <div class='modal-footer'>\n                    <button type='submit' id='okAddArea1' class='btn btn-primary offChangeNameArea' >OK</button>\n                    <button type='button' class='btn btn-secondary offChangeNameArea removeDialogModal' data-dismiss='modal' >Cancel</button>\n                </div>\n           \n            \n            </form>\n        </div>\n    </div>\n</div>\n\n\n            \n"},useData:!0}),n.bodyHomePage=a({compiler:[7,">= 4.0.0"],main:function(a,n,l,e,o){return'\n    <noscript>\n        <div class="container">\n            <div class="row">\n                <div class="col-xs-4 col-xs-offset-4">\n                    \x3c!--<img src="./Immagini/GeoSafe.JPG" alt="GeoSafe Icon" class="col-xs-12" />--\x3e\n                    <img src="./Immagini/GeoSafe.JPG" alt="GeoSafe Icon" class="img-responsive" />\n                </div>\n            </div>\n            <div class="row text-center">\n                <div class="col-xs-11 col-xs-offset-1">\n                    <h1>JavaScript Required!</h1>\n                    <h2>GeoSafe Application requires JavaScript to work.</h2>\n                    <h2>This web browser either does not support JavaScript or script are being blocked.</h2>\n                    <h2>To find out whether your browser supports JavaScript or to allow script, see the browser\'s online help.</h2>\n                </div>\n            </div>\n        </div>\n    </noscript> \n    \x3c!-- CONTENUTO DELLA PAGINA ... --\x3e\n    \n    <nav class="navbar navbar-default" role="navigation">\n        \n        <!—- Logo e pulsante per barra ridimensionata --\x3e\n        <div class="navbar-header">\n            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#NavBar">\n                <span class="sr-only">Espandi barra di navigazione</span>\n                <span class="icon-bar"></span>\n                <span class="icon-bar"></span>\n                <span class="icon-bar"></span>\n            </button>\n            <a class="navbar-brand" href="#">GeoSafe</a> \x3c!--logo, realizzato mediante un collegamento con classe navbar-brand;--\x3e\n        </div>\n\n        <!—- Elementi della barra --\x3e\n        <div class="collapse navbar-collapse" id="NavBar">\n            <ul class="nav navbar-nav navbar-right">\n               \x3c!-- <li><a role=\'button\' id="centriAree" class="disattivato">Centri</a></li>\n                <li><a role=\'button\' id="addAreaProva" class="disattivato">AddArea</a></li>\n                <li><a role=\'button\' id="addAree" class="disattivato">AddAree</a></li>\n                <li><a role=\'button\' id="addProbIniz" class="disattivato">AddprobInizAree</a></li>\n                <li><a role=\'button\' id="cc" class="disattivato">AddLinkAree</a></li>--\x3e\n            <li><a role=\'button\' id="simulatefireProp" class="disattivato">Simulate Propagation Map</a></li>\n          <li><a role=\'button\' id="simulaterisk" class="disattivato">Simulate Risk Map</a></li>\n  <li><a role=\'button\' id="risk" class="disattivato">Risk Map</a></li>\n                    <li><a role=\'button\' id="fireProp" class="disattivato">Propagation Map</a></li>\n              <li><a role=\'button\' id="value" class="disattivato">Value Map</a></li>\n                <li><a role=\'button\' id="link" class="disattivato">Link Map</a></li>\n                <li><a role=\'button\' id="probIniz" class="disattivato">Initial Probability Map</a></li>\n                <li><a role=\'button\' id="logIn" data-toggle="modal" data-target="#logInModal"><span class="glyphicon glyphicon-log-in"></span> LogIn</a></li>\n            </ul>\n        </div>\n    </nav>\n    \n    \x3c!-- Questo div imposta un margine a destra ed uno a sinistra ed imposta la \n    sua larghezza in base alla dimensione del dispositivo su cui la pagina è visualizzata.--\x3e\n    <div  id=\'container\' class="container">\n        <div id=\'infoHelp\' class=\'row\'></div>\n        \x3c!--<div class="row"> <button type="button" class="btn btn-outline-primary" id="probIniz">Mappa delle Probabilità Iniziali</button></div>\n        \x3c!--All\'interno del nostro contenitore (.container) abbiamo creato un div di classe .row\n        il quale costituisce una riga del layout --\x3e\n        <br>\n        \n        <div class="row" id="rowContainer">\n            \x3c!--Anche le colonne sono create con dei div che usano delle apposite classi. \n            Notate che il nome delle classi che definiscono le colonne (nell\'esempio col-md-4)\n            terminano con un numero: è proprio questo numero che indica il numero di colonne \n            strutturali della griglia di Bootstrap su cui si estende la singola colonna del layout.--\x3e\n            \x3c!--<div class="col-sm-3"></div>--\x3e\n            <div class="col-md-12" id="colRowContainer">\n                <div id="map"></div>\n            </div>\n        </div>\n        <div id="loadingModal" class=\'modal\' role="dialog">   \n            <div id="loading" class="loading">\n                \x3c!-- per l\'animazione durante il caricamento di una pagina --\x3e\n            </div>\n        </div>\n        <div id="dialogModal" class=\'modal\' role="document">   \n           \x3c!--per aggiungere dialog box--\x3e\n        </div>\n        <div id="dialog" title="Attenzione" class=\'modal\' role="dialog">\n            <p id=\'messaggioDialogBox\' ></p>\n        </div>\n        <div id="logInModal" class=\'modal\' role="dialog">    \n            <div class=\'modal-dialog modal-sm\'>\n                \x3c!-- per la login form--\x3e\n                <div class="modal-content">\n                    <div class="modal-header">\n                      <button type="button" class="close" data-dismiss="modal">&times;</button>\n                      <h4 class="modal-title text-center">GEOSAFE</h4>\n                    </div>\n                    <div class="modal-body">\n                        <form id=\'loginForm\'>\n                            <div class=\'loginFormMessage\'>\n\n                            </div>\n                            <div>\n                                <div class=\'loginGroup\'>\n                                    <div class=\'form-group\'>\n                                        <label for=\'username\'> Username </label>\n                                        <input type=\'text\' name=\'username\' id=\'username\' class=\'form-control\' placeholder=\'Insert Username\'> </input>\n                                    </div> \n                                    <div class=\'form-group\'>\n                                        <label for=\'password\' > Password </label>\n                                        <input type=\'password\' name=\'password\' id=\'password\' class=\'form-control\' placeholder=\'Insert Password\'> </input>\n                                    </div>\n                                    \x3c!--\n                                    <div class=\'form-group login-group-checkbox\'>\n                                        <label for=\'rememberLogIn\' > Remember Me </label>\n                                        <input type=\'checkbox\' name=\'rememberLogIn\' id=\'rememberLogIn\'> </input>\n                                    </div>\n                                    --\x3e\n                                </div>\n                                <div class="text-right">\n                                    <button type=\'submit\' class=\'btn btn-primary \'>Log In</button>\n                                </div>\n                            </div>\n                            \x3c!--\n                            <br>\n                            <br>\n                            <div class=\'etc-login-form\'>\n                                <div>Forgot your password? <a id=\'clickHere\'> Click Here</a></div>\n                                <div>New User? <a id=\'newUser\'> Create new account</a></div>\n                            </div>--\x3e\n                        </form>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    \n    <footer class="panel-footer">\n        <div class="container">\n            <div class="text-center text-muted">© GeoSafe 2017</span>\n        </div>\n    </footer>\n'},useData:!0}),n.dialogModalRemoveLinkTemplate=a({compiler:[7,">= 4.0.0"],main:function(a,n,l,e,o){var t,s=null!=n?n:a.nullContext||{},i=l.helperMissing,r=a.escapeExpression;return"<div class='modal-dialog' role='document'>\n    <div class='modal-content'>\n        <div class='modal-header'>\n            <h5 class='modal-title text-center'>Remove a Link<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></h5>\n        </div>\n        <div class='modal-body'>\n            <div>You are going to remove the following link:</div>  \n            <form>\n                <div class='form-group'>\n                    <label for='startArea' class='col-sm-5 col-form-label'>Start Area:</label>\n                    <div class='col-sm-7'><p class='form-control-static' >"+r((t=null!=(t=l.nomeAreaStart||(null!=n?n.nomeAreaStart:n))?t:i,"function"==typeof t?t.call(s,{name:"nomeAreaStart",hash:{},data:o}):t))+"</p></div>\n                </div>\n                <div class='form-group'>\n                    <label for='endArea' class='col-sm-5 col-form-label'>End Area:</label>\n                    <div class='col-sm-7'><p class='form-control-static' >"+r((t=null!=(t=l.nomeAreaEnd||(null!=n?n.nomeAreaEnd:n))?t:i,"function"==typeof t?t.call(s,{name:"nomeAreaEnd",hash:{},data:o}):t))+"</p></div>\n                </div>        \n                <div class='form-group'>\n                    <label class='col-sm-5 col-form-label' for='probProp'>Propagation Probability Link:</label>\n                    <div class='col-sm-7'><p class='form-control-static'>"+r((t=null!=(t=l.prob||(null!=n?n.prob:n))?t:i,"function"==typeof t?t.call(s,{name:"prob",hash:{},data:o}):t))+"</p></div>\n                </div>  \n                <div class=\"text-right\">\n                    <button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button>\n                    <button type='button' id='removeLink' class='btn btn-primary' data-dismiss='modal'>OK</button>\n                </div>\n            </form>\n        </div>\n    </div>\n</div>\n"},useData:!0}),n.editAreaTemplate=a({compiler:[7,">= 4.0.0"],main:function(a,n,l,e,o){var t,s=null!=n?n:a.nullContext||{},i=l.helperMissing,r="function",d=a.escapeExpression;return"<div class='modal-dialog' role='document'>\n    <div class='modal-content'>\n        <div class='modal-header'>\n            <h5 class='modal-title text-center'>Edit an Area<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></h5>\n        </div>\n        <div class='modal-body'>\n            <form id='editAreaForm' >\n                <div class='form-group row'>\n                    <label for='nomeArea' class='col-sm-5 col-form-label'>Area:</label>\n                    <div class='col-sm-7'><p class='form-control-static' id='nomeArea'>"+d((t=null!=(t=l.Nome||(null!=n?n.Nome:n))?t:i,typeof t===r?t.call(s,{name:"Nome",hash:{},data:o}):t))+"</p></div>\n                </div>\n                <div class='form-group row'>\n                    <label for='nomeMappaArea' class='col-sm-5 col-form-label'>Map area:</label>\n                    <div class='col-sm-7'><p class='form-control-static' id='nomeMappaArea'>"+d((t=null!=(t=l.NomeMappa||(null!=n?n.NomeMappa:n))?t:i,typeof t===r?t.call(s,{name:"NomeMappa",hash:{},data:o}):t))+"</p></div>\n                </div>\n                <div class='form-group row'>\n                    <label class='col-sm-5 col-form-label' for='probIniziale'>Area Initial Probability:  </label>\n                    <div class='col-sm-7'><input type='text' class='form-control' name='probIniziale' id='probIniziale' value='"+d((t=null!=(t=l.ProbIniz||(null!=n?n.ProbIniz:n))?t:i,typeof t===r?t.call(s,{name:"ProbIniz",hash:{},data:o}):t))+"' /></div>\n                </div>\n                <div class='form-group row'>\n                    <label class='col-sm-5 col-form-label' for='pesoArea'>Area Weight:  </label>\n                    <div class='col-sm-7'><input type='text' class='form-control' name='pesoArea' id='pesoArea' value='"+d((t=null!=(t=l.Peso||(null!=n?n.Peso:n))?t:i,typeof t===r?t.call(s,{name:"Peso",hash:{},data:o}):t))+"' /></div>\n                </div>\n                <div class='form-group' id='centroAreaEdit'>\n                    <label class='col-sm-12 col-form-label text-center' for='centroArea'>Area Center:  </label>\n                    <div class='form-group row'>\n                        <label class='col-sm-2 col-form-label' for='latitudineCentroAreaEdit'>Latitude:  </label>\n                        <div class='col-sm-4'>\n                            <input type='text' class='form-control' name='latitudineCentroAreaEdit' id='latitudineCentroAreaEdit' value='"+d((t=null!=(t=l.Latitudine||(null!=n?n.Latitudine:n))?t:i,typeof t===r?t.call(s,{name:"Latitudine",hash:{},data:o}):t))+"' />\n                        </div>\n                        <div>\n                            <label class='col-sm-2 col-form-label' for='longitudineCentroAreaEdit'>Longitude:  </label>\n                            <div class='col-sm-4'>\n                                <input type='text' class='form-control' name='longitudineCentroAreaEdit' id='longitudineCentroAreaEdit' value='"+d((t=null!=(t=l.Longitudine||(null!=n?n.Longitudine:n))?t:i,typeof t===r?t.call(s,{name:"Longitudine",hash:{},data:o}):t))+"' />\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class='modal-footer'>\n                    <button type='submit' class='btn btn-primary'>OK</button>\n                    <button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button>\n                </div> \n            </form>\n        </div>\n    </div>\n</div>\n\n            \n            \n"},useData:!0}),n.editLinkTemplate=a({compiler:[7,">= 4.0.0"],main:function(a,n,l,e,o){var t,s=null!=n?n:a.nullContext||{},i=l.helperMissing,r=a.escapeExpression;return"\x3c!--case 'ModifyLink':--\x3e\n<div class='modal-dialog' role='document'>\n    <div class='modal-content'>\n        <div class='modal-header'>\n            <h5 class='modal-title text-center'>Edit a Link<button type='button' class='close closeDrawLink' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></h5>\n        </div>\n        <div class='modal-body'>\n            <form id='linkForm' >\n                <div class='form-group'>\n                    <label for='startArea' class='col-sm-5 col-form-label'>Start Area:</label>\n                    <div class='col-sm-7'><p class='form-control-static' id='NomeAreaStart'>"+r((t=null!=(t=l.NomeAreaStart||(null!=n?n.NomeAreaStart:n))?t:i,"function"==typeof t?t.call(s,{name:"NomeAreaStart",hash:{},data:o}):t))+"</p></div>\n                </div>\n                <div class='form-group'>\n                    <label for='endArea' class='col-sm-5 col-form-label'>End Area:</label>\n                    <div class='col-sm-7'><p class='form-control-static' id='NomeAreaEnd'>"+r((t=null!=(t=l.NomeAreaEnd||(null!=n?n.NomeAreaEnd:n))?t:i,"function"==typeof t?t.call(s,{name:"NomeAreaEnd",hash:{},data:o}):t))+"</p></div>\n                </div>\n                <div class='form-group'>\n                    <label class='col-sm-5 col-form-label' for='probProp'>Propagation Probability Link:  </label>\n                    <input type='text' class='form-control' name='probProp' id='probProp' value='"+r((t=null!=(t=l.ProbabilitaPropagazione||(null!=n?n.ProbabilitaPropagazione:n))?t:i,"function"==typeof t?t.call(s,{name:"ProbabilitaPropagazione",hash:{},data:o}):t))+"' />\n                </div>\n                <div class='modal-footer'>\n                    <button type='submit' class='btn btn-primary' >OK</button><button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button>\n                </div>\n            </form>\n        </div>\n    </div>\n</div>\n           \n            \n"},useData:!0}),n.errorTemplate=a({1:function(a,n,l,e,o){var t;return"                <h5 class='modal-title text-center'>"+a.escapeExpression((t=null!=(t=l.title||(null!=n?n.title:n))?t:l.helperMissing,"function"==typeof t?t.call(null!=n?n:a.nullContext||{},{name:"title",hash:{},data:o}):t))+"<button type='button' class='close closeDrawLink' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></h5>\n"},3:function(a,n,l,e,o){var t;return"                <h5 class='modal-title text-center'>"+a.escapeExpression((t=null!=(t=l.title||(null!=n?n.title:n))?t:l.helperMissing,"function"==typeof t?t.call(null!=n?n:a.nullContext||{},{name:"title",hash:{},data:o}):t))+"<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></h5>\n"},5:function(a,n,l,e,o){return"                <button type='button' class='btn btn-primary closeDrawLink' data-dismiss='modal'>OK</button>\n"},7:function(a,n,l,e,o){return"                <button type='button' class='btn btn-primary removeDialogModal' data-dismiss='modal'>OK</button>\n"},compiler:[7,">= 4.0.0"],main:function(a,n,l,e,o){var t,s,i=null!=n?n:a.nullContext||{};return"<div class='modal-dialog' role='document'>\n    <div class='modal-content'>\n        <div class='modal-header'>\n"+(null!=(t=l.if.call(i,null!=n?n.drawLink:n,{name:"if",hash:{},fn:a.program(1,o,0),inverse:a.program(3,o,0),data:o}))?t:"")+"        </div>\n        <div class='modal-body'>\n            <p>"+a.escapeExpression((s=null!=(s=l.text||(null!=n?n.text:n))?s:l.helperMissing,"function"==typeof s?s.call(i,{name:"text",hash:{},data:o}):s))+"</p>\n        </div>\n        <div class='modal-footer'>\n"+(null!=(t=l.if.call(i,null!=n?n.drawLink:n,{name:"if",hash:{},fn:a.program(5,o,0),inverse:a.program(7,o,0),data:o}))?t:"")+"        </div>\n    </div>\n</div>\n\n\n                        "},useData:!0}),n.erroreGeoSafeTemplate=a({1:function(a,n,l,e,o){return'        <h2 class="h2 col-xs-12 text-center">Please try again or contact administrator!</h2>\n        <input type="button" class="btn col-xs-offset-8 " id="backHome"  value="OK" />\n'},compiler:[7,">= 4.0.0"],main:function(a,n,l,e,o){var t;return'<div id="error" class="container">\n    <div class="row">\n        <div class="col-xs-4 col-xs-offset-4">\n            <img src="./Immagini/GeoSafe.JPG" alt="GeoSafe Icon" class="img-responsive" />\n        </div>\n    </div>\n    <h1 class="h1 col-xs-12 text-center">Oops!</h1>\n    <h2 class="h2 col-xs-12 text-center">Looks like something went wrong!</h2>\n'+(null!=(t=l.if.call(null!=n?n:a.nullContext||{},null!=n?n.ritenta:n,{name:"if",hash:{},fn:a.program(1,o,0),inverse:a.noop,data:o}))?t:"")+"</div>\n  "},useData:!0}),n.infoHelpTemplate=a({1:function(a,n,l,e,o){var t;return"            <span class='glyphicon glyphicon-info-sign' aria-hidden='true'></span> Not updated "+a.escapeExpression((t=null!=(t=l.nomeMappa||(null!=n?n.nomeMappa:n))?t:l.helperMissing,"function"==typeof t?t.call(null!=n?n:a.nullContext||{},{name:"nomeMappa",hash:{},data:o}):t))+" Map. Click on <button type='button' id='updateMap' class='btn btn-xs'><span class='glyphicon glyphicon-refresh'></span> Update</button> to update it. \n"},3:function(a,n,l,e,o){return"            <span class='glyphicon glyphicon-info-sign' aria-hidden='true'></span> Double click on start area or <button type='button' id='cancelLink' class='btn btn-xs'>Cancel</button> to abort. \n"},5:function(a,n,l,e,o){return"            <span class='glyphicon glyphicon-info-sign' aria-hidden='true'></span> Drag the marker on the new area to modify its center. Click on <button type='button' id='setCenter' class='btn btn-xs'>Set</button> to set it. Click on <button type='button' id='annullaInserimentoArea' class='btn btn-xs'>Cancel</button> to abort. \n"},7:function(a,n,l,e,o){return"            <span class='glyphicon glyphicon-info-sign' aria-hidden='true'></span> Double click on end area or <button type='button' id='cancelLink' class='btn btn-xs'>Cancel</button> to abort.\n"},compiler:[7,">= 4.0.0"],main:function(a,n,l,e,o){var t,s=null!=n?n:a.nullContext||{};return"\x3c!-- 619 log.js  e 113 drawsection.js--\x3e\n    <div class='text-center h5'>\n"+(null!=(t=l.if.call(s,null!=n?n.nomeMappa:n,{name:"if",hash:{},fn:a.program(1,o,0),inverse:a.noop,data:o}))?t:"")+(null!=(t=l.if.call(s,null!=n?n.drawLink:n,{name:"if",hash:{},fn:a.program(3,o,0),inverse:a.noop,data:o}))?t:"")+(null!=(t=l.if.call(s,null!=n?n.center:n,{name:"if",hash:{},fn:a.program(5,o,0),inverse:a.noop,data:o}))?t:"")+(null!=(t=l.if.call(s,null!=n?n.drawLinkEnd:n,{name:"if",hash:{},fn:a.program(7,o,0),inverse:a.noop,data:o}))?t:"")+"    </div>\n\n        "},useData:!0}),n.inserisciLinkTemplate=a({compiler:[7,">= 4.0.0"],main:function(a,n,l,e,o){var t,s=null!=n?n:a.nullContext||{},i=l.helperMissing,r=a.escapeExpression;return"<div class='modal-dialog' role='document'>\n    <div class='modal-content'>\n        <div class='modal-header'>\n            <h5 class='modal-title text-center'>Draw a Link<button type='button' class='close closeDrawLink' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></h5>\n        </div>\n        <div class='modal-body'>\n            <form id='linkForm' >\n                <div class='form-group'>\n                    <label for='startArea' class='col-sm-5 col-form-label'>Start Area:</label>\n                    <div class='col-sm-7'><p class='form-control-static' id='NomeAreaStart'>"+r((t=null!=(t=l.NomeAreaStart||(null!=n?n.NomeAreaStart:n))?t:i,"function"==typeof t?t.call(s,{name:"NomeAreaStart",hash:{},data:o}):t))+"</p></div>\n                </div>\n                <div class='form-group'>\n                    <label for='endArea' class='col-sm-5 col-form-label'>End Area:</label>\n                    <div class='col-sm-7'><p class='form-control-static' id='NomeAreaEnd'>"+r((t=null!=(t=l.NomeAreaEnd||(null!=n?n.NomeAreaEnd:n))?t:i,"function"==typeof t?t.call(s,{name:"NomeAreaEnd",hash:{},data:o}):t))+"</p></div>\n                </div>\n                <div class='form-group'>\n                    <label class='col-sm-5 col-form-label' for='probProp'>Propagation Probability Link:  </label>\n                    <input type='text' placeholder='0.00032'  class='form-control' name='probProp' id='probProp'  />\n                </div>\n                <div class='modal-footer'>\n                    <button type='submit' class='btn btn-primary' >OK</button>\n                    <button type='button' class='btn btn-secondary closeDrawLink' data-dismiss='modal'>Cancel</button>\n                </div>\n            </form>\n        </div>\n    </div>\n</div>\n            \n            "},useData:!0}),n.linkTemplate=a({1:function(a,n,l,e,o){var t;return"            <button type='button' id='closeDeleteSuccess' class='btn btn-primary closeDeleteSuccess' data-idLayer='"+a.escapeExpression((t=null!=(t=l.idLayer||(null!=n?n.idLayer:n))?t:l.helperMissing,"function"==typeof t?t.call(null!=n?n:a.nullContext||{},{name:"idLayer",hash:{},data:o}):t))+"' data-dismiss='modal'>OK</button>\n"},3:function(a,n,l,e,o){return"            <button type='button' class='btn btn-primary closeDeleteFail' data-dismiss='modal'>OK</button>\n"},compiler:[7,">= 4.0.0"],main:function(a,n,l,e,o){var t,s,i=null!=n?n:a.nullContext||{};return"<div class='modal-dialog' role='document'>\n    <div class='modal-content'>\n        <div class='modal-header'>\n            <h5 class='modal-title text-center'>Delete a Link<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></h5>\n        </div>\n        <div class='modal-body'>\n            <p>"+a.escapeExpression((s=null!=(s=l.risposta||(null!=n?n.risposta:n))?s:l.helperMissing,"function"==typeof s?s.call(i,{name:"risposta",hash:{},data:o}):s))+"</p>\n        </div>\n        <div class='modal-footer'>\n"+(null!=(t=l.if.call(i,null!=n?n.success:n,{name:"if",hash:{},fn:a.program(1,o,0),inverse:a.program(3,o,0),data:o}))?t:"")+"        </div>\n    </div>\n</div>\n                    \n                    "},useData:!0}),n.removeAreaTemplate=a({compiler:[7,">= 4.0.0"],main:function(a,n,l,e,o){var t,s=null!=n?n:a.nullContext||{},i=l.helperMissing,r="function",d=a.escapeExpression;return"$<div class='modal-dialog' role='document'>\n    <div class='modal-content'>\n        <div class='modal-header'>\n            <h5 class='modal-title text-center'>Remove an Area<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></h5>\n        </div>\n        <div class='modal-body'>\n            <div>You are going to remove the following area:</div>\n            <form>\n                <div class='form-group'>\n                    <label for='nomeArea' class='col-sm-5 col-form-label'>Area Name:</label>\n                    <div class='col-sm-7'><p class='form-control-static' >"+d((t=null!=(t=l.nomeArea||(null!=n?n.nomeArea:n))?t:i,typeof t===r?t.call(s,{name:"nomeArea",hash:{},data:o}):t))+"</p></div>\n                </div>\n                <div class='form-group'>\n                    <label for='nomeMappa' class='col-sm-5 col-form-label'>Area Map :</label>\n                    <div class='col-sm-7'><p class='form-control-static' >"+d((t=null!=(t=l.nomeMappa||(null!=n?n.nomeMappa:n))?t:i,typeof t===r?t.call(s,{name:"nomeMappa",hash:{},data:o}):t))+"</p></div>\n                </div>\n                <div class='form-group'>\n                    <label for='valueArea' class='col-sm-5 col-form-label'>Area Weight:</label>\n                    <div class='col-sm-7'><p class='form-control-static' >"+d((t=null!=(t=l.peso||(null!=n?n.peso:n))?t:i,typeof t===r?t.call(s,{name:"peso",hash:{},data:o}):t))+"</p></div>\n                </div>\n                <div class='form-group'>\n                    <label for='probInizArea' class='col-sm-5 col-form-label'>Area Initial Probability:</label>\n                    <div class='col-sm-7'><p class='form-control-static' > "+d((t=null!=(t=l.probIniz||(null!=n?n.probIniz:n))?t:i,typeof t===r?t.call(s,{name:"probIniz",hash:{},data:o}):t))+"</p></div>\n                </div>\n                <div class='form-group' id='centroArea'>\n                    <label class='col-sm-12 col-form-label text-center' for='centroArea'>Area Center:  </label>\n                    <div class='form-group row'>\n                        <label class='col-sm-2 col-form-label' for='latitudineCentroArea'>Latitude:  </label>\n                        <div class='col-sm-4'><p class='form-control-static' >"+d((t=null!=(t=l.latitudine||(null!=n?n.latitudine:n))?t:i,typeof t===r?t.call(s,{name:"latitudine",hash:{},data:o}):t))+"</p></div>\n                        <div>\n                            <label class='col-sm-2 col-form-label' for='longitudineCentroArea'>Longitude:  </label>\n                            <div class='col-sm-4'><p class='form-control-static' >"+d((t=null!=(t=l.longitudine||(null!=n?n.longitudine:n))?t:i,typeof t===r?t.call(s,{name:"longitudine",hash:{},data:o}):t))+" </p></div>\n                        </div>\n                    </div>\n                </div>\n                <div class='modal-footer'>\n                    <button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button>\n                    <button type='button' id='removeArea' class='btn btn-primary' data-dismiss='modal' data-nomeArea='"+d((t=null!=(t=l.nomeArea||(null!=n?n.nomeArea:n))?t:i,typeof t===r?t.call(s,{name:"nomeArea",hash:{},data:o}):t))+"'>OK</button>\n                </div>\n            </form>\n        </div>\n\n    </div>\n</div>  \n"},useData:!0}),n.successDrawLink=a({compiler:[7,">= 4.0.0"],main:function(a,n,l,e,o){var t,s=null!=n?n:a.nullContext||{},i=l.helperMissing,r=a.escapeExpression
;return"<div class='modal-dialog' role='document'>\n    <div class='modal-content'>\n         <div class='modal-header'>\n             <h5 class='modal-title text-center'>Draw a Link<button type='button' class='close closeDrawLink' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></h5>\n         </div>\n        <div class='modal-body'>\n            <p>Link successfully inserted.</p>\n        </div>\n        <div class='modal-footer'>\n            <button type='button' class='btn btn-primary closeDrawLinkSuccess' data-areaStart='"+r((t=null!=(t=l.nomeStart||(null!=n?n.nomeStart:n))?t:i,"function"==typeof t?t.call(s,{name:"nomeStart",hash:{},data:o}):t))+"' data-areaEnd='"+r((t=null!=(t=l.nomeEnd||(null!=n?n.nomeEnd:n))?t:i,"function"==typeof t?t.call(s,{name:"nomeEnd",hash:{},data:o}):t))+"' data-probProp='"+r((t=null!=(t=l.probProp||(null!=n?n.probProp:n))?t:i,"function"==typeof t?t.call(s,{name:"probProp",hash:{},data:o}):t))+"\"' data-dismiss='modal'>OK</button>\n        </div>\n\n    </div>\n</div>\n                            \n"},useData:!0}),n.successModifyLink=a({compiler:[7,">= 4.0.0"],main:function(a,n,l,e,o){var t;return"<div class='modal-dialog' role='document'>\n    <div class='modal-content'>\n        <div class='modal-header'>\n            <div class='modal-header'>\n                <h5 class='modal-title text-center'>Modify a Link<button type='button' class='close closeDrawLink' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></h5>\n            </div>\n            <div class='modal-body'>\n                <p>Successfully modified link.</p>\n            </div>\n            <div class='modal-footer'>\n                <button type='button' class='btn btn-primary closeModifyLinkSuccess' data-probProp='"+a.escapeExpression((t=null!=(t=l.probProp||(null!=n?n.probProp:n))?t:l.helperMissing,"function"==typeof t?t.call(null!=n?n:a.nullContext||{},{name:"probProp",hash:{},data:o}):t))+"' data-dismiss='modal'>OK</button>\n            </div>\n        </div> \n    </div>\n</div>\n                             \n"},useData:!0}),n.successRemoveAreaTemplate=a({compiler:[7,">= 4.0.0"],main:function(a,n,l,e,o){var t,s=null!=n?n:a.nullContext||{},i=l.helperMissing,r=a.escapeExpression;return"<div class='modal-dialog' role='document'>\n    <div class='modal-content'>\n        <div class='modal-header'>\n            <h5 class='modal-title text-center'>Remove an Area<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></h5>\n        </div>\n        <div class='modal-body'>\n            <p>"+r((t=null!=(t=l.risposta||(null!=n?n.risposta:n))?t:i,"function"==typeof t?t.call(s,{name:"risposta",hash:{},data:o}):t))+"</p>\n        </div>\n        <div class='modal-footer'>\n            <button type='button' id='closeDeleteAreaSuccess' class='btn btn-primary' data-nomeArea='"+r((t=null!=(t=l.nomeArea||(null!=n?n.nomeArea:n))?t:i,"function"==typeof t?t.call(s,{name:"nomeArea",hash:{},data:o}):t))+"' data-dismiss='modal'>OK</button>\n        </div>\n    </div>\n</div>\n                    \n"},useData:!0})}();