<?php
require_once 'config/database.php';
include 'includes/header.php';

$database = new Database();
$conn = $database->conectar();

function formatarPreco($valor) {
    return "R$ " . number_format($valor, 2, ',', '.');
}

$total = 0;
?>

<h2 style="margin-bottom:20px;">Seu Carrinho</h2>

<?php if(empty($_SESSION['carrinho'])): ?>
    <div style="background:white; padding:30px; border-radius:18px;">Carrinho vazio.</div>
<?php else: ?>
    <table>
        <tr>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Preço</th>
            <th>Subtotal</th>
            <th>Ação</th>
        </tr>

        <?php foreach($_SESSION['carrinho'] as $id => $qtd): ?>
            <?php
            $stmt = $conn->prepare("SELECT * FROM produtos WHERE id = ?");
            $stmt->execute([$id]);
            $produto = $stmt->fetch(PDO::FETCH_ASSOC);

            if($produto):
                $subtotal = $produto['preco'] * $qtd;
                $total += $subtotal;
            ?>
            <tr>
                <td><?= htmlspecialchars($produto['nome']) ?></td>
                <td><?= $qtd ?></td>
                <td><?= formatarPreco($produto['preco']) ?></td>
                <td><?= formatarPreco($subtotal) ?></td>
                <td><a class="btn" href="remover_carrinho.php?id=<?= $produto['id'] ?>">Remover</a></td>
            </tr>
            <?php endif; ?>
        <?php endforeach; ?>
    </table>

    <h3 style="margin-top:20px;">Total: <?= formatarPreco($total) ?></h3>
<?php endif; ?>

<?php include 'includes/footer.php'; ?>