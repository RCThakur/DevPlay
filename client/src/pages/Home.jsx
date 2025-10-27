// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h1>Welcome to DevPlay</h1>
      <Link to="/signup">Sign Up</Link> | <Link to="/login">Login</Link>
    </div>
  );
}
