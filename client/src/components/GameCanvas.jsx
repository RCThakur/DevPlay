import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import { useNavigate } from "react-router-dom";
import "../styles/GameCanvas.css";

export default function GameCanvas() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [levelComplete, setLevelComplete] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Player";

  useEffect(() => {
    let player, cursors, platforms, codes, stars;
    let scoreText;
    let internalScore = 0;

    const config = {
      type: Phaser.AUTO,
      width: 1024,
      height: 600,
      parent: canvasRef.current,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 500 },
          debug: false,
        },
      },
      scene: { preload, create, update },
    };

    const game = new Phaser.Game(config);

    function preload() {
      this.load.image("sky", "https://labs.phaser.io/assets/skies/space3.png");
      this.load.image(
        "ground",
        "https://labs.phaser.io/assets/sprites/platform.png"
      );
      this.load.image(
        "player",
        "https://labs.phaser.io/assets/sprites/phaser-dude.png"
      );
      this.load.image("code", "https://labs.phaser.io/assets/sprites/coin.png");
      this.load.image(
        "star",
        "https://labs.phaser.io/assets/demoscene/star2.png"
      );
    }

    function create() {
      // Background
      this.add.image(512, 300, "sky").setScale(1.5);

      // Platforms
      platforms = this.physics.add.staticGroup();
      platforms.create(512, 580, "ground").setScale(2).refreshBody();
      platforms.create(200, 400, "ground");
      platforms.create(800, 350, "ground");
      platforms.create(600, 250, "ground");

      // Player
      player = this.physics.add.sprite(100, 450, "player");
      player.setBounce(0.2);
      player.setCollideWorldBounds(true);
      this.physics.add.collider(player, platforms);

      // Collectibles
      codes = this.physics.add.group({
        key: "code",
        repeat: 5,
        setXY: { x: 120, y: 0, stepX: 150 },
      });
      codes.children.iterate((child) => {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      });
      this.physics.add.collider(codes, platforms);
      this.physics.add.overlap(player, codes, collectCode, null, this);

      // Bonus stars
      stars = this.physics.add.group({
        key: "star",
        repeat: 2,
        setXY: { x: 200, y: 0, stepX: 300 },
      });
      this.physics.add.collider(stars, platforms);
      this.physics.add.overlap(player, stars, collectStar, null, this);

      // Input
      cursors = this.input.keyboard.createCursorKeys();

      // Score HUD
      scoreText = this.add.text(16, 16, "Score: 0", {
        fontSize: "24px",
        fill: "#fff",
        fontFamily: "monospace",
      });

      // Collect functions
      function collectCode(player, code) {
        code.disableBody(true, true);
        internalScore += 10;
        scoreText.setText("Score: " + internalScore);
        setScore(internalScore);
        if (internalScore >= 100) setLevelComplete(true);
      }

      function collectStar(player, star) {
        star.disableBody(true, true);
        internalScore += 25;
        scoreText.setText("Score: " + internalScore);
        setScore(internalScore);
        if (internalScore >= 100) setLevelComplete(true);
      }
    }

    function update() {
      if (!cursors || !player) return;
      if (cursors.left.isDown) {
        player.setVelocityX(-200);
      } else if (cursors.right.isDown) {
        player.setVelocityX(200);
      } else {
        player.setVelocityX(0);
      }
      if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-450);
      }
    }

    return () => game.destroy(true);
  }, []);

  return (
    <div className="game-wrapper">
      <div className="dashboard">
        <span>👤 {username}</span>
        <span>⭐ Score: {score}</span>
        <button
          className="restart-btn"
          onClick={() => window.location.reload()}
        >
          Restart Level
        </button>
      </div>

      <div ref={canvasRef} className="game-canvas" />

      {levelComplete && (
        <div className="level-complete">
          <h2>🎉 Level Complete!</h2>
          <p>Great job, {username}! You’re ready for the next challenge.</p>
          <button
            className="next-level-btn"
            onClick={() => navigate("/level2")}
          >
            ➡️ Go to Level 2: Syntax City
          </button>
        </div>
      )}
    </div>
  );
}
