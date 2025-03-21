const http = require("node:http");
const fs= require('node:fs')

const desiredPort = process.env.PORT ?? 3000;

const processRequest = (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  if (req.url === "/") {
    res.statusCode = 200;
    res.end("Welcome to my homepage");
  } else if (req.url === '/image.jpg') {
    res.setHeader("Content-Type", "image/jpg")
    fs.readFile("common/image.jpg", (err, data)=> {
        if (err) {
            res.statusCode = 500
            res.end('<h1> 500 Internal Server Error </h1>')
        }else{
            res.setHeader("Content-Type", "image/jpg")
            res.end(data)
        }
    })
  } 
  else if (req.url === "/contact") {
    res.statusCode = 200;
    res.end("<h1>Contact</h1>");
  } else {
    res.status = 404;
    res.end("<h1> 404 </h1>");
  }
};

const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`);
});
