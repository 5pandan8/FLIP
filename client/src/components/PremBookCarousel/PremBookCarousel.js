import { React, useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import PremBook from "./PremBook/PremBook";
import axios from "axios";
import "./PremBookCarousel.css";

const PremBookCarousel = () => {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 500, itemsToShow: 2 },
    { width: 768, itemsToShow: 2 },
    { width: 1200, itemsToShow: 3 },
  ];

  const [books, setBooks] = useState([]);
  const [showBooks, setShowBooks] = useState(false);

  const fetchBooks = async () => {
    const res = await axios.get("/api/flip/allprembook");

    const premBooks = await res.data;

    return premBooks;
  };

  useEffect(() => {
    const getBooks = async () => {
      const premBooks = await fetchBooks();
      setBooks(premBooks);
      setShowBooks(true);
    };
    getBooks();
  }, []);

  return (
    <div className="carousel-container" style={{ marginTop: "4%" }}>
      {showBooks && (
        <Carousel breakPoints={breakPoints}>
          {books.map((book) => (
            <PremBook title={book["BookName"]} author={book["Author"]} />
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default PremBookCarousel;
