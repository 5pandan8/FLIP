import { React, useState } from "react";
import "./ABQuestionIndex.css";
import ABQuestionCarousel from "../ABQuestionCarousel/ABQuestionCarousel";
import MyButton from "../../../../MyButton/MyButton";

const ABQuestionIndex = ({
  setShowSummary,
  setShowQuestions,
  pageNo,
  bookContent,
  getContent,
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
        <ABQuestionCarousel
          setShowCarousel={setShowCarousel}
          pageNo={pageNo}
          bookContent={bookContent}
          showMCQ={showMCQ}
          showOneW={showOneW}
          showFIB={showFIB}
          getContent={getContent}
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
              className="mybtn mybtn--Index"
              type="submit"
              value="Get Questions"
            />
          </form>
          <MyButton
            buttonSize="mybtn--large"
            buttonColor="mybtn--violet"
            onClick={prev}
          >
            Back to Summary
          </MyButton>
        </div>
      )}
    </>
  );
};

export default ABQuestionIndex;
