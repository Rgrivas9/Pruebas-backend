const express = require("express");
const dotenv = require("dotenv");
const connect = require("./src/utils/database");
dotenv.config();

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT;
connect();

const moviesRoutes = require("./src/routes/moviesRoutes");
const cinemasRoutes = require("./src/routes/cinemasRoutes");
server.use("/api/movies", moviesRoutes);
server.use("/api/cinemas", cinemasRoutes);
server.use("*", (req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`GET All Movies http://localhost:${PORT}/api/movies`);
  console.log(`GET Movies by id http://localhost:${PORT}/api/movies/id/:id`);
  console.log(
    `GET Movies by title http://localhost:${PORT}/api/movies/title/:title`
  );
  console.log(
    `GET Movies by genre http://localhost:${PORT}/api/movies/genre/:genre`
  );
  console.log(
    `GET Movies by genre http://localhost:${PORT}/api/movies//yearGreaterThan/:year`
  );
  console.log(`GET All Cinemas http://localhost:${PORT}/api/cinemas`);
});
