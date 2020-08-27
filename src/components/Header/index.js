import React from "react";

import "./index.css";
import { ReactComponent as Logo } from "../../assets/images/port.svg";

function Header() {
  const style = {
    width: 45,
    height: 45,
    backgroundColor: "fdcb9e",
    borderRadius: 50,
    padding: 5,
  };

  return (
    <header>
      <div className="logo">
        <Logo style={style} fill="#1b262c" />
        <h1>battleship</h1>
      </div>
    </header>
  );
}

export default Header;
