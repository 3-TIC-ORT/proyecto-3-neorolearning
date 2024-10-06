import { onEvent, sendEvent, startServer } from "soquetic";
import fs from "fs";
import { actualizarPuntaje } from './JUEGO1/niveles.js';

//recibir que juego es de front
function recibirjuego(data){
  const { juego } = data;
  console.log(` juego recibido: ${juego}`);
  return { msg: `Juego ${juego} procesado correctamente.` };
  
};
onEvent("juego",recibirjuego);
//recibir que nivel es del front
  function recibirnivel(data){
    const { nivel } = data;
    console.log(` Nivel recibido: ${data.msg}`);
    return { msg: `Nivel ${nivel} procesado correctamente.` };
};
onEvent("nivel",recibirnivel);
 
  function recibirnivel(data){
    const { nivel } = data;
    console.log(` Nivel recibido: ${data.msg}`);
    return { msg: `Nivel ${nivel} procesado correctamente.` };
  // Escuchar evento cuando el usuario selecciona un nivel
};
onEvent("nivel",recibirnivel);
  // enviar el puntaje
   function enviarpuntaje(data){
     const { actualizarPuntaje } = data;
  };
  sendEvent(actualizarPuntaje, enviarpuntaje);
 
// Evento para obtener palabras del nivel
onEvent('obtenerNivel', (data, callback) => {
    const { nivel } = data;
    const nivelClave = `nivel_${nivel}`;
    const palabrasDelNivel = niveles[nivelClave];

    // Enviar las palabras y sus imágenes al frontend
    callback(palabrasDelNivel);
});
// Leer los datos de los archivos JSON
let niveles = JSON.parse(fs.readFileSync('niveles.json', 'utf-8') || '{}');

// Evento para obtener palabras del nivel
onEvent('obtenerNivel', (data, callback) => {
    const { nivel } = data;
    const nivelClave = `nivel_${nivel}`;
    const palabrasDelNivel = niveles[nivelClave];

    // Enviar las palabras y sus imágenes al frontend
    callback(palabrasDelNivel);

});



startServer();

