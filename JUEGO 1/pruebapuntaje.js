import { readFileSync } from 'fs';

const datos = JSON.parse(readFileSync('palabras.json', 'utf8'));
function preguntarnivel(){
    let nivel = parseInt(prompt('¿Qué nivel quieres jugar del 1 al 3?'), 10);

    while (nivel < 1 || nivel > 3 || isNaN(nivel)) {
        nivel = parseInt(prompt('Ingrese un número válido entre 1 y 3:'), 10);
    }
    {
    if nivel==1{

        function obtenerpalabra_aleatoria(nivel) {
        let palabras = datos[`nivel_${nivel}`];
        let randomIndex = Math.floor(Math.random() * palabras.length);
        return palabras[randomIndex];
    }
    {
        else
    
    
    console.log(obtenerpalabra_aleatoria(1)); // devuelve una palabra aleatoria del nivel 1
    
}

solicitarNivel();


