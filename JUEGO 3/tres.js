let imagenes = document.getElementById("mostrarImagen");
let palabrota = document.getElementById("todasPalabras")
let text = document.getElementById("text");

connect2Server();
const parametro = new URLSearchParams(window.location.search);
const niveles = parametro.get("nivel");

function callBack2(data) {
  console.log(data)
  let grupo_aleatorio = data.grupo_aleatorio
  let palabras_back = data.grupoAleatorio.palabras; // Palabra recibida del backend
  img.src = "./imagenes/" + imagen

  // Verificar si hay palabras disponibles
  if (palabras_back === undefined) {
    // No hay más palabras: ocultar "next" y mostrar "comfirmar"

    document.getElementById("next").style.visibility = "hidden";
  } else {
    // document.getElementById("next").style.visibility = "visible";

    for (let i = 0; i < palabras_back.length; i++) {
      let palabra = document.createElement("h2");
      palabra.innerHTML = palabras_back[i].palabra;
      palabra.classList.add("palabra");
      palabra.addEventListener("click", () => clickLetter(palabras_back[i]));
      palabrota.appendChild(palabra);
  }
  
  }
}


postData(
  "juego_nivel",
  {
    juego: 3,
    nivel: niveles,
  }, callBack2)

function reJuego() {
  
  document.getElementById("juegoTerminado").style.display = "block";
  document.getElementById("comfirmar").addEventListener("click",  () => {
    postData(
      "reiniciar",
      {
        juego: "3",
        nivel: niveles,
      },
      (data) => {
        if (data) {
          location.reload();
        }
      }
    );
    document.getElementById("juegoTerminado").style.display = "none";
  });
  document.getElementById("cancelar").addEventListener("click", async () => {
    window.location.href =
      "file:///C:/Users/49318078/Documents/GitHub/proyecto-3-neorolearning/INICIO/menu1.html";
  });
}

let clickLetter = (palabra) => {
    if (palabra === data.palabraCorrecta) {
        text.innerText = "Palabra correcta";
    } else {
        text.innerText = "Palabra incorrecta";
    }
}
