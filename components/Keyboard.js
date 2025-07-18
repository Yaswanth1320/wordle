import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const keys = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['ENTER','Z','X','C','V','B','N','M','DEL']
];

const Keyboard = ({ onKeyPress }) => {
  return (
    <View style={{ marginBottom: 40 }}>
      {keys.map((row, idx) => (
        <View style={styles.row} key={idx}>
          {row.map((key) => (
            <Pressable key={key} onPress={() => onKeyPress(key)} style={styles.key}>
              <Text style={styles.keyText}>{key}</Text>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'center', marginVertical: 5 },
  key: {
    backgroundColor: '#777',
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginHorizontal: 3,
    borderRadius: 5,
    minWidth: 35,
    alignItems: 'center'
  },
  keyText: { color: 'white', fontSize: 14, fontWeight: 'bold' }
});

export default Keyboard;
