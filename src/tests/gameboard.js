const _ = require("lodash");

// Gameboard Factory
function Gameboard(Player) {
  const owner = Player;
  let ships = [];

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

    let valid = true;

    for (let i = 0; i < Ship.length; i++) {
      let cell = newBoard[row][col + i];
      if (cell.isEmpty === true) {
        newBoard[row][col + i] = {
          isEmpty: false,
          wasAtacked: false,
          ship: Ship,
          shipPosition: i,
        };
      } else {
        valid = false;
      }
    }

    if (valid) {
      this.board = _.cloneDeep(newBoard);
      this.ships = [...ships, Ship];
      return true;
    } else {
      return false;
    }
  }

  function receiveAttack(positionArray) {
    const [row, col] = positionArray;
    const cellAttacked = this.board[row][col];

    cellAttacked.wasAtacked = true;
    if (cellAttacked.isEmpty) {
      return false;
    } else {
      cellAttacked.ship.hit(cellAttacked.shipPosition);
      return true;
    }
  }

  return { board, owner, placeShip, receiveAttack };
}

module.exports = Gameboard;
