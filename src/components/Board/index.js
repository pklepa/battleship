import React, { useState } from "react";

import "./index.css";

import Cell from "./Cell";

function Board() {
  const [gameBoard, setGameBoard] = useState(
    Array(10).fill(Array(10).fill(null))
  );

  return (
    <div className="gameboard">
      {gameBoard.map((row) => {
        return row.map((cell, i) => {
          return <Cell key={i} value={cell} />;
        });
      })}
    </div>
  );
}

export default Board;
