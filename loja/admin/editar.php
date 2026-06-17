<?php
require_once '../config/database.php';
include '../includes/header.php';

$database = new Database();
$conn = $database->conectar();

$id = $_GET['id'] ?? 0;

$stmt = $conn->prepare("SELECT * FROM produtos WHERE id = ?");
$stmt->execute([$id]);
$produto = $stmt->fetch(PDO::FETCH_ASSOC);

if(!$produto) {
    die("Produto não encontrado.");
}

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = $_POST['nome'];
    $descricao = $_POST['descricao'];
    $preco = $_POST['preco'];
    $imagem = $_POST['imagem'];

    $stmt = $conn->prepare("UPDATE produtos SET nome = ?, descricao = ?, preco = ?, imagem = ? WHERE id = ?");
    $stmt->execute([$nome, $descricao, $preco, $imagem, $id]);

    header("Location: index.php");
    exit;
}
?>

<h2 style="margin-bottom:20px;">Editar Produto</h2>

<form method="POST" style="background:white; padding:30px; border-radius:18px;">
    <input type="text" name="nome" value="<?= htmlspecialchars($produto['nome']) ?>" required>
    <textarea name="descricao" required><?= htmlspecialchars($produto['descricao']) ?></textarea>
    <input type="number" step="0.01" name="preco" value="<?= $produto['preco'] ?>" required>
    <input type="text" name="imagem" value="<?= htmlspecialchars($produto['imagem']) ?>" required>
    <button class="btn" type="submit">Atualizar</button>
</form>

<?php include '../includes/footer.php'; ?>