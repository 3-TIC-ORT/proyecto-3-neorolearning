const socket = io("http://localhost:3000");

const enviarjuego = (type, data, callback = () => {}) => {
    socket.emit("realTimeEvent", type, data, callback);
};

const receive = (type, callback) => {
    socket.on("realTimeEvent", (receivedType, data) => {
        if (receivedType === type) return callback(data);
});
};

const fetchData = (type, callback) => {
    socket.emit("GETEvent", type, callback);
};
//fetchdata es lo que mandas desde el front al back
//(parametros) callback type es el tipo de evento nombrado por vos, por ejemplo: "hola" y callback,
// es lo que devuelve el backend al ESCUCHAR el evento. Osea lo que recibis del back.

const postData = (type, data, callback = () => {}) => {
    socket.emit("POSTEvent", type, data, callback);
};



