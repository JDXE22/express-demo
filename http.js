const http = require("node:http");

const desiredPort = process.env.PORT ?? 3000;

const server = http.createServer((req, res) => {
  console.log(req.url);

  console.log("request received");
  res.end("Hola mundo");
});

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`);
});
