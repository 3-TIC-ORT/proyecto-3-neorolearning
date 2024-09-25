import { onEvent, sendEvent, startServer } from "soquetic";
import fs from "fs";

onEvent("nivel", (data) => {
  console.log(` Nivel recibido: ${data.msg}`);
  return { msg: `Nivel ${data.nivel} procesado correctamente.` };
  // Escuchar evento cuando el usuario selecciona un nivel
});
  
  onEvent("seleccionarNivel", (data, callback) => {
    // Pasar la solicitud al backend para obtener las palabras del nivel
    const { nivel } = data;
    
    // Usar un callback para manejar la respuesta del backend
    const resultado = obtenerPalabrasDelNivel(nivel);
    callback(resultado);
  });
  
  // Escuchar evento para actualizar el puntaje
  onEvent("actualizarPuntaje", (data, callback) => {
    const { nivel, correcto } = data;
    
    // Usar un callback para manejar la actualización del puntaje
    const nuevoPuntaje = actualizarPuntajeBackend(nivel, correcto);
    callback(nuevoPuntaje);
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



startServer()

