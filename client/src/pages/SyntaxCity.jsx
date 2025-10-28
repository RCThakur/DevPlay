import React from "react";
import SyntaxCityLevel from "../components/SyntaxCityLevel";
import "../styles/SyntaxCity.css";

export default function SyntaxCity() {
  const username = localStorage.getItem("username") || "Player";

  return (
    <div className="game-wrapper">
      <header className="dashboard">
        <span className="username">👨‍💻 {username}</span>
        <span className="score">💾 Score: 0</span>
        <span className="lives">❤ Lives: 3</span>
        <button
          className="restart-btn"
          onClick={() => window.location.reload()}
        >
          Restart
        </button>
      </header>
      <div className="game-canvas">
        <SyntaxCityLevel />
        <div className="platform-accent" aria-hidden></div>
        <div className="city-vignette" aria-hidden></div>
      </div>
         
    </div>
  );
}
