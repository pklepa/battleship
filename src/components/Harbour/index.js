import React, { useState } from "react";

import "./index.css";
import Ship from "../Ship";

function Harbour(props) {
  const {
    shipsToLoad,
    shipsLoaded,
    prepareManualPlace,
    handleAutoPlace,
    handleResetPlacement,
    handleHarbourRotation,
  } = props;
  const [horizontalOrientation, setHorizontalOrientation] = useState(true);
  const [horizontalShips, setHorizontalShips] = useState({
    flexDirection: "column",
  });
  const [selectedShip, setSelectedShip] = useState(false);

  function rotateShipsDisplay() {
    setHorizontalOrientation(!horizontalOrientation);
    setHorizontalShips(
      horizontalOrientation ? {} : { flexDirection: "column" }
    );

    handleHarbourRotation();
  }

  function handleClick(ship) {
    // If the clicked ship is placed on the board already, ignore click
    if (shipsLoaded.indexOf(ship) > -1) return;

    if (selectedShip === ship) setSelectedShip(false);
    else setSelectedShip(ship);

    prepareManualPlace(ship);
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
              onClick={() => handleClick(ship)}
              isSelected={
                selectedShip === ship || shipsLoaded.indexOf(ship) > -1
              }
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
