
let cajitas = document.getElementById('divCajitas');

let letras = document.getElementById('divLetras');
let correcto = document.getElementById("correcto")
let indednmkmasmkdsa = document.createElement("p")
let img = document.getElementById("img")
let word = "";
let wordArray = [];
let listaCajitas = [];
let shuffleWord = [];


function callBack1 (data) {
    let palabra = data.palabra;
    let imagen = data.imagen;
    document.getElementById("mostrarPalabra").innerText = palabra;
    document.getElementById("mostrarImagen").innerText = imagen;
}

const nivelData = {
    juego: 1,
    nivel: 1
}

postData("juego_nivel", { nivelData }, callBack1)

function callBack2 (data) {
    let nivel = data.nivel
    //document.addEventListener("click", (nivel: "1") ).innerText = nivel;
}

postData("nivel", {nivel: 1}, callBack2)





//  const getWord = () => {
    //postData("juego_nivel", { juego: 1 , nivel: 1}, (data) => {
        //a.innerHTML = data.msg;
      //  img.src = data.imagen
    //word =  data["salida"]["palabra"]
    //});
//};



const crearCajitas = async() => {
    getWord();
    console.log(word)
    for (let index = 0; index < word.length; index++) {
        wordArray.push(word[index]);  
        shuffleWord.push(word[index]);    
    }
    
    shuffleWord = shuffleWord.sort((a, b) => 0.5 - Math.random())
    crearLetras();
    console.log(word)
    wordArray.forEach((letter,i) => {
        listaCajitas.push({index:i,letter:letter});
        let div = document.createElement('h2');
        div.setAttribute('id', `cajita${i}`);
        div.classList.add('cajitas');
        cajitas.appendChild(div);
    });
    console.log(listaCajitas);
}




const crearLetras = () => {
    
    shuffleWord.forEach((letter) => {
        let h2 = document.createElement('h2');
        h2.addEventListener('click', ()=>clickLetter(letter));
        h2.classList.add('letras');
        h2.innerHTML = letter;
        letras.appendChild(h2);
    });
}

const clickLetter = (letter) => {
    console.log(letter);
        if(listaCajitas[0].letter === letter){
            let div = document.getElementById(`cajita${listaCajitas[0].index}`);
            div.innerHTML = letter;
            listaCajitas.shift();
            for (let index = 0; index < letras.children.length; index++) {
                if(letras.children.item(index).innerHTML === letter){
                    letras.children.item(index).remove();
                    break;
                }
                
            }
            correcto.innerText = "Letra correcta"
        }else{
            correcto.innerText = "Letra incorrecta"
        }
    };


crearCajitas();