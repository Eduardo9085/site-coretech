const modal = document.getElementById("modal");
const texto = document.getElementById("textoModal");


function abrirPC(){
modal.style.display="flex";
texto.innerHTML=`
<h2>História dos Computadores</h2>
<br>
<p>
Os primeiros computadores surgiram como máquinas de cálculo.
Com o avanço da eletrônica nasceram os computadores modernos.
</p>
<br>
<p>
O ENIAC foi um dos primeiros computadores eletrônicos.
Depois vieram processadores, placas de vídeo e PCs gamers.
</p>
<br>
<p>
Hoje computadores possuem alto desempenho para jogos,
programação e criação de conteúdo.
</p>
`;
}

function abrirNotebook(){
modal.style.display="flex";
texto.innerHTML=`

<h2>História dos Notebooks</h2>
<br>
<p>
Os notebooks surgiram na década de 1980 buscando
levar computadores para qualquer lugar.
</p>
<br>
<p>
Com o tempo ficaram menores, mais rápidos
e mais eficientes.
</p>
<br>
<p>
Atualmente existem notebooks gamers com
placas de vídeo avançadas e alto desempenho.
</p>
`;
}

function fecharModal(){
modal.style.display="none";
}

const anuncios=[
`
<h4>Curso Full Stack</h4>
<p>HTML CSS JavaScript e Backend</p>
`,
`
<h4>Faculdade ADS</h4>
<p>Desenvolvimento de Sistemas</p>
`,
`
<h4>Engenharia de Software</h4>
<p>Criar sistemas profissionais</p>
`
];

let i=0;
document.getElementById("anuncio").innerHTML=anuncios[i];
setInterval(()=>{
i++;
if(i>=anuncios.length){
i=0;
}
document.getElementById("anuncio").innerHTML=anuncios[i];
},10000);