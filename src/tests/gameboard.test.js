import _ from "lodash";

import Ship from "../factories/ship";
import Gameboard from "../factories/gameboard";

it("Gameboard() creates empty 10x10 board", () => {
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

  expect(Gameboard().getBoard()).toEqual(board);
});

it("placeShip inserts Ship into board", () => {
  const gameboard = Gameboard();
  gameboard.placeShip(Ship("Cruiser"), [0, 0]);

  expect(gameboard.getBoard()[0][0]).toMatchObject({
    isEmpty: false,
    shipIndex: 0,
    shipBodyIndex: 0,
  });
});

it("placeShip inserts Ship into board with correct values", () => {
  const gameboard = Gameboard();
  const cruiser = Ship("Cruiser");
  gameboard.placeShip(cruiser, [2, 0]);

  expect(gameboard.getBoard()[2][1]).toMatchObject({
    isEmpty: false,
    shipIndex: 0,
    shipBodyIndex: 1,
  });
});

it("placeShip returns true when sucessful", () => {
  const gameboard = Gameboard();

  expect(gameboard.placeShip(Ship("Cruiser"), [2, 0])).toBe(true);
});

it("placeShip returns false when unsucessful", () => {
  const gameboard = Gameboard();
  const ship1 = Ship("Cruiser");
  const ship2 = Ship("Destroyer");
  gameboard.placeShip(ship1, [2, 0]);

  expect(gameboard.placeShip(ship2, [2, 0])).toBe(false);
});

it("placeShip works for vertical ships", () => {
  const gameboard = Gameboard();
  const ship = Ship("Cruiser");
  ship.changeOrientation();
  gameboard.placeShip(ship, [0, 0]);

  expect(gameboard.getBoard()[1][0]).toMatchObject({
    isEmpty: false,
    shipIndex: 0,
    shipBodyIndex: 1,
  });
});

it("placeShip works independently for different gameboards", () => {
  const gameboard1 = Gameboard();
  const ship1 = Ship("Cruiser");
  gameboard1.placeShip(ship1, [2, 0]);

  const gameboard2 = Gameboard();
  const ship2 = Ship("Destroyer");

  expect(gameboard2.placeShip(ship2, [2, 0])).toBe(true);
});

it("placeShipAtRandom insert ship onto board", () => {
  const gameboard = Gameboard();
  const ship = Ship("Cruiser");
  const initialBoard = gameboard.getBoard();
  gameboard.placeShipAtRandom(ship);

  expect(initialBoard).not.toEqual(gameboard.getBoard());
});

it("getPlacedFleet returns all the ships that were already placed", () => {
  const gameboard = Gameboard();
  const ship1 = Ship("Cruiser");
  const ship2 = Ship("Submarine");
  gameboard.placeShip(ship1, [0, 0]);
  gameboard.placeShip(ship2, [2, 0]);

  expect(gameboard.getPlacedFleet()).toEqual([ship1, ship2]);
});

it("receiveAttack returns true for an allowed attack (cell that wasnt attacked before)", () => {
  const gameboard = Gameboard();

  expect(gameboard.receiveAttack([2, 0])).toBe(true);
});

it("receiveAttack returns false for an attack not allowed (cell that has been attacked before)", () => {
  const gameboard = Gameboard();
  gameboard.receiveAttack([2, 0]);

  expect(gameboard.receiveAttack([2, 0])).toBe(false);
});

it("receiveAttack actually hits the ship inside it", () => {
  const gameboard = Gameboard();
  gameboard.placeShip(Ship("Cruiser"), [0, 0]);
  gameboard.receiveAttack([0, 0]);

  expect(gameboard.getShipAt([0, 0]).getBody()).toEqual([true, false, false]);
});

it("multiple receiveAttacks sinks the ship hit", () => {
  const gameboard = Gameboard();
  gameboard.placeShip(Ship("Cruiser"), [0, 0]);
  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([0, 1]);
  gameboard.receiveAttack([0, 2]);

  expect(gameboard.getShipAt([0, 0]).isSunk()).toBe(true);
});

it("receiveAttack() call with no parameter attacks a random coordinate", () => {
  const gameboard = Gameboard();
  gameboard.placeShip(Ship("Cruiser"), [0, 0]);
  const initialBoard = _.cloneDeep(gameboard.getBoard());
  gameboard.receiveAttack();

  expect(initialBoard).not.toEqual(gameboard.getBoard());
});

it("isGameOver returns false if there are any ships alive", () => {
  const gameboard = Gameboard();
  gameboard.placeShip(Ship("Cruiser"), [0, 0]);
  gameboard.placeShip(Ship("Destroyer"), [3, 0]);
  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([0, 1]);
  gameboard.receiveAttack([0, 2]);

  expect(gameboard.isGameOver()).toBe(false);
});

it("isGameOver returns true if there are no ships left alive", () => {
  const gameboard = Gameboard();
  gameboard.placeShip(Ship("Cruiser"), [0, 0]);
  gameboard.placeShip(Ship("Destroyer"), [3, 0]);
  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([0, 1]);
  gameboard.receiveAttack([0, 2]);

  gameboard.receiveAttack([3, 0]);
  gameboard.receiveAttack([3, 1]);
  gameboard.receiveAttack([3, 2]);

  expect(gameboard.isGameOver()).toBe(true);
});
