const apiUrl = window.__API_URL__;
const lista = document.getElementById('lista');
const form = document.getElementById('form');

// Cargar tareas al inicio
async function cargarTareas() {
  const res = await fetch(`${apiUrl}/tareas`);
  const tareas = await res.json();
  lista.innerHTML = '';

  tareas.forEach(t => crearItem(t));
}

// Crear elemento visual
function crearItem(tarea) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${tarea.texto}</span>
    <button class="delete">X</button>
  `;

  li.querySelector('.delete').onclick = async () => {
    await fetch(`${apiUrl}/tareas/${tarea.id}`, { method: 'DELETE' });
    cargarTareas();
  };

  lista.appendChild(li);
}

// Añadir tarea
form.onsubmit = async e => {
  e.preventDefault();
  const texto = document.getElementById('texto').value;

  await fetch(`${apiUrl}/tareas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ texto })
  });

  form.reset();
  cargarTareas();
};

cargarTareas();