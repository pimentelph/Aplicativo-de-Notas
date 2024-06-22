// criarElemento = cria um novo elemento HTML, aplicando uma classe CSS e estilos inline
// tag = tag do elemento HTML a ser criado, como "div", "button" e etc
// classe = classe CSS a ser aplicada ao elemento, podemos colocar null ou undefined
// estilos = um objeto contendo pares de chave-valor para estilos CSS
// retorna o elemento HTML criado
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

// criarBotao = cria um botão HTML com texto, uma classe HTML, estilos inline e um manipulador de eventos ao clicar no botão
// texto = texto que vai estar no botão
// classe = classe CSS a ser aplicada no botão
// estilos = objeto contendo pares de chave-valor para estilos CSS
// eventoClique = função que será executada quando o botão for clicado
// retorna o botão HTML criado
function criarBotao(texto, classe, estilos, eventoClique) {
    var botao = criarElemento('button', classe, estilos);
    botao.innerText = texto;
    botao.onclick = eventoClique;
    return botao;
}

// criarDivNota = cria a estrutura comopleta de uma nota, incluindo a área de texto, os botões de editar e excluir e a data de criação
function criarDivNota() {
    var divFilha = criarElemento('div', 'divNotas');
    var divCabecalho = criarElemento('div', 'divCabecalho');
    var texto = criarElemento('textarea', 'texto');

    texto.readOnly = false;
    texto.placeholder = "Pode digitar!";

    var botaoExcluir = criarBotao(
        'Excluir', 
        'botao', 
        { backgroundColor: "red", color: "aliceblue" }, 
        function() {
            var divPai = document.getElementById('divPaiNotas');
            divPai.removeChild(divFilha);
        }
    );

    var botaoEditar = criarBotao(
        'Salvar', 
        'botao', 
        { backgroundColor: "blue", color: "aliceblue" }, 
        function() {
            if (texto.readOnly) {
                texto.readOnly = false;
                botaoEditar.innerText = 'Salvar';
                texto.placeholder = "Pode digitar!";
            } else {
                texto.readOnly = true;
                botaoEditar.innerText = 'Editar texto';
                texto.placeholder = "";
                texto.style.resize = "none";
            }
        }
    );

    var data = new Date();
    var textoData = document.createElement('p');
    textoData.textContent = `Data de criação: ${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()} às ${data.getHours()}:${data.getMinutes()}`; //Template Literals

    divCabecalho.appendChild(botaoEditar);
    divCabecalho.appendChild(botaoExcluir);
    divCabecalho.appendChild(textoData);
    divFilha.appendChild(divCabecalho);
    divFilha.appendChild(texto);

    return divFilha;
}

// criarNotas = Cria uma nova nota e adiciona à 'divPaiNotas'
function criarNotas() {
    var divPai = document.getElementById('divPaiNotas');
    var divFilha = criarDivNota();
    divPai.appendChild(divFilha);
}

document.getElementById('criarNota').addEventListener("click", criarNotas);