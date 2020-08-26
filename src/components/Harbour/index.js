import React, { useState } from "react";

import "./index.css";
import Ship from "../Ship";

function Harbour(props) {
  const {
    shipsToLoad,
    prepareManualPlace,
    handleAutoPlace,
    handleResetPlacement,
    handleHarbourRotation,
  } = props;
  const [horizontalOrientation, setHorizontalOrientation] = useState(true);
  const [horizontalShips, setHorizontalShips] = useState({
    flexDirection: "column",
  });

  // TODO: This function should change the orientation of all ships
  function rotateShipsDisplay() {
    setHorizontalOrientation(!horizontalOrientation);
    setHorizontalShips(
      horizontalOrientation ? {} : { flexDirection: "column" }
    );

    handleHarbourRotation();
  }

  return (
    <div className="harbour-container">
      <div style={horizontalShips} className="ships">
        {shipsToLoad.map((ship, i) => {
          return (
            <Ship
              key={i}
              horizontalOrientation={horizontalOrientation}
              length={ship.getLength()}
              onClick={() => prepareManualPlace(ship)}
            />
          );
        })}
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
