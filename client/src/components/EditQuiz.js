import React, { Fragment, useState, useEffect } from "react";
import {
  Button,
  InputGroup,
  FormControl,
  ListGroup,
  Table,
} from "react-bootstrap";
import axios from "axios";
import { FaEdit, FaTrash, FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function EditQuiz(props) {
  const initialState = { title: "", author: "", questions: [] };
  const [quiz, setQuiz] = useState(initialState);
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
    if (
      currentAlternative.title &&
      !alternatives.includes(currentAlternative.title)
    ) {
      setAlternatives([currentAlternative.title].concat(alternatives));
      setCurrentAlternative({ title: "" });
    }
  }
  function deleteQuestion(q) {
    const remainingQuestions = quiz.questions.filter(
      (question) => question.question !== q
    );
    const patchedQuiz = {
      title: quiz.title,
      author: quiz.author,
      questions: remainingQuestions,
    };
    setQuiz(patchedQuiz);
    async function updateQuiz() {
      try {
        await axios.patch(`/api/quizzes/${quiz._id}`, patchedQuiz);
      } catch (error) {
        console.log(error);
      }
    }
    updateQuiz();
  }
  function saveQuestion() {
    const exists = quiz.questions.filter(
      (question) => question.question === questionText.title
    );
    if (
      !exists === null ||
      questionText.title === "" ||
      answerText.title === ""
    ) {
      return;
    }
    quiz.questions.push({
      question: questionText.title,
      answer: answerText.title,
      alternatives: alternatives,
    });
    async function updateQuiz() {
      try {
        await axios.patch(`/api/quizzes/${quiz._id}`, quiz);
      } catch (error) {
        console.log(error);
      }
    }
    updateQuiz();
    setQuestionText({ title: "" });
    setAnswerText({ title: "" });
    setAlternatives([]);
  }

  function togglePublic() {
    async function toggleQuizPublic() {
      try {
        let patchedQuiz = {
          title: quiz.title,
          author: quiz.author,
          _id: quiz._id,
          public: !quiz.public,
          questions: quiz.questions,
        };
        console.log(quiz._id);
        await axios.patch(
          `http://localhost:3000/api/quizzes/${quiz._id}`,
          patchedQuiz
        );
        setQuiz(patchedQuiz);
        console.log(`Set to ${quiz.public ? "public" : "private"}`);
      } catch (error) {
        console.log(error);
      }
    }
    toggleQuizPublic();
  }

  useEffect(
    function () {
      async function getQuiz() {
        try {
          const response = await axios.get(
            `/api/quizzes/${props.match.params._id}`
          );
          setQuiz(response.data);
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
      <div className="row">
        <div className="col-md-6">
          <h2>
            {quiz.title}
            <span style={{ float: "right" }}>
              {quiz.public ? (
                <Button onClick={togglePublic}>
                  Public
                  <FaRegEye />
                </Button>
              ) : (
                <Button onClick={togglePublic}>
                  Private
                  <FaRegEyeSlash />
                </Button>
              )}
            </span>
          </h2>
          <small>{quiz.author}</small>
          <p></p>
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
              autoComplete="off"
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
          <Button
            onClick={saveQuestion}
            variant="outline-primary"
            size="lg"
            block
          >
            Save Question
          </Button>
          <h3>Saved alternatives:</h3>
          <ListGroup>
            {alternatives.length > 0 ? (
              alternatives.map((alternative, index) => {
                return (
                  <ListGroup.Item variant="dark" key={index}>
                    {alternative}
                  </ListGroup.Item>
                );
              })
            ) : (
              <h4>No saved alternatives, fill in box above and click "Add"!</h4>
            )}
          </ListGroup>
        </div>

        <div className="col-md-6">
          <h3>Saved questions:</h3>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th width="40%">Question</th>
                <th width="40%">Answer</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {quiz.questions.map((question, index) => {
                return (
                  <tr key={index}>
                    <td>{question.question}</td>
                    <td>
                      <div className="spoiler" tooltip-position="right">
                        {question.answer}
                      </div>
                    </td>
                    <td>
                      <FaEdit className="question-icon" />
                      <FaTrash
                        className="question-icon"
                        color="red"
                        onClick={() => deleteQuestion(question.question)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </Fragment>
  );
}

export default EditQuiz;
