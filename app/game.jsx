import { Ionicons } from "@expo/vector-icons";
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import Keyboard from "../components/Keyboard";
import {
  CorrectWordModal,
  GameOverModal,
  InvalidWordModal,
  QuickInvalidWordModal,
} from "../components/Modals";
import { useModals } from "../components/useModals";
import { useWordleGame } from "../components/useWordleGame";
import WordGrid from "../components/WordGrid";
import { GAME_STATES } from "../constants/gameConstants";

export default function GameScreen() {
  const { level } = useLocalSearchParams();
  const game = useWordleGame();
  const modals = useModals();
  const router = useRouter();
  const [showGameOver, setShowGameOver] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const prevHighScoreRef = useState(game.highScore);

  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      if (navigation && navigation.setOptions) {
        navigation.setOptions({ gestureEnabled: false });
      }
    }, [navigation])
  );

  // Set difficulty on load
  if (level && game.difficulty !== level) {
    game.changeDifficulty(level);
  }

  const handleKeyPress = async (key) => {
    // If game is lost and modal is visible, hide modal on BACKSPACE
    if (game.gameState === GAME_STATES.LOST && key === "BACKSPACE") {
      // Reset game state to allow user to see the board again
      game.resetGame();
      modals.hideAllModals();
      return;
    }
    const result = await game.handleKeyPress(key);

    if (result?.error === "Invalid word length") {
      modals.showQuickInvalidWordModal();
    } else if (result?.error === "Word not found!") {
      modals.showInvalidWordModalHandler();
    }
    // No need to handle defeat modal here, it's based on game state
  };

  useEffect(() => {
    if (game.gameState === GAME_STATES.LOST) {
      setShowGameOver(true);
      const timer = setTimeout(() => {
        setShowGameOver(false);
        setTimeout(() => {
          router.push("/difficulty");
        }, 200);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setShowGameOver(false);
    }
  }, [game.gameState]);

  useEffect(() => {
    if (game.showCorrectModal && game.solvedCount > prevHighScoreRef.current) {
      setShowCelebration(true);
      prevHighScoreRef.current = game.solvedCount;
      setTimeout(() => setShowCelebration(false), 2500);
    }
  }, [game.showCorrectModal, game.solvedCount]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121213" }}>
      {/* Header Row with Home Button, High Score, and Solved Streak */}
      <View style={styles.topBar}>
        <Pressable
          style={styles.homeButton}
          onPress={() => {
            Alert.alert(
              "Leave Game",
              "Are you sure you want to go home? Your progress will be lost.",
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Yes",
                  style: "destructive",
                  onPress: () => router.replace("/difficulty"),
                },
              ]
            );
          }}
        >
          <Ionicons name="home" size={28} color="#fff" />
        </Pressable>
        <View style={styles.scoreInfoCol}>
          <Text style={styles.highScoreText}>High Score: {game.highScore}</Text>
          <Text style={styles.streakText}>Solved: {game.solvedCount}</Text>
        </View>
      </View>
      <View style={styles.container}>
        {/* High Score Display */}
        <View style={styles.highScoreContainer}>
          <Text style={styles.highScoreText}>High Score: {game.highScore}</Text>
        </View>
        {/* Solved streak counter */}
        <View style={styles.streakContainer}>
          <Text style={styles.streakText}>Solved: {game.solvedCount}</Text>
        </View>
        <WordGrid
          guesses={game.guesses}
          currentGuess={game.currentGuess}
          wordLength={game.wordLength}
          maxAttempts={game.maxAttempts}
        />
        <Keyboard onKeyPress={handleKeyPress} guesses={game.guesses} />
        {/* Modals */}
        <InvalidWordModal
          visible={modals.showInvalidWordModal}
          onDismiss={modals.hideInvalidWordModal}
        />
        <CorrectWordModal
          visible={game.showCorrectModal}
          word={game.correctWord}
          onNextWord={() => {
            game.hideCorrectModal();
            game.nextWord();
            modals.hideAllModals();
          }}
        />
        {showCelebration && (
          <ConfettiCannon
            count={120}
            origin={{ x: 200, y: 0 }}
            fadeOut={true}
            explosionSpeed={350}
            fallSpeed={3000}
          />
        )}
        <GameOverModal
          visible={showGameOver}
          correctAnswer={game.correctAnswer}
        />
        <QuickInvalidWordModal visible={modals.showQuickInvalidModal} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121213",
    paddingVertical: 40,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    marginBottom: 0,
    marginTop: 0,
  },
  homeButton: {
    padding: 8,
    // marginTop: 8, // remove extra gap
  },
  topBar: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 8,
    marginTop: 0,
  },
  scoreInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  scoreInfoCol: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 2,
  },
  highScoreContainer: {
    display: "none", // hide old
  },
  highScoreText: {
    color: "#fff",
    fontSize: 18,

    fontFamily: "Michroma",
  },
  streakContainer: {
    display: "none", // hide old
  },
  streakText: {
    color: "#fff",
    fontSize: 18,

    fontFamily: "Michroma",
  },
});
