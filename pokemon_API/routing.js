const http = require("node:http");
const json = require("./pokemon/ditto.json");
const { chunk } = require("lodash");
const processRequest = (req, res) => {
  const { method, url } = req;

  switch (method) {
    case "GET":
      switch (url) {
        case "/pokemon/ditto":
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          return res.end(JSON.stringify(json));
        }
        break;

    case "POST":
      switch (url) {
        case "/pokemon": {
          let body = "";

          req.on("data", (chunk) => {
            body += chunk.toString();
          });

          req.on("end", () => {
            const data = JSON.parse(body);
            res.writeHead(201, {
              "Content-Type": "application/json; charset=utf-8",
            });
            res.end(JSON.stringify(data));
          });

          return;
        }
      }

    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      return res.end("404 Not Found");
  }
};

const server = http.createServer(processRequest);

server.listen(3000, () => {
  console.log("Server listening on port http://localhost:3000");
});
