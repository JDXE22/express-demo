import express, { json } from "express";
import { moviesRouter } from "./routes/moviesRouter.js";
import { corsMiddleware } from "./middlewares/cors.js";
moviesRouter

const app = express();

app.use(corsMiddleware);

app.use(json());
app.disable("x-powered-by");

app.use("/movies", moviesRouter);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
