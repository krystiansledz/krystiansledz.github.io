class Food {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.z = 0;

    this.texture = (() =>
      TEXTURES[Math.floor(Math.random() * TEXTURES.length)])();
  }

  static addFood = () => {
    if ((frameCount / FRAME_RATE) % foodSpawnInterval === 1)
      foodArray.push(
        new Food(
          random(-gridSize / 2, gridSize / 2),
          random(-gridSize / 2, gridSize / 2)
        )
      );
  };

  draw() {
    pushAndPop(() => {
      // move to position
      translate(this.x, this.y, foodSize);

      // rotate all the time
      rotateZ((frameCount / FRAME_RATE) * 2);

      texture(this.texture);
      sphere(foodSize);
    });
  }

  pick(x, y) {
    return (
      Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2)) <=
      foodPickRadius
    );
  }
}
