import { onEvent, sendEvent, startServer } from "soquetic";
import fs from "fs";
import { SerialPort } from "serialport";
const port = new SerialPort({
    //Completar con el puerto correcto
    path: "COM4",
    baudRate: 9600,
});
// Función para manejar el evento de recibir el juego
onEvent("juego_nivel", (data) => {
    console.log(`Juego recibido: ${data.juego} ${data.nivel} `);
    
    // llamo a la función jugar_juego
    const salida = jugarJuego(data);
    
    // Confirmar que procese bien
    //return { msg: `Juego ${data.juego} Nivel ${data.nivel} ouput: ${JSON.stringify(salida)}  ` };
    return salida ;
});

// El front me debe mandar el número de juego a comenzar. Debe ser un número
// le paso el tipo de juego al hard
// Evento para comenzar el juego

onEvent("Comenzar", (juego) => {
    juego = parseInt(juego);
    console.log(`Juego recibido: ${juego}`);

    let salida;
    if (juego >= 1 && juego < 4) salida = "Juegos";
    else if (juego === 4) salida = "Simon";
    else if (juego >= 5 && juego < 7) salida = "Pares";

    port.write(salida);
    return { mensaje: `Juego iniciado: ${salida}` };  
});

//   let salida = ("Simon"); Color a prender para el Simon. El front debe mandar  R, G, B, Y
onEvent("ColorLed", (color) => {
    // evento recibido 
    console.log(`color a prender: ${color} `);
    let salidaColor = '';
    if (color==="rojo"){
        salidaColor ==='R'
    }
    else if (color==="verde"){
        salidaColor === 'G'
    }
    else if (color==="azul"){
        salidaColor=== 'B'
    }
    else if (color==="amarillo"){
        salidaColor==='Y'
    }
    port.write(salidaColor); 
    return { mensaje: `Color LED encendido: ${color}` };
    
});

// Para los juegos 4 y 3 en línea el  front debe mandar  P1 o P2
onEvent("jugadorJugando", (jugador) => {
    // evento recibido 
    console.log(`jugador jugando: ${jugador} `);
    port.write(jugador);  
    return { mensaje: `Jugador actual: ${jugador}` }; 
});

// Lo único que me manda el hard es que botón presionó. Se lo mando al front
port.on("data", function(data) {
    let data = data.toString().trim();
    let color="";
    // rojo = 1, verde = 2, azul = 3, amarillo = 4
    if (data==="1"){
        color="rojo";
    } 
    else if(data==="2"){
        color="verde";
    }
    else if (data==="3"){
        color="azul";
    }
    else if (data==="4"){
        color="amarillo";
    }
    sendEvent("boton",color);

    console.log(`Acción recibida del Arduino: ${color}`);
    //sendEvent(");


});



onEvent("terminoJuego", (juego, resultado) => {
    if (juego === "4") {
        port.write(`1${resultado}`); 
    }
});
// Función para determinar cuál juego ejecutar
let palabrasData;
function jugarJuego(data) {
    let palabrasData = JSON.parse(fs.readFileSync('palabras.json', 'utf8'));
    let juego = parseInt(data.juego)
    let nivel = parseInt(data.nivel)
    //nivel = `nivel_${numeroNivel}`;  // Crea "nivel_n"

    if (juego === 1) {
        return jugarJuego1(nivel); // Retorna la palabra y la imagen
    } else if (juego === 2) {
        return jugarJuego2(nivel);
    } else if (juego === 3) {
        return jugarJuego3(nivel);
    } else if(juego===4){
        return jugarSimonSays(nivel);
    }
}



function jugarJuego1(nivel) {
        let nivelJuego1 = palabrasData["juego_1"][nivel];
        let largoNivel = nivelJuego1.length;
    
        // Contar cuántas palabras no se han usado
        let cantidadUsadaNo = nivelJuego1.filter(elemento => elemento.usada === "no").length;
        if (cantidadUsadaNo > 0) {
            let numeroAleatorio = Math.floor(Math.random() * largoNivel);
            
            // Buscar una palabra no usada
            while (nivelJuego1[numeroAleatorio].usada === "si") {
                numeroAleatorio = Math.floor(Math.random() * largoNivel);
            }
    
            let filaAleatoria = nivelJuego1[numeroAleatorio];
            // Marcar la palabra como usada
            filaAleatoria.usada = "si"; 
            fs.writeFileSync('prueba.json', JSON.stringify(palabrasData, null, 2), 'utf8');
            
            return filaAleatoria; // Devuelve la palabra y la imagen
        } else {
            console.log("No hay palabras disponibles para este nivel.");
            console.log(`Nivel ${nivel} finalizado`);
            return { msg: `nivel finalizado: Juego_1 ${nivel}` };
        }
    }
    


 //Función para el Juego 2 (memotest)

function jugarJuego2(nivel) {
    let nivelJuego2 = palabrasData["juego_2"][nivel];
    let gruposNoUsados = Object.values(nivelJuego2).filter(grupo => grupo[grupo.length - 1]["usada"] === "no");
    
    // Verificar si quedan grupos no usados
    if (gruposNoUsados.length === 0) {
        console.log("No hay palabras disponibles para este nivel.");
        console.log(`Nivel ${nivel} finalizado`);
        return { msg: `Nivel finalizado: Juego_3 ${nivel}` };
    }

    // Seleccionar un grupo al azar entre los no usados
    let grupoAleatorio = gruposNoUsados[Math.floor(Math.random() * gruposNoUsados.length)];
    grupoAleatorio[grupoAleatorio.length - 1]["usada"] = "si"; // Marcar el grupo como usado

    fs.writeFileSync('prueba.json', JSON.stringify(palabrasData, null, 2), 'utf8');
    console.log(grupoAleatorio);
    
    return { grupoAleatorio }; 
}


 //Función para el Juego 3 (pregunta de opciones)
function jugarJuego3(nivel) {
    let nivelJuego3 = palabrasData["juego_3"][nivel];
    let gruposNoUsados = Object.values(nivelJuego3).filter(grupo => grupo[grupo.length - 1]["usada"] === "no");
    
    // Verificar si quedan grupos no usados
    if (gruposNoUsados.length === 0) {
        console.log("No hay palabras disponibles para este nivel.");
        console.log(`Nivel ${nivel} finalizado`);
        return { msg: `Nivel finalizado: Juego_3 ${nivel}` };
    }

    // Seleccionar un grupo al azar entre los no usados
    let grupoAleatorio = gruposNoUsados[Math.floor(Math.random() * gruposNoUsados.length)];
    grupoAleatorio[grupoAleatorio.length - 1]["usada"] = "si"; // Marcar el grupo como usado

    fs.writeFileSync('prueba.json', JSON.stringify(palabrasData, null, 2), 'utf8');
    console.log(grupoAleatorio);
    
    return { grupoAleatorio }; 
}
//terminó simon
onEvent("termino", (data) => {
    let sitermino = data.toString().trim();
    port.write(sitermino);
});



    



startServer();