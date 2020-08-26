import React from "react";

import "./index.css";

function Cell(props) {
  const { cellObj, onClick, position, showShips } = props;

  const occupied = cellObj.isEmpty ? "" : "occupied";
  const attacked = cellObj.wasAttacked ? "attacked" : "";
  const show = showShips ? "show" : "";

  let fill = "";
  if (attacked) {
    if (occupied) fill = "close";
    else fill = "lens";
  }

  const classList = `cell ${occupied} ${attacked} ${show}`;

  return (
    <div className={classList} onClick={() => onClick(position)}>
      <p>{fill}</p>
    </div>
  );
}

export default Cell;
