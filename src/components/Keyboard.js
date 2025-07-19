import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import { globalStyles, COLORS } from "../styles/globalStyles";
import { getKeyColor } from "../utils/gameUtils";

const { width: screenWidth } = Dimensions.get("window");

const KEY_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  // The last row will be handled separately for DEL and ENTER placement
  ["Z", "X", "C", "V", "B", "N", "M"],
];

const Keyboard = ({ onKeyPress, guesses }) => {
  // Responsive keyboard width
  const keyboardWidth =
    Platform.OS === "web" ? Math.min(600, screenWidth - 32) : screenWidth - 32;

  // Helper to get key background color (white for unused, colored for used)
  const getKeyBackgroundColor = (key) => {
    const color = getKeyColor(key, guesses);
    // If color is white or light gray, use white background
    return color === "#ffffff" || color === "#818384" ? "#ffffff" : color;
  };

  return (
    <View
      style={[
        globalStyles.keyboard,
        { width: keyboardWidth, alignSelf: "center" },
      ]}
    >
      {/* First two rows */}
      {KEY_ROWS.slice(0, 2).map((row, rowIndex) => (
        <View style={globalStyles.keyboardRow} key={rowIndex}>
          {row.map((key) => (
            <TouchableOpacity
              key={key}
              style={[
                globalStyles.key,
                { backgroundColor: getKeyBackgroundColor(key) },
              ]}
              onPress={() => onKeyPress(key)}
              activeOpacity={0.7}
            >
              <Text
                style={[globalStyles.keyText, { fontSize: 20, color: "#000" }]}
              >
                {key}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      {/* Third row: only letter keys */}
      <View style={globalStyles.keyboardRow}>
        {KEY_ROWS[2].map((key) => (
          <TouchableOpacity
            key={key}
            style={[
              globalStyles.key,
              { backgroundColor: getKeyBackgroundColor(key) },
            ]}
            onPress={() => onKeyPress(key)}
            activeOpacity={0.7}
          >
            <Text
              style={[globalStyles.keyText, { fontSize: 20, color: "#000" }]}
            >
              {key}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Fourth row: DELETE and ENTER centered side by side */}
      <View style={[globalStyles.keyboardRow, { justifyContent: "center" }]}>
        <TouchableOpacity
          key="BACKSPACE"
          style={[
            globalStyles.key,
            globalStyles.specialKey,
            { backgroundColor: "#8B0000", marginRight: 12 }, // Dark red for DELETE
          ]}
          onPress={() => onKeyPress("BACKSPACE")}
          activeOpacity={0.7}
        >
          <Text style={[globalStyles.keyText, { fontSize: 16, color: "#fff" }]}>
            DELETE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          key="ENTER"
          style={[
            globalStyles.key,
            globalStyles.specialKey,
            { backgroundColor: "#228B22", marginLeft: 12 }, // Green for ENTER
          ]}
          onPress={() => onKeyPress("ENTER")}
          activeOpacity={0.7}
        >
          <Text style={[globalStyles.keyText, { fontSize: 18, color: "#fff" }]}>
            ENTER
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Keyboard;
