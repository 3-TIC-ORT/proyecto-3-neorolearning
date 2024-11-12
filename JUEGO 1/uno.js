let cajitas = document.getElementById("divCajitas");
let letras = document.getElementById("divLetras");
let correcto = document.getElementById("correcto");
let img = document.getElementById("img");
let palabra = "";
let wordArray = [];
let listaCajitas = [];
let shuffleWord = [];

connect2Server();

const crearCajitas = async (palabra) => {
  wordArray = [...palabra];  // Almacena la palabra en el array
  shuffleWord = [...wordArray].sort(() => 0.5 - Math.random());  // Mezcla las letras solo una vez

  // Crea las cajitas solo una vez por cada letra
  wordArray.forEach((letter, i) => {
    listaCajitas.push({ index: i, letter: letter });
    let div = document.createElement("h2");
    div.setAttribute("id", `cajita${i}`);
    div.classList.add("cajitas");
    cajitas.appendChild(div);
  });

  // Llama a crearLetras solo después de crear las cajitas
  crearLetras();
  console.log("Palabra:", palabra);
  console.log("Lista de cajitas:", listaCajitas);
}

const parametro = new URLSearchParams(window.location.search);
const niveles = parametro.get('nivel');

function callBack1(data) {
  let palabra = data.palabra;
  let imagen = data.imagen;
  crearCajitas(palabra);
  document.getElementById("mostrarPalabra")
  document.getElementById("mostrarImagen").src = imagen;
}

postData("juego_nivel", {
  juego: 1,
  nivel: niveles,
}, callBack1);

/*function reJuego() {
    document.getElementById("juegoTerminado").style.display= "none";
    document.getElementById("juegoTerminado").style.display= "block";
    document.getElementById("comfirmar").addEventListener("click", async () =>{
      reJuego(); 
      document.getElementById("juegoTerminado").style.display= "none";
    });
    document.getElementById("cancelar").addEventListener("click", async () =>{
      window.location.href = "file:///C:/Users/49318078/Documents/GitHub/proyecto-3-neorolearning/INICIO/menu1.html";
    });
  }

fetchData("reiniciar", reJuego) */


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
    }
    correcto.innerText = "Letra correcta";
  } else {
    correcto.innerText = "Letra incorrecta";
  }
};
