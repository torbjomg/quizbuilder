import React, { useState, Fragment } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
function QuizMaker() {
  const [questionText, setQuestionText] = useState({ title: "" });
  const [answerText, setAnswerText] = useState({ title: "" });
  const [alternatives, setAlternatives] = useState([]);
  const onChangeQuestion = (e) => {
    setQuestionText({
      ...questionText,
      [e.target.name]: e.target.value,
    });
  };
  const onChangeAnswer = (e) => {
    setAnswerText({
      ...answerText,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Fragment>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>Enter Question</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          autoComplete="off"
          as="textarea"
          aria-label="Enter the question text here"
          value={questionText.title}
          onChange={onChangeQuestion}
          name="title"
        />
      </InputGroup>
      <hr />
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Enter Answer</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          autoComplete="off"
          aria-label="Enter the correct answer here"
          value={answerText.title}
          onChange={onChangeAnswer}
          name="title"
        />
      </InputGroup>

      <Button variant="primary" onClick={() => console.log("wip")}>
        Save
      </Button>
    </Fragment>
  );
}

export default QuizMaker;
