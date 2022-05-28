import React, { useState, useContext,useEffect,Component} from 'react';
import {AppTextInput , Picker ,Dimensions, StatusBar,SafeAreaView ,StyleSheet, Text,TouchableOpacity,View ,Image,TextInput,AppButton} from 'react-native';
import jobicon from '../../assets/images/jobsimg.png';
import Navbar from '../../components/Navbar';
import Menubar from '../../components/Menubar';
import { FontAwesome5 } from '@expo/vector-icons';
import {createJinfo} from '../../src/graphql/mutations'
import { Auth ,API ,graphqlOperation} from 'aws-amplify';
import {listJinfos} from '../../src/graphql/queries';
var { height } = Dimensions.get('window');
  var box_count = 10;
  var box_height = height / box_count;

export default function SM_JobDetails ({navigation}){
    const [company, setCompany] = useState('');
    const [category, setCategory] = useState('');
    const [adrs, setAdrs] = useState('');
    const [schedule, setSchedule] = useState('');
    const [data,setData] = useState([]);
    useEffect(()=>{
        //handleSubmit();
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
    const handleSubmit = async () => {
        try {
          const response=await API.graphql(graphqlOperation(createJinfo, {
            input: {
                id: 12121,
                created_by: 'abc company',
                block_name: 'xyz',
                category: 'electrical',
                schedule: 'weekly',
                day: 'monday',
                time:''
            }
          }));
          console.log('response: ',response);
        } 
        catch(e){
            console.log(e);
          }
      };


    return (
        <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
           <StatusBar animated = {true}
                      backgroundColor="#000000"/>
            <Menubar navigation={navigation} />  
                <View style = {styles.Bar2}>
                     <Image
                     style = {styles.jobImg} 
                     source = {jobicon}/>

                     <Text style = {styles.txt1}>JOBS</Text>
                </View>
            </View>
            
    {data.map((item, index) => (
                <View key={index}>
                    <View style = {styles.Col}>
                <View style={styles.Row}>
                    <Text style = {styles.lef}>Job from : </Text>
                    <Text style = {styles.righ}>{item.created_by}</Text>
                </View>
                <View style={styles.Row}>
                    <Text style = {styles.lef}>Category: </Text>
                    <Text style = {styles.righ}>{item.category}</Text>
                </View>
                <View style={styles.Row}>
                    <Text style = {styles.lef}>Address: </Text>
                    <Text style = {styles.righ}>17 Street name,Town</Text>
                </View>
                    </View>   
                    {/* <View style = {styles.Box1}>
                        <FontAwesome5 name="location-arrow" size={25} color="#00286B" style={styles.locIcon} />
                        <Text style={styles.locTxt}>Open Location in Maps</Text>
                    </View> */}
                    <View style={styles.Row}>
                    <Text style = {styles.lef}>Job Schedule : </Text>
                    <Text style = {styles.righ}>{item.schedule}</Text>
                    
                    </View>
                    <Text style = {styles.noteshead}>Notes : </Text>
                    <View style={styles.notes}>
                        <Text>Any notes from the management company to the Serviceman....</Text>
                    </View>
                </View>
                      ))}
                      
               <TouchableOpacity style = {styles.Box2} onPress={() => navigation.navigate('SM_Schedule')}>
                <Text style={styles.locTxt1}>Add Job</Text>
                </TouchableOpacity>
            
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
     Col:{
         alignSelf:'flex-start',
   flexDirection:'column'
   },
   Row:{
       padding:10,
       marginLeft:25,
       alignSelf:'flex-start',
        flexDirection:'row'
   },
   lef:{
      fontSize:20,
      fontWeight:'bold',
      color:'#000000'
   },
   righ:{
    fontSize:20,
    
   },
   Box1:{
   height:'6%',
   width:'60%',
   marginTop:10,
   alignSelf:'center',
   padding:5,
    borderTopLeftRadius : 10,
    borderTopRightRadius : 10,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    flexDirection:'row',
    borderWidth : 2,
    borderColor : '#005DAF'
   },
   Box2:{
   height:'6%',
   width:'35%',
   marginTop:1.2*box_height,
   alignSelf:'center',
   padding:5,
   alignItems:'center',
    borderTopLeftRadius : 10,
    borderTopRightRadius : 10,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    borderWidth : 2,
    borderColor : '#1EAA23'
   },
   locIcon:{
       alignSelf:'center',
       marginLeft:10
   },
   locTxt:{
alignSelf:'center',
marginLeft:15,
color:"#00286B",
   },
   locTxt1:{
    color: '#1EAA23',
    fontSize:18
   },
   noteshead:{
    fontSize:20,
      fontWeight:'bold',
      color:'#000000',
      padding:10,
       marginLeft:25,
       alignSelf:'flex-start',
flexDirection:'row'
   },
   notes:{
       alignSelf:'center',
       padding:height*0.01,
       borderWidth:1,
       borderRadius:10,
       backgroundColor:'#E3EDFF',
       width:'85%',
       height:height*0.10
   }

 
});