var jugadorRojo = "R";
var jugadorAmarillo = "A";
var jugadorActual = jugadorRojo;

var juegoTerminado = false;
var tablero;

var filas = 6;
var columnas = 7;
var currFilas = []; // Mantiene el seguimiento de qué fila está en cada columna.

window.onload = function() {
    iniciarJuego();
}

function iniciarJuego() {
    tablero = [];
    currFilas = [5, 5, 5, 5, 5, 5, 5]; // Inicializar con la fila más baja disponible.

    for (let r = 0; r < filas; r++) {
        let fila = [];
        for (let c = 0; c < columnas; c++) {
            // JS
            fila.push(' '); // Inicializa el tablero.

            // HTML
            let casilla = document.createElement("div");
            casilla.id = r.toString() + "-" + c.toString(); // ID para cada casilla.
            casilla.classList.add("tile");
            casilla.addEventListener("click", colocarPieza); // Asigna el evento click a cada casilla.
            document.getElementById("tablero").append(casilla); // Añade la casilla al tablero en HTML.
        }
        tablero.push(fila); // Añade la fila al tablero.
    }
}

function colocarPieza() {
    if (juegoTerminado) {
        return; // Si el juego ha terminado, no hacer nada.
    }

    // Obtener las coordenadas de la casilla clickeada
    let coords = this.id.split("-");
    let c = parseInt(coords[1]); // Obtener la columna desde la ID
    let r = currFilas[c]; // Obtener la fila más baja disponible en la columna

    if (r < 0) {
        return; // Si no hay filas disponibles, salir de la función
    }

    tablero[r][c] = jugadorActual; // Colocar la pieza en el tablero
    let casilla = document.getElementById(r.toString() + "-" + c.toString());

    if (jugadorActual == jugadorRojo) {
        casilla.classList.add("pieza-roja"); // Añadir clase de jugador rojo
        jugadorActual = jugadorAmarillo; // Cambiar turno
    } else {
        casilla.classList.add("pieza-amarilla"); // Añadir clase de jugador amarillo
        jugadorActual = jugadorRojo; // Cambiar turno
    }

    currFilas[c] -= 1; // Actualizar la fila más baja disponible en la columna
    verificarGanador(); // Llamar a la función para verificar si hay un ganador
}

function verificarGanador() {
    // horizontal
    for (let r = 0; r < filas; r++) {
        for (let c = 0; c < columnas - 3; c++) {
            if (tablero[r][c] != ' ') {
                if (tablero[r][c] == tablero[r][c + 1] &&
                    tablero[r][c + 1] == tablero[r][c + 2] &&
                    tablero[r][c + 2] == tablero[r][c + 3]) {
                    declararGanador(r, c);
                    return;
                }
            }
        }
    }

    // vertical
    for (let c = 0; c < columnas; c++) {
        for (let r = 0; r < filas - 3; r++) {
            if (tablero[r][c] != ' ') {
                if (tablero[r][c] == tablero[r + 1][c] &&
                    tablero[r + 1][c] == tablero[r + 2][c] &&
                    tablero[r + 2][c] == tablero[r + 3][c]) {
                    declararGanador(r, c);
                    return;
                }
            }
        }
    }

    // diagonal (anti-diagonal)
    for (let r = 0; r < filas - 3; r++) {
        for (let c = 0; c < columnas - 3; c++) {
            if (tablero[r][c] != ' ') {
                if (tablero[r][c] == tablero[r + 1][c + 1] &&
                    tablero[r + 1][c + 1] == tablero[r + 2][c + 2] &&
                    tablero[r + 2][c + 2] == tablero[r + 3][c + 3]) {
                    declararGanador(r, c);
                    return;
                }
            }
        }
    }

    // diagonal
    for (let r = 3; r < filas; r++) {
        for (let c = 0; c < columnas - 3; c++) {
            if (tablero[r][c] != ' ') {
                if (tablero[r][c] == tablero[r - 1][c + 1] &&
                    tablero[r - 1][c + 1] == tablero[r - 2][c + 2] &&
                    tablero[r - 2][c + 2] == tablero[r - 3][c + 3]) {
                    declararGanador(r, c);
                    return;
                }
            }
        }
    }
}

function declararGanador(r, c) {
    let ganador = document.getElementById("winner");
    if (tablero[r][c] == jugadorRojo) {
        ganador.innerText = "¡Gana el Rojo!";             
    } else {
        ganador.innerText = "¡Gana el Amarillo!";
    }
    juegoTerminado = true; // Establecer el juego como terminado
}
