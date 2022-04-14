import { React, useState } from "react";
import "./AskQuestion.css";
import DisplayAnswer from "./DisplayAnswer/DisplayAnswer";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";
/* 
What year in war was britain down bad? */
const AskQuestion = ({ bookContent }) => {
  const totalPages = bookContent["pages"].length;

  const [page, setPage] = useState("");

  const [showAnswer, setShowAnswer] = useState(false);
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [questionField, setQuestionField] = useState("");

  const [loading, setLoading] = useState(false);

  const getAnswer = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (page == "" || question == "") {
      alert("Please enter page number and question");
      return;
    }
    console.log("page content" + bookContent["pages"]);
    var reqContent = bookContent["pages"][page - 1]["content"];

    reqContent = reqContent.replace("\n", "").trim();
    reqContent = reqContent.replace(/\s+/g, " ").trim();

    const body = {
      context: reqContent,
      question: question,
    };

    try {
      const res = await axios.post("/api/flip/question", body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resAnswer = res.data["Answer"];
      console.log(resAnswer);
      setAnswer(resAnswer);
      setLoading(false);
      setShowAnswer(true);
      setQuestionField("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="AskQuestionContainer">
        <form onSubmit={getAnswer} className="AskQuestionForm">
          <div className="formControl">
            <label> Enter Page </label>
            <input
              type="number"
              min="1"
              max={totalPages}
              placeholder="Enter Page Number"
              onChange={(e) => {
                setPage(parseInt(e.target.value));
                setShowAnswer(false);
              }}
              value={page}
            />
          </div>
          <div className="formControl">
            <label>Question</label>
            <input
              type="text"
              value={questionField}
              placeholder="Enter Question"
              onChange={(e) => {
                setQuestion(e.target.value);
                setQuestionField(e.target.value);
                setShowAnswer(false);
              }}
            />
          </div>
          <input
            className="btn btn-primary btn-block mt-4"
            type="submit"
            disabled={loading}
            value="Ask Question"
          />
        </form>
      </div>
      {loading && (
        <div
          className="loadingContainer"
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            padding: "6px",
          }}
        >
          <FadeLoader color="#0057ff" loading={loading} size={150} />
          <h2 style={{ color: "#0057ff" }}>loading...</h2>
        </div>
      )}
      {showAnswer && <DisplayAnswer question={question} answer={answer} />}
    </>
  );
};

export default AskQuestion;
