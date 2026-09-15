import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';

function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex((oldIndex) => {
        let currentIndex = oldIndex + 1;
        if (currentIndex > people.length - 1) {
          currentIndex = 0;
        }
        return currentIndex;
      });
    }, 2000);

    return () => clearInterval(slider);
  }, [index]);

  // Обробники для кнопок перемикання
  const nextSlide = () => {
    setIndex((oldIndex) => {
      let currentIndex = oldIndex + 1;
      if (currentIndex > people.length - 1) {
        currentIndex = 0;
      }
      return currentIndex;
    });
  };

  const prevSlide = () => {
    setIndex((oldIndex) => {
      let currentIndex = oldIndex - 1;
      if (currentIndex < 0) {
        currentIndex = people.length - 1;
      }
      return currentIndex;
    });
  };

  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span>reviews
        </h2>
      </div>
      <div className="section-center">
        {people.map((person, personIndex) => {
          const { id, image, name, title, quote } = person;

          let position = 'nextSlide';
          
          if (personIndex === index) {
            position = 'activeSlide';
          }
          
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = 'lastSlide';
          }

          return (
            <article className={position} key={id}>
              <img src={image} alt={name} className="person-img" />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="text">{quote}</p>
              <FaQuoteRight className="icon" />
            </article>
          );
        })}

        <button className="prev" onClick={prevSlide}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={nextSlide}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default App;