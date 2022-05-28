import React, { Component,useEffect,useState ,useContext} from 'react'
import AppTextInput from '../../components/TextInput'
import {StatusBar,SafeAreaView ,StyleSheet, Text, } from 'react-native'
import { AuthContext } from '../../navigation/AuthProvider';
import AppButton from '../../components/AppButton';
export default function ForgotPassword1 ({navigation }){
    const [email, setEmail] = useState('');
    const { forgotPassword } = useContext(AuthContext);
    return (
        <SafeAreaView >
       
            <Text style={{fontSize:30,fontWeight:'bold',color:'#00BCD4',}} >Forgot Password</Text>
            <AppTextInput
            value={email}
            onChangeText={text => setEmail(text)}
            leftIcon="account"
            placeholder="Enter username"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            />
            <AppButton title="Reset Password" onPress={() => forgotPassword(email,{navigation}) } />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
bg:{
    color:'#00BCD4',
    backgroundColor:'#00BCD4',
    alignItems:'center',
    justifyContent:'center',
  },
});

