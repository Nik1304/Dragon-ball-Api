let characters = [];

// Cargar personajes
async function fetchCharacters() {
  try {
    const res = await fetch('https://dragonball-api.com/api/characters?limit=100');
    const data = await res.json();
    characters = data.items;
    showCharacters(characters);
  } catch (e) {
    console.error('Error cargando personajes', e);
  }
}