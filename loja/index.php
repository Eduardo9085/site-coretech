<?php
require_once "config/database.php";
include "includes/header.php";

$db = new Database();
$conn = $db->conectar();

$query = "SELECT * FROM produtos";
$stmt = $conn->prepare($query);
$stmt->execute();
$produtos = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<h2 style="margin-bottom: 20px;">Produtos</h2>

<?php if (count($produtos) > 0): ?>
    <div class="grid">
        <?php foreach ($produtos as $produto): ?>
            <div class="card">
                <div class="card-content">
                    <h3><?= htmlspecialchars($produto['nome']) ?></h3>
                    <p><?= htmlspecialchars($produto['descricao']) ?></p>
                    <p class="price">R$ <?= number_format($produto['preco'], 2, ',', '.') ?></p>
                    <p>[Imagem removida para teste]</p>
                    <a class="btn" href="detalhes.php?id=<?= $produto['id'] ?>">Ver produto</a>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
<?php else: ?>
    <p>Nenhum produto encontrado.</p>
<?php endif; ?>

<?php include "includes/footer.php"; ?>