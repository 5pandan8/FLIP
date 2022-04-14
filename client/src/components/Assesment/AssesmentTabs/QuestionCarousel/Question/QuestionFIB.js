import { React, useState } from "react";
import { Alert } from "react-bootstrap";
import "./QuestionFIB.css";

const QuestionFIB = ({ index, question, answer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [correctAns, setCorrectAns] = useState();
  const [showAns, setShowAns] = useState(false);
  const checkAnswer = (e) => {
    e.preventDefault();
    setShowAns(true);
    if (selectedAnswer == answer) {
      //alert("Answer is correct");
      setCorrectAns(true);
    } else {
      //alert("Answer is wrong");
      setCorrectAns(false);
    }
  };

  return (
    <div className="questionContainer">
      <form className="questionForm" onSubmit={checkAnswer}>
        <div className="formControl">
          <label>
            Q{index} : {question}
          </label>
        </div>
        {showAns &&
          (correctAns ? (
            <Alert variant="success">The Answer is Correct.</Alert>
          ) : (
            <Alert variant="danger">The Answer is Incorrect.</Alert>
          ))}
        <div className="formControl">
          <input
            type="text"
            required
            onChange={(e) => setSelectedAnswer(e.target.value)}
          />
        </div>

        <input
          className="btn btn-primary btn-block mt-4"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default QuestionFIB;
