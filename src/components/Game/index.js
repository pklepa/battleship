import React, { useState } from "react";

import "./index.css";

import Board from "../Board";
import * as Player from "../../factories/player";

function Game() {
  const [player, setPlayer] = useState(Player("Player"));
  const [computer, setComputer] = useState(Player("COM"));

  return (
    <div className="game-wrapper">
      <Board player={player.game.board} />
      <Board player={computer.game.board} />

      <button
        onClick={() => {
          console.log(player);
        }}
      >
        hello
      </button>
    </div>
  );
}

export default Game;
