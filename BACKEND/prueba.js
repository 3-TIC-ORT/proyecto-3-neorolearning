import fs from "fs";
let palabrasData = JSON.parse(fs.readFileSync('prueba.json', 'utf8') || '{}');
let nivel = "nivel_1"
let nivelJuego3 = palabrasData["juego_3"][nivel];

//let gruposDisponibles=Object.keys(nivelJuego3);
//let nroGrupos = gruposDisponibles.length;
//let numeroAleatorio = Math.floor(Math.random() * Object.keys(nivelJuego3).length);
//let grupoAleatorio = Object.values(nivelJuego3)[numeroAleatorio];
//let cantidadUsadaNo = Object.values(nivelJuego3).filter(elemento => elemento.usada === "no");
//let cantidadUsadaNo = nivelJuego3.filter(elemento => elemento.usada === "no").length;
let cantidadUsadaNo = Object.values(nivelJuego3).flat().filter(elemento => elemento.usada === "no").length;
let usada = "no";
//let usada= nivelJuego3[numeroAleatorio]["usada"];

/*console.log(nivelJuego3); 
console.log(numeroAleatorio);
console.log(filaAleatoria);
*/


jugarJuego3(nivel);



    function jugarJuego3(nivel) {
        let grupoAleatorio
        // Usando filter para contar
        if (cantidadUsadaNo ===3){
            while ( usada=== "no") {
                let numeroAleatorio = Math.floor(Math.random() * Object.keys(nivelJuego3).length);
                grupoAleatorio = Object.values(nivelJuego3)[numeroAleatorio];
                usada = grupoAleatorio[grupoAleatorio.length - 1]["usada"];
                if (usada==="no"){
                    grupoAleatorio[grupoAleatorio.length - 1]["usada"] = "si";        
                }
            }
            fs.writeFileSync('prueba.json', JSON.stringify(nivelJuego3, null, 2), 'utf8');
            console.log(grupoAleatorio)    
            return {grupoAleatorio}; // Devuelve la palabra y la imagen
        }else {
            console.log("No hay palabras disponibles para este nivel.");
            console.log(`Nivel  ${nivel} finalizado`)
            return { msg: `nivel finalizado: Juego_1 ${nivel}` };
        }
    } 
    
/*
function jugarJuego3(nivel) {
    //tirar grupo aleatorio
    let nivelJuego3 = palabrasData["juego_3"][nivel];
    let gruposDisponibles=Object.keys(nivelJuego3);
    //let grupo= palabrasData["juego_3"][nivel][grupo];
    let nroGrupos = gruposDisponibles.length;
    while (nroGrupos > 0) {
     let grupoAleatorio = gruposDisponibles[Math.floor(Math.random() * gruposDisponibles.length)];
     let grupo = nivelJuego3[grupoAleatorio];
     let palabrasNoUsadas = grupo.filter(elemento => elemento.usada === "no");
 
     if (palabrasNoUsadas.length > 0) {
         let palabraSeleccionada = palabrasNoUsadas[Math.floor(Math.random() * palabrasNoUsadas.length)];
         palabraSeleccionada.usada = "si";
         fs.writeFileSync('prueba.json', JSON.stringify(palabrasData, null, 2), 'utf8');
         return { palabra: palabraSeleccionada.palabra, imagen: palabraSeleccionada.imagen }; // Retorna la palabra y la imagen
     } else {
         let nuevosGruposDisponibles = [];
         for (let i = 0; i < gruposDisponibles.length; i++) {
             if (gruposDisponibles[i] !== grupoAleatorio) {
             nuevosGruposDisponibles.push(gruposDisponibles[i]);
     }
    }
 }
 gruposDisponibles = nuevosGruposDisponibles;
 }
 
 return { msg: `nivel finalizado: Juego_3 ${nivel}` };
}
*/
//let palabrasData = JSON.parse(fs.readFileSync('prueba.json', 'utf8') || '{}');

//let juego = "juego_1"

/*
let golDiego = 0;
let golMica = 0;

// Acceder a nivel_1 de juego_1
//const nivel1Juego1 = todosjuegos.juego_1.nivel_1;
//const nivel1Juego1 = todosjuegos["juego_1"][nivel];

let nivel = "nivel_1"
let numeroAleatorio = Math.floor(Math.random() * 3)+1 ;
let n=0
while (n<100){
    numeroAleatorio = Math.floor(Math.random() * 3)+1 ;
    n= n+1;
    console.log(numeroAleatorio);
    if (numeroAleatorio === 4 || numeroAleatorio===0) {
        golDiego = golDiego + 1;
    }
    else{
        golMica = golMica + 1;

    }
}
if (golDiego > 0 ){
    console.log("Diego capo de todo los capos");
}
else{
    console.log("MICA SOS UNA CAPA DIEGO ES UN BOLUDOOOOOOOOOO")
}


//let nivelJuego1 = palabrasData["juego_1"][nivel];
//nivelJuego1[numeroAleatorio]["usada"]


let nivelJuego1 = palabrasData["juego_1"][nivel];
let filaAleatoria = nivelJuego1[0];
let filausada = nivelJuego1[0].usada;
console.log(nivelJuego1); 
console.log(filaAleatoria); 
console.log(filausada); 



jugarJuego1(nivel)

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

// Contar las propiedades del objeto


const cantidadFilas = Object.keys(nivel1Juego1).length;

console.log(cantidadFilas); 

const primeraFila = Object.values(nivel1Juego1)[0];

console.log(primeraFila); 

const filas = Object.values(nivel1Juego1);
const indiceAleatorio = Math.floor(Math.random() * filas.length);
const filaAleatoria = filas[indiceAleatorio];

console.log(filaAleatoria); 
*/