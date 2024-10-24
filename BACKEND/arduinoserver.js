import { onEvent, startServer } from "soquetic";
import { SerialPort } from "serialport";

const port = new SerialPort({
  path: "COM3", // Reemplaza con el puerto correcto
  baudRate: 9600,
});

let secuencia = []; // Almacena la secuencia de colores
const colores = ["rojo", "verde", "azul", "amarillo"]; // Colores disponibles

// Al iniciar el juego
onEvent("iniciarSimonSays", () => {
  secuencia = []; // Reinicia la secuencia
  agregarColor(); // Agrega un color al inicio
  return { msg: "Juego Simon Says iniciado", secuencia }; // Devuelve el mensaje y la secuencia inicial
});

// Función para agregar color a la secuencia
function agregarColor() {
  const nuevoColor = colores[Math.floor(Math.random() * colores.length)];
  secuencia.push(nuevoColor);
  console.log("Secuencia actualizada:", secuencia); // Para verificar en consola
}

// Al seleccionar un color
onEvent("colorSeleccionado", (data) => {
  const { color } = data;
  const resultado = verificarSeleccion(color); // Verifica la selección
  return resultado; // Devuelve el resultado al frontend
});

// Verifica si la selección es correcta
function verificarSeleccion(colorSeleccionado) {
  if (secuencia.length === 0) {
    return { error: "La secuencia está vacía." };
  }
  
  const esCorrecto = colorSeleccionado === secuencia[0]; // Compara con el primer color de la secuencia

  if (esCorrecto) {
    port.write("correcto\n"); // Enviar mensaje a la botonera
    secuencia.shift(); // Elimina el color correcto de la secuencia
    agregarColor(); // Agrega otro color a la secuencia
    return { msg: "Correcto", secuencia }; // Devuelve mensaje y nueva secuencia
  } else {
    port.write("error\n"); // Enviar mensaje de error
    return { error: "Incorrecto. Intenta de nuevo." }; // Devuelve mensaje de error
  }
}

// Conexión con el hardware
port.on("data", function (data) {
  let status = data.toString().trim();
  console.log("Estado del botón:", status); // Para visualizar el estado
});

// Iniciar el servidor

