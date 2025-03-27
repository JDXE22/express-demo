import express, { json } from "express";
import movies from "./movies.json" with {type:"json"};
import { randomUUID } from "node:crypto";
import cors from "cors";
import { validateMovie, validatePartialMovie } from "./schemas/movies.js";

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        "http://localhost:8080",
        "http://localhost:3000",
        "https://movies.com",
        "https://localhost:1"
      ];
      
      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null,true)
      }

      if (!origin) {
        return callback(null,true)
      }

      return callback(new Error("Not allowed by CORS"))
    },
  })
);

app.use(json());
app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.get("/movies", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
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
  const result = validateMovie(req.body);

  if (!result.success) {
    return res.status(422).json({ error: JSON.parse(result.error.message) });
  }

  const newMovie = {
    id: randomUUID(),
    ...result.data,
  };

  movies.push(newMovie);

  res.status(201).json(newMovie);
});

app.delete("/movies/:id", (req, res) => {
  const id = req.params.id;
  const movieIndex = movies.findIndex((movie) => movie.id === id);
  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }

  movies.splice(movieIndex, 1);
  return res.json({ message: "Movie deleted" });
});

app.patch("/movies/:id", (req, res) => {
  const { id } = req.params;
  const result = validatePartialMovie(req.body);

  if (!result.success) {
    return res.status(422).json({ error: JSON.parse(result.error.message) });
  }

  const movieIndex = findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data,
  };

  return res.json(updateMovie);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
