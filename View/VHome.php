<?php

/**
 * VHome manages and provides all the templates related to the home page.
 * La classe VHome eredita la classe View.
 * Gestisce e fornisce tutti i template relativi alla home page.
 *
 * @package View
 * @author Claudia Di Marco
 */
class VHome extends View {
    
    /**
     * Outputs the Home Page Template.
     * Metodo che restituisce la Home Page.
     * 
     * @access public
     */
    public function restituisciHomePage() 
    {
        $this->visualizzaTemplate("HomePageGeoSafe");  
    }

}
