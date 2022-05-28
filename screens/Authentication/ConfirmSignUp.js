import React, { useState,useContext } from 'react';

import { View, Text, StyleSheet,Dimensions,StatusBar,Image,TouchableOpacity } from 'react-native';

import AppTextInput from '../../components/TextInput';

import AppButton from '../../components/AppButton';
import Rectangle from '../../assets/images/Rectangle.png';
const { width, height } = Dimensions.get('window');
import illustration from '../../assets/images/Illustration.png';
import { AuthContext } from '../../navigation/AuthProvider';

export default function ConfirmSignUp({ updateAuthState }) {

  const [email, setEmail] = useState('');

  const [authCode, setAuthCode] = useState('');

  const {ConfirmSignUp } = useContext(AuthContext);

  return (
    
      <View style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="#000000"/>
          <View style={styles.imgbox}>
            <Image  style={styles.img1}  source={Rectangle}/>
            <Image  style={styles.img2} source={illustration}/>
          </View>
          <View style={styles.box1}>
              <Text style={styles.title}>Verify</Text>
              <Text style={styles.subtitle}>Please enter the verification code we sent to your
                email (yourmail@domain.abc)</Text>
              <View style={styles.box2}>
                <AppTextInput
                  value={email}
                  onChangeText={text => setEmail(text)}
                  leftIcon="account"
                  placeholder="Enter username"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                />
              <View/>
              <View style={styles.box2}>
                <AppTextInput
                  value={authCode}
                  onChangeText={text => setAuthCode(text)}
                  leftIcon="numeric"
                  placeholder="Enter verification code"
                  keyboardType="numeric"
                />
              </View>
                <TouchableOpacity >
                      <Text style={styles.signinButtonText}>
                     Resend Code?
                      </Text>
                  </TouchableOpacity>
              <View style={styles.box3}>
                <AppButton title="Confirm Sign Up"  onPress={() => ConfirmSignUp (email, authCode, {updateAuthState})} />
                </View>
              </View>
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
      safeAreaContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF'
      },
      container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
      },
      imgbox:{
        alignSelf:'flex-end',
        justifyContent:'flex-end',
        marginBottom:10        
      },
      img2:{
          width:213,
          height:203,
        alignSelf:'flex-end',
        position:'absolute'      
      },
      img1:{
        width:100,
        height:height*0.25,       
        },
        box1:{
            paddingHorizontal:'10%',
            
        },     
      title: {        
        fontFamily:'Inter-Bold',
        fontSize: 20,
        color: '#202020',
        fontWeight: '500',
        marginVertical: 5,
      },
      subtitle: {
         
        fontFamily:'Lato-Regular',
        fontSize: 16,
        color: '#788190',
        fontWeight: '400',
        marginTop:5,
        marginBottom:20
      },
      box2:{
       marginVertical:10
      },
      box3:{
        
        marginBottom:30
      },
      signinButtonText:{

        color:'#EF3561',
        fontSize: 14,
        fontFamily:'Lato-Regular',
        fontWeight:'600',
        alignSelf:'center',
        marginTop:45
  
    }
     
    });