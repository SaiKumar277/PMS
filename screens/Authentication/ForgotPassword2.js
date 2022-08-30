import React, { Component,useEffect,useState,useContext } from 'react'
import AppTextInput from '../../components/TextInput'
import {StatusBar,Dimensions,SafeAreaView ,StyleSheet, Text,View } from 'react-native'
import AppButton from '../../components/AppButton';
import { AuthContext } from '../../navigation/AuthProvider';
var { height } = Dimensions.get('window');
  var box_count = 12;
  var box_height = height / box_count;

export default function ForgotPassword2 ({navigation, updateAuthState }){
    const [email, setEmail] = useState('');
    const [authCode, setAuthCode] = useState('');
    const [password, setPassword] = useState('');
    const { forgotPasswordSubmit } = useContext(AuthContext);
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
        <StatusBar animated = {true}
                      backgroundColor="#000000"/>
            <Text style={styles.Txt1} >Confirmation code has been sent to your email</Text>
            <View style={{paddingHorizontal:'5%', marginTop:0.5*box_height}}>
            <AppTextInput
                value={email}
                onChangeText={text => setEmail(text)}
                placeholder="email"
                leftIcon="email"
                keyboardType="email-address"
            />
            <AppTextInput
                value={authCode}
                onChangeText={text => setAuthCode(text)}
                leftIcon="numeric"
                placeholder="Enter verification code"
                keyboardType="numeric"
            />
            <AppTextInput
                value={password}
                onChangeText={text => setPassword(text)}
                placeholder="Enter new password"
                autoCapitalize="none"
                autoCorrect={false}
                leftIcon="lock"
                secureTextEntry
                textContentType="password"
            />
            </View>
            <View style = {styles.resetBtn}>
                <AppButton title="Continue" onPress={() => forgotPasswordSubmit(email,authCode,password,{updateAuthState}) } />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
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
  Txt1:{
    fontSize:0.4*box_height,
    marginLeft:20,
    marginTop:1.5*box_height,
    color:'#010F07'
    },
    resetBtn:{
        alignSelf:'center',
        marginTop:28,
        width:'80%'
     },
 
});

