import { calculoAgregado, filtroTipo, ordenarPoke, pesquisarPoke}
    from './data.js';
import data from './data/pokemon/pokemon.js';

const poke = data.pokemon;
const pcMewtwo = Number(poke[149].stats["max-cp"]);

function imprimir(pokemon) {
    const listaPokemon = document.getElementById("listaPokemon");
    listaPokemon.innerHTML = "";
    
    for (let teste of pokemon) {
        let listaCards = document.createElement("div");
        listaCards.classList.add("flip-container");
        let flip = document.createElement("div");
        flip.classList.add("flipper");
        let card = document.createElement("div");
        card.classList.add("front");
        let versoCard = document.createElement("div");
        versoCard.classList.add("back");
        let h2 = document.createElement("h2");
        let imagem = document.createElement("img");
        let numero = document.createElement("span");
        let tipo = document.createElement("p");
        let raridade = document.createElement("p");
        tipo.classList.add("tipo");
        let fraquezas = document.createElement("p");
        let resistencias = document.createElement("p");
        let maximoPC = document.createElement("p");
        let calculoPCMax = document.createElement("footer");
        let pcMax = Number(teste.stats["max-cp"]);
        const calculoPC = calculoAgregado(pcMax, pcMewtwo);
        
        imagem.src = teste.img;
        h2.innerHTML = teste.name;
        numero.innerHTML = "#".bold() + teste.num.bold();
        tipo.innerHTML = "Tipo: ".bold() + teste.type;
        raridade.innerHTML = "Raridade: ".bold() + teste["pokemon-rarity"];
        fraquezas.innerHTML = "Fraqueza: ".bold() + teste.weaknesses;
        resistencias.innerHTML = "Resistência: ".bold() + teste.resistant;
        calculoPCMax.innerHTML = "Esse pokemon tem um PC Máximo de "+String(calculoPC).bold()+ "%".bold() + " em relação ao pokemon com maior PC Máximo da 1ª geração(Mewtwo).";
        maximoPC.innerHTML = "PC Máximo: ".bold() + teste.stats["max-cp"];
        
        card.appendChild(h2);
        card.appendChild(imagem);
        card.appendChild(numero);
        card.appendChild(tipo);
        card.appendChild(raridade);

        versoCard.appendChild(fraquezas);
        versoCard.appendChild(resistencias);

        if(teste.evolution["next-evolution"]){ 
            let proxEvolucao = document.createElement("p");
            proxEvolucao.innerHTML = "Próxima Evolução: ".bold() + teste.evolution["next-evolution"][0].name;
            versoCard.appendChild(proxEvolucao);
                if(teste.evolution["next-evolution"][0]["next-evolution"]){
                    let proxEvolucao2 = document.createElement("p");
                    proxEvolucao2.innerHTML = "Próxima Evolução: ".bold() + teste.evolution["next-evolution"][0]["next-evolution"][0].name;
                    versoCard.appendChild(proxEvolucao2);
                }
        }
        
        if(teste.evolution["prev-evolution"]){ 
            let anteriorEvolucao = document.createElement("p");
            anteriorEvolucao.innerHTML = "Evolução Anterior: ".bold() + teste.evolution["prev-evolution"][0].name;
            versoCard.appendChild(anteriorEvolucao);
                if(teste.evolution["prev-evolution"][0]["prev-evolution"]){
                    let anteriorEvolucao2 = document.createElement("p");
                    anteriorEvolucao2.innerHTML = "Evolução Anterior: ".bold() + teste.evolution["prev-evolution"][0]["prev-evolution"][0].name;
                    versoCard.appendChild(anteriorEvolucao2);
                }
        }
        
        versoCard.appendChild(maximoPC);
        versoCard.appendChild(calculoPCMax); 
        flip.appendChild(card);
        flip.appendChild(versoCard);
        listaCards.appendChild(flip);
        listaPokemon.appendChild(listaCards);
    }
}

imprimir(poke);

const ordenar = document.getElementById("ordenar");
ordenar.addEventListener("change", function selecionarOrdem () {
    const selecaoOrdem = document.getElementById("ordenar").value;
    const ordens = ordenarPoke(poke, selecaoOrdem);
    imprimir(ordens);
});

const filtrar = document.getElementById("filtroTipo");
filtrar.addEventListener("change", function filtrarTipo(){
    const selecaoFiltro = document.getElementById("filtroTipo").value;
    const filtros = filtroTipo(poke, selecaoFiltro);
    if(selecaoFiltro == ""){
        imprimir(poke);
    } else {
        imprimir(filtros);
    }
});

const inputPesquisar = document.getElementById("pesquisar")
inputPesquisar.addEventListener("keyup", function filtrarNome(){
    const nomePoke = String(document.getElementById("pesquisar").value);
    const pesquisar = pesquisarPoke(poke, nomePoke);
    if(nomePoke == ""){
        imprimir(poke);
    } else{
        imprimir(pesquisar);
    }
});