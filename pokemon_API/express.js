const ditto = require("./pokemon/ditto.json");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/pokemon/ditto", (req, res) => {
  res.json(ditto)
});

app.post("/pokemon", (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const data = JSON.parse(body);
    // res.writeHead(201, {
    //   "Content-Type": "application/json; charset=utf-8",
    // });
    // res.end(JSON.stringify(data));
    res.status(201).json(data)
  });
});

app.use((req, res) => {
  res.status(404).send("<h1>404 Not Found</h1>");
})


app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
