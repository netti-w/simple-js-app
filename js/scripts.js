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
    /*
    // DOES NOT WORK!!!
    if (typeof(item) !== 'object'){
      console.log("Invalid entry! This is not an object");
    }
    else if (Object.keys(item) !== ['name', 'height', 'weight', 'types']) {
      console.log("Invalid entry! Object keys name does not exist.");
    }
    else {
      return pokemonList.push(item);
    }*/
    return pokemonList.push(item);
  }
  // Add function for next exercise (1.7)
  function showDetails(pokemon) {
    console.log(pokemon)
  }

  function addListItem(pokemon) {
    /* Creates a pokemon item as a button in the HTML list
    that has pokemon-list class,  and assignes a button class*/
    let list = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listItem.appendChild(button);
    list.appendChild(listItem);

    /* Event listener shows each pokemon item array in the console on click
    and changes colour to green on click */
    button.addEventListener('click', function (event) {
      let target = event.target;
      target.classList.toggle('button-class--green');
      showDetails(pokemon);
    });
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
