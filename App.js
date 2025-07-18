import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import WordGrid from "./components/WordGrid";
import Keyboard from "./components/Keyboard";
import { WORDS } from "./utils/words";

const getRandomWord = () => {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
};

export default function App() {
  const [word, setWord] = useState(getRandomWord());
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");

  const handleKeyPress = (key) => {
    if (key === "ENTER") {
      if (currentGuess.length < 5) return;
      if (!WORDS.includes(currentGuess)) {
        Alert.alert("Invalid word");
        return;
      }

      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);
      setCurrentGuess("");

      if (currentGuess === word) {
        Alert.alert("You won!", `The word was "${word}"`);
        resetGame();
      } else if (newGuesses.length === 6) {
        Alert.alert("Game Over", `The word was "${word}"`);
        resetGame();
      }
    } else if (key === "DEL") {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else {
      if (currentGuess.length < 5) {
        setCurrentGuess(currentGuess + key);
      }
    }
  };

  const resetGame = () => {
    setWord(getRandomWord());
    setGuesses([]);
    setCurrentGuess("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wordle</Text>
      <WordGrid guesses={guesses} currentGuess={currentGuess} solution={word} />
      <Keyboard onKeyPress={handleKeyPress} guesses={guesses} solution={word} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#121213",
    alignItems: "center",
  },
  title: { fontSize: 32, fontWeight: "bold", color: "white", marginBottom: 20 },
});
