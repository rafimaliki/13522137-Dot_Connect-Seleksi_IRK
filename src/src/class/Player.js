class Player {
  constructor(player) {
    this.username = player.username;
    this.password = player.password;
    this.highscore = player.highscore || 0;
  }

  isPasswordValid(inputPassword) {
    return this.password === inputPassword;
  }
}

export default Player;
