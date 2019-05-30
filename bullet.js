class Bullet {
  constructor() {
    this.size = bulletSize;
    this.speed = bulletSpeed;
    this.x = 0;
    this.y = 0;
    this.xDir = 0;
    this.yDir = 0;

    if (randomInt(0, 1)) { // 1 x, 0 y
      if (randomInt(0, 1)) { // 1 Left, 0 Right
        this.x = this.size / 2;
        this.xDir = 1;
      } else {
        this.x = width - this.size / 2;
        this.xDir = -1;
      }

      let randY = random(height);
      while (abs(randY - player.y) < player.size * 3)
        randY = random(height);
      this.y = randY;

    } else {
      if (randomInt(0, 1)) { // 1 Up, 0 Down
        this.y = this.size / 2;
        this.yDir = 1;
      } else {
        this.y = height - this.size / 2;
        this.yDir = -1;
      }

      let randX = random(width);
      while (abs(randX - player.x) < player.size * 3)
        randX = random(width);
      this.x = randX;
    }

    this.x = constrain(this.x, this.size, width - this.size);
    this.y = constrain(this.y, this.size, height - this.size);

  }

  show() {
    if (effects.eatBulletsEffDurLeft !== 0) {
      bulletImage = shocked;
    } else {
      bulletImage = sick;
    }
    if (effects.randEff === 4) {
      bulletImage = angry;
    }

    setImage(bulletImage, this.x, this.y, this.size);
  }

  move() {
    this.x = this.x + this.speed * this.xDir;
    this.y = this.y + this.speed * this.yDir;
    if (this.x > width - this.size || this.x < this.size) {
      this.changeDir();
    }
    if (this.y > height - this.size || this.y < this.size) {
      this.changeDir();
    }
  }

  changeDir() {
    this.xDir *= -1;
    this.yDir *= -1;
  }

  changeTurn() {
    if (this.xDir !== 0) {
      this.xDir = 0;
      if (randomInt(0, 1)) {
        this.yDir = 1;
      } else {
        this.yDir = -1;
      }
    } else {
      if (randomInt(0, 1)) {
        this.xDir = 1;
      } else {
        this.xDir = -1;
      }
      this.yDir = 0;
    }
  }
}

function changeBulletsMove() {
  for (let bullet of bullets) {
    if (bullet.x > bullet.size * 2.5 && bullet.x < width - bullet.size * 2.5 && bullet.y > bullet.size * 2.5 && bullet.y < height - bullet.size * 2.5) {
      switch (randomInt(0, 1)) {
        case 0:
          bullet.changeDir();
          break;
        case 1:
          bullet.changeTurn();
          break;
        default:
          break;
      }
    }
  }
}