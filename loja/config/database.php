<?php
class Database {
    private $host = "localhost";
    private $db_name = "loja_db";
    private $username = "root";
    private $password = "";
    public $conn;



    public function conectar (){
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=utf8",
                $this->username,
                $this->password
            );

            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        } catch(PDOException $e) {
            die("Erro na conexão; " . $e->getMessage());
        }

        return $this->conn;
    }
}
?>