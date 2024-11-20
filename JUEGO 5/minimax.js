let lista=[3, 5, 2, 9];
let jugador = "min";
function minimax(lista, jugador){
    if (jugador==="max"){
    let max = -Infinity;
    for (let i = 0; i < lista.length; i++) {
      if (lista[i] > max) {
        max = lista[i]; // Tomamos el número más grande
      }
    }
    return max;
    } else {
        let min= Infinity;
        for (let i = 0; i < lista.length; i++) {
            if (lista[i] < min) {
              min = lista[i];
            }
        }
        return min;
    }
}
let computadora = minimax(lista, "max");  // La computadora siempre busca el número más grande
let resultadoJugador = minimax(lista, jugador);  // El jugador siempre minimiza

// Mostrar resultados al jugador
alert("Tu turno (minimizador): El número seleccionado es " + resultadoJugador + ".\n" +
      "Turno de la computadora (maximizador): El número seleccionado es " + computadora + ".");