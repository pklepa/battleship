import React from "react";

import "./index.css";

// TODO: MessageBoard should display every play made or at least the events of sunk ships
function MessageBoard(props) {
  return (
    <div className="scroller">
      <p>Welcome to Battleship!</p>
      <br></br>
      <p>
        To start playing, position your fleet by clicking in one of the ships in
        the left side, then clicking on the desired position on the grid (or try
        auto-place!).
      </p>
    </div>
  );
}

export default MessageBoard;
