import { React, useState } from "react";
import QuestionCarousel from "../QuestionCarousel/QuestionCarousel";
import MyButton from "../../../MyButton/MyButton";
import "./QuestionIndex.css";

const QuestionIndex = ({
  setShowSummary,
  setShowQuestions,
  pageNo,
  bookContent,
}) => {
  const options = [
    "Multiple Choice Questions",
    "One Word Question",
    "Fill in the Blanks",
  ];

  const [selectedOption, setSelectedOption] = useState();

  const [showCarousel, setShowCarousel] = useState(false);

  const [showMCQ, setShowMCQ] = useState(false);
  const [showOneW, setShowOneW] = useState(false);
  const [showFIB, setShowFIB] = useState(false);

  const checkOption = (e) => {
    e.preventDefault();

    if (selectedOption === "Multiple Choice Questions") {
      setShowMCQ(true);
      setShowOneW(false);
      setShowFIB(false);
      setShowCarousel(true);
    } else if (selectedOption === "One Word Question") {
      setShowOneW(true);
      setShowFIB(false);
      setShowMCQ(false);
      setShowCarousel(true);
    } else if (selectedOption === "Fill in the Blanks") {
      setShowFIB(true);
      setShowOneW(false);
      setShowMCQ(false);
      setShowCarousel(true);
    }
  };

  const prev = () => {
    setShowSummary(true);
    setShowQuestions(false);
    setShowCarousel(false);
  };

  return (
    <>
      {showCarousel ? (
        <QuestionCarousel
          setShowCarousel={setShowCarousel}
          pageNo={pageNo}
          bookContent={bookContent}
          showMCQ={showMCQ}
          showOneW={showOneW}
          showFIB={showFIB}
        />
      ) : (
        <div className="IndexContainer">
          <h1>INDEX</h1>
          <form onSubmit={checkOption} className="indexForm">
            {options.map((option) => (
              <div className="formControl-check">
                <input
                  type="radio"
                  id={option}
                  name="answer"
                  value={option}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                <label for={option}>{option}</label>
              </div>
            ))}
            <input
              className="btn btn-primary btn-block mt-4"
              type="submit"
              value="Get Questions"
            />
            <button className="btn btn-primary btn-block mt-4" onClick={prev}>
              Back to Summary
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default QuestionIndex;
