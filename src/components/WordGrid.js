import React from "react";
import { View, Text } from "react-native";
import {
  getCharacterColor,
  createEmptyRow,
  formatWordForDisplay,
} from "../utils/gameUtils";
import { globalStyles } from "../styles/globalStyles";

/**
 * WordGrid component for displaying the game board (no animation)
 */
const WordGrid = ({
  guesses,
  currentGuess,
  wordLength = 5,
  maxAttempts = 6,
}) => {
  const emptyRows = createEmptyRow(
    Math.max(0, maxAttempts - guesses.length - 1)
  );

  // Calculate cell size based on word length (make grid bigger)
  const getCellSize = () => {
    if (wordLength <= 4) return 70;
    if (wordLength <= 5) return 62;
    return 38; // For 8-letter words - still bigger than before
  };

  const cellSize = getCellSize();

  const renderGuessRow = (guess, rowIndex) => {
    let colors;
    let word;

    if (typeof guess === "string") {
      // Old format - just a string
      word = guess;
      colors = createEmptyRow(wordLength).map(() => "#3a3a3c"); // Default to gray
    } else {
      // New format - object with word and characterInfo
      word = guess.word;
      colors = guess.characterInfo.map((charInfo) =>
        getCharacterColor(charInfo)
      );
    }

    return (
      <View
        style={[globalStyles.row, { marginBottom: 2 }]}
        key={`guess-${rowIndex}`}
      >
        {word.split("").map((letter, i) => (
          <View
            key={i}
            style={[
              globalStyles.cell,
              {
                backgroundColor: colors[i],
                width: cellSize,
                height: cellSize,
              },
            ]}
          >
            <Text
              style={[
                globalStyles.cellText,
                { fontSize: Math.max(14, cellSize * 0.45) },
              ]}
            >
              {formatWordForDisplay(letter)}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const renderCurrentRow = () => {
    if (guesses.length >= maxAttempts) {
      return null;
    }

    return (
      <View style={[globalStyles.row, { marginBottom: 2 }]}>
        {createEmptyRow(wordLength).map((_, i) => (
          <View
            key={i}
            style={[
              globalStyles.cell,
              {
                borderColor: "#555",
                width: cellSize,
                height: cellSize,
              },
            ]}
          >
            <Text
              style={[
                globalStyles.cellText,
                { fontSize: Math.max(14, cellSize * 0.45) },
              ]}
            >
              {currentGuess[i] ? formatWordForDisplay(currentGuess[i]) : ""}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const renderEmptyRow = (_, index) => (
    <View
      style={[globalStyles.row, { marginBottom: 2 }]}
      key={`empty-${index}`}
    >
      {createEmptyRow(wordLength).map((_, i) => (
        <View
          key={i}
          style={[
            globalStyles.cell,
            {
              borderColor: "#333",
              width: cellSize,
              height: cellSize,
            },
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={[globalStyles.gameBoard, { paddingVertical: 0 }]}>
      {/* Remove vertical padding */}
      {/* Rendered guesses */}
      {guesses.map(renderGuessRow)}
      {/* Current guess row */}
      {renderCurrentRow()}
      {/* Empty rows */}
      {emptyRows.map(renderEmptyRow)}
    </View>
  );
};

export default WordGrid;
