import React, { useEffect, useRef } from "react";
import Phaser from "phaser";

export default function SyntaxCityLevel() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let player,
      cursors,
      platforms,
      movingPlatforms,
      codes,
      enemies,
      scoreText,
      livesText,
      levelText;
    let score = 0;
    let lives = 3;
    let levelComplete = false;
    let gameOver = false;
    let jumpCooldown = 0;

    const config = {
      type: Phaser.AUTO,
      width: 1024,
      height: 600,
      parent: canvasRef.current,
      backgroundColor: "#0a0e27", // Cyberpunk background
      physics: {
        default: "arcade",
        arcade: { gravity: { y: 500 }, debug: false },
      },
      scene: { preload, create, update },
    };

    const game = new Phaser.Game(config);

    function preload() {
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
        "enemy",
        "https://labs.phaser.io/assets/sprites/enemy-bullet.png"
      );
    }

    function create() {
      // 🌆 City Grid Background
      this.add.rectangle(512, 300, 1024, 600, 0x0a0e27);
      for (let i = 0; i < 20; i++) {
        const line = this.add.line(0, i * 30, 0, 0, 1024, 0, 0x00ffff, 0.08);
        line.setOrigin(0, 0);
      }
      for (let i = 0; i < 35; i++) {
        const line = this.add.line(i * 30, 0, 0, 0, 0, 600, 0x00ffff, 0.08);
        line.setOrigin(0, 0);
      }

      // Floating particles
      for (let i = 0; i < 12; i++) {
        const particle = this.add.circle(
          Phaser.Math.Between(0, 1024),
          Phaser.Math.Between(0, 600),
          2,
          0x00ffff,
          0.3
        );
        this.tweens.add({
          targets: particle,
          y: particle.y - 120,
          duration: Phaser.Math.Between(3000, 6000),
          yoyo: true,
          repeat: -1,
          ease: "Sine.easeInOut",
        });
      }

      // 🧱 Platforms
      platforms = this.physics.add.staticGroup();
      platforms.create(512, 590, "ground").setScale(3).refreshBody();
      platforms.create(300, 450, "ground");
      platforms.create(700, 350, "ground");
      platforms.create(150, 300, "ground");
      platforms.create(850, 250, "ground");

      // 🪩 Moving Platforms
      movingPlatforms = this.physics.add.group({
        allowGravity: false,
        immovable: true,
      });
      const mp1 = movingPlatforms
        .create(200, 250, "ground")
        .setScale(0.8)
        .refreshBody();
      mp1.setVelocityX(80);
      const mp2 = movingPlatforms
        .create(600, 200, "ground")
        .setScale(0.6)
        .refreshBody();
      mp2.setVelocityX(-60);

      // 🧍 Player
      player = this.physics.add.sprite(100, 500, "player");
      player.setBounce(0.2);
      player.setCollideWorldBounds(true);
      this.physics.add.collider(player, platforms);
      this.physics.add.collider(player, movingPlatforms);

      // 💾 Collectibles
      codes = this.physics.add.group({
        key: "code",
        repeat: 8,
        setXY: { x: 120, y: 0, stepX: 120 },
      });
      codes.children.iterate((child) => {
        child.setBounceY(Phaser.Math.FloatBetween(0.3, 0.7));
        child.setTint(0x00ff88);
      });
      this.physics.add.collider(codes, platforms);
      this.physics.add.overlap(player, codes, collectCode, null, this);

      // 👾 Enemies
      enemies = this.physics.add.group();
      const e1 = enemies.create(600, 100, "enemy").setTint(0xff3333);
      e1.setBounce(1).setCollideWorldBounds(true).setVelocity(120, 40);

      const e2 = enemies.create(400, 200, "enemy").setTint(0xff3333);
      e2.setBounce(1).setCollideWorldBounds(true).setVelocity(-100, 60);

      const e3 = enemies.create(800, 150, "enemy").setTint(0xff3333);
      e3.setBounce(1).setCollideWorldBounds(true).setVelocity(100, 0);

      this.physics.add.collider(enemies, platforms);
      this.physics.add.overlap(player, enemies, hitEnemy, null, this);

      // 🎮 Input
      cursors = this.input.keyboard.createCursorKeys();

      // 🧮 HUD
      scoreText = this.add.text(16, 16, "Score: 0", {
        fontSize: "20px",
        fill: "#00ffff",
      });
      levelText = this.add.text(16, 45, "Level 2: Syntax City", {
        fontSize: "18px",
        fill: "#ff00ff",
      });
      livesText = this.add.text(16, 70, "Lives: 3", {
        fontSize: "18px",
        fill: "#ff3333",
      });

      // 🏁 Win Zone
      const winZone = this.add.rectangle(950, 200, 100, 50, 0x00ff00, 0.4);
      this.physics.add.existing(winZone, true);
      this.physics.add.overlap(player, winZone, winLevel, null, this);

      // 🪄 Helper Functions
      function collectCode(player, code) {
        code.disableBody(true, true);
        score += 10;
        scoreText.setText(`Score: ${score}`);

        const effect = this.add.circle(code.x, code.y, 15, 0x00ff88, 0.7);
        this.tweens.add({
          targets: effect,
          scale: 2,
          alpha: 0,
          duration: 400,
          onComplete: () => effect.destroy(),
        });

        if (codes.countActive(true) === 0) {
          levelComplete = true;
          showOverlay("Level Complete!", "Proceed to next level?");
        }
      }

      function hitEnemy(player, enemy) {
        if (gameOver) return;
        enemy.disableBody(true, true);
        lives--;
        livesText.setText(`Lives: ${lives}`);
        player.setTint(0xff0000);
        this.time.delayedCall(200, () => player.clearTint());

        if (lives <= 0) {
          gameOver = true;
          showOverlay("Game Over!", "Try Again?");
        } else {
          player.setPosition(100, 500);
        }
      }

      function winLevel() {
        if (!gameOver) {
          gameOver = true;
          showOverlay("🎉 Level Completed!", `Final Score: ${score}`);
          setTimeout(() => (window.location.href = "/dashboard"), 3000);
        }
      }

      function showOverlay(title, subtitle) {
        const overlay = document.createElement("div");
        overlay.className = "game-overlay";
        overlay.innerHTML = `
          <h2>${title}</h2>
          <p>${subtitle}</p>
          <button class="overlay-btn">${
            title.includes("Over") ? "Retry" : "Next"
          }</button>
        `;
        const gameCanvas = document.querySelector(".game-canvas");
        if (gameCanvas) gameCanvas.appendChild(overlay);
        overlay.querySelector("button").onclick = () => {
          title.includes("Over")
            ? window.location.reload()
            : alert("Next Level Coming Soon!");
        };
      }
    }

    function update() {
      if (!cursors || !player || levelComplete || gameOver) return;

      if (jumpCooldown > 0) jumpCooldown--;

      // Move left/right
      if (cursors.left.isDown) player.setVelocityX(-180);
      else if (cursors.right.isDown) player.setVelocityX(180);
      else player.setVelocityX(0);

      // Jump
      if (cursors.up.isDown && jumpCooldown === 0 && player.body.blocked.down) {
        player.setVelocityY(-460);
        jumpCooldown = 15;
      }

      // Moving platforms loop
      movingPlatforms.children.iterate((p) => {
        if (p.x >= 800) p.setVelocityX(-80);
        else if (p.x <= 200) p.setVelocityX(80);
      });

      // Fall off screen
      if (player.y > 600 && !gameOver) {
        lives--;
        if (lives > 0) player.setPosition(100, 500);
        else showOverlay("Game Over!", "Try Again?");
      }
    }

    return () => game.destroy(true);
  }, []);

  return (
    <div
      className="game-canvas"
      ref={canvasRef}
      style={{ width: "100%", height: "600px" }}
    />
  );
}
