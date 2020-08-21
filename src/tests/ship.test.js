const Ship = require("../factories/ship");

test("Ship has length", () => {
  expect(Ship("Cruiser").getLength()).toBe(3);
});

test("Ship has name", () => {
  expect(Ship("Cruiser").getName()).toBe("Cruiser");
});

test("Ship has an oriatation", () => {
  expect(Ship("Cruiser").getOrientation()).toBe("horizontal");
});

test("Ship can change oriatation", () => {
  const ship = Ship("Cruiser");
  ship.changeOrientation();

  expect(ship.getOrientation()).toBe("vertical");
});

test("Ship random orientation works", () => {
  const orientationArr = [];
  for (let i = 0; i < 100; i++) {
    orientationArr.push(Ship("Cruiser").randomizeOrientation());
  }

  expect(orientationArr).not.toEqual(Array(100).fill("horizontal"));
});

test("Ship can be hit", () => {
  expect(Ship("Cruiser").hit(1)).toBe(false);
});

test("A Ship that has been hit show a damaged body", () => {
  const ship = Ship("Submarine");

  ship.hit(0);

  expect(ship.getBody()).toEqual([true, false, false]);
});

test("Ship doesn't sink after one shot", () => {
  const ship = Ship("Submarine");
  ship.hit(0);

  expect(ship.isSunk()).toBe(false);
});

test("Ship can sink", () => {
  const ship = Ship("Submarine");

  ship.hit(0);
  ship.hit(1);
  ship.hit(2);

  expect(ship.isSunk()).toBe(true);
});
