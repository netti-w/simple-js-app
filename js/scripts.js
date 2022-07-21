let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function addListItem(pokemon) {
    // Creates a pokemon item as a button in the HTML list that has pokemon-list class and assignes a button class
    let list = document.querySelector('.list-group');
    let listItem = document.createElement('li');
    listItem.classList.add('group-list-item');
    let listButton = document.createElement('button');
    listButton.classList.add('btn', 'btn-lg', 'btn-outline-primary', 'btn-block my-2');
    listButton.innerText = pokemon.name;
    listItem.appendChild(listButton);
    list.appendChild(listItem);
    listButton.setAttribute('type', 'button');
    listButton.setAttribute('data-toggle', 'modal');
    listButton.setAttribute('data-target', '#pokemon-modal');
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
    let modalTitle = document.querySelector('.modal-title');
    let modalBody = document.querySelector('.modal-body');

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
