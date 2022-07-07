let pokemonRepository = (function () {

  let pokemonList = [
    {
      name: 'Charmander',
      height: 0.6,
      types: [
      'fire'
      ],
    },
    {
      name: 'Weedle',
      height: 0.3,
      types: [
      'bug',
      'poison'
      ],
    },
    {
      name: 'Parasect',
      height: 1,
      types: [
      'grass',
      'bug'
      ],
    },
    {
      name: 'Metapod',
      height: 0.7,
      types: [
      'bug'
      ]
    }
  ];

  function getAll() {
      return pokemonList;
    }
  function add (item) {
    return pokemonList.push(item);
  }
  function addListItem(pokemon) {
    let list = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listItem.appendChild(button);
    list.appendChild(listItem);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
  }

})();

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
