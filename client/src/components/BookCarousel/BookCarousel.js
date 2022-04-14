import { React, useEffect, useState } from "react";
//import './BookCarousel.css'
import Carousel from "react-elastic-carousel";
import Book from "./Book/Book";
import axios from "axios";
import "./BookCarousel.css";

const BookCarousel = ({ setLoading }) => {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 500, itemsToShow: 2 },
    { width: 768, itemsToShow: 2 },
    { width: 1200, itemsToShow: 3 },
  ];

  const [books, setBooks] = useState([]);
  const [showBooks, setShowBooks] = useState(false);

  const fetchBooks = async () => {
    const res = await axios.get("api/flip/popularBooks");

    const booksInfo = await res.data;
    const popBooks = booksInfo["PopularBooks"];

    return popBooks;
  };

  useEffect(() => {
    const getBooks = async () => {
      const popBooks = await fetchBooks();
      setBooks(popBooks);
      setLoading(false);
      setShowBooks(true);
    };
    getBooks();
  }, []);

  return (
    <div className="carousel-container" style={{ marginTop: "4%" }}>
      {showBooks && (
        <Carousel breakPoints={breakPoints}>
          {books.map((book) => (
            <Book
              img={book["Img"]}
              title={book["Title"]}
              author={book["Author"]}
              rating={book["Rating"]}
              description={book["Description"]}
              url={book["Link"]}
            />
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default BookCarousel;
