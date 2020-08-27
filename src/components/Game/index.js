import React, { useState, useEffect } from "react";

import "./index.css";

import Player from "../../factories/player";
import Board from "../Board";
import Harbour from "../Harbour";
import Scoreboard from "../Scoreboard";
import MessageBoard from "../MessageBoard";

function Game() {
  const [player, setPlayer] = useState(Player("Player"));
  const [computer, setComputer] = useState(Player("Computer"));
  const [turn, setTurn] = useState();
  const [gameStart, setGameStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [currentShip, setCurrentShip] = useState(false);

  // This update state is necessary hack because React doesnt update the DOM for changes in nested values, as it is the case for changes in players
  const [update, setUpdate] = useState(true);

  // TODO: When the game is over, show winner and message in the MessageBoard
  function startGame() {
    if (gameStart) {
      handleResetPlacement();
      return;
    }

    if (player.getFleet().length !== player.getPlacedFleet().length) return;

    setGameStart(true);

    computer.autoPlaceAll();
    setComputer(computer);

    setTurn(player.name);
    setGameOver(false);
  }

  function endTurn(lastPlayer) {
    if (lastPlayer.isGameOver() === true) {
      setGameOver(true);
      alert(
        `Game over - ${
          lastPlayer === player ? computer.name : player.name
        } won!`
      );
    } else {
      const nextTurn =
        lastPlayer.name === player.name ? computer.name : player.name;
      setTurn(nextTurn);
    }
  }

  function handlePlayerAttack(position) {
    if (turn !== player.name) return;

    if (computer.receiveAttack(position)) {
      setComputer(computer);
      endTurn(player);
    }
  }

  function handleComputerAttack() {
    player.receiveAttack();
    setPlayer(player);
    endTurn(computer);
  }

  function handleResetPlacement() {
    setPlayer(Player(player.name));
    setComputer(Player(computer.name));

    setGameOver(false);
    setGameStart(false);
    setUpdate(!update);
  }

  function handleAutoPlace() {
    player.autoPlaceAll();

    setPlayer(player);
    setUpdate(!update);
  }

  function prepareManualPlace(ship) {
    if (!currentShip) setCurrentShip(ship);
    else setCurrentShip(false);
  }

  function handleManualPlace(position) {
    if (currentShip) {
      if (player.placeShip(currentShip, position)) setCurrentShip(false);
    }
  }

  function handleHarbourRotation() {
    player.getFleet().map((ship) => ship.changeOrientation());
  }

  // Alternates turns between player and COM
  useEffect(() => {
    if (turn === computer.name && gameOver === false) {
      setTimeout(() => handleComputerAttack(), 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn]);

  // TODO: Select AI dificulty
  return (
    <div className="game-container">
      <div className="game-header">
        <MessageBoard />
      </div>
      <div className="game-wrapper">
        {gameStart ? (
          <Scoreboard shipsLoaded={player.getFleet()} />
        ) : (
          <Harbour
            shipsToLoad={player.getFleet()}
            shipsLoaded={player.getPlacedFleet()}
            prepareManualPlace={prepareManualPlace}
            handleAutoPlace={handleAutoPlace}
            handleResetPlacement={handleResetPlacement}
            handleHarbourRotation={handleHarbourRotation}
          />
        )}

        <Board
          name={player.name}
          board={player.getBoard()}
          onClick={handleManualPlace}
          showShips={true}
          disableBoard={gameStart ? turn === player.name : false}
        />
        <Board
          name={computer.name}
          board={computer.getBoard()}
          onClick={handlePlayerAttack}
          showShips={gameOver ? true : false}
          disableBoard={gameStart ? turn === computer.name : true}
        />
        <Scoreboard shipsLoaded={computer.getFleet()} />
      </div>
      <div className="game-footer">
        <button onClick={startGame}>{gameStart ? "Restart" : "Start"}</button>
      </div>
    </div>
  );
}

export default Game;
