import React, { Fragment, useState, useEffect } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import axios from "axios";

function TakeQuiz(props) {
  const initialQuizState = { title: "", author: "", questions: [] };
  const initialQuestionState = { question: "", answer: "", alternatives: [] };
  const [userAnswer, setUserAnswer] = useState({ title: "" });
  const [quiz, setQuiz] = useState(initialQuizState);
  const [currentQuestion, setCurrentQuestion] = useState(initialQuestionState);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const onChangeUserAnswer = (e) => {
    setUserAnswer({
      ...userAnswer,
      [e.target.name]: e.target.value,
    });
  };
  function registerAnswer(answer) {
    if (answer.toString() === currentQuestion.answer.toString()) {
      setPoints(points + 1);
    }
    if (questionIndex >= quiz.questions.length - 1) {
      setQuizFinished(true);
      return;
    }
    setCurrentQuestion(quiz.questions[questionIndex + 1]);
    setQuestionIndex(questionIndex + 1);
    setUserAnswer({ title: "" });
  }
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  useEffect(
    function () {
      async function getQuiz() {
        try {
          const response = await axios.get(
            `/api/quizzes/${props.match.params._id}`
          );
          setQuiz(response.data);
          setCurrentQuestion(response.data.questions[0]);
        } catch (error) {
          console.log("error", error);
        }
      }
      getQuiz();
    },
    [props]
  );
  return (
    <Fragment>
      {quizFinished ? (
        <h1>
          Quiz complete! You scored {points} / {quiz.questions.length} points.
        </h1>
      ) : (
        <Fragment>
          <h2>
            Current Points: {points}/{quiz.questions.length}
          </h2>
          <h3>{currentQuestion.question}</h3>
          <InputGroup>
            {currentQuestion.alternatives &&
            currentQuestion.alternatives.length > 0 ? (
              shuffle(
                currentQuestion.alternatives.concat(currentQuestion.answer)
              ).map((alternative, index) => {
                return (
                  <Button
                    variant="outline-primary"
                    key={index}
                    onClick={() => registerAnswer(alternative)}
                  >
                    {alternative}
                  </Button>
                );
              })
            ) : (
              <Fragment>
                <InputGroup.Prepend>
                  <InputGroup.Text>Enter Answer</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  autoComplete="off"
                  name="title"
                  aria-label="Enter answer here"
                  value={userAnswer.title}
                  onChange={onChangeUserAnswer}
                />
                <InputGroup.Append>
                  <Button
                    variant="outline-primary"
                    onClick={() => registerAnswer(userAnswer.title)}
                  >
                    Submit
                  </Button>
                </InputGroup.Append>
              </Fragment>
            )}
          </InputGroup>
        </Fragment>
      )}
    </Fragment>
  );
}

export default TakeQuiz;
