import Ship from "./ship";
import Gameboard from "./gameboard";

test("Its working", () => {
  expect(1).toBe(1);
});

test("Gameboard() creates empty 10x10 board", () => {
  expect(Gameboard().getBoard()).toEqual(Array(10).fill(Array(10).fill(0)));
});

test("Place a ship in a given coordinate", () => {
  const gameboard = Gameboard();

  expect(gameboard.placeShip(Ship("Cruiser"), [2, 0])).toBe(true);
});
