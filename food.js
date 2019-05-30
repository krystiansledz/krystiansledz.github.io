class Food {
  constructor() {
    effects.foodEff = 0;
    // giving effect
    if (bullets.length >= minNumOfBulletsToEff) {
      effects.newFoodEff();
    }
    this.x = random(width);
    this.y = random(height);
    this.size = foodSize;

    // keeping food in the canvas
    this.x = constrain(this.x, this.size, width - this.size);
    this.y = constrain(this.y, this.size, height - this.size);
  }

  show() {
    if (effects.foodEff === 0) {
      foodImage = burger;
    } else if (effects.foodEff === 1) {
      foodImage = doubleBurger;
    } else if (effects.foodEff === 2) {
      foodImage = pizza;
    }
    setImage(foodImage, this.x, this.y, this.size);
  }
}