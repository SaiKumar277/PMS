
import React, { useState, useContext,useEffect,Component} from 'react';
import { Picker ,Dimensions, StatusBar,SafeAreaView ,StyleSheet, Text,TouchableOpacity,View ,Image,TextInput} from 'react-native';
import AppTextInput from '../../components/TextInput'
import { AuthContext } from '../../navigation/AuthProvider';
import AppButton from '../../components/AppButton';
import { AntDesign } from '@expo/vector-icons';
var { height } = Dimensions.get('window');
  var box_count = 12;
  var box_height = height / box_count;

export default function ForgotPassword1 ({navigation}){
    const [email, setEmail] = useState('');
    const { forgotPassword } = useContext(AuthContext);

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
           <StatusBar animated = {true}
                      backgroundColor="#000000"/>

                
                <View style = {styles.First}>
                    <TouchableOpacity style = {styles.hamButton} 
                    onPress={() => navigation.navigate('SignIn')}>
                       <AntDesign name="left" size={25} style={styles.backIcon}/>
                    </TouchableOpacity>
               
                    
               
                </View>   
            </View>     
            <View>
            <Text style={styles.Txt1}>Forgot Password</Text>
            <Text style={styles.Txt2}>Enter your email address and we will</Text>
            <Text style={styles.Txt2}>send you a reset instructions.</Text>
            </View>

            <View>
            <Text style={styles.Txt3}>Email Address</Text>
            </View>
            <View style={styles.btn1}>
            <AppTextInput
               placeholder = "email@domain.com"
               autoCapitalize="none"
               autoCorrect={false}
               onChangeText={text => setEmail(text)}
               keyboardType="email-address"

               />
            </View>   
            <View style = {styles.three}>
                </View>

                <View style = {styles.resetBtn}>
               <AppButton title="Reset Password" onPress={() => forgotPassword(email,{navigation}) }/>
               </View>  
          
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    First :{
      height : 1*box_height,
      flexDirection:'row'
    },
    
    backIcon:{
        paddingLeft : 10,
        marginTop:20
    },
    Txt:{
        marginLeft:110,
        marginTop:20
        
    },
    Txt1:{
    fontSize:0.6*box_height,
    marginLeft:20,
    marginTop:20,
    color:'#010F07'

    },
    Txt2:{
        fontSize:0.2*box_height,
        marginLeft:20,
        marginTop:10,
        color:'#868686'

    },
    Txt3 : {
       fontSize:0.35*box_height,
       marginLeft:20,
       color:'#788190',
       marginTop:20
    },
    btn1:{
        //marginTop:20,
        //height:'40%',
        width:'85%',
        marginLeft:20,
        borderBottomColor:'black',
        borderBottomWidth:1
    },
    three:{
        height : '0.3%',
        width:'0%',
        //backgroundColor:"#000000",
        marginLeft:20,
    },
    resetBtn:{
       alignSelf:'center',
       marginTop:28,
        width:'80%'
    },
    botmBox  : {
        width:'100%',
        height:box_height,
        borderTopRightRadius : 40,
        borderTopLeftRadius:40,
        borderWidth:5,
        borderColor:"#00286B",
        marginBottom:2,
        position: 'absolute', 
        bottom: 0,
        flex : 1,
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
   b1:{
       padding:7,     
   },
   Text1 :{
       flexDirection:'row', 
       alignSelf:'flex-start',
       marginLeft:40,
       padding:2 
   }
});