import { React, useState } from "react";
import "./SearchAuthor.css";
import FadeLoader from "react-spinners/FadeLoader";
import Message from "../../Message/Message";

const SearchAuthor = ({ getContent, setBook, loading, msg, setMsg }) => {
  const [nameBook, setNameBook] = useState("");

  return (
    <>
      <div className="SearchContainer">
        <h1>Search Book</h1>
        {msg && <Message msg={msg} setMsg={setMsg} />}
        <form
          className="searchForm"
          onSubmit={(e) => {
            e.preventDefault();
            getContent();
            setNameBook("");
          }}
        >
          <div className="formControl">
            <label>Book Name</label>
            <input
              type="text"
              placeholder="Enter Book Name"
              required
              onChange={(e) => {
                setBook(e.target.value);
                setNameBook(e.target.value);
              }}
              value={nameBook}
            />
          </div>
          <input
            className="btn btn-primary btn-block mt-4"
            type="submit"
            value="Search"
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
          <FadeLoader color="white" loading={loading} size={150} />
          <h2 style={{ color: "white" }}>loading...</h2>
        </div>
      )}
    </>
  );
};

export default SearchAuthor;
