import React from "react";

import "./index.css";
import { ReactComponent as Logo } from "../../assets/images/port.svg";

function Header() {
  const style = {
    width: 60,
    height: 60,
    backgroundColor: "fdcb9e",
    borderRadius: 50,
    padding: 5,
  };

  return (
    <header>
      <Logo style={style} fill="#1b262c" />
      <h1>battleship</h1>
    </header>
  );
}

export default Header;
