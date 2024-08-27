import Player from "./Player.js";

class PlayerList {
  constructor(players = []) {
    this.players = players.map((player) => new Player(player));
  }

  isPlayerExists(username) {
    return this.players.some((player) => player.username === username);
  }

  getPlayer(username) {
    return this.players.find((player) => player.username === username);
  }

  addPlayer(player) {
    if (!this.isPlayerExists(player.username)) {
      this.players.push(player);
      return true;
    }
    return false;
  }

  modifyPlayerData(username, newHighscore) {
    const player = this.getPlayer(username);
    if (player) {
      player.highscore =
        newHighscore !== undefined ? newHighscore : player.highscore;
      return true;
    }
    return false;
  }

  getTopPlayers() {
    return this.players.sort((a, b) => b.highscore - a.highscore).slice(0, 5);
  }
}

export default PlayerList;
