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

// Cargar planetas
async function fetchPlanets() {
    try {
      const res = await fetch('https://dragonball-api.com/api/planets?limit=20');
      const data = await res.json();
      const cont = document.getElementById('planets');
      cont.innerHTML = '';
      data.items.forEach(p => {
        const d = document.createElement('div');
        d.className = 'card';
        d.innerHTML = `<h3>${p.name}</h3><p>${p.residents?.length || 0} habitantes</p>`;
        cont.appendChild(d);
      });
    } catch (e) {
      console.error('Error cargando planetas', e);
    }
  }
  