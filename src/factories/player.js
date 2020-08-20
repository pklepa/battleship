const Gameboard = require("./gameboard");

function Player(playerName) {
  const name = playerName;
  const game = Gameboard(name);

  function attack(enemyPlayer, positionArray) {
    return enemyPlayer.game.receiveAttack(positionArray);
  }

  return { name, game, attack };
}

module.exports = Player;
