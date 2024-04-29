function criarNotas(){
    var divPai = document.getElementById('divPaiNotas');
    var divFilha = document.createElement('div'); //Cria a div das notas
    
    divFilha.className = 'divNotas'; //Atribui a classe que eu criei no CSS

    var botaoExcluir = document.createElement('button'); //Crio o botão para excluir
    botaoExcluir.innerText = 'Excluir'; //Coloca um texto dentro do botão
    botaoExcluir.className = 'botao'; //Atribui a classe que eu criei no CSS
    botaoExcluir.style.backgroundColor = "red"; //Mudei a cor do fundo para vermelho
    botaoExcluir.style.color = "aliceblue" //Muda a cor da letra para Alice Blue
    botaoExcluir.onclick = function() { //Manipulador de evento para toda vez que o botão é clicado
        divPai.removeChild(divFilha); //Exclui a divFilha da div nota
    }

    var texto = document.createElement('textarea');
    texto.className = 'texto';
    texto.readOnly = false;
    texto.placeholder = "Pode digitar!"

    var botaoEditar = document.createElement('button'); //Crio o botão para excluir
    botaoEditar.innerText = 'Salvar'; //Coloca um texto dentro do botão
    botaoEditar.className = 'botao'; //Atribui a classe que eu criei no CSS
    botaoEditar.style.backgroundColor = "blue"; //Mudei a cor do fundo para azul
    botaoEditar.style.color = "aliceblue" //Muda a cor da letra para Alice Blue
    botaoEditar.onclick = function() { //Manipulador de evento para toda vez que o botão é clicado
        if (texto.readOnly){
            texto.readOnly = false;
            botaoEditar.innerText = 'Salvar';
            texto.placeholder = "Pode digitar!"
        } else {
            texto.readOnly = true;
            botaoEditar.innerText = 'Editar texto';
            texto.placeholder = "";
            texto.style.resize = "none";
        }
    }

    
    divFilha.appendChild(botaoEditar); //Adiciona o botão na div filha
    divFilha.appendChild(botaoExcluir); //Adiciona o botão na div filha
    divFilha.appendChild(texto); //Adiciona a caixa de texto na div filha
    divPai.appendChild(divFilha); //Adiciona a div filha na div pai
}

document.getElementById('criarNota').addEventListener("click", criarNotas);