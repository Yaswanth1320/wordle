import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  gameBoard: {
    alignItems: "center",
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 4,
  },
  cell: {
    borderWidth: 2.5,
    borderColor: "#555",
    margin: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#23272b",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cellText: {
    color: "#fff",

    textTransform: "uppercase",
    fontFamily: "Michroma",
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  keyboard: {
    marginTop: 12,
    marginBottom: 24,
    marginHorizontal: 16,
  },
  keyboardRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 4,
  },
  key: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginHorizontal: 2,
    borderRadius: 4,
    backgroundColor: "#d3d6da",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 32,
  },
  specialKey: {
    paddingHorizontal: 14,
  },
  keyText: {
    color: "#000",
    fontFamily: "Michroma",
  },
  difficultyContainer: {
    padding: 20,
    alignItems: "center",
  },
  difficultyTitle: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 16,
    fontFamily: "Michroma",
  },
  difficultyButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 6,
    borderRadius: 8,
    width: 200,
    alignItems: "center",
  },
  difficultyButtonText: {
    fontSize: 14,

    fontFamily: "Michroma",
  },
  selectedDifficulty: {
    borderWidth: 2,
    borderColor: "#fff",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#1e1e1e",
    borderRadius: 8,
    padding: 24,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,

    color: "#fff",
    textAlign: "center",
    marginBottom: 12,
    fontFamily: "Michroma",
  },
  modalText: {
    fontSize: 15,
    color: "#fff",
    textAlign: "center",
    marginBottom: 16,
    fontFamily: "Michroma",
  },
  modalButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 14,

    fontFamily: "Michroma",
  },
});
