import { onEvent, startServer } from "soquetic";
import fs from "fs";

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

// Iniciar el servidor
startServer();
