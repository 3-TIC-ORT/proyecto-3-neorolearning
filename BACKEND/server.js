import { onEvent, startServer } from "soquetic";
import fs from "fs";
import { SerialPort } from "serialport";
const port = new SerialPort({
    //Completar con el puerto correcto
    path: "COM3",
    baudRate: 9600,
  });
// Función para manejar el evento de recibir el juego
onEvent("juego_nivel", (data) => {
    console.log(`Juego recibido: ${data.juego} ${data.nivel} `);
    
    // llamo a la función jugar_juego
    let salida = jugarJuego(data.juego, data.nivel);
    
    // Confirmar que procese bien
    //return { msg: `Juego ${data.juego} Nivel ${data.nivel} ouput: ${JSON.stringify(salida)}  ` };
    return {salida };
});

// El front me debe mandar el número de juego a comenzar. Debe ser un número
// le paso el tipo de juego al hard
onEvent("Comenzar", (juego) => {
    juego = parseInt(juego)
    console.log(`Juego recibido: ${juego} `);
    
    if (juego >=1 && juego <4) {
        let salida = ("Juegos");
        port.write(salida);
      }

    if (juego ===4) {
        let salida = ("Simon");
        port.write(salida);
      }

    if (juego >=5 && juego <7) {
        let salida = ("Pares");
        port.write(salida);
    }    
});

// Color a prender para el Simon. El front debe mandar  R, G, B, Y
onEvent("ColorLed", (color) => {
    // evento recibido 
    console.log(`color a prender: ${color} `);
    port.write(color);  
});

// Para los juegos 4 y 3 en línea el  front debe mandar  P1 o P2
onEvent("jugadorJugando", (jugador) => {
    // evento recibido 
    console.log(`jugador jugando: ${jugador} `);
    port.write(jugador);  
});
/*
onEvent("terminoJuego", (juego) => {
    if juego==="{}"{
    console.log(`termino juego: ${juego} `);
    let juegoterminado= parseInt(juegoterminado)
    port.write(juegoterminado);        
    }
    else{
       port.write("no terminó");
    }

});*/

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
        return jugarJuego2(nivel);
        

    } else if (juego === 3) {
        return jugarJuego3(nivel);
    } else {
        console.log("Juego no válido.");
        return { error: "Juego no válido." };
    }
}

// Lo único que me manda el hard es que botón presionó. Se lo mando al front
port.on("data", (data) =>{
    let accion = data.toString().trim();
    //let ledOn = status === "on";
    sendEvent("accion", accion);
  });

/*
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
*/
// Función para el Juego 1 (palabras desordenadas)



function jugarJuego1(nivel) {
    let nivelJuego1 = palabrasData["juego_1"][nivel];
    let largoNivel = nivelJuego1.length;

    // Usando filter para contar
    let cantidadUsadaNo = nivelJuego1.filter(elemento => elemento.usada === "no").length;
    if (cantidadUsadaNo > 0){
        let numeroAleatorio = Math.floor(Math.random() * largoNivel) ;
        console.log(nivelJuego1[numeroAleatorio],nivelJuego1[numeroAleatorio]["usada"])
        let usada= nivelJuego1[numeroAleatorio]["usada"]
        while ( usada=== "no") {
            numeroAleatorio = Math.floor(Math.random() * largoNivel) ;
        }
        let filaAleatoria = nivelJuego1[numeroAleatorio];
        // Modificar el valor de "usada" en el primer elemento (índice 0)
        filaAleatoria.usada = "si"; 
        fs.writeFileSync('prueba.json', JSON.stringify(nivelJuego1, null, 2), 'utf8');
        // Cambia "sí" por el valor que necesites
        return {filaAleatoria}; // Devuelve la palabra y la imagen
    }else {
        console.log("No hay palabras disponibles para este nivel.");
        console.log(`Nivel  ${nivel} finalizado`)
        return { msg: `nivel finalizado: Juego_1 ${nivel}` };
    }
} 


 //Función para el Juego 2 (memotest)

function jugarJuego2(nivel) {
    const nivelJuego2 = palabrasData.juego_2.[nivel];
    console.log(nivelJuego2); 
    console.log(`Iniciando juego 2 en el nivel ${nivel}`);
    return {nivelJuego2};
    
}

/*
 Función para el Juego 3 (pregunta de opciones)
function jugarJuego3(nivel) {
    console.log(`Iniciando juego 3 en el nivel ${nivel}`);
    // Lógica para el juego 3
    return { msg: "Juego 3 iniciado", nivel };
}



Función para actualizar el puntaje
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

*/
//reinicar
onEvent("reiniciado", (data) => {
    const juego = data.juego; // Obtener juego del data
    const nivel = data.nivel; // Obtener nivel del data
    console.log(`reiniciando juego:${juego} en el nivel:${nivel} `);
    if (juego==="1"){
        for (let i = 0; i < nivelJuego1.length; i++) {
            nivelJuego1[i].usada = "no";}
        }
        
        // Escribir el nuevo estado en el archivo JSON
        fs.writeFileSync('prueba.json', JSON.stringify(nivelJuego1, null, 2), 'utf8');

    
});
startServer();