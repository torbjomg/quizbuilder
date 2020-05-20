import React, { useState, Fragment } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
function QuizMaker() {
  const [quizTitle, setQuizTitle] = useState({ title: "" });
  const [quizAuthor, setQuizAuthor] = useState({ title: "" });

  const onChangeQuizTitle = (e) => {
    setQuizTitle({
      ...quizTitle,
      [e.target.name]: e.target.value,
    });
  };
  const onChangeQuizAuthor = (e) => {
    setQuizAuthor({
      ...quizAuthor,
      [e.target.name]: e.target.value,
    });
  };

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
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>Author</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          autoComplete="off"
          aria-label="Enter the quiz author here"
          value={quizAuthor.title}
          onChange={onChangeQuizAuthor}
          name="title"
        />
      </InputGroup>
      <hr />
      <Button variant="primary" onClick={() => console.log("wip")}>
        Save
      </Button>
    </Fragment>
  );
}

export default QuizMaker;
