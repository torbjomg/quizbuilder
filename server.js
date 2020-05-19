const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/index");

const app = express();
const PORT = 3001;
const MONGODB_URI = "mongodb://localhost:27017/quibuilder_db;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", router);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
});
mongoose.connection.once("open", function() {
  console.log("Connected to db");
});
mongoose.connection.on("error", function() {
  console.log("Mongoose connection error: " + error);
});

app.listen(PORT, function(){
  console.log(`Server listening on port ${PORT}.`);
});

