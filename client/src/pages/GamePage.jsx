import React from "react";
import GameCanvas from "../components/GameCanvas";

export default function GamePage() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
      <GameCanvas />
    </div>
  );
}
