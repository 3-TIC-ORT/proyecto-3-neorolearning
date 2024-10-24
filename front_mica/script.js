const form = document.getElementById("form");
const input = document.getElementById("input");
const a = document.getElementById("a");
//const date = document.getElementById("fecha");
//const seconds = document.getElementById("segundos");
const juego = document.getElementById("juego");
const nivel = document.getElementById("nivel");


/* form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    postData("message", { msg: input.value }, (data) => {
      a.innerHTML = data.msg;
    });
    input.value = "";
  }
}); */

form.addEventListener("submit", onFormSubmit);
function onFormSubmit(event) {
	event.preventDefault();
	const data = new FormData(event.target);
	const juego = data.get("juego");
	const nivel = data.get("nivel");
	console.log(`Juego: ${juego}, Nivel: ${nivel}`);

  // FALTA INVOCAR con postData y message
  if (juego && nivel) {
    postData("juego_nivel", { juego: juego , nivel:nivel}, (data) => {
      a.innerHTML = data.msg;
    });
    juego = "";
    nivel = "";
  }
}
/*
fetchData("juego", (data) => {
  date.innerText = data;
});
*/
receive("second", () => {
  seconds.innerText = parseInt(seconds.innerText) + 1;
});
