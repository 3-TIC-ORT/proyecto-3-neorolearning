import { onEvent, sendEvent, startServer } from "soquetic";
import fs from "fs";


// con el juego q me pasa juli
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
    jugarjuego(nivel);
}
onEvent("nivel",recibirnivel);

function jugarjuego(nivel) {
    // Lógica para determinar cuál juego ejecutar
    if (nivel === 1) {
        jugarjuego1(nivel);
    } else if (nivel === 2) {
        jugarjuego2(nivel);
    } else if (nivel === 3) {
        jugarjuego3(nivel);
    } else {
        console.log("Nivel no válido.");
    }
}

function jugarjuego1(nivel){
    console.log(`Iniciando juego 1 en el nivel ${nivel}`);
    let palabras = JSON.parse(fs.readFileSync('palabras.json', 'utf8'));
    let palabrasusadas = JSON.parse(fs.readFileSync("palabrasusadas.json", "utf-8") || "{}");
    let puntajes = JSON.parse(fs.readFileSync("puntaje.json", "utf-8") || "{}");
    function guardarpalabrasusadas() {
    fs.writeFileSync("palabrasusadas.json", JSON.stringify(palabrasusadas, null, 2), "utf-8");
}

function guardarPuntaje() {
    fs.writeFileSync("puntaje.json", JSON.stringify(puntajes, null, 2), "utf-8");
}
    function obtenerPalabraAleatoria(nivel) {
        let nivel_palabra_aleatoria = `nivel_${nivel}`;
        // Crear un array vacío para almacenar las palabras disponibles
        let palabrasDisponibles = [];
        // Obtener todas las palabras para el nivel actual
        let todasLasPalabras = palabras[nivel_palabra_aleatoria];
        
        // Recorrer todas las palabras del nivel
        for (let i = 0; i < todasLasPalabras.length; i++) {
            let palabraActual = todasLasPalabras[i].palabra;
    
            // Verificar si la palabra actual ya se ha usado
            let palabraUsada = palabrasusadas[nivel_palabra_aleatoria]?.includes(palabraActual);
            // Si la palabra no se ha usado, agregarla a las disponibles
            if (!palabraUsada) {
                palabrasDisponibles.push(todasLasPalabras[i]);
            }
        }
    
        // Comprobar si hay palabras disponibles
        if (palabrasDisponibles.length === 0) {
            console.log(`¡Has completado todas las palabras en el Nivel ${nivel}! Puedes continuar al siguiente nivel.`);
            return null;
        }
    
        // Seleccionar una palabra aleatoria de las disponibles
        let randomIndex = Math.floor(Math.random() * palabrasDisponibles.length);
        let palabraSeleccionada = palabrasDisponibles[randomIndex];
    
        // Marcar la palabra como usada
        if (!palabrasusadas[nivel_palabra_aleatoria]) {
            palabrasusadas[nivel_palabra_aleatoria] = [];
        }
        palabrasusadas[nivel_palabra_aleatoria].push(palabraSeleccionada.palabra);
    
        guardarpalabrasusadas();
        
        return palabraSeleccionada;
    }
    
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
    
    // Función para actualizar el puntaje
    function actualizarPuntaje(nivel) {
        let nivel_clave = `juego_${nivel}`;
        
        // Si el nivel nunca se jugo, asignar 10 puntos por cada palabra correcta
        if (!puntajes[nivel_clave]) {
            puntajes[nivel_clave] = { puntaje: 10 }; // Primera vez
        } else {
            // Si ya se jugo antes, asignar 5 puntos por cada palabra correcta
            puntajes[nivel_clave].puntaje += 5; // Segunda vez o más
        }
    
        guardarPuntaje();
        // enviar el puntaje
        function enviarpuntaje(data){
        const { actualizarPuntaje } = data;
        console.log(`Puntaje recibido: ${actualizarPuntaje}`);
 }
 sendEvent(puntajes[nivel_clave], enviarpuntaje);


}

    }
    // Obtener la palabra y mostrarla
    let palabraSeleccionada = obtenerPalabraAleatoria(nivel);
    if (palabraSeleccionada) {
        console.log(`\nNivel ${nivel}:`);
        console.log(`Palabra: ${palabraSeleccionada.palabra}`);
        console.log(`Imagen: ${palabraSeleccionada.imagen}\n`);
    
        // Actualizar el puntaje dependiendo de si es la primera o segunda vez que se juega el nivel
        actualizarPuntaje(nivel);
        console.log(`Puntaje actualizado: ${puntajes[`juego_${nivel}`].puntaje} puntos`);
    } else {
        console.log("No hay palabras disponibles para este nivel.");
    }
}
// Función para jugar el juego 2
function jugarjuego2(nivel) {
    console.log(`Iniciando juego 2 en el nivel ${nivel}`);
    let niveles = JSON.parse(fs.readFileSync("niveles.json", "utf-8") || "{}");
    let puntajes = JSON.parse(fs.readFileSync("puntaje.json", "utf-8") || "{}");

// Guardar los puntajes en puntaje.json
    function guardarPuntaje() {
    fs.writeFileSync("puntaje.json", JSON.stringify(puntajes, null, 2), "utf-8");
}
    // Mostrar palabras e imágenes en el frontend (simulado aquí con console.log)
    // Obtener las palabras del nivel específico
    let nivelClave = `nivel_${nivel}`;
    let palabrasDelNivel = palabras[nivelClave] || []; // Asegúrate de que 'palabras' esté definido correctamente

    if (palabrasDelNivel.length === 0) {
        console.log(`No hay palabras disponibles para el nivel ${nivel}.`);
        return; // Salir si no hay palabras
    }

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


// Función para jugar el juego 3
function jugarjuego3(nivel) {
    console.log(`Iniciando juego 3 en el nivel ${nivel}`);
    // Leer los datos de los archivos JSON
    let palabras = JSON.parse(fs.readFileSync('palabras.json', 'utf8'));
    let palabrasUsadas = JSON.parse(fs.readFileSync("palabrasusadas.json", "utf-8") || "{}");
    let puntajes = JSON.parse(fs.readFileSync("puntaje.json", "utf-8") || "{}");
    function guardarPalabrasUsadas() {
    fs.writeFileSync("palabrasusadas.json", JSON.stringify(palabrasUsadas, null, 2), "utf-8");
}
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

    function guardarPuntaje() {
    fs.writeFileSync("puntaje.json", JSON.stringify(puntajes, null, 2), "utf-8");
}

    
}
startServer();