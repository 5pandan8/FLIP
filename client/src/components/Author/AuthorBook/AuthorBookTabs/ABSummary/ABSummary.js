import { React, useState } from "react";
import MyButton from "../../../../MyButton/MyButton";
import axios from "axios";
import { useAuth } from "../../../../../contexts/AuthContext";

const ABSummary = ({
  pageNo,
  setPageNo,
  setShowQuestions,
  setShowSummary,
  setShowIndex,
  summaryContent,
  bookName,
  getContent,
}) => {
  const { currentUser } = useAuth();
  const [newSummary, setNewSummary] = useState("");
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

  const updateSummary = async (e) => {
    e.preventDefault();
    const body = {
      bookName: bookName,
      pageNo: pageNo,
      collectionName: "PremBook",
      author: currentUser.uid,
      newSummary: newSummary,
    };
    const res = await axios.put("/api/authorUpdate/updateSummary", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res.data);
    getContent();
    setNewSummary("");
  };

  return (
    <div className="summaryContainer">
      <h1>SUMMARY</h1>
      <h4>Page Number {pageNo}</h4>
      <p>{summaryContent}</p>
      <form className="questionForm" onSubmit={updateSummary}>
        <div className="formControl">
          <input
            type="text"
            required
            onChange={(e) => setNewSummary(e.target.value)}
            value={newSummary}
          />
        </div>
        <input
          className="mybtn mybtn--Question"
          type="submit"
          value="Update Summary"
        />
      </form>
      <div className="summary-btns">
        <MyButton
          buttonSize="mybtn--large"
          buttonColor="mybtn--violet"
          onClick={next}
        >
          Questions
        </MyButton>
        <MyButton
          buttonSize="mybtn--large"
          buttonColor="mybtn--violet"
          onClick={prev}
        >
          INDEX
        </MyButton>
      </div>
    </div>
  );
};

export default ABSummary;
