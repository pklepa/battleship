function Gameboard() {
  const board = Array(10).fill(Array(10).fill(0));

  function getBoard() {
    return board;
  }

  function placeShip(Ship, positionArray) {
    return true;
  }

  return { getBoard, placeShip };
}

export default Gameboard;
