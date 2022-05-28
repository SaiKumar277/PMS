import React from 'react';

import { View, StyleSheet, TextInput } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AppTextInput({ leftIcon, ...otherProps }) {
  return (
    <View style={styles.container}>
      {leftIcon && (
        <MaterialCommunityIcons
          name={leftIcon}
          size={20}
          color="#788190"
          style={styles.icon}
        />
      )}
      <TextInput
        style={styles.input}
        placeholderTextColor="#788190"
        {...otherProps}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F9FF',
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    width:315,
    height:50,
    marginTop:10,
    borderRadius:10,
    borderWidth:0.02
  },
  icon: {
    marginRight: 10
  },
  input: {
    width: '80%',
    fontSize: 16,
    color: '#788190'
  }

});