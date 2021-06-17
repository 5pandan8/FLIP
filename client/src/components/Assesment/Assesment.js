import { React, useState } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import "./Assesment.css";
import Indices from "./AssesmentTabs/Indices/Indices";
import Summary from "./AssesmentTabs/Summary/Summary";
import QuestionIndex from "./AssesmentTabs/QuestionIndex/QuestionIndex";
import GenSummary from "../GenerateSummary/GenerateSummary";
import AskQuestion from "../AskQuestions/AskQuestion";

const CloseAssesmentButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

const Assesment = ({ showAssesment, setShowAssesment, bookContent }) => {
  const [showIndex, setShowIndex] = useState(true);
  const [showSummary, setShowSummary] = useState(false);
  const [pageNo, setPageNo] = useState("");
  const [showQuestions, setShowQuestions] = useState(false);

  const getSummary = () => {
    const pages = bookContent["pages"];
    const selectedPage = pages[pageNo - 1];
    return selectedPage["summary"];
  };

  return (
    <>
      {showAssesment && (
        <>
          <div className="AssesmentWrapper">
            <div className="AssesmentContent">
              {showIndex && (
                <Indices
                  pageNo={pageNo}
                  setShowIndex={setShowIndex}
                  setPageNo={setPageNo}
                  setShowSummary={setShowSummary}
                  totalPages={bookContent["pages"].length}
                />
              )}
              {showSummary && (
                <Summary
                  setShowIndex={setShowIndex}
                  pageNo={pageNo}
                  setPageNo={setPageNo}
                  setShowQuestions={setShowQuestions}
                  setShowSummary={setShowSummary}
                  summaryContent={getSummary()}
                />
              )}
              {showQuestions && (
                <QuestionIndex
                  setShowSummary={setShowSummary}
                  setShowQuestions={setShowQuestions}
                  pageNo={pageNo}
                  bookContent={bookContent}
                />
              )}
              <CloseAssesmentButton
                aria-label="Close modal"
                onClick={() => setShowAssesment((prev) => !prev)}
              />
            </div>
          </div>
          <GenSummary bookContent={bookContent} />
          <AskQuestion bookContent={bookContent} />
        </>
      )}
    </>
  );
};

export default Assesment;
