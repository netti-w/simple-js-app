let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function addListItem(pokemon) {
    // Creates a pokemon item as a button in the HTML list that has pokemon-list class and assignes a button class
    let list = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let listButton = document.createElement('button');
    listButton.innerText = pokemon.name;
    listButton.classList.add('button-class');
    listItem.appendChild(listButton);
    list.appendChild(listItem);
    listButtonEventListener(listButton, pokemon);
  }

  // Event listener shows pokemon details in a modal on click
  function listButtonEventListener(listButton, pokemon) {
    listButton.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
  }

  /* Promise fetching JSON data from external API url asynchronously
  if response, then next promise fetching name and detailURL for each pokemon
  and add to list via add function, if rejected show error in console */
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  /* Promise fetching data from detailURL,
  if response next promise fetch specific details from detailURL, if data can't
  load, show error */
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
      pokemon.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  // Promise fetching data asynchronously
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    // Clear all existing modal content
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    // Add the new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'X';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = `${pokemon.name} (#${pokemon.id})`;

    let contentElement = document.createElement('p');
    contentElement.innerHTML = `Height: ${pokemon.height}
    <br>Weight: ${pokemon.weight}`;

    let typesElement = document.createElement('p');
    typesElement.innerText = `Types: ${pokemon.types}`;

    let imageElement = document.createElement('img');
    imageElement.src = pokemon.imageUrl;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(imageElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);
    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  // Adding eventListener closing modal if ESC key is pressed AND only if modal is open
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
  // Since this is also triggered when clicking INSIDE the modal
  // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
