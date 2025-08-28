// ---------------------------
// MEMOTEST + INTEGRACIÓN ARDUINO (SIN CAMBIOS VISUALES)
// ---------------------------

// Intento de conectar al servidor
try {
  connect2Server();
} catch (e) {
  console.error("Error al conectar al servidor:", e);
}
const parametro = new URLSearchParams(window.location.search);
const niveles = parametro.get("nivel");

// Estado del juego
let tarjetasdestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerresultado = null;
let segundoresultado = null;
let movimientos = 0;
let aciertos = 0;
let messi = niveles;
let grupo=0;
let elementos = [];
let selectedCard = 0; // índice de la carta con foco

let selectedMenu = 0; // índice del menú terminado
function focusMenu() {
  if (!modalTerminado) return;
  const botones = [botonReiniciar, botonInicio];
  botones.forEach((btn, i) => btn.classList.remove("presionado"));
  if (botones[selectedMenu]) botones[selectedMenu].classList.add("presionado");
}


// Elementos del DOM
const modalTerminado = document.getElementById("juegoTerminado");
const botonReiniciar = document.getElementById("restart");
const botonInicio = document.getElementById("exit");
const imagen = document.getElementById("imagen1");
var emociones;
postData("getJson", "json", (data)=>{
  emociones=data["juego_2"]
  console.log(emociones)
  armarCartas();

})
// Datos de cartas (pares: texto y su .png correspondiente)


// Contenedor del tablero
let tablero = document.getElementById("tablero");
if (!tablero) {
  tablero = document.createElement("div");
  tablero.id = "tablero";
  document.body.appendChild(tablero);
}

// Construye y mezcla las cartas
function armarCartas() {
  elementos = emociones[`nivel_${messi}`][`grupo_${grupo+1}`]["palabras"].map(e => e.palabra)
    .concat(emociones[`nivel_${messi}`][`grupo_${grupo+1}`]["palabras"].map(e => `${e.palabra}.png`));

  elementos = elementos.sort(() => Math.random() - 0.5);
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

// Render del tablero
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

// Foco visual
function setFocus(index) {
  const el = document.getElementById(String(index));
  if (el) el.classList.add("presionado");
}
function removeFocus(index) {
  const el = document.getElementById(String(index));
  if (el) el.classList.remove("presionado");
}

// Mostrar imagen ganadora/modal
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

  selectedMenu = 0;
  focusMenu();

}

// Botones del modal
if (botonReiniciar) {
  botonReiniciar.addEventListener("click", () => {
    // Ocultar modal e imagen
    if (modalTerminado) modalTerminado.style.display = 'none';
    if (imagen) imagen.style.display = 'none';

    // Reset completo del tablero
    elementos.forEach((_, i) => {
      const btn = document.getElementById(String(i));
      if (btn) {
        btn.innerHTML = '';
        btn.disabled = false;
        btn.classList.remove('presionado');
      }
    });

    tarjetasdestapadas = 0;
    tarjeta1 = null;
    tarjeta2 = null;
    primerresultado = null;
    segundoresultado = null;
    movimientos = 0;
    aciertos = 0;
    selectedCard = 0;

    armarCartas();
  });
}

if (botonInicio) {
  botonInicio.addEventListener("click", () => {
    window.location.href = "../INICIO/menu1.html";
  });
}

// Lógica de destapar cartas
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

    if (primerresultado.replace('.png', '') === segundoresultado.replace('.png', '')) {
      // acierto
      tarjetasdestapadas = 0;
      aciertos++;
      if (aciertos === elementos.length/2) {
        grupo=1-grupo
        setTimeout(showWinnerImg, 1000);
        console.log("terminado")
        
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

// Mostrar contenido en carta
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
row=1 // 1,2,3
col=1 // 1,2,3,4
// Controles por hardware
try {
  receive("boton", (boton) => {
    try {
      if(btn==="rojo"){
        row-=1
        row = (row===0) ? 1 : row
      }else if (btn==="amarillo"){
        col-=1
        col = (col===0) ? 1 : col
      }else if (btn==="azul"){
        row+=1
        row = (row===4) ? 3 : row
      }else if (btn==="verde"){
        col+=1
        col = (col===5) ? 4 : col
      }else if (btn==="ok"){
        destapar(document.querySelector(`.r${row}.c${col}`).id)
      }

      document.querySelectorAll(".card").forEach(e=>{
        e.classList.remove("selected")
      })
      document.querySelector(`.r${row}.c${col}`).classList.add("selected")

    } catch (err) {
      console.error("Error manejando boton recibido:", err);
    }
  });
} catch (e) {
  console.warn("No se pudo registrar receive('boton', ...). ¿La conexión al backend está activa?", e);
}



// Controles por teclado (debug)
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

// Inicialización

