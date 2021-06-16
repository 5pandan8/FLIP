import { React, useState } from "react";
import "./QuestionOneW.css";

const QuestionOneW = ({ index, question, answer }) => {
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
        <div className="formControl">
          <input
            type="text"
            required
            onChange={(e) => setSelectedAnswer(e.target.value)}
          />
        </div>

        <input className="mybtn mybtn--Question" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default QuestionOneW;
