import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    orderBy,
    query,
    Timestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ── MODAL ──────────────────────────────────────────
const modal = document.getElementById("modal");
const textoModal = document.getElementById("textoModal");

function abrirPC() {
    modal.style.display = "flex";
    textoModal.innerHTML = `
        <h2>História dos Computadores (PC)</h2>

        <p>A história dos computadores pessoais (PCs) começou muito antes dos computadores
        que conhecemos hoje. As primeiras ideias surgiram através de máquinas criadas
        para realizar cálculos automaticamente, como a máquina analítica imaginada por
        Charles Babbage no século XIX.</p>

        <br>

        <p>Durante a Segunda Guerra Mundial, a tecnologia dos computadores avançou
        rapidamente. Surgiram máquinas enormes, como o ENIAC, criado em 1946, que
        ocupava uma sala inteira e era utilizado para cálculos complexos. Esses
        computadores eram muito caros e pertenciam principalmente a governos e grandes
        instituições.</p>

        <br>

        <p>A grande mudança aconteceu com a criação do transistor na década de 1950.
        Ele substituiu as antigas válvulas eletrônicas, tornando os computadores menores,
        mais rápidos e mais confiáveis.</p>

        <br>

        <p>Na década de 1970 surgiu o microprocessador, um componente que reunia vários
        circuitos em um único chip. Essa invenção possibilitou a criação dos primeiros
        computadores pessoais, permitindo que pessoas comuns tivessem computadores em
        suas casas.</p>

        <br>

        <p>Em 1975 apareceu o Altair 8800, considerado um dos primeiros computadores
        pessoais populares. Pouco tempo depois, empresas começaram a desenvolver
        computadores mais acessíveis e fáceis de usar.</p>

        <br>

        <p>Na década de 1980, os computadores pessoais ganharam força. A criação do
        computador pessoal da IBM em 1981 ajudou a popularizar o padrão dos PCs,
        fazendo com que diversas empresas começassem a produzir máquinas compatíveis.</p>

        <br>

        <p>Nos anos 1990, os PCs evoluíram rapidamente com a chegada de processadores
        mais potentes, placas de vídeo melhores e sistemas operacionais mais modernos.
        A internet também mudou completamente a forma como as pessoas usavam seus
        computadores.</p>

        <br>

        <p>Nos anos 2000, os computadores passaram a ter processadores com vários núcleos,
        memórias maiores e armazenamento mais rápido. Os computadores deixaram de ser
        apenas ferramentas de trabalho e passaram também a ser usados para jogos,
        edição de vídeos e criação de conteúdo.</p>

        <br>

        <p>Atualmente, os PCs gamers representam uma das áreas mais avançadas da
        computação. Eles utilizam processadores de alto desempenho, placas de vídeo
        dedicadas, SSDs ultrarrápidos, sistemas de refrigeração avançados e tecnologias
        como inteligência artificial e realidade virtual.</p>

        <br>

        <p>Hoje os computadores continuam evoluindo, sendo usados em praticamente todas as
        áreas: programação, ciência, entretenimento, educação e desenvolvimento de novas
        tecnologias.</p>
    `;
    textoModal.scrollTop = 0;
}

function abrirNotebook() {
    modal.style.display = "flex";
    textoModal.innerHTML = `
        <h2>História dos Notebooks</h2>

        <p>A história dos notebooks começou a partir da ideia de criar computadores que
        pudessem ser transportados facilmente. Antes deles existirem, os computadores
        eram enormes, pesados e ficavam presos a salas específicas, tornando impossível
        levá-los para outros lugares.</p>

        <br>

        <p>Durante as décadas de 1970 e 1980, começaram a surgir os primeiros conceitos de
        computadores portáteis. Um dos primeiros exemplos foi o Osborne 1, lançado em
        1981, considerado um dos primeiros computadores portáteis comerciais. Ele ainda
        era pesado e possuía uma tela pequena, mas mostrou que era possível levar um
        computador para diferentes lugares.</p>

        <br>

        <p>Na mesma época surgiu o conceito de computador em formato de "maleta", onde a
        máquina possuía tela, teclado e componentes integrados. Esses modelos deram
        origem ao formato que conhecemos hoje como notebook.</p>

        <br>

        <p>Durante os anos 1990, os notebooks começaram a evoluir rapidamente. Os
        fabricantes conseguiram diminuir o tamanho dos componentes, melhorar as baterias
        e aumentar o desempenho. Isso fez com que eles se tornassem mais populares entre
        estudantes, empresas e profissionais.</p>

        <br>

        <p>Nos anos 2000, os notebooks passaram por uma grande transformação. A chegada de
        processadores mais eficientes, telas melhores e baterias com maior duração fez
        com que eles se tornassem uma alternativa real aos computadores de mesa.</p>

        <br>

        <p>Com a evolução da tecnologia sem fio, os notebooks passaram a ter Wi-Fi,
        Bluetooth e maior integração com a internet. Isso mudou a forma como as pessoas
        estudavam, trabalhavam e se comunicavam.</p>

        <br>

        <p>Na década de 2010, surgiram modelos cada vez mais finos e leves, como os
        ultrabooks. As empresas começaram a utilizar materiais mais resistentes,
        armazenamento SSD e telas de alta qualidade, deixando os notebooks mais rápidos
        e portáteis.</p>

        <br>

        <p>Também surgiu uma nova categoria: os notebooks gamers. Eles foram criados para
        oferecer alto desempenho em jogos, utilizando placas de vídeo dedicadas,
        processadores potentes, sistemas de refrigeração avançados e telas com alta taxa
        de atualização.</p>

        <br>

        <p>Atualmente, os notebooks possuem tecnologias muito avançadas, incluindo
        processadores com inteligência artificial, telas de alta resolução, SSDs
        ultrarrápidos e grande eficiência energética.</p>

        <br>

        <p>Hoje os notebooks são usados em praticamente todas as áreas: programação,
        design, estudos, trabalho, entretenimento e jogos. Eles representam a união entre
        mobilidade e desempenho, permitindo que as pessoas tenham um computador poderoso
        em qualquer lugar.</p>
    `;
    textoModal.scrollTop = 0;
}

function fecharModal() {
    modal.style.display = "none";
}

window.abrirPC = abrirPC;
window.abrirNotebook = abrirNotebook;
window.fecharModal = fecharModal;

// ── ANÚNCIOS ───────────────────────────────────────
const anuncios = [
    { titulo: "Venha conhecer a Alura!", desc: "Curso Fullstack.", link: "https://mkt.alura.com.br/desenvolvedor-full-stack?utm_term=curso%20full%20stack&utm_campaign=&utm_source=google&utm_medium=cpc&campaign_id=23952173476_206020983308_813104567455&utm_id=23952173476_206020983308_813104567455&hsa_acc=7964138385&hsa_cam=&hsa_grp=206020983308&hsa_ad=813104567455&hsa_src=g&hsa_tgt=kwd-337687065288&hsa_kw=curso%20full%20stack&hsa_mt=p&hsa_net=google&hsa_ver=3&gad_source=1&gad_campaignid=23952173476&gbraid=0AAAAADpqZIB79JuGkjL0Ml3GRUpQactok&gclid=Cj0KCQjwi8nRBhDhARIsAHZf_pZlZZc2ngjkFWcKakq6-dEiAEo2R_gacrgjhcPZ0ezewBPazQMDJGQaAjfZEALw_wcB" },
    { titulo: "Faculdade Anhanguera te espera.", desc: "Análise e Desenvolvimento de Sistemas", link: "https://cursos.anhanguera.com/inscricao?gclsrc=aw.ds&&utm_source=google&utm_medium=cpc&utm_term=analise%20e%20desenvolvimento%20de%20sistemas%20ead&utm_content=gagp-092-004_gads_sch-l2_prim_grad_aedu_aon_grad_ecomm_cursos-ead_na_na_inscricoes_auto_kwd_analisedesistemas-google&utm_campaign=gagp-092_gads_sch-l2_prim_grad_aedu_aon_grad_ecomm_cursos-ead_na_na_inscricoes&gad_source=1&gad_campaignid=22105271689&gclid=Cj0KCQjwi8nRBhDhARIsAHZf_pa6FbRhmBH6x1dOGcqNyH8VSfDzEgRzziEEcziNZ1vGfy79a9-X2tEaAqBXEALw_wcB" },
    { titulo: "Vem pra Fam!", desc: "Crie sistemas profissionais", link: "https://www.vemprafam.com.br/cursos/engenharia-de-software/" }
];

let i = 0;

function renderAnuncio() {
    const a = anuncios[i];
    document.getElementById("anuncio").innerHTML = `
        <h4>${a.titulo}</h4>
        <p>${a.desc}</p>
        <a href="${a.link}" target="_blank">Saiba mais →</a>
    `;
}

renderAnuncio();
setInterval(() => {
    i = (i + 1) % anuncios.length;
    renderAnuncio();
}, 10000);

// ── FÓRUM — SALVAR AVALIAÇÃO ────────────────────────
document.getElementById("formAvaliacao").addEventListener("submit", async (e) => {
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

// ── FÓRUM — CARREGAR AVALIAÇÕES ─────────────────────
async function carregarComentarios() {
    const lista = document.getElementById("listaComentarios");
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

// ── CHATBOT ────────────────────────────────────────
const GROQ_API_KEY = "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";

const chatHistorico = [
    {
        role: "system",
        content: "Você é um assistente inteligente e simpático chamado CoreBot. Responda sempre em português, de forma clara e objetiva."
    }
];

function toggleChatbot() {
    const janela = document.getElementById("chatbot-janela");
    janela.classList.toggle("aberta");
}

window.toggleChatbot = toggleChatbot;

document.getElementById("chatbot-enviar").addEventListener("click", enviarMensagemChat);
document.getElementById("chatbot-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") enviarMensagemChat();
});

async function enviarMensagemChat() {
    const input = document.getElementById("chatbot-input");
    const texto = input.value.trim();
    if (!texto) return;

    input.disabled = true;
    document.getElementById("chatbot-enviar").disabled = true;

    adicionarMensagem("user", texto);
    input.value = "";

    chatHistorico.push({ role: "user", content: texto });

    const typingId = mostrarDigitando();

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama3-8b-8192",
                messages: chatHistorico
            })
        });

        removerDigitando(typingId);

        if (!response.ok) throw new Error(`Erro: ${response.status}`);

        const data = await response.json();
        const resposta = data.choices[0].message.content;

        chatHistorico.push({ role: "assistant", content: resposta });
        adicionarMensagem("bot", resposta);

    } catch (erro) {
        removerDigitando(typingId);
        adicionarMensagem("bot", "⚠️ Erro ao conectar. Verifique sua API Key.");
        console.error(erro);
    } finally {
        input.disabled = false;
        document.getElementById("chatbot-enviar").disabled = false;
        input.focus();
    }
}

function adicionarMensagem(tipo, texto) {
    const logs = document.getElementById("chatbot-logs");
    const div = document.createElement("div");
    div.classList.add("chat-msg", tipo);

    const safe = document.createElement("span");
    safe.textContent = texto;

    div.innerHTML = `<strong>${tipo === "user" ? "Você" : "CoreBot"}:</strong> `;
    div.appendChild(safe);
    logs.appendChild(div);
    logs.scrollTop = logs.scrollHeight;
}

function mostrarDigitando() {
    const logs = document.getElementById("chatbot-logs");
    const id = "typing-" + Date.now();
    logs.innerHTML += `
        <div class="chat-msg bot digitando" id="${id}">
            <span></span><span></span><span></span>
        </div>`;
    logs.scrollTop = logs.scrollHeight;
    return id;
}

function removerDigitando(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}