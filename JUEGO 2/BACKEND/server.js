import { onEvent, startServer } from "soquetic";

// Escuchar evento cuando el usuario selecciona un nivel
onEvent("seleccionarNivel", (data, callback) => {
  // Pasar la solicitud al backend para obtener las palabras del nivel
  const { nivel } = data;
  
  // Usar un callback para manejar la respuesta del backend
  const resultado = obtenerPalabrasDelNivel(nivel);
  callback(resultado);
});

// Escuchar evento para actualizar el puntaje
onEvent("actualizarPuntaje", (data, callback) => {
  const { nivel, correcto } = data;
  
  // Usar un callback para manejar la actualización del puntaje
  const nuevoPuntaje = actualizarPuntajeBackend(nivel, correcto);
  callback(nuevoPuntaje);
});

startServer();
