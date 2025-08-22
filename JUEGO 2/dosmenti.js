// ---------------------------
// MEMOTEST + INTEGRACIÓN ARDUINO (SIN CAMBIOS VISUALES)
// ---------------------------

// Intento de conectar al servidor (usa la función que compartiste)
try {
  connect2Server();
} catch (e) {
  console.error("Error al conectar al servidor:", e);
}

// CODIGO LOUCIM - -- - -- 
fetchData("traerPalabras", setWords)

let dataPalabras;

function setWords(data) {
  dataPalabras = data;
  console.log("Data recibida del back:", data)
}

function handleWords(dataPalabras) {
  tempWords = {};

  dataPalabras.forEach(nivel => {
    tempWords.add(nivel);
    console.log(nivel)
  });
  return tempWords;
}

// CODIGO LOUCIM  -  


// Estado del juego
let tarjetasdestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerresultado = null;
let segundoresultado = null;
let movimientos = 0;
let aciertos = 0;
let numero = 1;
let elementos = [];
let selectedCard = 0; // índice de la carta con foco

// Elementos del DOM (uso los mismos IDs que mostraste)
const modalTerminado = document.getElementById("juegoTerminado");
const botonReiniciar = document.getElementById("restart");
const botonInicio = document.getElementById("exit");
const imagen = document.getElementById("imagen1");

// Datos de cartas (pares: texto y su .png correspondiente)
let emociones = handleWords(dataPalabras)

// Contenedor del tablero: si no existe, lo creo pero sin aplicar estilos.
let tablero = document.getElementById("tablero");
if (!tablero) {
  tablero = document.createElement("div");
  tablero.id = "tablero";
  document.body.appendChild(tablero);
}

// Construye y mezcla las cartas (mantiene tu formato: texto y 'texto.png')
function armarCartas() {
  elementos = emociones[`nivel_${numero}`]
    .concat(emociones[`nivel_${numero}`].map(e => `${e}.png`));
  elementos = elementos.sort(() => Math.random() - 0.5);
  renderBoard();
  // reset estado
  tarjetasdestapadas = 0;
  tarjeta1 = tarjeta2 = null;
  primerresultado = segundoresultado = null;
  movimientos = 0;
  aciertos = 0;
  selectedCard = 0;
  // Si existe alguna carta, ponemos el foco sobre la primera (solo agregamos/quitamos clase,
  // no modificamos estilos)
  setFocus(selectedCard);
}
armarCartas();

// Renderiza el tablero sin tocar estilos visuales
function renderBoard() {
  tablero.innerHTML = "";
  for (let i = 0; i < elementos.length; i++) {
    const btn = document.createElement("button");
    btn.id = String(i);
    // dejamos la clase para que, si tenés CSS, la respete; no inyectamos estilos.
    btn.className = "card";
    btn.type = "button";
    btn.innerHTML = ""; // boca abajo
    btn.addEventListener("click", () => {
      // al click del mouse, colocamos foco en la tarjeta y la destapamos
      removeFocus(selectedCard);
      selectedCard = i;
      setFocus(selectedCard);
      destapar(i);
    });
    tablero.appendChild(btn);
  }
}

// Manejo visual de foco (añade/quita clase, sin definir estilos aquí)
function setFocus(index) {
  const el = document.getElementById(String(index));
  if (el) el.classList.add("presionado");
}
function removeFocus(index) {
  const el = document.getElementById(String(index));
  if (el) el.classList.remove("presionado");
}

// Mostrar imagen ganadora/modal (uso la misma lógica que tenías)
function showWinnerImg() {
  if (!modalTerminado) return;
  modalTerminado.style.display = 'block';
  if (imagen) {
    imagen.style.display = 'block';
    imagen.style.position = 'fixed';
    imagen.style.top = '0';
    imagen.style.left = '0';
    imagen.style.width = '100vw';
    imagen.style.height = '100vh';
    imagen.style.objectFit = 'cover';
    imagen.style.zIndex = '3';
  }
  if (botonReiniciar) botonReiniciar.style.display = 'block';
  if (botonInicio) botonInicio.style.display = 'block';
}

// Evento para volver a jugar (botón)
if (botonReiniciar) {
  botonReiniciar.addEventListener("click", () => {
    if (modalTerminado) modalTerminado.style.display = 'none';
    if (imagen) imagen.style.display = 'none';
    armarCartas();
  });
}

// Evento para volver al menú (botón)
if (botonInicio) {
  botonInicio.addEventListener("click", () => {
    window.location.href = "../INICIO/menu1.html";
  });
}

// Lógica para destapar cartas (adaptada de tu código original)
function destapar(id) {
  const el = document.getElementById(String(id));
  if (!el || el.disabled) return;

  tarjetasdestapadas++;

  if (tarjetasdestapadas === 1) {
    tarjeta1 = el;
    primerresultado = elementos[id];
    mostrarEnCarta(tarjeta1, primerresultado);
    tarjeta1.disabled = true;
  } else if (tarjetasdestapadas === 2) {
    tarjeta2 = document.getElementById(String(id));
    segundoresultado = elementos[id];
    mostrarEnCarta(tarjeta2, segundoresultado);
    tarjeta2.disabled = true;

    movimientos++;

    if (primerresultado.replace('.png', '') === segundoresultado.replace('.png', '')) {
      // acierto
      tarjetasdestapadas = 0;
      aciertos++;

      if (aciertos === emociones[`nivel_${numero}`].length) {
        setTimeout(() => {
          showWinnerImg();
        }, 1000);
      }
    } else {
      // error - volvemos a ocultar
      setTimeout(() => {
        if (tarjeta1) tarjeta1.innerHTML = '';
        if (tarjeta2) tarjeta2.innerHTML = '';
        if (tarjeta1) tarjeta1.disabled = false;
        if (tarjeta2) tarjeta2.disabled = false;
        tarjetasdestapadas = 0;
      }, 800);
    }
  }
}

// helper para mostrar texto o imagen en una carta (sin cambiar estilos)
function mostrarEnCarta(element, contenido) {
  if (!element) return;
  if (typeof contenido !== "string") {
    element.innerHTML = contenido;
    return;
  }
  if (contenido.endsWith('.png')) {
    element.innerHTML = `<img src="./images/${contenido}" alt="${contenido.replace('.png','')}">`;
  } else {
    element.innerHTML = contenido;
  }
}

// ---------- Controles por hardware (Arduino) ----------
try {
  receive("boton", (boton) => {
    try {
      switch (boton) {
        case "verde": // siguiente
          removeFocus(selectedCard);
          selectedCard = (selectedCard + 1) % elementos.length;
          setFocus(selectedCard);
          break;
        case "amarillo": // anterior
          removeFocus(selectedCard);
          selectedCard = (selectedCard - 1 + elementos.length) % elementos.length;
          setFocus(selectedCard);
          break;
        case "ok": // voltear/seleccionar
          destapar(selectedCard);
          break;
        default:
          console.log("boton desconocido recibido:", boton);
      }
    } catch (err) {
      console.error("Error manejando boton recibido:", err);
    }
  });
} catch (e) {
  console.warn("No se pudo registrar receive('boton', ...). ¿La conexión al backend está activa?", e);
}

// ---------- Controles por teclado (debug) ----------
document.addEventListener("keydown", (ev) => {
  if (ev.key === "ArrowRight") {
    removeFocus(selectedCard);
    selectedCard = (selectedCard + 1) % elementos.length;
    setFocus(selectedCard);
  } else if (ev.key === "ArrowLeft") {
    removeFocus(selectedCard);
    selectedCard = (selectedCard - 1 + elementos.length) % elementos.length;
    setFocus(selectedCard);
  } else if (ev.key === "Enter" || ev.key === " ") {
    ev.preventDefault();
    destapar(selectedCard);
  }
});
