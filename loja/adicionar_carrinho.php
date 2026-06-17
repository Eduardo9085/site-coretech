<?php
session_start();

$id = $_GET['id'] ?? 0;

if(!isset($_SESSION['carrinho'])) {
    $_SESSION['carrinho'] = [];
}

if(isset($_SESSION['carrinho'][$id])) {
    $_SESSION['carrinho'][$id]++;
} else {
    $_SESSION['carrinho'][$id] = 1;
}

header("Location: carrinho.php");
exit;
?>