import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../styles/globalStyles";

export const FillAllBlanksModal = ({ visible, onDismiss }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <View style={globalStyles.modalOverlay}>
        <View style={[globalStyles.modalContainer, { paddingVertical: 32 }]}>
          <Text style={[globalStyles.modalTitle, { fontFamily: "Michroma" }]}>
            Invalid Size
          </Text>
          <Text style={[globalStyles.modalText, { fontFamily: "Michroma" }]}>
            Please fill all letter blocks before submitting your guess.
          </Text>
          <TouchableOpacity
            style={globalStyles.modalButton}
            onPress={onDismiss}
          >
            <Text
              style={[globalStyles.modalButtonText, { fontFamily: "Michroma" }]}
            >
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export const InvalidWordModal = ({ visible, onDismiss }) => {
  return (
    <Modal
      visible={visible}
      transparent
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
              { color: "#fff", fontFamily: "Michroma" },
            ]}
          >
            Invalid Word
          </Text>
          <Text
            style={[
              globalStyles.modalText,
              { color: "#fff", textAlign: "center", fontFamily: "Michroma" },
            ]}
          >
            This word does not exist.
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
                { color: "#ff4444", fontFamily: "Michroma" },
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

export const CorrectWordModal = ({ visible, word, onNextWord }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onNextWord}
    >
      <View style={globalStyles.modalOverlay}>
        <View style={globalStyles.modalContainer}>
          <Text
            style={[
              globalStyles.modalTitle,
              { color: "#4CAF50", fontFamily: "Michroma" },
            ]}
          >
            Correct!
          </Text>
          <Text
            style={[
              globalStyles.modalText,
              {
                fontFamily: "Michroma",
                fontSize: word && word.length > 6 ? 13 : 15,
                flexWrap: "wrap",
                textAlign: "center",
                marginBottom: 8,
              },
            ]}
          >
            You found the word
          </Text>
          <Text
            style={{
              color: "#4CAF50",
              fontFamily: "Michroma",
              fontSize: word && word.length > 6 ? 18 : 22,

              textAlign: "center",
              marginBottom: 8,
            }}
          >
            {word?.toUpperCase()}
          </Text>
          <TouchableOpacity
            style={[globalStyles.modalButton, { backgroundColor: "#4CAF50" }]}
            onPress={onNextWord}
          >
            <Text
              style={[
                globalStyles.modalButtonText,
                { color: "#ffffff", fontFamily: "Michroma" },
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

export const QuickInvalidWordModal = ({ visible }) => {
  if (!visible) return null;

  return (
    <View style={styles.quickModal}>
      <Text style={styles.quickModalText}>Invalid word!</Text>
    </View>
  );
};

export const GameOverModal = ({
  visible,
  correctAnswer,
  onReset,
  onRequestClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <View style={globalStyles.modalOverlay}>
        <View style={globalStyles.modalContainer}>
          <Text
            style={[
              globalStyles.modalTitle,
              { color: "#e11d48", fontFamily: "Michroma" },
            ]}
          >
            Game Over
          </Text>
          <Text
            style={[
              globalStyles.modalText,
              { color: "#e11d48", fontFamily: "Michroma" },
            ]}
          >
            The correct word was:
          </Text>
          <Text
            style={[
              globalStyles.modalText,
              {
                color: "#fff",
                fontFamily: "Michroma",
                fontSize: 18,
                marginTop: 4,
              },
            ]}
          >
            {correctAnswer}
          </Text>
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
    fontSize: 14,
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
    fontSize: 16,
  },
});
