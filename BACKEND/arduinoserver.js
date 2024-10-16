import { onEvent, sendEvent, startServer } from "soquetic";
import { SerialPort } from "serialport";

const port = new SerialPort({
  //Completar con el puerto correcto
  path: "COM3",
  baudRate: 9600,
});
onEvent("colorSeleccionado", (color) => {
    onEvent("colorSeleccionado", (color) => {
        let hexColor;
      
        switch (color) {
          case 'rosa':
            hexColor = "#FFC0CB"; // Rosa en hexadecimal
            break;
          case 'violeta':
            hexColor = "#9400D3"; // Violeta en hexadecimal
            break;
          case 'azul':
            hexColor = "#0000FF"; // Azul en hexadecimal
            break;
          case 'celeste':
            hexColor = "#ADD8E6"; // Celeste en hexadecimal
            break;
          case 'verde':
            hexColor = "#00FF00"; // Verde en hexadecimal
            break;
          case 'amarillo':
            hexColor = "#FFFF00"; // Amarillo en hexadecimal
            break;
          default:
            hexColor = "#000000"; // Negro por defecto si no coincide ningún color
            break;
        }
      
        // Convertimos el color hexadecimal a sus componentes RGB usando slice
        const red = parseInt(hexColor.slice(1, 3), 16);
        const green = parseInt(hexColor.slice(3, 5), 16);
        const blue = parseInt(hexColor.slice(5, 7), 16);
      
        // Enviamos los valores RGB por el puerto
        port.write(`${red},${green},${blue}\n`);
      });
      
  //rosa, violeta, azul, celeste, verde y amarillo

port.on("data", function (data) {
    let status = data.toString().trim();
    let ledOn = status === "on";
    sendEvent("boton", { on: ledOn });
  });
  startServer();