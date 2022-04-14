import { React, useState } from "react";
import "./ABQuestionMCQ.css";
import axios from "axios";
import { useAuth } from "../../../../../../contexts/AuthContext";

const ABQuestionMCQ = ({
  index,
  question,
  answer,
  options,
  getContent,
  pageNo,
  bookName,
}) => {
  const { currentUser } = useAuth();
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const [newOption1, setNewOption1] = useState("");
  const [newOption2, setNewOption2] = useState("");
  const [newOption3, setNewOption3] = useState("");

  const optList = [newOption1, newOption2, newOption3];

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
      newOptions: [
        newAnswer == "" ? answer : newAnswer,
        newOption1 == "" ? options[1] : newOption1,
        newOption2 == "" ? options[2] : newOption2,
        newOption3 == "" ? options[3] : newOption3,
      ],
    };
    const res = await axios.put("/api/authorUpdate/updateMCQ", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res.data);
    setNewQuestion("");
    setNewAnswer("");

    setNewOption1("");
    setNewOption2("");
    setNewOption3("");
    getContent();
  };

  return (
    <div className="questionContainer">
      <form className="questionForm" onSubmit={updateQuestion}>
        <div className="formControl">
          <label>
            Q{index} : {question}
          </label>
          <label>Answer : {answer}</label>
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
        {options.map(
          (option, i) =>
            option != answer && (
              <div className="formControl">
                <label>{option}</label>
                <input
                  type="text"
                  placeholder="To update above option"
                  onChange={(e) => {
                    console.log(i);
                    if (i == 1) {
                      setNewOption1(e.target.value);
                    } else if (i == 2) {
                      setNewOption2(e.target.value);
                    } else if (i == 3) {
                      setNewOption3(e.target.value);
                    }
                  }}
                  value={optList[i - 1]}
                />
              </div>
            )
        )}
        <input
          className="btn btn-primary btn-block mt-4"
          type="submit"
          value="Update"
        />
      </form>
    </div>
  );
};

export default ABQuestionMCQ;
