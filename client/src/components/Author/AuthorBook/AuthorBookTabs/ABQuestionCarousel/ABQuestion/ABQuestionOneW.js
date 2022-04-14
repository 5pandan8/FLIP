import { React, useState } from "react";
import "./ABQuestionOneW.css";
import axios from "axios";
import { useAuth } from "../../../../../../contexts/AuthContext";

const ABQuestionOneW = ({
  index,
  question,
  answer,
  getContent,
  pageNo,
  bookName,
}) => {
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const { currentUser } = useAuth();

  const updateQuestion = async (e) => {
    e.preventDefault();

    const body = {
      bookName: bookName,
      pageNo: pageNo,
      collectionName: "PremBook",
      author: currentUser.uid,
      quesNo: index,
      newQuestion: newQuestion == "" ? question : newQuestion,
      newAnswer: newAnswer == "" ? answer : newAnswer,
    };
    const res = await axios.put("/api/authorUpdate/updateOneW", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res.data);
    setNewQuestion("");
    setNewAnswer("");
    getContent();
  };

  return (
    <div className="questionContainer">
      <form className="questionForm" onSubmit={updateQuestion}>
        <div className="formControl">
          <label>
            Q{index} : {question}
          </label>
          <label>Answer: {answer}</label>
        </div>
        <div className="formControl">
          <label>New Question</label>
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
        </div>
        <div className="formControl">
          <label>New Answer</label>
          <input
            type="text"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
        </div>

        <input
          className="btn btn-primary btn-block mt-4"
          type="submit"
          value="Update"
        />
      </form>
    </div>
  );
};

export default ABQuestionOneW;
