import React from "react";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const username = localStorage.getItem("username") || "Player";

  return (
    <div className="dashboard-root">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Welcome, {username} 👋</h1>
        <Link to="/login" className="logout-btn">
          Logout
        </Link>
      </header>

      <main className="dashboard-main">
        <section className="level-card">
          <h2>Level 1: Debug Forest</h2>
          <p>
            Start your journey through the Debug Forest. Jump, dodge, and debug!
          </p>
          <Link to="/game" className="play-btn">
            ▶ Play Level 1
          </Link>
        </section>
      </main>

      <footer className="dashboard-footer">
        <p>DevPlay © {new Date().getFullYear()} | Adventure Awaits 💻</p>
      </footer>
    </div>
  );
}
