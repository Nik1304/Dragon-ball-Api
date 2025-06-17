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
  
  // Mostrar lista de personajes
function showCharacters(list) {
    const cont = document.getElementById('characters');
    cont.innerHTML = '';
    list.forEach(c => {
      const d = document.createElement('div');
      d.className = 'card';
      d.innerHTML = `
        <img src="${c.image}" alt="${c.name}">
        <h3>${c.name}</h3>
        <p><strong>Raza:</strong> ${c.race||'Desconocida'}</p>
        <p><strong>Género:</strong> ${c.gender||'Desconocido'}</p>
        <p><strong>Planeta:</strong> ${c.originPlanet||'Desconocido'}</p>`;
      cont.appendChild(d);
    });
  }

// Mostrar sección activa
function showSection(id) {
    document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'grid';
  }
  
  // Botón iniciar
  document.getElementById('startBtn').onclick = () => {
    document.getElementById('intro-screen').style.display = 'none';
    document.querySelector('header').style.display = 'block';
    document.querySelector('main').style.display = 'block';
    const music = document.getElementById('bg-music');
    music.volume = 0.3;
    music.play();
    fetchCharacters();
    fetchPlanets();
    showSection('characters');
  };
  
  // Controlar música
  document.getElementById('toggleMusic').onclick = function() {
    const m = document.getElementById('bg-music');
    if (m.paused) {
      m.play();
      this.textContent = '⏸ Pausar Música';
    } else {
      m.pause();
      this.textContent = '▶️ Reproducir Música';
    }
  };
  
  // Búsqueda instantánea
  document.getElementById('searchInput').addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    showCharacters(characters.filter(c => c.name.toLowerCase().includes(q)));
  });
  