const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const pokemonModal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const closeBtn = document.querySelector('.close');

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <span class="height">height - ${pokemon.height}</span>
            <span class="weight">weight - ${pokemon.weight}</span>
            <span class="base">experience - ${pokemon.base}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <ol class="abilities">
                    ${pokemon.abilities.map((ability) => `<li class="ability ${ability}">Special Move - ${ability}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

pokemonList.addEventListener('click', (event) => {
    const clickedPokemon = event.target.closest('.pokemon');
    
    if (clickedPokemon) {
        const pokemonData = {
            number: clickedPokemon.querySelector('.number').textContent,
            name: clickedPokemon.querySelector('.name').textContent,
            typeHtml: clickedPokemon.querySelector('.type').innerHTML,
            typesHtml: clickedPokemon.querySelector('.types').innerHTML,
            imgHtml: clickedPokemon.querySelector('img').outerHTML,
            height: clickedPokemon.querySelector('.height').textContent,
            weight: clickedPokemon.querySelector('.weight').textContent,
            base: clickedPokemon.querySelector('.base').textContent,
            abilityHtml: clickedPokemon.querySelector('.ability').innerHTML,
            abilitiesHtml: clickedPokemon.querySelector('.abilities').innerHTML,
        };

        modalContent.innerHTML = `
        <li class="pokemon ${pokemonData.typeHtml}">
            <span class="number">#${pokemonData.number}</span>
            <span class="name">${pokemonData.name}</span>
            <span class="height">${pokemonData.height}</span>
            <span class="weight">${pokemonData.weight}</span>
            <span class="base">${pokemonData.base}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemonData.typesHtml}
                </ol>

                <ol class="abilities">
                    ${pokemonData.abilitiesHtml}
                </ol>

                <img ${pokemonData.imgHtml}
            </div>
        </li>
        `;

        pokemonModal.style.display = 'block';
    }
});

closeBtn.addEventListener('click', () => {
    pokemonModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === pokemonModal) {
        pokemonModal.style.display = 'none';
    }
});