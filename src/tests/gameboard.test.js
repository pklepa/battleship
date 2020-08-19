const Ship = require("./ship");
const Gameboard = require("./gameboard");

test("Its working", () => {
  expect(1).toBe(1);
});

test("Gameboard() creates empty 10x10 board", () => {
  const board = Array(10)
    .fill(0)
    .map(() =>
      Array(10).fill({
        isEmpty: true,
        wasAtacked: false,
      })
    );

  expect(Gameboard().board).toEqual(board);
});

test("Gameboard() creates an object with props board, owner", () => {
  const board = Array(10).fill(
    Array(10).fill({
      isEmpty: true,
      wasAtacked: false,
    })
  );

  expect(Gameboard("p1")).toMatchObject({
    board: board,
    owner: "p1",
  });
});

test("placeShip inserts Ship into board", () => {
  const gameboard = Gameboard();
  const cruiser = Ship("Cruiser");
  gameboard.placeShip(cruiser, [2, 0]);

  expect(gameboard.board[2][0]).toMatchObject({
    isEmpty: false,
    ship: cruiser,
    shipPosition: 0,
  });
});

test("placeShip inserts Ship into board with correct values", () => {
  const gameboard = Gameboard();
  const cruiser = Ship("Cruiser");
  gameboard.placeShip(cruiser, [2, 0]);

  expect(gameboard.board[2][1]).toMatchObject({
    isEmpty: false,
    ship: cruiser,
    shipPosition: 1,
  });
});

test("placeShip returns true when sucessful", () => {
  const gameboard = Gameboard();

  expect(gameboard.placeShip(Ship("Cruiser"), [2, 0])).toBe(true);
});

test("placeShip returns false when unsucessful", () => {
  const gameboard = Gameboard();
  const ship1 = Ship("Cruiser");
  const ship2 = Ship("Destroyer");
  gameboard.placeShip(ship1, [2, 0]);

  expect(gameboard.placeShip(ship2, [2, 0])).toBe(false);
});

test("placeShip works independently for different gameboards", () => {
  const gameboard1 = Gameboard();
  const ship1 = Ship("Cruiser");
  gameboard1.placeShip(ship1, [2, 0]);

  const gameboard2 = Gameboard();
  const ship2 = Ship("Destroyer");

  expect(gameboard2.placeShip(ship2, [2, 0])).toBe(true);
});

test("receiveAttack returns true for a successful attack", () => {
  const gameboard = Gameboard();
  gameboard.placeShip(Ship("Cruiser"), [2, 0]);

  expect(gameboard.receiveAttack([2, 0])).toBe(true);
});

test("receiveAttack returns false for a missed attack", () => {
  const gameboard = Gameboard();
  gameboard.placeShip(Ship("Cruiser"), [0, 0]);

  expect(gameboard.receiveAttack([4, 0])).toBe(false);
});

test("receiveAttack actually hits the ship inside it", () => {
  const gameboard = Gameboard();
  gameboard.placeShip(Ship("Cruiser"), [0, 0]);
  gameboard.receiveAttack([0, 0]);

  expect(gameboard.board[0][0].ship.body).toEqual([true, false, false]);
});

test("multiple receiveAttacks sinks the ship hit", () => {
  const gameboard = Gameboard();
  gameboard.placeShip(Ship("Cruiser"), [0, 0]);
  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([0, 1]);
  gameboard.receiveAttack([0, 2]);

  expect(gameboard.board[0][0].ship.isSunk()).toBe(true);
});

test("isGameOver returns false if there are any ships alive", () => {
  const gameboard = Gameboard();
  gameboard.placeShip(Ship("Cruiser"), [0, 0]);
  gameboard.placeShip(Ship("Destroyer"), [3, 0]);
  gameboard.receiveAttack([0, 0]);
  console.log(gameboard.ships);
  console.log(gameboard.board[0][0].ship);

  expect(gameboard.isGameOver()).toBe(false);
});
