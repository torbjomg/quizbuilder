const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/index");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_CONNECTION_STRING;
console.log(MONGODB_URI);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", router);
app.use(express.static(path.join(__dirname, "client", "build")));

app.get("/config.js", function (req, res) {
  // this is probably a bad idea
  res.write(
    "var MONGODB_CONNECTION_STRING='" +
      process.env.MONGODB_CONNECTION_STRING +
      "'" +
      "\n"
  );
  res.write("var AUTH0_DOMAIN='" + process.env.AUTH0_DOMAIN + "'" + "\n");
  res.write("var AUTH0_CLIENT_ID='" + process.env.AUTH0_CLIENT_ID + "'" + "\n");
  res.write(
    "var AUTH0_CLIENT_SECRET='" + process.env.AUTH0_CLIENT_SECRET + "'" + "\n"
  );
  res.write(
    "var AUTH0_CALLBACK_URL='" + process.env.AUTH0_CALLBACK_URL + "'" + "\n"
  );
  res.end();
});
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
