// components/useWordleGame.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { GAME_STATES } from "../constants/gameConstants";
import { checkWordExists, getCurrentWord } from "../services/apiService";
import {
  getDifficultyConfig,
  getGameState,
  isGameOver,
  isValidWordLength,
} from "../utils/gameUtils";

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
  const [solvedCount, setSolvedCount] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const difficultyConfig = getDifficultyConfig(difficulty);

  useEffect(() => {
    const newGameState = getGameState(guesses, hasWon, isLoading, maxAttempts);
    setGameState(newGameState);
  }, [guesses, hasWon, isLoading, maxAttempts]);

  useEffect(() => {
    if (difficulty) initializeGame();
  }, [difficulty]);

  useEffect(() => {
    // Load high score for the current difficulty from storage on mount or when difficulty changes
    const key = `wordle_high_score_${difficulty}`;
    AsyncStorage.getItem(key).then((score) => {
      if (score !== null) setHighScore(Number(score));
      else setHighScore(0);
    });
  }, [difficulty]);

  const initializeGame = useCallback(() => {
    const config = getDifficultyConfig(difficulty);
    const newWordList = [];
    for (let i = 0; i < 20; i++) {
      newWordList.push(getCurrentWord(difficulty));
    }
    setWordList(newWordList);
    setCurrentWordIndex(0);
    setCurrentWord(newWordList[0]);
    console.log("Starting new word:", newWordList[0]);
    setMaxAttempts(config.maxAttempts);
    setGuesses([]);
    setCurrentGuess("");
    setHasWon(false);
    setCorrectAnswer("");
    setShowCorrectModal(false);
    setCorrectWord("");
    setGameState(GAME_STATES.PLAYING);
  }, [difficulty]);

  const handleLetter = useCallback(
    (letter) => {
      if (currentGuess.length < difficultyConfig.wordLength && !isLoading) {
        setCurrentGuess((prev) => prev + letter.toLowerCase());
      }
    },
    [currentGuess.length, difficultyConfig.wordLength, isLoading]
  );

  const handleBackspace = useCallback(() => {
    if (!isLoading) {
      setCurrentGuess((prev) => prev.slice(0, -1));
    }
  }, [isLoading]);

  const getLetterColors = (guessWord) => {
    const targetWord = currentWord.toLowerCase();
    const guess = guessWord.toLowerCase();
    const colors = [];
    const letterCounts = {};

    for (let i = 0; i < targetWord.length; i++) {
      const letter = targetWord[i];
      letterCounts[letter] = (letterCounts[letter] || 0) + 1;
    }

    const usedPositions = new Set();
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === targetWord[i]) {
        colors[i] = "green";
        usedPositions.add(i);
        letterCounts[guess[i]]--;
      }
    }

    for (let i = 0; i < guess.length; i++) {
      if (usedPositions.has(i)) continue;
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

  const handleSubmit = useCallback(async () => {
    if (
      isLoading ||
      !isValidWordLength(currentGuess, difficultyConfig.wordLength)
    ) {
      return { success: false, error: "Invalid word length" };
    }

    setIsLoading(true);

    try {
      const wordExists = await checkWordExists(currentGuess);
      if (!wordExists) {
        setIsLoading(false);
        return { success: false, error: "Word not found!" };
      }

      const isCorrect =
        currentGuess.toLowerCase() === currentWord.toLowerCase();
      const newGuesses = isCorrect
        ? [...guesses, currentGuess]
        : [
            ...guesses,
            {
              word: currentGuess,
              characterInfo: getLetterColors(currentGuess).map((color, i) => ({
                character: currentGuess[i],
                color,
              })),
            },
          ];

      setGuesses(newGuesses);
      setCurrentGuess("");

      if (isCorrect) {
        setHasWon(true);
        setCorrectWord(currentGuess);
        setShowCorrectModal(true);
        setSolvedCount((prev) => {
          const updated = prev + 1;
          setHighScore((high) => {
            if (updated > high) {
              const key = `wordle_high_score_${difficulty}`;
              AsyncStorage.setItem(key, String(updated));
              return updated;
            }
            return high;
          });
          return updated;
        });
      } else if (newGuesses.length >= maxAttempts) {
        setCorrectAnswer(currentWord.toUpperCase());
        setGameState(GAME_STATES.LOST);
        setSolvedCount(0); // Reset on game over
      }

      setIsLoading(false);
      return { success: true, won: isCorrect };
    } catch (error) {
      console.error("handleSubmit error:", error);
      setIsLoading(false);
      return { success: false, error: "Submission error" };
    }
  }, [currentGuess, guesses, isLoading, difficulty, maxAttempts, currentWord]);

  const nextWord = useCallback(() => {
    const nextIndex = currentWordIndex + 1;
    if (nextIndex < wordList.length) {
      setCurrentWordIndex(nextIndex);
      setCurrentWord(wordList[nextIndex]);
      console.log("Next word:", wordList[nextIndex]);
      setGuesses([]);
      setCurrentGuess("");
      setHasWon(false);
      setCorrectAnswer("");
      setShowCorrectModal(false);
      setCorrectWord("");
      setGameState(GAME_STATES.PLAYING);
    } else {
      setGameState(GAME_STATES.SELECTING_DIFFICULTY);
    }
  }, [currentWordIndex, wordList]);

  const resetGame = useCallback(() => {
    initializeGame();
  }, [initializeGame]);

  const changeDifficulty = useCallback((newDifficulty) => {
    setDifficulty(newDifficulty);
  }, []);

  const handleKeyPress = useCallback(
    (key) => {
      if (key === "ENTER") return handleSubmit();
      if (key === "BACKSPACE") handleBackspace();
      else handleLetter(key);
    },
    [handleSubmit, handleBackspace, handleLetter]
  );

  const hideCorrectModal = useCallback(() => {
    setShowCorrectModal(false);
  }, []);

  return {
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
    solvedCount,
    highScore,
    handleKeyPress,
    handleLetter,
    handleBackspace,
    handleSubmit,
    resetGame,
    changeDifficulty,
    nextWord,
    hideCorrectModal,
    isGameOver: isGameOver(guesses, hasWon, maxAttempts),
    canSubmit:
      isValidWordLength(currentGuess, difficultyConfig.wordLength) &&
      !isLoading,
  };
};
