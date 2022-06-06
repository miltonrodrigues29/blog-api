const router = require("express").Router();
const User = require("../models/User");
const bcyrpt = require("bcrypt");
const { default: mongoose } = require("mongoose");

//REGISTER

router.post("/register", async (req, res) => {
  try {
    const salt = await bcyrpt.genSalt(10);
    const hashedPass = await bcyrpt.hash(req.body.password, salt);
    const newUser = User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    // !user && res.status(400).json("Wrong Credentials!");

    if (user) {
      const validated = await bcyrpt.compare(req.body.password, user.password);

      if (validated) {
        const { password, ...others } = user._doc;
        res.status(200).json(others);
      } else {
        res.status(400).json("Wrong Credentials!");
      }
    } else {
      res.status(400).json("Wrong Credentials!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
