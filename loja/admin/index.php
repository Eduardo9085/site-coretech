<?php
require_once '../config/database.php';
include '../includes/header.php';

$database = new Database();
$conn = $database->conectar();

$stmt = $conn->query("SELECT * FROM produtos ORDER BY id DESC");
$produtos = $stmt->fetchAll(PDO::FETCH_ASSOC);

function formatarPreco($valor) {
    return "R$ " . number_format($valor, 2, ',', '.');
}
?>

<h2 style="margin-bottom:20px;">Painel Administrativo</h2>

<a class="btn" href="criar.php" style="margin-bottom:20px;">+ Novo Produto</a>

<table>
    <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Preço</th>
        <th>Ações</th>
    </tr>

    <?php foreach($produtos as $produto): ?>
    <tr>
        <td><?= $produto['id'] ?></td>
        <td><?= htmlspecialchars($produto['nome']) ?></td>
        <td><?= formatarPreco($produto['preco']) ?></td>
        <td>
            <a class="btn" href="editar.php?id=<?= $produto['id'] ?>">Editar</a>
            <a class="btn" href="excluir.php?id=<?= $produto['id'] ?>" onclick="return confirm('Deseja excluir?')">Excluir</a>
        </td>
    </tr>
    <?php endforeach; ?>
</table>

<?php include '../includes/footer.php'; ?>