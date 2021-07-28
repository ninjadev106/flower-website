const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");

router.get("/page/:id", auth, async (req, res) => {
  try {
    let count = await User.count();
    count = Math.ceil((count - 1) / req.params.id);
    res.json(count);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post(
  "/",
  [
    [
      check("name", "Name is required")
        .not()
        .isEmpty(),
      check("email", "Please include a valid email").isEmail(),
      check("password", "Please enter password with 6 or more char").isLength({
        min: 6
      })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: " User already exists" });
      }
      user = new User({
        name,
        email,
        password
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.get("/:pageNo/:userLimit", auth, async (req, res) => {
  let userLimit = Number(req.params.userLimit);
  let pageNo = Number(req.params.pageNo);
  if (Number.isNaN(userLimit) || Number.isNaN(pageNo)) {
    res.status(500).send("Server error");
  }
  try {
    const users = await User.find({ role: { $not: { $eq: "admin" } } })
      .skip(userLimit * (pageNo - 1))
      .limit(userLimit);
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.put("/role/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user.role === "user") {
      await User.updateOne(
        { _id: req.params.id },
        { $set: { role: "editer" } }
      );
      res.json({ msg: "Updated user role!" });
    } else {
      await User.updateOne({ _id: req.params.id }, { $set: { role: "user" } });
      res.json({ msg: "Updated user role!" });
    }
  } catch (err) {
    console.error(err.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.json({ msg: "Selected user deleted!" });
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
