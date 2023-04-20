import React from "react";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const LetterButtons = () => {
  // Just generates the letter buttons
  return letters.split("").map((letter, idx) => {
    return (
      <button
        className="key-btn"
        key={idx}
        value={letter}
        id="letter-button"
        disabled={false}
      >
        {letter}
      </button>
    );
  });
};

export default LetterButtons;
