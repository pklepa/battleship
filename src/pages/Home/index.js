import React, { useState } from "react";

import "./index.css";

import Game from "../../components/Game";

function Home() {
  return (
    <div id="page-home">
      <div className="content">
        <Game />
      </div>
    </div>
  );
}

export default Home;
