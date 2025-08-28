var jugadorRojo = "R"; // verde
var jugadorAmarillo = "A"; // amarillo
var jugadorActual = jugadorRojo;
var juegoTerminado = false;
var tablero;
let colSelected=0;
var filas = 6;
var columnas = 7;
var currFilas = []; // Mantiene el seguimiento de qué fila está en cada columna.
var coords

connect2Server();


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
            casilla.classList.add(`col${c}`)
            casilla.classList.add("tile");
            casilla.addEventListener("click", colocarPieza); // Asigna el evento click a cada casilla.
            document.getElementById("tablero").append(casilla); // Añade la casilla al tablero en HTML.
            
            
        }
        tablero.push(fila); // Añade la fila al tablero.
    }
    document.querySelectorAll(`.tile`).forEach(e=>{
        e.classList.remove("colActive")
    })
    document.querySelectorAll(`.col${colSelected}`).forEach(e => {
        e.classList.add("colActive")
    });
}

function colocarPieza(coordsDefined) {
    if (juegoTerminado) {
        return; // Si el juego ha terminado, no hacer nada.
    }
    let c,r
    if(typeof(coordsDefined)==="string"){
        c= coordsDefined
        r = currFilas[c];
    }else{
        console.log(this.id.split("-"))
        coords = this.id.split("-");
        c = coords[1]; // Obtener la columna desde la ID // Obtener la fila más baja disponible en la columna
        r=currFilas[c]
        colSelected=c
        document.querySelectorAll(`.tile`).forEach(e=>{
            e.classList.remove("colActive")
        })
        document.querySelectorAll(`.col${colSelected}`).forEach(e => {
            e.classList.add("colActive")
        });
    }
    // Obtener las coordenadas de la casilla clickeada
    
    if (r < 0) {
        return; // Si no hay filas disponibles, salir de la función
    }

    tablero[r][c] = jugadorActual; // Colocar la pieza en el tablero
    let casilla = document.getElementById(r.toString() + "-" + c.toString());

    if (jugadorActual == jugadorRojo) {
        casilla.classList.add("pieza-roja"); // Añadir clase de jugador rojo
        document.querySelector("#player2").classList.add("brillete")
        document.querySelector("#player1").classList.remove("brillete")
        jugadorActual = jugadorAmarillo; // Cambiar turno
    } else {
        casilla.classList.add("pieza-amarilla"); // Añadir clase de jugador amarillo
        document.querySelector("#player1").classList.add("brillete")
        document.querySelector("#player2").classList.remove("brillete")

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
                    // Resalta las fichas ganadoras y luego muestra la imagen del ganador
                    resaltarFichasGanadoras(r, c, 'horizontal');
                    setTimeout(() => {
                        declararGanador(r, c);
                    }, 100); // Espera 1 segundo antes de mostrar la imagen del ganador
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
                    resaltarFichasGanadoras(r, c, 'vertical');
                    setTimeout(() => {
                        declararGanador(r, c);
                    }, 100); // Espera 1 segundo antes de mostrar la imagen del ganador
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
                    resaltarFichasGanadoras(r, c, 'diagonal');
                    setTimeout(() => {
                        declararGanador(r, c);
                    }, 100); // Espera 1 segundo antes de mostrar la imagen del ganador
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
                    resaltarFichasGanadoras(r, c, 'diagonal');
                    setTimeout(() => {
                        declararGanador(r, c);
                    }, 100); // Espera 1 segundo antes de mostrar la imagen del ganador
                    return;
                }
            }
        }
    }
}

function declararGanador(r, c) {
    let player1 = document.getElementById("contador1"); // puntaje amarillo
    let player2 = document.getElementById("contador2");  // puntaje verde
    let imagen1 = document.getElementById("imagen1");
    let imagen2 = document.getElementById("imagen2");
    let imagenEmpate = document.getElementById("imagen3")

    imagen1.style.display = "none";
    imagen2.style.display = "none";
    imagen3.style.display = "none";

    if (tablero[r][c] == jugadorRojo) { 
        player1.innerText = parseInt(player1.innerText) + 1; 
        imagen1.style.display = "block";
    } else if (tablero[r][c] == jugadorAmarillo){
        player2.innerText = parseInt(player2.innerText) + 1; 
        imagen2.style.display = "block";
    }else // COMO MIERDA PONGO LA FOTO DE EMPATE

    juegoTerminado = true; //terminooooooooo

        setTimeout(() => {
            document.getElementById("juegoTerminado").style.display= "block";
            document.getElementById("comfirmar").addEventListener("click", async () =>{
                imagen1.style.display = "none"; 
                imagen2.style.display = "none";
                reiniciarJuego(); 
                document.getElementById("juegoTerminado").style.display= "none";
            });
            document.getElementById("cancelar").addEventListener("click", async () =>{
                window.location.href = "../INICIO/menu1.html";
            });
        }, 100);
    }
    
    function resaltarFichasGanadoras(r, c) {
        // Aquí puedes resaltar las fichas ganadoras (por ejemplo, cambiando su color o añadiendo una clase CSS)
        // Esta es una implementación simplificada. Puedes adaptar esta función según tus necesidades.
        for (let i = 0; i < 4; i++) {
            let casilla = document.getElementById((r + i).toString() + "-" + (c + i).toString());
            if (casilla) {
                casilla.classList.add("ficha-ganadora"); // Añadir una clase CSS para resaltar
            }
        }
    }
    function reiniciarJuego() {
        document.getElementById("juegoTerminado").style.display= "none";

        // Limpiar el tablero (remover clases de color y fichas ganadoras)
        let tiles = document.getElementsByClassName("tile");
        for (let tile of tiles) {
            tile.classList.remove("pieza-roja", "pieza-amarilla", "ficha-ganadora"); // Quitar colores de las casillas
        }
    
        // Reiniciar el estado del juego
        // jugadorActual = jugadorRojo; // Restablecer el jugador actual
        juegoTerminado = false; // Permitir continuar el juego
    
        // Reiniciar la lógica del tablero y las filas actuales disponibles
        tablero = tablero.map(fila => fila.map(() => ' ')); // Limpiar los valores del tablero
        currFilas = [5, 5, 5, 5, 5, 5, 5]; // Restablecer filas disponibles en cada columna
    }

receive("boton", (btn)=>{
    if(btn==="amarillo"){
        colSelected-=1
        colSelected=(colSelected===-1) ? 0 : colSelected
    }else if(btn==="verde"){
        colSelected+=1
        colSelected=(colSelected===7) ? 6 : colSelected
    }else if(btn==="ok"){
        colocarPieza(String(colSelected))
    }
    document.querySelectorAll(`.tile`).forEach(e=>{
        e.classList.remove("colActive")
    })
    document.querySelectorAll(`.col${colSelected}`).forEach(e => {
        e.classList.add("colActive")
    });
})


    
