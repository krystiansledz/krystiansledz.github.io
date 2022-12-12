const FRAME_RATE = 60;

// canvas
const width = window.innerWidth;
const height = window.innerHeight;
const gridSize = Math.round((Math.max(width, height) * 0.7) / 100) * 100;

// draw elements
const ratio = (0.3 * gridSize) / 600;

const wallSize = 390 * ratio;
const wallThickness = 150 * ratio;
const lanternThickness = wallThickness / 8;
const lanternHeight = 3 * wallSize;
const lanternRadius = lanternThickness * 5;

// light
const lightColor = [255, 255, 200];
const changeLightsInterval = 5;

// game
const gameTime = 20;

// player
const playerSpeed = gridSize / FRAME_RATE / 3;
const playerSize = (0.3 * gridSize) / 600;

// food
const foodSize = ratio * 50;
const foodSpawnInterval = 3;
const foodPickRadius = (foodSize + playerSize) * 2;

// helpers

const ROTATIONS = {
  DL: Math.PI / 4,
  L: Math.PI / 2,
  UL: Math.PI / 4 + Math.PI / 2,
  U: Math.PI,
  UR: Math.PI + Math.PI / 4,
  R: Math.PI + Math.PI / 2,
  DR: Math.PI + Math.PI / 2 + Math.PI / 4,
  D: 0,
};

const PLAYER_CONTROLS = {
  ARROWS: {
    KEY_UP: 38,
    KEY_DOWN: 40,
    KEY_LEFT: 37,
    KEY_RIGHT: 39,
  },
  WASD: {
    KEY_UP: 87,
    KEY_DOWN: 83,
    KEY_LEFT: 65,
    KEY_RIGHT: 68,
  },
};
