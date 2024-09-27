const x="X";
const o="O";
let estadoJuego="P1";
const cuadrados=document.querySelectorAll(".cuadrado");
cuadrados.forEach(cuadrado, i)=> {
    cuadrado.addEventListener("click",()=>{
    cuadrado.innerText= estadoJuego==="P1" ? x:o;
    estadoJuego=estadoJuego==="P1" ?"P2":"P1";
    })
} )
function revisarSiHayGanador(){
    const tablero=Array.from(cuadrados).map(cuadrado=>cuadrado.Textcontent)
    console.log(tablero)
    //Revisar horizontales
    for (let i=0;i<array.length){
        const element= array[i];
        if tablero[i]
    }
    //revisar verticales
    //revisar diagonales
}