import React from "react";

import "./index.css";

import Cell from "../Cell";

function Board(props) {
  const { board, onClick } = props;

  return (
    <div className="board-container">
      <div className="board-header"></div>

      <div className="gameboard">
        {board.map((row, i) => {
          return row.map((cell, j) => {
            return (
              <Cell
                key={j}
                cellObj={cell}
                onClick={onClick}
                position={[i, j]}
              />
            );
          });
        })}
      </div>
    </div>
  );
}

export default Board;
