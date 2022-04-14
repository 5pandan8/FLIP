import { React, useState } from "react";
import Message from "../Message/Message";
import Progress from "../Progress/Progress";
import PDFviewer from "../PDFviewer/PDFviewer";
import MyButton from "../MyButton/MyButton";
import Assesment from "../Assesment/Assesment";
import { Form, Card } from "react-bootstrap";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";
import SearchAuthor from "../Author/SearchAuthor/SearchAuthor";
import { useAuth } from "../../contexts/AuthContext";
import PremBookCarousel from "../PremBookCarousel/PremBookCarousel";
import { io } from "socket.io-client";

const PdfActions = () => {
  const [ready, setReady] = useState(false);
  const { currentUser } = useAuth();
  const [showViewer, setShowViewer] = useState(false);
  const [showAssesment, setShowAssesment] = useState(false);

  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState();
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [bookContent, setBookContent] = useState();

  const [loading, setLoading] = useState(false);

  const [searchLoading, setSearchLoading] = useState(false);

  const [book, setBook] = useState();

  const [msg, setMsg] = useState();

  const [msgQ, setMsgQ] = useState();

  const socket = io("http://localhost:5000");
  socket.on("connect", () => {
    /* console.log("client connected: " + socket.id); */
  });

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("user", currentUser.uid);

    try {
      const res = await axios.post("/api/upload", formData, {
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

      console.log(fileName);
      console.log(filePath);

      setMessage("File Uploaded");
      setShowViewer(true);
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
      setUploadPercentage(0);
    }
  };

  const getContentPrem = async () => {
    setSearchLoading(true);

    const parameters = {
      params: {
        bookName: book,
        collectionName: "PremBook",
      },
    };

    try {
      const res = await axios.get("/api/authorUpdate/prembook", parameters, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data[0]) {
        const bookInfo = res.data[0];
        setBookContent(bookInfo);
        setSearchLoading(false);
        setShowAssesment(!showAssesment);
      } else {
        setSearchLoading(false);
        setMsg("Book does not exists");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getBookInfo = async () => {
    socket.emit("waiting", socket.id);
    socket.on("waiting-reponse", (value) => {
      console.log("waitin-reponse received");
      getContent();
      setLoading(false);
    });
    setLoading(true);
  };

  const getContent = async () => {
    setLoading(true);

    const parameters = {
      params: {
        bookName: "egypt_history_oluynm2tznsfjl7ovummtzlzlhc3",
        /*bookName: uploadedFile.fileName,*/
        collectionName: "Book",
      },
    };

    try {
      const res = await axios.get("/api/flip/book", parameters, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data[0]) {
        const bookInfo = res.data[0];
        setBookContent(bookInfo);
        setLoading(false);
        setShowAssesment(!showAssesment);
      } else {
        setMsgQ("Please upload pdf");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setMsgQ("Please upload pdf");
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="upload-btn_container" style={{ textAlign: "center" }}>
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
        {showViewer && <PDFviewer bookPath={uploadedFile.filePath} />}
        <PremBookCarousel />
        <SearchAuthor
          getContent={getContentPrem}
          setBook={setBook}
          loading={searchLoading}
          msg={msg}
          setMsg={setMsg}
        />
        {msgQ && <Message msg={msgQ} setMsg={setMsgQ} />}
        {/*Change getContent to getBookInfo */}
        <MyButton
          buttonStyle="mybtn--primary"
          buttonSize="mybtn--large"
          onClick={getContent}
          disabled={loading}
        >
          {loading && (
            <i
              className="fa fa-refresh fa-spin"
              style={{ color: "black", marginRight: "3px" }}
            ></i>
          )}
          Generate Questions
        </MyButton>

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
      </div>
      <Assesment
        showAssesment={showAssesment}
        setShowAssesment={setShowAssesment}
        bookContent={bookContent}
      />
    </div>
  );
};

export default PdfActions;
