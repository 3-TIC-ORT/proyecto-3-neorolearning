//import { onEvent, startServer } from "soquetic";
import fs from "fs";

onEvent("juego_nivel", (data) => {
    console.log(`Juego recibido: ${data.juego} ${data.nivel} `);
    
    // llamo a la función jugar_juego
    const salida = jugarJuego(data);
    console.log(salida);
    // Confirmar que procese bien
    //return { msg: `Juego ${data.juego} Nivel ${data.nivel} ouput: ${JSON.stringify(salida)}  ` };
    return salida ;
});
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



let palabrasData = JSON.parse(fs.readFileSync('palabras.json', 'utf8'));
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
            fs.writeFileSync('palabras.json', JSON.stringify(palabrasData, null, 2), 'utf8');
            console.log(filaAleatoria);
            return filaAleatoria; // Devuelve la palabra y la imagen
        } else {
            console.log("No hay palabras disponibles para este nivel.");
            console.log(`Nivel ${nivel} finalizado`);
            return { msg: `nivel finalizado: Juego_1 ${nivel}` };
        }
    }

jugarJuego1("nivel_1");


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
/*
onEvent("reiniciar", (juego, nivel) => {

    let palabrasData = JSON.parse(fs.readFileSync('prueba.json', 'utf8') || '{}');
    
    if(juego==="1"){
        let p2 = `nivel_${nivel}`;
        let palabrasNivel = palabrasData["juego_1"][p2];
        palabrasNivel.forEach(palabra => palabra.usada = "no");
        fs.writeFileSync('prueba.json', JSON.stringify(palabrasData, null, 2), 'utf8');
        console.log(`Nivel ${nivel} de ${juego} reiniciado.`);
    }

/*
startServer(3000,false);
