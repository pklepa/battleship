// Ship Factory function
function Ship(ship) {
  const name = ship;
  const body = Array(determineSize(name)).fill(false);
  const length = body.length;

  function hit(position) {
    body[position] = true;

    return isSunk();
  }

  function isSunk() {
    return body.reduce((prev, curr) => {
      return prev && curr;
    }, true);
  }

  function determineSize(name) {
    const nameList = [
      "Destroyer",
      "Submarine",
      "Cruiser",
      "Battleship",
      "Carrier",
    ];

    return nameList.indexOf(name) + 1;
  }

  return { name, length, hit, isSunk };
}

export default Ship;
