const express = require("express");
const router = express.Router();
const Movie = require("../models/movie.model");

router.get("/", async (req, res, next) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (error) {
    return next(error);
  }
});
router.get("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const movie = await Movie.findById(_id);
    return res.status(200).json(movie);
  } catch (error) {
    return next(error);
  }
});

router.get("/id/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const movie = await Movie.find({ id: id });
    if (movie.length != 0) {
      return res.status(200).json(movie);
    } else {
      return res.status(404).json("No movie corresponding that id found in DB");
    }
  } catch (error) {
    return next(error);
  }
});
router.get("/title/:title", async (req, res, next) => {
  const title = req.params.title;
  try {
    const movie = await Movie.find({ title: title });
    if (movie.length != 0) {
      return res.status(200).json(movie);
    } else {
      return res
        .status(404)
        .json("No movie corresponding that title found in DB");
    }
  } catch (error) {
    return next(error);
  }
});
router.get("/genre/:genre", async (req, res, next) => {
  const genre = req.params.genre;
  try {
    const movie = await Movie.find({ genre: genre });
    if (movie.length != 0) {
      return res.status(200).json(movie);
    } else {
      return res
        .status(404)
        .json("No movie corresponding that genre found in DB");
    }
  } catch (error) {
    return next(error);
  }
});
router.get("/yearGreaterThan/:year", async (req, res) => {
  const year = req.params.year;
  try {
    const movie = await Movie.find({ year: { $gt: year } });
    if (movie.length != 0) {
      return res.status(200).json(movie);
    } else {
      return res
        .status(404)
        .json("No movie corresponding that year range found in DB");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const newMovie = new Movie(req.body);
    const createdMovie = await newMovie.save();
    return res.status(201).json(createdMovie);
  } catch (error) {
    return next(error);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    return res.status(200).json("Movie deleted!");
  } catch (error) {
    return next(error);
  }
});
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const movieModified = new Movie(req.body);
    movieModified._id = id;
    const movieUpdated = await Movie.findByIdAndUpdate(id, movieModified);
    return res.status(200).json(movieUpdated);
  } catch (error) {
    return next(error);
  }
});
router.put("/byid/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const movie = await Movie.find({ id: id });
      const movieModified = new Movie(req.body);
      movieModified._id = movie[0]._id;
      const movieUpdated = await Movie.findOneAndUpdate({ id: id }, movieModified);
      return res.status(200).json(movieUpdated);
    } catch (error) {
      return next(error);
    }
  });
module.exports = router;
