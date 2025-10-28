// ...existing code...
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  return (
    <div className="home-root">
      <header className="nav">
        <div className="brand">
          <Link to="/" className="brand-link">
            DevPlay
          </Link>
        </div>
        <nav className="nav-right">
          <Link to="/signup" className="signup-link">
            Sign Up
          </Link>
        </nav>
      </header>

      <main className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to DevPlay</h1>
          <p className="hero-sub">
            Learn, play and level up your coding skills. Fun challenges, vibrant
            levels, and friendly competition.
          </p>
          <div className="hero-cta">
            <Link to="/signup" className="btn-primary">
              Create Account
            </Link>
            <Link to="/login" className="btn-ghost">
              Login
            </Link>
          </div>
        </div>

        <div className="floaters" aria-hidden>
          <span className="f f1" />
          <span className="f f2" />
          <span className="f f3" />
          <span className="f f4" />
          <span className="f f5" />
        </div>
      </main>

      <footer className="site-footer">
        <div>Contact: hello@devplay.example</div>
        <div>© {new Date().getFullYear()} DevPlay — Built with ❤️</div>
      </footer>
    </div>
  );
}
// ...existing code...
