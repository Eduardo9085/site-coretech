// app.js
import { db, auth } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    orderBy,
    query,
    Timestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { 
    createUserWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ── MODAL PRODUTOS ──────────────────────────────────────────
const modal = document.getElementById("modal");
const textoModal = document.getElementById("textoModal");

function abrirPC() {
    modal.style.display = "flex";
    textoModal.innerHTML = `
        <h2>História dos Computadores (PC)</h2>
        <p>A história dos computadores pessoais (PCs) começou muito antes dos computadores que conhecemos hoje. As primeiras ideias surgiram através de máquinas criadas para realizar cálculos automaticamente, como a máquina analítica imaginada por Charles Babbage no século XIX.</p>
        <br>
        <p>Durante a Segunda Guerra Mundial, a tecnologia dos computadores avançou rapidamente. Surgiram máquinas enormes, como o ENIAC, criado em 1946, que ocupava uma sala inteira e era utilizado para cálculos complexos. Esses computadores eram muito caros e pertenciam principalmente a governos e grandes instituições.</p>
        <br>
        <p>A grande mudança aconteceu com a criação do transistor na década de 1950. Ele substituiu as antigas válvulas eletrônicas, tornando os computadores menores, mais rápidos e mais confiáveis.</p>
        <br>
        <p>Na década de 1970 surgiu o microprocessador, um componente que reunia vários circuitos em um único chip. Essa invenção possibilitou a criação dos primeiros computadores pessoais, permitindo que pessoas comuns tivessem computadores em suas casas.</p>
        <br>
        <p>Em 1975 apareceu o Altair 8800, considerado um dos primeiros computadores pessoais populares. Pouco tempo depois, empresas começaram a desenvolver computadores mais acessíveis e fáceis de usar.</p>
        <br>
        <p>Na década de 1980, os computadores pessoais ganharam força. A criação do computador pessoal da IBM em 1981 ajudou a popularizar o padrão dos PCs, fazendo com que diversas empresas começassem a produzir máquinas compatíveis.</p>
        <br>
        <p>Nos anos 1990, os PCs evoluíram rapidamente com a chegada de processadores mais potentes, placas de vídeo melhores e sistemas operacionais mais modernos. A internet também mudou completamente a forma como as pessoas usavam seus computadores.</p>
        <br>
        <p>Nos anos 2000, os computadores passaram a ter processadores com vários núcleos, memórias maiores e armazenamento mais rápido. Os computadores deixaram de ser apenas ferramentas de trabalho e passaram também a ser usados para jogos, edição de vídeos e criação de conteúdo.</p>
        <br>
        <p>Atmente, os PCs gamers representam uma das áreas mais avançadas da computação. Eles utilizam processadores de alto desempenho, placas de vídeo dedicadas, SSDs ultrarrápidos, sistemas de refrigeração avançados e tecnologias como inteligência artificial e realidade virtual.</p>
        <br>
        <p>Hoje os computadores continuam evoluindo, sendo usados em praticamente todas as áreas: programação, ciência, entretenimento, educação e desenvolvimento de novas tecnologias.</p>
    `;
    textoModal.scrollTop = 0;
}

function abrirNotebook() {
    modal.style.display = "flex";
    textoModal.innerHTML = `
        <h2>História dos Notebooks</h2>
        <p>A história dos notebooks começou a partir da ideia de criar computadores que pudessem ser transportados facilmente. Antes deles existirem, os computadores eram enormes, pesados e ficavam presos a salas específicas, tornando impossível levá-los para outros lugares.</p>
        <br>
        <p>Durante as décadas de 1970 e 1980, começaram a surgir os primeiros conceitos de computadores portáteis. Um dos primeiros exemplos foi o Osborne 1, lançado em 1981, considerado um dos primeiros computadores portáteis comerciais. Ele ainda era pesado e possuía uma tela pequena, mas mostrou que era possível levar um computador para diferentes lugares.</p>
        <br>
        <p>Na mesma época surgiu o conceito de computador em formato de "maleta", onde a máquina possuía tela, teclado e componentes integrados. Esses modelos deram origem ao formato que conhecemos hoje como notebook.</p>
        <br>
        <p>Durante os anos 1990, os notebooks começaram a evoluir rapidamente. Os fabricantes conseguiram diminuir o tamanho dos componentes, melhorar as baterias e aumentar o desempenho. Isso fez com que eles se tornassem mais populares entre estudantes, empresas e profissionais.</p>
        <br>
        <p>Nos anos 2000, os notebooks passaram por uma grande transformação. A chegada de processadores mais eficientes, telas melhores e baterias com maior duração fez com que eles se tornassem uma alternativa real aos computadores de mesa.</p>
        <br>
        <p>Com a evolução da tecnologia sem fio, os notebooks passaram a ter Wi-Fi, Bluetooth e maior integração com a internet. Isso mudou a forma como as pessoas estudavam, trabalhavam e se comunicavam.</p>
        <br>
        <p>Na década de 2010, surgiram modelos cada vez mais finos e leves, como os ultrabooks. As empresas começaram a utilizar materiais mais resistentes, armazenamento SSD e telas de alta qualidade, deixando os notebooks mais rápidos e portáteis.</p>
        <br>
        <p>Também surgiu uma nova categoria: os notebooks gamers. Eles foram criados para oferecer alto desempenho em jogos, utilizando placas de vídeo dedicadas, processadores potentes, sistemas de refrigeração avançados e telas com alta taxa de atualização.</p>
        <br>
        <p>Atualmente, os notebooks possuem tecnologias muito avançadas, incluindo processadores com inteligência artificial, telas de alta resolução, SSDs ultrarrápidos e grande eficiência energética.</p>
        <br>
        <p>Hoje os notebooks são usados em praticamente todas as áreas: programação, design, estudos, trabalho, entretenimento e jogos. Eles representam a união entre mobilidade e desempenho, permitindo que as pessoas tenham um computador poderoso em qualquer lugar.</p>
    `;
    textoModal.scrollTop = 0;
}

function fecharModal() {
    modal.style.display = "none";
}

window.abrirPC = abrirPC;
window.abrirNotebook = abrirNotebook;
window.fecharModal = fecharModal;

// ── SISTEMA DE CADASTRO (FIREBASE AUTH) ─────────────────────
function abrirModalCadastro() {
    document.getElementById("modal-cadastro").style.display = "flex";
}
function fecharModalCadastro() {
    document.getElementById("modal-cadastro").style.display = "none";
}
window.abrirModalCadastro = abrirModalCadastro;
window.fecharModalCadastro = fecharModalCadastro;

const formCadastro = document.getElementById("form-cadastro");
if (formCadastro) {
    formCadastro.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("cadastro-email").value;
        const senha = document.getElementById("cadastro-senha").value;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user;

            alert(`Conta criada com sucesso! Bem-vindo, ${user.email}`);
            formCadastro.reset();
            fecharModalCadastro();
            
        } catch (error) {
            console.error("Erro ao cadastrar:", error.code);
            if (error.code === 'auth/email-already-in-use') {
                alert("Este e-mail já está cadastrado.");
            } else if (error.code === 'auth/weak-password') {
                alert("A senha precisa ter pelo menos 6 caracteres.");
            } else if (error.code === 'auth/invalid-email') {
                alert("Formato de e-mail inválido.");
            } else {
                alert("Erro ao criar conta. Tente novamente.");
            }
        }
    });
}

// ── ANÚNCIOS ───────────────────────────────────────
const anuncios = [
    { titulo: "Venha conhecer a Alura!", desc: "Curso Fullstack.", link: "https://mkt.alura.com.br/desenvolvedor-full-stack?utm_term=curso%20full%20stack&utm_campaign=&utm_source=google&utm_medium=cpc&campaign_id=23952173476_206020983308_813104567455&utm_id=23952173476_206020983308_813104567455&hsa_acc=7964138385&hsa_cam=&hsa_grp=206020983308&hsa_ad=813104567455&hsa_src=g&hsa_tgt=kwd-337687065288&hsa_kw=curso%20full%20stack&hsa_mt=p&hsa_net=google&hsa_ver=3&gad_source=1&gad_campaignid=23952173476&gbraid=0AAAAADpqZIB79JuGkjL0Ml3GRUpQactok&gclid=Cj0KCQjwi8nRBhDhARIsAHZf_pZlZZc2ngjkFWcKakq6-dEiAEo2R_gacrgjhcPZ0ezewBPazQMDJGQaAjfZEALw_wcB" },
    { titulo: "Faculdade Anhanguera te espera.", desc: "Análise e Desenvolvimento de Sistemas", link: "https://cursos.anhanguera.com/inscricao?gclsrc=aw.ds&&utm_source=google&utm_medium=cpc&utm_term=analise%20e%20desenvolvimento%20de%20sistemas%20ead&utm_content=gagp-092-004_gads_sch-l2_prim_grad_aedu_aon_grad_ecomm_cursos-ead_na_na_inscricoes_auto_kwd_analisedesistemas-google&utm_campaign=gagp-092_gads_sch-l2_prim_grad_aedu_aon_grad_ecomm_cursos-ead_na_na_inscricoes&gad_source=1&gad_campaignid=22105271689&gclid=Cj0KCQjwi8nRBhDhARIsAHZf_pa6FbRhmBH6x1dOGcqNyH8VSfDzEgRzziEEcziNZ1vGfy79a9-X2tEaAqBXEALw_wcB" },
    { titulo: "Vem pra Fam!", desc: "Crie sistemas profissionais", link: "https://www.vemprafam.com.br/cursos/engenharia-de-software/" }
];

let i = 0;

function renderAnuncio() {
    const a = anuncios[i];
    const divAnuncio = document.getElementById("anuncio");
    if (divAnuncio) {
        divAnuncio.innerHTML = `
            <h4>${a.titulo}</h4>
            <p>${a.desc}</p>
            <a href="${a.link}" target="_blank">Saiba mais →</a>
        `;
    }
}

renderAnuncio();
setInterval(() => {
    i = (i + 1) % anuncios.length;
    renderAnuncio();
}, 10000);

// ── FÓRUM — SALVAR AVALIAÇÃO ────────────────────────
const formAvaliacao = document.getElementById("formAvaliacao");
if (formAvaliacao) {
    formAvaliacao.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nome = document.getElementById("inputNome").value.trim();
        const mensagem = document.getElementById("inputMensagem").value.trim();
        const estrelaSelecionada = document.querySelector('input[name="estrelas"]:checked');

        if (!nome || !mensagem || !estrelaSelecionada) {
            alert("Preencha todos os campos e selecione uma nota!");
            return;
        }

        const estrelas = parseInt(estrelaSelecionada.value);

        const btnEnviar = e.target.querySelector("button[type='submit']");
        btnEnviar.disabled = true;
        btnEnviar.textContent = "Enviando...";

        try {
            await addDoc(collection(db, "comentarios"), {
                nome,
                mensagem,
                estrelas,
                data: Timestamp.now()
            });

            document.getElementById("inputNome").value = "";
            document.getElementById("inputMensagem").value = "";
            document.querySelectorAll('input[name="estrelas"]').forEach(r => r.checked = false);

            await carregarComentarios();
        } catch (erro) {
            console.error("Erro ao salvar:", erro);
            alert("Erro ao enviar avaliação. Tente novamente.");
        } finally {
            btnEnviar.disabled = false;
            btnEnviar.textContent = "Enviar Avaliação";
        }
    });
}

// ── FÓRUM — CARREGAR AVALIAÇÕES ─────────────────────
async function carregarComentarios() {
    const lista = document.getElementById("listaComentarios");
    if (!lista) return;
    lista.innerHTML = "<p class='carregando'>Carregando avaliações...</p>";

    try {
        const q = query(collection(db, "comentarios"), orderBy("data", "desc"));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            lista.innerHTML = "<p class='sem-comentarios'>Nenhuma avaliação ainda. Seja o primeiro!</p>";
            return;
        }

        lista.innerHTML = "";
        snapshot.forEach((doc) => {
            const d = doc.data();
            const estrelas = "★".repeat(d.estrelas) + "☆".repeat(5 - d.estrelas);

            const nome = sanitizar(d.nome);
            const mensagem = sanitizar(d.mensagem);
            const data = d.data?.toDate().toLocaleDateString("pt-BR") || "";

            lista.innerHTML += `
                <div class="comentario">
                    <div class="comentario-header">
                        <span class="comentario-nome">${nome}</span>
                        <span class="comentario-estrelas">${estrelas}</span>
                        <span class="comentario-data">${data}</span>
                    </div>
                    <p class="comentario-texto">${mensagem}</p>
                </div>
            `;
        });
    } catch (erro) {
        console.error("Erro ao carregar:", erro);
        lista.innerHTML = "<p class='erro'>Erro ao carregar avaliações.</p>";
    }
}

function sanitizar(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}

carregarComentarios();

// ── CHATBOT (SISTEMA DE REGRAS LOCAIS — CORETECH) ──────────────────────────
function toggleChatbot() {
    const janela = document.getElementById("chatbot-janela");
    if (janela) janela.classList.toggle("aberta");
}
window.toggleChatbot = toggleChatbot;

const botaoEnviar = document.getElementById("chatbot-enviar");
const inputChat = document.getElementById("chatbot-input");
const chatLogs = document.getElementById("chatbot-logs");

if (botaoEnviar && inputChat) {
    botaoEnviar.addEventListener("click", enviarMensagemChat);
    inputChat.addEventListener("keypress", (e) => {
        if (e.key === "Enter") enviarMensagemChat();
    });
}

function responderPergunta(texto) {
    texto = texto.toLowerCase();

    if (texto.includes("olá") || texto.includes("oi") || texto.includes("bom dia") || texto.includes("boa tarde") || texto.includes("boa noite")) {
        return "Olá! Sou o CoreBot, assistente virtual da CoreTech. Como posso te ajudar com tecnologia hoje?";
    }
    if (texto.includes("pc") || texto.includes("computador") || texto.includes("gamer")) {
        return "Os PCs Gamers oferecem o máximo de performance e permitem upgrades de peças (placa de vídeo, processador). Clique nos cards da página para ver uma configuração recomendada!";
    }
    if (texto.includes("notebook") || texto.includes("laptop") || texto.includes("portátil")) {
        return "Os notebooks são ideais para quem precisa de mobilidade (estudos, trabalho ou jogos em qualquer lugar). Hoje em dia, os modelos gamers possuem placas dedicadas super potentes!";
    }
    if (texto.includes("peça") || texto.includes("placa") || texto.includes("processador") || texto.includes("memória") || texto.includes("ssd")) {
        return "Para um bom desempenho hoje, recomendamos focar em processadores Core i5/Ryzen 5 (ou superiores), pelo menos 16GB de RAM e, obrigatoriamente, um armazenamento SSD NVMe.";
    }
    if (texto.includes("valor") || texto.includes("preço") || texto.includes("quanto custa") || texto.includes("caro")) {
        return "Os valores variam muito! Um notebook para estudos começa na faixa de R$ 2.000, enquanto PCs ou Notebooks Gamers de entrada costumam partir de R$ 4.000 a R$ 4.500.";
    }
    if (texto.includes("ajuda") || texto.includes("sobre") || texto.includes("o que é") || texto.includes("comandos")) {
        return "Eu sou o CoreBot! Posso te ajudar com curiosidades e dicas sobre hardware, PCs e notebooks. Pergunte sobre 'peças', 'notebook' ou 'PC gamer'!";
    }

    return "Desculpe, ainda estou aprendendo sobre esse assunto. Tente perguntar sobre 'PC Gamer', 'Notebook' ou 'Peças'!";
}

function enviarMensagemChat() {
    const texto = inputChat.value.trim();
    if (texto === "") return;

    chatLogs.innerHTML += `
        <div class="chat-msg user">
            <strong>Você:</strong> <span>${sanitizar(texto)}</span>
        </div>
    `;

    const resposta = responderPergunta(texto);

    chatLogs.innerHTML += `
        <div class="chat-msg bot">
            <strong>CoreBot:</strong> <span>${resposta}</span>
        </div>
    `;

    inputChat.value = "";
    inputChat.focus();
    chatLogs.scrollTop = chatLogs.scrollHeight;
}