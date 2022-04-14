import React from "react";
import Carousel from "react-elastic-carousel";
import MyButton from "../../../MyButton/MyButton";
import QuestionMCQ from "./Question/QuestionMCQ";
import QuestionOneW from "./Question/QuestionOneW";
import QuestionFIB from "./Question/QuestionFIB";
import "./QuestionCarousel.css";

const QuestionCarousel = ({
  setShowCarousel,
  pageNo,
  bookContent,
  showMCQ,
  showOneW,
  showFIB,
}) => {
  const breakPoints = [{ width: 1, itemsToShow: 1 }];

  const getMCQ = () => {
    const pages = bookContent["pages"];
    const selectedPage = pages[pageNo - 1];
    const mcq_list = selectedPage["mcq"];
    return mcq_list;
  };

  const getOneW = () => {
    const pages = bookContent["pages"];
    const selectedPage = pages[pageNo - 1];
    const oneW_list = selectedPage["oneW"];
    return oneW_list;
  };

  const getFIB = () => {
    const pages = bookContent["pages"];
    const selectedPage = pages[pageNo - 1];
    const fib_list = selectedPage["fib"];
    return fib_list;
  };

  const prev = () => {
    setShowCarousel(false);
  };

  return (
    <div className="questionWrapper">
      <Carousel breakPoints={breakPoints}>
        {showMCQ &&
          getMCQ().map((ques) => (
            <QuestionMCQ
              index={ques["id"]}
              question={ques["question"]}
              options={ques["options"]}
              answer={ques["answer"]}
            />
          ))}
        {showOneW &&
          getOneW().map((ques) => (
            <QuestionOneW
              index={ques["id"]}
              question={ques["question"]}
              answer={ques["answer"]}
            />
          ))}
        {showFIB &&
          getFIB().map((ques) => (
            <QuestionFIB
              index={ques["id"]}
              question={ques["question"]}
              answer={ques["answer"]}
            />
          ))}
      </Carousel>

      <button
        className="btn btn-primary btn-block mt-4"
        onClick={prev}
        style={{ width: "300px" }}
      >
        Back to Question Index
      </button>
    </div>
  );
};

export default QuestionCarousel;
