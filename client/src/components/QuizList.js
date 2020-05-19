import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function QuizList(props) {
  const [quizzes, setQuizzes] = useState([]);
  useEffect(function () {
    async function getQuizzes() {
      try {
        const response = await axios.get("/api/quizzes");
        setQuizzes(response.data);
      } catch (error) {
        console.log("error", error);
      }
    }
    getQuizzes();
  }, []);
  function clickLink(url) {
    props.history.push(url);
  }
  return (
    <div>
      <h2>
        Saved Quizzes
        <Link to="/quizzes/new" className="btn btn-dark float-right">
          Create Quiz
        </Link>
      </h2>
      <hr />
      {quizzes.map((quiz) => {
        return (
          <div key={quiz._id}>
            <div className="col-md-6">
              <h4>
                <button
                  className="btn btn-dark btn-lg btn-block"
                  size="lg"
                  onClick={() => clickLink(`/quizzes/${quiz._id}`)}
                >
                  {quiz.title}
                </button>
              </h4>
              <small># of questions: {quiz.questions.length}</small>
              <br />
              <small>Author: {quiz.author}</small>
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default QuizList;
