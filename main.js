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
function criarDivNota() {
    var divFilha = criarElemento('div', 'divNotas');
    var divCabecalho = criarElemento('div', 'divCabecalho');
    var texto = criarElemento('textarea', 'texto');
    var textoMark = criarElemento('p', 'textoMark');

    textoMark.style.display = 'none';
    texto.readOnly = false;
    texto.placeholder = "Pode digitar!";

    // Função para excluir a nota
    var botaoExcluir = criarBotao(
        'Excluir', 
        'botao', 
        { backgroundColor: "red", color: "aliceblue" }, 
        function() {
            var divPai = document.getElementById('divPaiNotas');
            divPai.removeChild(divFilha);
        }
    );

    // Função para editar/salvar a nota
    var botaoEditar = criarBotao(
        'Salvar', 
        'botao', 
        { backgroundColor: "blue", color: "aliceblue" }, 
        function() {
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
            }
        }
    );

    var data = new Date();
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
}

document.getElementById('criarNota').addEventListener("click", criarNotas);
