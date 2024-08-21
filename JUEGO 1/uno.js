const palabra = ['b', 'a', 'r', 'c', 'o']; // Letras a mostrar
const ordenCorrecto = ['b', 'a', 'r', 'c', 'o']; // Orden correcto para los rectángulos

// Selecciona los elementos del DOM
const rectangulos = document.querySelectorAll('.rectangulo');
const letrasContainer = document.querySelector('.letras');

// Mezcla las letras para mostrar en un orden aleatorio
function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Índice aleatorio
        [array[i], array[j]] = [array[j], array[i]]; // Intercambia elementos
    }
}

// Inicializa el juego
function inicializarJuego() {
    mezclarArray(palabra);

    // Crea los botones de letras y los agrega al contenedor
    palabra.forEach(letra => {
        const boton = document.createElement('div');
        boton.textContent = letra;
        boton.classList.add('letra');
        boton.dataset.letra = letra; // Guarda la letra en un atributo de datos
        boton.addEventListener('click', manejarClickLetra);
        letrasContainer.appendChild(boton);
    });

    // Inicializa los rectángulos vacíos
    rectangulos.forEach(rect => rect.textContent = '');
}

// Maneja el clic en una letra
let indiceOrden = 0; // Controla el orden correcto de las letras
function manejarClickLetra(e) {
    const letraSeleccionada = e.target.dataset.letra;

    // Verifica si la letra seleccionada es la correcta en el orden actual
    if (letraSeleccionada === ordenCorrecto[indiceOrden]) {
        // Encuentra el índice del rectángulo vacío
        const rectangulo = rectangulos[indiceOrden];
        rectangulo.textContent = letraSeleccionada; // Muestra la letra en el rectángulo
        

        // Avanza al siguiente índice en el orden correcto
        indiceOrden++;
    }
}

// Inicia el juego al cargar la página
document.addEventListener('DOMContentLoaded', inicializarJuego);