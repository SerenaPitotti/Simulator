/**
 * Class representing a toolbar. 
 * Classe per creare una toolbar.
 * 
 * @class
 * @access public
 * @extends {L.Control}
 */
L.ToolbarControl = L.Control.extend({
 
    /**
     * The position of the toolbar. Possible values are 'topleft', 'topright', 'bottomleft' or 'bottomright'.
     * La posizione in cui collocare la toolbar.
     * 
     * @type {Object}
     * @property {string} options.position 
     */
    options: {
      position: 'topleft' 
    },

    
 
   /**
    * Method called when the toolbar is added to the map. 
    * Should return the container DOM element for the toolbar. 
    * Metodo invocato quando toolbar è creato e ritorna l'elemento DOM che lo contiene.
    * 
    * @override
    * @param {L.map} map 
    * @returns {L.DomUtil} 
    */ 
    onAdd: function (map) {
        var containerToolbar = L.DomUtil.create('div', 'leaflet-draw leaflet-control');
        // container per aggiungere un link  o un'area
        var container = L.DomUtil.create('div', 'leaflet-draw-section', containerToolbar);
        var x = L.DomUtil.create('div', 'leaflet-draw-toolbar leaflet-bar leaflet-draw-toolbar-top', container);
        var a = L.DomUtil.create('a', 'leaflet-draw-draw-polyline', x);
        var a = L.DomUtil.create('a', 'leaflet-draw-draw-polygon', x);
        
        return containerToolbar;
    }
});

/**
 * Factory function of L.ToolbarControl.
 * 
 * @param {Object} opts
 * @param {string} opts.position
 * @returns {L.ToolbarControl}
 */ 
L.toolbarControl = function(opts) {
    return new L.ToolbarControl(opts);
}

