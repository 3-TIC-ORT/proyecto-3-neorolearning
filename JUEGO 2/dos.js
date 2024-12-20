let tarjetasdestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerresultado = null;
let segundoresultado = null;
let movimientos = 0;
let aciertos = 0;
let tiemporegresivoId = null;
let messi = 1
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
    "Verde", ]
}



function armarCartas() {
elementos = emociones[`nivel_${messi}`].concat(emociones[`nivel_${messi}`].map(e => `${e}.png`)); 
elementos = elementos.sort(() => Math.random() - 0.5);
console.log(elementos);
}
armarCartas()


function showWinnerImg(imagenGanar, boton1, boton2) {

    imagenGanar.style.display = 'block';
    imagenGanar.style.position = 'absolute';
    imagenGanar.style.top = '0'
    imagenGanar.style.height = '100vh';
    imagenGanar.style.width = '100vw';


    boton1.style.display = 'block';
    boton1.style.zindex = '999'

    boton2.style.display = 'block';
    boton2.style.zindex = '999'

}


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
            
            if (aciertos === 6) {
                setTimeout(()=>{

                    showWinnerImg(imagen, botonInicio, botonReiniciar)

                    // messi ++
                    // for (let index = 0; index < 12; index++) {
                    //     let element = document.getElementById(index)
                    //     element.disabled = false
                    //     element.innerHTML = ""
                    //     tarjetasdestapadas = 0                    
                    // }
                    
                    
                    // //window.location.href="/INICIO/menu1.html" // enlace al que se va despues de un
                    // armarCartas()
                    // clearInterval(tiemporegresivoId);
                },1000)
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