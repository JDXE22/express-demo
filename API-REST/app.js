const express = require("express");
const movies = require("./movies.json");
const app = express();
const crypto = require("node:crypto");
app.use(express.json());
app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.get("/movies", (req, res) => {
  const { genre } = req.query;
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
    return res.json(filteredMovies);
  }

  res.json(movies);
});

app.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);
  if (movie) return res.json(movie);

  res.status(404).json({ message: "Movie not found" });
});

app.post("/movies", (req, res) => { 
  const { title, director, year, rate, genre, duration, poster } = req.body;
  
  const newMovie = {
    id: crypto.randomUUID(),
    title,
    director,
    year,
    rate: rate ?? 0,
    genre,
    duration,
    poster,
  }

  movies.push(newMovie)

  res.status(201).json(newMovie)

})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
