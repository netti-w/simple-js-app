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

// Displaying all the pokemon names and height of all objects in PokemonList with an forEach loop
pokemonList.forEach(function (pokemon) {
  if(pokemon.height > 0.7){
    document.write(`<p>"${pokemon.name}" (height: ${pokemon.height}) - Wow, that’s big!</p>`);
    /* Another way to write the output
    document.write('<p>'+ pokemon.name + '(height: ' + pokemon.height + ') - Wow, that’s big!'+'</p>');*/
  }
  else {
    document.write(`<p>"${pokemon.name}" (height: ${pokemon.height})</p>`);
  }
});
