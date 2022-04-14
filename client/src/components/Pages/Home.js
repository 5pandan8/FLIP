import { React, useState } from "react";
import "../../App.css";
import PdfActions from "../PdfActions/PdfActions";
import BookCarousel from "../BookCarousel/BookCarousel";
import HeroSection from "../HeroSection/HeroSection";
import FadeLoader from "react-spinners/FadeLoader";

const Home = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div style={{ background: "#f6f6f6" }}>
      {/*Showcase Section */}
      <HeroSection />
      {/*PDF Related actions Section like upload, generate questions, etc*/}
      <PdfActions />
      {/*Loading animation */}
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
      {/*Popular Books List Web Scrape from Goodreads */}
      <BookCarousel setLoading={setLoading} />
    </div>
  );
};

export default Home;
