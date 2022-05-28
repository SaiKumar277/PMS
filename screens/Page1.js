import React, { useState, useContext } from 'react';

import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet,StatusBar, Image,Dimensions } from 'react-native';

import { AuthContext } from '../navigation/AuthProvider';

import AppTextInput from '../components/TextInput';

import AppButton from '../components/AppButton';
import Rectangle from '../assets/images/Rectangle.png';
import ModalDropdown from 'react-native-modal-dropdown';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window');
import illustration from '../assets/images/Illustration.png';



export default function Page1({ navigation ,updateAuthState}) {
    
  const [name, setname] = useState('');

  const [password, setPassword] = useState('');

  const [email, setEmail] = useState('');

  const [Profile, setProfile] = useState('');

  const { SignUp } = useContext(AuthContext);
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
                        
                <Text style={styles.title}>Register</Text>
                <Text style={styles.subtitle}>Create your account</Text>
                <Text style={styles.subtitle2}>Your Name</Text>
                <AppTextInput
                  value={name}
                  onChangeText={text => setname(text)}
                  leftIcon="account"
                  placeholder="Enter username"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                />
                <Text style={styles.subtitle3}>Your Email</Text>
                <AppTextInput
                value={email}
                onChangeText={text => setEmail(text)}
                leftIcon="email"
                placeholder="mymail@domain.abc"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                />
                <Text style={styles.subtitle3}>Your Profile</Text>
                <View style={styles.profile}>
                    {
                      <MaterialCommunityIcons
                        name='star'
                        size={20}
                        color="#788190"
                        style={{marginRight: 10}}
                      />
                    }
                    <ModalDropdown   onSelect = {(index, value) => { setProfile(value)} } dropdownTextStyle={styles.drpdwntext} dropdownStyle={styles.dropdowncontainerStyle} style={styles.dropdownStyle} textStyle={styles.drpdwntext} defaultValue='Select your Profile' options={['Management Comapany','Serviceman']}/>
                </View>
                <Text style={styles.subtitle3}>Set Password</Text>
                 <AppTextInput
                value={password}
                onChangeText={text => setPassword(text)}
                leftIcon="lock"
                placeholder="***********"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                textContentType="password"
                />
                 <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.signinButtonText}>
                    Already have an account? Sign In
                    </Text>
                </TouchableOpacity>
                <AppButton title="Sign Up" onPress={() => SignUp(name, email, password, Profile,{navigation})} />
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
        paddingHorizontal:'5%',
        
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
    marginTop:20
  },
  subtitle3: {
    fontFamily:'Lato-Regular',
    fontSize: 14,
    color: '#121515',
    fontWeight: '400',
    marginTop:10
  },
  profile:{
    backgroundColor: '#F5F9FF',
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    width:315,
    height:50,
    marginTop:10,
    borderRadius:10
  },
  dropdownStyle:{
    width: '80%',
    fontSize: 16,
    color: '#788190'
  },
  drpdwntext:{
    fontSize: 16,
    color: '#788190'
  },
  dropdowncontainerStyle:{
    height:85,
    width:'70%',
    borderColor:'black'
  },
  footerButtonContainer: {
      alignSelf:'center',
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
 
  signinButtonText:{

      color:'#EF3561',
      fontSize: 14,
      fontFamily:'Lato-Regular',
      fontWeight:'600',
      alignSelf:'center',
      marginTop:35

  }
});