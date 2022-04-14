import { React, useState } from "react";
import "./GenerateSummary.css";
import DisplaySummary from "./DisplaySummary/DisplaySummary";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";

const GenerateSummary = ({ bookContent }) => {
  const totalPages = bookContent["pages"].length;
  const [startPage, setStartPage] = useState("");
  const [endPage, setEndPage] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState("");

  const [loading, setLoading] = useState(false);

  const getSummary = async (e) => {
    e.preventDefault();

    setLoading(true);
    if (startPage > endPage) {
      alert("Please enter valid range of pages");
      return;
    }
    var reqContent = "";
    var i;
    for (i = startPage - 1; i < endPage; i++) {
      var pageContent = bookContent["pages"][i]["content"];
      reqContent += pageContent;
    }
    reqContent = reqContent.replace("\n", "").trim();
    reqContent = reqContent.replace(/\s+/g, " ").trim();

    console.log(reqContent);

    const body = {
      content: reqContent,
    };

    try {
      const res = await axios.post("/api/flip/summary", body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resSummary = res.data["Summary"];
      setSummary(resSummary);
      setLoading(false);
      setShowSummary(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="GenSummaryContainer">
        <form onSubmit={getSummary} className="GenSummaryForm">
          <div className="myformControl">
            <label> Enter Start Page </label>
            <input
              type="number"
              min="1"
              max={totalPages}
              placeholder="Enter Start Page Number"
              onChange={(e) => {
                setStartPage(parseInt(e.target.value));
                setShowSummary(false);
              }}
              value={startPage}
            />
            <label> Enter End Page </label>
            <input
              type="number"
              min="1"
              max={totalPages}
              placeholder="Enter End Page Number"
              onChange={(e) => {
                setEndPage(parseInt(e.target.value));
                setShowSummary(false);
              }}
              value={endPage}
            />
          </div>
          <input
            className="btn btn-primary btn-block mt-4"
            type="submit"
            value="Generate Summary"
            disabled={loading}
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
      {showSummary && (
        <DisplaySummary
          startPage={startPage}
          endPage={endPage}
          summary={summary}
        />
      )}
    </>
  );
};

export default GenerateSummary;
