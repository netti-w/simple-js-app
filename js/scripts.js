/* eslint-env jquery */
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function search(name) {
    let result = getAll().filter((pokemon) => pokemon.name === name);
    // filter returns an array, so we need to get the pokemon by index
    return result[0];
  }

  function addListItem(pokemon) {
    // Creates a pokemon item as a button in the HTML list that has pokemon-list class and assignes a button class
    let list = document.querySelector('.list-group');
    let listItem = document.createElement('li');
    listItem.classList.add('group-list-item');
    let listButton = document.createElement('button');
    listButton.classList.add('btn','btn-lg','btn-outline-primary','btn-block', 'my-2', 'text-capitalize', 'pokemon-name');
    listButton.innerText = pokemon.name;
    listItem.appendChild(listButton);
    list.appendChild(listItem);
    listButton.setAttribute('type', 'button');
    listButton.setAttribute('data-toggle', 'modal');
    listButton.setAttribute('data-target', '#pokemon-modal');
    listButtonEventListener(listButton, pokemon); // calling button event listener function
  }

  // Event listener open modal on click
  function listButtonEventListener(listButton, pokemon) {
    listButton.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  function loadList() {
    // fetch method to asynchronously request pokemon data and return promise
    return fetch(apiUrl).then(function (response) {
      return response.json(); // call response parsing data as JSON
    }).then(function (json) { // return promise
      json.results.forEach(function (item) { //successful -> call back actual data
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) { // if rejected
      console.error(e); // call back console error
    })
  }

  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      pokemon.id = details.id;
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.weight = details.weight;
      pokemon.types = details.types.map((type) => type.type.name).join(', ');
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon)
    });
  }

  // Modal
  function showModal(pokemon) {
    let modalTitle = $('.modal-title');
    let modalBody = $('.modal-body');

    // Empty existing modal content
    modalTitle.empty();
    modalBody.empty();

    let titleElement = (`${pokemon.name} (#${pokemon.id})`);
    let heightElement = (`Height: ${pokemon.height}<br>`);
    let weightElement = (`Weight: ${pokemon.weight}<br>`);
    let typesElement = (`Types: ${pokemon.types}<br>`);
    let imageElement = document.createElement('img');
    imageElement.setAttribute('aria-label', 'front picture of pokemon');
    imageElement.src = pokemon.imageUrl;

    modalTitle.append(titleElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(imageElement);
  }

  return {
    getAll: getAll,
    add: add,
    search: search,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  }
})();

pokemonRepository.loadList().then(function() {
  // data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

//search function
function searchFunction(event) {
  let pokemonNames = document.getElementsByClassName('pokemon-name');
  let { value } = event.target;
  let searchQuery = value.toLowerCase();
  for (let pokemonName of pokemonNames) {
    let name = pokemonName.textContent.toLowerCase();
    //display pokemon name if it contains value inside of search
    if (name.includes(searchQuery)) {
      pokemonName.closest('li').style.display = 'inline-block';
    } else {
      pokemonName.closest('li').style.display = 'none';
    }
  }
}

let search = document.getElementById('searchValue');
search.addEventListener('keyup', searchFunction);
// eventhandler on click does not work
// let search = document.getElementById('searchButton');
// search.addEventListener('click', searchFunction);
