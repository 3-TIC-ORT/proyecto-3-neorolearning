import { onEvent, startServer } from "soquetic";
import fs from "fs";

// Cargar las palabras desde el archivo JSON al iniciar el servidor

let palabrasUsadas = JSON.parse(fs.readFileSync('palabrasusadas.json', 'utf8') || '{}');
let puntajes = JSON.parse(fs.readFileSync('puntaje.json', 'utf8') || '{}');

// Función para manejar el evento de recibir el juego

onEvent("juego_nivel", (data) => {
    console.log(`Juego recibido: ${data.juego} ${data.nivel} `);
    
    // llamo a la función jugar_juego
    let salida = jugarJuego(data.juego, data.nivel);
    
    // Confirmar que procese bien
    //return { msg: `Juego ${data.juego} Nivel ${data.nivel} ouput: ${JSON.stringify(salida)}  ` };
    return {salida };
});
//

// Función para determinar cuál juego ejecutar
function jugarJuego(juego, nivel) {
    let palabrasData = JSON.parse(fs.readFileSync('palabras.json', 'utf8'));
    juego= parseInt(juego)
    let numeroNivel = parseInt(nivel)
    let texto ="nivel_";
    nivel = texto.concat(numeroNivel);
    console.log(nivel); 
    //nivel = `nivel_${numeroNivel}`;  // Crea "nivel_n"

    if (juego === 1) {
        return jugarJuego1(nivel); // Retorna la palabra y la imagen
    } else if (juego === 2) {
        let nivelJuego2 = palabrasData["juego_2"][nivel];

        console.log(`Iniciando juego 2 en el nivel ${nivel}`);
        console.log(nivelJuego2); 
        return {nivelJuego2};

    } else if (juego === 3) {
        return jugarJuego3(nivel);
    } else {
        console.log("Juego no válido.");
        return { error: "Juego no válido." };
    }
}
// Función para obtener una palabra aleatoria no utilizada
function obtenerPalabraAleatoria(juego, nivel) {
    let palabrasDisponibles = palabrasData[juego][nivel].filter(p => !palabrasUsadas[juego]?.[nivel]?.includes(p.palabra));

    if (palabrasDisponibles.length === 0) {
        palabrasUsadas[juego] = {};
        return obtenerPalabraAleatoria(juego, nivel); // Intentar nuevamente
    }

    let randomIndex = Math.floor(Math.random() * palabrasDisponibles.length);
    let palabraSeleccionada = palabrasDisponibles[randomIndex];

    if (!palabrasUsadas[juego]) {
        palabrasUsadas[juego] = {};
    }
    if (!palabrasUsadas[juego][nivel]) {
        palabrasUsadas[juego][nivel] = [];
    }
    
    palabrasUsadas[juego][nivel].push(palabraSeleccionada.palabra);
    fs.writeFileSync('palabrasusadas.json', JSON.stringify(palabrasUsadas, null, 2), 'utf8');
    
    return palabraSeleccionada;
}

// Función para el Juego 1 (palabras desordenadas)
function jugarJuego1(nivel) {
    console.log(`Iniciando juego 1 en el nivel ${nivel}`);
    
    let palabraSeleccionada = obtenerPalabraAleatoria(`juego_1`, `nivel_${nivel}`);
    
    if (palabraSeleccionada) {
        console.log(`Palabra: ${palabraSeleccionada.palabra}, Imagen: ${palabraSeleccionada.imagen}`);
        // actualizarPuntaje('juego_1', nivel);
        return { palabra: palabraSeleccionada.palabra, imagen: palabraSeleccionada.imagen }; // Devuelve la palabra y la imagen
    } else {
        console.log("No hay palabras disponibles para este nivel.");
        return { error: "No hay palabras disponibles." };
    }
}

// Función para el Juego 2 (memotest)
function jugarJuego2(nivel) {

    const nivelJuego2 = palabrasData.juego_2.nivel;

    console.log(nivelJuego2); 
    console.log(`Iniciando juego 2 en el nivel ${nivel}`);
    return {nivelJuego2};
}


// Función para el Juego 3 (pregunta de opciones)
function jugarJuego3(nivel) {
    console.log(`Iniciando juego 3 en el nivel ${nivel}`);
    // Lógica para el juego 3
    return { msg: "Juego 3 iniciado", nivel };
}



// Función para actualizar el puntaje
function actualizarPuntaje(juego, nivel) {
    let claveNivel = `${juego}_${nivel}`;
    if (!puntajes[claveNivel]) {
        puntajes[claveNivel] = { puntaje: 10 };
    } else {
        puntajes[claveNivel].puntaje += 5;
    }
    fs.writeFileSync('puntaje.json', JSON.stringify(puntajes, null, 2), 'utf8');
    console.log(`Puntaje actualizado: ${puntajes[claveNivel].puntaje} puntos`);
}

startServer();

