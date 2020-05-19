const express = require("express");
const router = express.Router();
const Quiz = requre("../models/article");

router.get("/quizzes", function(req, res){
  Quiz.find(function(err, quizzes){
    res.json(quizzes);
  });
};

router.get("/quiz/:id", function(req, res){
  Quiz.findById(req.params.id, function(err, quiz){
    if (!quiz){
      res.status(404).send("No result found");
    } else {
      res.json(quiz);
    }
  });
});

router.post("/quizzes", function(req, res){
  let quiz = new Quiz(req.body);
  quiz
    .save()
    .then((quiz) => {
      res.send(quiz);
    })
    .catch(function(err){
      res(status(422).send("Quiz add falied");
    });
});

module.exports = router;
