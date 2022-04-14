import React from "react";
import "./MyButton.css";
import { Link } from "react-router-dom";

const STYLES = ["mybtn--primary", "mybtn--outline"];

const SIZES = ["mybtn--medium", "mybtn--large"];

const MyButton = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  link,
  disabled,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <Link to={link} className="mybtn-mobile">
      <button
        className={`mybtn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
        disabled={disabled}
        style={{
          padding: "8px 20px",
          borderRadius: "2px",
          border: "2px solid #0057ff",
          cursor: "pointer",
        }}
      >
        {children}
      </button>
    </Link>
  );
};

export default MyButton;
