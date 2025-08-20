let patron = []
let patronIngresado, score = 0, delay = 900
let record = 0
let azul = document.getElementById("azul")
let verde = document.getElementById("verde")
let amarillo = document.getElementById("amarillo")
let rojo = document.getElementById("rojo")
const body = document.getElementById("body")
const simonBody = document.getElementById("simon")
const startButton = document.getElementById("start")
const recordinging = document.getElementById("recordinging")
const scoreHTML = document.getElementById("score")
const perdisteMsg = document.getElementById("perdisteMsg")
const ganasteMsg = document.getElementById("ganasteMsg") 
let randomPatron;

function reiniciarJuego() {
    patron = [];
    patronIngresado = [];
    score = 0;
    delay = 900;
    perdisteMsg.style.display = "none";
    ganasteMsg.style.display = "none"; 
    document.getElementById("juegoTerminado").style.display = "none";
    startButton.style.display = "flex";
}

function agregarColorPatron() {
    let seguir = true;
    while (seguir) {
        nRandom = Math.ceil(Math.random() * 4)
        if (patron.length == 6) {
            seguir = false;
            return 0;
        }
        patron.push(nRandom)
    }
}

async function singColor(color) {
    color.style.filter = "brightness(150%)"
    await setTimeout(() => {
        color.style.filter = "brightness(50%)"
    }, delay)
}

async function multiColor() {
    for (let i = 0; i < patron.length; i++) {
        if (perdisteMsg.style.display === "block") {
            return
        } else {
            await setTimeout(() => {
                switch (patron[i]) {
                    case 1:
                        singColor(azul)
                        break;
                    case 2:
                        singColor(verde)
                        break;
                    case 3:
                        singColor(amarillo)
                        break;
                    case 4:
                        singColor(rojo)
                        break;
                }
            }, i * (delay + delay * .6))
        }
    }
}

azul.addEventListener("click", () => {
    patronIngresado.push(1)
})
verde.addEventListener("click", () => {
    patronIngresado.push(2)
})
amarillo.addEventListener("click", () => {
    patronIngresado.push(3)
})
rojo.addEventListener("click", () => {
    patronIngresado.push(4)
})

async function comprobarArrays(arr, vuelta) {
    return new Promise(resolve => {
        const checkLength = async () => {
            while (arr.length !== vuelta + 1) {
                await new Promise(resolve => setTimeout(resolve, 10));
            }
            resolve();
        };
        checkLength();
    });
}

async function comprobarPatron() {
    startButton.style.display = "none";
    patronIngresado = [];
    for (let j = 0; j < patron.length; j++) {
        await comprobarArrays(patronIngresado, j);
        if (patron[j] != patronIngresado[j]) {
            perdisteMsg.style.display = "block";

            document.getElementById("juegoTerminado").style.display = "flex";
            document.querySelectorAll(".boton").forEach(e => {
                e.setAttribute("state", "off");
            });

            document.getElementById("comfirmar").addEventListener("click", async () => {
                reiniciarJuego();
                document.getElementById("juegoTerminado").style.display = "none";
            });

            document.getElementById("cancelar").addEventListener("click", async () => {
                window.location.href = "file:///C:/Users/ADM/Documents/GitHub/proyecto-3-neorolearning/INICIO/menu1.html";
            });

            return 0;
        }
    }

    ganasteMsg.style.display = "block"; 
    document.getElementById("juegoTerminado").style.display = "block";

    document.getElementById("comfirmar").addEventListener("click", async () => {
        reiniciarJuego();
        document.getElementById("juegoTerminado").style.display = "none";
    });

    document.getElementById("cancelar").addEventListener("click", async () => {
        window.location.href = "file:///C:/Users/ADM/Documents/GitHub/proyecto-3-neorolearning/INICIO/menu1.html";
    });

    document.querySelectorAll(".boton").forEach(e => {
        e.setAttribute("state", "off");
    });

    setTimeout(() => {
        pasarNivel();
    }, 800);
}

startButton.addEventListener("click", empezar)

async function empezar() {
    document.querySelectorAll(".boton").forEach(e => {
        e.setAttribute("state", "on")
    })

    patron = []
    for (let i = 0; i <= 4; i++) {
        randomPatron = Math.ceil(Math.random() * 4)
        if (randomPatron == 0) {
            randomPatron = 1
        }
        patron.push(randomPatron);
    }
    score = -1;
    perdisteMsg.style.display = "none";
    ganasteMsg.style.display = "none";
    agregarColorPatron()
    await multiColor()
    comprobarPatron()
}

async function pasarNivel() {
    if (agregarColorPatron() == 0) {
        return;
    }
    await multiColor()
    comprobarPatron()
}