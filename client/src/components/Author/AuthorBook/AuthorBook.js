import { React, useState } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import "./AuthorBook.css";
import ABIndices from "./AuthorBookTabs/ABIndices/ABIndices";
import ABSummary from "./AuthorBookTabs/ABSummary/ABSummary";
import ABQuestionIndex from "./AuthorBookTabs/ABQuestionIndex/ABQuestionIndex";

const CloseABButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

const AuthorBook = ({
  showAuthorBook,
  setShowAuthorBook,
  bookContent,
  getContent,
}) => {
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
      {showAuthorBook && (
        <>
          <div className="AuthorBookWrapper">
            <div className="AuthorBookContent">
              {showIndex && (
                <ABIndices
                  pageNo={pageNo}
                  setShowIndex={setShowIndex}
                  setPageNo={setPageNo}
                  setShowSummary={setShowSummary}
                  totalPages={bookContent["pages"].length}
                />
              )}
              {showSummary && (
                <ABSummary
                  setShowIndex={setShowIndex}
                  pageNo={pageNo}
                  setPageNo={setPageNo}
                  setShowQuestions={setShowQuestions}
                  setShowSummary={setShowSummary}
                  summaryContent={getSummary()}
                  bookName={bookContent["BookName"]}
                  getContent={getContent}
                />
              )}
              {showQuestions && (
                <ABQuestionIndex
                  setShowSummary={setShowSummary}
                  setShowQuestions={setShowQuestions}
                  pageNo={pageNo}
                  bookContent={bookContent}
                  getContent={getContent}
                />
              )}
              <CloseABButton
                aria-label="Close modal"
                onClick={() => setShowAuthorBook((prev) => !prev)}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AuthorBook;
