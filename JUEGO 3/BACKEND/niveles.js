import fs from "fs";
import { startServer, onEvent, sendEvent } from 'soquetic'; // Importar SoqueTIC

// Leer los datos de los archivos JSON
let palabras = JSON.parse(fs.readFileSync('palabras.json', 'utf8'));
let palabrasUsadas = JSON.parse(fs.readFileSync("palabrasusadas.json", "utf-8") || "{}");
let puntajes = JSON.parse(fs.readFileSync("puntaje.json", "utf-8") || "{}");

// Guardar funciones
function guardarPalabrasUsadas() {
    fs.writeFileSync("palabrasusadas.json", JSON.stringify(palabrasUsadas, null, 2), "utf-8");
}

function guardarPuntaje() {
    fs.writeFileSync("puntaje.json", JSON.stringify(puntajes, null, 2), "utf-8");
}

// Función para obtener una palabra aleatoria de un nivel específico
function obtenerPalabraAleatoria(nivel, juego) {
    let nivelPalabraAleatoria = `nivel_${nivel}`;
    let palabrasDisponibles = [];
    let todasLasPalabras = palabras[juego][nivelPalabraAleatoria];

    // Verificar las palabras disponibles
    for (let i = 0; i < todasLasPalabras.length; i++) {
        let palabraActual = todasLasPalabras[i].palabra;
        let palabraUsada = palabrasUsadas[juego]?.[nivelPalabraAleatoria]?.includes(palabraActual);
        if (!palabraUsada) {
            palabrasDisponibles.push(todasLasPalabras[i]);
        }
    }

    if (palabrasDisponibles.length === 0) {
        console.log(`¡Has completado todas las palabras en el Nivel ${nivel} del juego ${juego}!`);
        return null; // No hay palabras disponibles
    }

    let randomIndex = Math.floor(Math.random() * palabrasDisponibles.length);
    let palabraSeleccionada = palabrasDisponibles[randomIndex];

    if (!palabrasUsadas[juego]) {
        palabrasUsadas[juego] = {};
    }
    if (!palabrasUsadas[juego][nivelPalabraAleatoria]) {
        palabrasUsadas[juego][nivelPalabraAleatoria] = [];
    }
    palabrasUsadas[juego][nivelPalabraAleatoria].push(palabraSeleccionada.palabra);
    guardarPalabrasUsadas();

    return palabraSeleccionada; // Retorna la palabra seleccionada del juego
}

// Función para actualizar el puntaje
function actualizarPuntaje(nivel, juego) {
    let nivelClave = `juego_${juego}_${nivel}`; // Define la clave del juego

    if (!puntajes[nivelClave]) {
        puntajes[nivelClave] = { puntaje: 10 }; // Primer intento
    } else {
        puntajes[nivelClave].puntaje += 5; // Intentos adicionales
    }

    guardarPuntaje();
}

// Función principal para manejar cada juego
function jugarJuego(nivel, juego) {
    console.log(`\nIniciando Juego ${juego} en el Nivel ${nivel}`);
    let palabraSeleccionada = obtenerPalabraAleatoria(nivel, juego);
    if (palabraSeleccionada) {
        console.log(`Palabra: ${palabraSeleccionada.palabra}`);
        console.log(`Imagen: ${palabraSeleccionada.imagen}\n`);
        actualizarPuntaje(nivel, juego);
        console.log(`Puntaje actualizado: ${puntajes[`juego_${juego}_${nivel}`].puntaje} puntos`);
        sendEvent(`resultadoJuego${juego}`, { palabra: palabraSeleccionada.palabra, puntaje: puntajes[`juego_${juego}_${nivel}`].puntaje });
    }
}

// Manejar eventos de SoqueTIC para el inicio de los juegos
onEvent('iniciarJuego', (data) => {
    const { nivel, juego } = data; // Obtener el nivel y el juego del evento
    if (nivel >= 1 && nivel <= 3 && ['juego1', 'juego2', 'juego3'].includes(juego)) {
        jugarJuego(nivel, juego);
    } else {
        console.log("Nivel o juego inválido.");
    }
});

// Iniciar el servidor de SoqueTIC
startServer(3000, () => {
    console.log("Servidor SoqueTIC iniciado en el puerto 3000.");
});
