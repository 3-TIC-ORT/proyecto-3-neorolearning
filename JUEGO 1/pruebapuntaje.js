import readlineSync from "readline-sync";
import fs from "fs";

let palabras = JSON.parse(readFileSync('palabras.json', 'utf8'));
let palabrasusadas = JSON.parse(fs.readFileSync("palabrasusadas.json", "utf-8"));
function guardarpalabrasusadas() {
    fs.writeFileSync("palabrasusadas.json", JSON.stringify(palabrasusadas, null, 2), "utf-8");
}
// solicitar nivel 
let nivel;
while (nivel === undefined || nivel < 1 || nivel > 3) {
  nivel = parseInt(readlineSync.question("¿Qué nivel queres jugar del 1 al 3?"), 10);
  if (isNaN(nivel) || nivel < 1 || nivel > 3) {
    console.log("Por favor, ingresa un número válido entre 1 y 3.");
    nivel = undefined;
  }
}

// función para obtener una palabra aleatoria de un nivel específico
function obtenerPalabraAleatoria(nivel) {
    let nivel_palabra_aleatoria = `nivel_${nivel}`;
    // crear un array vacío para almacenar las palabras disponibles
let palabrasDisponibles = [];

// Obtener todas las palabras para el nivel actual
let todasLasPalabras = palabrasData[nivel_palabra_aleatoria];

// Recorrer todas las palabras del nivel
for (let i = 0; i < todasLasPalabras.length; i++) {
    let palabraActual = todasLasPalabras[i].palabra;

    // Verificar si la palabra actual ya ha sido usada
    let palabraUsada = false;
    for (let j = 0; j < palabrasUsadas[claveNivel].length; j++) {
        if (palabrasUsadas[nivel_palabra_aleatoria][j] === palabraActual) {
            palabraUsada = true;
            break;
        }
    }

    // Si la palabra no ha sido usada, agregarla a las disponibles
    if (!palabraUsada) {
        palabrasDisponibles.push(todasLasPalabras[i]);
    }
}
  
    // Comprobar si hay palabras disponibles
    if (palabrasDisponibles.length === 0) {
      console.log("No quedan palabras disponibles en este nivel.");
      return null;
    }
  
    // Seleccionar una palabra aleatoria de las disponibles
    let randomIndex = Math.floor(Math.random() * palabrasDisponibles.length);
    return palabrasDisponibles[randomIndex];
  }
  

  let randomIndex = Math.floor(Math.random() * palabrasDisponibles.length);
  let palabraSeleccionada = palabrasDisponibles[randomIndex];

  // Marcar la palabra como usada
  palabrasUsadas[nivelKey].push(palabraSeleccionada.palabra);
  guardarPalabrasUsadas();

  return palabraSeleccionada;
}

// Obtener la palabra y mostrarla
let palabraSeleccionada = obtenerPalabraAleatoria(nivel);
if (palabraSeleccionada) {
  console.log(`\nNivel ${nivel}:`);
  console.log(`Palabra: ${palabraSeleccionada.palabra}`);
  console.log(`Imagen: ${palabraSeleccionada.imagen}\n`);
} else {
  console.log("No hay más palabras disponibles en este nivel.");
}

console.log("¡Gracias por jugar!");