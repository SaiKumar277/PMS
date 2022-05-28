import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
export default function AppButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf:'center',
    padding: 3,
    width: '30%',
    height:'15%',
    backgroundColor: '#1364A9'
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    alignSelf:'center',
    fontWeight: '600',
    textTransform: 'uppercase'
  }
});