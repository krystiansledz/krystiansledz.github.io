function draw() {
  if (secondsLeft <= 0) {
    gameOn = false;
  }

  background(0);
  noStroke();
  orbitControl(0, 1, 0);

  useLight();

  drawBackgroundShader();
  drawFloor();
  drawWalls();
  drawLanterns();

  if (gameOn) {
    Food.addFood();
    drawTime();
  }

  player1.draw();
  player2.draw();

  foodArray.forEach((food, index) => {
    food.draw();
    [player1, player2].forEach((player) => {
      if (food.pick(player.x, player.y)) {
        foodArray.splice(index, 1);
        player.score++;
        POINT_SOUND.play();
      }
    });
  });

  if (!gameOn) {
    if (secondsLeft <= 0) {
      printFinalScore();
      if (!endGameSoundPlayed) {
        END_GAME_SOUND.play();
        endGameSoundPlayed = true;
      }
    } else {
      printPlayGame();
    }
  }
}

const useLight = () => {
  lightFalloff(0.002 / ratio, 0.0001 / ratio, 0.0000005 / ratio);

  if (
    frameCount % (2 * FRAME_RATE * changeLightsInterval) <
    FRAME_RATE * changeLightsInterval
  ) {
    // TL
    pointLight(
      lightColor,
      -(gridSize + 2 * wallThickness) / 2,
      -(gridSize + 2 * wallThickness) / 2,
      lanternHeight
    );
    // BR
    pointLight(
      lightColor,
      (gridSize + 2 * wallThickness) / 2,
      (gridSize + 2 * wallThickness) / 2,
      lanternHeight
    );
  } else {
    // TR
    pointLight(
      lightColor,
      (gridSize + 2 * wallThickness) / 2,
      -(gridSize + 2 * wallThickness) / 2,
      lanternHeight
    );
    // BL
    pointLight(
      lightColor,
      -(gridSize + 2 * wallThickness) / 2,
      (gridSize + 2 * wallThickness) / 2,
      lanternHeight
    );
  }
};

const drawBackgroundShader = () => {
  pushAndPop(() => {
    BACKGROUND_SHADER.shader(SHADER);
    SHADER.setUniform("u_resolution", [width / 30, height / 30]);
    SHADER.setUniform("u_time", millis() / 300.0);
    SHADER.setUniform("u_mouse", [
      frameCount,
      map(frameCount, 0, height, height, 0),
    ]);
    translate(-gridSize, gridSize, -300);
    BACKGROUND_SHADER.rect(-5 * width, -5 * width, width, height);
    image(BACKGROUND_SHADER, -5 * width, -5 * width, 10 * width, 10 * height);
  });
};

const drawFloor = () => {
  pushAndPop(() => {
    texture(FLOOR_TEXTURE);

    pushAndPop(() => {
      translate(-gridSize / 4, -gridSize / 4);
      plane(gridSize / 2, gridSize / 2);
    });

    pushAndPop(() => {
      translate(-gridSize / 4, gridSize / 4);
      plane(gridSize / 2, gridSize / 2);
    });

    pushAndPop(() => {
      translate(gridSize / 4, gridSize / 4);
      plane(gridSize / 2, gridSize / 2);
    });

    pushAndPop(() => {
      translate(gridSize / 4, -gridSize / 4);
      plane(gridSize / 2, gridSize / 2);
    });
  });
};

const drawWalls = () => {
  pushAndPop(() => {
    texture(WALL_TEXTURE);

    // top
    pushAndPop(() => {
      translate(0, -(gridSize + wallThickness) / 2);
      box(gridSize + 2 * wallThickness, wallThickness, wallSize);
    });

    // left
    pushAndPop(() => {
      translate(-(gridSize + wallThickness) / 2, 0);
      box(wallThickness, gridSize, wallSize);
    });

    // right
    pushAndPop(() => {
      translate((gridSize + wallThickness) / 2, 0);
      box(wallThickness, gridSize, wallSize);
    });

    // bottom
    pushAndPop(() => {
      translate(0, (gridSize + wallThickness) / 2);
      box(gridSize + 2 * wallThickness, wallThickness, wallSize);
    });
  });
};

const drawLantern = () => {
  pushAndPop(() => {
    ambientMaterial(130);
    translate(0, 0, wallSize * 0.7);

    pushAndPop(() => {
      rotateX(HALF_PI);
      cylinder(lanternThickness, lanternHeight / 4);
    });

    translate(0, 0, lanternRadius / 2);

    sphere(lanternRadius);
  });
};

const drawLanterns = () => {
  pushAndPop(() => {
    translate(
      -(gridSize + wallThickness) / 2,
      -(gridSize + wallThickness) / 2,
      0
    );
    drawLantern();
  });
  pushAndPop(() => {
    translate(
      (gridSize + wallThickness) / 2,
      -(gridSize + wallThickness) / 2,
      0
    );
    drawLantern();
  });
  pushAndPop(() => {
    translate(
      -(gridSize + wallThickness) / 2,
      (gridSize + wallThickness) / 2,
      0
    );
    drawLantern();
  });
  pushAndPop(() => {
    translate(
      (gridSize + wallThickness) / 2,
      (gridSize + wallThickness) / 2,
      0
    );
    drawLantern();
  });
};

const drawTime = () => {
  const currentTime = new Date();
  secondsLeft =
    gameTime -
    Math.floor(Math.abs(startTime.getTime() - currentTime.getTime()) / 1000);
  pushAndPop(() => {
    const word = createWord3D(
      `${secondsLeft}`,
      2,
      max(width, height) / 200,
      20,
      true,
      "Arial",
      BOLD
    );
    fill(255);
    specularMaterial(255);
    translate(0, -gridSize / 2, wallSize);
    rotateX(-PI / 2);

    word.show();
  });
};

const printFinalScore = () => {
  pushAndPop(() => {
    const word = createWord3D(
      `END!`,
      2,
      max(width, height) / 400,
      20,
      true,
      "Arial",
      BOLD
    );
    fill(255);
    specularMaterial(255);
    translate(0, 0, 400 * ratio);

    word.show();
  });
  [player2, player1].forEach((player, index) => {
    pushAndPop(() => {
      const word = createWord3D(
        `${player.score}`,
        2,
        max(width, height) / 400,
        20,
        true,
        "Arial",
        BOLD
      );
      fill(player.color);
      specularMaterial(30);
      translate((width / 2) * 0.9 * (index === 0 ? -1 : 1), 0, 400 * ratio);

      word.show();
    });
  });
};

const printPlayGame = () => {
  pushAndPop(() => {
    const word = createWord3D(
      `PRESS`,
      2,
      max(width, height) / 400,
      20,
      true,
      "Arial",
      BOLD
    );
    fill(255);
    specularMaterial(255);
    translate(0, -ratio * 150, 400 * ratio);

    word.show();
  });
  pushAndPop(() => {
    const word = createWord3D(
      `SPACE`,
      2,
      max(width, height) / 400,
      20,
      true,
      "Arial",
      BOLD
    );
    fill(0, 255, 0);
    specularMaterial(100);
    translate(0, 0, 400 * ratio);

    word.show();
  });
  pushAndPop(() => {
    const word = createWord3D(
      `TO PLAY!`,
      2,
      max(width, height) / 400,
      20,
      true,
      "Arial",
      BOLD
    );
    fill(255);
    specularMaterial(255);
    translate(0, ratio * 150, 400 * ratio);

    word.show();
  });
};
