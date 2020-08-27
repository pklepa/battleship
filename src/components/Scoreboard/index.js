import React from "react";

import "./index.css";
import Ship from "../Ship";

function Scoreboard(props) {
  const { shipsLoaded } = props;

  return (
    <div className="scoreboard-container">
      <div className="scoreboard-ships">
        {shipsLoaded.map((ship, i) => {
          return (
            <div className="scoreboard-ship">
              <h1>{ship.getName()}</h1>

              <div
                className={`ship-overlay ${ship.isSunk() ? "" : "hidden"}`}
              ></div>

              <Ship
                key={i}
                horizontalOrientation={true}
                length={ship.getLength()}
                onClick={() => {}}
                isSelected={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Scoreboard;
