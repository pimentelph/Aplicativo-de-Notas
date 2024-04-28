function criarNotas(){
    var divPai = document.getElementById('divPaiNotas');
    var divFilha = document.createElement('div'); //Cria a div das notas
    var botaoExcluir = document.createElement('button'); //Crio o botão para excluir
    
    divFilha.className = 'divNotas'; //Atribui a classe que eu criei no CSS

    botaoExcluir.innerText = 'Excluir'; //Coloca um texto dentro do botão
    botaoExcluir.className = 'botao'; //Atribui a classe que eu criei no CSS
    botaoExcluir.style.backgroundColor = "red"; //Mudei a cor do fundo para vermelho
    botaoExcluir.style.color = "aliceblue" //Muda a cor da letra para Alice Blue
    botaoExcluir.onclick = function() { //Manipulador de evento para toda vez que o botão é clicado
        divPai.removeChild(divFilha); //Exclui a divFilha da div nota
    }

    divFilha.appendChild(botaoExcluir); //Adiciona o botão na div filha
    divPai.appendChild(divFilha); //Adiciona a div filha na div pai
}

document.getElementById('criarNota').addEventListener("click", criarNotas);
