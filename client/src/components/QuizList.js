import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function QuizList() {
  const [quiz, setQuiz] = useState([]);
  useEffect(function () {
    async function getQuiz() {
      try {
        const response = await axios.get("/api/quizzes");
        setQuiz(response.data);
      } catch (error) {
        console.log("error", error);
      }
    }
    getQuiz();
  }, []);
  return <div>quizlist placeholder</div>;
}

export default QuizList;
