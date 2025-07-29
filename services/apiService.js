import { API_ENDPOINTS } from "../constants/gameConstants";
import { WORDS_4, WORDS_5, WORDS_8 } from "../utils/wordLists";
export const checkWordExists = async (word) => {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.DICTIONARY_API}/${word.toLowerCase()}`
    );
    return response.ok; // 200 means word exists
  } catch (error) {
    console.error("Dictionary API check failed:", error);
    return false;
  }
};

export const submitGuess = async (guess) => {
  try {
    const response = await fetch("https://wordle-api.vercel.app/api/wordle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ guess: guess.toLowerCase() }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Wordle API Error:", error);
    throw error;
  }
};

export const getCurrentWord = (difficulty = "medium") => {
  let list;
  switch (difficulty) {
    case "easy":
      list = WORDS_4;
      break;
    case "medium":
      list = WORDS_5;
      break;
    case "hard":
      list = WORDS_8;
      break;
    default:
      list = WORDS_5;
  }
  return list[Math.floor(Math.random() * list.length)];
};

export const getCurrentWordInfo = async (testWord = "hello") => {
  try {
    const response = await fetch("https://wordle-api.vercel.app/api/wordle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ guess: testWord.toLowerCase() }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting current word info:", error);
    return null;
  }
};

export const findCorrectAnswer = async (difficulty = "medium") => {
  let list;
  switch (difficulty) {
    case "easy":
      list = WORDS_4;
      break;
    case "medium":
      list = WORDS_5;
      break;
    case "hard":
      list = WORDS_8;
      break;
    default:
      list = WORDS_5;
  }
  return list[Math.floor(Math.random() * list.length)].toUpperCase();
};
