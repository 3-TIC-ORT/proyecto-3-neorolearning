let tarjetasdestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerresultado = null;
let segundoresultado = null;
let movimientos = 0;
let aciertos = 0;
let tiemporegresivoId = null;
let elementos;

connect2Server();

function callBack(data){
    let palabra = data.palabra; 
    let imagen = data.imagen;   
}

function armarCartas() {
    let parametro = new URLSearchParams(document.location.search);
    let niveles = parametro.get("nivel");
    console.log(niveles)
    postData("juego_nivel", {juego: 2, nivel: niveles})
    elementos = elementos.sort(() => Math.random() - 0.5); 
    console.log(elementos);
}

function displayInvalidCard(element) {
    element.classList.add('invalid')
    element.classList.remove('valid')
    setTimeout(() => {
        element.classList.remove('invalid')
    }, 500)
}   

function displayValidCard(element) {
    element.classList.add('valid')
}

armarCartas();

function destapar(id) {
    tarjetasdestapadas++;
    console.log(tarjetasdestapadas);

    if (tarjetasdestapadas == 1) {
        tarjeta1 = document.getElementById(id);
        primerresultado = elementos[id];
        displayValidCard(tarjeta1)
        if (primerresultado.endsWith('.png')) {
            tarjeta1.innerHTML = `<img src="./images/${primerresultado}" alt="">`;
        } else {
            tarjeta1.innerHTML = `<p class='textoInvertido'>${primerresultado}</p>`;
        }
        tarjeta1.disabled = true;
    } else if (tarjetasdestapadas == 2) {
        tarjeta2 = document.getElementById(id);
        segundoresultado = elementos[id];
        displayValidCard(tarjeta2)
        if (segundoresultado.endsWith('.png')) {
            tarjeta2.innerHTML = `<img src="./images/${segundoresultado}" alt="">`;
        } else {
            tarjeta2.innerHTML = `<p class='textoInvertido'>${segundoresultado}</p>`;
        }
        tarjeta2.disabled = true;

        movimientos++;

        if (primerresultado.replace('.png', '') == segundoresultado.replace('.png', '')) {
            tarjetasdestapadas = 0;
            aciertos++;

            // Verificar si el jugador ha ganado
            setTimeout(()=>{
                if (aciertos === 6) { 
                    if(niveles==2){
                        alert("felicidades")
                        window.location.replace("http://127.0.0.1:5500/proyecto-3-neorolearning/INICIO/menu1.html   ")
                    }
                    clearInterval(tiemporegresivoId);
                    if(confirm("quieres pasar al siguiente nivel?")){
                        document.querySelectorAll(".card").forEach(e=>{
                            e.innerHTML=""
                            e.disabled = false;
                            tarjetasdestapadas=0
                            tarjeta1 = null;
                            tarjeta2 = null;
                            primerresultado = null;
                            segundoresultado = null;
                            movimientos = 0;
                            aciertos = 0;
                            tiemporegresivoId = null;
                            elementos;
                        })
                        niveles++
                        armarCartas()
                    }else{
                        window.location.replace("/INICIO/menu1.html")
                    }
                    
                }
            }, 100)
        } else {
            // Si no coinciden, dar la vuelta después de un corto tiempo
            setTimeout(() => {
                displayInvalidCard(tarjeta1)
                displayInvalidCard(tarjeta2)
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasdestapadas = 0;
            }, 800);

            setTimeout(() => {
                displayInvalidCard(tarjeta1)
                displayInvalidCard(tarjeta2)
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasdestapadas = 0;
            }, 800);
        }
    }
}


