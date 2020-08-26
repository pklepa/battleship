import React from "react";

import "./index.css";
import Cell from "../Cell";

function Ship(props) {
  const { length, horizontalOrientation, onClick } = props;

  const body = Array(length).fill("");

  const styleHorizontal = {
    display: "grid",
    gridTemplateColumns: `repeat(${length}, 34px)`,
    height: 34,
    gap: 2,
    marginBottom: 20,
  };

  const styleVertical = {
    display: "grid",
    gridTemplateRows: `repeat(${length}, 34px)`,
    width: 34,
    gap: 2,
    marginLeft: 20,
  };

  return (
    <div
      style={horizontalOrientation ? styleHorizontal : styleVertical}
      className="ship-component"
      onClick={onClick}
    >
      {body.map((c, i) => {
        return (
          <Cell
            key={i}
            cellObj={{ isEmpty: false, wasAttacked: false }}
            onClick={() => {}}
          />
        );
      })}
    </div>
  );
}

export default Ship;
