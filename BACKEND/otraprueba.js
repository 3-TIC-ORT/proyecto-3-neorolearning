
import fs from "fs";
function reiniciarJ2y3(juego, nivel) {

    if (palabrasData[juego] && palabrasData[juego][nivel]) {
        palabrasData[juego][nivel].usada = "no"; // Cambia "usada" en nivel a "no"
        // Cambia "usada" a "no" en cada grupo del nivel
        Object.values(palabrasData[juego][nivel]).forEach(grupo => {
            if (grupo && typeof grupo === "object" && grupo.usada !== undefined) {
                grupo.usada = "no";
            }
        });

        fs.writeFileSync('palabras.json', JSON.stringify(palabrasData, null, 2));
    } else {
        console.log("Error: el nivel o juego especificado no existe en el JSON.");
    }
}

function reiniciartodo(juego, nivel){
    let palabrasData = JSON.parse(fs.readFileSync('palabras.json', 'utf8') || '{}');
    
    if(juego==="juego_1"){
        let p2 = `nivel_${nivel}`;
        let palabrasNivel = palabrasData["juego_1"][p2];
        palabrasNivel.forEach(palabra => palabra.usada = "no");
        fs.writeFileSync('palabras.json', JSON.stringify(palabrasData, null, 2), 'utf8');
        console.log(`Nivel ${nivel} de ${juego} reiniciado.`);
    }
    else if(juego==="2" || juego==="3"){
        let p1 = `juego_${juego}`;
        let p2 = `nivel_${nivel.data}`;
        reiniciarJ2y3(p1, p2);
    }
}
reiniciartodo("juego_1", 1);
