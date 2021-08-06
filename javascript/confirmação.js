let resumo_produtos = document.querySelector(".resumo");
let info_entrga = document.querySelector(".entrega");
let dados = JSON.parse(sessionStorage.getItem('meus_dados'));
let index = document.querySelector("#index").addEventListener("click", function(){limpar_carrinho()});
let index2 = document.querySelector("#index2").addEventListener("click", function(){limpar_carrinho()});

function iniciar_resumo(){ //exibindo resumo do pedido na tela inicial
    let total = 0;
    for(let i=0; i<dados.length; i++){
        let valor = parseFloat(dados[i].preço)*parseFloat(dados[i].quantidade);
        total += valor;
        let valorReal = valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        resumo_produtos.innerHTML += `
        <div class="itens">
            <img src="${dados[i].imagem}" alt="imagem teste"/> 
            <p class="nome">${dados[i].nome}</p>
            <p class="preço">Valor: ${valorReal}</p>
            <p>Quantidade: ${dados[i].quantidade}</p>
        </div> `
    }
    let totalReal =  total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    resumo_produtos.innerHTML += `
    <div id="total">
        <p>Total: ${totalReal}</p>
    </div>`;
}

function iniciar_infoEntrega(){ //exibindo informações de entrega do pedido na tela inicial
    let numPedido = sessionStorage.getItem('numPedido');
    let date = new Date().toLocaleDateString('pt-BR', {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
    info_entrga.innerHTML += `
        <div class="info">
            <p>Frete: ${sessionStorage.getItem("frete")}</p>
            <p>Tempo de envio: ${sessionStorage.getItem("temp")} dias</p>
            <p>Número do pedido: ${numPedido}</p>
            <p>Pedido realizado em ${date}</p>
            <img src="pic/icons/inTransit.gif" alt="caminhao a caminho">
        </div>
    `
}

function limpar_carrinho(){ 
//limpando o carrinho apos compra realizada (assim quando o usuário voltar a pagina principal o carrinho estara vazio)
    dados = " ";
    sessionStorage.setItem('meus_dados', dados);
}

iniciar_infoEntrega();
iniciar_resumo();