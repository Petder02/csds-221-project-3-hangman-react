import React from "react";

// Component for the construction of the hangman figurine
const HangmanFigure = ({ guessedLetters }) => {
  const numGuessed = guessedLetters.length;

  return (
    <svg height="250" width="200" className="figure-container">
      {/* Rod */}
      <line x1="60" y1="20" x2="140" y2="20" />
      <line x1="140" y1="20" x2="140" y2="50" />
      <line x1="60" y1="20" x2="60" y2="230" />
      <line x1="20" y1="230" x2="100" y2="230" />
      {/* Head */}
      {numGuessed > 0 && <circle cx="140" cy="70" r="20" />}
      {/* Body */}
      {numGuessed > 1 && <line x1="140" y1="90" x2="140" y2="150" />}
      {/* Leg 1 */}
      {numGuessed > 2 && <line x1="140" y1="120" x2="120" y2="100" />}
      {numGuessed > 3 && <line x1="140" y1="120" x2="160" y2="100" />}
      {/* Leg 2 */}
      {numGuessed > 4 && <line x1="140" y1="150" x2="120" y2="180" />}
      {numGuessed > 5 && <line x1="140" y1="150" x2="160" y2="180" />}
    </svg>
  );
};

export default HangmanFigure;
