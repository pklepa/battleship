import React, { useState } from "react";

import "./index.css";
import Ship from "../Ship";

function Harbour(props) {
  const { handleAutoPlace, handleResetPlacement } = props;
  const [horizontalOrientation, setHorizontalOrientation] = useState(true);
  const [horizontalShips, setHorizontalShips] = useState({
    flexDirection: "column",
  });

  function rotateShipsDisplay() {
    horizontalOrientation
      ? setHorizontalShips({})
      : setHorizontalShips({
          flexDirection: "column",
        });

    setHorizontalOrientation(!horizontalOrientation);
  }

  return (
    <div className="harbour-container">
      <div style={horizontalShips} className="ships">
        <Ship horizontalOrientation={horizontalOrientation} length={5} />
        <Ship horizontalOrientation={horizontalOrientation} length={4} />
        <Ship horizontalOrientation={horizontalOrientation} length={3} />
        <Ship horizontalOrientation={horizontalOrientation} length={3} />
        <Ship horizontalOrientation={horizontalOrientation} length={2} />
      </div>
      <div className="buttons">
        <button onClick={rotateShipsDisplay}>rotate</button>
        <button onClick={handleAutoPlace}>auto place</button>
        <button onClick={handleResetPlacement}>reset</button>
      </div>
    </div>
  );
}

export default Harbour;
