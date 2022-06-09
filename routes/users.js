const router = require("express").Router();
const User = require("../models/User");
const bcyrpt = require("bcrypt");
const Post = require("../models/Post");
const { default: mongoose } = require("mongoose");

router.put("/:id", async (req, res) => {
  console.log("USER UPDATE CALLED");
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcyrpt.genSalt(10);
      req.body.password = await bcyrpt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(updatedUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can only update your account!");
  }
});

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      console.log(user);
      if (!user) {
        res.status(401).json("User not found");
      } else {
        try {
          await Post.deleteMany({ username: user.username });
          await User.findByIdAndDelete(req.params.id);
          res.status(200).json("User has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      }
    } catch (err) {
      res.status(401).json("Check if the id has all digits " + err);
    }
  } else {
    res.status(401).json("You can only delete your account!");
  }
});

router.get("/:id", async (req, res) => {
  console.log("USER GET CALLED");
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
