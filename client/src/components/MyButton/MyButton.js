import React from "react";
import "./MyButton.css";
import { Link } from "react-router-dom";

const STYLES = ["mybtn--primary", "mybtn--outline"];

const SIZES = ["mybtn--medium", "mybtn--large"];

const COLOR = ["mybtn--white", "mybtn--violet"];

const MyButton = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  buttonColor,
  link,
  disabled,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  const checkButtonColor = COLOR.includes(buttonColor) ? buttonColor : COLOR[0];
  return (
    <Link to={link} className="mybtn-mobile">
      <button
        className={`mybtn ${checkButtonStyle} ${checkButtonSize} ${checkButtonColor}`}
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {children}
      </button>
    </Link>
  );
};

export default MyButton;
