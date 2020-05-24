const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/index");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI =
  process.env.MONGODB_CONNECTION_STRING ||
  "mongodb://localhost:27017/quibuilder_db";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", router);
app.use(express.static(path.join(__dirname, "client", "build")));

mongoose.connect(
  MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) throw err;
  }
);
mongoose.connection.once("open", function () {
  console.log("Connected to db");
});
mongoose.connection.on("error", function (error) {
  console.log("Mongoose connection error: " + error);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}.`);
});
