class Ghost {
  constructor(cotrols, x = 0, y = 0, color = [255, 50, 50]) {
    this.controls = cotrols;
    this.x = x;
    this.y = y;
    this.color = color;

    this.rotation = 0;

    this.score = 0;
  }

  draw() {
    pushAndPop(() => {
      if (gameOn) {
        this.move();
      }

      // move to position
      translate(this.x, this.y, 100 * ratio);

      // rotate to move direciton
      rotateZ(this.rotation + PI);

      scale(playerSize);

      fill(this.color);

      rotateX(PI / 2);

      specularMaterial(30);
      model(GHOST_MODEL);
    });

    this.drawScore();
  }

  // player control
  move() {
    const newRotation = [];
    if (keyIsDown(this.controls.KEY_UP)) {
      this.y -= playerSpeed;
      newRotation.push("U");
    }
    if (keyIsDown(this.controls.KEY_DOWN)) {
      this.y += playerSpeed;
      newRotation.push("D");
    }
    if (keyIsDown(this.controls.KEY_LEFT)) {
      this.x -= playerSpeed;
      newRotation.push("L");
    }
    if (keyIsDown(this.controls.KEY_RIGHT)) {
      this.x += playerSpeed;
      newRotation.push("R");
    }

    // keeping player in the grid
    this.x = constrain(this.x, -gridSize / 2, gridSize / 2);
    this.y = constrain(this.y, -gridSize / 2, gridSize / 2);

    this.rotation = ROTATIONS[newRotation.join("")] ?? this.rotation;
  }

  drawScore() {
    pushAndPop(() => {
      const word = createWord3D(
        `${this.score}`,
        3,
        max(width, height) / 400,
        20,
        true,
        "Arial",
        NORMAL
      );
      fill(this.color);
      specularMaterial(30);
      translate(this.x, this.y, 300 * ratio);
      rotateX(-PI / 2);

      word.show();
    });
  }
}
