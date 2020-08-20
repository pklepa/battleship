const _ = require("lodash");

const Player = require("./player");
const Ship = require("./ship");

it("testing", () => {
  expect(1).toBe(1);
});

it("Can attack opponent", () => {
  const p1 = Player("p1");
  const p2 = Player("p2");

  p2.game.placeShip(Ship("Destroyer"), [1, 0]);
  p1.attack(p2, [1, 0]);

  expect(p2.game.getShipAt([1, 0])).toMatchObject({
    name: "Destroyer",
    length: 2,
    body: [true, false],
  });
});

it("Makes random attack if no coordinates are specified", () => {
  const p1 = Player("p1");
  const p2 = Player("p2");
  p2.game.placeShip(Ship("Destroyer"), [1, 0]);

  const initialBoard = _.cloneDeep(p2.game.board);
  p1.attack(p2);

  expect(initialBoard).not.toEqual(p2.game.board);
});
