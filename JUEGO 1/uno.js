let cajitas = document.getElementById("divCajitas");
let letras = document.getElementById("divLetras");
let correcto = document.getElementById("correcto");
let img = document.getElementById("img");
let next = document.getElementById("next")
let palabra = "";
let wordArray = [];
let listaCajitas = [];
let shuffleWord = [];
let arduino;

connect2Server();

// CUANDO LE DES AL BOTON DE EMPEZAR QUE CHEQUE SI HHAY PALABRAS Y META UN REINICIO

const crearCajitas = async (palabra) => {
  


  for (let index = 0; index < palabra.length; index++) {
    wordArray.push(palabra[index])    
   } // Almacena la palabra en el array

  // Crea las cajitas solo una vez por cada letra
  console.log(wordArray)
  wordArray.forEach((letter, i) => {
    listaCajitas.push({ index: i, letter: letter });
    console.log(listaCajitas)
    let div = document.createElement("h2");
    div.setAttribute("id", `cajita${i}`);
    div.classList.add("cajitas");
    cajitas.appendChild(div);
  });
   shuffleWord = wordArray.sort(() => 0.5 - Math.random());  // Mezcla las letras solo una vez


  // Llama a crearLetras solo después de crear las cajitas
  crearLetras();
  document.getElementById("juegoTerminado").style.display= "none";

  console.log("Palabra:", palabra);
  console.log("Lista de cajitas:", listaCajitas);
}

const parametro = new URLSearchParams(window.location.search);
const niveles = parametro.get('nivel');

function callBack1(data) {
  let palabra = data.palabra;
  let imagen = data.imagen;
  console.log(data)

  if (palabra === undefined){
    document.getElementById("next").style.visibility = "hidden";

  }

  crearCajitas(palabra);
  document.getElementById("mostrarImagen").src = imagen;

}

next.addEventListener("click",()=>{
  // ACA TENGO QUE PONER FUNCION DE SI ESTA BIEN O NO MI PALABRITA
  postData("juego_nivel", {
  juego: 1,
  nivel: niveles,
},callBack1)})

postData("juego_nivel", {
  juego: 1,
  nivel: niveles,
},(data)=> callBack1(data))
function reJuego() {
    document.getElementById("juegoTerminado").style.display= "block";
    document.getElementById("comfirmar").addEventListener("click", async () =>{
      postData("reiniciar", {
        juego: "1",
        nivel: niveles,
      }, (data)=> {if (data) {
        location.reload()
      }});
      document.getElementById("juegoTerminado").style.display= "none";
    });
    document.getElementById("cancelar").addEventListener("click", async () =>{
      window.location.href = "file:///C:/Users/49318078/Documents/GitHub/proyecto-3-neorolearning/INICIO/menu1.html";
    });
  }

 

const crearLetras = () => {
  shuffleWord.forEach((letter) => {
    let h2 = document.createElement("h2");
    h2.addEventListener("click", () => clickLetter(letter));
    h2.classList.add("letras");
    h2.innerHTML = letter;
    letras.appendChild(h2);
  });
};

const clickLetter = (letter) => {
  console.log(letter);
  if (listaCajitas[0].letter === letter) {
    let div = document.getElementById(`cajita${listaCajitas[0].index}`);
    div.innerHTML = letter;
    listaCajitas.shift();
    for (let index = 0; index < letras.children.length; index++) {
      if (letras.children.item(index).innerHTML === letter) {
        letras.children.item(index).remove();
        break;
      }
      console.log(letras.children.length)
    }
    if (letras.children.length === 2  ) {
      reJuego()
      wordArray = []
      listaCajitas = []
      shuffleWord = []
      cajitas.innerHTML = ""
    }
    
    correcto.innerText = "Letra correcta";
  } else {
    correcto.innerText = "Letra incorrecta";
  }
};
