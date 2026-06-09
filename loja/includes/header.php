<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CoreTech</title>
    <style>

     * { margin: 0; padding: 0; box-sizing: border-box; font-family: Arial, sans-serif; }
        
        body {
             background: #f5f7fa; 
             color: #222; 
        }

        header {
            background: #021f4f;
            color: white;
            padding: 20px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        header h1 a {
    color: white;
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-block;
}

header h1 a:hover {
    color: #60a5fa;
    transform: scale(1.05);
    text-shadow: 0 0 15px rgba(96, 165, 250, 0.7);
}

        nav a {
            color: white;
            text-decoration: none;
            margin-left: 20px;
            font-weight: bold;
        }

        .container {
            width: 90%;
            max-width: 1200px;
            margin: 30px auto;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }

        .card {
            background: white;
            border-radius: 18px;
            overflow: hidden;
            box-shadow: 0 8px 20px rgba(0,0,0,0.08);
            transition: .2s;
        }

        .card:hover {
            transform: translateY(-5px);
        }

        .card img {
            width: 100%;
            height: 220px;
            object-fit: cover;
        }

        .card-content {
            padding: 18px;
        }

        .card h3 {
            margin-bottom: 10px;
        }

        .card p {
            color: #666;
            margin-bottom: 10px;
        }

        .price {
            font-size: 22px;
            font-weight: bold;
            margin-bottom: 12px;
        }

        .btn {
            display: inline-block;
            background: #111827;
            color: white;
            padding: 10px 16px;
            border-radius: 10px;
            text-decoration: none;
            border: none;
            cursor: pointer;
        }

        .btn:hover {
            background: #374151;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        }

        th, td {
            padding: 15px;
            border-bottom: 1px solid #eee;
            text-align: left;
        }

        form input, form textarea {
            width: 100%;
            padding: 12px;
            margin-bottom: 15px;
            border-radius: 10px;
            border: 1px solid #ccc;
        }

        form textarea {
            resize: vertical;
            min-height: 120px;
        }
    </style>
</head>
<body>
<header>
    <h1><a href="/loja/index.php">CoreTech</a></h1>
    <nav>
       <a href="/loja/index.php">Produtos</a>
        <a href="/loja/carrinho.php">Carrinho (<?= isset($_SESSION['carrinho']) ? array_sum($_SESSION['carrinho']) : 0 ?>)</a>
        <a href="/loja/admin/index.php">Admin</a>
</nav>
</header>
<div class="container">
