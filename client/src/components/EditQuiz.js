import React, { Fragment, useState, useEffect } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import axios from "axios";

function EditQuiz(props) {
  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState({ title: "" });
  const [answerText, setAnswerText] = useState({ title: "" });
  const [currentAlternative, setCurrentAlternative] = useState({ title: "" });
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
  const onChangeCurrentAlternative = (e) => {
    setCurrentAlternative({
      ...currentAlternative,
      [e.target.name]: e.target.value,
    });
  };
  function addAlternative() {
    setAlternatives(alternatives.concat(currentAlternative.title));
    setCurrentAlternative({ title: "" });
  }
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
  return (
    <Fragment>
      <div className="row">
        <div className="col-md-8">
          <h2>{quiz.title}</h2>
          <small>{quiz.author}</small>
          <hr />
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
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Optional Alternatives</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              autocomplete="off"
              placeholder="Enter optional alternatives"
              aria-label="Alternatives"
              aria-describedby="basic-addon2"
              value={currentAlternative.title}
              onChange={onChangeCurrentAlternative}
              name="title"
            />
            <InputGroup.Append>
              <Button variant="outline-primary" onClick={addAlternative}>
                Add
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
        <div className="col-md-4">
          {questions.map((question, index) => {
            return (
              <div className="container" key={index}>
                {question.question} - {question.answer}
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
}

export default EditQuiz;
