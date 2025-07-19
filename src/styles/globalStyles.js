import { StyleSheet } from "react-native";

// Color constants
export const COLORS = {
  WHITE: "#ffffff",
  BLACK: "#000000",
  GRAY: "#818384",
  LIGHT_BLACK: "#3a3a3c",
  GREEN: "#538d4e",
  YELLOW: "#b59f3b",
  DARK_GRAY: "#121213",
  BORDER_GRAY: "#3a3a3c",
  KEYBOARD_GRAY: "#818384",
};

// Global styles
export const globalStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: COLORS.DARK_GRAY,
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  // Game board styles
  gameBoard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  cell: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.BORDER_GRAY,
    backgroundColor: "transparent",
    margin: 2,
    borderRadius: 4,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  cellText: {
    color: COLORS.WHITE,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: "Michroma-Regular",
  },

  // Keyboard styles
  keyboard: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 4, // minimal horizontal padding
    paddingBottom: 0,
    marginTop: 0,
    flexDirection: "column",
    alignSelf: "center",
  },

  keyboardRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6, // less gap between rows
    width: "100%",
  },

  key: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7", // light white color
    borderRadius: 6,
    margin: 2,
    minWidth: 32,
    minHeight: 42,
    maxHeight: 46,
    paddingHorizontal: 10,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  specialKey: {
    minWidth: 52,
    backgroundColor: "#f7f7f7", // light white color for special keys too
  },

  keyText: {
    color: COLORS.BLACK,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false,
    fontFamily: "Michroma-Regular",
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    backgroundColor: COLORS.DARK_GRAY,
    borderRadius: 12,
    padding: 24,
    margin: 20,
    alignItems: "center",
    minWidth: 300,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.WHITE,
    marginBottom: 8,
    textAlign: "center",
    fontFamily: "Michroma-Regular",
  },

  modalText: {
    fontSize: 16,
    color: COLORS.WHITE,
    textAlign: "center",
    marginBottom: 18,
    lineHeight: 22,
    fontFamily: "Michroma-Regular",
  },

  modalButton: {
    backgroundColor: "whitesmoke",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: "center",
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  modalButtonText: {
    color: COLORS.BLACK,
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Michroma-Regular",
  },

  // Difficulty selector styles
  difficultyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.DARK_GRAY,
    paddingHorizontal: 20,
  },

  difficultyTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.WHITE,
    marginBottom: 40,
    textAlign: "center",
    fontFamily: "Michroma-Regular",
  },

  difficultyButton: {
    backgroundColor: COLORS.GRAY,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    marginVertical: 8,
    minWidth: 200,
    alignItems: "center",
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  difficultyButtonText: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Michroma-Regular",
  },

  selectedDifficulty: {
    backgroundColor: COLORS.GREEN,
  },

  // Animation styles
  fadeIn: {
    opacity: 1,
  },

  fadeOut: {
    opacity: 0,
  },

  // Utility styles
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },

  fullWidth: {
    width: "100%",
  },

  fullHeight: {
    height: "100%",
  },

  easyText: {
    color: "#4CAF50", // green
    fontFamily: "Michroma-Regular",
  },
  mediumText: {
    color: "#FFD600", // yellow
    fontFamily: "Michroma-Regular",
  },
  hardText: {
    color: "#2196F3", // blue
    fontFamily: "Michroma-Regular",
  },
});
