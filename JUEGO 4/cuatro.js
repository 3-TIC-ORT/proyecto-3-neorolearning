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
connect2Server();



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
        patron.push(nRandom)
        if (patron.length === 6) {
            seguir = false;
            return 0;
        }
    }
    for(let i=0;i<=6;i++){
        nRandom = Math.ceil(Math.random() * 4)
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

receive("boton", (btn)=>{
    
    if(btn==="verde"){
        patronIngresado.push(2)
        document.querySelector(".verde").classList.add("botonClick")
        setTimeout(()=>{
            document.querySelector(".verde").classList.remove("botonClick")
        },200)
    }else if(btn==="amarillo"){
        patronIngresado.push(3)
        document.querySelector(".amarillo").classList.add("botonClick")
        setTimeout(()=>{
            document.querySelector(".amarillo").classList.remove("botonClick")
        },200)
    }else if(btn==="rojo"){
        patronIngresado.push(1)
        document.querySelector(".azul").classList.add("botonClick")
        setTimeout(()=>{
            document.querySelector(".azul").classList.remove("botonClick")
        },200)
    }else if(btn==="azul"){
        patronIngresado.push(4)
        document.querySelector(".rojo").classList.add("botonClick")
        setTimeout(()=>{
            document.querySelector(".rojo").classList.remove("botonClick")
        },200)
    }else if(btn==="ok"){
    }
})


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
                window.location.href = "../INICIO/menu1.html";
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
        window.location.href = "../INICIO/menu1.html";
    });

    document.querySelectorAll(".boton").forEach(e => {
        e.setAttribute("state", "off");
    });

    setTimeout(() => {
        pasarNivel();
    }, 800);
}

startButton.addEventListener("click", empezar)

function numeroAColor(num) {
  switch (num) {
    case 1: return "rojo";
    case 2: return "verde";
    case 3: return "amarillo";
    case 4: return "azul";
    default: return "desconocido";
  }
}



function enviarSecuenciaArduino(){
    const secuencia = patron.map(numeroAColor); // copia transformada
    console.log(secuencia.join(", "));
    postData("secuenciasimon", secuencia.join(", "), ()=>{
        console.log("enviado al back")
    });
}


async function empezar() {
    document.querySelectorAll(".boton").forEach(e => {
        e.setAttribute("state", "on")
    })

    patron = []
    for (let i = 0; i <= 5; i++) {
        randomPatron = Math.ceil(Math.random() * 4)
        if (randomPatron == 0) {
            randomPatron = 1
        }
        patron.push(randomPatron);
    }
    enviarSecuenciaArduino()
    score = -1;
    perdisteMsg.style.display = "none";
    ganasteMsg.style.display = "none";
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