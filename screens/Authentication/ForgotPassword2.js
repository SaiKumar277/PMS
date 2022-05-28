import React, { Component,useEffect,useState,useContext } from 'react'
import AppTextInput from '../../components/TextInput'
import {StatusBar,SafeAreaView ,StyleSheet, Text, } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import AppButton from '../../components/AppButton';
import { AuthContext } from '../../navigation/AuthProvider';
export default function ForgotPassword2 ({navigation, updateAuthState }){
    const [email, setEmail] = useState('');
    const [authCode, setAuthCode] = useState('');
    const [password, setPassword] = useState('');
    const { forgotPasswordSubmit } = useContext(AuthContext);
    return (
        <SafeAreaView >
        <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#00BCD4" translucent = {true}/>
            <Text style={{fontSize:30,fontWeight:'bold',color:'#00BCD4',}} >confirmation code has been sent to your email</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={text => setEmail(text)}
                placeholder="email"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                value={authCode}
                onChangeText={text => setAuthCode(text)}
                leftIcon="numeric"
                placeholder="Enter verification code"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={text => setPassword(text)}
                placeholder="Enter new password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                textContentType="password"
            />
            <AppButton title="Continue" onPress={() => forgotPasswordSubmit(email,authCode,password,{updateAuthState}) } />

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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
 
});

