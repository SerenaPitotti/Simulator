<?php
/**
 * La classe EUser si occupa della gestione in ram dell'user.
 *
 * @package Entity
 * @author Claudia Di Marco 
 */

// __DIR__  è  Applications/XAMPP/xamppfiles/htdocs/GeoSafe/Entity
$dir = explode(DIRECTORY_SEPARATOR, __DIR__); // tutte le parole che conpongono il path vengono memorizzate in un elemento dell'array $dir
array_pop($dir);// elimino l'ultimo elemento (ovvero la parola Entity)
$dir = implode(DIRECTORY_SEPARATOR, $dir);// riassemblo il path

require_once $dir . '/libs/PasswordLib/passwordLib.php';
class EUser {
     /*
     * Attributi della classe EUser.
     */
    
    /**
     * @var string $_username L'username dello user.
     */
    private $_username;
    
     /**
     * @var string $_password La password dello user.
     */
    private $_password;
    
    /**
     * @var string $_tipo Il tipo di user.
     */
    private $_tipo;
    
     /**
     * @var string $_nomeMappa Il nome della mappa gestita dallo user.
     */
    private $_nomeMappa;
    
    /**
     * Costruttore di EUser.
     * 
     * @param string $username Lo username dello user.
     * @param string $password La password dello user.
     * @param string $nomeMappa Il nome della mappa gestita dallo user.
     * @param string $tipo Il tipo di user.
     * @throws XUserException Se lo user è inesistente.
     */
    public function __construct($username, $password, $nomeMappa='Corsica', $tipo=NULL) {
        if(isset($tipo))
        {
            $this->_username = $username;
            $this->_password = password_hash($password.$username, PASSWORD_BCRYPT);
            $this->_tipo = $tipo;
            $this->_nomeMappa = $nomeMappa;
        }
        else
        {
            $fUser = USingleton::getInstance('FUser');
            $user = $fUser->cercaByPK($username);
            if(is_array($user) && count($user)===1 && password_verify($password.$username, $user[0]['Password']))
            {
                $this->_username = $user[0]['Username'];
                $this->_password = $user[0]['Password'];
                $this->_tipo = $user[0]['Tipo'];
                $this->_nomeMappa = $user[0]['NomeMappa'];
            }
            else
            {
                // lancia eccezione
                throw new XUserException('User inesistente o dati errati.');
            }
        }  
    }
    
    /**
     * Metodo che consente di ottenere lo username dello user.
     * 
     * @access public
     * @return string Lo username dello user
     */
    public function getUsernameUser() {
        return $this->_username;
    }
    
    /**
     * Metodo che consente di ottenere la password dello user.
     * 
     * @access public
     * @return string La password dello user
     */
    public function getPasswordUser() {
        return $this->_password;
    }
    
    /**
     * Metodo che consente di ottenere il tipo dello user.
     * 
     * @access public
     * @return string Il tipo dello user
     */
    public function getTipoUser() {
        return $this->_tipo;
    }
    
    /**
     * Metodo che restituisce il nome della mappa.
     * 
     * @access public
     * @return string Il nome della mappa.
     */
    public function getNomeMappaUser() {
        return $this->_nomeMappa;     
    }
    
    /**
     * Metodo che consente di impostare lo username dello user.
     * 
     * @access public
     * @param string $username Lo username da impostare
     */
    public function setUsernameUser($username) {
        $this->_username = $username;
    }
    
    /**
     * Metodo che consente di impostare la password dello user.
     * 
     * @access public
     * @param string $password La password da impostare
     */
    public function setPasswordUser($password) {
        $this->_password = $password;
    }
    
    /**
     * Metodo che consente di impostare il tipo dello user.
     * 
     * @access public
     * @param string $tipo Il tipo di user da impostare
     */
    public function setTipoUser($tipo) {
        $this->_tipo = $tipo;
    }
    
    /**
     * Metodo che permette di impostare il nome della mappa.
     * 
     * @access public
     * @param string $nome Nome della mappa.
     */
    public function setNomeMappaUser($nome) {
        $this->_nomeMappa = $nome;   
    }
    
    /**
     * Metodo che consente di impostare le variabili di sessione dello user.
     * 
     * @access public
     * @param string $username L'username dell'user.
     * @param string $tipo Il tipo dell'user.
     * @param string $nomaMappa Il nome della mappa che gestisce l'user.
     */
    public function attivaSessioneUser($username, $tipo, $nomeMappa='Corsica') 
    {
        $sessione = USingleton::getInstance('USession');
        $sessione->impostaVariabileSessione('usernameLogIn', $username);
        $sessione->impostaVariabileSessione('loggedIn', TRUE);
        $sessione->impostaVariabileSessione('tipoUser', $tipo);
        $sessione->impostaVariabileSessione('nomeMappaUser', $nomeMappa);
    }
    
    /**
     * Metodo che consente di eliminare le variabili di sessione dello user.
     * 
     * @access public
     */
    public function terminaSessioneUser() 
    {
        $sessione = USingleton::getInstance('USession');
        $sessione->eliminaVariabileSessione('usernameLogIn');
        $sessione->eliminaVariabileSessione('loggedIn');
        $sessione->eliminaVariabileSessione('tipoUser');
        $sessione->eliminaVariabileSessione('nomeMappaUser');
        $sessione->terminaSessione();
    }
    
    /**
     * Metodo che permette di modificare la password (la modifica avviene anche nel DB).
     * 
     * @access public
     * @param string $password password da modificare, se non fornito crea una password automaticamente
     * @return boolean TRUE modifica effettuata
     * @throws XDBException Se la query non è eseguita con successo
     */
    public function modificaPassword($password = NULL) 
    {
        $username = $this->getUsernameUser();
        if ($password===NULL)
        {
            $password = $this->generatePassword();
        }
        $password = password_hash($password.$username, PASSWORD_BCRYPT);
        $this->setPassword($password);
        $fUser = USingleton::getInstance('FUser');
        $daModificare['Password']= $this->getPasswordUser();
        return $fUser->update($this->getUsernameUser(), $daModificare); //modificaPassword
    }
    
    /**
     * Genera una password casuale in conformità dalle regole imposte.
     * 
     * @access public
     * @param int $length lunghezza della password
     * @return string la password generata automaticamente
     */
    public function generatePassword($length = 8) {
        $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        $charsLow = 'abcdefghijklmnopqrstuvwxyz';
        $charsUp = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $num = '0123456789';
        $count= mb_strlen($chars);
        $countCharsUp = mb_strlen($charsUp);
        $countCharsLow = mb_strlen($charsLow);
        $countNum = mb_strlen($num);

        for ($i = 0, $result = ''; $i < $length-3; $i++) {
            $index = rand(0, $count - 1);
            $result .= mb_substr($chars, $index, 1);
        }

        $index = rand(0, $countCharsUp - 1);
        $result .= mb_substr($charsUp, $index, 1);
        $index = rand(0, $countNum - 1);
        $result .= mb_substr($num, $index, 1);
        $index = rand(0, $countCharsLow - 1);
        $result .= mb_substr($charsLow, $index, 1);
        return $result;
    }
}

