const assist = require("./assist");
const _ = require("lodash");
const Player = require("../factories/player");
const Ship = require("../factories/ship");
const Gameboard = require("../factories/gameboard");

console.log("hi from temp");

// const p1 = Player("p1");
// const initialBoard = _.cloneDeep(p1.getBoard());
// p1.autoPlaceAll();

// console.log(initialBoard);
// console.log(p1.getBoard());

const p1 = Player("player 1");
p1.autoPlaceAll();

const p2 = Player("Enemy");
p2.autoPlaceAll();
p2.attack(p1);
p2.attack(p1);
p2.attack(p1);
p2.attack(p1);

console.log(p1.name);
console.table(p1.getSimplifiedBoard());

console.log(p2.name);
console.table(p2.getSimplifiedBoard());
