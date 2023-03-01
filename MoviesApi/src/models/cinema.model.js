const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CinemaSchema = new Schema(
  {
    number: { type: Number, required: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    movies: [{ type: mongoose.Types.ObjectId, ref: 'Movie' }],
  },
  {
    timestamps: true,
  }
);

const Cinema = mongoose.model("Cinema", CinemaSchema);
module.exports = Cinema;
