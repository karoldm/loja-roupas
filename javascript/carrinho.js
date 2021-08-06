let resumo_produtos = document.querySelector(".resumo_itens");
let dadosform = document.querySelector(".dadosform")
let submit = document.querySelector("#submit");
let dados = JSON.parse(sessionStorage.getItem('meus_dados'));

submit.addEventListener("click", function(){Enviar_Form()});

function iniciar_carrinho(){ //exibindo itens que o usuario add ao carrinho na tela inicial
    let total = 0;
    for(let i=0; i<dados.length; i++){
        let valor = parseFloat(dados[i].preço)*parseFloat(dados[i].quantidade);
        total += valor;
        let valorReal = valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        resumo_produtos.innerHTML += `
        <div class="itens">
           <img src="${dados[i].imagem}" alt="imagem teste"/> 
           <p class="nome">${dados[i].nome}</p>
           <p class="preço">${valorReal}</p>
           <div class="quantidade"><p>${dados[i].quantidade}</p></div>
           <div class="delete" onclick="DeleteItem(${i})"><img src="pic/icons/trash.png"></div>
        </div> `
    }
    let totalReal =  total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    resumo_produtos.innerHTML += `
    <div id="total">
        <p>Total</p>
        <p>${totalReal}</p>
    </div>`;
}

function Enviar_Form(){
    let nome = document.querySelector("#nome").value;
    let sobrenome = document.querySelector("#sobrenome").value;
    let email = document.querySelector("#email").value;
    let cpf = document.querySelector("#cpf").value;
    let tel = document.querySelector("#tel").value;
    let rua = document.querySelector("#rua").value;
    let bairro = document.querySelector("#bairro").value;
    let cidade = document.querySelector("#cidade").value;
    let estado = document.querySelector("#estado").value;
    if(dados.length == 0){ alert('Seu carrinho está vazio!')}
    else if(nome && sobrenome && cpf && email && tel && rua && bairro && cidade){
        let frete = Math.floor(Math.random() *45 + 10); //gerando um frete aleatório entre 10 e 45
        let freteReal = frete.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}); //convertendo frete para real BR
        let temp = Math.floor(Math.random() *15 + 2); //gerando tempo de envio aleatório entre 2 e 15 dias
        dadosform.innerHTML = `
        <div id="confirmar_dados">
            <p>Ola ${nome} ${sobrenome}, por favor confirme seus dados antes de finalizar a compra!</p>
            <p>CPF: ${cpf}</p>
            <p>Email: ${email}</p>
            <p>Telefone: ${tel}</p>
            <p>Endereço: ${rua}</p>
            <p>Bairro: ${bairro}</p>
            <p>Cidade: ${cidade} - ${estado}</p>
            <p style="color: red;">frete: ${freteReal}</p>
            <p style="color: red;">tempo de envio: ${temp} dias</p>
        </div>
         `;
         let finalizar = document.createElement("button");
        finalizar.innerHTML = "Finalizar Compra";
        finalizar.style.borderRadius = "10px"
        finalizar.style.position = "relative";
        finalizar.style.left = "35%";
        finalizar.style.top = "15%";
        finalizar.style.padding = "10px";
        finalizar.addEventListener("click", function(){
            let numPedido = Math.floor(Math.random() *995763 + 125648);
            sessionStorage.setItem("numPedido", numPedido);
            window.location.href = "confirmação.html"; //abrindo pagina de confirmação do pedido se o usuário finalizar a compra
        })
        dadosform.appendChild(finalizar);
        sessionStorage.setItem('frete', freteReal); //guardando frete e tempo para exibir na pagina de confirmação
        sessionStorage.setItem('temp', temp);
     } //if
     else{ alert('Por favor preencha todos os dados.')}
}

function DeleteItem(id){ //deletando um item selecionado do carrinho
    if(dados[id].quantidade != '1'){
        dados[id].quantidade --;
        resumo_produtos.innerHTML = " ";
        iniciar_carrinho(); //atualizando o carrinho apos o item deletado
    }
    else{
        dados.splice(id, 1);
        let new_dados = JSON.stringify(dados);
        sessionStorage.setItem('meus_dados', new_dados);
        resumo_produtos.innerHTML = " ";
        iniciar_carrinho(); //atualizando o carrinho apos o item deletado
    }
}

iniciar_carrinho();