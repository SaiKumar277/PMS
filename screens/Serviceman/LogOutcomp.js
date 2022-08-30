import React from 'react';
import { TouchableOpacity,View, Text, StyleSheet, Button } from 'react-native';
import { Auth } from 'aws-amplify';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function LogOutcomp({ updateAuthState }) {
  async function signOut() {
    try {
      await Auth.signOut();
      updateAuthState('loggedOut');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }

  return (
    <View style={styles.container} >
        <View style={{justifyContent:'center',marginVertical:50}}>
            <Text style = {styles.jobTxt}>
                All your data is saved!
            </Text>
        </View>
      <Button title="Sign Out" color="#00286B" onPress={signOut} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    //width:'30%',
    marginVertical:20,
    alignSelf:'center',
    alignItems:'center'
  },
  jobTxt :{
    padding:2,
    fontSize:23,
    color:'#005DAF',
    marginLeft:20,
    fontWeight:'bold',
    alignSelf:'center'
},
});