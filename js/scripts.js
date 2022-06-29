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

// Displaying all the pokemon names and height of all objects in PokemonList
for (let i=0; i < pokemonList.length; i++) {

  // conditional checks the height in each object in the array, if greater than 0.7
  if(pokemonList[i].height > 0.7){
    document.write(`<p>"${pokemonList[i].name}" (height: ${pokemonList[i].height}) Wow, that’s big!</p>`);
  }
  else {
    document.write(`<p>"${pokemonList[i].name}" (height: ${pokemonList[i].height})</p>`);
    /* Another way to write the output
    document.write(pokemonList[i].name + " (height: " + pokemonList[i].height" <br>");*/
  }
}
