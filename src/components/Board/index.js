import React, { useState } from "react";

import "./index.css";

import Cell from "../Cell";

function Board(props) {
  const { player, setPlayer } = props;

  return (
    <div className="gameboard">
      {player.map((row) => {
        return row.map((cell, i) => {
          return <Cell key={i} value={cell} />;
        });
      })}
    </div>
  );
}

export default Board;
