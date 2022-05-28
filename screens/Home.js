import React from 'react';
import { TouchableOpacity,View, Text, StyleSheet, Button } from 'react-native';
import { Auth } from 'aws-amplify';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function Home({ updateAuthState }) {
  async function signOut() {
    try {
      await Auth.signOut();
      updateAuthState('loggedOut');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }
  async function trail(){
    try {
      const currentUserInfo = await Auth.currentUserInfo()
      //const Plan = currentUserInfo.attributes['custom:Plan']
      console.log('fetching user Plan: ', currentUserInfo.attributes['name']);
    } catch (err) {
      console.log('error fetching user info: ', err);
    }
  }
//<Button title="Plan" color="tomato" onPress={trail} />
  return (
    <View style={styles.container}>
      <Button title="Sign Out" color="#00286B" onPress={signOut} />

      <MaterialCommunityIcons
          name="plus"
          size={45}
          color="#788190"
          style={styles.icon}
        />
        <Button title="Plan" color="tomato" onPress={trail} />
      
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    marginTop: 20
  },
  icon:{
    paddingVertical:25
  }
});