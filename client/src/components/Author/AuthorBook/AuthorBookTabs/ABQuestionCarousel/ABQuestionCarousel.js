import React from "react";
import Carousel from "react-elastic-carousel";
import ABQuestionMCQ from "./ABQuestion/ABQuestionMCQ";
import ABQuestionOneW from "./ABQuestion/ABQuestionOneW";
import ABQuestionFIB from "./ABQuestion/ABQuestionFIB";
import MyButton from "../../../../MyButton/MyButton";
import "./ABQuestionCarousel.css";

const ABQuestionCarousel = ({
  setShowCarousel,
  pageNo,
  bookContent,
  showMCQ,
  showOneW,
  showFIB,
  getContent,
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
    <div className="ABQuestionWrapper">
      <Carousel breakPoints={breakPoints}>
        {showMCQ &&
          getMCQ().map((ques) => (
            <ABQuestionMCQ
              index={ques["id"]}
              question={ques["question"]}
              options={ques["options"]}
              answer={ques["answer"]}
              getContent={getContent}
              pageNo={pageNo}
              bookName={bookContent["BookName"]}
            />
          ))}
        {showOneW &&
          getOneW().map((ques) => (
            <ABQuestionOneW
              index={ques["id"]}
              question={ques["question"]}
              answer={ques["answer"]}
              getContent={getContent}
              pageNo={pageNo}
              bookName={bookContent["BookName"]}
            />
          ))}
        {showFIB &&
          getFIB().map((ques) => (
            <ABQuestionFIB
              index={ques["id"]}
              question={ques["question"]}
              answer={ques["answer"]}
              getContent={getContent}
              pageNo={pageNo}
              bookName={bookContent["BookName"]}
            />
          ))}
      </Carousel>
      <MyButton
        buttonSize="mybtn--large"
        buttonColor="mybtn--violet"
        onClick={prev}
      >
        Back to Question Index
      </MyButton>
    </div>
  );
};

export default ABQuestionCarousel;
