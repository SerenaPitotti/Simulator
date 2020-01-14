
/**
 * Class representing a map. 
 *
 * @class
 * @access public
 */
"use strict";
class ClasseMappa{
    

    /**
     * Represents a ClasseMappa.
     * 
     * @constructor
     */
    constructor () {
        /**
         * The id of last area insered in the map if is a number. 
         * Se diverso da '' mantiene l'id dell'ultima area inserita nella mappa.
         * 
         * @type {number|string}
         */
        this.__idNuovoLayer = '';

        /**
         * The id of last area clicked on the map if is a number.
         * Se diverso da '' mantiene l'id dell'ultima area cliccata sulla mappa 
         * 
         * @type {number|string}
         */
        this.__idEventoPassato = '';

        /**
         * Denotes initialized map. true if it is initializad, false otherwise.
         * Indica se la mappa è stata inizializzata. Se true è inizializzata.
         * 
         * @type {boolean}
         */
        this.__mappaInizializzata = false;

        /**
         * Object Geojson where the information of the areas on the map is stored if it is an object.
         * Oggetto Geojson dove memorizzare le aree geoJSON (e le loro informazioni) della mappa o string se non ci sono ancora aree memorizzate.
         * 
         * @type { GeoJSON Object|string} 
         * @property {string} __aree.type 
         * @property {GeoJSON Object[]} __aree.features
         */
        this.__aree = '';


        /**
         * Object where the information (Name, Nation, Latitude, Longitude ) of the map is stored. If no information have been stored yet, it is set to ''.
         * Oggetto dove memorizzare le informazioni della mappa come nome, nazione, latitudine, lognitudine.
         * 
         * @type {Object|string} 
         * @property {string} __infoMap.Nome
         * @property {string} __infoMap.Nazione
         * @property {double} __infoMap.Latitudine
         * @property {double} __infoMap.Longitudine
         */
        this.__infoMap = '';
            
        /**
         * L.featureGroup Object where last link clicked is stored. If no links have been clicked yet, it is set to ''.
         * Contiene il link (L.featureGroup Object) cliccato in precedenza se almeno uno è stato cliccato, altrimenti vale ''.
         * 
         * @type {string|L.featureGroup Object}
         */
        this.__linkEventoPassato = '';

        /**
         * L.map Object. It is used to create a map on a page and manipulate it. If it is a string no map has been created.
         * Oggetto di tipo L.map ; è usata per creare una mappa sulla pagina e maniporlarla.
         * 
         * @type {L.map Object|string}
         */
        this.__map = '';
        
        /**
         * L.geoJSON Object. Represents a GeoJSON object. Allows you to display areas on the map. If no area is displayed, it is set to ''.
         * Oggetto di tipo L.geoJSON ; è usata per inserire la visualizzazione delle aree sulla mappa. 
         * 
         * @type {L.geoJSON Object|string}
         */
        this.__areeLayer = '';

        /**
         * L.featureGroup Object. Allows you to insert and display links on the map. If no link is displayed, it is set to ''.
         * Oggetto di tipo L.featureGroup ;è utilizzata per inserire la visualizzazione dei link sulla mappa. 
         * 
         * @type {L.featureGroup Object|string}
         */
        this.__linksLayer = '';

        /**
         * L.featureGroup Object. Allows you to insert and display Values / weights of the areas on the map. If no value is displayed, it is set to ''.
         * Oggetto di tipo L.featureGroup ;è utilizzata per inserire la visualizzazione dei valori/pesi delle aree sulla mappa. 
         * 
         * @type {L.featureGroup Object|string }
         */
        this.__valuesLayer = '';

        /**
         * L.featureGroup Object. Allows you to insert and display centers of the areas on the map. If no centers is dispayed, it is set to ''.
         * Oggetto di tipo L.featureGroup; è utilizzata per inserire la visualizzazione dei centri delle aree sulla mappa. 
         * 
         * @type {L.featureGroup Object|string}
         */
        this.__centersLayer = '';
        
        
        /**
         * L.control() Object. Allows you to display map information on the map. If it is a string, no map is displayed.
         * Oggetto di tipo L.control(); è utilizzato per visualizzare le informazioni della mappa sulla mappa. 
         * 
         * @type { L.control() Object|string}
         */
        this.__info ='';

        /**
         * L.control() Object. Allows you to display a legend on the map. If it is a string, no legend is displayed on the map.
         * Oggetto di tipo L.control(); è utilizzato per visualizzare una legenda sulla mappa. 
         * 
         * @type { L.control() Object|string}
         */
        this.__legend = '';
        
        /**
         * L.ToolbarControl Object. Allows you to display a toolbar on the map. If it is a string, no toolbar is displayed on the map.
         * Oggetto di tipo LL.ToolbarControl() che estende L.Control; è utilizzato per visualizzare una toolbar sulla mappa. 
         * 
         * @type { L.ToolbarControl Object|string}
         */
        this.__toolbar = '';
        
        /**
         * Time to wait to see if a click is a click or double click.
         * Intervallo di tempo da attendere per capire se un click è un click o un double click.
         * 
         * @type {number}
         */
        this.__threshold = 300;
        
        /**
         * Specifies the number of milliseconds between the moment the double click event occurred and January 1, 1970, 00:00:00. Initially is set to 0.
         * Contiene i millisecondi tra quando l'evento di double click si è verificato e 1 Gennaio 1970, 00:00:00
         *  
         * @type {Date Object}
         */
        this.__doubleClickTime = 0;
    }
    
    //-----------------------------------metodi get----------------------------------------//
    
    /**
     * Gets the id of last area insered in the map if a number.
     * Permette di ottenere l'id dell'ultima area inserita nella mappa.
     *  
     * @return {number|string} The id of last area insered in the map or ''. L'id dell'ultima area inserita o ''.
     */
    get idNuovoLayer() {
        return this.__idNuovoLayer ;
    }
    
    /**
     * Gets the id of last area clicked on the map if is a number.
     * Permette di ottenere l'id dell'ultima area cliccata sulla mappa. 
     * 
     * @return {number|string} The id of last area clicked on the map or ''. L'id dell'ultima area cliccata o ''.
     */
    get idEventoPassato(){
        return this.__idEventoPassato;
    }
    
    /**
     * Gets true if the map is initialized, false otherwise.
     * Ritorna true se la mappa è stata inizializzata, false altrimenti.
     * 
     * @return {boolean} true if the map is initialized, false otherwise. true se la mappa è inizializzata, false altrimenti.
     */
    get mappaInizializzata(){
        return this.__mappaInizializzata;
    }
    
    /**
     *  Gets Object Geojson where the information of the areas on the map is stored if it is an object or ''.
     *  Permette di ottenere l'oggetto Geojson dove sono memorizzate le aree geoJSON (e le loro informazioni) della mappa o string se non ci sono ancora aree memorizzate.
     * 
     * @return { GeoJSON Object|string}  Areas information  or ''.
     */
    get aree() {
        return this.__aree ;
    }
    
    /**
         * Object where the information (Name, Nation, Latitude, Longitude ) of the map is stored. If no information have been stored yet, it is set to ''.
         * Oggetto dove memorizzare le informazioni della mappa come nome, nazione, latitudine, lognitudine.
         * 
         * @type {Object|string} 
         * @property {string} __infoMap.Nome
         * @property {string} __infoMap.Nazione
         * @property {double} __infoMap.Latitudine
         * @property {double} __infoMap.Longitudine
         */
   
    get infoMap() {
        return this.__infoMap ;
    }
    
    
    
    
    /**
     * Gets the id of last area clicked on the map if is a number.
     * Permette di ottenere l'id dell'ultima area cliccata sulla mappa. 
     * 
     * @return {number|string} The id of last area clicked on the map or ''. L'id dell'ultima area cliccata o ''.
     */
    get linkEventoPassato(){
        return this.__linkEventoPassato;
    }
    
    
    
    get areeLayer() {
        return this.__areeLayer ;
    };
    
    get linksLayer(){
        return this.__linksLayer;
    }
    
    get valuesLayer(){
        return this.__valuesLayer;
    }
    
    get centersLayer(){
        return this.__centersLayer;
    }
    
    get map(){
        return this.__map;
    }
    
    
    
    get info() {
        return this.__info ;
    }
    
    get legend() {
        return this.__legend ;
    }
    
    get toolbar() {
        return this.__toolbar ;
    }
    
    get threshold(){
        return this.__threshold;
    }
    
    get doubleClickTime(){
        return this.__doubleClickTime;
    }
    
    //----------------------------------metodi set------------------------------------------//
    
    /**
     * Sets the id of last area insered in the map if a number. To initialize the attribute, it is set a ''.
     * Permette di impostare l'id dell'ultima area inserita nella mappa. Per inizializzare l'attributo, è impostato a ''.
     *  
     *  @param {number|string} id The id of last area insered or ''.
     */
    set idNuovoLayer(id) {
        this.__idNuovoLayer = id ;
    }
    
    /**
     * Sets the id of last area clicked on the map if is a number. To initialize the attribute, it is set a ''.
     * Permette di impostare l'id dell'ultima area cliccata sulla mappa. Per inizializzare l'attributo, è impostato a ''. 
     * 
     * @param {number|string} id The id of last area clicked on the map or ''.
     */
    set idEventoPassato(id){
        this.__idEventoPassato = id;
    }
    
    /**
     * Sets mappaInizializzata true if the map is initialized, false otherwise.
     * Imposta mappaInizializzata  a true se la mappa è stata inizializzata, false altrimenti.
     * 
     * @param {boolean} inizializzata true if the map is initialized, false otherwise. true se la mappa è inizializzata, false altrimenti.
     */
    set mappaInizializzata(inizializzata){
        this.__mappaInizializzata = inizializzata;
    }
    
    /**
     *  Sets Object Geojson where the information of the areas on the map is stored  or '' to inizialize.
     *  Permette di impostare l'oggetto Geojson dove sono memorizzate le aree geoJSON (e le loro informazioni) della mappa o '' per inizializzare l'attributo.
     * 
     * @param { GeoJSON Object|string} aree Areas information  or ''.
     */
    set aree(aree) {
        this.__aree  = aree;
    }
    
    set linkEventoPassato(link){
        this.__linkEventoPassato = link;
    }
    
    
    
    
    
    set linksLayer(linkslayer){
        this.__linksLayer = linkslayer;
    }
    
    set valuesLayer (valuesLayer){
        this.__valuesLayer = valuesLayer;
    }
    
    set centersLayer(centersLayer){
       this.__centersLayer = centersLayer;
    }
    
    set areeLayer(areeLayer){
       this.__areeLayer = areeLayer; 
    }
    
    

    set infoMap(infoMap) {
        this.__infoMap = infoMap ;
    }

    set info(infoDiv){
        this.__info = infoDiv;
    }
    
    set legend(legend){
        this.__legend = legend;
    }
    
    set toolbar(toolbar){
        this.__toolbar = toolbar;
    }
    
    set map(mappa){
        this.__map = mappa;
    }
    
    set doubleClickTime(doubleClickTime){
        this.__doubleClickTime = doubleClickTime;
    }

    /**
     * Start loading spinner and initialize the map.
     * Fa partire la loading spinner e inizializza la mappa.
     */
    init() {
        //inizializza la mappa
        $('#loadingModal').modal({
        backdrop: 'static',
        keyboard: false,
        shown: true
        });
        this.caricaMappaIniziale();
    };
     
    /**
     * Initialize the initial map.
     * Metodo che consente di impostare la mappa iniziale.
     * 
     */
    caricaMappaIniziale(){
       this.linkEventoPassato = '';
       this.idEventoPassato = '';
       this.mappaInizializzata = false;
       
       var oggetto = this; // memorizzo l'oggetto che chiama la funzione caricaMappaIniziale ovvero l'oggetto di questa classe
        // chiamata per ottenere informazioni sulla mappa
        $.when( $.ajax( "map" ) ).done(function( datiRisposta, textStatus, jqXHR ) {
            try
            {
                var risposta = JSON.parse(datiRisposta);
                if(typeof(risposta['Error']) === 'undefined')
                {
                    oggetto.infoMap = risposta['InfoMappa'];
                    if($('#map'))
                    {
                        oggetto.initMap();
                        if(risposta['Autenticato'] == true)
                        {
                            addLogOutButton();
                            $('#loadingModal').modal({
                                backdrop: 'static',
                                keyboard: false,
                                bshown: true
                            });
                            addToolbar();

                            //metodo jQuery che permette la visualizzazione del tasto di Simulazione Risk Map e Simulazione Fire Propagation Map
                            $('#simulaterisk').show();
                            $('#simulatefireProp').show();
                        }
                    }
                }
                else
                {
                    $('#loadingModal').modal('hide');
                    creaFeebackTemplateBody();
                    this.__mappaInizializzata = false;
                }
            }catch (e){
                $('#loadingModal').modal('hide');
                creaFeebackTemplateBody();
                this.__mappaInizializzata = false;
            }
        }).fail(function(){
            $('#loadingModal').modal('hide');
            creaFeebackTemplateBody();
            this.__mappaInizializzata = false;
        });


        // quando ho la risposta di GET map/areas dal server aggiungo le aree.
        $.when( $.ajax( "map/areas" ) ).done(function( datiRisposta, textStatus, jqXHR ) 
        {
            try{
                oggetto.aree = JSON.parse(datiRisposta);  
                if(oggetto.map !== undefined)
                {
                    oggetto.addAreeOnMap();
                    $('#loadingModal').modal('hide');            
                }
                else
                {
                    $('#loadingModal').modal('hide');
                    creaFeebackTemplateBody();
                    oggetto.__mappaInizializzata = false;
                }
            }catch (e){
                $('#loadingModal').modal('hide');
                creaFeebackTemplateBody();
                this.__mappaInizializzata = false;
            }
        }).fail(function(){
            $('#loadingModal').modal('hide');
            creaFeebackTemplateBody();
            oggetto.__mappaInizializzata = false;
        });  
       
   }
   
   /**
    * 
    * Funzione che inizializza la mappa. 
    * Imposto la latitudine, la longitudine, lo zoom e aggiungo div in cui ci sono delle informazioni sulla mappa.
    * 
    * @argument {object} infoMap Contiene le informazioni legate alla mappa: Latitudine, Longitudine, NomeMappa e Nazione
    */
    initMap() {
        var oggetto =this;
       this.map = L.map('map').setView([ this.__infoMap['Latitudine'], this.__infoMap['Longitudine']], 10); // L.map('map') Istanzio un oggetto map dato l'id del div presente nel DOM, setView([ infoMap['Latitudine'], infoMap['Longitudine']], 10) Imposta la vista della mappa (centro geografico e zoom)

   // L.tileLayer è utilizzato per caricare e visualizzare i tiles sulla mappa
   // Istanzia un oggetto tile layer dato un URL template e degli oggetti option (se forniti).
   //'http://localhost/GeoSafe/tileserver/map/{z}/{x}/{y}.png'
   //la prima parte dell'URL specifica il tile server, segue poi il Filename(url) il cui formato è /zoom/x/y.png
   // se uso il tile server
        if(navigator.onLine===false)// se non c'è connessione carico da tileserver
        {    
            var mapBounds = new L.LatLngBounds(
                new L.LatLng(41.322143172908, 8.4257879590049),
                new L.LatLng(43.072292703024, 9.6592366605628));
            var mapMinZoom = 8;
            var mapMaxZoom = 13;
            var overlay = L.tileLayer('http://localhost/GeoSafe/tileserver/map/{z}/{x}/{y}.png', {
                        minZoom: mapMinZoom, //zoom minimo, di default è 0
                        maxZoom: mapMaxZoom, //zoom massimo, di default è 18
                        bounds: mapBounds, // tiles sarà caricato solo all'interno del LatLngBounds. opzione ereditata da GridLayer
                        // attribution: 'undefined',
                        opacity: 0.85  //Opacità dei tiles. di default è 1
                      }).addTo(oggetto.map);
        }
        else
        {
            var mapMinZoom = 8;
            var mapMaxZoom = 13;
            var overlay = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                //minZoom: mapMinZoom, //zoom minimo, di default è 0
                //maxZoom: mapMaxZoom, //zoom massimo, di default è 18
               // bounds: mapBounds, // tiles sarà caricato solo all'interno del LatLngBounds. opzione ereditata da GridLayer
                attribution: 'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
                opacity: 0.85  //Opacità dei tiles. di default è 1
                }).addTo(this.map);
        }

        //modifico degli elementi della mappa in base allo zoom
        this.map.on('zoom', function (e) {
            zoom_based_layerchange();
        });

        var oggetto = this;
        // aggiungo il div in cui inserisco le informazioni sulla mappa per l'utente
        this.info = L.control();
        // re-implemento la funzione onAdd
        var x = this.info;
        var mappa = this.map;
        x.onAdd = function (mappa) {
           // this è l'oggetto info
           //DomUtil contiene funzioni per lavorare con il DOM
           //L.DomUtil.create Crea un elemento HTML  con tagName, imposta la sua classa con className, e optionally lo append ad un elemento.
            this._div = L.DomUtil.create('div', 'info'); // creo  div con classe "info"
            this.update();
            return this._div;
        };
        x.update = function (props) {
        var idEventoPassato = oggetto.idEventoPassato;
        var LinkEventoPassato = oggetto.linkEventoPassato;
        if(props)
        {
            $(".info").html("<h4 id='infoMap'>CORSE MAP</h4>");
            var key;
            if(typeof(props)==='string')
            {
                $(".info").html("<h4 id='infoLinkProbability'>CORSE Propagation Link Probability Map</h4><p>" +  (props ? props 
                        : 'Hover over a link</p>'));
                if($('#logOut').length)
                {
                    $(".info").append("<button type='button' id='removeLinkDialog' data-idLayer='" + idLayer + "' class='btn btn-info btn-xs pull-right margin-left'><span class='glyphicon glyphicon-trash'></span> Remove</button>\n\
                    <button type='button' id='modifyLink' class='btn btn-info btn-xs pull-right'><span class='glyphicon glyphicon-edit'></span> Edit</button></div>");
                }
            }
            else
            {
                for (key in props) {
                    switch(key){
                        case 'risk':
                            $(".info").append("<p>Risk  : " + props.risk + "</p>");
                            break; 

                        case 'simulaterisk':
                            $(".info").append("<p>Simulate Risk  : " + props.risk + "</p>");
                            break;
                            
                        case 'probabilitaPropagazione':
                            $(".info").append("<p>Fire Propagation Probability  : " + props.probabilitaPropagazione + "</p>");
                            break;
                        
                        case 'simulateprobabilitaPropagazione':
                            $(".info").append("<p>Simulate Fire Propagation Probability  : " + props.probabilitaPropagazione + "</p>");
                            break;

                        case 'probabilitaIniziale':
                            $(".info").append("<p>Fire Initial Probability  : " + props.probabilitaIniziale + "</p>");
                            break;
                            
                        case 'peso':
                            $(".info").append("<p>Area Value  : " + props.peso + "</p>");
                            break;
                            
                        case 'idValueLayer':
                            break;
                            
                        default: //key = nome
                            $(".info").append("<p><b>" + props.nome + "</b></p>");
                            break;
                    }

                }
                if($('#logOut').length)
                { 
                    var nomeArea = props.nome;
                    $(".info").append("<button type='button' id='removeAreaDialog' data-nomeArea='" + nomeArea + "' class='btn btn-info btn-xs pull-right margin-left'><span class='glyphicon glyphicon-trash'></span> Remove</button>\n\
                        <button type='button' id='editArea' data-nomeArea='" + nomeArea + "' class='btn btn-info btn-xs pull-right'><span class='glyphicon glyphicon-edit'></span> Edit</button></div>");
              }
            }
        }
        else
        {
            
            $(".info").html("<h4 id='infoMap'>CORSE MAP</h4><p>Hover over an area</p>");
            if($('#logOut').length && idEventoPassato!=='' && LinkEventoPassato ==='')
            { 
                var nomeArea = $('h4 + p').text();
                if(nomeArea === 'Hover over an area')
                {
                    
                    $('h4 + p').remove();
                    var area = oggetto.areeLayer.getLayer(idEventoPassato);
                    props = area.feature.properties;
                    var key;
                    for (key in props) {
                        switch(key){
                            case 'risk':
                                $(".info").append("<p>Risk  : " + props.risk + "</p>");
                                break;  
                            case 'simulaterisk':
                                $(".info").append("<p>Simulate Risk  : " + props.risk + "</p>");
                                break;

                            case 'probabilitaPropagazione':
                                $(".info").append("<p>Fire Propagation Probability  : " + props.probabilitaPropagazione + "</p>");
                                break;
                                
                            case 'simulateprobabilitaPropagazione':
                                $(".info").append("<p>Simulate Fire Propagation Probability  : " + props.probabilitaPropagazione + "</p>");
                                break;
                            case 'probabilitaIniziale':
                                $(".info").append("<p>Fire Initial Probability  : " + props.probabilitaIniziale + "</p>");
                                break;

                            case 'peso':
                                $(".info").append("<p>Area Value  : " + props.peso + "</p>");
                                break;

                            case 'idValueLayer':
                                break;

                            default: //key = nome
                                $(".info").append("<p><b>" + props.nome + "</b></p>");
                                break;
                        }

                    }
                    $(".info").append("<button type='button' id='removeAreaDialog' data-nomeArea='" + props.nome + "' class='btn btn-info btn-xs pull-right margin-left'><span class='glyphicon glyphicon-trash'></span> Remove</button>\n\
                    <button type='button' id='editArea' data-nomeArea='" + props.nome + "' class='btn btn-info btn-xs pull-right'><span class='glyphicon glyphicon-edit'></span> Edit</button></div>");
                }
            }
            else
            {
                if(LinkEventoPassato!=='')
                {
                    //props = LinkEventoPassato._popup._content;
                    props = LinkEventoPassato.getPopup().getContent();
                    var idLayer = LinkEventoPassato._leaflet_id;
                    $(".info").html("<h4 id='infoLinkProbability'>CORSE Propagation Link Probability</h4><p>" +  props);
                    
                    if($('#logOut').length)
                    {
                        $(".info").append("<button type='button' id='removeLinkDialog' data-idLayer='" + idLayer + "' class='btn btn-info btn-xs pull-right margin-left'><span class='glyphicon glyphicon-trash'></span> Remove</button>\n\
                        <button type='button'  id='modifyLink' class='btn btn-info btn-xs pull-right'><span class='glyphicon glyphicon-edit'></span> Edit</button></div>");
                    }
                }
                
            }
            
        }
    }; 
        this.info.addTo(mappa);
        this.info.update();
       // la mappa è ora inizializzata
       this.mappaInizializzata = true; 
    }



    /**
     * Set areas on the map.
     * Metodo che consente di impostare le aree sulla mappa.
     */
    addAreeOnMap()
    {
        this.areeLayer = L.geoJSON(this.aree ,{
             //style: Funzione che definisce le opzioni Path(classe astratta che contiene opzioni e costanti condivise tra i vettori (poligono, polilinea, cerchio)) per lo styling di linee e poligoni GeoJSON, è chiamato internamente quando i dati vengono aggiunti. 
             style: this.mapStyle,
             //onEachFeature:  funzione che verrà chiamata una volta per ogni feature creata, dopo che è stata creata e disegnata.
             // Utile per collegare eventi e popup alle funzioni.
             onEachFeature: this.onEachFeatureInitialMap
         }).addTo(this.map);
    }


    /**
     * Funzione che permette di aggiungere alla mappa le informazioni relative alla probabilità iniziale di ciascuna area e di impostare, sulla base 
     * di queste informazioni, lo style dell'area appropriato. Successivamente aggiunge la legenda dei colori delle aree sulla mappa.
     * 
     * @function
     * @name addInitProbOnMap
     * @param {object} nomeProbIniz  Array contenente un elemento per ogni area presente sulla mappa. Per ciascuna area l'elemento è formato da Nome, ProbailitaIniziale dell'area.
     */
    addInitProbOnMap(nomeProbIniz)
    {
        var oggetto = this; // oggetto di tipo ClasseMappa che richiama la funzione
        var areee = this.areeLayer.getLayers();
        $.each(areee, function(index, area){
            $.each(nomeProbIniz, function( index, value ) {
                if(value['Nome'] === area.feature.properties.nome)
                {
                    //area.feature.properties.probabilitaIniziale
                    area['feature']['properties']['probabilitaIniziale'] = value['ProbabilitaIniziale'];
                    oggetto.setStyleInitialProbabilityMap(area);

                }
            });
        });
        this.info.update();
        // aggiungo la legenda
        this.legend = L.control({position: 'bottomright'});
        var x = this.legend;
        var mappa = this.map;
        // re-implemento la funzione onAdd
        x.onAdd = function(mappa) {

            var div = L.DomUtil.create('div', 'legend');
            var grades = [0, 0.002, 0.004, 0.006, 0.008, 0.01, 0.03, 0.05, 0.08, 0.1];
            var labels = [];
            // loop through our fire initial probability intervals and generate a label with a colored square for each interval
            for (var i = 0; i < grades.length; i++) {
                labels.push(
                    '<i style="background:' + oggetto.getInitialProbabilityColor(grades[i]) + '"></i> ' +
                    grades[i] + (grades[i + 1] ? ' &ndash; ' + grades[i + 1] : '+'));
            }
            div.innerHTML = labels.join('<br>');
            return div;
        };
        this.legend.addTo(mappa);

    }
    
    /**
     * Funzione che permette di aggiungere alla mappa le informazioni relative alla probabilità di propagazione di ciascuna area e di impostare, sulla base 
     * di queste informazioni, lo style dell'area appropriato e aggiorna le informazioni per l'utente. Successivamente 
     * 
     * @function
     * @name addFirePropOnMap
     * @param {object} nomeProbProp  Array contenente un elemento per ogni area presente sulla mappa. Per ciascuna area l'elemento è formato da Nome, ProbabilitaPropagazione dell'area.
     */
    addFirePropOnMap(nomeProbProp)
    {
        var oggetto = this; // memorizzo l'oggetto che ha richiamato la funzione
        var areee = this.areeLayer.getLayers();
        $.each(areee, function(index, area){
            $.each(nomeProbProp, function( index, value ) {
                if(value['Nome'] === area.feature.properties.nome)
                {
                    //area.feature.properties.probabilitaPropagazione
                    area['feature']['properties']['probabilitaPropagazione'] = value['ProbabilitaPropagazioneIncendi'];
                    oggetto.setStyleFirePropagationProbabilityMap(area);
                }
            });
        });
         // aggiungo la legenda
        this.legend = L.control({position: 'bottomright'});
        var x = this.legend;
        var mappa = this.map;
        // re-implemento la funzione onAdd
        x.onAdd = function(mappa) {

            var div = L.DomUtil.create('div', 'legend');
            var grades = [0, 0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09];
            var labels = [];
            // loop through our fire initial probability intervals and generate a label with a colored square for each interval
            for (var i = 0; i < grades.length; i++) {
                labels.push(
                    '<i style="background:' + oggetto.getFirePropagationProbabilityColor(grades[i]) + '"></i> ' +
                    grades[i] + (grades[i + 1] ? ' &ndash; ' + grades[i + 1] : '+'));
            }
            div.innerHTML = labels.join('<br>');
            return div;
        };
        this.legend.addTo(mappa); 
        this.info.update();
    }
    
    addSimulateFirePropOnMap(nomeProbProp)
    {
    
        var oggetto = this; // memorizzo l'oggetto che ha richiamato la funzione
        var areee = this.areeLayer.getLayers();
        var maxValue = 0; // variabile per trovare il valore massimo della scala
        var minValue = 0; // variabile per trovare il valore minimo della scala
        $.each(areee, function(index, area){
            $.each(nomeProbProp, function( index, value ) {
                if(value['Nome'] === area.feature.properties.nome)
                {      //area.feature.properties.probabilitaPropagazione
                    if(value['ProbabilitaPropagazioneIncendi'] > maxValue)
                    {
                        maxValue = value['ProbabilitaPropagazioneIncendi'];
                    }
                    if(value['ProbabilitaPropagazioneIncendi']< minValue)
                    {
                        minValue = value['ProbabilitaPropagazioneIncendi'];
                    }


                    //area.feature.properties.probabilitaPropagazione
                    area['feature']['properties']['probabilitaPropagazione'] = value['ProbabilitaPropagazioneIncendi'];
                    oggetto.setStyleFireSimulatePropagationProbabilityMap(area);
                }
            });
        });
        var mappa =  this.map;
        var interval = maxValue - minValue; 
        var intervalStep = interval / 10 ;
        intervalStep = Math.round(intervalStep*1000)/1000  // arrontadamento al 3° numero decimale
        
        // aggiungo la legenda
        this.legend = L.control({position: 'bottomright'});
        var x = this.legend;
        // re-implemento la funzione onAdd
        x.onAdd = function(mappa) {
            
            var div = L.DomUtil.create('div', 'legend');
            
            //var grades = [0, intervalStep, 2*intervalStep, 3*intervalStep, 4*intervalStep, 5*intervalStep, 6*intervalStep, 7*intervalStep, 8*intervalStep, 9*intervalStep];
            
            var grades = [0, 0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09];
            
            var labels = [];
            // ciclo attraverso gli intervalli di rischio e genero una label un quadrato colorato per ogni intervallo.
            for (var i = 0; i < grades.length; i++) {
                labels.push(
                    '<i style="background:' + oggetto.getFireSimulatePropagationProbabilityColor(grades[i]) + '"></i> ' +
                    grades[i] + (grades[i + 1] ? ' &ndash; ' + grades[i + 1] : '+'));
            }
            div.innerHTML = labels.join('<br>');
            return div;
        };
        this.legend.addTo(mappa);  
        this.info.update();
    }
    /**
    * Funzione che consente di aggiungere sulla mappa un layer per la visualizzazione dei link(linksLayer).
    * 
    * @function
    * @name addLinksOnMap
    * @param {object} links Array di link della mappa. Ogni link è costituito da un 
    * indice 'CentroAreaStart','CentroAreaPropagation','NomeAreaStart', 'NomeAreaProgagation', 'PropabilitaPropagazioni' e i loro relativi valori.
    */    
    addLinksOnMap(links){
        var oggetto = this; //memorizzo l'oggetto che ha richiamato la funzione addLinksOnMap
        var linksLayer = this.linksLayer;
        var mappa = this.map;
        // se già esiste un linksLayer, lo elimino. Caso che può accadere se ho aggiunto un link in precedenza. 
        if(typeof(linksLayer)!=='undefined' && linksLayer!=='')
        {
            this.linksLayer.remove();
        }
        // creo un layer group in maniera da eliminare i layer contenuti in questo layer group in una sola volta.
        this.linksLayer = L.featureGroup();
        this.linksLayer.addTo(mappa);
        this.linksLayer.bringToFront(); // per il momento potrebbe andare bene perchè lo voglio avanti rispetto alla mappa delle probabilità iniziali. ma successivamente potrebbe essere necessario usare setZIndex()
        this.info.update();
        $.each(links, function(indice, link) {
           var punto1 = link['CentroAreaStart'];
           var punto2 = link['CentroAreaPropagation'];
           punto1 = oggetto.trovaPunto(punto1);
           punto2 = oggetto.trovaPunto(punto2);
           oggetto.addLink(punto1, punto2, link); // aggiungo il collegamento tra due aree (passo i punti delle aree da collegare)
        });
    }
    
    /**
    * Funzione che aggiunge un collegamento/link tra due aree della mappa nel layer dei link (linksLayer).
    * 
    * @function
    * @name addLink
    * @param {object} punto1 Il punto di partenza della curva. Array costituito da un elemento il cui indice 'Latitudine' e un elemento il cui indice è 'Longitudine'
    * @param {object} punto2 Il punto di arrivo della curva. Array costituito da un elemento  il cui indice 'Latitudine' e un elemento il cui indice è 'Longitudine'
    * @param {object} link Array contenente il 'CentroAreaStart', il 'CentroAreaPropagation', il 'NomeAreaStart', il 'NomeAreaPropagation', la 'ProbabiltaPropagazioni'
    */           
    addLink(punto1, punto2, link){
        var oggetto = this;
        var mappa = this.map;
        var latlngs = [];
        var latlng1 = [punto1['Latitudine'], punto1['Longitudine']]; 
        var latlng2 = [punto2['Latitudine'], punto2['Longitudine']];
        var midpointLatLng = oggetto.trovaPuntoControlloCurvaBezier(punto1, punto2);
        //le opzioni per la curva (colore e spessore della curva)
        var pathOptions = {
                color: 'rgba(0,0,0,0.5)',
                //weight: link['ProbabilitaPropagazioni'] // se vogliamo fare in base alla propagazione
                weight: 2, // se vogliamo fare le propagazioni tutte uguali
                className: 'collegamento'

        }
        //la curva di Bézier
        var curva = L.curve(['M',latlng1,'Q',midpointLatLng,latlng2],pathOptions);

        var polyline = oggetto.findPolylineCurva(latlng1, latlng2, midpointLatLng);
        var arrow = oggetto.creaArrow(latlng1, latlng2, midpointLatLng);

        // un collegamento è costituito dalla curva di Bézier, dalla spezzata trasparente e dalla punta della freccia
        var collegamento = L.featureGroup();
        collegamento.addLayer(polyline);
        collegamento.addLayer(curva);
        collegamento.addLayer(arrow);

        // collego/aggiungo al collegamento popup e comportamento
        collegamento.bindPopup('<b>Start Fire Area</b>: ' + link['NomeAreaStart'] + '<br/><b>Fire Propagation Area</b>: ' + link['NomeAreaPropagation'] + '<br/><b>Link Propagation Probability </b>: ' + link['ProbabilitaPropagazioni'], {className: 'linkPopup'})
            .on('click', function (e) {
                var idEventoPassato = oggetto.idEventoPassato;
                if(idEventoPassato !== '')
                {
                    var layerEventoPassato = oggetto.areeLayer.getLayer(idEventoPassato);
                    oggetto.resetTargetStyle(layerEventoPassato);
                }
                var LinkEventoPassato = oggetto.linkEventoPassato;
                if(LinkEventoPassato !== '')
                {
                    
                    var layers = LinkEventoPassato.getLayers();
                    layers[1].setStyle({
                        weight: 2,//spessore del tratto in pixel del link
                        color: 'rgba(0,0,0,0.5)', // colore del tratto della confine
                    });
                    oggetto.info.update();
                    LinkEventoPassato.closePopup();
                }
                //info.update(e.target._popup._content);
                oggetto.info.update(e.target.getPopup().getContent());
                var layers = this.getLayers();
                    layers[1].setStyle({
                        weight: 4,//spessore del tratto in pixel del link
                        color: 'rgba(0,0,0,1)', // colore del tratto della confine
                    });
                this.openPopup();
                oggetto.linkEventoPassato = this;
            }).addTo(mappa);

        //pallino indicante il punto di start
        var start = L.circle(latlng1, {radius: 10, color:'black'}).addTo(mappa);
        //pallino indicante il punto di end
        var end = L.circle(latlng2, {radius: 10, color:'black'}).addTo(mappa);

        // un singolo link che visualizzaziamo sulla mappa dei link è costituito quindi dal collegamento, dal pallino indicante il punto di inizio e quello indicante il punto di arrivo.
        var linkLayer = L.featureGroup();
        linkLayer.addLayer(collegamento);
        linkLayer.addLayer(start);    
        linkLayer.addLayer(end);  
        this.linksLayer.addLayer(linkLayer);
    }
    
    
    /**
    * Funzione che consente di trovare il punto di controllo della curva di Bézier.
    * 
    * @function
    * @name trovaPuntoControlloCurvaBezier
    * @param {object} punto1 Il punto di partenza della curva. Array costituito da un elemento il cui indice 'Latitudine' e un elemento il cui indice è 'Longitudine'
    * @param {object} punto2 Il punto di arrivo della curva. Array costituito da un elemento  il cui indice 'Latitudine' e un elemento il cui indice è 'Longitudine'
    * @return {object} Il punto di controllo della curva di Bézier.  Array del tipo [midpointY, midpointX] dove in midpointY vi è la latitudine del punto, in midpointX la longitudine del punto trovato.
    */
    trovaPuntoControlloCurvaBezier(punto1, punto2){
        // voglio un link che sia una curva (utilizzo la curva di Bézier per cui ho bisogno di 3 punti: start, end e il punto di controllo)
        // devo trovare il punto di controllo: 

        //Converto in coordinate cartesiane la latitudine e la longitudine
        //Longitudine (east/west) è x, latitudine (north/south) è y per cui devo scambiare 
        var latlng1 = [punto1['Latitudine'], punto1['Longitudine']]; 
        var latlng2 = [punto2['Latitudine'], punto2['Longitudine']];

        // Converto in coordinate polari (r, theta). Suppongo che il punto 1(di start) sia il punto di riferimento (0,0)
        var offsetX = latlng2[1] - latlng1[1]; // x2-x1
        var offsetY = latlng2[0] - latlng1[0];// y2-y1

        var r = Math.sqrt( Math.pow(offsetX, 2) + Math.pow(offsetY, 2) ); //offsetX al quadrato + offsetY al quadrato poi tutto sotto radice quadrata
        var theta = Math.atan2(offsetY, offsetX); // atan2 di offsetY/offsetX

        // il punto di controllo C sarà un punto perpendicolare alla linea AB(Start ed End) e quindi formerà un triangolo rettangolo
        // il punto C interseca la linea AB nella metà. 

        var thetaOffset = (3.14/10);
        var r2 = (r/2)/(Math.cos(thetaOffset));
        var theta2 = theta + thetaOffset;

        var midpointX = parseFloat((r2 * Math.cos(theta2))) + parseFloat(latlng1[1]);
        var midpointY = parseFloat((r2 * Math.sin(theta2))) + parseFloat(latlng1[0]);

        var midpointLatLng = [midpointY, midpointX];
        return midpointLatLng;
    }


    /**
    * Funzione che consente di trovare una spezzata della curva di Bézier. Grazie a questa spezzata aumento 
    * la superficie cliccabile del link.
    * 
    * @function
    * @name findPolylineCurva
    * @param {object} latlng1 Array contentene latitudine(elemento 0) e longitudine (elemento 1) del punto di partenza della curva di Bézier
    * @param {object} latlng2 Array contentene latitudine(elemento 0) e longitudine (elemento 1) del punto di arrivo della curva di Bézier
    * @param {object} midpointLatLng Il punto di controllo della curva di Bézier.  Array del tipo [midpointY, midpointX] dove in midpointY vi è la latitudine del punto, in midpointX la longitudine del punto.
    * @returns {L.polyline object} Oggetto L.polyline di Leaflet trasparente e con padding 10 
    */
    findPolylineCurva(latlng1, latlng2, midpointLatLng){
        var coordinateLatlng = new Array();
        var t = 0.1;
        while (t<1) {
            var x = (1 - t) * (1 - t) * latlng1[0] + 2 * (1 - t) * t * midpointLatLng[0] + t * t * latlng2[0];
            var y = (1 - t) * (1 - t) * latlng1[1] + 2 * (1 - t) * t * midpointLatLng[1] + t * t * latlng2[1];
            var latlng = L.latLng(x, y);
            coordinateLatlng.push(latlng);
            t = t + 0.1; 
        }
        var polyline = new L.polyline(coordinateLatlng, { opacity: 0, fillOpacity: 0 , weight: '10'});
        return polyline;
    }

    /**
     * Funzione che consente di trovare i punti per poter creare la punta di un freccia relativa ad un collegamento e 
     * con questi punti crea una punta di freccia grazie al plugin L.polylineDecorator
     * 
     * @function
     * @name creaArrow
     * @param {object} latlng1 Array contentene latitudine(elemento 0) e longitudine (elemento 1) del punto di partenza della curva di Bézier
     * @param {object} latlng2 Array contentene latitudine(elemento 0) e longitudine (elemento 1) del punto di arrivo della curva di Bézier
     * @param {object} midpointLatLng Il punto di controllo della curva di Bézier.  Array del tipo [midpointY, midpointX] dove in midpointY vi è la latitudine del punto, in midpointX la longitudine del punto.
     * @returns {L.PolylineDecorator object} La punta di freccia creata per un determinato link
     */
    creaArrow(latlng1, latlng2, midpointLatLng){
        // Trovo 2 punti appartenenti alla cirva di Bézier: uno nel mezzo dela curva e uno poco più distante 
        var t = 0.5; // given example value
        var x = (1 - t) * (1 - t) * latlng1[0] + 2 * (1 - t) * t * midpointLatLng[0] + t * t * latlng2[0];
        var y = (1 - t) * (1 - t) * latlng1[1] + 2 * (1 - t) * t * midpointLatLng[1] + t * t * latlng2[1];

        var t = 0.55; // given example value
        var x2 = (1 - t) * (1 - t) * latlng1[0] + 2 * (1 - t) * t * midpointLatLng[0] + t * t * latlng2[0];
        var y2 = (1 - t) * (1 - t) * latlng1[1] + 2 * (1 - t) * t * midpointLatLng[1] + t * t * latlng2[1];
        var arrowPunti = [[x,y],[x2,y2]];

        var arrow = L.polylineDecorator(arrowPunti, {
            patterns: [
                {
                    offset: '100%',
                    repeat: 0, // 0 pixel
                    //symbol: L.Symbol.arrowHead({pixelSize: 10, polygon: false, pathOptions: {stroke: true}})
                    symbol: L.Symbol.arrowHead({pixelSize: 3, polygon: false,  pathOptions: {fillOpacity:0.75, color: "black" ,weight: 2}})
                }
            ]
        });
        return arrow;
    }
    
    addRiskOnMap(nomeRisk)
    {
        var oggetto = this; // memorizzo l'oggetto che richiama la funzione addRiskOnMap
        var areee = this.areeLayer.getLayers();
        var maxValue = 0; // variabile per trovare il valore massimo della scala
        var minValue = 0; // variabile per trovare il valore minimo della scala
        $.each(areee, function(index, area){
            $.each(nomeRisk, function( index, value ) {
                if(value['Nome'] === area.feature.properties.nome)
                {
                    //area.feature.properties.probabilitaPropagazione
                    if(value['Rischio'] > maxValue)
                    {
                        maxValue = value['Rischio'];
                    }
                    if(value['Rischio']< minValue)
                    {
                        minValue = value['Rischio'];
                    }
                    area['feature']['properties']['risk'] = value['Rischio'];
                    oggetto.setStyleFireRiskMap(area);
                }
            });
        });
        var mappa =  this.map;
        var interval = maxValue - minValue; 
        var intervalStep = interval / 10 ;
        intervalStep = Math.round(intervalStep*1000)/1000  // arrontadamento al 3° numero decimale
        
        // aggiungo la legenda
        this.legend = L.control({position: 'bottomright'});
        var x = this.legend;
        // re-implemento la funzione onAdd
        x.onAdd = function(mappa) {
            
            var div = L.DomUtil.create('div', 'legend');
            
            var grades = [0, intervalStep, 2*intervalStep, 3*intervalStep, 4*intervalStep, 5*intervalStep, 6*intervalStep, 7*intervalStep, 8*intervalStep, 9*intervalStep];
            
            //var grades = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
            
            var labels = [];
            // ciclo attraverso gli intervalli di rischio e genero una label un quadrato colorato per ogni intervallo.
            for (var i = 0; i < grades.length; i++) {
                labels.push(
                    '<i style="background:' + oggetto.getFireRiskColor(grades[i]) + '"></i> ' +
                    grades[i] + (grades[i + 1] ? ' &ndash; ' + grades[i + 1] : '+'));
            }
            div.innerHTML = labels.join('<br>');
            return div;
        };
        this.legend.addTo(mappa);  
        this.info.update();
    }
    
    addSimulateRiskOnMap(nomeRisk)
    {
        var oggetto = this; // memorizzo l'oggetto che richiama la funzione addSimulateRiskOnMap
        var areee = this.areeLayer.getLayers();
        var maxValue = 0; // variabile per trovare il valore massimo della scala
        var minValue = 0; // variabile per trovare il valore minimo della scala
        $.each(areee, function(index, area){
            $.each(nomeRisk, function( index, value ) {
                if(value['Nome'] === area.feature.properties.nome)
                {
                    //area.feature.properties.probabilitaPropagazione
                    if(value['Rischio'] > maxValue)
                    {
                        maxValue = value['Rischio'];
                    }
                    if(value['Rischio']< minValue)
                    {
                        minValue = value['Rischio'];
                    }
                    area['feature']['properties']['risk'] = value['Rischio'];
                    oggetto.setStyleFireSimulateRiskMap(area);
                }
            });
        });
        var mappa =  this.map;
        var interval = maxValue - minValue; 
        var intervalStep = interval / 10 ;
        intervalStep = Math.round(intervalStep*1000)/1000  // arrontadamento al 3° numero decimale
        
        // aggiungo la legenda
        this.legend = L.control({position: 'bottomright'});
        var x = this.legend;
        // re-implemento la funzione onAdd
        x.onAdd = function(mappa) {
            
            var div = L.DomUtil.create('div', 'legend');
            
            //var grades = [0, intervalStep, 2*intervalStep, 3*intervalStep, 4*intervalStep, 5*intervalStep, 6*intervalStep, 7*intervalStep, 8*intervalStep, 9*intervalStep];
            
            var grades = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
            
            var labels = [];
            // ciclo attraverso gli intervalli di rischio e genero una label un quadrato colorato per ogni intervallo.
            for (var i = 0; i < grades.length; i++) {
                labels.push(
                    '<i style="background:' + oggetto.getFireSimulateRiskColor(grades[i]) + '"></i> ' +
                    grades[i] + (grades[i + 1] ? ' &ndash; ' + grades[i + 1] : '+'));
            }
            div.innerHTML = labels.join('<br>');
            return div;
        };
        this.legend.addTo(mappa);  
        this.info.update();
    }
    /**
    * 
    * Funzione che consente di aggiungere al GeoJSON Feature object relativo all'area il valore/peso e 
    * sulla mappa la visualizzazione di questi pesi.
    * 
    * @function
    * @name addValueOnMap
    * @param {object} areeValori Array contenente un elemento per ogni area presente sulla mappa. Per ciascuna area l'elemento è formato da Centro, Nome, Peso dell'area.
    */
    addValueOnMap(areeValori){
        var oggetto = this; // memorizzo l'oggetto che ha richiamato la funzione addValueOnMap
        //valuesLayer è il layer contenente i pesi delle aree
        var mappa = this.map;
        this.valuesLayer = L.featureGroup();
        this.valuesLayer.addTo(mappa);
        var layerAree = this.areeLayer.getLayers(); // memorizzo i layer delle aree
        var aree = this.aree;
        $.each(areeValori, function(indice, areaValore) {
            //aggiungo al GeoJSON Feature object relativo all'area il valore/peso
            $.each(aree['features'], function(indice, feature)
            {
                if(feature['properties']['nome']=== areaValore['Nome'])
                {
                    //per ogni area aggiungo il peso recuperato dal server
                    aree['features'][indice]['properties']['peso'] = areaValore['Peso'];
                }
            });
            //visualizzazo questi pesi sulla mappa.
            $.each(layerAree, function(indice, layer) {
                // per ogni layer area che ho in  areeLayer
                if(layer['feature']['properties']['nome'] === areaValore['Nome'])
                {
                    var centro = oggetto.trovaPunto(areaValore['Centro']);
                    var latlng = L.latLng(centro['Latitudine'], centro['Longitudine']);
                    var icon = L.divIcon({
                        html: areaValore['Peso'],
                        iconSize: [10, 10],
                        className: 'iconCircle' 
                    });
                    var valueLayer = L.marker(latlng, {
                        icon: icon
                    });
                    oggetto.valuesLayer.addLayer(valueLayer);
                    var idValueLayer = oggetto.valuesLayer.getLayerId(valueLayer);
                    layer['feature']['properties']['idValueLayer'] = idValueLayer;    
                }
            });
            //oggetto.valuesLayer.bringToBack();
        });
        this.info.update();
    }
    
    addAreaConCentroDaSpostareOnMap(geojsonArea, lat, lng)
    {
        var oggetto = this; 
        this.areeLayer.addData(geojsonArea);
        $.each(this.areeLayer.getLayers(), function( index, value ) {
            oggetto.idNuovoLayer = value._leaflet_id; 
        }); 
        // al termine del ciclo in idNuovoLayer ho l'id del layer appena inserito in areeLayer

        var area = this.areeLayer.getLayer(this.idNuovoLayer);
        area.setStyle({
            weight: 2, //spessore del tratto in pixel del feature
            opacity: 1, // opacità del feature 
            color: 'deepskyblue', // colore del tratto della confine
            dashArray: '', // la lunghezza del tratto del tratteggio del confine
            fillOpacity: 0.01  // opacità del riempimento
        });
        area.bringToFront();
        this.centersLayer = L.featureGroup();
        this.centersLayer.addTo(oggetto.map);
        var center =[];
        center['Latitudine'] = lat;
        center['Longitudine'] = lng;
        this.addCentroOnMap(center); 
        this.centersLayer.eachLayer(function (marker) {
            marker.dragging.enable(); // abilito il dragging del marker
        });
    }
   
    /**
     * Metodo che consente di aggiungere un marker relativo al centro dell'area sulla mappa.
     *  
     * @param {array} centro Contiene la latitudine e la longitudine del centro.
     */
    addCentroOnMap(centro){
        var markerCentro = L.marker([centro['Latitudine'], centro['Longitudine']], {draggable:false, title:centro['Nome']})
            .on('dragend', function() {
                var coordinate = String(markerCentro.getLatLng()).replace("LatLng", "");
                var coordinate = coordinate.split(',');
                var coordinateNuove = {Latitudine:coordinate[0].replace("(",""), Longitudine:coordinate[1].replace(")","")};
                });      
        this.centersLayer.addLayer(markerCentro);
    }
    
    /**
     * Funzione che elimina il centro dal layer area e controlla che il centro sia contenuto nel bound dell'area.
     * 
     * @returns {object} Array associativo con indice è Contenuto e valore true se il centro è contenuto nell'area, false se non lo è. L'altro indice è Centro che contiene una stringa del tipo POINT(longitudine latitudine)
     */
    centroContenutoInArea(){
       
        var oggetto = this;
        var latitudine = '';
        var longitudine = '';
        this.centersLayer.eachLayer(function (marker) {
            marker.dragging.disable();// per disabilitare il dragging
            var coordinate = String(marker.getLatLng()).replace("LatLng", "");
            var coordinate = coordinate.split(',');
            latitudine = coordinate[0].replace("(","");
            longitudine = coordinate[1].replace(")","");
            longitudine = longitudine.replace(" ","");
            
        });
        oggetto.centersLayer.remove();
        oggetto.centersLayer = '';
        var centro = "POINT(" + longitudine + " " + latitudine + ")";
        var contenuto = this.puntoContenutoInArea(latitudine, longitudine);                
        var risultato = {Contenuto: contenuto, Centro: centro};
        return risultato;
    }
   
    /**
     * Metodo che consente di controllare se un punto è contenuto all'interno del bound di un'area.
     * 
     * @param {double} lat La latitudine del punto
     * @param {double} lng La longitudine del punto
     * @returns {boolean} true se è contenuto, false altrimenti
     */
    puntoContenutoInArea(lat, lng)
    {
        var oggetto = this;
        var latlng = L.latLng(lat, lng);
        var polygon = '';
        if(this.idNuovoLayer!=='')
        {
            polygon = this.areeLayer.getLayer(oggetto.idNuovoLayer);
        }
        else
        {
            polygon = this.areeLayer.getLayer(oggetto.idEventoPassato);
        }
       
        var bound = polygon.getBounds();
        var contenuto = bound.contains(latlng); // il centro è contenuto all'interno del bound dell'area?
        return contenuto;    
    }
    
    addLinkOnMap(dati)
    {
        var oggetto = this;
        if($('#link').hasClass('disattivato'))
        {
            this.linksLayer = L.featureGroup();
            this.linksLayer.addTo(this.map);
            this.linksLayer.bringToFront(); // per il momento potrebbe andare bene perchè lo voglio avanti rispetto alla mappa delle probabilità iniziali. ma successivamente potrebbe essere necessario usare setZIndex()
            this.info.update();
            this.linksLayer.on('layeradd', changeColorLayer);
            var punto1 = dati['CentroAreaStart'];
            var punto2 = dati['CentroAreaEnd'];
            dati['NomeAreaPropagation'] = dati['NomeAreaEnd'];;
            this.addLink(punto1, punto2, dati);
            this.linksLayer.bringToFront();
            this.linksLayer.off('layeradd', changeColorLayer);
            $('#link.disattivato').click();
        }
        else{
            this.linksLayer.on('layeradd', changeColorLayer);
            var punto1 = dati['CentroAreaStart'];
            var punto2 = dati['CentroAreaEnd'];
            dati['NomeAreaPropagation'] = dati['NomeAreaEnd'];;
            this.addLink(punto1, punto2, dati);
            this.linksLayer.bringToFront();
            this.linksLayer.off('layeradd', changeColorLayer);
        }
    }
    
    changeColorLayer(layer)
    {
        var idLayer;
        var x;
        for(x in layer.target['_layers'])
        {
            idLayer = x;
        }
        var l = this.linksLayer.getLayer(idLayer);
//        var l = this.getLayer(idLayer);
        var lLayers = l.getLayers();
        var layerDaModificareColore = lLayers [0];
        layerDaModificareColore.setStyle({
            weight: 4,//spessore del tratto in pixel del link
            color: 'rgba(0,191,255,0.5)', // colore del tratto della confine
        });
        setTimeout(function(){
                layerDaModificareColore.setStyle({
            weight: 2,//spessore del tratto in pixel del link
            color: 'rgba(0,0,0,0.5)', // colore del tratto della confine
        });
            }, 2000);
    //    
    }
    /**
     * Aggiorna i dati del layer area dopo averli modificati
     *
     * @param {int} idLayer L'id del layer di cui si devono modificare le informazioni
     * @param {array} dati Array contenente i dati che si devono modificare e latitudine e longitudine.
     * @returns {undefined}
     */
    aggiornaArea(idLayer, dati){
        var oggetto = this; // memorizzo l'oggetto che richiama la funzione aggiornaArea
        var area = this.areeLayer.getLayer(idLayer);
        this.setStyleHighLightArea(area);
        area.setStyle({
                weight: 2, //spessore del tratto in pixel del feature
                opacity: 1, // opacità del feature 
                color: 'deepskyblue', // colore del tratto della confine
            });
        setTimeout(function(){
                oggetto.resetTargetStyle(area);
            }, 3000);
        if($("#probIniz").hasClass('attivato'))
        {
            area.feature.properties.probabilitaIniziale = dati['probabilitaIniziale'];
        }
        if($("#value").hasClass('attivato'))
        {
            area.feature.properties.peso = dati['peso'];
            var idValueLayer = area['feature']['properties']['idValueLayer'];
            var layerValue = this.valuesLayer.getLayer(idValueLayer);
            this.valuesLayer.removeLayer(layerValue);
            delete area['feature']['properties']['idValueLayer'];
            var latlng = L.latLng(dati['latitudine'], dati['longitudine']);
            var icon = L.divIcon({
                html: dati['peso'],
                iconSize: [10, 10],
                className: 'iconCircle modificato' 
            });
            var valueLayer = L.marker(latlng, {
                icon: icon
            });
            this.valuesLayer.addLayer(valueLayer);
            idValueLayer = this.valuesLayer.getLayerId(valueLayer);
            area['feature']['properties']['idValueLayer'] = idValueLayer;
            zoom_based_layerchange();
            changeColorIconValue();
            $('.modificato').removeClass('modificato');

        }
        area.bringToFront();
        this.info.update();
    }

    /**
     * Metodo che consente di aggiornare un link modificato.
     * Aggiorna il contenuto del popup, aggiunge il tasto update se nella mappa è attiva la mappa di rischio o 
     * di propagazione degli incendi. Modifica momentaneamente il colore del link.
     */
    aggiornaLink(){
        var probProp = $('.closeModifyLinkSuccess').attr('data-probProp');
        var linkEventParent = this.linkEventoPassato._eventParents;
        var contenutoPopup ;
        for (var idLinkEventParent in linkEventParent) { 
            //contenutoPopup = linkEventParent[idLinkEventParent].getLayers()[0]._popup._content;
            contenutoPopup = linkEventParent[idLinkEventParent].getLayers()[0].getPopup().getContent(); // il contenuto del popup
            var contenuto = contenutoPopup.split(":");
            contenuto[3] = probProp;
            var nuovoContenuto = contenuto[0] + ":" + contenuto[1] + ":" + contenuto[2] + ": " + contenuto[3];
            linkEventParent[idLinkEventParent].getLayers()[0].setPopupContent(nuovoContenuto);
        }
          
        var layers = this.linkEventoPassato.getLayers();
        layers[1].setStyle({
            weight: 4,//spessore del tratto in pixel del link
            color: 'rgba(0,191,255,0.5)', // colore del tratto della confine
        });
        setTimeout(function(){
            layers[1].setStyle({
            weight: 2,//spessore del tratto in pixel del link
            color: 'rgba(0,0,0,0.5)', // colore del tratto della confine
            });
        }, 3000);
        if($('#fireProp').hasClass('attivato') || $('#simulatefireProp').hasClass('attivato') || $('#risk').hasClass('attivato')|| $('#simulaterisk').hasClass('attivato'))
        {
           addUpdateButton();
        }
        this.linkEventoPassato = '';
        this.info.update();
    }
    /**
     * Metodo che consente di modificare un'area sulla mappa. L'area da modificare è quella il cui id è contenuto in
     * __idEventoPassato quindi l'area per deve essere stata cliccata.
     * @param {type} daModificare
     */
    modificaAreaOnMap(daModificare){
        this.aggiornaArea(this.idEventoPassato, daModificare);
        if($('#fireProp').hasClass('attivato') || $('#simulatefireProp').hasClass('attivato') || $('#risk').hasClass('attivato')|| $('#simulaterisk').hasClass('attivato'))
        {
           addUpdateButton();
        }
    }
    
    /**
     * Metodo che consente di annullare l'operazione di inserimento di un'area.
     */
    annullaInserimentoArea(){
        if(this.idNuovoLayer !== '')
        {
            // si recupera l'ultima area inserita
            var area = this.areeLayer.getLayer(this.idNuovoLayer);
            if($("#value").hasClass('attivato'))
            {
                // rimuovo le info dei pesi relativa all'area che si stava inserendo
                var idValueLayer = area.feature.properties.idValueLayer;
                this.valuesLayer.removeLayer(idValueLayer);
            }
            // rimuovo l'area inserita
            this.areeLayer.removeLayer(area);
            this.idNuovoLayer = '';
        }
        if(typeof(this.centersLayer) !== 'undefined' && this.centersLayer !== '' )
        {
            // caso in cui si stava inserendo l'area e si era arrivati a modificare il centro dell'area
            this.centersLayer.remove();
            this.centersLayer = '';
        }
    }
    
    /**
     * Metodo che consente di annullare l'operazione di inserimento di un link. 
     * Rimposta delle aree, elimina i gestori di evento per il click e il doubleclick relativi all'inserimento di un link,
     * riaggiunge il gestore per l'evento click di ogni area per tutti i browser, 
     * e i gestori per l'evento click, mouseover, mouseout per tutti i browser che non
     * siano IE o Edge.
     * 
     */
    annullaInserimentoLink(){
        delete mappaCorsicaGeoSafe.infoMap['infoLink'];
        var oggetto = this;
        // riabilito per ogni layer di areeLayer i vecchi
        var layers = this.areeLayer.getLayers();
        $.each(layers, function(indice, layer)
        {
            oggetto.resetTargetStyle(layer);
            layer.off('click', onClick);
            oggetto.map.doubleClickZoom.enable(); 
            layer.off('dblclick', onDoubleClick);
            // riaggiungo sulle aree i vecchi listener
            
            if (L.Browser.ie || L.Browser.edge)
            {
                layer.on('click', clickFeature);
            }
            else
            {
                layer.on('click', clickFeature);
                layer.on('mouseover', highlightFeatureInitialMap);
                layer.on('mouseout', resetHighlightInitialMap);
            }
        });
    }
    
    /**
     * Metodo che rimuove l'area appena aggiunta dalla mappa
     */
    removeAreaAppenaAggiunta(){
        this.areeLayer.removeLayer(this.idNuovoLayer);
        this.idNuovoLayer = '';
    }
    /**
    * Funzione che consente di rimuovere il layer relativo alla mappa dei pesi
    *  (rimuove la visualizzazione della mappa dei pesi) e le informazioni relative alla mappa dei pesi dal layer delle aree della mappa, 
    *  poi aggiorna le informazioni.
    * 
    * @function
    * @name removeValueFromMap
    */
    removeValueFromMap(){
        var layerAree = this.areeLayer.getLayers(); // memorizzo i layer delle aree
        this.valuesLayer.remove();
        $.each(layerAree, function(indice, layer) {
            delete layer['feature']['properties']['peso'];
            delete layer['feature']['properties']['idValueLayer'];
        });
        this.valuesLayer = '';
        this.info.update();
    }
    
    removeLinksMap(){
        this.linksLayer.remove();
        this.linksLayer = '';
        this.linkEventoPassato = '';
        this.info.update();
    }
    
    removeMap(nomeMappa){
        var id ;
        switch(nomeMappa){
            case 'probabilitaIniziale':
                id = '#probIniz';
                break;
            case 'probabilitaPropagazione':
                id = '#fireProp';
                break; 
            case 'risk':
                id = '#risk';
                break; 
            case 'simulaterisk':
                id = '#simulaterisk';
                break; 

            case 'simulateprobabilitaPropagazione':
                id = '#simulatefireProp';
                break; 
            
        }
        // devo eliminare le vecchie informazioni sulla mappa
        this.info.update();
        this.legend.remove();
        $(id).removeClass( "attivato" ).addClass( "disattivato" );
        var oggetto = this; // memorizzo l'oggetto che ha richiamato la funzione
        var areee = this.areeLayer.getLayers(); 
        
        $.each(areee, function(index, area){
            oggetto.setStyleInitialMap(area);
            {
                delete area.feature.properties[nomeMappa];
            }
        });
        this.info.update();
    }
    
    /**
     * Metodo che consente di rimuovere un link dalla mappa. 
     */
    removeLinkFromMap(){
        var oggetto = this;
        var layers = this.linkEventoPassato.getLayers();
        layers[1].setStyle({
            weight: 4,//spessore del tratto in pixel del link
            color: 'rgba(0,191,255,0.5)', // colore del tratto della confine
        });
        var linky = this.linkEventoPassato._eventParents;
        var d;
        $.each(linky, function (index, layer)
        {
                d = oggetto.linksLayer.getLayer(layer._leaflet_id);
        });
        this.linkEventoPassato.off('click');
        setTimeout(function(){
            oggetto.linksLayer.removeLayer(d);
        }, 2000);
        this.linkEventoPassato = '';
        if($('#fireProp').hasClass('attivato') || $('#simulatefireProp').hasClass('attivato') || $('#risk').hasClass('attivato')|| $('#simulaterisk').hasClass('attivato'))
        {
           addUpdateButton();
        }
        this.info.update(); 
    }
    
    /**
     * Metodo che consente di eliminare un'area dalla mappa. 
     * L'area è quella il cui id è contenuto in
     * __idEventoPassato. 
     * @returns {undefined}
     */
    removeAreaFromMap(){
        var oggetto = this;
        var area = this.areeLayer.getLayer(this.idEventoPassato);
        area.off('click', clickFeature);
        area.off('mouseover', highlightFeatureInitialMap);
        area.off('mouseout', resetHighlightInitialMap);
        if($("#link").hasClass('attivato'))
        {
           $('#link.attivato').click();
           $('#link.disattivato').click();
        }
        area.setStyle({
            weight: 3,//spessore del tratto in pixel del layer che sarebbe l'area
            color: 'deepskyblue', // colore del tratto del confine
            dashArray: '',
            fillOpacity: 0.01 // opacità del riempimento
        });
        
        if($("#value").hasClass('attivato'))
        {
            var idValueLayer = area.feature.properties.idValueLayer;
            this.valuesLayer.removeLayer(idValueLayer);
        }
        setTimeout(function(){
            oggetto.areeLayer.removeLayer(area);
        }, 2000);
        if($('#fireProp').hasClass('attivato') || $('#simulatefireProp').hasClass('attivato') || $('#risk').hasClass('attivato')|| $('#simulaterisk').hasClass('attivato'))
        {
           addUpdateButton();
        }
        this.idEventoPassato = '';
        this.info.update();
    }
    
   
    
    aggiornaMappa(nomeProbProp, task){
//        var areee = getAreeLayer();
        var oggetto = this; // memorizzo l'oggetto che ha richiamato la funzione
        var areee = this.areeLayer.getLayers();
        $.each(areee, function(index, area){
            $.each(nomeProbProp, function( index, value ) {
                if(value['Nome'] === area.feature.properties.nome)
                {
                    //area.feature.properties.probabilitaPropagazione
                    if(task==='risk')
                    {
                        area['feature']['properties']['risk'] = value['Rischio'];
                        oggetto.setStyleFireRiskMap(area);
                    } if(task==='simulaterisk')

                    {
                        area['feature']['properties']['risk'] = value['Rischio'];
                        oggetto.setStyleFireSimulateRiskMap(area);
                    }
                    if(task==='firePropagation')
                    {
                        area['feature']['properties']['probabilitaPropagazione'] = value['ProbabilitaPropagazioneIncendi'];
                        oggetto.setStyleFirePropagationProbabilityMap(area);
                    }
                    if(task==='simulatefirePropagation')
                    {
                        area['feature']['properties']['probabilitaPropagazione'] = value['ProbabilitaPropagazioneIncendi'];
                        oggetto.setStyleFireSimulatePropagationProbabilityMap(area);
                    }
                }
            });
        });
        this.info.update();
    }

    /**
    * Funzione che permette di impostare lo style iniziale per ogni area.
    * 
    * @param {GeoJSON Feature object} GeoJSON Feature object a cui vogliamo applicare lo style. 
    * @returns {object} Le path option della classe astratta Path. http://leafletjs.com/reference-1.1.0.html#path-option
    */
    mapStyle(feature) { 
       if($('#probIniz').hasClass('attivato'))
       {
           return {
               fillColor: this.getInitialProbabilityColor(feature.properties.probabilitaIniziale), // fillColor è il colore di riempimento
               weight: 2, //spessore del tratto in pixel del feature
               opacity: 1, // opacità del feature 
               color: 'white', // colore del tratto della confine
               dashArray: '', // la lunghezza del tratto del tratteggio del confine
               fillOpacity: 0.7  // opacità del riempimento
           }
       }
       else
       {
           return {
               weight: 2, //spessore del tratto in pixel del feature
               opacity: 1, // opacità del feature 
               color: 'white', // colore del tratto della confine
               dashArray: '', // la lunghezza del tratto del tratteggio del confine
               fillOpacity: 0.01  // opacità del riempimento
           }; 
       }
   }

    /**
     * Funzione per poter aggiungere i listener al layer. Questa funzione sarà usata nell'opzione onEachFeature.
     * Per Browser IE o Edge collega una funzione gestore dell'evento click (clickFeature). Questo perchè
     * la funzione bringToFront() di leaflet non funziona con bene con questi due browser.
     * Per gli altri browsers collega una funzione gestore di eventi per click, una per il mouseover e una per l'evento mouseout.
     * 
     * @param {GeoJSON Feature object} GeoJSON Feature object relativo al layer. 
     * @param {Layer object} layer Un oggetto Layer di Leaflet a cui vogliamo alcuni comportamenti.
     */
    onEachFeatureInitialMap(feature, layer) {
        if (L.Browser.ie || L.Browser.edge)
        {
            layer.on({
                click: clickFeature
            });
        }
        else{
        //Collega un event handler per uno o più eventi agli elementi selezionati che in questo caso è layer.
            layer.on({
                mouseover: highlightFeatureInitialMap,
                mouseout: resetHighlightInitialMap,
                click: clickFeature
            });
        }
    }
    

    /**
    * Funzione che implementa la stessa funzionalità dell'evento mouseover(quest'ultimo evento inesistente nei dispositivi mobili).
    * Per cui evidenzia l'area cliccata e ne indica alcune informazioni.
    * 
    * @param {Event object} e L'evento click contenente il tipo di evento(click in questo caso), il layer target e informazioni sulle coordinate in cui si è avuto il click.
    */
    clickFeature(e) {
        if(this.linkEventoPassato !== '')
        {
            var layers = this.linkEventoPassato.getLayers();
            layers[1].setStyle({
                weight: 2,//spessore del tratto in pixel del link
                color: 'rgba(0,0,0,0.5)', // colore del tratto della confine
            });
            this.info.update();
            this.linkEventoPassato.closePopup();
            this.linkEventoPassato = '';
        }
        
        if(this.idEventoPassato !== '')
        {
            var layerEventPassato = this.areeLayer.getLayer(this.idEventoPassato);
            this.resetTargetStyle(layerEventPassato);
        }

        //accesso al livello che è stato mosso attraverso e.target,
        var area = e.target;// event listener for area mouseover event 

        //impostato un bordo grigio spesso sullo strato come il nostro effetto di evidenziazione,
        // portandolo anche sul davanti in modo che il confine non si scontri con stati vicini.
        this.setStyleHighLightArea(area);

        this.info.update();

        if($( "#value" ).hasClass( "attivato" ))
        {
            // devo aggiungere il peso dell'area
            $.each(this.aree['features'], function(indice, feature)
            {
                if(feature['properties']['nome']=== area.feature.properties.nome)
                {
                    area.feature.properties.peso = feature['properties']['peso'];
                }
            });
        }
        //Browser è un namespace con proprietà statiche per il rilevamento del browser/funzionalità utilizzate da Leaflet internamente.
       //Porta questo popup di fronte a altri popup (nello stesso riquadro della mappa).
        area.bringToFront();
        if($( "#link" ).hasClass( "attivato" ))
        {
            this.linksLayer.bringToFront();
        }
        // update() Aggiorna il contenuto del popup, il layout e la posizione. Utile per aggiornare il popup dopo che qualcosa all'interno è stato modificato.
        this.info.update(area.feature.properties);
        this.idEventoPassato = e.target._leaflet_id; // l'id del layer che ha innescato l'evento.
  

   }
   
   /**
    * Funzione che consente di evidenziare un'area quando il mouse passa sopra l'area. 
    * 
    * @param {Event object} e L'evento mouseover
    */
    highlightFeatureInitialMap(e) {
        // tutti gli eventi possiedono 2 proprietà: type e target
        // type contiene la stringa tipo di evento. per esempio 'click'
        // target contiene l'oggetto che ha innescato l'evento.

        //accesso al livello che è stato mosso attraverso e.target,
        var area = e.target;// event listener for area mouseover event 

        // imposta lo style dell'area 
        this.setStyleHighLightArea(area);
        this.info.update();
        //Porta questa area avanti rispetto alle altre aree.
        area.bringToFront();
        // nel caso ci sia la mappa dei link attiva, porta la mappa dei link in primo piano.
        if($( "#link" ).hasClass( "attivato" ))
        {
            
            this.linksLayer.bringToFront();
        }
        this.info.update(area.feature.properties); // need to update the control when the user hovers over a state
    }

    /**
     * Funzione che definisce il comportamento del mouseout event resettando lo style 
     * a quello di default e aggiornando l'info control.
     * 
     * @param {Event object} e L'evento mouseout
     */
    resetHighlightInitialMap(e) {
        if($('#logOut').length )
        {
            //  se un'area è stata cliccata in precedenza  e possiede un id diverso dall'id dell'area interessata dal mouseout, allora resetta lo style dell'area interessata dall'evento
            if(e.target._leaflet_id !== this.idEventoPassato )
            {
                var layer = this.areeLayer.getLayer(e.target._leaflet_id);
                this.resetTargetStyle(layer);
                if(this.idEventoPassato!=='')
                {
                    // porta il primo piano l'area cliccata in precedenza
                    var area = this.areeLayer.getLayer(this.idEventoPassato);
                    area.bringToFront();
                }
            }
        }
        else
        {
            var layer = this.areeLayer.getLayer(e.target._leaflet_id);
            this.resetTargetStyle(layer);
        }
        this.info.update();
    }
/*------------------------------------------map style method-----------------------------------------------------*/
    
    /**
     * Funzione che resetta lo style di un layer passato come parametro
     * allo style di default e aggiorna l'info control(Il div in cui sono presenti 
     * alcune informazioni della mappa). Il layer appartiene al geoJSON layer areeLayer
     * 
     * @param {Layer object} layer (leaflet leayer)di areeLayer di cui si vuole resettare lo style
     */
    resetTargetStyle(layer) {
        if($('#probIniz').hasClass('attivato') || $('#simulatefireProp').hasClass('attivato') || $('#fireProp').hasClass('attivato') || $('#risk').hasClass('attivato')|| $('#simulaterisk').hasClass('attivato'))
        {
            if($('#probIniz').hasClass('attivato'))
            {
                this.setStyleInitialProbabilityMap(layer);
            }
            else if($('#fireProp').hasClass('attivato'))
            {
                this.setStyleFirePropagationProbabilityMap(layer);
            }
            else if($('#simulatefireProp').hasClass('attivato'))
            {
                this.setStyleFireSimulatePropagationProbabilityMap(layer);
            } 

            else if($('#simulaterisk').hasClass('attivato'))
            {
                this.setStyleFireSimulateRiskMap(layer);
            }
            else
            {
                this.setStyleFireRiskMap(layer);
            }
        }
        else
        {
            this.areeLayer.resetStyle(layer);
        }
        this.info.update();
    }
    
    /**
     * Metodo che imposta lo style di un'area.
     * Controlla se e quale mappa è attiva e in base a ciò sceglie lo style da impostare.
     * 
     * @param {Layer object} area Il Layer dell'area (L.Layer) di cui voglio modificare lo style.
     */
    setStyleHighLightArea(area)
    {
         if($('#probIniz').hasClass('attivato') || $('#fireProp').hasClass('attivato') || $('#simulatefireProp').hasClass('attivato')|| $('#risk').hasClass('attivato')|| $('#simulaterisk').hasClass('attivato'))
        {
            if($('#probIniz').hasClass('attivato'))
            {
                this.setStyleHighLightInitialProbabilityMap(area);
            }
            else if($('#fireProp').hasClass('attivato'))
            {
                this.setStyleHighLightFirePropagationProbabilityMap(area);
            } 
            else if($('#simulatefireProp').hasClass('attivato'))
            {
                this.setStyleHighLightFireSimulatePropagationProbabilityMap(area);
            } 
            else if($('#simulaterisk').hasClass('attivato'))
            {
                this.setStyleHighLightSimulateRiskMap(area);
            }
            else
            {
                this.setStyleHighLightRiskMap(area);
            }
        }
        else
        {
            this.setStyleHighLightInitialMap(area);
        }
    }
    
    /**
     * Metodo che imposta lo style di un'area cliccata quando è attivo la mappa delle propagazioni iniziali.
     * 
     * @param {Layer object} area Il Layer dell'area (L.Layer) di cui voglio modificare lo style.
     */
    setStyleHighLightInitialProbabilityMap(area){ 
        var oggetto = this; // oggetto che richiama la funzione
        area.setStyle({
                fillColor: oggetto.getInitialProbabilityColor(area.feature.properties.probabilitaIniziale),
                weight: 5, //spessore del tratto in pixel del feature
                color: '#666', // colore del tratto della confine
                dashArray: '', // la lunghezza del tratto del tratteggio del confine
                fillOpacity: 1  // opacità del riempimento  
        });
    }

    /**
     * Metodo che imposta lo style di un'area cliccata quando è attivo la mappa delle probabilità di propagazione degli incendi .
     * 
     * @param {Layer object} area Il Layer dell'area (L.Layer) di cui voglio modificare lo style.
     */
    setStyleHighLightFirePropagationProbabilityMap(area){ 
        var oggetto = this; // oggetto che richiama la funzione
        area.setStyle({
                fillColor: oggetto.getFirePropagationProbabilityColor(area.feature.properties.probabilitaPropagazione), 
                weight: 5, //spessore del tratto in pixel del feature
                color: '#666', // colore del tratto della confine
                dashArray: '', // la lunghezza del tratto del tratteggio del confine
        });
    }

    setStyleHighLightFireSimulatePropagationProbabilityMap(area){ 
        var oggetto = this; // oggetto che richiama la funzione
        area.setStyle({
                fillColor: oggetto.getFireSimulatePropagationProbabilityColor(area.feature.properties.probabilitaPropagazione), 
                weight: 5, //spessore del tratto in pixel del feature
                color: '#666', // colore del tratto della confine
                dashArray: '', // la lunghezza del tratto del tratteggio del confine
        });
    }
    
    
    /**
    * Metodo che imposta lo style di un'area cliccata quando è attivo la mappa di rischio è attiva .
    * 
    * @param {Layer object} area Il Layer dell'area (L.Layer) di cui voglio modificare lo style.
    */
    setStyleHighLightRiskMap(area){ 
        var oggetto = this; // oggetto che richiama la funzione
        area.setStyle({
                fillColor: oggetto.getFireRiskColor(area.feature.properties.risk), 
                weight: 5, //spessore del tratto in pixel del feature
                color: '#666', // colore del tratto della confine
                dashArray: '', // la lunghezza del tratto del tratteggio del confine
                fillOpacity: 1  // opacità del riempimento  
        });
    }

    setStyleHighLightSimulateRiskMap(area){ 
      var oggetto = this; // oggetto che richiama la funzione
        area.setStyle({
                fillColor: oggetto.getFireSimulateRiskColor(area.feature.properties.risk), 
                weight: 5, //spessore del tratto in pixel del feature
                color: '#666', // colore del tratto della confine
                dashArray: '', // la lunghezza del tratto del tratteggio del confine
                fillOpacity: 1  // opacità del riempimento  
        });
    }
    
   

    /**
    * Metodo che imposta lo style iniziale di un'area cliccata se non vi è alcuna mappa cliccata ma solo la mappa iniziale.
    * 
    * @param {Layer object} area Il Layer dell'area (L.Layer) di cui voglio modificare lo style.
    */
    setStyleHighLightInitialMap(area){
        area.setStyle({
            weight: 5,//spessore del tratto in pixel del layer che sarebbe l'area
            color: '#666', // colore del tratto della confine
            dashArray: '',
            fillOpacity: 0.01 // opacità del riempimento
        });
    }

    /**
    * Metodo che imposta lo style iniziale di un'area non cliccata se vi è la mappa delle probabilità iniziali attiva.
    * 
    * @param {Layer object} area Il Layer dell'area (L.Layer) di cui voglio modificare lo style.
    */
    setStyleInitialProbabilityMap(area){
        var oggetto = this;
        area.setStyle({
            fillColor: oggetto.getInitialProbabilityColor(area.feature.properties.probabilitaIniziale), 
            weight: 2, //spessore del tratto in pixel del feature
            opacity: 1, // opacità del feature 
            color: 'white', // colore del tratto della confine
            dashArray: '', // la lunghezza del tratto del tratteggio del confine
            fillOpacity: 0.7  // opacità del riempimento
        });
    }

    /**
     * Metodo che imposta lo style iniziale di un'area non cliccata se vi è la mappa di probabilità di propagazione degli incendi attiva.
     * 
     * @param {Layer object} area Il Layer dell'area (L.Layer) di cui voglio modificare lo style.
     */
    setStyleFirePropagationProbabilityMap(area){
        var oggetto = this; // oggetto che richiama la funzione
        area.setStyle({
            fillColor: oggetto.getFirePropagationProbabilityColor(area.feature.properties.probabilitaPropagazione), 
            weight: 2, //spessore del tratto in pixel del feature
            opacity: 1, // opacità del feature 
            color: 'white', // colore del tratto della confine
            dashArray: '', // la lunghezza del tratto del tratteggio del confine
            fillOpacity: 0.7  // opacità del riempimento
        });
    }

    setStyleFireSimulatePropagationProbabilityMap(area){
        var oggetto = this; // oggetto che richiama la funzione
        area.setStyle({
            fillColor: oggetto.getFireSimulatePropagationProbabilityColor(area.feature.properties.probabilitaPropagazione), 
            weight: 2, //spessore del tratto in pixel del feature
            opacity: 1, // opacità del feature 
            color: 'white', // colore del tratto della confine
            dashArray: '', // la lunghezza del tratto del tratteggio del confine
            fillOpacity: 0.7  // opacità del riempimento
        });
    }


 
    /**
     * Metodo che imposta lo style iniziale di un'area non cliccata se vi è la mappa di rischio attiva.
     * 
     * @param {Layer object} area Il Layer dell'area (L.Layer) di cui voglio modificare lo style.
     */
    setStyleFireRiskMap(area)
    {
        var oggetto = this; // oggetto che richiama la funzione
        area.setStyle({
            fillColor: oggetto.getFireRiskColor(area.feature.properties.risk), 
            weight: 2, //spessore del tratto in pixel del feature
            opacity: 1, // opacità del feature 
            color: 'white', // colore del tratto della confine
            dashArray: '', // la lunghezza del tratto del tratteggio del confine
            fillOpacity: 0.7  // opacità del riempimento
        });
    }
    setStyleFireSimulateRiskMap(area)
    {
        var oggetto = this; // oggetto che richiama la funzione
        area.setStyle({
            fillColor: oggetto.getFireSimulateRiskColor(area.feature.properties.risk), 
            weight: 2, //spessore del tratto in pixel del feature
            opacity: 1, // opacità del feature 
            color: 'white', // colore del tratto della confine
            dashArray: '', // la lunghezza del tratto del tratteggio del confine
            fillOpacity: 0.7  // opacità del riempimento
        });
    }

    /**
     * Metodo che imposta lo style iniziale di un'area non cliccata se non vi alcuna mappa attiva.
     * 
     * @param {Layer object} area Il Layer dell'area (L.Layer) di cui voglio modificare lo style.
     */
    setStyleInitialMap(area){
        area.setStyle({
            weight: 2, //spessore del tratto in pixel del feature
            opacity: 1, // opacità del feature 
            color: 'white', // colore del tratto della confine
            dashArray: '', // la lunghezza del tratto del tratteggio del confine
            fillOpacity: 0.01  // opacità del riempimento
        });
    }

    /**
     * Funzione che permette di ottenere il colore sulla base della probabilità iniziale passata come parametro.
     * 
     * @function
     * @name getInitialProbabilityColor
     * @param {double} initialProbability
     * @returns {String} Il colore o meglio la tripla RGB di numeri esadecimali. 
     */
    getInitialProbabilityColor(initialProbability){
        //  condizione ? istruzione1; : istruzione2; 
        return initialProbability >= 0.1 ? '#800026' :
               initialProbability >= 0.08 ? '#BD0026' :
               initialProbability >= 0.05 ? '#E31A1C' :
               initialProbability >= 0.03 ? '#FC4E2A' :
               initialProbability >= 0.01 ? '#FD8D3C' :
               initialProbability >= 0.008 ? '#FEB24C' :
               initialProbability >= 0.006 ? '#FED976' :
               initialProbability >= 0.004 ? '#FFEDA0' :
               initialProbability >= 0.002 ? '#FFFFCC' :
                          '#FFFFFF';             
    }
    
    /**
    * Funzione che permette di ottenere il colore sulla base della probabilità di propagazione degli incendi passata come parametro.
    * 
    * @param {double} firePropagationProbability
    * @returns {String} Il colore o meglio la tripla RGB di numeri esadecimali. 
    */
    getFirePropagationProbabilityColor(firePropagationProbability){
        //  condizione ? istruzione1; : istruzione2; 
        return firePropagationProbability >= 0.09 ? '#800026' :
               firePropagationProbability >= 0.08 ? '#BD0026' :
               firePropagationProbability >= 0.07 ? '#E31A1C' :
               firePropagationProbability >= 0.06 ? '#FC4E2A' :
               firePropagationProbability >= 0.05 ? '#FD8D3C' :
               firePropagationProbability >= 0.04 ? '#FEB24C' :
               firePropagationProbability >= 0.03 ? '#FED976' :
               firePropagationProbability >= 0.02 ? '#FFEDA0' :
               firePropagationProbability >= 0.01 ? '#FFFFCC' :
                          '#FFFFFF';             
    }
    
    /**
    * Funzione che permette di ottenere il colore sulla base della differenza della probabilità di propagazione dovuta alla simulazione.
    * 
    * @param {double} firePropagationProbability
    * @returns {String} Il colore o meglio la tripla RGB di numeri esadecimali. 
    */
    
    getFireSimulatePropagationProbabilityColor(firePropagationProbability){
        //  condizione ? istruzione1; : istruzione2; ;             
        // dal più scuro al piu' chiaro
        return firePropagationProbability >= 0.09 ? '#183c17' :
               firePropagationProbability >= 0.08 ? '#1c5a1e' :
               firePropagationProbability >= 0.07 ? '#1c7923' :
               firePropagationProbability >= 0.06 ? '#169928' :
               firePropagationProbability >= 0.05 ? '#00bb2d' :
               firePropagationProbability >= 0.04 ? '#54c754' :
               firePropagationProbability >= 0.03 ? '#7dd377' :
               firePropagationProbability >= 0.02 ? '#a0df98' :
               firePropagationProbability >= 0.01 ? '#c1eaba' :
                          '#FFFFFF';             
    }

    /**
     * Funzione che permette di ottenere il colore sulla base del rischio passato come parametro.
     * 
     * @param {double} firePropagationProbability
     * @returns {String} Il colore o meglio la tripla RGB di numeri esadecimali. 
     */
    getFireRiskColor(risk){
        //  condizione ? istruzione1; : istruzione2; 
        return risk >= 0.9 ? '#800026' :
               risk >= 0.8 ? '#BD0026' :
               risk >= 0.7 ? '#E31A1C' :
               risk >= 0.6 ? '#FC4E2A' :
               risk >= 0.5 ? '#FD8D3C' :
               risk >= 0.4 ? '#FEB24C' :
               risk >= 0.3 ? '#FED976' :
               risk >= 0.2 ? '#FFEDA0' :
               risk >= 0.1 ? '#FFFFCC' :
                          '#FFFFFF';             
    }

    getFireSimulateRiskColor(risk){
        //  condizione ? istruzione1; : istruzione2; 
        // dal più scuro al piu' chiaro
        return risk >= 0.9 ? '#183c17' :
               risk >= 0.8 ? '#1c5a1e' :
               risk >= 0.7 ? '#1c7923' :
               risk >= 0.6 ? '#169928' :
               risk >= 0.5 ? '#00bb2d' :
               risk >= 0.4 ? '#54c754' :
               risk >= 0.3 ? '#7dd377' :
               risk >= 0.2 ? '#a0df98' :
               risk >= 0.1 ? '#c1eaba' :
                          '#FFFFFF';             
    }

    /**
     * Funzione che permette di trovare il punto passandogli una stringa del tipo POINT(2 3)
     * 
     * @param {string} punto
     * @returns {array} array contenente le coordinate del punto
     */      
    trovaPunto(punto)
    {
        punto  = punto.replace("POINT(", "");
        punto  = punto.replace(")", "");
        punto = punto.split(" ");
        var centro = Array();
        centro['Longitudine']=punto[0];
        centro['Latitudine']=punto[1];
        return centro;
    }
    
    /**
     * Metodo che consente di disabilitare i lister delle aree della mappa e ne aggiunge/abilita
     * i listener sulle aree per inserimento di un link.
     * 
     */
    abilitaListerInserimentoLink(){
        // disabilitare il double click dello zoom
        this.map.doubleClickZoom.disable();
        // disabilito per ogni layer di areeLayer i listener delle aree
        var layers = this.areeLayer.getLayers();
        $.each(layers, function(indice, layer)
        {
            // elimino sulle aree i vecchi 
            if (L.Browser.ie || L.Browser.edge)
            {
                layer.off('click', clickFeature);
            }
            else
            {
                layer.off('click', clickFeature);
                layer.off('mouseover', highlightFeatureInitialMap);
                layer.off('mouseout', resetHighlightInitialMap);
            }
            layer.on('dblclick', onDoubleClick);
            layer.on('click', onClick);
        });
        this.info.update();
    }
    
    /**
     * Metodo che consente di disabilitare i listener sulle aree per inserimento di un link
     * e riabilita i lister delle aree della mappa.
     */
    disabilitaListerInserimentoLink()
    {
        delete mappaCorsicaGeoSafe.infoMap['infoLink'];
        var oggetto = this;
    // riabilito per ogni layer di areeLayer i vecchi
        var layers = this.areeLayer.getLayers();
        $.each(layers, function(indice, layer)
        {
            oggetto.resetTargetStyle(layer);
//            layer.off('click', infoAree);
            layer.off('click', onClick);
            oggetto.map.doubleClickZoom.enable(); 
//            layer.off('dblclick', selectArea);
            layer.off('dblclick', onDoubleClick);
            // layer.off('doubletap', selectArea);
            // riaggiungo sulle aree i vecchi listener
            if (L.Browser.ie || L.Browser.edge)
            {
                layer.on('click', clickFeature);
            }
            else
            {
                layer.on('click', clickFeature);
                layer.on('mouseover', highlightFeatureInitialMap);
                layer.on('mouseout', resetHighlightInitialMap);
            }
        });
    }
    
    /**
     * Metodo che viene richiamato quando si assegna ad un'area un comportamento legato all'evento click.
     * Click su un'area durante l'inserimento di un link.
     * 
     * @param {event} e
     */
    clickAreaDuranteInserimentoLink(e){
        if(this.linkEventoPassato !== '')
        {
            var layers = this.linkEventoPassato.getLayers();
            layers[1].setStyle({
                weight: 2,//spessore del tratto in pixel del link
                color: 'rgba(0,0,0,0.5)', // colore del tratto della confine
            });
            this.info.update();
            this.linkEventoPassato.closePopup();
        }
        if(this.idEventoPassato !== '')
        {
            if($('#probIniz').hasClass('attivato'))
            {
                var layerEventPassato = this.areeLayer.getLayer(this.idEventoPassato);
                if(typeof(this.layerEventoPassato) !=='undefined' && this.layerEventPassato.options.color==='#666')
                {
                    this.resetTargetStyle(layerEventPassato);
                }
            }
            else
            {
                var layerEventPassato = this.areeLayer.getLayer(this.idEventoPassato);
                if(layerEventPassato.options.color==='#666')
                {
                    this.resetTargetStyle(layerEventPassato);
                }
            }
        }


        //accesso al livello che è stato mosso attraverso e.target,
        var area = e.target;// event listener for area mouseover event 

        this.setStyleHighLightArea(area);   

    //Browser è un namespace con proprietà statiche per il rilevamento del browser/funzionalità utilizzate da Leaflet internamente.
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            //Porta questo popup di fronte a altri popup (nello stesso riquadro della mappa).
            area.bringToFront();
            if($( "#link" ).hasClass( "attivato" ))
            {
                this.linksLayer.bringToFront();
            }
        }
        // area.feature.properties contiene al momento il nome dell'area e la probabilità iniziale
        // update() Aggiorna il contenuto del popup, il layout e la posizione. Utile per aggiornare il popup dopo che qualcosa all'interno è stato modificato.
        this.info.update(area.feature.properties);
        this.idEventoPassato = e.target._leaflet_id; // l'id del layer che ha innescato l'evento.
    }
    
    /**
     * 
     * @param {Event} e
     */
    selectAreaInserimentoLink(e){
        var area = e.target;
        this.setStyleHighLightArea(area);
        area.setStyle({
                weight: 5,//spessore del tratto in pixel del layer che sarebbe l'area
                color: 'DeepSkyBlue', // colore del tratto della confine
            });
        area.bringToFront();
    }
    
    removeToolbarFromMap(){
        this.toolbar.remove();
        this.toolbar = '';
        this.info.update();
    }
    
    showCentersOnMap(centri){
        var oggetto = this;
        this.centersLayer = L.featureGroup();
        this.centersLayer.addTo(oggetto.map);
        $.each(centri, function(i, centro){
            oggetto.addCentroOnMap(centro);
        });
    }
}

var mappaCorsicaGeoSafe = new ClasseMappa();
