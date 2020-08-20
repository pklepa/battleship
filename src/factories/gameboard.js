const _ = require("lodash");

// Gameboard Factory
function Gameboard(Player) {
  const owner = Player;
  let fleet = [];

  // This declaration using .map() is necessary (as in contrast of nesting Array(10).fill(Array(10.fill('')))) as it ensures each row is a separate, independent array, not a reference for the first
  let board = Array(10)
    .fill(0)
    .map(() =>
      Array(10)
        .fill(0)
        .map(() => {
          return {
            isEmpty: true,
            wasAttacked: false,
          };
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
          wasAttacked: false,
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
    const [row, col] = positionArray || getValidRandomCoordinates(this);

    const cellAttacked = this.board[row][col];

    cellAttacked.wasAttacked = true;
    if (cellAttacked.isEmpty) {
      return false;
    } else {
      let ship = fleet[cellAttacked.shipIndex];
      ship.hit(cellAttacked.shipBodyIndex);
      return true;
    }
  }

  function getValidRandomCoordinates(instance) {
    let valid = false;

    let untestedRows = _.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    let untestedCols = _.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    let row = untestedRows.pop();
    let col = untestedCols.pop();

    let boardCopy = _.cloneDeep(instance.board);

    let cell = boardCopy[row][col];
    let test = cell.wasAttacked;

    while (!valid) {
      if (test === false) {
        valid = true;
      } else {
        if (untestedCols.length > 0) {
          col = untestedRows.pop();
        } else {
          untestedCols = _.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
          col = untestedCols.pop();
          row = untestedRows.pop();
        }
      }

      cell = boardCopy[row][col];
      test = cell.wasAttacked;
    }

    return [row, col];
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
