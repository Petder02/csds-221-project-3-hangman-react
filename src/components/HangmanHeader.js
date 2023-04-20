import React from "react";
import "../App.css";

// Component for the header of the hangman application
const Header = () => {
  return (
    <>
      <h1 className="center-text">Video Game Hangman</h1>
      <p className="center-text">
        {" "}
        Guess the video game by clicking a letter from the keypad below!
      </p>
      <p className="center-text">
        Note: Pipe characters within words (i.e., ' | ') indicate the location
        of spaces.
      </p>
    </>
  );
};

export default Header;
