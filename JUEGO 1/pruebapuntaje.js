import { readFileSync } from 'fs';
const data = JSON.parse(readFileSync('palabras.json', 'utf8'));
function obtenerpalabra_aleatoria(nivel) {
    let palabras = data[`nivel_${nivel}`];
    
    // Declarar 'randomIndex' con 'let'
    let randomIndex = Math.floor(Math.random() * palabras.length);
    
    // Retornar una palabra aleatoria
    return palabras[randomIndex];
  }
  