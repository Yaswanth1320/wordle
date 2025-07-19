import { COLORS } from "../constants/gameConstants";

/**
 * Get color for a character based on our new format
 * @param {Object} charInfo - Character info with color property
 * @returns {string} - Color value
 */
export const getCharacterColor = (charInfo) => {
  if (charInfo.color === "green") {
    return COLORS.GREEN;
  } else if (charInfo.color === "yellow") {
    return COLORS.YELLOW;
  } else {
    return COLORS.LIGHT_BLACK;
  }
};

/**
 * Get keyboard key color based on all guesses
 * @param {string} key - The keyboard key
 * @param {Array} guesses - Array of all guesses
 * @returns {string} - Color value for the key
 */
export const getKeyColor = (key, guesses) => {
  if (key === "ENTER" || key === "BACKSPACE") {
    return COLORS.GRAY;
  }

  let bestStatus = COLORS.WHITE;
  let correctPositions = 0;
  let totalOccurrences = 0;

  // First pass: count total occurrences and correct positions
  guesses.forEach((guess) => {
    if (typeof guess === "string") {
      return;
    }

    const word = guess.word.toLowerCase();
    const characterInfo = guess.characterInfo;

    for (let i = 0; i < word.length; i++) {
      if (word[i] === key.toLowerCase()) {
        totalOccurrences++;
        if (characterInfo[i].color === "green") {
          correctPositions++;
        }
      }
    }
  });

  // Second pass: determine the best color based on all guesses
  guesses.forEach((guess) => {
    if (typeof guess === "string") {
      return;
    }

    const word = guess.word.toLowerCase();
    const characterInfo = guess.characterInfo;

    for (let i = 0; i < word.length; i++) {
      if (word[i] === key.toLowerCase()) {
        const charInfo = characterInfo[i];

        if (charInfo.color === "green") {
          bestStatus = COLORS.GREEN;
        } else if (charInfo.color === "yellow" && bestStatus !== COLORS.GREEN) {
          if (totalOccurrences > correctPositions) {
            bestStatus = COLORS.YELLOW;
          }
        } else if (charInfo.color === "gray" && bestStatus === COLORS.WHITE) {
          bestStatus = COLORS.LIGHT_BLACK;
        }
      }
    }
  });

  return bestStatus;
};

/**
 * Validate if a word matches the required length
 * @param {string} word - Word to validate
 * @param {number} requiredLength - Required word length
 * @returns {boolean} - True if valid length
 */
export const isValidWordLength = (word, requiredLength) => {
  return word.length === requiredLength;
};

/**
 * Format word for display (uppercase)
 * @param {string} word - Word to format
 * @returns {string} - Formatted word
 */
export const formatWordForDisplay = (word) => {
  return word.toUpperCase();
};

/**
 * Create empty row array for grid
 * @param {number} length - Length of the row
 * @returns {Array} - Array of empty strings
 */
export const createEmptyRow = (length) => {
  return Array(length).fill("");
};

/**
 * Get animation delay for a specific index
 * @param {number} index - Index of the character
 * @returns {number} - Animation delay in milliseconds
 */
export const getAnimationDelay = (index) => {
  const delays = [0, 200, 400, 600, 800, 1000];
  return delays[index] || 0;
};

/**
 * Check if game is over (won or lost)
 * @param {Array} guesses - Array of guesses
 * @param {boolean} hasWon - Whether player has won
 * @param {number} maxAttempts - Maximum number of attempts
 * @returns {boolean} - True if game is over
 */
export const isGameOver = (guesses, hasWon, maxAttempts = 6) => {
  return hasWon || guesses.length >= maxAttempts;
};

/**
 * Get game state based on current conditions
 * @param {Array} guesses - Array of guesses
 * @param {boolean} hasWon - Whether player has won
 * @param {boolean} isLoading - Whether game is loading
 * @param {number} maxAttempts - Maximum number of attempts
 * @returns {string} - Game state
 */
export const getGameState = (guesses, hasWon, isLoading, maxAttempts = 6) => {
  if (isLoading) return "loading";
  if (hasWon) return "won";
  if (guesses.length >= maxAttempts) return "lost";
  return "playing";
};

/**
 * Get current difficulty level
 * @param {string} difficulty - Difficulty level
 * @returns {Object} - Difficulty configuration
 */
export const getDifficultyConfig = (difficulty) => {
  const difficulties = {
    easy: { wordLength: 4, maxAttempts: 6 },
    medium: { wordLength: 5, maxAttempts: 6 },
    hard: { wordLength: 8, maxAttempts: 8 },
  };

  return difficulties[difficulty.toLowerCase()] || difficulties.medium;
};
