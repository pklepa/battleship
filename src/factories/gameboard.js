import _ from "lodash";

// Gameboard Factory
function Gameboard() {
  let placedFleet = [];

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
  const getPlacedFleet = () => placedFleet;

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
      placedFleet = [...placedFleet, Ship];

      let rowOffset = 0;
      let colOffset = 0;
      for (let i = 0; i < Ship.getLength(); i++) {
        if (Ship.getOrientation() === "vertical") rowOffset = i;
        else colOffset = i;

        newBoard[row + rowOffset][col + colOffset] = {
          isEmpty: false,
          wasAttacked: false,
          shipName: Ship.getName(),
          shipIndex: placedFleet.length - 1,
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
      positionArray = getRandomUnattackedCoordinates(board);
      done = isValidPositionForShip(
        positionArray,
        Ship.getLength(),
        Ship.getOrientation()
      );
    }

    placeShip(Ship, positionArray);
  }

  function isValidPositionForShip(positionArray, shipLength, shipOrientation) {
    const [row, col] = positionArray;
    const isVertical = shipOrientation === "vertical";

    // Test if the ship placement is out of bounds
    if (col + shipLength > 10 && !isVertical) return false;
    if (row + shipLength > 10 && isVertical) return false;

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

    const ship = placedFleet[cell.shipIndex];

    return ship;
  }

  function receiveAttack(positionArray) {
    const [row, col] = positionArray || getRandomUnattackedCoordinates(board);

    const cellAttacked = board[row][col];

    if (cellAttacked.wasAttacked) return false;
    else cellAttacked.wasAttacked = true;

    if (!cellAttacked.isEmpty) {
      let ship = placedFleet[cellAttacked.shipIndex];
      ship.hit(cellAttacked.shipBodyIndex);
    }

    return true;
  }

  function getRandomUnattackedCoordinates(boardToAnalize) {
    let validRow, validCol;
    let shuffledRows = _.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    let shuffledCols = _.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    outer: for (const row of shuffledRows) {
      for (const col of shuffledCols) {
        if (!boardToAnalize[row][col].wasAttacked) {
          validRow = row;
          validCol = col;

          break outer;
        }
      }
    }

    return [validRow, validCol];
  }

  function isGameOver() {
    const isGameOver = placedFleet
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

export default Gameboard;
