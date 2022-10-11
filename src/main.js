const http = require('http');

const logicaServer = (peticion, respuesta) => {
	console.log('LLEGO UNA PETICION');
	respuesta.end('Hola mundo')
}

const server = http.createServer(logicaServer)

const connectedServer = server.listen(8080, () => {
	console.log(`Servidor Http escuchando en el puerto ${connectedServer.address().port}`)
})

const now = new Date();
console.log(now.getHours())