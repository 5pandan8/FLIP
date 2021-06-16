import React from "react";
import "./PremBook.css";

const PremBook = ({ title, author }) => {
  return (
    <div className="prembookCard">
      <div className="prembookCard_info">
        <h1 className="prembookCard_title">{title}</h1>
        {/*   <h3 className="prembookCard_author">Author Name</h3> */}
      </div>
    </div>
  );
};

export default PremBook;
