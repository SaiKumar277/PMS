import React, { useState, useContext,useEffect,Component} from 'react';
import {AppTextInput , Picker ,Dimensions, StatusBar,SafeAreaView ,StyleSheet, Text,TouchableOpacity,View ,Image,TextInput,AppButton} from 'react-native';
import img1 from '../../assets/images/home.png';
import jobicon from '../../assets/images/jobsimg.png';
import Navbar from '../../components/Navbar';
import Menubar from '../../components/Menubar';

var { height } = Dimensions.get('window');
  var box_count = 10;
  var box_height = height / box_count;

export default function SM_Myjobs1 ({navigation}){
  
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
           <StatusBar animated = {true}
                      backgroundColor="#000000"/>
            <Menubar navigation={navigation} />
                <View style = {styles.Bar2}>
                     <Image
                     style = {styles.jobImg} 
                     source = {jobicon}
                     />
                     <Text style = {styles.txt1}>JOBS</Text>
                </View>
            </View>
            <View style = {styles.First}>
                <View style={styles.f1}>
                <Text style = {styles.jobTxt}>My Jobs</Text>
                <View style={styles.lineOne}></View>
                </View>
                <TouchableOpacity style={styles.f2} onPress={() => navigation.navigate('SM_NewJobs')}>
                <Text style = {styles.newTxt}>New</Text>
                <View style={styles.lineTwo}></View>
                </TouchableOpacity>
            </View>        
              <Text style={styles.text}>No Job yet</Text>
              <Image  style = {styles.img} 
                     source = {img1} />           
            <Navbar/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
   
    Bar2 : 
    {
        height:box_height,
        alignSelf:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    jobImg : {
        marginTop:5
    },
    txt1 : {
        padding:5,
        fontSize:25,
        fontWeight:'bold'

    },
    First:{
         flexDirection:'row',
        
    },
    text:{
        marginVertical:40,
         color:"#00286B",
         fontSize:30,
         alignSelf:'center',
         fontWeight:'bold'
        
    },
    img :{
        alignSelf:'center',
        marginTop:20,
        height:height*0.20,
        width:'50%'
    },
   
    f1:{
        flex:1,
        flexDirection:'column'
    },
    f2:{
        flexDirection:'column',
        flex:1
    },
    lineOne:{
       
        height : '6%',
        width:'100%',
        marginLeft:5,
        backgroundColor:"#00286B"
    },
    lineTwo:{
       
        height : '4%',
        width:'100%',
        marginRight:5,
        backgroundColor:"#788190"
    },
    jobTxt :{

        padding:2,
        fontSize:23,
        flex:1,
        color:'#005DAF',
        marginLeft:20,
        fontWeight:'bold',
        alignSelf:'flex-start'
    },
    newTxt:{
        fontSize:23,
        color:'#888888',
        fontWeight:'bold',
       flex:1,
        alignContent:'center',
        alignSelf:'center',
        alignItems:'center',
        right:0
    },
   
 
});