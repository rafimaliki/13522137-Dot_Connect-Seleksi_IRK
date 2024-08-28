class Player {
  constructor({ username, password, highscores = Array(8).fill(0) }) {
    // console.log("Player", username, password, highscores);
    this.username = username;
    this.password = password;
    this.highscores = highscores;

    // console.log("Player", this);
  }

  isPasswordValid(inputPassword) {
    return this.password === inputPassword;
  }

  getHighscore(index) {
    return this.highscores[index] || 0;
  }

  setHighscore(index, score) {
    if (this.highscores[index] < score) {
      this.highscores[index] = score;

      // return new object coppied
      return new Player({
        username: this.username,
        password: this.password,
        highscores: this.highscores,
      });
    } else {
      return null;
    }
  }
}

export default Player;
