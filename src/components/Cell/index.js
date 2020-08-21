import React from "react";

import "./index.css";

function Cell(props) {
  const { cellObj, onClick, position } = props;

  const occupied = cellObj.isEmpty ? "" : "occupied";
  const attacked = cellObj.wasAttacked ? "attacked" : "";
  const fill = attacked ? "x" : "";

  const classList = `cell ${occupied} ${attacked}`;

  return (
    <div className={classList} onClick={() => onClick(position)}>
      {fill}
    </div>
  );
}

export default Cell;
