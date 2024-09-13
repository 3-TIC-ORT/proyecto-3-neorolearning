let palabraArray = [];
let palabra;
let contador = 0;
let divCuadrados = document.getElementById("cuadrados")
let div = document.getElementById("divCajitas")
function getPalabra(){
    palabra = "brigitte";
    for (let i = 0; i < palabra.length; i++) {
        palabraArray.push(palabra[i]);
        crearCuadrado()
    }
    magia()
}

function magia (){
    let shuffle = palabraArray.sort((a, b) => 0.5 - Math.random());
    console.log(shuffle)
    for (let index = 0; index < shuffle.length; index++) {
        crearCajitas(shuffle[index])        
    }
}
function crearCajitas(data){
    let cajita = document.createElement("h2");
    cajita.addEventListener("click",()=>{
        verificar(data)
    })
    cajita.setAttribute("class","cajita");
    cajita.innerText = data;
    div.appendChild(cajita)
}

function crearCuadrado(){
    let cuadrado = document.createElement("h2");
    cuadrado.setAttribute("class","cuadrado");
    divCuadrados.appendChild(cuadrado)
}

function verificar (data){
    if (data === palabraArray[0]) {
    
    }
}
getPalabra()

