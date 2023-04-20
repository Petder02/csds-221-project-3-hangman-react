import React from "react";

// A component for displayhing the title of the current video game being guessed
const VideoGameTitle = ({ selectedGame, correctLetters }) => {
  return (
    <div className="word">
      {selectedGame.split("").map((letter, index) => {
        return (
          <span className="letter" key={index} id="number-button">
            {correctLetters.includes(letter) ? letter : ""}
          </span>
        );
      })}
    </div>
  );
};

export default VideoGameTitle;
