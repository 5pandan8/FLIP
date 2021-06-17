import React from "react";
import "./DisplayAnswer.css";
const DisplayAnswer = ({ question, answer }) => {
  return (
    <div className="DisplayAnswerContainer">
      <h1>Question:</h1>
      <h2>{question}</h2>
      <h1>Answer:</h1>
      <h2>{answer}</h2>
    </div>
  );
};

export default DisplayAnswer;
