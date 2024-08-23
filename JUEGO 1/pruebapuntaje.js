import { readFileSync } from 'fs';

const datos = JSON.parse(readFileSync('palabras.json', 'utf8'));

function obtenerpalabra_aleatoria(nivel) {
    let palabras = datos[`nivel_${nivel}`];
    let randomIndex = Math.floor(Math.random() * palabras.length);
    return palabras[randomIndex];
}


console.log(obtenerpalabra_aleatoria(1)); // devuelve una palabra aleatoria del nivel 1
