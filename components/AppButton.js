import React from 'react';
import { StyleSheet, Text, TouchableOpacity ,Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
export default function AppButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    marginBottom:'15%',
    marginTop:15,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:30,
    height:50,
    borderRadius:10,   
    backgroundColor: '#00286B'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase'
  }
});