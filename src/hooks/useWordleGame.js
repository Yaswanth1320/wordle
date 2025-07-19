import { useState, useEffect, useCallback } from "react";
import {
  GAME_CONFIG,
  GAME_STATES,
  API_ENDPOINTS,
} from "../constants/gameConstants";
import {
  checkWordExists,
  submitGuess,
  findCorrectAnswer,
  getCurrentWord,
} from "../services/apiService";
import {
  isValidWordLength,
  isGameOver,
  getGameState,
  getDifficultyConfig,
} from "../utils/gameUtils";

/**
 * Custom hook for managing Wordle game state and logic
 */
export const useWordleGame = () => {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [gameState, setGameState] = useState(GAME_STATES.SELECTING_DIFFICULTY);
  const [difficulty, setDifficulty] = useState("medium");
  const [currentWord, setCurrentWord] = useState("");
  const [maxAttempts, setMaxAttempts] = useState(6);
  const [wordList, setWordList] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showCorrectModal, setShowCorrectModal] = useState(false);
  const [correctWord, setCorrectWord] = useState("");

  // Get difficulty configuration
  const difficultyConfig = getDifficultyConfig(difficulty);

  // Update game state whenever relevant state changes
  useEffect(() => {
    const newGameState = getGameState(guesses, hasWon, isLoading, maxAttempts);
    setGameState(newGameState);
  }, [guesses, hasWon, isLoading, maxAttempts]);

  // Initialize game when difficulty changes
  useEffect(() => {
    if (difficulty) {
      initializeGame();
    }
  }, [difficulty]);

  /**
   * Check if word exists in dictionary using dictionary API
   */
  const validateWordExists = async (word) => {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.DICTIONARY_API}/${encodeURIComponent(
          word.toLowerCase()
        )}`
      );
      return response.status === 200;
    } catch (error) {
      console.error("Dictionary API Error:", error);
      return false;
    }
  };

  /**
   * Get letter colors by comparing with current word
   */
  const getLetterColors = (guessWord) => {
    const targetWord = currentWord.toLowerCase();
    const guess = guessWord.toLowerCase();
    const colors = [];

    // Create a map of letter counts in target word
    const letterCounts = {};
    for (let i = 0; i < targetWord.length; i++) {
      const letter = targetWord[i];
      letterCounts[letter] = (letterCounts[letter] || 0) + 1;
    }

    // First pass: mark correct positions (green)
    const usedPositions = new Set();
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === targetWord[i]) {
        colors[i] = "green";
        usedPositions.add(i);
        letterCounts[guess[i]]--;
      }
    }

    // Second pass: mark yellow and gray
    for (let i = 0; i < guess.length; i++) {
      if (usedPositions.has(i)) {
        continue; // Already marked as green
      }

      const letter = guess[i];
      if (letterCounts[letter] && letterCounts[letter] > 0) {
        colors[i] = "yellow";
        letterCounts[letter]--;
      } else {
        colors[i] = "gray";
      }
    }

    return colors;
  };

  /**
   * Initialize the game with 20 random words
   */
  const initializeGame = useCallback(() => {
    const config = getDifficultyConfig(difficulty);

    // Generate 20 random words for this session
    const newWordList = [];
    for (let i = 0; i < 20; i++) {
      newWordList.push(getCurrentWord(difficulty));
    }

    setWordList(newWordList);
    setCurrentWordIndex(0);
    setCurrentWord(newWordList[0]);
    setMaxAttempts(config.maxAttempts);
    setGuesses([]);
    setCurrentGuess("");
    setHasWon(false);
    setCorrectAnswer("");
    setShowCorrectModal(false);
    setCorrectWord("");
    setGameState(GAME_STATES.PLAYING);

    console.log("Current word:", newWordList[0]);
  }, [difficulty]);

  /**
   * Move to next word
   */
  const nextWord = useCallback(() => {
    const nextIndex = currentWordIndex + 1;
    if (nextIndex < wordList.length) {
      setCurrentWordIndex(nextIndex);
      setCurrentWord(wordList[nextIndex]);
      setGuesses([]);
      setCurrentGuess("");
      setHasWon(false);
      setCorrectAnswer("");
      setShowCorrectModal(false);
      setCorrectWord("");
      setGameState(GAME_STATES.PLAYING);

      console.log("Current word:", wordList[nextIndex]);
    } else {
      // All words completed
      setGameState(GAME_STATES.SELECTING_DIFFICULTY);
    }
  }, [currentWordIndex, wordList]);

  /**
   * Handle letter input
   */
  const handleLetter = useCallback(
    (letter) => {
      if (currentGuess.length < difficultyConfig.wordLength && !isLoading) {
        setCurrentGuess((prev) => prev + letter.toLowerCase());
      }
    },
    [currentGuess.length, difficultyConfig.wordLength, isLoading]
  );

  /**
   * Handle backspace
   */
  const handleBackspace = useCallback(() => {
    if (!isLoading) {
      setCurrentGuess((prev) => prev.slice(0, -1));
    }
  }, [isLoading]);

  /**
   * Handle word submission
   */
  const handleSubmit = useCallback(async () => {
    if (
      isLoading ||
      !isValidWordLength(currentGuess, difficultyConfig.wordLength)
    ) {
      return { success: false, error: "Invalid word length" };
    }

    setIsLoading(true);

    try {
      // First check if word exists in dictionary API
      const wordExists = await validateWordExists(currentGuess);
      if (!wordExists) {
        setIsLoading(false);
        return { success: false, error: "Word not found!" };
      }

      // Check if the word matches the current word
      if (currentGuess.toLowerCase() === currentWord.toLowerCase()) {
        // Player won!
        const newGuesses = [...guesses, currentGuess];
        setGuesses(newGuesses);
        setCurrentGuess("");
        setHasWon(true);
        setCorrectWord(currentGuess);
        setShowCorrectModal(true);

        setIsLoading(false);
        return { success: true, won: true };
      } else {
        // Get letter colors by comparing with current word
        const letterColors = getLetterColors(currentGuess);

        // Add the guess with character info
        const newGuesses = [
          ...guesses,
          {
            word: currentGuess,
            characterInfo: letterColors.map((color, index) => ({
              character: currentGuess[index],
              color: color,
            })),
          },
        ];

        setGuesses(newGuesses);
        setCurrentGuess("");

        // Check if game is over
        if (isGameOver(newGuesses, false, maxAttempts)) {
          setCorrectAnswer(currentWord.toUpperCase());
        }

        setIsLoading(false);
        return { success: true, won: false };
      }
    } catch (error) {
      setIsLoading(false);
      return {
        success: false,
        error: "Failed to submit word. Please try again.",
      };
    }
  }, [
    currentGuess,
    guesses,
    isLoading,
    difficulty,
    maxAttempts,
    currentWord,
    nextWord,
  ]);

  /**
   * Reset the game
   */
  const resetGame = useCallback(async () => {
    initializeGame();
  }, [initializeGame]);

  /**
   * Change difficulty level
   */
  const changeDifficulty = useCallback((newDifficulty) => {
    setDifficulty(newDifficulty);
  }, []);

  /**
   * Handle keyboard input
   */
  const handleKeyPress = useCallback(
    (key) => {
      if (key === "ENTER") {
        handleSubmit();
      } else if (key === "BACKSPACE") {
        handleBackspace();
      } else {
        handleLetter(key);
      }
    },
    [handleSubmit, handleBackspace, handleLetter]
  );

  /**
   * Hide correct word modal
   */
  const hideCorrectModal = useCallback(() => {
    setShowCorrectModal(false);
  }, []);

  return {
    // State
    guesses,
    currentGuess,
    isLoading,
    hasWon,
    correctAnswer,
    gameState,
    difficulty,
    currentWord,
    maxAttempts,
    wordLength: difficultyConfig.wordLength,
    wordList,
    currentWordIndex,
    showCorrectModal,
    correctWord,

    // Actions
    handleKeyPress,
    handleLetter,
    handleBackspace,
    handleSubmit,
    resetGame,
    changeDifficulty,
    nextWord,
    hideCorrectModal,

    // Computed values
    isGameOver: isGameOver(guesses, hasWon, maxAttempts),
    canSubmit:
      isValidWordLength(currentGuess, difficultyConfig.wordLength) &&
      !isLoading,
  };
};
