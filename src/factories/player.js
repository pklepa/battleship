import Ship from "./ship";
import Gameboard from "./gameboard";

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
    Ship("Carrier"),
    Ship("Battleship"),
    Ship("Cruiser"),
    Ship("Submarine"),
    Ship("Destroyer"),
  ];

  function getFleet() {
    return fleet;
  }

  function attack(enemyPlayer, positionArray) {
    return enemyPlayer.receiveAttack(positionArray);
  }

  function autoPlaceAll() {
    const placedFleet = this.getPlacedFleet();
    const unplacedFleet = fleet.filter((ship) => {
      return placedFleet.indexOf(ship) === -1;
    });

    unplacedFleet.forEach((s) => {
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

export default Player;

// module.exports = Player;
