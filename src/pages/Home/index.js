import React, { useState } from "react";

import "./index.css";

import Board from "../../components/Board";

function Home() {
  return (
    <div id="page-home">
      <div className="content">
        <Board />
        <Board />
      </div>
    </div>
  );
}

export default Home;
