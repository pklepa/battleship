import React from "react";

import "./index.css";

import Header from "../../components/Header";
import Game from "../../components/Game";

function Home() {
  return (
    <div id="page-home">
      <div className="content">
        <Header />
        <Game />
      </div>
    </div>
  );
}

export default Home;
