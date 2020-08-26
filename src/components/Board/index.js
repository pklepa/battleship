import React from "react";

import "./index.css";

import Cell from "../Cell";

function Board(props) {
  const { name, board, onClick, showShips, disableBoard } = props;

  return (
    <div className="board-container">
      <div className={`board-overlay ${disableBoard ? "" : "hidden"}`}></div>

      <div className="gameboard">
        {board.map((row, i) => {
          return row.map((cell, j) => {
            return (
              <Cell
                key={j}
                cellObj={cell}
                onClick={onClick}
                position={[i, j]}
                showShips={showShips}
              />
            );
          });
        })}
      </div>

      <div className="board-footer">
        <h1>{name}</h1>
      </div>
    </div>
  );
}

export default Board;
