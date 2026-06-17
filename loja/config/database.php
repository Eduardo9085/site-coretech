<?php
class Database {
private $host = "sql200.infinityfree.com";
private $db_name = "if0_42199495_loja";
private $username = "if0_42199495";
private $password = "3du4rd02010";
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