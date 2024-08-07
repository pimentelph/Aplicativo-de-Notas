import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

// Função para criar um novo elemento HTML
function criarElemento(tag, classe, estilos) {
    var elemento = document.createElement(tag);
    if (classe) elemento.className = classe;
    if (estilos) {
        for (var estilo in estilos) {
            elemento.style[estilo] = estilos[estilo];
        }
    }
    return elemento;
}

// Função para criar um botão HTML
function criarBotao(texto, classe, estilos, eventoClique) {
    var botao = criarElemento('button', classe, estilos);
    botao.innerText = texto;
    botao.onclick = eventoClique;
    return botao;
}

// Função para criar a estrutura completa de uma nota
function criarDivNota(conteudo = '', dataCriacao = '') {
    var divFilha = criarElemento('div', 'divNotas');
    var divCabecalho = criarElemento('div', 'divCabecalho');
    var texto = criarElemento('textarea', 'texto');
    var textoMark = criarElemento('p', 'textoMark');

    textoMark.style.display = 'none';
    texto.readOnly = false;
    texto.placeholder = "Pode digitar!";
    texto.value = conteudo;

    // Função para excluir a nota
    var botaoExcluir = criarBotao(
        'Excluir',
        'botao',
        { backgroundColor: "red", color: "aliceblue" },
        function () {
            var divPai = document.getElementById('divPaiNotas');
            divPai.removeChild(divFilha);
            salvarNotas();
        }
    );

    // Função para editar/salvar a nota
    var botaoEditar = criarBotao(
        'Salvar',
        'botao',
        { backgroundColor: "blue", color: "aliceblue" },
        function () {
            if (texto.readOnly) {
                // Trocar para modo de edição
                texto.readOnly = false;
                textoMark.style.display = 'none';
                texto.style.display = 'block';
                botaoEditar.innerText = 'Salvar';
                texto.placeholder = "Pode digitar!";
            } else {
                // Trocar para modo de visualização
                texto.readOnly = true;
                texto.style.display = 'none';
                textoMark.style.display = 'block';
                textoMark.innerHTML = marked.parse(texto.value);
                botaoEditar.innerText = 'Editar texto';
                salvarNotas();
            }
        }
    );

    var data = dataCriacao || new Date();
    var textoData = criarElemento('p', null, null);
    textoData.textContent = `Data de criação: ${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()} às ${data.getHours()}:${data.getMinutes()}`;

    divCabecalho.appendChild(botaoEditar);
    divCabecalho.appendChild(botaoExcluir);
    divCabecalho.appendChild(textoData);
    divFilha.appendChild(divCabecalho);
    divFilha.appendChild(texto);
    divFilha.appendChild(textoMark);

    return divFilha;
}

// Função para criar uma nova nota e adicionar à 'divPaiNotas'
function criarNotas() {
    var divPai = document.getElementById('divPaiNotas');
    var divFilha = criarDivNota();
    divPai.appendChild(divFilha);
    salvarNotas();
}

// Função para salvar as notas no localStorage
function salvarNotas() {
    var notas = [];
    var divPai = document.getElementById('divPaiNotas');
    var divsNotas = divPai.getElementsByClassName('divNotas');
    for (var divNota of divsNotas) {
        var texto = divNota.querySelector('textarea').value;
        var dataTexto = divNota.querySelector('p').textContent;
        notas.push({ conteudo: texto, data: dataTexto });
    }
    localStorage.setItem('notas', JSON.stringify(notas));
}

// Função para carregar as notas do localStorage
function carregarNotas() {
    var notas = JSON.parse(localStorage.getItem('notas')) || [];
    var divPai = document.getElementById('divPaiNotas');
    for (var nota of notas) {
        var dataPartes = nota.data.match(/(\d+)\/(\d+)\/(\d+) às (\d+):(\d+)/);
        var dataCriacao = new Date(dataPartes[3], dataPartes[2] - 1, dataPartes[1], dataPartes[4], dataPartes[5]);
        var divFilha = criarDivNota(nota.conteudo, dataCriacao);
        divPai.appendChild(divFilha);
    }
}

// Adicionar evento ao botão de criar nota
document.getElementById('criarNota').addEventListener("click", criarNotas);

// Carregar notas ao carregar a página
window.onload = carregarNotas;
