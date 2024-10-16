import { onEvent, sendEvent, startServer } from "soquetic";
import fs from "fs";
import { actualizarPuntaje } from './JUEGO1/niveles.js' ;
import { palabraSeleccionada } from './JUEGO1/niveles.js';
// Leer los datos de los archivos JSON
let niveles = {};
try {
  niveles = JSON.parse(fs.readFileSync('niveles.json', 'utf-8'));
} catch (error) {
  console.error("Error al leer niveles.json:", error);
}

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
 


// Enviar palabra
 function enviarpalabra(data){ 
  const { nivel, palabraSeleccionada } = data;
  const nivelClave = `nivel_${nivel}`;
  const palabrasDelNivel = niveles[nivelClave]|| []; 
  if (palabrasDelNivel.includes(palabraSeleccionada)) {
    console.log(`Palabra enviada: ${palabraSeleccionada}`);
    return { msg: `Palabra ${palabraSeleccionada} enviada correctamente.` };
  } else {
    console.log(`Palabra no encontrada en el nivel ${nivel}`);
    return { msg: `Palabra no encontrada en el nivel ${nivel}.` };
  }
}
 
  sendEvent('palabraSeleccionada', enviarpalabra ); 
  

  // enviar el puntaje
   function enviarpuntaje(data){
     const { actualizarPuntaje } = data;
     console.log(`Puntaje recibido: ${actualizarPuntaje}`);
  };
  sendEvent(actualizarPuntaje, enviarpuntaje);
 

});

startServer();

