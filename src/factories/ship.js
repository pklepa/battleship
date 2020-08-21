const _ = require("lodash");

// Ship Factory function
function Ship(ship) {
  const { name, body, length } = determineShip(ship);

  let orientation = "horizontal";

  const getName = () => name;
  const getBody = () => body;
  const getLength = () => length;
  const getOrientation = () => orientation;
  const changeOrientation = () =>
    (orientation = orientation === "horizontal" ? "vertical" : "horizontal");

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
      return s.name === _.capitalize(shipName);
    })[0];

    ship.body = Array(ship.length).fill(false);

    return ship;
  }

  function hit(position) {
    body[position] = true;

    return isSunk();
  }

  function isSunk() {
    const isSunk = body.reduce((prev, curr) => {
      return prev && curr;
    }, true);

    return isSunk;
  }

  return {
    getName,
    getLength,
    getBody,
    getOrientation,
    changeOrientation,
    hit,
    isSunk,
  };
}

module.exports = Ship;
