import movies from "../movies.json" with {type:"json"};
import { Router } from "express";
import { randomUUID } from "node:crypto";
import { validateMovie, validatePartialMovie } from "../schemas/movies.js";


export const moviesRouter = Router()


moviesRouter.get("/", (req,res)=> {
    const { genre } = req.query;
    if (genre) {
      const filteredMovies = movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      );
      return res.json(filteredMovies);
    }
  
    res.json(movies);
})

moviesRouter.get("/:id", (req,res)=>{
    const { id } = req.params;
    const movie = movies.find((movie) => movie.id === id);
    if (movie) return res.json(movie);
  
    res.status(404).json({ message: "Movie not found" });
})

moviesRouter.post("/", (req,res)=> {
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
})

moviesRouter.delete("/:id", (req,res)=>{
    const id = req.params.id;
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found" });
    }

    movies.splice(movieIndex, 1);
    return res.json({ message: "Movie deleted" });
    })

moviesRouter.patch("/:id", (req,res)=> {
  const { id } = req.params;
  const result = validatePartialMovie(req.body);

  if (!result.success) {
    return res.status(422).json({ error: JSON.parse(result.error.message) });
  }

  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data,
  };

  return res.json(updateMovie)
})

 
