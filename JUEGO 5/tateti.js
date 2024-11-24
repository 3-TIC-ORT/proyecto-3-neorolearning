// Caracteres para el tablero
const x = "✖";
const o = "〇";

// Elementos de la página
const cuadrados = document.querySelectorAll(".cuadrado");
const modalTerminado = document.getElementById("juegoTerminado");
const botonReiniciar = document.getElementById("comfirmar");
const botonInicio = document.getElementById("cancelar");

const imagenGanador1 = document.getElementById("imagen1");
const imagenGanador2 = document.getElementById("imagen2");
const imagenEmpate = document.getElementById("imagen3");

let estadoJuego = "P1"; // P1 | P2 | PAUSA
let puntosJugador1 = 0;
let puntosJugador2 = 0;

// Manejador de clics en los cuadrados
cuadrados.forEach((cuadrado) => {
    cuadrado.addEventListener("click", () => {
        if (estadoJuego === "PAUSA") return;
        if (cuadrado.textContent !== "") return;

        cuadrado.textContent = estadoJuego === "P1" ? x : o;
        const ganador = revisarSiHayGanador();

        if (ganador === "P1") {
            puntosJugador1++;
            document.getElementById("contador1").textContent = puntosJugador1;
            mostrarResultado("Ganador: Jugador 1", imagenGanador1);
        } else if (ganador === "P2") {
            puntosJugador2++;
            document.getElementById("contador2").textContent = puntosJugador2;
            mostrarResultado("Ganador: Jugador 2", imagenGanador2);
        } else if (ganador === "empate") {
            mostrarResultado("Empate", imagenEmpate);
        } else {
            estadoJuego = estadoJuego === "P1" ? "P2" : "P1";
        }
    });
});

// Función para mostrar el resultado
function mostrarResultado(texto, imagen) {
    document.getElementById("juegoTerminado").style.display = "block";
    imagen.style.display = "block";
    estadoJuego = "PAUSA";
}

// Reiniciar juego
botonReiniciar.addEventListener("click", () => {
    limpiarTablero();
    modalTerminado.style.display = "none";
    imagenGanador1.style.display = "none";
    imagenGanador2.style.display = "none";
    imagenEmpate.style.display = "none";
    estadoJuego = "P1";
});

// Volver al inicio
botonInicio.addEventListener("click", () => {
    window.location.href = "../INICIO/menu1.html";
});

// Revisión de posibles ganadores
function revisarSiHayGanador() {
    const tablero = Array.from(cuadrados).map((cuadrado) => cuadrado.textContent);

    // Revisar filas
    for (let i = 0; i < 9; i += 3) {
        if (tablero[i] && tablero[i] === tablero[i + 1] && tablero[i] === tablero[i + 2]) {
            return tablero[i] === x ? "P1" : "P2";
        }
    }

    // Revisar columnas
    for (let i = 0; i < 3; i++) {
        if (tablero[i] && tablero[i] === tablero[i + 3] && tablero[i] === tablero[i + 6]) {
            return tablero[i] === x ? "P1" : "P2";
        }
    }

    // Revisar diagonales
    if (tablero[0] && tablero[0] === tablero[4] && tablero[0] === tablero[8]) {
        return tablero[0] === x ? "P1" : "P2";
    }
    if (tablero[2] && tablero[2] === tablero[4] && tablero[2] === tablero[6]) {
        return tablero[2] === x ? "P1" : "P2";
    }

    // Revisar empate
    if (!tablero.includes("")) return "empate";

    return null; // El juego continúa
}

// Limpiar el tablero
function limpiarTablero() {
    cuadrados.forEach((cuadrado) => {
        cuadrado.textContent = "";
        cuadrado.classList.remove("ganador");
    });
}

