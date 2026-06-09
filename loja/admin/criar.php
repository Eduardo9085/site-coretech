<?php
require_once '../config/database.php';
include '../includes/header.php';

$database = new Database();
$conn = $database->conectar();

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = $_POST['nome'];
    $descricao = $_POST['descricao'];
    $preco = $_POST['preco'];
    $imagem = $_POST['imagem'];

    $stmt = $conn->prepare("INSERT INTO produtos (nome, descricao, preco, imagem) VALUES (?, ?, ?, ?)");
    $stmt->execute([$nome, $descricao, $preco, $imagem]);

    header("Location: index.php");
    exit;
}
?>

<h2 style="margin-bottom:20px;">Cadastro</h2>

<form method="POST" style="background:white; padding:30px; border-radius:18px;">
    <input type="text" name="nome" placeholder="Nome do produto" required>
    <textarea name="descricao" placeholder="Descrição" required></textarea>
    <input type="number" step="0.01" name="preco" placeholder="Preço" required>
    <input type="text" name="imagem" placeholder="URL da imagem" required>
    <button class="btn" type="submit">Salvar</button>
</form>

<?php include '../includes/footer.php'; ?>