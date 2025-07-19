import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { MaterialIcons } from "@expo/vector-icons";

/**
 * Modal for when user tries to submit an incomplete word
 */
export const FillAllBlanksModal = ({ visible, onDismiss }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <View style={globalStyles.modalOverlay}>
        <View style={[globalStyles.modalContainer, { paddingVertical: 32 }]}>
          <Text
            style={[
              globalStyles.modalTitle,
              { fontFamily: "Michroma-Regular" },
            ]}
          >
            Fill All Blanks
          </Text>
          <Text
            style={[globalStyles.modalText, { fontFamily: "Michroma-Regular" }]}
          >
            Please fill all letter blocks before submitting your guess.
          </Text>
          <TouchableOpacity
            style={globalStyles.modalButton}
            onPress={onDismiss}
          >
            <Text
              style={[
                globalStyles.modalButtonText,
                { fontFamily: "Michroma-Regular" },
              ]}
            >
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

/**
 * Modal for when user submits an invalid word
 */
export const InvalidWordModal = ({ visible, word, onDismiss }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <View style={globalStyles.modalOverlay}>
        <View
          style={[
            globalStyles.modalContainer,
            {
              backgroundColor: "#ff4444",
              borderColor: "#b71c1c",
              borderWidth: 2,
            },
          ]}
        >
          <MaterialIcons
            name="error-outline"
            size={48}
            color="#fff"
            style={{ alignSelf: "center", marginBottom: 12 }}
          />
          <Text
            style={[
              globalStyles.modalTitle,
              { fontFamily: "Michroma-Regular", color: "#fff" },
            ]}
          >
            Invalid Word
          </Text>
          <Text
            style={[
              globalStyles.modalText,
              {
                fontFamily: "Michroma-Regular",
                color: "#fff",
                textAlign: "center",
              },
            ]}
          >
            This word not exsits
          </Text>
          <TouchableOpacity
            style={[
              globalStyles.modalButton,
              { backgroundColor: "#fff", marginTop: 16 },
            ]}
            onPress={onDismiss}
          >
            <Text
              style={[
                globalStyles.modalButtonText,
                { fontFamily: "Michroma-Regular", color: "#ff4444" },
              ]}
            >
              Try Again
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

/**
 * Modal for when user guesses the correct word
 */
export const CorrectWordModal = ({ visible, word, onNextWord }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onNextWord}
    >
      <View style={globalStyles.modalOverlay}>
        <View style={globalStyles.modalContainer}>
          <Text
            style={[
              globalStyles.modalTitle,
              { color: "#4CAF50", fontFamily: "Michroma-Regular" },
            ]}
          >
            Correct!
          </Text>

          {/* Display the word with all green letters */}
          <View style={styles.wordDisplay}>
            {word?.split("").map((letter, index) => (
              <View
                key={index}
                style={[styles.letterBox, { backgroundColor: "#4CAF50" }]}
              >
                <Text
                  style={[
                    styles.letterText,
                    { fontFamily: "Michroma-Regular" },
                  ]}
                >
                  {letter.toUpperCase()}
                </Text>
              </View>
            ))}
          </View>

          <Text
            style={[globalStyles.modalText, { fontFamily: "Michroma-Regular" }]}
          >
            You found the word "{word?.toUpperCase()}"!
          </Text>

          <TouchableOpacity
            style={[globalStyles.modalButton, { backgroundColor: "#4CAF50" }]}
            onPress={onNextWord}
          >
            <Text
              style={[
                globalStyles.modalButtonText,
                { color: "#ffffff", fontFamily: "Michroma-Regular" },
              ]}
            >
              Next Word
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

/**
 * Quick modal for invalid word (brief notification)
 */
export const QuickInvalidWordModal = ({ visible }) => {
  if (!visible) return null;

  return (
    <View style={styles.quickModal}>
      <Text style={[styles.quickModalText, { fontFamily: "Michroma-Regular" }]}>
        Invalid word!
      </Text>
    </View>
  );
};

/**
 * Modal for game over state
 */
export const GameOverModal = ({
  visible,
  correctAnswer,
  onReset,
  onRequestClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <View style={globalStyles.modalOverlay}>
        <View style={globalStyles.modalContainer}>
          <Text
            style={[
              globalStyles.modalTitle,
              { fontFamily: "Michroma-Regular" },
            ]}
          >
            Game Over
          </Text>
          <Text
            style={[globalStyles.modalText, { fontFamily: "Michroma-Regular" }]}
          >
            The correct word was: {correctAnswer}
          </Text>
          <TouchableOpacity style={globalStyles.modalButton} onPress={onReset}>
            <Text
              style={[
                globalStyles.modalButtonText,
                { fontFamily: "Michroma-Regular" },
              ]}
            >
              Next Word
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  quickModal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    backgroundColor: "#ff4444",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    zIndex: 1000,
  },
  quickModalText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  wordDisplay: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
    gap: 8,
  },
  letterBox: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#4CAF50",
  },
  letterText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
