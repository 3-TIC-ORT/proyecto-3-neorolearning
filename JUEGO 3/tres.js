let imagen = document.getElementById("mostrarImagen");
let data = {
    palabras: ["casa", "perro", "gato", "pato"],
    palabraCorrecta: "casa",
    imagen: "casa.png"
}
let todasPalabras = document.getElementById("todasPalabras");
let text = document.getElementById("text");


imagen.src = data.imagen;

for (let i = 0; i < data.palabras.length; i++) {
    let palabra = document.createElement("h2");
    palabra.innerHTML = data.palabras[i];
    palabra.classList.add("palabra");
    palabra.addEventListener("click", () => clickLetter(data.palabras[i]));
    todasPalabras.appendChild(palabra);
}

let clickLetter = (palabra) => {
    if (palabra === data.palabraCorrecta) {
        text.innerText = "Palabra correcta";
    } else {
        text.innerText = "Palabra incorrecta";
    }
}





