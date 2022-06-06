const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const app = express();
const port = 5000;
dotenv.config();
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MONGODB"))
  .catch((err) => {
    console.log(err);
  });

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);

// app.use("/", (req, res) => {
//   res.send("Root route");
// });

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
