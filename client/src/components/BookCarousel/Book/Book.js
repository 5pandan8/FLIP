import React from "react";
import "./Book.css";
import { FaStar } from "react-icons/fa";

const Book = ({ img, title, author, rating, description, url }) => {
  /*const imgList = img.split(",");
  var fimg = "";
  if (imgList[3]) {
    fimg = imgList[3].split(" ")[0];
  }*/
  //console.log(img);
  // const fImg = imgList[3].split(" ")[0];
  return (
    <div className="bookCard">
      <a className="bookCard_link" href={url}>
        <figure className="bookCard_pic-wrap" data-category={author}>
          <img className="bookCard_img" src={img} alt="Book Image" />
        </figure>
      </a>
      <div className="bookCard_info">
        <div className="bookCard_title-row">
          <h2 className="bookCard_title">{title}</h2>
          <h5 className="bookCard_rating">
            {rating} <FaStar />
          </h5>
        </div>
        {/* <p className="bookCard_description">{description}</p> */}
      </div>
    </div>
  );
};

export default Book;
