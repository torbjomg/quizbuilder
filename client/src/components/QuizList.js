import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
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
  function deleteQuiz(quizId) {
    async function deleteFromDb() {
      try {
        const remainingQuizzes = quizzes.filter((quiz) => quiz._id != quizId);
        const response = await axios.delete(`api/quizzes/${quizId}`);
        setQuizzes(remainingQuizzes);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    deleteFromDb();
  }
  return (
    <div>
      <h2>
        Saved Quizzes
        <Link to="/new_quiz" className="btn btn-dark float-right">
          Create Quiz
        </Link>
      </h2>
      <hr />
      {quizzes.map((quiz) => {
        return (
          <div key={quiz._id}>
            <div className="row">
              <div className="col-md-8">
                <h4>
                  <button
                    className="btn btn-dark btn-lg btn-block"
                    onClick={() => props.history.push(`/quiz/${quiz._id}`)}
                  >
                    {quiz.title}
                  </button>
                </h4>
              </div>
              <div className="col-md-4">
                <h3>
                  <FaEdit
                    className="quiz-icons"
                    onClick={() => props.history.push(`/edit_quiz/${quiz._id}`)}
                  />

                  <FaTrash
                    className="quiz-icons"
                    style={{ hover: "cursor" }}
                    color="red"
                    onClick={() => deleteQuiz(quiz._id)}
                  />
                </h3>
              </div>
              <div className="row">
                <small># of questions: {quiz.questions.length}</small>
                <br />
                <small>Author: {quiz.author}</small>
              </div>
            </div>

            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default QuizList;
