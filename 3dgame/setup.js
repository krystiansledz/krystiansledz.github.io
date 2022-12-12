let player1, player2, foodArray, startTime, secondsLeft, endGameSoundPlayed;

let gameOn = false;

function setup() {
  createCanvas(width, height, WEBGL);

  lights();
  camera(0, gridSize / 2, gridSize * 1.2, 0, 0, 0, 0, 1, 0);
  //   camera(500, 500, 500, 0, 0, 300, 1, 1, 1);
  //   ortho(-width / 1.5, width / 1.5, -height / 1.5, height / 1.5, 0.1, 500);

  BACKGROUND_SHADER = createGraphics(windowWidth, windowHeight, WEBGL);
  BACKGROUND_SHADER.noStroke();

  textFont(FONT);
  textSize(32);

  frameRate(FRAME_RATE);

  player1 = new Ghost(PLAYER_CONTROLS.ARROWS, gridSize / 4, 0, [255, 50, 50]);
  player2 = new Ghost(PLAYER_CONTROLS.WASD, -gridSize / 4, 0, [255, 255, 50]);
  foodArray = [];
  startTime = new Date();
  secondsLeft = gameTime;

  BACKGROUND_MUSIC_SOUND.play();
  BACKGROUND_MUSIC_SOUND.loop();
  BACKGROUND_MUSIC_SOUND.setVolume(0.25);
}

function keyPressed() {
  if (keyCode === 32) {
    if (!gameOn) {
      player1 = new Ghost(
        PLAYER_CONTROLS.ARROWS,
        gridSize / 4,
        0,
        [255, 50, 50]
      );
      player2 = new Ghost(
        PLAYER_CONTROLS.WASD,
        -gridSize / 4,
        0,
        [255, 255, 50]
      );
      foodArray = [];
      startTime = new Date();
      secondsLeft = gameTime;
      gameOn = true;
      START_GAME_SOUND.play();
      endGameSoundPlayed = false;
    }
  }
}
