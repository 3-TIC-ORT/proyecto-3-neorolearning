let cajitas = document.getElementById("divCajitas");
let letras = document.getElementById("divLetras");
let correcto = document.getElementById("correcto");
let indednmkmasmkdsa = document.createElement("p");
let img = document.getElementById("img");
let palabra = "";
let wordArray = [];
let listaCajitas = [];
let shuffleWord = [];

connect2Server();

const crearCajitas = async (palabra) => {
  for (let index = 0; index < palabra.length; index++) {
      wordArray.push(palabra[index]);
      sh
      shuffleWord = shuffleWord.sort((a, b) => 0.5 - Math.random());
      crearLetras();
      console.log(palabra);
      wordArray.forEach((letter, i) => {
        listaCajitas.push({ index: i, letter: letter });
        let div = document.createElement("h2");
        div.setAttribute("id", `cajita${i}`);
        div.classList.add("cajitas");
        cajitas.appendChild(div);
      });
      console.log(listaCajitas);shuffleWord.push(palabra[index]);
  }
}

const parametro = new URLSearchParams(window.location.search);
const niveles = parametro.get('nivel');

function callBack1(data) {
  console.log("hola", data)
  let palabra = data.palabra;
  let imagen = data.imagen;
  // crearCajitas(palabra)
  document.getElementById("mostrarPalabra") 
  document.getElementById("mostrarImagen")
}
postData("juego_nivel", {
  juego: 1,
  nivel: niveles,
}, () => console.log("hola"))

function reJuego() {
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

fetchData("reiniciar", reJuego)




//  const getWord = () => {
//postData("juego_nivel", { juego: 1 , nivel: 1}, (data) => {
//a.innerHTML = data.msg;
//  img.src = data.imagen
//word =  data["salida"]["palabra"]
//});
//};

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
