<?php

/**
 * Funzione che consente di caricare le classi necessarie per l'applicazione
 * 
 * @author Claudia Di Marco 
 * @param string $nomeClasse Stringa contenente il nome della classe da caricare
 */
function GeoSafeAutoload($nomeClasse)
{
    /*
     * Il percorso completo e il nome del file con i link simbolici risolti.
     * Se utilizzato all'interno di un'inclusione, viene restituito il nome 
     * del file incluso. 
     */
    
    /*
     * DIRECTORY_SEPARATOR è una costante predefinita di PHP che contiene
     * il carattere utilizzato dal sistema operativo su cui gira il server
     *  per comporre i percorsi dei file.
     */
    
    
    /* potrei inserire questa funzione invece degli switch ma devo vedere bene 
     * cosa esce da dirname
     * $nomeFile = dirname(__FILE__).DIRECTORY_SEPARATOR.($nomeClasse).'.php';
     * if (is_readable($nomeFile))
     *  {
     *      require $nomeFile;
     *   }
     */
    
   
    // in __DIR__ è contenuta il percorso della cartella che contiene il file ma Autoloder.php non si trova in include ma in libs 
    // per questo bisogna eliminare include dal path
    $dir = explode(DIRECTORY_SEPARATOR, __DIR__); // tutte le parole che conpongono il path vengono memorizzate in un elemento dell'array $dir
    array_pop($dir);// elimino l'ultimo elemento (ovvero la parola include)
    $dir = implode(DIRECTORY_SEPARATOR, $dir);// riassemblo il path
    switch ($nomeClasse[0])
    {
        case'C':
            $nomeFile = $dir . '/Controller/' . $nomeClasse . '.php';
            if (is_readable($nomeFile))
            {
                require ($nomeFile);
            }
            break;
            
        case'E':
            $nomeFile = $dir . '/Entity/' . $nomeClasse . '.php';
            if (is_readable($nomeFile))
            {
                require ($nomeFile);
            }
            break;
            
        case'F':
            $nomeFile = $dir . '/Foundation/' . $nomeClasse . '.php';
            if (is_readable($nomeFile))
            {
                require ($nomeFile);
            }
            break;
            
        case'U':
            $nomeFile = $dir . '/Utility/' . $nomeClasse . '.php';
            if (is_readable($nomeFile))
            {
                require ($nomeFile);
            }
            break;
            
        case'V':
            $nomeFile = $dir . '/View/' . $nomeClasse . '.php';
            if (is_readable($nomeFile))
            {
                require ($nomeFile);
            }
            break;
        
        case'X':
            $nomeFile = $dir . '/Eccezioni/' . $nomeClasse . '.php';
            if (is_readable($nomeFile))
            {
                require ($nomeFile);
            }
            break;
        
        
    }
}

/*
 * La funzione phpversion() ritorna la currente versione di php usata
 */

/* versione_compare(versione1, versione2, operator) compara le due versione 
 * di php passate come argomenti 
 * e ritorna TRUE  se la relazione è quella specificata dall'operatore >=
 * FALSE altrimenti. 
*/

 if (version_compare(phpversion(), '5.1.2', '>=')) 
    {
        //la funzione SPL autoloading è stata introdotta in PHP 5.1.2
        if (version_compare(phpversion(), '5.3.0', '>=')) 
            {
               
                spl_autoload_register('GeoSafeAutoload', true, true);
            } 
        else 
            {
                spl_autoload_register('GeoSafeAutoload');
                
            }
    } 
else 
    {
        // la funzione __autoload($nomeClasse) è deprecata ormai
        function __autoload($nomeClasse)
        {
            GeoSafeAutoload($nomeClasse);
            
        }
    }
