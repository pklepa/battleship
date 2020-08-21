const _ = require("lodash");

const Player = require("../factories/player");
const Ship = require("../factories/ship");

it("testing", () => {
  expect(1).toBe(1);
});

it("Player exposes Gameboard's getBoard method", () => {
  const board = Array(10)
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
  const p1 = Player("p1");
  expect(p1.getBoard()).toEqual(board);
});

it("Player exposes Gameboard's other methods", () => {
  const p1 = Player("p1");

  const ship1 = Ship("Cruiser");
  const ship2 = Ship("Submarine");
  p1.placeShip(ship1, [0, 0]);
  p1.placeShip(ship2, [2, 0]);

  expect(p1.getPlacedFleet()).toEqual([ship1, ship2]);
});

it("Can attack opponent", () => {
  const p1 = Player("p1");
  const p2 = Player("p2");

  p2.placeShip(Ship("Destroyer"), [1, 0]);
  p1.attack(p2, [1, 0]);

  expect(p2.getShipAt([1, 0]).getBody()).toEqual([true, false]);
});

it("Makes random attack if no coordinates are specified", () => {
  const p1 = Player("p1");
  const p2 = Player("p2");
  p2.placeShip(Ship("Destroyer"), [1, 0]);

  const initialBoard = _.cloneDeep(p2.getBoard());
  p1.attack(p2);

  expect(initialBoard).not.toEqual(p2.getBoard());
});

it("Autoplaces all ships", () => {
  const p1 = Player("p1");
  const initialBoard = _.cloneDeep(p1.getBoard());
  p1.autoPlaceAll();

  expect(initialBoard).not.toEqual(p1.getBoard());
});
