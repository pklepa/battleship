import React from "react";

import "./index.css";

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
