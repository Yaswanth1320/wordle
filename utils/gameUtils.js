export const createEmptyRow = (length) => Array(length).fill("");

export const formatWordForDisplay = (char) => {
  return char.toUpperCase();
};

export const getCharacterColor = ({ color }) => {
  switch (color) {
    case "green":
      return "#4CAF50";
    case "yellow":
      return "#FFD600";
    case "gray":
      return "#3a3a3c";
    default:
      return "#ffffff";
  }
};

export const getKeyColor = (key, guesses) => {
  let finalColor = "#ffffff";

  guesses.forEach((guess) => {
    if (typeof guess === "string") return;
    guess.characterInfo.forEach((info) => {
      if (info.character.toUpperCase() === key.toUpperCase()) {
        const color = getCharacterColor(info);
        if (color === "#4CAF50") finalColor = color; // green overrides all
        else if (color === "#FFD600" && finalColor !== "#4CAF50")
          finalColor = color; // yellow if not green
        else if (
          color === "#3a3a3c" &&
          finalColor !== "#4CAF50" &&
          finalColor !== "#FFD600"
        )
          finalColor = color; // gray if no better match
      }
    });
  });

  return finalColor;
};

export const getGameState = (guesses, hasWon, isLoading, maxAttempts) => {
  if (hasWon) return "won";
  if (guesses.length >= maxAttempts) return "lost";
  return isLoading ? "loading" : "playing";
};

export const isValidWordLength = (word, expectedLength) =>
  word.length === expectedLength;

export const isGameOver = (guesses, hasWon, maxAttempts) =>
  hasWon || guesses.length >= maxAttempts;

export const getDifficultyConfig = (difficulty) => {
  const config = {
    easy: { wordLength: 4, maxAttempts: 6 },
    medium: { wordLength: 5, maxAttempts: 6 },
    hard: { wordLength: 8, maxAttempts: 8 },
  };
  return config[difficulty] || config.medium;
};
