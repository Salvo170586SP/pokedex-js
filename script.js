const list = document.getElementById('list');
const avanti = document.getElementById('avanti');
const indietro = document.getElementById('indietro');
const descrizione = document.getElementById('descrizione');
const dettagli = document.getElementById('dettagli');
let pokemonData = []; // Array che conterrà i dati dei Pokémon


let currentIndex = 0;

fetch('pokedex.json')
    .then(response => response.json())
    .then(data => {

        pokemonData = data;
        imgCurrent()
    })
    .catch(error => console.error('Si è verificato un errore:', error));


function imgCurrent() {
    // Rimuovi l'immagine precedente se presente
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    const currentPokemon = pokemonData[currentIndex];
    const imgFigure = document.createElement('div');
    imgFigure.className = 'col d-flex flex-column justify-content-center align-items-center';
    imgFigure.innerHTML = `<figure class="figure-img "><img  src="${currentPokemon.image.thumbnail}" alt="${currentPokemon.name.english}"><h1 class="text-white text-center mt-3">${currentPokemon.name.english}</h1></figure>  `;
    list.appendChild(imgFigure);

    const text = document.createElement('div');
    text.className = 'text-content text-hidden';
    text.innerHTML = `<h6 class="text-white">${currentPokemon.name.english}</h6> <p class="text-white">${currentPokemon.description}</p>`;
    list.appendChild(text);


    const detailText = document.createElement('div');
    detailText.className = 'text-content-detail text-hidden-detail fs-6';
    detailText.innerHTML = `<h3 class="text-white mb-3">${currentPokemon.name.english}</h3> 
    ${currentPokemon.type ? `<p class="text-white">Tipo: ${currentPokemon.type} </p>` : ''}
    ${currentPokemon.species ? `<p class="text-white">Specie: ${currentPokemon.species} </p>` : ''}
    ${currentPokemon.evolution.prev ? `<p class="text-white">Evoluzione: ${currentPokemon.evolution.prev} </p>` : ''}
    ${currentPokemon.profile ? `<p class="text-white">Altezza: ${currentPokemon.profile.height} </p>` : ''}
    ${currentPokemon.profile ? `<p class="text-white">Larghezza: ${currentPokemon.profile.weight} </p>` : ''}
    ${currentPokemon.profile ? `<p class="text-white">Genere: ${currentPokemon.profile.gender} </p>` : ''}`;
    list.appendChild(detailText);
}



avanti.addEventListener('click', function () {
    currentIndex++
    if (currentIndex >= pokemonData.length) {
        currentIndex = 0;
    }

    imgCurrent();


})

indietro.addEventListener('click', function () {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = pokemonData.length - 1;
    }
    imgCurrent();
});


descrizione.addEventListener('click', function () {
    const text = document.querySelector('.text-content');
    const img = document.querySelector('figure');
    const textShow = text.classList.toggle('text-show');
    document.querySelector('.text-content-detail').classList.remove('text-show-detail');

    if (textShow) {
        img.style.filter = 'blur(10px) brightness(0.2)'
    } else {
        img.style.filter = 'blur(0)'
    }
});


dettagli.addEventListener('click', function () {
    const detailText = document.querySelector('.text-content-detail');
    const img = document.querySelector('figure');
    const textShowDetail = detailText.classList.toggle('text-show-detail');
    document.querySelector('.text-content').classList.remove('text-show');


    if (textShowDetail) {
        img.style.filter = 'blur(10px) brightness(0.2)'
    } else {
        img.style.filter = 'blur(0)'
    }
});