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

  const fleet = [
    Ship("Destroyer"),
    Ship("Submarine"),
    Ship("Cruiser"),
    Ship("Battleship"),
    Ship("Carrier"),
  ];

  function getFleet() {
    return fleet;
  }

  function attack(enemyPlayer, positionArray) {
    return enemyPlayer.receiveAttack(positionArray);
  }

  function autoPlaceAll() {
    fleet.forEach((s) => {
      s.randomizeOrientation();
      this.placeShipAtRandom(s);
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
    getFleet,
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
