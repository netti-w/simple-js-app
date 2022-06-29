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

for (let i=0; i < pokemonList.length; i++) {
  document.write(`"${pokemonList[i].name}" (height: ${pokemonList[i].height})  `);
}
