// app/difficulty.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import DifficultySelector from "../components/DifficultySelector";
import { useWordleGame } from "../components/useWordleGame";

export default function DifficultyScreen() {
  const [difficulty, setDifficulty] = useState("medium");
  const game = useWordleGame();
  const [highScores, setHighScores] = useState({ easy: 0, medium: 0, hard: 0 });
  const [highScoreNames, setHighScoreNames] = useState({
    easy: "",
    medium: "",
    hard: "",
  });
  const [highScoreHistory, setHighScoreHistory] = useState({
    easy: [],
    medium: [],
    hard: [],
  });
  const [tempName, setTempName] = useState("");
  const [nameModal, setNameModal] = useState({
    visible: false,
    difficulty: "",
    score: 0,
  });

  useEffect(() => {
    const fetchScores = async () => {
      const easy =
        Number(await AsyncStorage.getItem("wordle_high_score_easy")) || 0;
      const medium =
        Number(await AsyncStorage.getItem("wordle_high_score_medium")) || 0;
      const hard =
        Number(await AsyncStorage.getItem("wordle_high_score_hard")) || 0;
      const easyName =
        (await AsyncStorage.getItem("wordle_high_score_name_easy")) || "";
      const mediumName =
        (await AsyncStorage.getItem("wordle_high_score_name_medium")) || "";
      const hardName =
        (await AsyncStorage.getItem("wordle_high_score_name_hard")) || "";
      setHighScores({ easy, medium, hard });
      setHighScoreNames({ easy: easyName, medium: mediumName, hard: hardName });
      // Fetch history
      const easyHistory = JSON.parse(
        (await AsyncStorage.getItem("wordle_high_score_history_easy")) || "[]"
      );
      const mediumHistory = JSON.parse(
        (await AsyncStorage.getItem("wordle_high_score_history_medium")) || "[]"
      );
      const hardHistory = JSON.parse(
        (await AsyncStorage.getItem("wordle_high_score_history_hard")) || "[]"
      );
      setHighScoreHistory({
        easy: easyHistory,
        medium: mediumHistory,
        hard: hardHistory,
      });
    };
    fetchScores();
  }, [game.highScore, difficulty, nameModal.visible]);

  const handleSelect = (level) => {
    setDifficulty(level);
    router.replace({ pathname: "/game", params: { level } });
  };

  const handleSaveName = async () => {
    const nameKey = `wordle_high_score_name_${nameModal.difficulty}`;
    await AsyncStorage.setItem(nameKey, tempName);
    setHighScoreNames((prev) => ({
      ...prev,
      [nameModal.difficulty]: tempName,
    }));
    // Update history
    const historyKey = `wordle_high_score_history_${nameModal.difficulty}`;
    const prevHistory = JSON.parse(
      (await AsyncStorage.getItem(historyKey)) || "[]"
    );
    const newEntry = {
      name: tempName,
      score: nameModal.score,
      date: new Date().toISOString(),
    };
    const updatedHistory = [newEntry, ...prevHistory].slice(0, 5); // keep last 5
    await AsyncStorage.setItem(historyKey, JSON.stringify(updatedHistory));
    setHighScoreHistory((prev) => ({
      ...prev,
      [nameModal.difficulty]: updatedHistory,
    }));
    setNameModal({ visible: false, difficulty: "", score: 0 });
    setTempName("");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerRow}>
        <Text style={styles.appName}>
          <Text style={styles.wordle}>WORDLE</Text>{" "}
          <Text style={styles.x}>X</Text>
        </Text>
      </View>
      <View style={styles.contentWrapper}>
        <View style={styles.selectorWrapper}>
          <DifficultySelector
            currentDifficulty={difficulty}
            onSelectDifficulty={handleSelect}
          />
        </View>
        <View style={styles.highScoreBoardModern}>
          <Text style={styles.highScoreLabelModern}>Highest Scores</Text>
          <View style={styles.highScoreRowModern}>
            {["easy", "medium", "hard"].map((level) => (
              <View style={styles.scoreColModern} key={level}>
                <Text
                  style={[
                    styles.levelLabelModern,
                    {
                      color:
                        level === "easy"
                          ? "#4CAF50"
                          : level === "medium"
                          ? "#FFD600"
                          : "#F44336",
                    },
                  ]}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Text>
                <View style={styles.scoreCircle}>
                  <Text style={styles.highScoreValueModern}>
                    {highScores[level]}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
      {/* Name Modal */}
      {nameModal.visible && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New High Score!</Text>
            <Text style={styles.modalMessage}>
              You&apos;ve achieved a new high score of {nameModal.score} for{" "}
              {nameModal.difficulty.charAt(0).toUpperCase() +
                nameModal.difficulty.slice(1)}
              .
            </Text>
            <Text style={styles.modalLabel}>Enter your name:</Text>
            <TextInput
              style={styles.modalInput}
              value={tempName}
              onChangeText={setTempName}
              placeholder="Your name"
              placeholderTextColor="#888"
            />
            <Pressable style={styles.modalButton} onPress={handleSaveName}>
              <Text style={styles.modalButtonText}>Save Name</Text>
            </Pressable>
            <Pressable
              style={styles.modalButtonCancel}
              onPress={() => setNameModal({ ...nameModal, visible: false })}
            >
              <Text style={styles.modalButtonTextCancel}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#121213" },
  appName: {
    fontFamily: "Michroma",
    fontSize: 32,
    textAlign: "center",
    marginTop: 0,
    marginBottom: 12,
    letterSpacing: 2,
  },
  wordle: {
    color: "#fff",
    fontFamily: "Michroma",
  },
  x: {
    color: "#4CAF50",
    fontFamily: "Michroma",
  },
  selectorWrapper: {
    marginBottom: 24,
    alignItems: "center",
    width: "100%",
  },
  highScoreBoard: {
    alignItems: "center",
    marginBottom: 24,
    backgroundColor: "#232323",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    minWidth: 260,
  },
  highScoreLabel: {
    color: "#bbb",
    fontFamily: "Michroma",
    fontSize: 14,
    marginBottom: 6,
    letterSpacing: 1,
  },
  highScoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 18,
  },
  scoreCol: {
    alignItems: "center",
    flex: 1,
  },
  levelLabel: {
    fontFamily: "Michroma",
    fontSize: 14,
    marginBottom: 2,
    letterSpacing: 1,
  },
  highScoreValue: {
    color: "#fff",
    fontFamily: "Michroma",
    fontSize: 22,

    letterSpacing: 2,
  },
  container: { flex: 1, justifyContent: "center", backgroundColor: "#121213" },
  headerRow: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    marginBottom: 0,
    paddingHorizontal: 0,
  },
  homeButton: {
    padding: 8,
    marginTop: 8,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    width: "100%",
  },
  highScoreBoardModern: {
    alignItems: "center",
    marginBottom: 24,
    backgroundColor: "#1e1e1e",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
    minWidth: 300,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    width: "100%",
    maxWidth: 380,
  },
  highScoreLabelModern: {
    color: "#ccc",
    fontFamily: "Michroma",
    fontSize: 15,
    marginBottom: 12,
    letterSpacing: 1,
  },
  highScoreRowModern: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 20,
  },
  scoreColModern: {
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 8,
  },
  levelLabelModern: {
    fontFamily: "Michroma",
    fontSize: 13,
    marginBottom: 6,
    letterSpacing: 1,
  },
  highScoreValueModern: {
    color: "#fff",
    fontFamily: "Michroma",
    fontSize: 20,
    letterSpacing: 1,
    textAlign: "center",
    textAlignVertical: "center",
  },
  highScoreNameModern: {
    display: "none", // hide name
  },
  historyList: {
    display: "none", // hide history
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#232323",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    width: "80%",
    borderWidth: 1,
    borderColor: "#333",
  },
  modalTitle: {
    color: "#fff",
    fontFamily: "Michroma",
    fontSize: 20,
    marginBottom: 10,
  },
  modalMessage: {
    color: "#bbb",
    fontFamily: "Michroma",
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
  },
  modalLabel: {
    color: "#bbb",
    fontFamily: "Michroma",
    fontSize: 14,
    marginBottom: 8,
  },
  modalInput: {
    width: "100%",
    height: 50,
    backgroundColor: "#333",
    borderRadius: 8,
    paddingHorizontal: 12,
    color: "#fff",
    fontFamily: "Michroma",
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#444",
  },
  modalButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontFamily: "Michroma",
    fontSize: 16,
  },
  modalButtonCancel: {
    backgroundColor: "#F44336",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  modalButtonTextCancel: {
    color: "#fff",
    fontFamily: "Michroma",
    fontSize: 16,
  },
  scoreCircle: {
    backgroundColor: "#2a2a2a",
    borderRadius: 28,
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    marginBottom: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#3a3a3a",
    paddingHorizontal: 4,
  },
});
