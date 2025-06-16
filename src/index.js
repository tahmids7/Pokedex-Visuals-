
const POKEMON_DATA = [
	{ id: 1, name: "bulbasaur" },
	{ id: 4, name: "charmander" },
	{ id: 7, name: "squirtle" },
	{ id: 25, name: "pikachu" },
	{ id: 39, name: "jigglypuff" },
	{ id: 137, name: "porygon" },
	{ id: 144, name: "articuno" },
	{ id: 151, name: "mew" },
	{ id: 175, name: "togepi" },
	{ id: 249, name: "lugia" },
	{ id: 393, name: "piplup" },
	{ id: 399, name: "bidoof" },
	{ id: 483, name: "dialga" },
	{ id: 727, name: "incineroar" },
	{ id: 792, name: "lunala" },
	];
  
	window.onload = async () => {
	const pokedex = document.getElementById("pokedex");
	const leftPanelClosed = document.getElementById("left-panel-closed");
	const openButton = document.getElementById("open-arrow");
	const closeButton = document.getElementById("close-circle");
	const showPokemon = document.getElementById("pokemon-display");
	const showName = document.getElementById("name-display");
	const pokemonList = document.getElementById("pokemon-list");
	const randButton = document.getElementById("random-button");
	const leftkeyArrow = document.querySelector('.arrow.left');
	const rightkeyArrow = document.querySelector('.arrow.right');
	const upkeyArrow = document.querySelector('.arrow.up');
	const downkeyArrow = document.querySelector('.arrow.down');
  

	let selectedPokemon = POKEMON_DATA[0];
	const columns = 3;
	const totalItems = POKEMON_DATA.length;
	const numOfRows = Math.ceil(totalItems / columns);
  
	const getSelectedPokemon = () => {
	  return POKEMON_DATA.findIndex(pokemon => pokemon.id === selectedPokemon.id);
	};
  
	const updatePokemon = () => {
	  const pokemonUrl = `img/${selectedPokemon.id}.png`; 
	  const pokemonName = selectedPokemon.name.toUpperCase();
  
	  showPokemon.querySelector("img").src = pokemonUrl;
	  showName.textContent = pokemonName;
	};
  
	const renderList = () => {
	  pokemonList.innerHTML = ""; 
	  POKEMON_DATA.forEach((pokemon) => {
	  const listItem = document.createElement("div");
	  listItem.classList.add("pokemon-list-item", "pokedex-blue");
  
	  const pokemonImage = document.createElement("img");
	  pokemonImage.src = `img/${pokemon.id}.png`; 
	  pokemonImage.alt = pokemon.name;
  
	  listItem.appendChild(pokemonImage);
  
	  listItem.addEventListener("click", () => {
		
		const everyItem = document.querySelectorAll(".pokemon-list-item");
		everyItem.forEach((item) => item.classList.remove("selected-list-item"));
  
		listItem.classList.add("selected-list-item");
  
		selectedPokemon = pokemon; 
		updatePokemon(); 
	  });
  
	  pokemonList.appendChild(listItem); 
	  });
  
	  const everyItem = document.querySelectorAll(".pokemon-list-item");
	  everyItem[0].classList.add("selected-list-item");
	};
  
	const selectRandom = () => {
	  const randomIndex = Math.floor(Math.random() * POKEMON_DATA.length); 
	  const randomPokemon = POKEMON_DATA[randomIndex]; 
  
	  
	  if (randomPokemon !== selectedPokemon) {
	  selectedPokemon = randomPokemon;  
	  updatePokemon(); 
  
  
	  const everyItem = document.querySelectorAll(".pokemon-list-item");
	  everyItem.forEach((item) => item.classList.remove("selected-list-item"));
  
	  const listItems = Array.from(pokemonList.children);
	  const randomPokemonItem = listItems.find(
		(item) => item.querySelector("img").alt === randomPokemon.name,
	  );
	  randomPokemonItem.classList.add("selected-list-item");
	  }
	};
  
	const navigate = (direction) => {
	  const index = getSelectedPokemon();
	  let newIndex = index;
	  const row = Math.floor(index / columns);
	  const col = index % columns;
  
	  if (direction === 'left') {
	  if (col > 0) {
		newIndex = index - 1;
	  }
	  } else if (direction === 'right') {
	  if (col < columns - 1 && index + 1 < totalItems) {
		newIndex = index + 1;
	  }
	  } else if (direction === 'up') {
	  if (row > 0) {
		newIndex = index - columns;
	  }
	  } else if (direction === 'down') {
	  if (row < numOfRows - 1 && index + columns < totalItems) {
		newIndex = index + columns;
	  }
	  }
  
	  if (newIndex !== index) {
	  selectedPokemon = POKEMON_DATA[newIndex];
	  updatePokemon();
  
	  const everyItem = document.querySelectorAll(".pokemon-list-item");
	  everyItem.forEach((item) => item.classList.remove("selected-list-item"));
  
	  const listItems = Array.from(pokemonList.children);
	  const selectedItem = listItems[newIndex];
	  selectedItem.classList.add("selected-list-item");
	  }
	};
  
	const onInit = () => {
	  pokedex.style = "display: none";
	  openButton.addEventListener("click", () => {
	  pokedex.style = "display: flex";
	  leftPanelClosed.style = "display: none";
	  });
  
	  closeButton.addEventListener("click", () => {
	  pokedex.style = "display: none";
	  leftPanelClosed.style = "display: block";
	  });
	};
  
	updatePokemon();
	  
	randButton.addEventListener("click", () => {
	  selectRandom(); 
	});
  
	leftkeyArrow.addEventListener('click', () => {
	  navigate('left');
	});
  
	rightkeyArrow.addEventListener('click', () => {
	  navigate('right');
	});
  
	upkeyArrow.addEventListener('click', () => {
	  navigate('up');
	});
  
	downkeyArrow.addEventListener('click', () => {
	  navigate('down');
	});
  
	document.addEventListener('keydown', (event) => {
	  if (event.key === 'ArrowLeft') {
	  navigate('left');
	  } else if (event.key === 'ArrowRight') {
	  navigate('right');
	  } else if (event.key === 'ArrowUp') {
	  navigate('up');
	  } else if (event.key === 'ArrowDown') {
	  navigate('down');
	  }
	});
  
	renderList();
  
	onInit();
	};
  
