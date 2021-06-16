import { React, useState } from "react";
import "../../App.css";
import PdfActions from "../PdfActions/PdfActions";
import BookCarousel from "../BookCarousel/BookCarousel";
import HeroSection from "../HeroSection/HeroSection";
import FadeLoader from "react-spinners/FadeLoader";

const Home = () => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <HeroSection />
      <PdfActions />
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
      <BookCarousel setLoading={setLoading} />
    </>
  );
};

export default Home;
