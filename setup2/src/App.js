import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
import data from "./data"; // Імпорт локальних даних

const url = "https://course-api.com/react-tours-project";

function App() {
  const [loading, setloading] = useState(true);
  const [tours, setTours] = useState([]);

  const fetchTours = async () => {
    setloading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setloading(false);
      setTours(tours);
    } catch (error) {
      console.log("Помилка завантаження з API, використовуємо data.js:", error);
      setloading(false);
      setTours(data); // Завантажуємо локальний масив
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const removeTour = (id) => {
    const restTour = tours.filter((el) => el.id !== id);
    setTours(restTour);
  };

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button className="btn" onClick={fetchTours}>
            Refresh
          </button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;