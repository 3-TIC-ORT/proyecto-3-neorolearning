let tarjetasdestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerresultado = null;
let segundoresultado = null;
let movimientos = 0;
let aciertos = 0;
let tiemporegresivoId = null;
let messi = 1;
let elementos;

const modalTerminado = document.getElementById("juegoTerminado");
const botonReiniciar = document.getElementById("restart");
const botonInicio = document.getElementById("exit");
const imagen = document.getElementById("imagen1");

let emociones = {
    nivel_1: [
        "Azul", 
        "Amarillo", 
        "Naranja", 
        "Rojo", 
        "Violeta", 
        "Verde"
    ]
};

function armarCartas() {
    elementos = emociones[`nivel_${messi}`].concat(emociones[`nivel_${messi}`].map(e => `${e}.png`)); 
    elementos = elementos.sort(() => Math.random() - 0.5);
    console.log(elementos);
}
armarCartas();

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

// Evento para volver a jugar
botonReiniciar.addEventListener("click", () => {
    modalTerminado.style.display = 'none';
    imagen.style.display = 'none';
    tarjetasdestapadas = 0;
    tarjeta1 = null;
    tarjeta2 = null;
    primerresultado = null;
    segundoresultado = null;
    movimientos = 0;
    aciertos = 0;

    // Limpiar todas las cartas
    for (let i = 0; i < elementos.length; i++) {
        const card = document.getElementById(i);
        if (card) {
            card.innerHTML = '';
            card.disabled = false;
        }
    }

    armarCartas();
});

// Evento para volver al menú
botonInicio.addEventListener("click", () => {
    window.location.href = "../INICIO/menu1.html";
});

function destapar(id) {
    tarjetasdestapadas++;
    console.log(tarjetasdestapadas);

    if (tarjetasdestapadas === 1) {
        tarjeta1 = document.getElementById(id);
        primerresultado = elementos[id];
        if (primerresultado.endsWith('.png')) {
            tarjeta1.innerHTML = `<img src="./images/${primerresultado}" alt="">`;
        } else {
            tarjeta1.innerHTML = primerresultado;
        }
        tarjeta1.disabled = true;
    } else if (tarjetasdestapadas === 2) {
        tarjeta2 = document.getElementById(id);
        segundoresultado = elementos[id];
        if (segundoresultado.endsWith('.png')) {
            tarjeta2.innerHTML = `<img src="./images/${segundoresultado}" alt="">`;
        } else {
            tarjeta2.innerHTML = segundoresultado;
        }
        tarjeta2.disabled = true;

        movimientos++;

        if (primerresultado.replace('.png', '') === segundoresultado.replace('.png', '')) {
            tarjetasdestapadas = 0;
            aciertos++;
            
            if (aciertos === 6) {
                setTimeout(() => {
                    showWinnerImg();
                }, 1000);
            }
        } else {
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
