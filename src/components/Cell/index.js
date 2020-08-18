import React from "react";

import "./index.css";

function Cell(props) {
  const { hit } = props;

  const fill = hit ? "o" : "";

  return <div className="cell">{fill}</div>;
}

export default Cell;
