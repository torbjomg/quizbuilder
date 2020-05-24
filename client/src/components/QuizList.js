import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdPublic } from "react-icons/md";
import { useAuth0 } from "../react-auth0-spa";
function QuizList(props) {
  const { user } = useAuth0();
  const [quizzes, setQuizzes] = useState([]);
  const [publicQuizzes, setPublicQuizzes] = useState([]);
  useEffect(
    function () {
      async function getQuizzes() {
        try {
          const response = await axios.post("/api/my_quizzes", {
            email: user.email,
          });
          setQuizzes(response.data);
        } catch (error) {
          console.log("error", error);
        }
      }
      getQuizzes();
    },
    [user]
  );
  useEffect(
    function () {
      async function getPublicQuizzes() {
        try {
          const response = await axios.get("/api/public_quizzes");
          setPublicQuizzes(
            response.data.filter((quiz) => quiz.author !== user.email)
          );
        } catch (error) {
          console.log("error", error);
        }
      }
      getPublicQuizzes();
    },
    [user]
  );

  function deleteQuiz(quizId) {
    async function deleteFromDb() {
      try {
        const remainingQuizzes = quizzes.filter((quiz) => quiz._id !== quizId);
        const response = await axios.delete(`api/quizzes/${quizId}`);
        setQuizzes(remainingQuizzes);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    deleteFromDb();
  }
  function togglePublic(quizId) {
    async function toggleQuizPublic() {
      try {
        let quiz = quizzes.filter((quiz) => quiz._id === quizId)[0];
        quiz.public = !quiz.public;
        console.log(quizId);
        await axios.patch(`api/quizzes/${quizId}`, quiz);
        const patchedQuizzes = quizzes.slice();
        setQuizzes(patchedQuizzes);
        console.log(`Set to ${quiz.public ? "public" : "private"}`);
      } catch (error) {
        console.log(error);
      }
    }
    toggleQuizPublic();
  }
  return (
    <div>
      <h2>
        Your quizzes
        <Link to="/new_quiz" className="btn btn-dark float-right">
          Create Quiz
        </Link>
      </h2>
      <hr />
      {quizzes.map((quiz, index) => {
        return (
          <div key={index}>
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
                    className="quiz-icon"
                    onClick={() => props.history.push(`/edit_quiz/${quiz._id}`)}
                  />
                  <FaTrash
                    className="quiz-icon"
                    color="red"
                    onClick={() => deleteQuiz(quiz._id)}
                  />
                  <MdPublic
                    className="quiz-icon"
                    color={quiz.public === true ? "green" : "grey"}
                    onClick={() => togglePublic(quiz._id)}
                  ></MdPublic>
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
      <hr />
      <h2>Public quizzes</h2>
      {publicQuizzes.map((quiz, index) => {
        return (
          <div key={index}>
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
              <div className="col-md-4"></div>
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
