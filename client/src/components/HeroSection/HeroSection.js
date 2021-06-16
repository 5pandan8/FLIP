import React from "react";
import { FaPlayCircle } from "react-icons/fa";
import MyButton from "../MyButton/MyButton";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div className="hero-container">
      <h1>ADVENTURE AWAITS</h1>
      <p>What are you waitin for?</p>
      <div className="hero-btns">
        <MyButton
          buttonStyle="mybtn--outline"
          buttonSize="mybtn--large"
          link="/tutorial"
        >
          GET STARTED
        </MyButton>
        <MyButton
          buttonStyle="mybtn--primary"
          buttonSize="mybtn--large"
          link="/video"
        >
          WATCH TRAILER <FaPlayCircle style={{ marginLeft: "4px" }} />
        </MyButton>
      </div>
    </div>
  );
};

export default HeroSection;
