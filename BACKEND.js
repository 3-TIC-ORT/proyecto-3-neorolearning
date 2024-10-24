import { startServer, onEvent } from 'soquetic'
import fs from 'fs'

onEvent('traerObjetos', conseguirObjetos)

function conseguirObjetos() {
    let objetos = JSON.parse(fs.readFileSync('palabrasdisponibles.json', 'utf-8'))

    return objetos;
}

startServer()