import React from "react";

import "./index.css";

function Cell(props) {
  const { cellObj, onClick, position } = props;

  const occupied = cellObj.isEmpty ? "" : "occupied";
  const attacked = cellObj.wasAttacked ? "attacked" : "";
  let fill = "";
  if (attacked) {
    if (occupied) fill = "close";
    else fill = "lens";
  }

  const classList = `cell ${occupied} ${attacked}`;

  return (
    <div className={classList} onClick={() => onClick(position)}>
      <p>{fill}</p>
    </div>
  );
}

export default Cell;
