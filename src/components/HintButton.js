import React from "react";

// Component for the hint button
const HintButton = ({ showHint }) => {
  return (
    <>
      <button className="hint-btn" onClick={showHint} id="hint-button">
        Click for a Hint!
      </button>
    </>
  );
};

export default HintButton;
