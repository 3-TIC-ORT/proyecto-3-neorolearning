import { onEvent, sendEvent, startServer } from "soquetic";

onEvent("nivel", (data) => {
  console.log(` Nivel recibido: ${data.msg}`);
  return { msg: `Nivel ${data.nivel} procesado correctamente.` };
});



startServer();