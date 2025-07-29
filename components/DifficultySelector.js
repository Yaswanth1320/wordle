import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../styles/globalStyles";

const DIFFICULTY_BG_COLORS = {
  easy: { backgroundColor: "#4CAF50" },
  medium: { backgroundColor: "#FFD600" },
  hard: { backgroundColor: "#F44336" }, // red for hard
};

const DIFFICULTY_TEXT_COLORS = {
  easy: { color: "#fff", fontFamily: "Michroma" },
  medium: { color: "#222", fontFamily: "Michroma" },
  hard: { color: "#fff", fontFamily: "Michroma" },
};

const DifficultySelector = ({ onSelectDifficulty, currentDifficulty }) => {
  return (
    <View
      style={[
        globalStyles.difficultyContainer,
        {
          padding: 0,
          borderRadius: 0,
          backgroundColor: "transparent",
          shadowColor: "transparent",
          shadowOpacity: 0,
          shadowRadius: 0,
          elevation: 0,
        },
      ]}
    >
      <Text
        style={[
          globalStyles.difficultyTitle,
          {
            fontFamily: "Michroma",
            fontSize: 20,
            marginBottom: 24,
            color: "#fff",
            textAlign: "center",
            letterSpacing: 1,
          },
        ]}
      >
        Select Difficulty
      </Text>
      {["easy", "medium", "hard"].map((level) => (
        <TouchableOpacity
          key={level}
          style={[
            globalStyles.difficultyButton,
            DIFFICULTY_BG_COLORS[level],
            {
              marginBottom: 18,
              borderRadius: 12,
              paddingVertical: 16,
              paddingHorizontal: 12,
              alignItems: "center",
              borderWidth: currentDifficulty === level ? 3 : 0,
              borderColor: currentDifficulty === level ? "#fff" : "transparent",
              shadowColor: "#000",
              shadowOpacity: 0.15,
              shadowRadius: 6,
              elevation: 2,
            },
            currentDifficulty === level && globalStyles.selectedDifficulty,
          ]}
          onPress={() => onSelectDifficulty(level)}
        >
          <Text
            style={[
              globalStyles.difficultyButtonText,
              DIFFICULTY_TEXT_COLORS[level],
              { fontSize: 16, letterSpacing: 2 },
            ]}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default DifficultySelector;
