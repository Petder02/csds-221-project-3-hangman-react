// Helper function used to determine if the player has won or lost the game
export function guessedWordCorrectly(
  correctGame,
  guessedLetters,
  videoGameTitle
) {
  let status = "win";
  const numAllowedGuesses = 6;

  // check for a win
  videoGameTitle.split("").forEach((letter) => {
    if (!correctGame.includes(letter)) {
      status = "";
    }
  });

  // Check for a loss
  if (guessedLetters.length === numAllowedGuesses) {
    status = "lose";
  }
  return status;
}
