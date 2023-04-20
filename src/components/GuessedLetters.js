import React from "react";

// Component for tracking and displaying the guessed letters
const GuessedLetters = ({ guessedLetters }) => {
  return (
    <div className="guessed-letters-container">
      <div id="guessed-letters">
        {guessedLetters.length > 0 && <p>Guessed Letters</p>}
        {guessedLetters
          .map((letter, index) => <span key={index}>{letter}</span>)
          .reduce(
            (prev, curr) => (prev === null ? [curr] : [prev, ", ", curr]),
            null
          )}
      </div>
    </div>
  );
};

export default GuessedLetters;
