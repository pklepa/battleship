import React, { useState, useEffect } from "react";

import "./index.css";

import Board from "../Board";
import * as Player from "../../factories/player";
import Harbour from "../Harbour";

function Game() {
  const [player, setPlayer] = useState(Player("Player"));
  const [computer, setComputer] = useState(Player("Computer"));
  const [turn, setTurn] = useState(player.name);
  const [gameOver, setGameOver] = useState(false);
  const [currentShip, setCurrentShip] = useState(false);

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

  function handleResetPlacement() {
    setPlayer(Player(player.name));
    setComputer(Player(computer.name));
    setUpdate(!update);
  }

  function handleAutoPlace() {
    player.autoPlaceAll();
    computer.autoPlaceAll();

    setPlayer(player);
    setComputer(computer);
    setUpdate(!update);
  }

  function prepareManualPlace(ship) {
    if (!currentShip) setCurrentShip(ship);
    else setCurrentShip(false);
  }

  function handleManualPlace(position) {
    if (currentShip) {
      player.placeShip(currentShip, position);
      setCurrentShip(false);
    }
  }

  function handleHarbourRotation() {
    player.getFleet().map((ship) => {
      ship.changeOrientation();
      console.log(ship.getName(), ship.getOrientation());
    });
  }

  // Alternates turns between player and COM
  useEffect(() => {
    if (turn === computer.name && gameOver === false) {
      setTimeout(() => handleComputerAttack(), 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn]);

  useEffect(() => {
    if (gameOver === true) alert("Gameover!");
  }, [gameOver]);

  return (
    <div className="game-wrapper">
      <Harbour
        shipsToLoad={player.getFleet()}
        prepareManualPlace={prepareManualPlace}
        handleAutoPlace={handleAutoPlace}
        handleResetPlacement={handleResetPlacement}
        handleHarbourRotation={handleHarbourRotation}
      />
      <Board board={player.getBoard()} onClick={handleManualPlace} />
      <Board board={computer.getBoard()} onClick={handlePlayerAttack} />
    </div>
  );
}

export default Game;
