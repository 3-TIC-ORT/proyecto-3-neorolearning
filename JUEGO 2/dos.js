// ---------------------------
// MEMOTEST + INTEGRACIÓN ARDUINO
// ---------------------------

// Conexión al servidor
try {
  connect2Server(); // si ya estaba conectada no pasa nada; si no, la inicia
} catch (e) {
  console.error("Error al conectar al servidor:", e);
}

// Estado del juego
let tarjetasdestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerresultado = null;
let segundoresultado = null;
let movimientos = 0;
let aciertos = 0;
let messi = 1;
let elementos = [];
let selectedCard = 0; // índice de la carta con foco

const modalTerminado = document.getElementById("juegoTerminado");
const botonReiniciar = document.getElementById("restart");
const botonInicio = document.getElementById("exit");
const imagen = document.getElementById("imagen1");


// Contenedor del tablero. Si no existe, lo creo.
let tablero = document.getElementById("tablero");
if (!tablero) {
  tablero = document.createElement("div");
  tablero.id = "tablero";
  document.body.appendChild(tablero);
}

// Construye y mezcla las cartas
function armarCartas() {
  elementos = [`nivel_${messi}`]
    .concat[`nivel_${messi}`].map(e => `${e}.png`); // pares (texto, imagen)
  elementos = elementos.sort(() => Math.random() - 0.5);
  renderBoard();
  // reset estado
  tarjetasdestapadas = 0;
  tarjeta1 = tarjeta2 = null;
  primerresultado = segundoresultado = null;
  movimientos = 0;
  aciertos = 0;
  selectedCard = 0;
  setFocus(selectedCard);
}
armarCartas();

// Renderiza botones/cartas en el DOM
function renderBoard() {
  tablero.innerHTML = "";
  for (let i = 0; i < elementos.length; i++) {
    const btn = document.createElement("button");
    btn.id = String(i);
    btn.className = "card";
    btn.type = "button";
    btn.innerHTML = ""; // boca abajo

    // click manual con mouse
    btn.addEventListener("click", () => {
      removeFocus(selectedCard);
      selectedCard = i;
      setFocus(selectedCard);
      destapar(i);
    });

    tablero.appendChild(btn);
  }

  // al final del render ponemos foco en la primera carta
  setFocus(selectedCard);
}

// Manejo visual de foco con borde
function setFocus(index) {
  const el = document.getElementById(String(index));
  if (el) el.classList.add("presionado"); // borde blanco como en juego de letras
}
function removeFocus(index) {
  const el = document.getElementById(String(index));
  if (el) el.classList.remove("presionado");
}

// Mostrar imagen ganadora/modal
function showWinnerImg() {
  modalTerminado.style.display = 'block'; // Mostrar modal
  imagen.style.display = 'block';
  imagen.style.position = 'fixed';
  imagen.style.top = '0';
  imagen.style.left = '0';
  imagen.style.width = '100vw';
  imagen.style.height = '100vh';
  imagen.style.objectFit = 'cover';
  imagen.style.zIndex = '3';

  botonReiniciar.style.display = 'block';
  botonInicio.style.display = 'block';
}

// Evento para volver a jugar (botón)
if (botonReiniciar) {
  botonReiniciar.addEventListener("click", () => {
    modalTerminado.style.display = 'none';
    imagen.style.display = 'none';
    armarCartas();
  });
}

// Evento para volver al menú (botón)
if (botonInicio) {
  botonInicio.addEventListener("click", () => {
    window.location.href = "../INICIO/menu1.html";
  });
}

// Lógica para destapar cartas
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

      if (aciertos === [`nivel_${messi}`].length) {
        setTimeout(() => {
          showWinnerImg();
        }, 1000);
      }
    } else {
      // error - destapar nuevamente después de un tiempo
      setTimeout(() => {
        tarjeta1.innerHTML = '';
        tarjeta2.innerHTML = '';
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasdestapadas = 0;
      }, 800);
    }
  }
}

// helper para mostrar texto o imagen en una carta
function mostrarEnCarta(element, contenido) {
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

// ---------- Controles por teclado ----------
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
