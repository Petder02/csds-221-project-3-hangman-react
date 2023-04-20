import React from "react";

const letters = "1234567890";

const LetterButtons = () => {
  // Just generates the number buttons
  return letters.split("").map((number, idx) => {
    return (
      <button
        className="key-btn"
        key={idx}
        value={number}
        id="number-button"
        disabled={false}
      >
        {number}
      </button>
    );
  });
};

export default LetterButtons;
