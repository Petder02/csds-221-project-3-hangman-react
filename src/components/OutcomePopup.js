import React, { useEffect } from "react";
import { guessedWordCorrectly } from "../scripts/game-helper-functions";

// A component for handling popups which occur at the end of the game
const OutcomePopup = ({
  correctLetters,
  guessedLetters,
  selectedGame,
  setPlayable,
  playAgain
}) => {
  let gameOverMessage = "";
  let gameTitleRevealMessage = "";
  let originalGame = "";
  let playable = true;

  // The game has ended, with the player having won
  if (
    guessedWordCorrectly(correctLetters, guessedLetters, selectedGame) === "win"
  ) {
    gameOverMessage = "You guessed the video game correctly!";
    playable = false;
  }
  // The game has ended, with the player having lost
  else if (
    guessedWordCorrectly(correctLetters, guessedLetters, selectedGame) ===
    "lose"
  ) {
    gameOverMessage = "You have lost the game :(";
    gameTitleRevealMessage = `The correct video game was...`;
    originalGame = selectedGame.replaceAll("|", " ");
    playable = false;
  }

  // Makes sure to set playable properly if any sideeffects occur (i.e., playable changes within this state)
  useEffect(() => setPlayable(playable));

  return (
    <div
      className="popup-container"
      style={gameOverMessage !== "" ? { display: "flex" } : {}}
    >
      <div className="popup">
        <h2>{gameOverMessage}</h2>
        <h3>{gameTitleRevealMessage}</h3>
        <h3>{originalGame}</h3>
        <button onClick={playAgain}>Play Again?</button>
      </div>
    </div>
  );
};

export default OutcomePopup;
