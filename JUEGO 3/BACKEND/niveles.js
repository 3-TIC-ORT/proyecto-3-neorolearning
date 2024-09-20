import fs from 'fs';
import readlineSync from 'readline-sync';

// Leer los datos de los archivos JSON
let niveles = JSON.parse(fs.readFileSync('niveles.json', 'utf-8') || '{}');
let puntajes = JSON.parse(fs.readFileSync('puntaje.json', 'utf-8') || '{}');

// Guardar los puntajes en puntaje.json
function guardarPuntaje() {
    fs.writeFileSync('puntaje.json', JSON.stringify(puntajes, null, 2), 'utf-8');
}

// Solicitar el nivel a jugar
let nivel;
while (isNaN(nivel) || nivel < 1 || nivel > 3) {
    nivel = parseInt(readlineSync.question('¿Qué nivel quieres jugar del 1 al 3? '), 10);
    if (isNaN(nivel) || nivel < 1 || nivel > 3) {
        console.log('Por favor, ingresa un número válido entre 1 y 3.');
    }
}

// Función para manejar el juego y mostrar datos del nivel
function jugarNivel(nivel) {
    const nivelClave = `nivel_${nivel}`;
    const palabrasDelNivel = niveles[nivelClave];
    let palabrasUsadas = [];

    for (let i = 0; i < palabrasDelNivel.length; i++) {
        const item = palabrasDelNivel[i];

        // Mostrar la palabra e imagen en la consola
        console.log(`\nImagen: ${item.imagen}`);
        console.log(`Palabras: ${palabrasDelNivel.map(p => p.palabra).join(', ')}`);

        // Pedir al usuario que adivine la palabra
        let respuesta = readlineSync.question('¿Cuál es la palabra correspondiente a la imagen? ');

        // Comprobar si la respuesta es correcta
        if (respuesta.toLowerCase() === item.palabra.toLowerCase()) {
            console.log('¡Correcto!');
            actualizarPuntaje(nivel);
        } else {
            console.log(`Incorrecto. La palabra era: ${item.palabra}`);
        }

        // Marcar la palabra como usada
        palabrasUsadas.push(item.palabra);
    }

    console.log(`Has completado el nivel ${nivel}!`);
}

// Función para actualizar el puntaje
function actualizarPuntaje(nivel) {
    let nivelClave = `juego_${nivel}`;

    // Si es la primera vez que se juega, asignar 10 puntos
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
