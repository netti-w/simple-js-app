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
  return {
    getAll: getAll,
    add: add
  }

})();

// Displaying all the pokemon names and height of all objects in PokemonList with an forEach loop
pokemonRepository.getAll().forEach(function (pokemon) {
  if(pokemon.height > 0.7){
    document.write(`<p>"${pokemon.name}" (height: ${pokemon.height}) - Wow, that’s big!</p>`);
    /* Another way to write the output
    document.write('<p>'+ pokemon.name + '(height: ' + pokemon.height + ') - Wow, that’s big!'+'</p>');*/
  }
  else {
    document.write(`<p>"${pokemon.name}" (height: ${pokemon.height})</p>`);
  }
});
