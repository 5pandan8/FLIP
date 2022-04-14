import React from "react";
import MyButton from "../../../MyButton/MyButton";
import "./Summary.css";

const Summary = ({
  pageNo,
  setPageNo,
  setShowQuestions,
  setShowSummary,
  setShowIndex,
  summaryContent,
}) => {
  const next = () => {
    setShowSummary(false);
    setShowQuestions(true);
  };
  const prev = () => {
    setShowSummary(false);
    setShowQuestions(false);
    setShowIndex(true);
    setPageNo(null);
  };
  return (
    <div className="summaryContainer">
      <h1>SUMMARY</h1>
      <h4>Page Number {pageNo}</h4>
      <p>{summaryContent}</p>
      <div className="summary-btns">
        <button className="btn btn-primary btn-block mt-4" onClick={next}>
          Questions
        </button>
        <button className="btn btn-primary btn-block mt-4" onClick={prev}>
          Index
        </button>
      </div>
    </div>
  );
};

export default Summary;
