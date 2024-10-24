import readlineSync from "readline-sync";
import fs from "fs";
import { startServer, onEvent } from 'soquetic'

// Leer los datos de los archivos JSON
let palabras = JSON.parse(fs.readFileSync('palabras.json', 'utf8'));
let palabrasusadas = JSON.parse(fs.readFileSync("palabrasusadas.json", "utf-8") || "{}");
let puntajes = JSON.parse(fs.readFileSync("puntaje.json", "utf-8") || "{}");

function guardarpalabrasusadas() {
    fs.writeFileSync("palabrasusadas.json", JSON.stringify(palabrasusadas, null, 2), "utf-8");
}

function guardarPuntaje() {
    fs.writeFileSync("puntaje.json", JSON.stringify(puntajes, null, 2), "utf-8");
}

// con el nivel q me pasa juli
let nivel;
while (isNaN(nivel) || nivel < 1 || nivel > 3) {
  nivel = parseInt(readlineSync.question("¿Qué nivel quieres jugar del 1 al 3?"), 10);
  if (isNaN(nivel) || nivel < 1 || nivel > 3) {
    console.log("Por favor, ingresa un número válido entre 1 y 3.");
  }
}

// Función para obtener una palabra aleatoria de un nivel específico
function obtenerPalabraAleatoria(nivel) {
    let nivel_palabra_aleatoria = `nivel_${nivel}`;
    
    // Crear un array vacío para almacenar las palabras disponibles
    let palabrasDisponibles = [];
    
    // Obtener todas las palabras para el nivel actual
    let todasLasPalabras = palabras[nivel_palabra_aleatoria];
    
    // Recorrer todas las palabras del nivel
    for (let i = 0; i < todasLasPalabras.length; i++) {
        let palabraActual = todasLasPalabras[i].palabra;

        // Verificar si la palabra actual ya se ha usado
        let palabraUsada = palabrasusadas[nivel_palabra_aleatoria]?.includes(palabraActual);
        // Si la palabra no se ha usado, agregarla a las disponibles
        if (!palabraUsada) {
            palabrasDisponibles.push(todasLasPalabras[i]);
        }
    }

    // Comprobar si hay palabras disponibles
    if (palabrasDisponibles.length === 0) {
        console.log(`¡Has completado todas las palabras en el Nivel ${nivel}! Puedes continuar al siguiente nivel.`);
        return null;
    }

    // Seleccionar una palabra aleatoria de las disponibles
    let randomIndex = Math.floor(Math.random() * palabrasDisponibles.length);
    let palabraSeleccionada = palabrasDisponibles[randomIndex];

    // Marcar la palabra como usada
    if (!palabrasusadas[nivel_palabra_aleatoria]) {
        palabrasusadas[nivel_palabra_aleatoria] = [];
    }
    palabrasusadas[nivel_palabra_aleatoria].push(palabraSeleccionada.palabra);

    guardarpalabrasusadas();
    
    return palabraSeleccionada;
}

// Función para actualizar el puntaje
function actualizarPuntaje(nivel) {
    let nivel_clave = `juego_${nivel}`;
    
    // Si el nivel nunca se jugo, asignar 10 puntos por cada palabra correcta
    if (!puntajes[nivel_clave]) {
        puntajes[nivel_clave] = { puntaje: 10 }; // Primera vez
    } else {
        // Si ya se jugo antes, asignar 5 puntos por cada palabra correcta
        puntajes[nivel_clave].puntaje += 5; // Segunda vez o más
    }

    guardarPuntaje();
}
// Obtener la palabra y mostrarla
let palabraSeleccionada = obtenerPalabraAleatoria(nivel);
if (palabraSeleccionada) {
    console.log(`\nNivel ${nivel}:`);
    console.log(`Palabra: ${palabraSeleccionada.palabra}`);
    console.log(`Imagen: ${palabraSeleccionada.imagen}\n`);

    // Actualizar el puntaje dependiendo de si es la primera o segunda vez que se juega el nivel
    actualizarPuntaje(nivel);
    console.log(`Puntaje actualizado: ${puntajes[`juego_${nivel}`].puntaje} puntos`);
} else {
    console.log("No hay palabras disponibles para este nivel.");
}


