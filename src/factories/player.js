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
      ship.randomizeOrientation();
      this.placeShipAtRandom(ship);
    });
  }

  function getSimplifiedBoard() {
    let simpleBoard = this.getBoard().map((row) => {
      return row.map((cell) => {
        if (cell.wasAttacked && cell.isEmpty) return ".";
        if (cell.wasAttacked && !cell.isEmpty) return "*";
        if (cell.isEmpty === true) return 0;
        else return cell.shipName;
      });
    });

    return simpleBoard;
  }

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
    getSimplifiedBoard,
  };
}

module.exports = Player;
