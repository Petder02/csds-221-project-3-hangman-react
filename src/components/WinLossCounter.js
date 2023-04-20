import React from "react";

// A component which represents a simple win/loss counter
const WinLossCounter = ({ numWins, numLosses }) => {
  return (
    <div>
      <h3>
        Wins: {numWins} | Losses: {numLosses}
      </h3>
    </div>
  );
};

export default WinLossCounter;
