import React, { useState, useContext,useEffect,Component} from 'react';
import {AppTextInput , Picker ,Dimensions, StatusBar,SafeAreaView ,StyleSheet, Text,TouchableOpacity,View ,Image,TextInput} from 'react-native';
import Icon from 'react-native-remix-icon';
import jobicon from '../../assets/images/jobsimg.png';
import { Entypo,Feather,Ionicons,FontAwesome5,FontAwesome } from '@expo/vector-icons';
import Navbar from '../../components/Navbar'
import Button from '../../components/NrmlButton';
import Menubar from '../../components/Menubar';
import ModalDropdown from 'react-native-modal-dropdown';
import AppButton from '../../components/AppButton';
import { Auth ,API ,graphqlOperation} from 'aws-amplify';
import {listJinfos} from '../../src/graphql/queries'
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
var { height } = Dimensions.get('window');
  var box_count = 14;
  var box_height = height / box_count;

export default function SM_Myjobs2 ({navigation}){
    const [day, setDay] = useState('');
    const [age, setAge] = useState('');
    const [Profile, setProfile] = useState('');
    const [data,setData] = useState([]);
        useEffect(()=>{
        fetchData();
    },[]);

    const fetchData =async() =>{
      try{
          const jobdata = await API.graphql(graphqlOperation(listJinfos));
          setData(jobdata.data.listJinfos.items);
      }
      catch(err){
          console.log('error fetching data ',err);
      }
    };
  
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <StatusBar animated = {true} backgroundColor="#000000"/>
        <View style={styles.container}>
            <Menubar navigation={navigation} />
                <View style = {styles.Bar2}>
                     <Image
                     style = {styles.jobImg} 
                     source = {jobicon}/>
                     <Text style = {styles.txt1}>JOBS</Text>
                </View>
            </View>
            <View style = {styles.First}>
                <View style={styles.f1}>
                <Text style = {styles.jobTxt}>My Jobs</Text>
                <View style={styles.lineOne}></View>
                </View>
                <View style={styles.f2}>
                <Text style = {styles.newTxt}>New</Text>
                <View style={styles.lineTwo}></View>
                </View>
            </View>
           <View style = {styles.Boxes}>
                <View style = {styles.filterB}>
                      <Text style={styles.filtxt}>Filter</Text>
                      <TouchableOpacity style = {styles.sortButton} 
                        onPress = {() => {alert("you clicked")}}>
                        <Icon name="filter-2-line" />
                    </TouchableOpacity>
                </View>
                <View style = {styles.sortB}>
                    <Text style={styles.filtxt}>Sort</Text>
                    <TouchableOpacity style = {styles.sortButton} 
                        onPress = {() => {alert("you clicked")}}>
                        <Icon name="arrow-up-down-line" />
                    </TouchableOpacity>
                </View>
           </View>
           <View>
                <View style = {{flexDirection:'row'}}>
                    <Entypo name="dot-single" size={40} color="#FBAA30"/>
                <Text style = {styles.txt2}>Management Company</Text>
                </View>               
                 <TouchableOpacity style={styles.Box} onPress={() => navigation.navigate('SM_JobDetails')}>
                     <View style={{flexDirection:'row'}}>
                         <Feather name="plus-circle" size={15} color= '#005DAF' style={styles.plus1}/>
                         <Feather name="plus-circle" size={15} color= '#005DAF' style={styles.plus2}/>
                     </View>
                    <View>
                    {data.map((item, index) => (
                      <View key={index}>
                        <View style={styles.Text1}>
                          <Text style={styles.t1}>Place:</Text>
                        <Text style={styles.t2}>{item.block_name}</Text>
                        </View>
                      <View style={styles.Text1}>
                        <Text style={styles.t1}>Category:</Text>
                        <Text style={styles.t2}>{item.category}</Text>
                      </View>
                      <View style={styles.Text1}>
                        <Text style={styles.t1}>Job Schedule:</Text>
                        <Text style={styles.t2}>{item.schedule}</Text>
                      </View>
                      <View style={styles.Text1}>
                        <Text style={styles.t1}>Day:</Text>
                        <Text style={styles.t2}>{item.day}</Text>
                      </View>
                      <View style={styles.Text1}>
                        <Text style={styles.t1}>Time:</Text>
                        <Text style={styles.t2}>{item.time}</Text>
                      </View>
                      </View>
                      ))}
                      </View>  
                                  
                    <View style={{flexDirection:'row'}}>
                         <Feather name="plus-circle" size={15} color= '#005DAF' style={styles.plus1}/>
                         <Feather name="plus-circle" size={15} color= '#005DAF' style={styles.plus2}/>
                    </View> 
                 </TouchableOpacity>
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
    hamButton:{
       // padding : 10
    },
    msgButton : {  
        // padding:5,
        // position:'absolute',
        // right:3,
        // alignSelf:'flex-start'  
    },
    bar:{
        flexWrap: "wrap",
        height:'8%'
    },
    two:{
        marginTop:20,
        height : '4%',
        width:'100%',
        backgroundColor:"#00286B"
    },
    Boxes:{
        padding:5,
        marginTop:4,
        flexDirection:'row',
        height:'7%',
        alignSelf:'center',
        width:'60%'
    },
    filterB:{
        flex:1,
        marginLeft:10,
        borderTopLeftRadius : 10,
        borderTopRightRadius : 10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        flexDirection:'row',
        borderWidth : 2,
        borderColor : '#005DAF'
    },
    sortB:{
        flex:1,
        marginLeft:10,
        flexDirection:'row',
        borderTopLeftRadius : 10,
        borderTopRightRadius : 10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        left:0,
        borderWidth : 2,
        borderColor : '#005DAF'
    },
    filtxt:{
       color:'black',
        padding:3,
        marginLeft:3,
        alignSelf:'center',
        fontSize:20
    },
    sortButton:{
        marginLeft:5,
        marginTop:3,
        padding:3,
        width:'10%',
        height:'10%',      
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
    txt2:{
       marginTop:4,
        fontSize:20,
        fontWeight:'bold'
    },
    First:{
         flexDirection:'row',       
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
    Box : {     
        borderTopLeftRadius : 20,
        borderTopRightRadius : 20,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        padding:'1%',
        marginLeft:13,
        marginRight:13,
        height:3.7*box_height,
        borderWidth : 2,
        borderColor : '#005DAF',
        justifyContent:'center'
    },
   Text1 :{
       flexDirection:'row', 
       alignSelf:'flex-start',
       marginLeft:40,
       padding:2 
   },
   t1 : {
       fontSize:17,
       padding:1
   },
   t2 :{
       padding:1,
       fontSize:17,
       color:'#888888'
   },
   startButton:{
        alignSelf:'center',
        width:'30%',    
        height : '10%',
        color:'#004D8E'
  },
  plus1:{
      left:0,
      alignContent:'flex-start',
      marginLeft:5,
      padding:3    
  },
  plus2:{
        right:0,
        position:'absolute',
        alignContent:'flex-end',
        marginRight:5,
        padding:3
  },
 
});