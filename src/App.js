import React, { useEffect, useState } from "react";
import { View, Text, Alert, Dimensions } from "react-native";
import { useWordleGame } from "./hooks/useWordleGame";
import { useModals } from "./hooks/useModals";
import WordGrid from "./components/WordGrid";
import Keyboard from "./components/Keyboard";
import DifficultySelector from "./components/DifficultySelector";
import {
  QuickInvalidWordModal,
  GameOverModal,
  InvalidWordModal,
  FillAllBlanksModal,
  CorrectWordModal,
} from "./components/Modals";
import { globalStyles } from "./styles/globalStyles";
import {
  GAME_STATES,
  DIFFICULTY_LEVELS,
  API_ENDPOINTS,
} from "./constants/gameConstants";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const App = () => {
  const {
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
    wordLength,
    wordList,
    currentWordIndex,
    showCorrectModal,
    correctWord,

    // Actions
    handleKeyPress,
    resetGame,
    changeDifficulty,
    nextWord,
    hideCorrectModal,

    // Computed values
    isGameOver,
    canSubmit,
  } = useWordleGame();

  const {
    // Modal states
    showInvalidWordModal,
    showGameOverModal,
    showQuickInvalidModal,

    // Modal actions
    showQuickInvalidWordModal,
    showGameOverModalHandler,
    hideGameOverModal,
    showInvalidWordModalHandler,
    hideInvalidWordModal,
    hideAllModals,
  } = useModals();

  // Local state for fill blanks modal
  const [showFillBlanksModal, setShowFillBlanksModal] = useState(false);

  // Handle game over state
  useEffect(() => {
    if (isGameOver && !hasWon) {
      showGameOverModalHandler();
    }
  }, [isGameOver, hasWon, showGameOverModalHandler]);

  // Check if word exists in dictionary
  const checkWordExists = async (word) => {
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

  // Handle invalid word submission
  const handleSubmitWithValidation = async () => {
    // First check if all blocks are filled
    if (currentGuess.length < wordLength) {
      setShowFillBlanksModal(true);
      return;
    }

    // Check if word exists in dictionary
    const wordExists = await checkWordExists(currentGuess);
    if (!wordExists) {
      showInvalidWordModalHandler();
      // Clear the current row by pressing backspace multiple times
      for (let i = 0; i < wordLength; i++) {
        handleKeyPress("BACKSPACE");
      }
      return;
    }

    // Submit to Wordle API
    const result = await handleKeyPress("ENTER");

    if (result && !result.success && result.error === "Word not found!") {
      showQuickInvalidWordModal();
    }
  };

  // Enhanced key press handler
  const handleKeyPressWithModals = (key) => {
    if (key === "ENTER") {
      handleSubmitWithValidation();
    } else {
      handleKeyPress(key);
    }
  };

  // Enhanced reset game handler
  const handleResetGame = async () => {
    hideAllModals();
    setShowFillBlanksModal(false);
    await resetGame();
  };

  // Handle difficulty selection
  const handleDifficultySelect = (newDifficulty) => {
    changeDifficulty(newDifficulty);
  };

  // Calculate game board container style based on word length
  const getGameBoardStyle = () => ({
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 0, // Remove margin below grid
    maxHeight: wordLength === 8 ? "60%" : "70%",
    padding: 0, // Remove padding
  });

  // Render difficulty selector
  if (gameState === GAME_STATES.SELECTING_DIFFICULTY) {
    return (
      <DifficultySelector
        onSelectDifficulty={handleDifficultySelect}
        currentDifficulty={difficulty}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* Title with difficulty indicator */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Wordle</Text>
        <Text style={styles.difficultyIndicator}>
          {difficulty.toUpperCase()} • {wordLength} letters • Word{" "}
          {currentWordIndex + 1}/20
        </Text>
      </View>
      {/* Game Board */}
      <View style={getGameBoardStyle()}>
        <WordGrid
          guesses={guesses}
          currentGuess={currentGuess}
          wordLength={wordLength}
          maxAttempts={maxAttempts}
        />
      </View>
      {/* Keyboard */}
      <View
        style={{ ...styles.keyboardContainer, marginTop: 0, paddingTop: 0 }}
      >
        <Keyboard onKeyPress={handleKeyPressWithModals} guesses={guesses} />
      </View>
      {/* Modals */}
      <QuickInvalidWordModal visible={showQuickInvalidModal} />

      <FillAllBlanksModal
        visible={showFillBlanksModal}
        onDismiss={() => setShowFillBlanksModal(false)}
      />

      <CorrectWordModal
        visible={showCorrectModal}
        word={correctWord}
        onNextWord={nextWord}
      />

      <InvalidWordModal
        visible={showInvalidWordModal}
        word={currentGuess}
        onDismiss={hideInvalidWordModal}
      />

      <GameOverModal
        visible={showGameOverModal}
        correctAnswer={correctAnswer}
        onReset={nextWord}
        onRequestClose={nextWord}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#121213",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
    fontFamily: "Michroma-Regular",
  },
  difficultyIndicator: {
    fontSize: 14,
    color: "#ffffff",
    opacity: 0.8,
    fontFamily: "Michroma-Regular",
  },
  keyboardContainer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 20,
  },
};

export default App;
