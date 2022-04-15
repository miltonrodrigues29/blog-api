const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MONGODB"))
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
