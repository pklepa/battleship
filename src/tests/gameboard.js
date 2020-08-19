const _ = require("lodash");

// Gameboard Factory
function Gameboard(Player) {
  const owner = Player;
  let fleet = [];

  // This declaration using .map() is necessary (as in contrast of nesting Array(10).fill(Array(10.fill('')))) as it ensures each row is a separate, independent array, not a reference for the first
  let board = Array(10)
    .fill(0)
    .map(() =>
      Array(10).fill({
        isEmpty: true,
        wasAtacked: false,
      })
    );

  function placeShip(Ship, positionArray) {
    const newBoard = _.cloneDeep(this.board);
    const [row, col] = positionArray;

    fleet = [...fleet, Ship];

    let valid = true;

    for (let i = 0; i < Ship.length; i++) {
      let cell = newBoard[row][col + i];
      if (cell.isEmpty === true) {
        newBoard[row][col + i] = {
          isEmpty: false,
          wasAtacked: false,
          shipIndex: fleet.length - 1,
          shipBodyIndex: i,
        };
      } else {
        valid = false;
      }
    }

    if (valid) {
      this.board = _.cloneDeep(newBoard);
      return true;
    } else {
      return false;
    }
  }

  function getShipAt(positionArray) {
    const [row, col] = positionArray;
    const cell = this.board[row][col];

    const ship = fleet[cell.shipIndex];

    return ship;
  }

  function receiveAttack(positionArray) {
    const [row, col] = positionArray;
    const cellAttacked = this.board[row][col];

    cellAttacked.wasAtacked = true;
    if (cellAttacked.isEmpty) {
      return false;
    } else {
      let ship = fleet[cellAttacked.shipIndex];
      ship.hit(cellAttacked.shipBodyIndex);
      return true;
    }
  }

  function isGameOver() {
    const isGameOver = fleet
      .map((ship) => ship.isSunk())
      .reduce((prev, curr) => prev && curr, true);

    return isGameOver;
  }

  return { board, owner, placeShip, getShipAt, receiveAttack, isGameOver };
}

module.exports = Gameboard;
