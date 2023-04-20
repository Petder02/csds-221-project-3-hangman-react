import React, { useEffect, useLayoutEffect, useState } from "react";
import HangmanHeader from "./components/HangmanHeader";
import HangmanFigure from "./components/HangmanFigure";
import GuessedLetters from "./components/GuessedLetters";
import VideoGameTitle from "./components/VideoGameTitle";
import OutcomePopup from "./components/OutcomePopup";
import LetterButtons from "./components/LetterButtons";
import NumberButtons from "./components/NumberButtons";
import WinLossCounter from "./components/WinLossCounter";
import HintButton from "./components/HintButton";
import HintImage from "./components/HintImage";

import { pickRandGame } from "./scripts/rawger-game-picker";

import "./App.css";
import { guessedWordCorrectly } from "./scripts/game-helper-functions";

// The following function just logs the fact that random game fetching from the API
// does work. It was just not feasible to implement for the final use case
// You should not uncomment this line unless needed though because calls are limited
// pickRandGame().then((data) => console.log("Random Game Title -> " + data));

// Games and associated image links and alt texts
const games = ["final fantasy vii", "resident evil 4", "persona 5"];
const imageLinks = [
  "/images/ffvii_hint.jpg",
  "/images/re_4_hint.jpg",
  "/images/p5_hint.jpg"
];
const altHints = [
  "Cloud Strife",
  "Leon S. Kennedy",
  "Joker + The Phantom Thieves"
];

// Initial selected game, hint image, alt text
let selectedGameIdx = Math.floor(Math.random() * games.length);
let selectedGame = games[selectedGameIdx];
let hintImage = imageLinks[selectedGameIdx];
let altHintText = altHints[selectedGameIdx];

export default function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [numWins, setNumWins] = useState(0);
  const [numLosses, setNumLosses] = useState(0);

  function getSpecialChars() {
    const format = /[^a-zA-Z0-9]/;
    let hasSpecialChars = format.test(selectedGame);
    let specialChars = [];
    if (hasSpecialChars) {
      selectedGame.split("").forEach((char) => {
        let isSpecialChar = format.test(char);
        if (isSpecialChar) {
          specialChars.push(char);
        }
      });
    }
    return specialChars;
  }

  // Renables all buttons once the game ends
  function renableAllButtons() {
    let letterButtons = document.querySelectorAll("[id=letter-button]");
    let numberButtons = document.querySelectorAll("[id=number-button]");
    letterButtons.forEach((letterButton) => {
      letterButton.disabled = false;
    });
    numberButtons.forEach((numberButton) => {
      numberButton.disabled = false;
    });
  }

  // This was me trying to do async calls to handle the API request
  // useEffect(() => {
  //   selectedGame = async () => {
  //     await pickRandGame();
  //   };
  //   console.log(selectedGame);
  // }, [playable]);

  // Add any non-alpha numeric characters to the correct letters list initially
  useEffect(() => {
    // Convert spaces to pipes for readability
    selectedGame = selectedGame.replaceAll(" ", "|");
    let specialChars = getSpecialChars();
    specialChars.forEach((char) => {
      setCorrectLetters((currLetters) => [...currLetters, char]);
    });
  }, [playable]);

  // If one of the buttons is pressed, then add that letter and disable the button
  useEffect(() => {
    const onLetterButtonPress = (event) => {
      const target = event.target;
      // If the target is a letter or number button, then...
      if (target.id === "letter-button" || target.id === "number-button") {
        let alphaNumericChar = target.value.toLowerCase();
        target.disabled = true;
        if (playable) {
          if (selectedGame.includes(alphaNumericChar)) {
            if (!correctLetters.includes(alphaNumericChar)) {
              setCorrectLetters((currLetters) => [
                ...currLetters,
                alphaNumericChar
              ]);
            }
          } else {
            if (!guessedLetters.includes(alphaNumericChar)) {
              setGuessedLetters((guessedLetters) => [
                ...guessedLetters,
                alphaNumericChar
              ]);
            }
          }
        }
      }
    };
    window.addEventListener("click", onLetterButtonPress);
    return () => window.removeEventListener("click", onLetterButtonPress);
  }, [correctLetters, guessedLetters, playable]);

  // Helper function which will let us play again once the game ends
  function playAgain() {
    setPlayable(true);

    if (
      guessedWordCorrectly(correctLetters, guessedLetters, selectedGame) ===
      "win"
    ) {
      setNumWins((currWins) => currWins + 1);
    } else if (
      guessedWordCorrectly(correctLetters, guessedLetters, selectedGame) ===
      "lose"
    ) {
      setNumLosses((currLosses) => currLosses + 1);
    }

    // Cleanup functions
    setCorrectLetters([]);
    setGuessedLetters([]);
    renableAllButtons();
    hideHint();

    // Pick a new video game word and restart the game
    const randGameIdx = Math.floor(Math.random() * games.length);
    selectedGame = games[randGameIdx];
    hintImage = imageLinks[randGameIdx];
    altHintText = altHints[randGameIdx];
  }

  // Shows the hint image
  function showHint() {
    let hintImage = document.getElementById("hint-image");
    hintImage.className = "display-img";
    let hintButton = document.getElementById("hint-button");
    hintButton.disabled = true;
    hintButton.textContent = "Hint Displayed Below!";
  }

  // Hides the hint image
  function hideHint() {
    let hintImage = document.getElementById("hint-image");
    hintImage.className = "hide-img";
    let hintButton = document.getElementById("hint-button");
    hintButton.disabled = false;
    hintButton.textContent = "Click for a Hint!!";
  }

  return (
    <>
      <HangmanHeader />
      <div className="win-loss-ctr-container">
        <WinLossCounter numWins={numWins} numLosses={numLosses} />
      </div>
      <div className="hangman-game-container">
        <HangmanFigure guessedLetters={guessedLetters} />
        <GuessedLetters guessedLetters={guessedLetters} />
        <VideoGameTitle
          selectedGame={selectedGame}
          correctLetters={correctLetters}
        />
      </div>
      <div className="letter-btn-container">
        <LetterButtons />
      </div>
      <div className="number-btn-container">
        <NumberButtons />
      </div>
      <div className="hint-btn-container">
        <HintButton showHint={showHint} />
      </div>
      <div className="hint-btn-container">
        <HintImage src={hintImage} altText={altHintText} />
      </div>
      <OutcomePopup
        correctLetters={correctLetters}
        guessedLetters={guessedLetters}
        selectedGame={selectedGame}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
    </>
  );
}
