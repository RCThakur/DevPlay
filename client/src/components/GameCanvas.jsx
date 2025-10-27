import React, { useEffect, useRef } from "react";
import Phaser from "phaser";

export default function Game() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let player;
    let cursors;
    let platforms;
    let score = 0;
    let scoreText;

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
      scene: {
        preload,
        create,
        update,
      },
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
    }

    function create() {
      // Platforms
      platforms = this.physics.add.staticGroup();
      platforms.create(512, 580, "ground").setScale(2).refreshBody();
      platforms.create(400, 400, "ground");
      platforms.create(700, 300, "ground");

      // Player
      player = this.physics.add.sprite(100, 450, "player");
      player.setBounce(0.2);
      player.setCollideWorldBounds(true);
      this.physics.add.collider(player, platforms);

      // Collectibles
      const codes = this.physics.add.group({
        key: "code",
        repeat: 5,
        setXY: { x: 150, y: 0, stepX: 150 },
      });
      codes.children.iterate((child) => {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      });
      this.physics.add.collider(codes, platforms);
      this.physics.add.overlap(player, codes, collectCode, null, this);

      // Input
      cursors = this.input.keyboard.createCursorKeys();

      // Score HUD
      scoreText = this.add.text(16, 16, "Score: 0", {
        fontSize: "24px",
        fill: "#fff",
      });

      // Collect code function
      function collectCode(player, code) {
        code.disableBody(true, true);
        score += 10;
        scoreText.setText("Score: " + score);
      }
    }

    function update() {
      if (!cursors || !player) return;

      // Horizontal movement
      if (cursors.left.isDown) {
        player.setVelocityX(-160);
      } else if (cursors.right.isDown) {
        player.setVelocityX(160);
      } else {
        player.setVelocityX(0);
      }

      // Jump
      if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-450);
      }
    }

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div ref={canvasRef} style={{ width: "100%", height: "600px" }} />;
}
