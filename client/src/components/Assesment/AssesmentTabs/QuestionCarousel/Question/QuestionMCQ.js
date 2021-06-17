import { React, useState } from "react";
import "./QuestionMCQ.css";

const QuestionMCQ = ({ index, question, answer, options }) => {
  const [selectedAnswer, setSelectedAnswer] = useState();
  const checkAnswer = (e) => {
    e.preventDefault();
    if (selectedAnswer == answer) {
      alert("Answer is correct");
    } else {
      alert("Answer is wrong");
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
        {options.map((option) => (
          <div className="formControl-check">
            <input
              type="radio"
              id={option}
              name="answer"
              value={option}
              onChange={(e) => setSelectedAnswer(e.target.value)}
            />
            <label for={option}>{option}</label>
          </div>
        ))}
        <input className="mybtn mybtn--Question" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default QuestionMCQ;
