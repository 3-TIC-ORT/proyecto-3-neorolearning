// ---------------------------
// MEMOTEST + INTEGRACIÓN ARDUINO (DINÁMICO DESDE JSON LOCAL, CORREGIDO)
// ---------------------------

// Intento de conectar al servidor
try {
  connect2Server();
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
let nivelActual = 1;
let elementos = [];
let selectedCard = 0; // índice de la carta con foco

// Elementos del DOM
const modalTerminado = document.getElementById("juegoTerminado");
const botonReiniciar = document.getElementById("restart");
const botonInicio = document.getElementById("exit");
const imagen = document.getElementById("imagen1");
const tablero = document.getElementById("tablero") || (() => {
  const t = document.createElement("div");
  t.id = "tablero";
  document.body.appendChild(t);
  return t;
})();

// --------------------
// EJEMPLO palabrasData (de tu JSON local)
const palabrasData = {
  "juego_2": {
    "nivel_1": {
      "grupo_1": { "usada": "no", "palabras": [
        { "palabra": "Azul", "imagen": "azul.png" },
        { "palabra": "Amarillo", "imagen": "amarillo.png" },
        { "palabra": "Naranja", "imagen": "naranja.png" },
        { "palabra": "Rojo", "imagen": "rojo.png" },
        { "palabra": "Violeta", "imagen": "violeta.png" },
        { "palabra": "Verde", "imagen": "verde.png" }
      ]},
      "grupo_2": { "usada": "no", "palabras": [
        { "palabra": "Feliz", "imagen": "feliz.png" },
        { "palabra": "Triste", "imagen": "triste.png" },
        { "palabra": "Miedo", "imagen": "miedo.png" },
        { "palabra": "Enojo", "imagen": "enojo.png" },
        { "palabra": "Desagrado", "imagen": "desagrado.png" },
        { "palabra": "Confusión", "imagen": "confusion.png" }
      ]}
    }
  }
};

// ---------- Función para obtener cartas desde palabrasData ----------
function obtenerCartasNivel(juego, nivel) {
  const nivelData = palabrasData[`juego_${juego}`][`nivel_${nivel}`];
  const grupos = Object.values(nivelData).filter(g => g.usada === "no" && g.palabras);
  if (!grupos.length) return [];
  const grupo = grupos[0];
  grupo.usada = "si"; // marcar usado
  return grupo.palabras; // array de {palabra, imagen}
}

// ---------- Construye y mezcla las cartas ----------
function armarCartas() {
  const cartas = obtenerCartasNivel(2, nivelActual); // juego 2
  if (!cartas.length) return;

  // Creamos array de elementos: palabra + imagen como objetos
  elementos = cartas.flatMap(c => [
    { palabra: c.palabra, tipo: 'palabra' },
    { palabra: c.palabra, imagen: c.imagen, tipo: 'imagen' }
  ]);

  elementos = elementos.sort(() => Math.random() - 0.5); // mezcla

  renderBoard();

  // Reset estado
  tarjetasdestapadas = 0;
  tarjeta1 = tarjeta2 = null;
  primerresultado = segundoresultado = null;
  movimientos = 0;
  aciertos = 0;
  selectedCard = 0;
  setFocus(selectedCard);
}

// ---------- Render del tablero ----------
function renderBoard() {
  tablero.innerHTML = "";
  for (let i = 0; i < elementos.length; i++) {
    const btn = document.createElement("button");
    btn.id = String(i);
    btn.className = "card";
    btn.type = "button";
    btn.innerHTML = "";
    btn.addEventListener("click", () => {
      removeFocus(selectedCard);
      selectedCard = i;
      setFocus(selectedCard);
      destapar(i);
    });
    tablero.appendChild(btn);
  }
}

// ---------- Foco visual ----------
function setFocus(index) {
  const el = document.getElementById(String(index));
  if (el) el.classList.add("presionado");
}
function removeFocus(index) {
  const el = document.getElementById(String(index));
  if (el) el.classList.remove("presionado");
}

// ---------- Mostrar imagen de ganador ----------
function showWinnerImg() {
  if (!modalTerminado) return;
  modalTerminado.style.display = 'flex';
  if (imagen) imagen.style.display = 'block';
  if (botonReiniciar) botonReiniciar.style.display = 'block';
  if (botonInicio) botonInicio.style.display = 'block';
}

// ---------- Botones del modal ----------
botonReiniciar?.addEventListener("click", () => {
  modalTerminado.style.display = 'none';
  imagen.style.display = 'none';
  armarCartas();
});
botonInicio?.addEventListener("click", () => {
  window.location.href = "../INICIO/menu1.html";
});

// ---------- Lógica de destapar cartas ----------
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
    tarjeta2 = el;
    segundoresultado = elementos[id];
    mostrarEnCarta(tarjeta2, segundoresultado);
    tarjeta2.disabled = true;

    movimientos++;

    if (primerresultado.palabra === segundoresultado.palabra) {
      tarjetasdestapadas = 0;
      aciertos++;
      if (aciertos === elementos.length / 2) {
        setTimeout(showWinnerImg, 1000);
      }
    } else {
      setTimeout(() => {
        tarjeta1.innerHTML = "";
        tarjeta2.innerHTML = "";
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasdestapadas = 0;
      }, 800);
    }
  }
}

// ---------- Mostrar contenido en carta ----------
function mostrarEnCarta(element, contenido) {
  if (!element) return;
  if (contenido.tipo === 'imagen') {
    element.innerHTML = `<img src="./images/${contenido.imagen}" alt="${contenido.palabra}">`;
  } else {
    element.innerHTML = contenido.palabra;
  }
}

// ---------- Controles por hardware ----------
try {
  receive("boton", (boton) => {
    switch (boton) {
      case "verde":
        removeFocus(selectedCard);
        selectedCard = (selectedCard + 1) % elementos.length;
        setFocus(selectedCard);
        break;
      case "amarillo":
        removeFocus(selectedCard);
        selectedCard = (selectedCard - 1 + elementos.length) % elementos.length;
        setFocus(selectedCard);
        break;
      case "ok":
        destapar(selectedCard);
        break;
      default:
        console.log("Botón desconocido:", boton);
    }
  });
} catch (e) {
  console.warn("No se pudo registrar receive('boton')", e);
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

// ---------- Inicialización ----------
armarCartas();
