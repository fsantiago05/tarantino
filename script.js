const cardConteiner = document.querySelector(".card-container");
const campoBusca = document.querySelector("#campo-busca");
let dados = [];

// Função para carregar os dados do JSON e renderizar todos os cards inicialmente.
async function carregarDados() {
    try {
        const resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarCards(dados);
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
    }
}

function iniciarBusca() {
    const termoBusca = campoBusca.value.toLowerCase();

    if (termoBusca.trim() === "") {
        renderizarCards(dados); // Mostra todos se a busca estiver vazia
        return;
    }

    const resultados = dados.filter(dado =>
        dado.nome.toLowerCase().includes(termoBusca)
    );

    renderizarCards(resultados);
}

function renderizarCards(cardsParaRenderizar) {
    cardConteiner.innerHTML = ""; // Limpa os cards existentes antes de renderizar novos
    for (const dado of cardsParaRenderizar) {
        const link = document.createElement("a");
        link.href = dado.trailer_link;
        link.target = "_blank"; // Abre o link em uma nova aba
        link.classList.add("card-link"); // Adiciona uma classe para estilização opcional

        const article = document.createElement("article");
        article.classList.add("film-card");
        article.innerHTML = `
            <img src="${dado.poster}" alt="Pôster do filme ${dado.nome}" class="film-card__image">
            <div class="film-card__content">
                <h2>${dado.nome}</h2>
                <span class="release-year">${dado.ano}</span>
                <p>${dado.sinopse}</p>
            </div>`;
        link.appendChild(article);
        cardConteiner.appendChild(link);
    }
}

// Carrega os dados assim que o script é executado.
carregarDados();
