
// connect2Server();
function ejecutarJuegoNivel() {
  let juego = "1";
  let nivel = "1";
  console.log(`Juego: ${juego}, Nivel: ${nivel}`);
  postData("juego_nivel", { juego: juego, nivel: nivel }, (data) => {
      console.log(data);
  });
}

// Llamar a la función
ejecutarJuegoNivel();



function enviarSecuencia() {
  let secuencia="amarillo, rojo, verde, verde"
	console.log(`secuencia: ${secuencia}`);
  postData("secuenciasimon", { secuencia: secuencia}, (data) => {
    //a.innerHTML = data.msg;
    console.log(data);
  });
}
//enviarSecuencia();

function enviarjugador(resultado) {

	console.log(`resultado recibido: ${jugador}`);
  postData("jugadorJugando", { jugador: jugador}, (data) => {
      //a.innerHTML = data.msg;
      console.log(JSON.stringify(data));
    });
}


// Simula Evento Juego Nivel
//enviarjugador("PONE");


// EVENTO TERMINO
function termino(resultado) {
	const resultado = resultado;
	console.log(`resultado: ${resultado}`);
  postData("terminoJuego", { resultado: resultado}, (data) => {
  console.log(JSON.stringify(data));
  });
}

// Simula Evento enviar jugador
let resultado = "GANAR";
//termino(resultado);

function reiniciarJuego(juego,nivel) {
  const juego = juego;
	const nivel = nivel;
	const resultado = resultado;
	console.log(`resultado: ${resultado}`);
  postData("terminoJuego", { resultado: resultado}, (data) => {
  console.log(JSON.stringify(data));
  });
}

// Simula Evento enviar jugador
let juego = "1";
let nivel = "1";
//reiniciarJuego(juego,nivel);
/*
const form = document.getElementById("form");
const input = document.getElementById("input");
const a = document.getElementById("a");
//const date = document.getElementById("fecha");
//const seconds = document.getElementById("segundos");
const juego = document.getElementById("juego");
const nivel = document.getElementById("nivel");


form.addEventListener("submit", onFormSubmit);
function onFormSubmit(event) {
	event.preventDefault();
	const data = new FormData(event.target);
	const juego = data.get("juego");
	const nivel = data.get("nivel");
	console.log(`Juego: ${juego}, Nivel: ${nivel}`);

  // FALTA INVOCAR con postData y message
  if (juego && nivel) {
    // postData tiene 3 parámetros: el primero es el evento que se activa y va a trabajar el backend}
    // el segundo parámetro son los datos que le envía al backend para que responda al evento
    // el tercero es donde recibe la salida del return del backend, es decir lo que responde el backend
    // esa salida queda en el frontend en la variable data
    // luego de la respuesta del backend sigue ejecutando instrucciones propias del frontend
    // utilizando la nueva información disponible en la variable data
    postData("juego_nivel", { juego: juego , nivel:nivel}, (data) => {
      //a.innerHTML = data.msg;
      a.innerHTML = JSON.stringify(data);
    });
    juego = "";
    nivel = "";
  }
}
/*
form2.addEventListener("submit", onFormSubmit);
function onFormSubmit(event) {
	event.preventDefault();
	const data = new FormData(event.target);
	const juego = data.get("juego");
	console.log(`Juego: ${juego}`);
  postData("Comenzar", juego);

}

receive("accion",botonApretado)
/*
fetchData("juego", (data) => {
  date.innerText = data;
});


receive("second", () => {
  seconds.innerText = parseInt(seconds.innerText) + 1;
});
*/



