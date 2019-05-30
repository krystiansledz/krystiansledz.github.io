// objects
let player, food, write, effects;

let bullets = [];
// assets
let playerImage,
  backgroundImage,
  bulletImage,
  foodImage,
  burger,
  shocked,
  angry,
  laughing,
  sleepy,
  crazy,
  sick,
  tongue,
  doubleBurger,
  pizza;

// durations
let eatBulletsEffDur, randEffDur, randEffPeriod, changeBulletsMovePeriod;

// variables
let playerName,
  playerSize,
  playerChangeSize,
  playerSpeed,
  playerChangeSpeed,
  foodSize,
  bulletSize,
  bulletChangeSize,
  bulletSpeed,
  bulletChangeSpeed,
  scaleSize,
  theFrameRate,
  theTextSize,
  minNumOfBulletsToEff;

// I don't have idea to name it
let intervals = [];

// booleans
let gameOn,
  gameOver,
  showLeaderboard;

// colors
let playerScoreColor, eatBulletsEffDurColor, randEffDurColor;

// JSON
let leaderboard = [],
  leaderboardURL = "https://api.myjson.com/bins/mje3z",
  leaderboardJSON;

function preload() {
  loadAssets();
  $.get(leaderboardURL, function (data) {
    leaderboardJSON = JSON.stringify(data);
    leaderboard = JSON.parse(leaderboardJSON);
  });

}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(theFrameRate);
  noCursor();

  setVariables();

  // clear previous game
  for (let interval of intervals) {
    clearInterval(interval);
  }
  bullets = [];

  // create objects
  write = new Write();
  effects = new Effects();
  player = new Player(width / 2, height / 2, playerName);
  bullets.push(new Bullet());
  food = new Food();

}

function draw() {
  clear();
  if (keyIsDown(SHIFT)) {
    showLeaderboard = true;
  } else {
    showLeaderboard = false;
  }
  if (showLeaderboard && !gameOn) {
    write.writeLeaderboard();
  } else if (gameOver) {
    write.printText(255, `Your score: ${player.score}\nPress Space To Play\nHold Shift To Show Leaderboard`, width / 2, height / 2 - theTextSize, theTextSize * 2);
  } else if (!gameOn) {
    write.printText(255, 'Press Space To Play\nHold Shift To Show Leaderboard', width / 2, height / 2 - theTextSize, theTextSize * 2);
  } else {
    write.writeAll();

    player.move();
    player.eat();
    player.show();
    player.collision();
    food.show();

    for (let bullet of bullets) {
      bullet.move();
      bullet.show();
    }
  }

}

function keyPressed() {
  // begin play
  if (keyCode === 32) {
    if (!gameOn) {
      setup();
      // set intervals to functions
      setIntervals();
    }
    gameOver = false;
    gameOn = true;
  }

  //debugging
  if (keyCode === 88) {
    print(leaderboard);
  }
}

function loadAssets() {
  //TODO: załadować wszyskie assety
  burger = loadImage('assets/burger.png');
  shocked = loadImage('assets/shocked.png');
  sick = loadImage('assets/sick.png');
  tongue = loadImage('assets/tongue.png');
  doubleBurger = loadImage('assets/doubleBurger.png');
  pizza = loadImage('assets/pizza.png');
  crazy = loadImage('assets/crazy.png');
  angry = loadImage('assets/angry.png');
  laughing = loadImage('assets/laughing.png');
  sleepy = loadImage('assets/sleepy.png');
  backgroundImage = loadImage('assets/backgroundImage.png');
}

function setVariables() {
  // variables
  scaleSize = (window.innerWidth + window.innerHeight) / 3;
  playerSize = scaleSize / 25;
  playerChangeSize = 1.5;
  playerSpeed = scaleSize / 130;
  playerChangeSpeed = 2;
  foodSize = scaleSize / 25;
  bulletSize = scaleSize / 25;
  bulletChangeSize = 1.5;
  bulletSpeed = scaleSize / 200;
  bulletChangeSpeed = 2;
  theFrameRate = 120;
  theTextSize = scaleSize / 20;
  minNumOfBulletsToEff = 6;

  // durations
  // TODO dodać wszystkie durations
  eatBulletsEffDur = 5000;
  randEffDur = 5000;
  randEffPeriod = 10000;
  changeBulletsMovePeriod = 7000;

  // colors
  playerScoreColor = 'rgb(255,255,255)';
  eatBulletsEffDurColor = 'rgb(58, 165, 247)';
  randEffDurColor = 'rgb(252,217,76)';

  // images
  playerImage = tongue;
  bulletImage = sick;
  foodImage = burger;

  // booleans
  if (!gameOn)
    gameOn = false;
  gameOver = false;
}

function gameOverFun() {
  // TODO pomyśleć co dodać w resetgame
  if (playerName == null) {
    playerName = prompt("Please enter your name", "Player");
    if (playerName !== null) {
      player.name = playerName;
    }
  }
  leaderboard.push({
    name: player.name,
    score: player.score
  });
  leaderboardJSON = JSON.stringify(leaderboard);
  $.ajax({
    url: leaderboardURL,
    type: "PUT",
    data: leaderboardJSON,
    contentType: "application/json",
    dataType: "json",
    success: function (data, textStatus, jqXHR) {
      $.get(leaderboardURL, function (data) {
        leaderboardJSON = JSON.stringify(data);
        leaderboard = JSON.parse(leaderboardJSON);
      });
    }
  });

  gameOver = true;
  gameOn = false;
}

function setIntervals() {
  intervals.push(
    setInterval(function () {
      effects.reduceEffDur();
    }, 100)
  );

  intervals.push(setInterval(changeBulletsMove, changeBulletsMovePeriod));

  intervals.push(
    setInterval(function () {
      effects.randomEff();
    }, randEffPeriod)
  );
}

function randomInt(a, b) {
  return int(random(a, b + 1));
}

function setImage(img, x, y, size) {
  image(img, x - size / 2, y - size / 2, size, size);
}

// claer JSON:
/*
let lead = [];
leaderboardJSON = JSON.stringify(lead);
  $.ajax({
    url: 'https://api.myjson.com/bins/mje3z',
    type: "PUT",
    data: leaderboardJSON,
    contentType: "application/json",
    dataType: "json",
    success: function (data, textStatus, jqXHR) {
    }
  });
*/