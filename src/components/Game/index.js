import React, { useState, useEffect } from "react";

import "./index.css";

import Board from "../Board";
import * as Player from "../../factories/player";

function Game() {
  const [player, setPlayer] = useState(Player("Player"));
  const [computer, setComputer] = useState(Player("Computer"));
  const [turn, setTurn] = useState(player.name);
  const [gameOver, setGameOver] = useState(false);

  // This update state is necessary hack because React doesnt update the DOM for changes in nested values, as it is the case for changes in players
  const [update, setUpdate] = useState(true);

  function endTurn(lastPlayer) {
    if (lastPlayer.isGameOver() === true) {
      setGameOver(lastPlayer.isGameOver());
    } else {
      const nextTurn =
        lastPlayer.name === player.name ? computer.name : player.name;
      setTurn(nextTurn);
    }
  }

  function handleAutoPlace() {
    player.autoPlaceAll();
    computer.autoPlaceAll();

    setPlayer(player);
    setComputer(computer);
    setUpdate(!update);
  }

  function handlePlayerAttack(position) {
    if (turn !== player.name) return;

    computer.receiveAttack(position);
    setComputer(computer);
    endTurn(player);
  }

  function handleComputerAttack() {
    player.receiveAttack();
    setPlayer(player);
    endTurn(computer);
  }

  useEffect(() => {
    if (turn === computer.name) {
      setTimeout(() => handleComputerAttack(), 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn]);

  useEffect(() => {
    if (gameOver === true) alert("Gameover!");
  }, [gameOver]);

  return (
    <div className="game-wrapper">
      <Board player={player.getBoard()} />
      <Board player={computer.getBoard()} onClick={handlePlayerAttack} />
      <button id="btn-autoPlace" onClick={handleAutoPlace}>
        Auto Place
      </button>
    </div>
  );
}

export default Game;
