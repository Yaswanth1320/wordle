import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const getColors = (guess, solution) => {
  const colors = Array(5).fill('gray');
  const solutionArr = solution.split('');
  const guessArr = guess.split('');

  // Green pass
  guessArr.forEach((letter, i) => {
    if (letter === solutionArr[i]) {
      colors[i] = 'green';
      solutionArr[i] = null;
    }
  });

  // Yellow pass
  guessArr.forEach((letter, i) => {
    if (colors[i] === 'gray' && solutionArr.includes(letter)) {
      colors[i] = 'gold';
      solutionArr[solutionArr.indexOf(letter)] = null;
    }
  });

  return colors;
};

const WordGrid = ({ guesses, currentGuess, solution }) => {
  const emptyRows = Array(6 - guesses.length - 1).fill('');

  return (
    <View style={styles.grid}>
      {guesses.map((guess, idx) => {
        const colors = getColors(guess, solution);
        return (
          <View style={styles.row} key={idx}>
            {guess.split('').map((letter, i) => (
              <Text key={i} style={[styles.cell, { backgroundColor: colors[i] }]}>
                {letter.toUpperCase()}
              </Text>
            ))}
          </View>
        );
      })}
      {guesses.length < 6 && (
        <View style={styles.row}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Text key={i} style={[styles.cell, { borderColor: '#555' }]}>
              {currentGuess[i]?.toUpperCase() || ''}
            </Text>
          ))}
        </View>
      )}
      {emptyRows.map((_, idx) => (
        <View style={styles.row} key={idx}>
          {Array(5).fill('').map((_, i) => (
            <Text key={i} style={[styles.cell, { borderColor: '#333' }]}></Text>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: { marginVertical: 20 },
  row: { flexDirection: 'row', marginBottom: 5 },
  cell: {
    width: 45, height: 45,
    margin: 3,
    borderWidth: 2,
    borderRadius: 5,
    textAlign: 'center',
    lineHeight: 43,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  }
});

export default WordGrid;
