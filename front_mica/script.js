/*
connect2Server()
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


//-------------------------//

