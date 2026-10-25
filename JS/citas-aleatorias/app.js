let botonElem = document.getElementById('boton-cambiar-cita');
let citaElement = document.getElementById('cita');
let autorElement = document.getElementById('autor');

function generarEnteroAleatorio(min, max) {
  // Sin incluir max en los valores posibles, por eso se hace max - min
  return Math.floor(Math.random() * (max - min) + min);
}

function cambiarCita() {
  let indiceAleatorio = generarEnteroAleatorio(0, citas.length);
  citaElement.innerText = `${citas[indiceAleatorio].texto}`;
  autorElement.innerText = citas[indiceAleatorio].autor;
}

cambiarCita(); // Llamada inicial para mostrar una cita al cargar la página

botonElem.addEventListener('click', cambiarCita);
