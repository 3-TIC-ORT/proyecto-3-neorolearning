let imagenes = document.getElementById("mostrarImagen");
let palabrota = document.getElementById("todasPalabras");
let text = document.getElementById("text");
const foto = document.getElementById("imagen1");

let palabraCorrecta = 0;
let finaliza = false;
let selected = 0;

connect2Server();
const parametro = new URLSearchParams(window.location.search);
const niveles = parametro.get("nivel");

receive("boton", (boton) => {
  switch (boton) {
    case "verde":
      try {
        palabrota.children[selected].classList.remove("presionado");
        selected = (selected + 1) % palabrota.children.length;
        palabrota.children[selected].classList.add("presionado");
      } catch {
        selected = 0;
        palabrota.children[selected].classList.add("presionado");
      }
      break;
    case "amarillo":
      try {
        palabrota.children[selected].classList.remove("presionado");
        selected = (selected - 1 + palabrota.children.length) % palabrota.children.length;
        palabrota.children[selected].classList.add("presionado");
      } catch {
        selected = palabrota.children.length - 1;
        palabrota.children[selected].classList.add("presionado");
      }
      break;
    case "ok":
      if (palabrota.children.length === 0) finaliza = true;
      if (finaliza) {
        recargarJuego();
        finaliza = false;
      } else if (palabrota.children.length > 0) {
        clickLetter(palabrota.children[selected].innerText);
        selected = 0;
        palabrota.children[selected].classList.add("presionado");
      }
      break;
  }
});

function callBack2(data) {
  let grupo_aleatorio = data.grupoAleatorio;
  let palabras_back = grupo_aleatorio.palabras;
  let palabraIndex = 0;

  if (!palabras_back || palabras_back.length === 0) {
    document.getElementById("next").style.visibility = "hidden";
    document.getElementById("comfirmar").style.visibility = "visible";
  } else {
    palabraCorrecta = palabras_back[Math.floor(Math.random() * palabras_back.length)];

    palabrota.innerHTML = "";
    palabras_back.forEach((item, index) => {
      let palabra = document.createElement("h2");
      palabra.innerHTML = item.palabra;
      palabra.classList.add("palabra");
      if (index === palabraIndex) palabra.classList.add("presionado");
      palabra.addEventListener("click", () => clickLetter(item.palabra));
      palabrota.appendChild(palabra);
    });

    mostrarImagen(palabraCorrecta);

    document.getElementById("next").style.display =
      palabraIndex < palabras_back.length - 1 ? "block" : "none";
    document.getElementById("reiniciar").style.display =
      palabraIndex >= palabras_back.length - 1 ? "block" : "none";
  }

  mostrarPalabra();

  document.getElementById("next").addEventListener("click", () => {
    if (palabraIndex < palabras_back.length - 1) {
      palabraIndex++;
      mostrarPalabra();
    }
  });

  document.getElementById("reiniciar").addEventListener("click", () => {
    postData(
      "hayPalabras",
      { juego: "3", nivel: niveles },
      (hayPalabras) => {
        if (!hayPalabras) {
          // 🔹 No quedan palabras → reiniciar JSON
          postData(
            "reiniciar",
            { juego: "3", nivel: niveles },
            () => { recargarJuego(); }
          );
        } else {
          recargarJuego();
        }
      }
    );
  });
}

postData(
  "juego_nivel",
  { juego: 3, nivel: niveles },
  callBack2
);

function recargarJuego() {
  foto.style.display = "none";
  palabrota.innerHTML = "";
  palabraCorrecta = 0;
  postData(
    "juego_nivel",
    { juego: 3, nivel: niveles },
    callBack2
  );
}

function reJuego() {
  setTimeout(() => {
    document.getElementById("juegoTerminado").style.display = "block";
    postData("terminoJuego", "GANAR", () => { console.log("enviado"); });
    foto.style.display = "block";

    foto.style.position = "fixed";
    foto.style.top = "0";
    foto.style.left = "0";
    foto.style.width = "100vw";
    foto.style.height = "100vh";
    foto.style.zIndex = "1";
    foto.style.objectFit = "cover";

    postData(
      "hayPalabras",
      { juego: "3", nivel: niveles },
      (hayPalabras) => {
        if (!hayPalabras) {
          document.getElementById("comfirmar").style.visibility = "visible";
          document.getElementById("next").style.visibility = "hidden";
        }
      }
    );

    document.getElementById("comfirmar").addEventListener("click", () => {
      postData(
        "reiniciar",
        { juego: "3", nivel: niveles },
        (data) => { if (data) recargarJuego(); }
      );
      document.getElementById("juegoTerminado").style.display = "none";
      foto.style.display = "none";
    });

    document.getElementById("cancelar").addEventListener("click", () => {
      window.location.href = "../INICIO/menu1.html";
    });
  }, 200);
}

function mostrarImagen(palabraCorrecta) {
  if (palabraCorrecta && palabraCorrecta.imagen) {
    imagenes.src = "./imagenes/" + palabraCorrecta.imagen;
  }
}

let clickLetter = (palabra) => {
  if (palabra === palabraCorrecta.palabra) {
    text.innerText = "Palabra correcta";
    reJuego();
  } else {
    text.innerText = "Palabra incorrecta";
  }
};
