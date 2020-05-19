import React, { useState, Fragment } from "react";
import { Button, Modal } from "react-bootstrap";

function QuizMaker(props) {
  // TODO refactor this monstrosity
  const [questionText, setQuestionText] = useState({ title: "" });
  const [answerText, setAnswerText] = useState({ title: "" });
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);

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
  const handleShow = (e) => {
    e.preventDefault();
    setShowModal(true);
    setQuestionText("");
    setAnswerText("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let selection = window.getSelection();
    let content = selection.toString();
    // TODO - indices dont work with modal
    let startIndex = selection.extentOffset;
    let endIndex = startIndex + content.length;
    let data = {
      question: questionText.title,
      answer: answerText.title,
      alternatives: "", // TODO
    };
  };
  return (
    <Fragment>
      <Button onClick={handleShow}>CLICK</Button>
      <Modal className="my-modal" show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set question and answer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Define a question that can be answered in a brief response</p>
          <p>
            The highlighted text will serve as context, and the answer to your
            question should be easily understood from the context
          </p>
          <br />
          <input
            autoComplete="off"
            type="text"
            className="input-text"
            placeholder="Enter question..."
            value={questionText.title}
            name="title"
            onChange={onChangeQuestion}
          />
          <br />
          <input
            autoComplete="off"
            type="text"
            className="input-text"
            placeholder="Enter answer..."
            value={answerText.title}
            name="title"
            onChange={onChangeAnswer}
          />
          <br />
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}

export default QuizMaker;
