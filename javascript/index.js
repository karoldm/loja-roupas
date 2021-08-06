let vitrine = document.querySelector(".vitrine");
let qtdItensText = document.querySelector("#qtd_itens");
let dados_selecionados = [];
let qtd = 0;
let itensFiltrado = [];
let para_enviar;

qtdItensText.innerHTML = qtd;
para_enviar = JSON.stringify(dados_selecionados);
sessionStorage.setItem('meus_dados', para_enviar);

function iniciar_vitrine(){ //exibindo todos os itens na pagina inicial
    itensFiltrado = [];
    vitrine.innerHTML = "";
    for(let i=0; i<produtos.length; i++){
        itensFiltrado.push(produtos[i]);
        vitrine.innerHTML += 
        `<div class="itens">
            <img src="${produtos[i].imagem}" alt="imagem produto" /> 
            <div class="info">
                <p>${produtos[i].nome}</p>
                <p>R$ ${produtos[i].preço}</p>
            </div>
            <a class="addcarrinho" onclick="add_carrinho(${i})">Carrinho</a>
        </div> `
    }
    let links = document.querySelector(".addcarrinho");
}

function iniciar_menu(){ //adicionando eventos necessários ao menu
    document.querySelector("#todos").addEventListener("click", function(){iniciar_vitrine()}); 
    document.querySelector("#feminino").addEventListener("click", function(){AbrirSubMenu("subFeminino", "feminino")});
    document.querySelector("#masculino").addEventListener("click", function(){AbrirSubMenu("subMasculino", "masculino")});
    document.querySelector("#todos_feminino").addEventListener("click", function(){filtrar(null, "feminino")});
    document.querySelector("#todos_masculino").addEventListener("click", function(){filtrar(null, "masculino")});
    document.querySelector("#preçoText").addEventListener("click", function(){AbrirSubMenu('preço', 'preçoText')});
    document.querySelector("#categoriasText").addEventListener("click", function(){AbrirSubMenu('categorias', 'categoriasText')});
}

function AbrirSubMenu(idsub, idprincipal){
    let SubMenu = document.getElementById(idsub);
    SubMenu.style.display = "block";
    document.getElementById(idprincipal).removeEventListener("click", function(){AbrirSubMenu(idsub, idprincipal)});
    document.getElementById(idprincipal).addEventListener("click", function(){FecharSubMenu(idsub, idprincipal)});
    
}

function FecharSubMenu(idsub, idprincipal){
    let SubMenu = document.getElementById(idsub);
    SubMenu.style.display = "none";
    document.getElementById(idprincipal).removeEventListener("click", function(){FecharSubMenu(idsub, idprincipal)});
    document.getElementById(idprincipal).addEventListener("click", function(){AbrirSubMenu(idsub, idprincipal)});
}

function filtrar(categoria, genero){
    itensFiltrado = [ ];
    vitrine.innerHTML = " ";
    if(categoria == null){ //caso categoria nao seja especificada entao o usuario quer todos os itens daquele genero
        for(let i=0; i<produtos.length; i++){
            if( genero == produtos[i].genero){
                itensFiltrado.push(produtos[i]);
                vitrine.innerHTML +=
                `<div class="itens">
                    <img src="${produtos[i].imagem}" alt="imagem produto"/> 
                    <div class="info">
                        <p>${produtos[i].nome}</p>
                        <p>R$ ${produtos[i].preço}</p>
                    </div>
                    <a class="addcarrinho" onclick="add_carrinho(${i})">Carrinho</a>
                </div> `
            }//if 
        }//for
    }//if 
    else{ 
        for(let i=0; i<produtos.length; i++){
            if(categoria == produtos[i].categoria && genero == produtos[i].genero){
                itensFiltrado.push(produtos[i]);
                vitrine.innerHTML +=
                    `<div class="itens">
                        <img src="${produtos[i].imagem}" alt="imagem produto"/> 
                        <div class="info">
                            <p>${produtos[i].nome}</p>
                            <p>R$ ${produtos[i].preço}</p>
                        </div>
                        <a class="addcarrinho" onclick="add_carrinho(${i})">Carrinho</a>
                    </div> `
            }//if 
        }//for
    }//else
}

function filtrarPreço(p){
    if(p == 'maior'){ 
        itensFiltrado.sort(function compare(a,b){ 
            if (parseInt(a.preço) < parseInt(b.preço))
                return 1;
            if (parseInt(a.preço) > parseInt(b.preço))
                return -1;
            return 0;
        });
    }//if
    else if(p == 'menor'){
        itensFiltrado.sort(function compare(a,b){
            if (parseInt(a.preço) < parseInt(b.preço))
                return -1;
            if (parseInt(a.preço) > parseInt(b.preço))
                return 1;
            return 0;
        });
    }//else
    vitrine.innerHTML = "";
    for(let i=0; i<itensFiltrado.length; i++){
        vitrine.innerHTML +=
            `<div class="itens">
                <img src="${itensFiltrado[i].imagem}" alt="imagem produto"/> 
                <div class="info">
                    <p>${itensFiltrado[i].nome}</p>
                    <p>R$ ${itensFiltrado[i].preço}</p>
                </div>
                <a class="addcarrinho" onclick="add_carrinho(${i})">Carrinho</a>
            </div> `
    }//for
}

function add_carrinho(id){
    if(produtos[id].quantidade == 0){
    produtos[id].quantidade++;
    dados_selecionados.push(produtos[id]);
    qtd++;
    qtdItensText.innerHTML = qtd;
    }
    else { //não ha necessidade de add o mesmo item varias vezes em dados_selecionados, apenas indicar a quantidade
        produtos[id].quantidade++;
        qtd++;
        qtdItensText.innerHTML = qtd;
    }
    para_enviar = JSON.stringify(dados_selecionados);
    sessionStorage.setItem('meus_dados', para_enviar);
}
iniciar_vitrine();
iniciar_menu();
