import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function QuizInfo(props) {
  // TODO : has to be a better way of doing this
  // issue with mapping over quiz.questions since request is async (??)
  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);

  useEffect(
    function () {
      async function getQuiz() {
        try {
          const response = await axios.get(
            `/api/quizzes/${props.match.params._id}`
          );
          setQuiz(response.data);
          setQuestions(response.data.questions);
        } catch (error) {
          console.log("error", error);
        }
      }
      getQuiz();
      console.log(quiz);
    },
    [props]
  );

  // TODO
  //   async function handleDelete() {
  //     try {
  //       await axios.delete(`/api/quizzes/${props.match.params._id}`);
  //       props.history.push("/quizzes");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  return (
    <div>
      <h2>{quiz.title}</h2>
      <small>by: {quiz.author}</small>
      <hr />
      {questions.map((question, index) => {
        return (
          <div className="container" key={index}>
            {question.question}
          </div>
        );
      })}
    </div>
  );
}

export default QuizInfo;
