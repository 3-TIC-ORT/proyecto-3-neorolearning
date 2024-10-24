let cajitas = document.getElementById('divCajitas');
let letras = document.getElementById('divLetras');
let correcto = document.getElementById("correcto")
let img = document.getElementById("img")
let word;
let wordArray = [];
let listaCajitas = [];
let shuffleWord = [];

const getWord = async () => {
    await postData("nivel", "", (data) => {
        word = data.palabra
        imagen = data.imagen
    }) 
    
    for (let index = 0; index < word.length; index++) {
        wordArray.push(word[index]);  
        shuffleWord.push(word[index]);    
    }
    
    shuffleWord = shuffleWord.sort((a, b) => 0.5 - Math.random())

};

fetchData('traerObjetos', (data) => {
    console.log(data)
})

const crearCajitas = async () => {
    await getWord();
    crearLetras();
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
    img.src = "https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/15665/production/_107435678_perro1.jpg.webp"
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