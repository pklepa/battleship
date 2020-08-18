import React, { useState } from "react";

import "./index.css";

import Cell from "../../components/Cell";

function Home() {
  const [gameBoard, setGameBoard] = useState(
    Array(10).fill(Array(10).fill(null))
  );

  return (
    <div id="page-home">
      <div className="content">
        <div className="gameboard">
          {gameBoard.map((row) => {
            return row.map((cell) => {
              return <Cell value={cell} />;
            });
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
