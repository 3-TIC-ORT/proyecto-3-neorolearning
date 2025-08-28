import { onEvent, sendEvent, startServer } from "soquetic";
import fs from "fs";
import { SerialPort, ReadlineParser } from "serialport";
import chalk from "chalk";

let portPath = undefined;
let port = null;

const handleSerialPortError = (err) => {
  port = null;
  console.log(
    chalk.bgWhite(
      chalk.blackBright("BOTONERA: ") +
        chalk.redBright(
          "Ocurrió el siguiente error en la conexión serial -> " + err.message
        )
    )
  );
  console.log("Continuando sin la botonera...");
};

// Lista de puertos
const ports = await SerialPort.list();
// Busca dentro de los puertos arduino
for (let availablePort of ports) {
  if (availablePort.productId) {
    portPath = availablePort.path;
  }
}

if (portPath) {
  port = new SerialPort({
    path: portPath,
    baudRate: 9600,
    autoOpen: false,
  });
  try {
    port.open();
    console.log(
      chalk.bgWhite(
        chalk.blackBright("BOTONERA: ") +
          chalk.greenBright("botonera encontrada")
      )
    );
  } catch (error) {
    handleSerialPortError(error);
  }
} else {
  console.log(
    chalk.bgWhite(
      chalk.blackBright("BOTONERA: ") +
        chalk.redBright("No se encontró la botonera")
    )
  );
  port = null;
  console.log("Continuando sin la botonera...");
}

const parser = new ReadlineParser();
port && port.pipe(parser);

port && port.on("error", handleSerialPortError);

port &&
  port.on("open", () => {
    console.log("Puerto abierto");
  });

  let reiniciar = () =>{
        const filePath = "palabras.json";

    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));


// Leer el archivo

// Función recursiva para reiniciar todas las propiedades "usada"
function reiniciarUsadas(obj) {
  if (Array.isArray(obj)) {
    obj.forEach(reiniciarUsadas);
  } else if (typeof obj === "object" && obj !== null) {
    for (const key in obj) {
      if (key === "usada") {
        obj[key] = "no";
      } else {
        reiniciarUsadas(obj[key]);
      }
    }
  }
}
reiniciarUsadas(data)

// Aplicar la función al JSON completo

// Guardar los cambios
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");

  }

// Función para manejar el evento de recibir el juego
//Bloque listo
onEvent("juego_nivel", (data) => {
  console.log(`Juego recibido(backend): ${data.juego} ${data.nivel} `);
  data.juego === "2" ? reiniciar() : ""
  // llamo a la función jugar_juego
  const salida = jugarJuego(data);
  console.log(salida);
  juegoHardware(data.juego);
  return salida;
});

// Ruta del archivo JSON

parser.on("data", (data) => {
  console.log(data.trim());
});

//anda
port &&
  port.on("data", function (data) {
    let datos = data.toString().trim();
    let color = "";
    // rojo = 1, verde = 2, azul = 3, amarillo = 4
    if (datos === "1") {
      color = "rojo";
    } else if (datos === "2") {
      color = "azul";
    } else if (datos === "3") {
      color = "verde";
    } else if (datos === "4") {
      color = "amarillo";
    } else if (datos === "5") {
      color = "ok";
    }
    if (color !== "") {
      sendEvent("boton", color);
    }
    console.log(`Acción recibida del Arduino: ${datos}`);
  });

// bloque listo
function juegoHardware(juego) {
  //let juego = 1;
  //juego = parseInt(juego);
  console.log(`Juego recibido: ${juego}`);

  let salida = "Juegos";
  if (juego > 0 && juego < 4) salida = "Juegos";
  else if (juego === 4) salida = "Simon";
  else if (juego >= 5 && juego < 7) salida = "Pares";

  port && port.write(salida + "\n");

  return { mensaje: `Juego iniciado: ${salida}` };
}

//   let salida = ("Simon"); Color a prender para el Simon. El front debe mandar  R, G, B, Y
// anda
onEvent("secuenciasimon", (secuencia) => {
  console.log(secuencia);
  enviarSecuenciaArduino(
    typeof secuencia === "string" ? secuencia : String(secuencia)
  );
  //enviarSecuenciaArduino(String(secuencia));
});

function enviarSecuenciaArduino(secuencia) {
  console.log("Secuencia recibida para split", secuencia);
  secuencia = secuencia.trim();
  let secuenciaArduino = secuencia
    .split(", ")
    .map((color) => {
      if (color === "rojo") return "R";
      if (color === "verde") return "G";
      if (color === "azul") return "B";
      if (color === "amarillo") return "Y";
      console.warn(`Advertencia: Color no reconocido (${color})`);
      return ""; // Retorna vacío para colores no reconocidos
      //return ''; // Si no se reconoce el color, se retorna un string vacío.
    })
    .join(" ");
  console.log("manda secuencia arduino");
  console.log(secuenciaArduino);
  port && port.write(secuenciaArduino + "\n");
}

// Para los juegos 4 y 3 en línea el  front debe mandar  P1 o P2
//probar
onEvent("jugadorJugando", (jugador) => {
  // evento recibido
  recibirjugador(jugador);
});
function recibirjugador(jugador) {
  port && port.write(jugador + "\n");
  return { mensaje: `Jugador actual: ${jugador}` };
}

// probar
onEvent("terminoJuego", (resultado) => {
  port && port.write(`1` + "\n");
  port && port.write(resultado + "\n");
});
// Función para determinar cuál juego ejecutar
let palabrasData;

onEvent("getJson", (req)=>{
  if(req==="json"){
      return JSON.parse(fs.readFileSync("palabras.json", "utf8"))

  }
})

function jugarJuego(data) {
  palabrasData = JSON.parse(fs.readFileSync("palabras.json", "utf8"));
  let juego = Number(data.juego);
  let nivel = `nivel_${data.nivel}`;
  //nivel = `nivel_${numeroNivel}`;  // Crea "nivel_n"

  if (juego === 1) {
    return jugarJuego1(nivel); // Retorna la palabra y la imagen
  } else if (juego === 2) {
    return jugarJuego2(nivel);
  } else if (juego === 3) {
    return jugarJuego3(nivel);
  } else if (juego === 4) {
    return jugarSimonSays(nivel);
  }
}

function hayPalabras(juego, nivel) {
  let nivelJuego1 = palabrasData[juego][nivel];

  let cantidadUsadaNo = 0;
  try {
    cantidadUsadaNo = nivelJuego1.filter(
      (elemento) => elemento.usada === "no"
    ).length;
  } catch {
    cantidadUsadaNo = 0;
    for (let i = 1; i <= nivelJuego1.length; i++) {
      if (nivelJuego1["grupo_" + i].usada === "no") {
        cantidadUsadaNo += 1;
      }
    }
  }
  return cantidadUsadaNo > 0;
}

onEvent("hayPalabras", (data) => {
  const { juego, nivel } = data;
  let juegoStr = `juego_${juego}`;
  let nivelStr = `nivel_${nivel}`;
  return hayPalabras(juegoStr, nivelStr);
});

function jugarJuego1(nivel) {
  let nivelJuego1 = palabrasData["juego_1"][nivel];
  let largoNivel = nivelJuego1.length;

  // Contar cuántas palabras no se han usado
  let cantidadUsadaNo = nivelJuego1.filter(
    (elemento) => elemento.usada === "no"
  ).length;
  if (cantidadUsadaNo > 0) {
    let numeroAleatorio = Math.floor(Math.random() * largoNivel);

    // Buscar una palabra no usada
    while (nivelJuego1[numeroAleatorio].usada === "si") {
      numeroAleatorio = Math.floor(Math.random() * largoNivel);
    }

    let filaAleatoria = nivelJuego1[numeroAleatorio];
    // Marcar la palabra como usada
    filaAleatoria.usada = "si";
    fs.writeFileSync(
      "palabras.json",
      JSON.stringify(palabrasData, null, 2),
      "utf8"
    );

    return filaAleatoria; // Devuelve la palabra y la imagen
  } else {
    console.log("No hay palabras disponibles para este nivel.");
    console.log(`Nivel ${nivel} finalizado`);
    return { msg: `nivel finalizado: Juego_1 ${nivel}` };
  }
}

//Función para el Juego 2 (memotest)

function jugarJuego2(nivel) {
  let nivelJuego2 = palabrasData["juego_2"][nivel];
  
  let gruposNoUsados = Object.values(nivelJuego2).filter(
    (grupo) => grupo["usada"] === "no"
  );

  // Verificar si quedan grupos no usados
  if (gruposNoUsados.length === 0) {
    console.log("No hay palabras disponibles para este nivel.");
    console.log(`Nivel ${nivel} finalizado`);
    return { msg: `Nivel finalizado: Juego_3 ${nivel}` };
  }

  // Seleccionar un grupo al azar entre los no usados
  let grupoAleatorio = gruposNoUsados[Math.floor(Math.random() * gruposNoUsados.length)];
  grupoAleatorio.usada = "si";
  fs.writeFileSync(
    "palabras.json",
    JSON.stringify(palabrasData, null, 2),
    "utf8"
  );
  console.log("Holaaaa",grupoAleatorio);

  return { grupoAleatorio };
}

//Función para el Juego 3 (pregunta de opciones)
function jugarJuego3(nivel) {
  let nivelJuego3 = palabrasData["juego_3"][nivel];
  //let gruposNoUsados = Object.values(nivelJuego3).filter(grupo => grupo[grupo.length - 1]["usada"] === "no"); --> error
  let gruposNoUsados = Object.values(nivelJuego3).filter(
    (grupo) => grupo["usada"] === "no"
  );

  // Verificar si quedan grupos no usados
  if (gruposNoUsados.length === 0) {
    console.log("No hay palabras disponibles para este nivel.");
    console.log(`Nivel ${nivel} finalizado`);
    return { msg: `Nivel finalizado: Juego_3 ${nivel}` };
  }

  // Seleccionar un grupo al azar entre los no usados
  let grupoAleatorio =
    gruposNoUsados[Math.floor(Math.random() * gruposNoUsados.length)];

  //grupoAleatorio[grupoAleatorio.length - 1]["usada"] = "si"; --> error
  grupoAleatorio["usada"] = "si"; // Marcar el grupo como usado

  fs.writeFileSync(
    "palabras.json",
    JSON.stringify(palabrasData, null, 2),
    "utf8"
  );
  console.log(grupoAleatorio);

  return { grupoAleatorio };
}

function reiniciarJ2y3(juego, nivel) {
  if (palabrasData[juego] && palabrasData[juego][nivel]) {
    palabrasData[juego][nivel].usada = "no"; // Cambia "usada" en nivel a "no"
    // Cambia "usada" a "no" en cada grupo del nivel
    Object.values(palabrasData[juego][nivel]).forEach((grupo) => {
      if (grupo && typeof grupo === "object" && grupo.usada !== undefined) {
        grupo.usada = "no";
      }
    });

    fs.writeFileSync("palabras.json", JSON.stringify(palabrasData, null, 2));
  } else {
    console.log("Error: el nivel o juego especificado no existe en el JSON.");
  }
}

onEvent("reiniciar", (data) => {
  const { juego, nivel } = data;
  let palabrasData = JSON.parse(
    fs.readFileSync("palabras.json", "utf8") || "{}"
  );
  if (juego === "1") {
    let p2 = `nivel_${nivel}`;
    let palabrasNivel = palabrasData["juego_1"][p2];
    palabrasNivel.forEach((palabra) => (palabra.usada = "no"));
    fs.writeFileSync(
      "palabras.json",
      JSON.stringify(palabrasData, null, 2),
      "utf8"
    );
    console.log(`Nivel ${nivel} de ${juego} reiniciado.`);
    return true;
  } else if (juego === "2" || juego === "3") {
    let p1 = `juego_${juego}`;
    let p2 = `nivel_${nivel}`;
    reiniciarJ2y3(p1, p2);
    return true;
  }
});
startServer();
