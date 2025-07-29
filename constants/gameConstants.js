// constants/gameConstants.js
export const GAME_CONFIG = {
    MAX_ATTEMPTS: 6,
    ANIMATION_DELAYS: [0, 200, 400, 600, 800, 1000],
    ANIMATION_DURATION: 500,
    SNACKBAR_DURATION: 1500,
    QUICK_MODAL_DURATION: 1000,
  };
  
  export const DIFFICULTY_LEVELS = {
    EASY: {
      name: "Easy",
      wordLength: 4,
      maxAttempts: 6,
      color: "#4CAF50",
    },
    MEDIUM: {
      name: "Medium",
      wordLength: 5,
      maxAttempts: 6,
      color: "#FF9800",
    },
    HARD: {
      name: "Hard",
      wordLength: 8,
      maxAttempts: 8,
      color: "#F44336",
    },
  };
  
  export const API_ENDPOINTS = {
    WORDLE_API: "https://wordle-api.vercel.app/api/wordle",
    DICTIONARY_API: "https://api.dictionaryapi.dev/api/v2/entries/en",
  };
  
  export const GAME_STATES = {
    PLAYING: "playing",
    WON: "won",
    LOST: "lost",
    LOADING: "loading",
    SELECTING_DIFFICULTY: "selecting_difficulty",
  };
  
  export const MODAL_TYPES = {
    INVALID_WORD: "invalid_word",
    GAME_OVER: "game_over",
    QUICK_INVALID: "quick_invalid",
    DIFFICULTY_SELECT: "difficulty_select",
  };
  
  export const COLORS = {
    BLACK: "#121213",
    LIGHT_BLACK: "#3a3a3c",
    YELLOW: "#b59f3b",
    GREEN: "#538d4e",
    WHITE: "#ffffff",
    GRAY: "#777777",
    MODAL_OVERLAY: "rgba(0, 0, 0, 0.5)",
    MODAL_BACKGROUND: "#2d2d2d",
    MODAL_BUTTON: "#4a4a4a",
    SUCCESS_GREEN: "#4CAF50",
    ERROR_RED: "#e11d48",
    EASY_GREEN: "#4CAF50",
    MEDIUM_ORANGE: "#FF9800",
    HARD_RED: "#F44336",
  };
  