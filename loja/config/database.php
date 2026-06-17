<?php
// O getenv() serve para o PHP pegar os dados que você acabou de configurar no Railway
$host     = getenv('DB_HOST');
$usuario  = getenv('DB_USER');
$senha    = getenv('DB_PASSWORD');
$banco    = getenv('DB_NAME');
$porta    = getenv('DB_PORT') ? getenv('DB_PORT') : 3306; // Caso use porta específica

// Exemplo usando MySQLi (ajuste conforme o seu código atual)
$conexao = new mysqli($host, $usuario, $senha, $banco, $porta);

if ($conexao->connect_error) {
    die("Falha na conexão: " . $conexao->connect_error);
}
?>
