const express = require("express");
const path = require("path");

const app = express();
const puerto = 8080;
const server = app.listen(puerto, () => console.log("Server en", puerto));

server.on("error", (err) => {
  console.log("Error en el server.. =>", err);
});


let visitas = 0;


app.get("/", (request, response) => {
  visitas++;
  const myfilePath = path.resolve(__dirname, "titulo.html");
  response.sendFile(myfilePath);
});

app.get("/visitas", (request, response) => {
  visitas++;
  response.json({
    msg: `Visita numero ${visitas}`,
  });
});

app.get("/fyh", (request, response) => {
  visitas++;
  response.json({
    fyh: new Date(),
  });
});
