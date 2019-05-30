class Write {
  constructor() {

  }

  printText(color, str, x, y, size = theTextSize, alignH = CENTER, alignV = CENTER) {
    textSize(size);
    textAlign(alignH, alignV);
    fill(color);
    text(str, x, y);
  }

  writeAll() {
    // write player score
    this.printText(
      playerScoreColor,
      `Score: ${player.score}`,
      width / 2,
      theTextSize * 2
    );

    // write duration to eat bullets
    if (effects.eatBulletsEffDurLeft !== 0)
      this.printText(
        eatBulletsEffDurColor,
        `Time left: ${effects.eatBulletsEffDurLeft / 1000}`,
        theTextSize * 2,
        height - theTextSize * 2,
        null,
        LEFT,
        LEFT
      );

    // write rand effect duration
    if (effects.randEffDurLeft !== 0)
      this.printText(
        randEffDurColor,
        `Time left: ${effects.randEffDurLeft / 1000}`,
        width - theTextSize * 2,
        height - theTextSize * 2,
        null,
        RIGHT,
        RIGHT
      );
  }

  writeLeaderboard() {
    leaderboard.sort(compare);
    for (let i = 0; i <= leaderboard.length && i <= 10; i++) {
      if (i === 0) {
        this.printText(
          255,
          'No.  Name  Score',
          width / 2,
          theTextSize * (i + 2) + (i * 20)
        );
      } else {
        this.printText(
          255,
          `${i}. ${leaderboard[i-1].name} ${leaderboard[i-1].score}`,
          width / 2,
          theTextSize * (i + 2) + (i * 20)
        );
      }
    }
  }
}

function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const scoreA = a.score;
  const scoreB = b.score;

  let comparison = 0;
  if (scoreA < scoreB) {
    comparison = 1;
  } else if (scoreA > scoreB) {
    comparison = -1;
  }
  return comparison;
}