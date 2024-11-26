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

let selected = 0;
const clickLetter = (letter) => {
  console.log(letter);
  const firstCajita = listaCajitas[0];
  if (firstCajita.letter === letter) {
    let div = document.getElementById(`cajita${firstCajita.index}`);
    div.innerHTML = letter;

    // Cambiar a color verde
    div.style.color = "green";

    // Revertir color después de unos segundos
    setTimeout(() => {
      div.style.color = ""; // Restaura el estilo original
    }, 1000);

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
  } else {
    // Encontrar la letra en el área de letras
    for (let index = 0; index < letras.children.length; index++) {
      if (letras.children.item(index).innerHTML === letter) {
        // Cambiar a color rojo
        letras.children.item(index).style.color = "red";

        // Revertir color después de unos segundos
        setTimeout(() => {
          letras.children.item(index).style.color = ""; // Restaura el estilo original
        }, 2000);

        break;
      }
    }
  }
};
connect2Server();

let finaliza = false;
let juegoTerminado = document.getElementById("juegoTerminado");

receive("boton", (boton) => {
  console.log(boton);
  switch (boton) {
    case "verde":
      console.log(letras.children);
      console.log(finaliza);
      juegoTerminado.children[selected].classList.remove("presionado");

      if (letras.children.length === 0) {
        if (juegoTerminado.children[selected + 1].style.visibility === "hidden") {
          selected = selected + 1;
        }
        console.log(juegoTerminado.children[selected]);
        juegoTerminado.children[selected + 1].classList.add("presionado");
        selected = selected + 1;
      }
      try {
        letras.children[selected + 1].classList.add("presionado");
        letras.children[selected].classList.remove("presionado");
        selected = selected + 1;
      } catch (error) {
        letras.children[0].classList.add("presionado");
        letras.children[selected].classList.remove("presionado");
        selected = 0;
      }
      break;
    case "amarillo":
      if (letras.children.length === 0) {
        juegoTerminado.children[selected].classList.remove("presionado");

        if (juegoTerminado.children[selected - 1].style.visibility === "hidden") {
          selected = selected - 1;
        }
        juegoTerminado.children[selected - 1].classList.add("presionado");
        selected = selected - 1;
      }
      try {
        if (selected === 0) {
          letras.children[letras.children.length - 1].classList.add("presionado");
          letras.children[selected].classList.remove("presionado");
          selected = letras.children.length - 1;
        } else {
          letras.children[selected - 1].classList.add("presionado");
          letras.children[selected].classList.remove("presionado");
          selected = selected - 1;
        }
      } catch (error) {
        letras.children[letras.children.length - 1].classList.add("presionado");
        letras.children[selected].classList.remove("presionado");
        selected = letras.children.length - 1;
      }
      break;
    case "ok":
      if (letras.children.length === 0) {
        finaliza = true;
      }
      if (finaliza === true) {
        switch (selected) {
          case 0:
            juegoTerminado.children[0].classList.add("presionado");

            finaliza = false;
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
          case 2:
            location.href = "../INICIO/menu1.html";
            break;

          default:
            break;
        }
      }
      if (letras.children.length > 0) {
        letras.children[selected].classList.remove("presionado");

        clickLetter(letras.children[selected].innerText);
        letras.children[0].classList.add("presionado");
        selected = 0;
      }
    default:
      break;
  }
});

const crearCajitas = async (palabra) => {
  for (let index = 0; index < palabra.length; index++) {
    wordArray.push(palabra[index]);
  }

  wordArray.forEach((letter, i) => {
    listaCajitas.push({ index: i, letter: letter });
    let div = document.createElement("h2");
    div.setAttribute("id", `cajita${i}`);
    div.classList.add("cajitas");
    cajitas.appendChild(div);
  });
  shuffleWord = wordArray.sort(() => 0.5 - Math.random());

  crearLetras();
  document.getElementById("juegoTerminado").style.display = "none";
};

const parametro = new URLSearchParams(window.location.search);
const niveles = parametro.get("nivel");

function callBack1(data) {
  let palabra = data.palabra;
  let imagen = data.imagen;
  img.src = "./imagenes/" + imagen;

  if (palabra === undefined) {
    document.getElementById("comfirmar").style.visibility = "visible";
    document.getElementById("next").style.visibility = "hidden";
  } else {
    document.getElementById("next").style.visibility = "visible";
    document.getElementById("comfirmar").style.visibility = "hidden";

    crearCajitas(palabra);
  }
}

next.addEventListener("click", () => {
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
  // Mostrar el contenedor de "juego terminado" después de 2 segundos
  setTimeout(() => {
    document.getElementById("juegoTerminado").style.display = "block";

    // Configurar eventos para los botones
    document.getElementById("comfirmar").addEventListener("click", () => {
      postData(
        "reiniciar",
        {
          juego: "1",
          nivel: niveles,
        },
        (data) => {
          if (data) {
            location.reload(); // Recargar la página para reiniciar el juego
          }
        }
      );
      document.getElementById("juegoTerminado").style.display = "none";
    });

    document.getElementById("cancelar").addEventListener("click", async () => {
      window.location.href =
        "http://127.0.0.1:5500/INICIO/menu1.html";
    });
  }, 200); 
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
