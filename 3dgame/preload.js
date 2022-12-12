let FLOOR_TEXTURE;
let WALL_TEXTURE;

let GHOST_MODEL;

let SHADER;
let BACKGROUND_SHADER;

let PUMPKIN_TEXTURE;
let CANDY_TEXTURE;
let CHOCOLATE_TEXTURE;
let MUSHROOM_TEXTURE;
let WAFFLE_TEXTURE;
let WATERMELON_TEXTURE;

const TEXTURES = [];
const pushImageToTextures = (image) => TEXTURES.push(image);

let FONT;

let POINT_SOUND;
let BACKGROUND_MUSIC_SOUND;
let END_GAME_SOUND;
let START_GAME_SOUND;

function preload() {
  FLOOR_TEXTURE = loadImage("assets/floor.jpg");
  WALL_TEXTURE = loadImage("assets/wall.jpg");

  GHOST_MODEL = loadModel("assets/ghost.obj", true);

  SHADER = loadShader(
    "assets/shaders/shader.vert",
    "assets/shaders/shader.frag"
  );

  PUMPKIN_TEXTURE = loadImage("assets/pumpkin.jpg", pushImageToTextures);
  CANDY_TEXTURE = loadImage("assets/candy.jpg", pushImageToTextures);
  CHOCOLATE_TEXTURE = loadImage("assets/chocolate.jpg", pushImageToTextures);
  MUSHROOM_TEXTURE = loadImage("assets/mushroom.jpg", pushImageToTextures);
  WAFFLE_TEXTURE = loadImage("assets/waffle.jpg", pushImageToTextures);
  WATERMELON_TEXTURE = loadImage("assets/watermelon.jpg", pushImageToTextures);

  FONT = loadFont("assets/Arial.ttf");

  BACKGROUND_MUSIC_SOUND = loadSound("assets/sounds/background-music.wav");
  START_GAME_SOUND = loadSound("assets/sounds/start-game.wav");
  END_GAME_SOUND = loadSound("assets/sounds/end-game.wav");
  POINT_SOUND = loadSound("assets/sounds/point.wav");
}
