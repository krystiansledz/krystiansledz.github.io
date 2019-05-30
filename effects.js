class Effects {
  constructor() {
    this.eatBulletsEffDurLeft = 0;
    this.randEffDurLeft = 0;
    // TODO: dodac efekty
    // rand effects:
    // 0 - normal
    // 1 - 
    // 2 -
    // 3 -
    // 4 -
    // 5 -
    // 6 -
    // 7 -
    this.randEff = 0;
    // food effects:
    // 0 - normal 
    // 1 - eat bullets
    // 2 - kill all bullets
    this.foodEff = 0;
  }

  newFoodEff() {
    let randInt = randomInt(1, 100);
    if (randInt === 100) {
      this.foodEff = 2;
    } else if (randInt >= 79) {
      this.foodEff = 1;
    } else {
      this.foodEff = 0;
    }
  }

  // TODO porpawic image na buletach jak mozna je jesc i sie zjado kilka razy

  checkFoodEff() {
    if (this.foodEff === 2) {
      player.score += bullets.length;
      bullets = [];
    } else if (this.foodEff === 1) {
      this.eatBulletsEffDurLeft += eatBulletsEffDur;
      player.size *= playerChangeSize;
      setTimeout(function () {
        player.size /= playerChangeSize;
      }, eatBulletsEffDur);
    }
  }

  randomEff() {
    this.randEffDurLeft += randEffDur;
    // TODO: nowe bullety taka sama wielkosc i predkosc
    // Mozna w przyszlosci dodac prawdopodobienstwo tak jak przy newFoodEff()
    this.randEff = randomInt(1, 7);

    if (this.randEff === 1) {
      player.speed *= -1;
      setTimeout(function () {
        player.speed *= -1;
      }, randEffDur);
    } else if (this.randEff === 2) {
      player.speed /= playerChangeSpeed;
      setTimeout(function () {
        player.speed *= playerChangeSpeed;
      }, randEffDur);
    } else if (this.randEff === 3) {
      player.speed *= playerChangeSpeed;
      setTimeout(function () {
        player.speed /= playerChangeSpeed;
      }, randEffDur);
    } else if (this.randEff === 4) {
      bulletSpeed *= bulletChangeSpeed;
      for (let bullet of bullets) {
        bullet.speed *= bulletChangeSpeed;
      }
      setTimeout(function () {
        bulletSpeed /= bulletChangeSpeed;
        for (let bullet of bullets) {
          bullet.speed /= bulletChangeSpeed;
        }
      }, randEffDur);

    } else if (this.randEff === 5) {
      bulletSpeed /= bulletChangeSpeed;
      for (let bullet of bullets) {
        bullet.speed /= bulletChangeSpeed;
      }
      setTimeout(function () {
        bulletSpeed *= bulletChangeSpeed;
        for (let bullet of bullets) {
          bullet.speed *= bulletChangeSpeed;
        }
      }, randEffDur);
    } else if (this.randEff === 6) {
      bulletSize *= bulletChangeSize;
      for (let bullet of bullets) {
        bullet.size *= bulletChangeSize;
      }
      setTimeout(function () {
        bulletSize /= bulletChangeSize;
        for (let bullet of bullets) {
          bullet.size /= bulletChangeSize;
        }
      }, randEffDur);
    } else if (this.randEff === 7) {
      player.size *= playerChangeSize;
      setTimeout(function () {
        player.size /= playerChangeSize;
      }, randEffDur);
    }
  }

  reduceEffDur() {
    if (this.eatBulletsEffDurLeft !== 0) {
      this.eatBulletsEffDurLeft -= 100;
    }

    if (this.randEffDurLeft !== 0) {
      this.randEffDurLeft -= 100;
    } else {
      this.randEff = 0;
    }
  }

}