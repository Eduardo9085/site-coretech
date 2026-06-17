<?php
require_once 'config/database.php';
include 'includes/header.php';

$database = new Database();
$conn = $database->conectar();

$id = $_GET['id'] ?? 0;

$stmt = $conn->prepare("SELECT * FROM produtos WHERE id = ?");
$stmt->execute([$id]);
$produto = $stmt->fetch(PDO::FETCH_ASSOC);

if(!$produto) {
    die("Produto não encontrado.");
}

function formatarPreco($valor) {
    return "R$ " . number_format($valor, 2, ',', '.');
}
?>

<div style="display:grid; grid-template-columns:1fr 1fr; gap:30px; background:white; padding:30px; border-radius:18px; box-shadow:0 8px 20px rgba(0,0,0,0.08);">
    <img src="<?= htmlspecialchars($produto['imagem']) ?>" style="width:100%; border-radius:18px; max-height:500px; object-fit:cover;">
    
    <div>
        <h2 style="margin-bottom:15px;"><?= htmlspecialchars($produto['nome']) ?></h2>
        <p style="margin-bottom:20px; color:#555;"><?= htmlspecialchars($produto['descricao']) ?></p>
        <div class="price"><?= formatarPreco($produto['preco']) ?></div>
        <a class="btn" href="adicionar_carrinho.php?id=<?= $produto['id'] ?>">Adicionar ao carrinho</a>
    </div>
</div>

<?php include 'includes/footer.php'; ?>