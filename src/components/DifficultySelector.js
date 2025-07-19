import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/globalStyles";

const DIFFICULTY_BG_COLORS = {
  easy: { backgroundColor: "#4CAF50" }, // green
  medium: { backgroundColor: "#FFD600" }, // yellow
  hard: { backgroundColor: "#2196F3" }, // blue
};

const DIFFICULTY_TEXT_COLORS = {
  easy: { color: "#fff", fontFamily: "Michroma-Regular" },
  medium: { color: "#222", fontFamily: "Michroma-Regular" },
  hard: { color: "#fff", fontFamily: "Michroma-Regular" },
};

const DifficultySelector = ({ onSelectDifficulty, currentDifficulty }) => {
  return (
    <View style={globalStyles.difficultyContainer}>
      <Text style={globalStyles.difficultyTitle}>Select Difficulty</Text>
      {["easy", "medium", "hard"].map((level) => (
        <TouchableOpacity
          key={level}
          style={[
            globalStyles.difficultyButton,
            DIFFICULTY_BG_COLORS[level],
            currentDifficulty === level && globalStyles.selectedDifficulty,
          ]}
          onPress={() => onSelectDifficulty(level)}
        >
          <Text
            style={[
              globalStyles.difficultyButtonText,
              DIFFICULTY_TEXT_COLORS[level],
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
