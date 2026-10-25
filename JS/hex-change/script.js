const inputRojo = document.getElementById('rojo');
const inputVerde = document.getElementById('verde');
const inputAzul = document.getElementById('azul');

const textoRojo = document.getElementById('texto-rojo');
const textoVerde = document.getElementById('texto-verde');
const textoAzul = document.getElementById('texto-azul');

let rojo = inputRojo.value;
let verde = inputVerde.value;
let azul = inputAzul.value;

function actualizarColor(rojo, verde, azul) {
  const colorRgb = `rgb(${rojo}, ${verde}, ${azul})`;
  document.body.style.backgroundColor = colorRgb;
}

// Para actualizar Rojo

inputRojo.addEventListener('change', (event) => {
  let rojo = event.target.value;
  textoRojo.textContent = rojo;
  actualizarColor(rojo, verde, azul);
});

// Para actualizar Azul

inputAzul.addEventListener('change', (event) => {
  let azul = event.target.value;
  textoRojo.textContent = azul;
  actualizarColor(rojo, verde, azul);
});

// Para actualizar Verde

inputVerde.addEventListener('change', (event) => {
  let verde = event.target.value;
  textoRojo.textContent = verde;
  actualizarColor(rojo, verde, azul);
});
