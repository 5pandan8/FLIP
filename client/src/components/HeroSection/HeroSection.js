import React from "react";
import { FaPlayCircle } from "react-icons/fa";
import MyButton from "../MyButton/MyButton";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div
      className="hero-container"
      style={{
        background: "url('/images/Home.png') center center/cover no-repeat",
      }}
    >
      <div className="hero-container-content">
        <h1 style={{ color: "#0057FF" }}>ADVENTURE AWAITS</h1>
        <p style={{ color: "#F65868", fontWeight: "bold" }}>
          What are you waiting for?
        </p>
        <div className="hero-btns">
          <MyButton
            buttonStyle="mybtn--primary"
            buttonSize="mybtn--large"
            link="/tutorial"
          >
            GET STARTED
          </MyButton>
          <a
            href="https://viteduin59337-my.sharepoint.com/:v:/g/personal/spandan_patil_vit_edu_in/ET-EHvelC1lNjEGRv_6XiQEBNaBSGV21U7I_thJv1LEFDA?e=FmGKfX"
            className={`mybtn mybtn--outline mybtn--large`}
            style={{
              padding: "8px 20px",
              borderRadius: "2px",
              border: "2px solid #0057ff",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            WATCH TRAILER <FaPlayCircle style={{ marginLeft: "4px" }} />
          </a>
        </div>
      </div>
      <div className="hero-img-container">
        <img src="/images/illustration_1.png" alt="books" />
      </div>
    </div>
  );
};

export default HeroSection;
