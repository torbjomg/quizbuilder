import React, { useState, Fragment } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import axios from "axios";
import { useAuth0 } from "../react-auth0-spa";

function QuizMaker(props) {
  const [quizTitle, setQuizTitle] = useState({ title: "" });

  const { user } = useAuth0();

  const onChangeQuizTitle = (e) => {
    setQuizTitle({
      ...quizTitle,
      [e.target.name]: e.target.value,
    });
  };
  function saveQuiz() {
    if (!quizTitle.title || !user) {
      return;
    }
    async function saveToDb() {
      try {
        const response = await axios.post("/api/quizzes", {
          title: quizTitle.title,
          author: user.email,
          public: false,
        });
        console.log(response.data);
        props.history.push(`/edit_quiz/${response.data._id}`);
      } catch (error) {
        console.log(error);
      }
    }
    saveToDb();
  }
  return (
    <Fragment>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>Quiz Title</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          autoComplete="off"
          aria-label="Enter the quiz title here"
          value={quizTitle.title}
          onChange={onChangeQuizTitle}
          name="title"
        />
      </InputGroup>
      <hr />
      <Button variant="primary" onClick={saveQuiz}>
        Save
      </Button>
    </Fragment>
  );
}

export default QuizMaker;
