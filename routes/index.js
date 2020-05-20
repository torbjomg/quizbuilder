const express = require("express");
const router = express.Router();
const Quiz = require("../models/quiz");

router.get("/quizzes", function (req, res) {
  Quiz.find(function (err, quizzes) {
    res.json(quizzes);
  });
});

router.get("/quizzes/:id", function (req, res) {
  Quiz.findById(req.params.id, function (err, quiz) {
    if (!quiz) {
      res.status(404).send("No result found");
    } else {
      res.json(quiz);
    }
  });
});

router.post("/quizzes", function (req, res) {
  let quiz = new Quiz(req.body);
  quiz
    .save()
    .then((quiz) => {
      res.send(quiz);
    })
    .catch(function (err) {
      res(status(422).send("Quiz add failed"));
    });
});

router.patch("/quizzes/:id", function (req, res) {
  Quiz.findByIdAndUpdate(req.params.id, req.body)
    .then(function () {
      res.json("Quiz updated");
    })
    .catch(function (err) {
      res.status(422).send("Quiz update failed.");
    });
});

module.exports = router;
