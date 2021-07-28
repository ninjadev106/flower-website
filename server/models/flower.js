const mongoose = require("mongoose");

const FlowerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  mon: {
    type: Number,
    required: true
  },
  tue: {
    type: Number,
    required: true
  },
  wed: {
    type: Number,
    required: true
  },
  thu: {
    type: Number,
    required: true
  },
  fri: {
    type: Number,
    required: true
  },
  sat: {
    type: Number,
    required: true
  },
  sun: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  sale: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("flower", FlowerSchema);
