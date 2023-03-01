const express = require("express");
const router = express.Router();
const Cinema = require("../models/cinema.model");

router.get("/", async (req, res, next) => {
  try {
    const cinemas = await Cinema.find().populate('movies');
    return res.status(200).json(cinemas);
  } catch (error) {
    return next(error);
  }
});
router.get("/:number", async (req, res, next) => {
  const number = req.params.number;
  try {
    const cinema = await Cinema.find({ number: number });
    if (cinema.length != 0) {
      return res.status(200).json(cinema);
    } else {
      return res
        .status(404)
        .json("No cinema corresponding that number found in DB");
    }
  } catch (error) {
    return next(error);
  }
});
router.get("/name/:name", async (req, res, next) => {
  const name = req.params.name;
  try {
    const cinema = await Cinema.find({ name: name });
    if (cinema.length != 0) {
      return res.status(200).json(cinema);
    } else {
      return res
        .status(404)
        .json("No cinema corresponding that name found in DB");
    }
  } catch (error) {
    return next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const newCinema = new Cinema(req.body);
    const createdCinema = await newCinema.save();
    return res.status(201).json(createdCinema);
  } catch (error) {
    return next(error);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Cinema.findByIdAndDelete(id);
    return res.status(200).json("Cinema deleted!");
  } catch (error) {
    return next(error);
  }
});
router.put("/id/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const cinemaModified = new Cinema(req.body);
    cinemaModified._id = id;
    const cinemaUpdated = await Cinema.findByIdAndUpdate(id, cinemaModified);
    return res.status(200).json(cinemaUpdated);
  } catch (error) {
    return next(error);
  }
});
router.put("/add-movie", async (req, res, next) => {
  try {
    const { cinemaId } = req.body;
    const { movieId } = req.body;
    const updatedCinema = await Cinema.findByIdAndUpdate(
        cinemaId,
        { $push: { movies: movieId } },
        { new: true }
    );
    return res.status(200).json(updatedCinema);
  } catch (error) {
    return next(error);
  }
});
module.exports = router;
