// Inicialización de variables
let tarjetasdestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerresultado = null;
let segundoresultado = null;
let movimientos = 0;
let aciertos = 0;
let tiemporegresivoId = null;

// Generación de números aleatorios
let emociones = ['alegria', 'tristeza', 'enojo', 'desagrado', 'confusion', 'miedo'];
let elementos = emociones.concat(emociones.map(e => `${e}.png`)); // Duplicar para tener pares, uno como palabra y otro como imagen

elementos = elementos.sort(() => Math.random() - 0.5);
console.log(elementos);

// Función principal
function destapar(id) {
    tarjetasdestapadas++;
    console.log(tarjetasdestapadas);

    if (tarjetasdestapadas == 1) {
        // Mostrar primer número
        tarjeta1 = document.getElementById(id);
        primerresultado = elementos[id];
        if (primerresultado.endsWith('.png')) {
            tarjeta1.innerHTML = `<img src="./images/${primerresultado}" alt="">`;
        } else {
            tarjeta1.innerHTML = primerresultado;
        }

        // Deshabilitar primer botón
        tarjeta1.disabled = true;
    } else if (tarjetasdestapadas == 2) {
        // Mostrar segundo número
        tarjeta2 = document.getElementById(id);
        segundoresultado = elementos[id];
        if (segundoresultado.endsWith('.png')) {
            tarjeta2.innerHTML = `<img src="./images/${segundoresultado}" alt="">`;
        } else {
            tarjeta2.innerHTML = segundoresultado;
        }

        // Deshabilitar segundo botón
        tarjeta2.disabled = true;

        // Incrementar movimientos
        movimientos++;

        if (primerresultado.replace('.png', '') == segundoresultado.replace('.png', '')) {
            // Encerar contador tarjetas destapadas
            tarjetasdestapadas = 0;

            // Aumentar aciertos
            aciertos++;

            if (aciertos == 6) {
                clearInterval(tiemporegresivoId);
                alert('¡Felicidades! Has encontrado todas las parejas.');
            }
        } else {
            // Mostrar momentáneamente valores y volver a tapar
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