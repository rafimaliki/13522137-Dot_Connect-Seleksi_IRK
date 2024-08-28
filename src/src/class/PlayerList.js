import Player from "./Player";

class PlayerList {
  constructor(players = []) {
    this.players = players.map((player) => new Player(player));
  }

  getTopScore(index) {
    return Math.max(
      ...this.players.map((player) => player.getHighscore(index))
    );
  }

  getTopPlayers(index) {
    return this.players
      .slice()
      .sort((a, b) => b.getHighscore(index) - a.getHighscore(index))
      .slice(0, 5); // Get top 5 players
  }

  getPlayer(username) {
    return this.players.find((player) => player.username === username);
  }

  updatePlayerData(player) {
    const index = this.players.findIndex(
      (existingPlayer) => existingPlayer.username === player.username
    );

    if (index !== -1) {
      this.players[index] = player;
      return new PlayerList(this.players);
    } else {
      return false;
    }
  }

  addPlayer(player) {
    if (
      this.players.some(
        (existingPlayer) => existingPlayer.username === player.username
      )
    ) {
      return null;
    }

    this.players.push(player);

    return new PlayerList(this.players);
  }
}

export default PlayerList;
