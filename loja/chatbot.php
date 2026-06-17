<?php
// Inicia a sessão para conseguir ler se o usuário tem itens no carrinho
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
// Importa a conexão com o banco de dados que você já possui configurada
require_once 'config/database.php';

header('Content-Type: application/json');

// Processa apenas requisições do tipo POST vindas do chat visual
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $mensagem = $_POST['mensagem'] ?? '';
    $resposta = obterRespostaLoja($mensagem);
    echo json_encode(['resposta' => $resposta]);
    exit;
}

function obterRespostaLoja($msg) {
    // 1. Conecta ao banco e busca a lista de eletrônicos cadastrados para ensinar à IA
    try {
        $database = new Database();
        $conn = $database->conectar();
        $stmt = $conn->query("SELECT nome, preco, descricao FROM produtos");
        $produtosDisponiveis = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        $listaProdutosTexto = "";
        foreach($produtosDisponiveis as $p) {
            $listaProdutosTexto .= "- " . $p['nome'] . " no valor de R$ " . number_format($p['preco'], 2, ',', '.') . " (" . $p['descricao'] . ")\n";
        }
    } catch (Exception $e) {
        $listaProdutosTexto = "Não foi possível sincronizar o estoque no momento.";
    }

    // 2. Verifica a quantidade de itens no carrinho do usuário atual
    $itensNoCarrinho = 0;
    if (isset($_SESSION['carrinho'])) {
        $itensNoCarrinho = array_sum($_SESSION['carrinho']);
    }

    // 3. Configurações da API do Groq usando a chave que você gerou
    $apiKey = "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"; 
    $url = "https://api.groq.com/openai/v1/chat/completions"; // O LINK DA API É USADO AQUI

    // Passa as instruções do sistema informando o contexto do seu e-commerce
    $instrucoesSistema = "Você é o assistente virtual inteligente da CoreTech, uma loja especializada em eletrônicos de alta qualidade. "
                       . "Responda sempre em português do Brasil, de maneira bastante curta, prestativa, educada e direta ao ponto. "
                       . "O cliente atualmente tem exatamente " . $itensNoCarrinho . " itens adicionados no carrinho de compras. "
                       . "Abaixo está a lista REAL e ATUALIZADA de todos os produtos cadastrados em nossa loja agora:\n" 
                       . $listaProdutosTexto 
                       . "\nSe o cliente perguntar por algum produto ou modelo que NÃO esteja listado acima, diga de forma muito gentil que não temos esse item em estoque no momento.";

    $dadosJSON = [
        "model" => "llama3-8b-8192", // Modelo gratuito de altíssima velocidade
        "messages" => [
            ["role" => "system", "content" => $instrucoesSistema],
            ["role" => "user", "content" => $msg]
        ],
        "temperature" => 0.4 // Mantém a IA focada apenas nos dados reais da loja, sem inventar informações
    ];

    // Realiza a requisição cURL para o link do Groq
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($dadosJSON));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey
    ]);

    $response = curl_exec($ch);
    $error = curl_error($ch);
    curl_close($ch);

    if ($error) {
        return "Desculpe-me, tive uma pequena oscilação na conexão. Pode repetir a pergunta?";
    }

    $resultado = json_decode($response, true);
    return $resultado['choices'][0]['message']['content'] ?? "Desculpe, não consegui processar sua resposta.";
}