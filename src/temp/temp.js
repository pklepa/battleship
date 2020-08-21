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

const gb = Gameboard();
const ship = Ship("Carrier");
gb.placeShipAtRandom(ship);
