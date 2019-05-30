class Player {
  constructor(x, y, name = 'Player') {
    this.x = x;
    this.y = y;
    this.name = name;
    this.size = playerSize;
    this.speed = playerSpeed;
    this.score = 0;
  }

  // player show
  show() {
    if (effects.randEff === 1) {
      playerImage = crazy;
    } else if (effects.randEff === 2) {
      playerImage = sleepy;
    } else if (effects.randEff === 3) {
      playerImage = laughing;
    } else {
      playerImage = tongue;
    }
    setImage(playerImage, this.x, this.y, this.size);
  }

  // player control
  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.speed;
    }

    // keeping player in the canvas
    this.x = constrain(this.x, this.size / 2, width - this.size / 2);
    this.y = constrain(this.y, this.size / 2, height - this.size / 2);
  }

  eat() {
    // checking the distance between player and food
    let d = dist(this.x, this.y, food.x, food.y)
    if (d < this.size / 2 + food.size / 2) {
      effects.checkFoodEff();
      this.score++;
      food = new Food();
      changeBulletsMove();
      bullets.push(new Bullet())
    }
  }

  collision() {
    // checking the distance between player and bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
      let d = dist(this.x, this.y, bullets[i].x, bullets[i].y);
      if (d < this.size / 2 + bullets[i].size / 2) {
        if (effects.eatBulletsEffDurLeft === 0) {
          gameOverFun();
          break;
        } else {
          bullets.splice(i, 1);
          this.score++;
        }
      }
    }
  }
}