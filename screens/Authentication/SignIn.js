import React, { useState, useContext } from 'react';

import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet,StatusBar, Image } from 'react-native';

import { AuthContext } from '../../navigation/AuthProvider';

import AppTextInput from '../../components/TextInput';

import AppButton from '../../components/AppButton';
import Rectangle from '../../assets/images/Rectangle.png';



import illustration from '../../assets/images/Illustration.png';



export default function SignIn({ navigation ,updateAuthState}) {
    

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { SignIn } = useContext(AuthContext);
  const handleSubmit = async () => {
    try {
      if(email.trim() == "select" || password.trim() == "select")
              {
                  console.log("AlertBox: ");
                  Alert.alert(
                      "Enter all fields",
                      "You left some required fields",
                    );
              }
      else{
        SignIn(email, password ,{updateAuthState});
        } 
      }
      catch(e){
        console.log(e);
      }

};
  return (
      <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
          <StatusBar
        animated={true}
        backgroundColor="#000000"/>
          <View style={styles.imgbox}>
            <Image  style={styles.img1}  source={Rectangle}/>
            <Image  style={styles.img2} source={illustration}/>
          </View>
          <View style={styles.box1}>
                        
                <Text style={styles.title}>Login</Text>
                <Text style={styles.subtitle}>Sign to your account</Text>
                <Text style={styles.subtitle2}>Your Email</Text>
                <AppTextInput
                value={email}
                onChangeText={text => setEmail(text)}
                leftIcon="email"
                placeholder="mymail@domain.abc"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                />
                <Text style={styles.subtitle3}>Password</Text>
                <AppTextInput
                value={password}
                onChangeText={text => setPassword(text)}
                leftIcon="lock"
                placeholder="Enter password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                textContentType="password"
                />
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword1')}>
                  <Text style={styles.forgotPasswordButtonText}>
                   forgot Password
                  </Text>
                </TouchableOpacity>
                 <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.signupButtonText}>
                    I don't have account
                    </Text>
                </TouchableOpacity>
                <AppButton title="Login" onPress={handleSubmit} />
                <View style={styles.footerButtonContainer}>
               
                </View>
          </View>
      </View>
      </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  imgbox:{
    alignSelf:'flex-end',
    justifyContent:'flex-end',
    marginBottom:20 
    
  },
  img2:{
      width:213,
      height:203,
    alignSelf:'flex-end',
    position:'absolute'
    
  },
  img1:{
    width:100,
    height:210,
    
    },
    box1:{
        paddingHorizontal:'5%'
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
    marginTop:5
  },
  subtitle2: {
    fontFamily:'Lato-Regular',
    fontSize: 14,
    color: '#121515',
    fontWeight: '400',
    marginTop:49
  },
  subtitle3: {
    fontFamily:'Lato-Regular',
    fontSize: 14,
    color: '#121515',
    fontWeight: '400',
    marginTop:30
  },
  footerButtonContainer: {
      alignSelf:'center',
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  forgotPasswordButtonText: {
    marginTop:10,
    paddingLeft:'60%',
    color: '#121515',
    fontSize: 14,
    fontFamily:'Lato-Bold',
    flexDirection:'row-reverse'
  },
  signupButtonText:{
      color:'#EF3561',
      fontSize: 14,
      fontFamily:'Lato-Regular',
      fontWeight:'600',
      alignSelf:'center',
      marginTop:50

  }
});