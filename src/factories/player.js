const Gameboard = require("./gameboard");
const Ship = require("./ship");

function Player(playerName) {
  const name = playerName;
  const {
    getBoard,
    getPlacedFleet,
    placeShip,
    placeShipAtRandom,
    getShipAt,
    receiveAttack,
    isGameOver,
  } = Gameboard();

  function attack(enemyPlayer, positionArray) {
    return enemyPlayer.receiveAttack(positionArray);
  }

  // TODO: Make ships to be randomly oriented (coinflip between hor and vert)
  function autoPlaceAll() {
    const ships = [
      "destroyer",
      "submarine",
      "cruiser",
      "battleship",
      "carrier",
    ];

    ships.forEach((s) => {
      const ship = Ship(s);
      this.placeShipAtRandom(ship);
    });
  }

  // TODO: Create a console visualizer for the board ([0, 0, 0, 'cruiser', 'cruiser' ...], [...])
  // TODO: Simulate a game using the console visualizer and attacking enemy board

  return {
    name,
    attack,
    receiveAttack,
    getBoard,
    getPlacedFleet,
    placeShip,
    placeShipAtRandom,
    getShipAt,
    isGameOver,
    autoPlaceAll,
  };
}

module.exports = Player;
