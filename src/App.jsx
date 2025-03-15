import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./categories.styles.scss";

function App() {
  const categories = [
    {
      id: 1,
      title: "Hats",
    },
    {
      id: 2,
      title: "Shirts",
    },
    {
      id: 3,
      title: "Mens",
    },
    {
      id: 4,
      title: "Womens",
    },
    {
      id: 5,
      title: "Socks",
    },
  ];

  return (
    <div className="categories-container">
      {categories.map(({ id, title }) => (
        <div key={id} className="category-container">
          <div className="background-image"></div>
          <div className="category-body-container">
            <h2>{title}</h2>
            <p>Shop Now!</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
