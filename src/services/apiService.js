import { API_ENDPOINTS } from "../constants/gameConstants";
import { getRandomWord } from "../utils/wordLists";

/**
 * Check if a word exists in the local word lists
 * @param {string} word - The word to validate
 * @param {string} difficulty - Difficulty level (easy, medium, hard)
 * @returns {Promise<boolean>} - True if word exists, false otherwise
 */
export const checkWordExists = async (word, difficulty = "medium") => {
  try {
    // For now, we'll use a simple validation approach
    // In a real implementation, you might want to check against the actual word lists
    const wordLength =
      difficulty === "easy" ? 4 : difficulty === "hard" ? 8 : 5;

    // Basic validation: check if word is the right length and contains only letters
    if (word.length !== wordLength || !/^[a-zA-Z]+$/.test(word)) {
      return false;
    }

    // For now, we'll assume the word is valid if it passes basic checks
    // In a production app, you'd check against the actual word lists
    return true;
  } catch (error) {
    console.error("Word validation error:", error);
    return false;
  }
};

/**
 * Submit a guess to the Wordle API
 * @param {string} guess - The word to guess
 * @returns {Promise<Object>} - API response with character info
 */
export const submitGuess = async (guess) => {
  try {
    const response = await fetch(API_ENDPOINTS.WORDLE_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        guess: guess.toLowerCase(),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Wordle API Error:", error);
    throw error;
  }
};

/**
 * Get a random word for the specified difficulty
 * @param {string} difficulty - Difficulty level (easy, medium, hard)
 * @returns {string} - Random word for the difficulty level
 */
export const getCurrentWord = (difficulty = "medium") => {
  return getRandomWord(difficulty);
};

/**
 * Get the current word information (for debugging)
 * @param {string} testWord - Test word to get response
 * @returns {Promise<Object>} - API response
 */
export const getCurrentWordInfo = async (testWord = "hello") => {
  try {
    const response = await fetch(API_ENDPOINTS.WORDLE_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        guess: testWord.toLowerCase(),
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting current word info:", error);
    return null;
  }
};

/**
 * Find the correct answer by testing common words
 * @param {string} difficulty - Difficulty level
 * @returns {Promise<string>} - The correct word or fallback
 */
export const findCorrectAnswer = async (difficulty = "medium") => {
  try {
    // For now, we'll return a placeholder since we're using local word lists
    // In a real implementation, you might want to track the current word
    const possibleWords = {
      easy: ["able", "acid", "aged", "also", "area"],
      medium: ["hello", "world", "about", "their", "there"],
      hard: ["absolute", "abstract", "academic", "accepted", "accident"],
    };

    const words = possibleWords[difficulty] || possibleWords.medium;
    const randomWord = words[Math.floor(Math.random() * words.length)];

    return randomWord.toUpperCase();
  } catch (error) {
    console.error("Error finding correct answer:", error);
    return "UNKNOWN";
  }
};
