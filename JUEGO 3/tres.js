let imagenes = document.getElementById("mostrarImagen");
let palabrota = document.getElementById("todasPalabras");
let text = document.getElementById("text");

connect2Server();
const parametro = new URLSearchParams(window.location.search);
const niveles = parametro.get("nivel");

function callBack2(data) {
  console.log(data);
  let grupo_aleatorio = data.grupo_aleatorio;
  let palabras_back = data.grupoAleatorio.palabras; // Palabra recibida del backend
  
  // Verificar si hay palabras disponibles
  if (palabras_back === undefined || palabras_back.length === 0) {
    // No hay más palabras: ocultar "next" y mostrar "confirmar"
    document.getElementById("next").style.visibility = "hidden";
  } else {
    // Seleccionar aleatoriamente una palabra
    let palabraCorrecta = palabras_back[Math.floor(Math.random() * palabras_back.length)];
    
    // Mostrar la palabra en el HTML
    for (let i = 0; i < palabras_back.length; i++) {
      let palabra = document.createElement("h2");
      palabra.innerHTML = palabras_back[i].palabra;
      palabra.classList.add("palabra");
      palabra.addEventListener("click", () => clickLetter(palabras_back[i], palabraCorrecta));
      palabrota.appendChild(palabra);
    }

    // Mostrar la imagen asociada a la palabra correcta
    mostrarImagen(palabraCorrecta);
  }
}

postData(
  "juego_nivel",
  {
    juego: 3,
    nivel: niveles,
  },
  callBack2
);

function reJuego() {
  document.getElementById("juegoTerminado").style.display = "block";
  document.getElementById("comfirmar").addEventListener("click", () => {
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
      "http://127.0.0.1:5500/INICIO/menu1.html";
  });
}

// Función para mostrar la imagen correspondiente
function mostrarImagen(palabraCorrecta) {
  // Asumimos que cada palabra tiene una imagen asociada
  let imagenURL = palabraCorrecta.imagen; // Asegúrate de que la palabra tenga una propiedad 'imagen'
  if (imagenes) {
    imagenes.src = "./imagenes/" + imagenURL
    }
}

let clickLetter = (palabra, palabraCorrecta) => {
  if (palabra.palabra === palabraCorrecta.palabra) {
    text.innerText = "Palabra correcta";
  } else {
    text.innerText = "Palabra incorrecta";
  }
};
