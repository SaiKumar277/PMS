import React, { useState, useContext,useEffect,Component} from 'react';
import {AppTextInput , Picker ,Dimensions, StatusBar,SafeAreaView ,StyleSheet, Text,TouchableOpacity,View ,Image,TextInput,AppButton} from 'react-native';
import Button from '../../components/AppButton';
import img1 from '../../assets/images/homeback.png';
import jobicon from '../../assets/images/jobsimg.png';
import { FontAwesome5,AntDesign,Entypo } from '@expo/vector-icons';
import { Auth ,API ,graphqlOperation} from 'aws-amplify';
import sort from '../../assets/images/sort.png';
import ModalDropdown from 'react-native-modal-dropdown';
import Navbar from '../../components/Navbar';
import Menubar from '../../components/Menubar';


var { height } = Dimensions.get('window');
  var box_count = 12;
  var box_height = height / box_count;

export default function SM_ServiceHistory ({navigation}){
    const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [Profile, setProfile] = useState('');
  
   const state = {user:''}
   const updateUser = (user) => {
       this.setState({user : user})
   }
  
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
            <StatusBar animated = {true}
                            backgroundColor="#000000"/>   
                    <Menubar navigation={navigation} />  
            </View> 

            <View style={styles.Second}>
                <Text style={styles.serTxt}>Service History</Text>
            </View>
            <View style = {styles.sortB}>
                    <Text style={styles.filtxt}>Sort</Text>
                    <TouchableOpacity style = {styles.sortButton} 
                    onPress = {() => {alert("you clicked")}}>
                     <Image 
                        source = {sort} />
                    </TouchableOpacity>
                </View>

                <View style={styles.Third}>
                    <Entypo name="controller-record" size={14} style={styles.cirIcon}/>
                    <Text style={styles.dateTxt}>01-02-2022</Text>
                </View>

                <View style={styles.Fourth}>
                 </View>
                 <View style={styles.Fifth}>
                     <View style = {styles.five1}>
                     <View style={styles.fivep1}>
                         <AntDesign name="minus" style={styles.minusIcon} size={20} />
                         <Text style={styles.sideTxt}>Block C, Kingston</Text>
                         </View>
                         <View style={styles.fivep1}>
                         <AntDesign name="minus" style={styles.minusIcon} size={20} />
                         <Text style={styles.sideTxt}>Cleaning</Text>
                         </View>
                         <View style={styles.fivep1}>
                         <AntDesign name="minus" style={styles.minusIcon} size={20} />
                         <Text style={styles.sideTxt}>17:00 to 19:30</Text>
                         </View>
                     </View>
                     <View style={styles.five2}>
                     <Image  style = {styles.img} 
                     source = {img1} />
                     </View>
                 </View>
                 
                 <View style={styles.Sixth}>
                     <View style = {styles.five1}>
                         <View style={styles.fivep1}>
                         <AntDesign name="minus" style={styles.minusIcon} size={20} />
                         <Text style={styles.sideTxt}>Block B, Kingston</Text>
                         </View>
                         <View style={styles.fivep1}>
                         <AntDesign name="minus" style={styles.minusIcon} size={20} />
                         <Text style={styles.sideTxt}>Gardening</Text>
                         </View>
                         <View style={styles.fivep1}>
                         <AntDesign name="minus" style={styles.minusIcon} size={20} />
                         <Text style={styles.sideTxt}>9:30 to 10:30</Text>
                         </View>
                     </View>
                     <View style={styles.five2}>
                     <Image  style = {styles.img} 
                        source = {img1} />
                     </View>
                 </View>
                <Navbar/>
          
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    First :{
      height : 0.5*box_height
    },
    hamButton:{
        padding : 10   
    },
    msgButton : {  
        padding:5,
        position:'absolute',
        right:3,
        alignSelf:'flex-start'  
    },
    two:{
        marginTop:10,
        height : '4%',
        width:'100%',
        backgroundColor:"#00286B"
    },
    Second:{
      height:0.8*box_height,
    },
    serTxt:{
        fontWeight:'bold',
        fontSize:0.45*box_height,
        alignSelf:'center'
    },
    sortB:{
        flexDirection:'row',
        borderTopLeftRadius : 10,
        borderTopRightRadius : 10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        alignSelf:'center',
        alignContent:'center',
        height:0.65*box_height,
        borderWidth : 2,
        width:"28%",
        borderColor : '#005DAF'
    },
    filtxt:{  
        padding:3,
        marginLeft:16,
        alignContent:'center',
        alignSelf:'center',
        fontSize:20
    },
    sortButton:{
        marginTop:5,
        padding:3,
        marginLeft:5,
        width:'10%',
        height:0.3*box_height
        
    },
    Third:{
        marginLeft:20,
     height:0.5*box_height,
     flexDirection:'row'
    },
    cirIcon:{
       color:'#00286B',
       alignSelf:'center'
    },
    dateTxt:{
        padding:3,
     fontSize:0.35*box_height
    },
    Fourth:{
        height:0.02*box_height,
         width:'80%',
         alignSelf:'center',
         marginTop:5,
         marginBottom:10,
         backgroundColor:"#00286B"
     },
     Fifth:{
         padding:8,
         height:2.8*box_height,
       flexDirection:'row',
      
     },
     Sixth:{
        padding:8,
        marginTop:10,
        height:2.8*box_height,
        flexDirection:'row',
     
    },
     five1:{
         marginTop:0.3*box_height,
        backgroundColor:'#1364A9',
         width:'60%',
         height:2.5*box_height,
        flexDirection:'column',
     },
     five2:{
        width:'40%',
        height:2.8*box_height
     },
     fivep1:{
     flexDirection:'row',
     },
     minusIcon:{
       color:'#ffffff',
       paddingRight:10,
       paddingTop:10,
       paddingBottom:10
     },
     sideTxt:{
        color:'#ffffff',
        paddingTop:10,
        paddingBottom:10,
        fontSize:0.3*box_height
     },
     img:{
         width:'100%',
         height:'100%',
         position:'absolute'
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