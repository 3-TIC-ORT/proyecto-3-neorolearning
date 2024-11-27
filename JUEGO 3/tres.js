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
              callBack2
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
  let palabras_back = data.grupoAleatorio.palabras; // Palabras que vienen del backend
  let palabraIndex = 0; // Índice para controlar qué palabra se está mostrando

  if (palabras_back === undefined || palabras_back.length === 0) {
    document.getElementById("next").style.visibility = "hidden"; // No hay palabras
  } else {
    palabraCorrecta = palabras_back[Math.floor(Math.random() * palabras_back.length)];

      palabrota.innerHTML = ""; // Limpiar el contenedor de palabras
      palabras_back.forEach((item, index) => {
        let palabra = document.createElement("h2");
        palabra.innerHTML = item.palabra;
        palabra.classList.add("palabra");
        if (index === palabraIndex) palabra.classList.add("presionado");
        palabra.addEventListener("click", () => clickLetter(item.palabra));
        palabrota.appendChild(palabra);
      });

      // Mostrar la imagen asociada a la palabra correcta
      mostrarImagen(palabraCorrecta);

      // Actualizar visibilidad de botones
      document.getElementById("next").style.display =
        palabraIndex < palabras_back.length - 1 ? "block" : "none";
      document.getElementById("reiniciar").style.display =
        palabraIndex >= palabras_back.length - 1 ? "block" : "none";
    };

    // Mostrar la primera palabra
    mostrarPalabra();
   

    // Configurar botón "Siguiente palabra"
    document.getElementById("next").addEventListener("click", () => {
      if (palabraIndex < palabras_back.length - 1) {
        palabraIndex++;
        mostrarPalabra();
      }
    });

    // Configurar botón "Volver a jugar"
    document.getElementById("reiniciar").addEventListener("click", () => {
      palabraIndex = 0;
      mostrarPalabra();
    });
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
  let imagenURL = palabraCorrecta.imagen; // Asumimos que la palabra tiene una propiedad 'imagen'
  if (imagenes) {
    imagenes.src = "./imagenes/" + imagenURL;
  }
}


let clickLetter = (palabra) => {
  // Asegúrate de que `palabra` es un string que coincida con la propiedad `palabra` de `palabraCorrecta`
  console.log("Palabra seleccionada: ", palabra);
  console.log("Palabra correcta: ", palabraCorrecta.palabra);

  // Asegúrate de comparar correctamente los valores
  if (palabra === palabraCorrecta.palabra) {
    text.innerText = "Palabra correcta";
    reJuego(); // Esto activará el flujo de reiniciar el juego
  } else {
    text.innerText = "Palabra incorrecta";
  }
};

let next = document.getElementById("next")
next.addEventListener("click", () => {

  // Ocultar la foto de ganador y volver a la vista original

  // Recargar la palabra nueva
  postData(
    "juego_nivel",
    {
      juego: 3,
      nivel: niveles,
    },
    callBack2
  );
});