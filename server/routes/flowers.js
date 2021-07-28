const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Flower = require("../models/flower");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const flowers = await Flower.find();
    res.json(flowers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post(
  "/",
  [auth, [check("name", "Flower name is already exist.").exists()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, mon, tue, wed, thu, fri, sat, sun, total, sale } = req.body;
    try {
      const newFlower = new Flower({
        name,
        mon,
        tue,
        wed,
        thu,
        fri,
        sat,
        sun,
        total,
        sale
      });
      const flower = await newFlower.save();
      res.json(flower);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server errror");
    }
  }
);
router.put("/:id", auth, async (req, res) => {
  const { name, mon, tue, wed, thu, fri, sat, sun, total, sale } = req.body;
  const flowerFields = {};
  if (name) flowerFields.name = name;
  if (mon) flowerFields.mon = mon;
  if (tue) flowerFields.tue = tue;
  if (wed) flowerFields.wed = wed;
  if (thu) flowerFields.thu = thu;
  if (fri) flowerFields.fri = fri;
  if (sat) flowerFields.sat = sat;
  if (sun) flowerFields.sun = sun;
  if (total) flowerFields.total = total;
  if (sale) flowerFields.sale = sale;
  try {
    let flower = await Flower.findById(req.params.id);

    flower = await Flower.findByIdAndUpdate(
      req.params.id,
      { $set: flowerFields },
      { new: true }
    );
    res.json({ flower });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    let flower = await Flower.findById(req.params.id);
    if (!flower) return res.status(404).json({ msg: "Flower not found..." });
    await Flower.findByIdAndRemove(req.params.id);
    res.json({ msg: "Flower delete..." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
