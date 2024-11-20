let cajitas = document.getElementById("divCajitas");
let letras = document.getElementById("divLetras");
let correcto = document.getElementById("correcto");
let img = document.getElementById("img");
let next = document.getElementById("next");
let palabra = "";
let wordArray = [];
let listaCajitas = [];
let shuffleWord = [];
let arduino;

let selected = 0
const clickLetter = (letter) => {
  console.log(letter);
  if (listaCajitas[0].letter === letter) {
    let div = document.getElementById(`cajita${listaCajitas[0].index}`); 
    div.innerHTML = letter;
    listaCajitas.shift();
    for (let index = 0; index < letras.children.length; index++) {
      if (letras.children.item(index).innerHTML === letter) {
        letras.children.item(index).remove();
        break;
      }
    }
    if (letras.children.length === 0) {
      reJuego();
      wordArray = [];
      listaCajitas = [];
      shuffleWord = [];
      cajitas.innerHTML = "";
    }

    correcto.innerText = "Letra correcta";
  } else {
    correcto.innerText = "Letra incorrecta";
  }
};
connect2Server();
let finaliza = false
let juegoTerminado = document.getElementById("juegoTerminado")

receive("boton", (boton) => {
  console.log(boton)
  switch (boton) {
    case "verde":
      console.log(letras.children)
      console.log(finaliza)
      juegoTerminado.children[selected].classList.remove("presionado")

      if (letras.children.length === 0) {
        if (juegoTerminado.children[(selected+1)].style.visibility === "hidden") {
          selected = selected +1
        }
        console.log(juegoTerminado.children[(selected)])
        juegoTerminado.children[(selected+1)].classList.add("presionado")
        selected = selected + 1
      }
      try {
        console.log("GOdmkasdaks")
        letras.children[(selected+1)].classList.add("presionado")
        letras.children[selected].classList.remove("presionado")
        selected = selected + 1
      } catch (error) {
        letras.children[(0)].classList.add("presionado")
        letras.children[selected].classList.remove("presionado")
        selected =  0
      }
      console.log(selected)

      break;
      case "amarillo":
        if (letras.children.length === 0) {
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
          letras.children[letras.children.length-1].classList.add("presionado")
          letras.children[selected].classList.remove("presionado")
          selected =  letras.children.length-1
         }
         else{
          letras.children[(selected-1)].classList.add("presionado")
          letras.children[selected].classList.remove("presionado")
          selected = selected -1
         }
        } catch (error) {
          letras.children[letras.children.length-1].classList.add("presionado")
          letras.children[selected].classList.remove("presionado")
          selected =  letras.children.length-1
        }
  
        break;
        case "ok":
          console.log(finaliza)
          if (letras.children.length === 0) {
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
                juego: 1,
                nivel: niveles,
              },
              callBack1
            );
                break;
                case 1:
                  postData(
                    "reiniciar",
                    {
                      juego: "1",
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
          if (letras.children.length > 0) {
            letras.children[selected].classList.remove("presionado")

          clickLetter(letras.children[selected].innerText)
            letras.children[(0)].classList.add("presionado")
            selected = 0
            console.log(letras.children.length)
            
          }
         




          console.log(letras.children.length)
    default:
      break;
  }
  

  
});
// CUANDO LE DES AL BOTON DE EMPEZAR QUE CHEQUE SI HHAY PALABRAS Y META UN REINICIO

const crearCajitas = async (palabra) => {
  for (let index = 0; index < palabra.length; index++) {
    wordArray.push(palabra[index]);
  } // Almacena la palabra en el array

  // Crea las cajitas solo una vez por cada letra
  wordArray.forEach((letter, i) => {
    listaCajitas.push({ index: i, letter: letter });
    let div = document.createElement("h2");
    div.setAttribute("id", `cajita${i}`); 
    div.classList.add("cajitas");
    cajitas.appendChild(div);
  });
  shuffleWord = wordArray.sort(() => 0.5 - Math.random()); // Mezcla las letras solo una vez

  // Llama a crearLetras solo después de crear las cajitas
  crearLetras();
  document.getElementById("juegoTerminado").style.display = "none";

  console.log("Palabra:", palabra);
  console.log("Lista de cajitas:", listaCajitas);
};

const parametro = new URLSearchParams(window.location.search);
const niveles = parametro.get("nivel");

function callBack1(data) {
  let palabra = data.palabra; // Palabra recibida del backend
  let imagen = data.imagen;   // Imagen asociada a la palabra

  // Verificar si hay palabras disponibles
  if (palabra === undefined) {
    // No hay más palabras: ocultar "next" y mostrar "comfirmar"
    document.getElementById("comfirmar").style.visibility = "visible";
    document.getElementById("next").style.visibility = "hidden";
  } else {
    document.getElementById("next").style.visibility = "visible";
    document.getElementById("comfirmar").style.visibility = "hidden";


    crearCajitas(palabra);

    // Mostrar la imagen asociada
    document.getElementById("mostrarImagen").src = imagen;
  }
}


next.addEventListener("click", () => {

  // ACA TENGO QUE PONER FUNCION DE SI ESTA BIEN O NO MI PALABRITA
  postData(
    "juego_nivel",
    {
      juego: 1,
      nivel: niveles,
    },
    callBack1
  );
});

postData(
  "juego_nivel",
  {
    juego: 1,
    nivel: niveles,
  },
  (data) => callBack1(data)
);

function reJuego() {
  document.getElementById("juegoTerminado").style.display = "block";
  document.getElementById("comfirmar").addEventListener("click", async () => {
    postData(
      "reiniciar",
      {
        juego: "1",
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

const crearLetras = () => {
  shuffleWord.forEach((letter) => {
    let h2 = document.createElement("h2");
    h2.addEventListener("click", () => clickLetter(letter));
    h2.classList.add("letras");
    h2.innerHTML = letter;
    letras.appendChild(h2);
  });
};