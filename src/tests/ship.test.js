import Ship from "./ship";

test("its working", () => {
  expect(1).toBe(1);
});

test("Ship has length", () => {
  expect(Ship("Cruiser").length).toBe(3);
});

test("Ship can be hit", () => {
  expect(Ship("Cruiser").hit(1)).toBe(false);
});

test("Ship has name", () => {
  expect(Ship("Cruiser").name).toBe("Cruiser");
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
