let tarjetasdestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerresultado = null;
let segundoresultado = null;
let movimientos = 0;
let aciertos = 0;
let tiemporegresivoId = null;


let emociones = ['alegria', 'tristeza', 'enojo', 'desagrado', 'confusion', 'miedo', 'sorpresa', 'vergüenza'];
let elementos = emociones.concat(emociones.map(e => `${e}.png`)); 

elementos = elementos.sort(() => Math.random() - 0.5);
console.log(elementos);


function destapar(id) {
    tarjetasdestapadas++;
    console.log(tarjetasdestapadas);

    if (tarjetasdestapadas == 1) {

        tarjeta1 = document.getElementById(id);
        primerresultado = elementos[id];
        if (primerresultado.endsWith('.png')) {
            tarjeta1.innerHTML = `<img src="./images/${primerresultado}" alt="">`;
        } else {
            tarjeta1.innerHTML = primerresultado;
        }


        tarjeta1.disabled = true;
    } else if (tarjetasdestapadas == 2) {
        tarjeta2 = document.getElementById(id);
        segundoresultado = elementos[id];
        if (segundoresultado.endsWith('.png')) {
            tarjeta2.innerHTML = `<img src="./images/${segundoresultado}" alt="">`;
        } else {
            tarjeta2.innerHTML = segundoresultado;
        }

        tarjeta2.disabled = true;

        movimientos++;

        if (primerresultado.replace('.png', '') == segundoresultado.replace('.png', '')) {

            tarjetasdestapadas = 0;

            aciertos++;

            if (aciertos == 6) {
                clearInterval(tiemporegresivoId);

            }
        } else {

            setTimeout(() => {
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasdestapadas = 0;
            }, 800);
        }
    }
}