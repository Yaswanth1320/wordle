import React from "react";
import {
  Dimensions,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { getKeyColor } from "../utils/gameUtils";

const { width: screenWidth } = Dimensions.get("window");

const KEY_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

const Keyboard = ({ onKeyPress, guesses }) => {
  const keyboardWidth =
    Platform.OS === "web" ? Math.min(600, screenWidth - 64) : screenWidth - 64;

  const getKeyBackgroundColor = (key) => {
    const color = getKeyColor(key, guesses);
    return color === "#ffffff" || color === "#818384" ? "#ffffff" : color;
  };

  return (
    <View
      style={[
        globalStyles.keyboard,
        { width: keyboardWidth, alignSelf: "center" },
      ]}
    >
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
                style={[globalStyles.keyText, { fontSize: 16, color: "#000" }]}
              >
                {key}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
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
              style={[globalStyles.keyText, { fontSize: 16, color: "#000" }]}
            >
              {key}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={[globalStyles.keyboardRow, { justifyContent: "center" }]}>
        <TouchableOpacity
          key="BACKSPACE"
          style={[
            globalStyles.key,
            globalStyles.specialKey,
            { backgroundColor: "#8B0000", marginRight: 12 },
          ]}
          onPress={() => onKeyPress("BACKSPACE")}
          activeOpacity={0.7}
        >
          <Text style={[globalStyles.keyText, { fontSize: 14, color: "#fff" }]}>
            DELETE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          key="ENTER"
          style={[
            globalStyles.key,
            globalStyles.specialKey,
            { backgroundColor: "#228B22", marginLeft: 12 },
          ]}
          onPress={() => onKeyPress("ENTER")}
          activeOpacity={0.7}
        >
          <Text style={[globalStyles.keyText, { fontSize: 15, color: "#fff" }]}>
            ENTER
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Keyboard;
