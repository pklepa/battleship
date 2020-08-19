// Ship Factory function
function Ship(ship) {
  const { name, body, length } = determineShip(ship);

  function determineShip(shipName) {
    const shipList = [
      {
        name: "Destroyer",
        length: 2,
      },
      {
        name: "Submarine",
        length: 3,
      },
      {
        name: "Cruiser",
        length: 3,
      },
      {
        name: "Battleship",
        length: 4,
      },
      {
        name: "Carrier",
        length: 5,
      },
    ];

    const ship = shipList.filter((s) => {
      return s.name === shipName;
    })[0];

    ship.body = Array(ship.length).fill(false);

    return ship;
  }

  function hit(position) {
    this.body[position] = true;

    return this.isSunk();
  }

  function isSunk() {
    const isSunk = this.body.reduce((prev, curr) => {
      return prev && curr;
    }, true);

    return isSunk;
  }

  return { name, length, body, hit, isSunk };
}

module.exports = Ship;
