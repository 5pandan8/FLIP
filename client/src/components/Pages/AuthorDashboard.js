import React from "react";
import { useState } from "react";
import SearchAuthor from "../Author/SearchAuthor/SearchAuthor";
import AuthorBook from "../Author/AuthorBook/AuthorBook";
import axios from "axios";
import Message from "../Message/Message";
import Progress from "../Progress/Progress";
import PDFviewer from "../PDFviewer/PDFviewer";
import MyButton from "../MyButton/MyButton";
import { Form, Card, Alert } from "react-bootstrap";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const AuthorDashboard = () => {
  const { currentUser } = useAuth();

  const [showAuthorBook, setShowAuthorBook] = useState(false);

  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [bookContent, setBookContent] = useState();

  const [book, setBook] = useState();
  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("author", currentUser.uid);

    try {
      const res = await axios.post("/api/upload/author", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        },
      });

      // Clear percentage
      setTimeout(() => setUploadPercentage(0), 10000);

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage("File Uploaded");
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
      setUploadPercentage(0);
    }
  };

  const getContent = async () => {
    setLoading(true);
    const parameters = {
      params: {
        /* bookName: uploadedFile.fileName, */
        bookName: book,
        collectionName: "PremBook",
        author: currentUser.uid,
      },
    };

    try {
      const res = await axios.get("api/authorUpdate/book", parameters, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data[0]) {
        const bookInfo = res.data[0];
        setBookContent(bookInfo);
        setShowAuthorBook(true);
        setLoading(false);
      } else {
        setLoading(false);
        setMsg("Book does not exists");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="ADContainer"
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#f6f6f6",
      }}
    >
      <div className="upload-btn_container">
        <Card
          style={{
            margin: "2% 20% 2% 20%",
            padding: "5%",
            border: "4px solid #0057ff",
          }}
        >
          <Card.Body>
            <h2 className="text-center mb-4">Upload PDF</h2>
            {message ? <Message msg={message} setMsg={setMessage} /> : null}
            <Form onSubmit={onSubmit}>
              <div className="custom-file mb-4">
                <input
                  type="file"
                  className="custom-file-input"
                  id="customFile"
                  onChange={onChange}
                />
                <label className="custom-file-label" htmlFor="customFile">
                  {filename}
                </label>
              </div>

              <Progress percentage={uploadPercentage} />

              <input
                type="submit"
                value="Upload"
                className="btn btn-primary btn-block mt-4"
              />
            </Form>
          </Card.Body>
        </Card>
      </div>
      <SearchAuthor
        getContent={getContent}
        setBook={setBook}
        loading={loading}
        msg={msg}
        setMsg={setMsg}
      />
      {bookContent && (
        <AuthorBook
          showAuthorBook={showAuthorBook}
          setShowAuthorBook={setShowAuthorBook}
          bookContent={bookContent}
          getContent={getContent}
        />
      )}
    </div>
  );
};

export default AuthorDashboard;
