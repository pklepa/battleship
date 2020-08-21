const _ = require("lodash");
const Ship = require("./ship");

// Gameboard Factory
function Gameboard() {
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

  const getBoard = () => board;
  const getPlacedFleet = () => fleet;

  // Returns false for an invalid position and true for a valid position
  function placeShip(Ship, positionArray) {
    // cloneDeep allows for a true copy of an array of arrays ([[], []])
    const newBoard = _.cloneDeep(board);
    const [row, col] = positionArray;

    const valid = isValidPositionForShip(
      positionArray,
      Ship.getLength(),
      Ship.getOrientation()
    );

    if (valid) {
      fleet = [...fleet, Ship];

      let rowOffset = 0;
      let colOffset = 0;
      for (let i = 0; i < Ship.getLength(); i++) {
        if (Ship.getOrientation() === "vertical") rowOffset = i;
        else colOffset = i;

        newBoard[row + rowOffset][col + colOffset] = {
          isEmpty: false,
          wasAttacked: false,
          shipName: Ship.getName(),
          shipIndex: fleet.length - 1,
          shipBodyIndex: i,
        };
      }

      board = _.cloneDeep(newBoard);
      return true;
    } else {
      return false;
    }
  }

  function placeShipAtRandom(Ship) {
    let positionArray;
    let done = false;

    while (!done) {
      positionArray = getRandomEmptyCellCoordinates(board);
      done = isValidPositionForShip(positionArray, Ship.getLength());
    }

    placeShip(Ship, positionArray);
  }

  function isValidPositionForShip(positionArray, shipLength, shipOrientation) {
    const [row, col] = positionArray;
    const isVertical = shipOrientation === "vertical";

    // Test if the ship placement is out of bounds
    if (col + shipLength > 9 && !isVertical) return false;
    if (row + shipLength > 9 && isVertical) return false;

    // Test if the ship will fall onto an occupied spot
    let rowOffset = 0;
    let colOffset = 0;
    for (let i = 0; i < shipLength; i++) {
      if (isVertical) rowOffset = i;
      else colOffset = i;

      let cell = board[row + rowOffset][col + colOffset];
      if (cell.isEmpty) continue;
      else return false;
    }

    // If all is well, return true
    return true;
  }

  function getShipAt(positionArray) {
    const [row, col] = positionArray;
    const cell = board[row][col];

    const ship = fleet[cell.shipIndex];

    return ship;
  }

  function receiveAttack(positionArray) {
    const [row, col] = positionArray || getRandomEmptyCellCoordinates(board);

    const cellAttacked = board[row][col];

    cellAttacked.wasAttacked = true;
    if (cellAttacked.isEmpty) {
      return false;
    } else {
      let ship = fleet[cellAttacked.shipIndex];
      ship.hit(cellAttacked.shipBodyIndex);
      return true;
    }
  }

  function getRandomEmptyCellCoordinates(boardToAnalize) {
    let valid = false;

    let untestedRows = _.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    let untestedCols = _.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    let row = untestedRows.pop();
    let col = untestedCols.pop();

    let cell = boardToAnalize[row][col];
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

      cell = boardToAnalize[row][col];
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

  return {
    getBoard,
    getPlacedFleet,
    placeShip,
    placeShipAtRandom,
    getShipAt,
    receiveAttack,
    isGameOver,
  };
}

module.exports = Gameboard;