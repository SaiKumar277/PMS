import React from 'react';
import { TouchableOpacity,View, Text, StyleSheet, Button } from 'react-native';
import { Auth } from 'aws-amplify';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function MC_Home({ updateAuthState }) {
  async function signOut() {
    try {
      await Auth.signOut();
      updateAuthState('loggedOut');
    } catch (error) {
      console.log('Error signing out: ', error);
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
      <Text style={{fontSize:20}}>MC</Text>
      
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