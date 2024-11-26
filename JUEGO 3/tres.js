let imagenes = document.getElementById("mostrarImagen");
let palabrota = document.getElementById("todasPalabras");
let text = document.getElementById("text");

let palabraCorrecta = 0

connect2Server();
const parametro = new URLSearchParams(window.location.search);
const niveles = parametro.get("nivel");
let finaliza = false
let juegoTerminado = document.getElementById("juegoTerminado")
let selected = 0

receive("boton", (boton) => {
  console.log(boton)
  switch (boton) {
    case "verde":
      console.log(palabrota.children)
      console.log(finaliza)
      juegoTerminado.children[selected].classList.remove("presionado")

      if (palabrota.children.length === 0) {
        if (juegoTerminado.children[(selected+1)].style.visibility === "hidden") {
          selected = selected +1
        }
        console.log(juegoTerminado.children[(selected)])
        juegoTerminado.children[(selected+1)].classList.add("presionado")
        selected = selected + 1
      }
      try {
        console.log("GOdmkasdaks")
        palabrota.children[(selected+1)].classList.add("presionado")
        palabrota.children[selected].classList.remove("presionado")
        selected = selected + 1
      } catch (error) {
        palabrota.children[(0)].classList.add("presionado")
        palabrota.children[selected].classList.remove("presionado")
        selected =  0
      }
      console.log(selected)

      break;
      case "amarillo":
        if (palabrota.children.length === 0) {
          juegoTerminado.children[selected].classList.remove("presionado")

          if (juegoTerminado.children[(selected-1)].style.visibility === "hidden") {
            selected = selected -1
          }
          console.log(juegoTerminado.children[(selected)])
          juegoTerminado.children[(selected-1)].classList.add("presionado")
          selected = selected -1
        }
        try {
          
         if (selected === 0) {
          palabrota.children[palabrota.children.length-1].classList.add("presionado")
          palabrota.children[selected].classList.remove("presionado")
          selected =  palabrota.children.length-1
         }
         else{
          palabrota.children[(selected-1)].classList.add("presionado")
          palabrota.children[selected].classList.remove("presionado")
          selected = selected -1
         }
        } catch (error) {
          palabrota.children[palabrota.children.length-1].classList.add("presionado")
          palabrota.children[selected].classList.remove("presionado")
          selected =  palabrota.children.length-1
        }
  
        break;
        case "ok":
          console.log(finaliza)
          if (palabrota.children.length === 0) {
            finaliza = true

          }
          if (finaliza === true) {
            switch (selected) {
              case 0:
                juegoTerminado.children[(0)].classList.add("presionado")

            finaliza = false
            postData(
              "juego_nivel",
              {
                juego: 3,
                nivel: niveles,
              },
              callBack1
            );
                break;
                case 1:
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
                break;
                case 2: location.href = "../INICIO/menu1.html"
                break;
            
              default:
                break;
            }
          }
          if (palabrota.children.length > 0) {
            palabrota.children[selected].classList.remove("presionado")

          clickLetter(palabrota.children[selected].innerText)
            palabrota.children[(0)].classList.add("presionado")
            selected = 0
            console.log(palabrota.children.length)
            
          }
          console.log(palabrota.children.length)
    default:
      break;
  }
  

  
});

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
    palabraCorrecta = palabras_back[Math.floor(Math.random() * palabras_back.length)];
    
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

let clickLetter = (palabra) => {
  console.log(palabraCorrecta,palabra)
  if (palabra === palabraCorrecta.palabra) {
    text.innerText = "Palabra correcta";
    reJuego()

  } else {
    text.innerText = "Palabra incorrecta";
  }
};
