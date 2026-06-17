<?php
require_once '../config/database.php';

$database = new Database();
$conn = $database->conectar();

$id = $_GET['id'] ?? 0;

$stmt = $conn->prepare("DELETE FROM produtos WHERE id = ?");
$stmt->execute([$id]);

header("Location: index.php");
exit;
?>