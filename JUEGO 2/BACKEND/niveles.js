import readlineSync from "readline-sync";
import fs from "fs";

// Leer los datos de los archivos JSON
let niveles = JSON.parse(fs.readFileSync("niveles.json", "utf-8") || "{}");
let puntajes = JSON.parse(fs.readFileSync("puntaje.json", "utf-8") || "{}");

// Guardar los puntajes en puntaje.json
function guardarPuntaje() {
  fs.writeFileSync("puntaje.json", JSON.stringify(puntajes, null, 2), "utf-8");
}

// Solicitar el nivel a jugar
let nivel;
while (isNaN(nivel) || nivel < 1 || nivel > 3) {
  nivel = parseInt(readlineSync.question("¿Qué nivel quieres jugar del 1 al 3? "), 10);
  if (isNaN(nivel) || nivel < 1 || nivel > 3) {
    console.log("Por favor, ingresa un número válido entre 1 y 3.");
  }
}

// Función para manejar el juego y enviar datos del nivel al frontend
function jugarNivel(nivel) {
  const nivelClave = `nivel_${nivel}`;
  const palabrasDelNivel = niveles[nivelClave];

  // Mostrar palabras e imágenes en el frontend (simulado aquí con console.log)
  console.log(`\nNivel ${nivel}:`);
  palabrasDelNivel.forEach((item) => {
    console.log(`Palabra: ${item.palabra} - Imagen: ${item.imagen}`);
  });

  // Actualizar el puntaje dependiendo de si es la primera o segunda vez que se juega el nivel
  actualizarPuntaje(nivel);
  console.log(`Puntaje actualizado: ${puntajes[`juego_${nivel}`].puntaje} puntos`);
}

// Función para actualizar el puntaje
function actualizarPuntaje(nivel) {
  let nivelClave = `juego_${nivel}`;

  // Si es la primera vez que se juega el nivel, asignar 10 puntos
  if (!puntajes[nivelClave]) {
    puntajes[nivelClave] = { puntaje: 10 };
  } else {
    // Si ya se jugó antes, asignar 5 puntos
    puntajes[nivelClave].puntaje += 5;
  }

  // Guardar los puntajes actualizados
  guardarPuntaje();
}

// Ejecutar el juego para el nivel seleccionado
jugarNivel(nivel);
