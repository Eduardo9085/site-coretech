</div> <footer style="text-align:center; padding: 30px; color:#666; background: #0f172a; margin-top: 50px;">
    <p>Obrigado por escolher a CoreTech</p>
</footer>

<div id="chat-button" style="position: fixed; bottom: 20px; right: 20px; background: #60a5fa; color: #111827; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.3); z-index: 9999; transition: transform 0.2s;">
    💬
</div>

<div id="chat-box" style="position: fixed; bottom: 90px; right: 20px; width: 350px; height: 450px; background: #1e293b; border-radius: 16px; box-shadow: 0 8px 30px rgba(0,0,0,0.5); display: none; flex-direction: column; overflow: hidden; z-index: 9999; border: 1px solid #334155; font-family: Arial, sans-serif;">
    
    <div style="background: linear-gradient(135deg, #111827, #1e3a5f); color: white; padding: 15px; font-weight: bold; display: flex; justify-content: space-between; align-items: center;">
        <span>🤖 Assistente CoreTech</span>
        <span id="close-chat" style="cursor: pointer; font-size: 20px; padding: 0 5px;">&times;</span>
    </div>

    <div id="chat-messages" style="flex: 1; padding: 15px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; color: white; font-size: 14px; background: #111827;">
        <div style="background: #334155; padding: 10px 14px; border-radius: 12px 12px 12px 0; max-width: 80%; align-self: flex-start; line-height: 1.4;">
            Olá! Sou o assistente inteligente da CoreTech. Como posso ajudar você com os nossos eletrônicos hoje?
        </div>
    </div>

    <div style="padding: 10px; background: #0f172a; display: flex; gap: 8px; border-top: 1px solid #334155;">
        <input type="text" id="chat-input" placeholder="Pergunte sobre um produto..." style="flex: 1; padding: 10px; border-radius: 8px; border: 1px solid #334155; background: #1e293b; color: white; outline: none; margin-bottom: 0;">
        <button id="chat-send" style="background: #60a5fa; color: #111827; border: none; padding: 10px 15px; border-radius: 8px; font-weight: bold; cursor: pointer; transition: background 0.2s;">Enviar</button>
    </div>
</div>

<script>
const chatButton = document.getElementById('chat-button');
const chatBox = document.getElementById('chat-box');
const closeChat = document.getElementById('close-chat');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');

// Controla abertura e fechamento da janela
chatButton.addEventListener('click', () => {
    chatBox.style.display = chatBox.style.display === 'none' ? 'flex' : 'none';
    if(chatBox.style.display === 'flex') chatInput.focus();
});
closeChat.addEventListener('click', () => {
    chatBox.style.display = 'none';
});

// Adiciona os balões de texto na tela
function inserirMensagemTela(texto, remetente) {
    const balao = document.createElement('div');
    if (remetente === 'usuario') {
        balao.style.background = '#60a5fa';
        balao.style.color = '#111827';
        balao.style.borderRadius = '12px 12px 0 12px';
        balao.style.alignSelf = 'flex-end';
    } else {
        balao.style.background = '#334155';
        balao.style.color = 'white';
        balao.style.borderRadius = '12px 12px 12px 0';
        balao.style.alignSelf = 'flex-start';
    }
    balao.style.padding = '10px 14px';
    balao.style.maxWidth = '80%';
    balao.style.wordBreak = 'break-word';
    balao.style.lineHeight = '1.4';
    balao.textContent = texto;
    chatMessages.appendChild(balao);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Rola a tela para a última mensagem
}

// Dispara o envio dos dados para o arquivo chatbot.php via AJAX (fetch)
async function processarEnvioChat() {
    const msgTexto = chatInput.value.trim();
    if (!msgTexto) return;

    inserirMensagemTela(msgTexto, 'usuario');
    chatInput.value = '';

    // Coloca indicador visual de que a IA está gerando a resposta
    const indicadorDigitando = document.createElement('div');
    indicadorDigitando.style.background = '#334155';
    indicadorDigitando.style.color = '#94a3b8';
    indicadorDigitando.style.borderRadius = '12px 12px 12px 0';
    indicadorDigitando.style.padding = '10px 14px';
    indicadorDigitando.style.alignSelf = 'flex-start';
    indicadorDigitando.style.fontStyle = 'italic';
    indicadorDigitando.textContent = 'Buscando no estoque...';
    chatMessages.appendChild(indicadorDigitando);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
        const pacoteDados = new FormData();
        pacoteDados.append('mensagem', msgTexto);

        // Dispara a requisição para o arquivo PHP na raiz da loja
        const conexao = await fetch('chatbot.php', {
            method: 'POST',
            body: pacoteDados
        });

        const retornoJSON = await conexao.json();
        chatMessages.removeChild(indicadorDigitando); // Apaga o indicador de carregamento
        inserirMensagemTela(retornoJSON.resposta, 'ia');
    } catch (erro) {
        chatMessages.removeChild(indicadorDigitando);
        inserirMensagemTela('Desculpe, ocorreu uma falha ao contatar o servidor da loja.', 'ia');
    }
}

// Escuta os cliques no botão e envios pelo teclado (Tecla Enter)
chatSend.addEventListener('click', processarEnvioChat);
chatInput.addEventListener('keypress', (evento) => {
    if (evento.key === 'Enter') processarEnvioChat();
});
</script>

<script type="text/javascript">
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/6a31afb593e8f31d47dd570d/1jr91co0b';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
</script>
</body>
</html>