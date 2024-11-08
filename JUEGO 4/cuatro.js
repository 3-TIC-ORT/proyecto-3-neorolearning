let patron = []
let patronIngresado, score = 0, delay = 900
//todas las variables con el mismo valor
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
let randomPatron;

function reiniciarJuego() {
    patron = [];
    patronIngresado = [];
    score = 0;
    delay = 900;
    perdisteMsg.style.display = "none";
    document.getElementById("juegoTerminado").style.display = "none";
    startButton.style.display = "flex";
}
function agregarColorPatron(){
        let seguir = true; 
        while (seguir) {
            nRandom = Math.ceil(Math.random()*4)
            if (patron.length == 6) {
                seguir = false;  
                return 0; 
            }
            patron.push(nRandom)
        }
        
    //score++;
}
async function singColor(color){
    
    color.style.filter="brightness(150%)"
    // iluminar el colorcito
    await setTimeout(()=>{
        color.style.filter="brightness(50%)"
    },delay)
    // par volverlo a poner como antes

} //document.querySelectorAll(".boton").forEach(e=>{
    //e.setAttribute("state", "on")
//}) // AYUDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

async function multiColor(){
    
    for(let i=0;i<patron.length;i++){
        await setTimeout(()=>{
            switch(patron[i]){
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
            // recorre el patron y muestra el color que hay que apretar
        }, i*(delay+delay*.6))
    }

}
azul.addEventListener("click", ()=>{
    patronIngresado.push(1)
    // vamos a ponerle el n1 a la lista del patron ingresado
})
verde.addEventListener("click", ()=>{
    patronIngresado.push(2)
        // vamos a ponerle el n2 a la lista del patron ingresado
})
amarillo.addEventListener("click", ()=>{
    patronIngresado.push(3)
        // vamos a ponerle el n3 a la lista del patron ingresado
})
rojo.addEventListener("click", ()=>{
    patronIngresado.push(4)
        // vamos a ponerle el n4 a la lista del patron ingresado
})
async function comprobarArrays(arr, vuelta){
    return new Promise(resolve => {
        const checkLength = async () => {
        while (arr.length !== vuelta+1) {
            await new Promise(resolve => setTimeout(resolve, 10));
        }
        resolve();
        };
        checkLength();
});
//  prometo que ese evento va a terminar de cierta forma y puedo evaluar si se cumplió o no 
}

async function comprobarPatron(){
    // ver si el nene lo hce bien
    startButton.style.display="none"
    // chau boton start
    patronIngresado = []
    for(let j = 0;j<patron.length;j++){
        await comprobarArrays(patronIngresado, j)
        // comprobar si cada elemento coincide
        if(patron[j]!=patronIngresado[j]){
        //alert("mal boton" + j)  ------- VAMOSSSSSSSSSSSSSSSSSSSSSSSSS
            window.location.reload();
            startButton.style.display="flex"
            perdisteMsg.style.display="block"
            document.querySelectorAll(".boton").forEach(e=>{
                e.setAttribute("state", "off")
            })
            return 0
            // si sos medio loser y perdiste
        }
        //alert("bien boton" + j) ------- VAMOSSSSSSSSSSSSSSSSSSSSSSSSS
    }
    setTimeout(() => {
        document.getElementById("juegoTerminado").style.display= "block";
        document.getElementById("comfirmar").addEventListener("click", async () =>{
            reiniciarJuego(); 
            document.getElementById("juegoTerminado").style.display= "none";
        });
        document.getElementById("cancelar").addEventListener("click", async () =>{
            window.location.href = "file:///C:/Users/49318078/Documents/GitHub/proyecto-3-neorolearning/INICIO/menu1.html";
        });
    }, 100);
    
    document.querySelectorAll(".boton").forEach(e=>{
        e.setAttribute("state", "off")
    })
    
    setTimeout(()=>{
        pasarNivel()
   },800) // tiempo
    //que muestre el siguiente color
}

startButton.addEventListener("click", empezar)
async function empezar(){

    document.querySelectorAll(".boton").forEach(e=>{
        e.setAttribute("state", "on")
    })

    
    patron = []
    for(let i=0;i<=4;i++){
        randomPatron=Math.ceil(Math.random()*4)
        if(randomPatron==0){
            randomPatron=1
        }
        patron.push(randomPatron);
    }
    score = -1 // arranca y le suma uno pero yo quiero que este en cero
    perdisteMsg.style.display="none"
    // no mostrarlo siempre
    agregarColorPatron()
    await multiColor()
    comprobarPatron()
}

async function pasarNivel(){
    if (agregarColorPatron() == 0) {
        
        return; 
    }
    await multiColor()
    
    comprobarPatron()

}


// siempre va a hacer estas 3 funciones 