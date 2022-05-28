import React, { useState, useContext,useEffect,Component} from 'react';
import {Button,AppTextInput ,Platform, Picker ,Dimensions, StatusBar,SafeAreaView ,StyleSheet, Text,TouchableOpacity,View ,Image,TextInput,AppButton} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import jobicon from '../../assets/images/jobsimg.png';
import Navbar from '../../components/Navbar';
import Menubar from '../../components/Menubar';
import { FontAwesome5,AntDesign } from '@expo/vector-icons';
import { Auth ,API ,graphqlOperation} from 'aws-amplify';
import {listJinfos} from '../../src/graphql/queries';
import {updateJinfo} from '../../src/graphql/mutations'
import DateTimePicker from '@react-native-community/datetimepicker';
var { height } = Dimensions.get('window');
  var box_count = 12;
  var box_height = height / box_count;


export default function SM_Schedule ({navigation}){
    const [data,setData] = useState([]);
    const [schedule, setSchedule] = useState('');
    const [day, setDay] = useState('');
    const [isPickerShow, setIsPickerShow] = useState(false);
    //const [time, setTime] = useState(new Time(Time.now()));
    const [time, setTime] = useState(new Date(Date.now()));

    useEffect(()=>{
        fetchData();
    },[]);


    const showPicker = () => {
        setIsPickerShow(true);
      };
    
      const onChange = (event, value) => {
        setTime(value);
        if (Platform.OS === 'android') {
          setIsPickerShow(false);
        }
      };

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
            if(day==="")setDay(item.day);
            const response=await API.graphql(graphqlOperation(updateJinfo, {
                input: {
                     id: 12121,
                     day:day ,
                     time:time.getHours()+':'+time.getMinutes()
                }
              }));
              navigation.navigate('SM_Myjobs2');
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
                </View> 
                {data.map((item, index) => (
                <View key={index}>
                    <View style = {styles.Second}>
                        <AntDesign name="check" size={80} color='#1EAA23' />
                    </View>

                    <View style={styles.Third}>
                        <Text style={styles.firstTxt}>Job Added To My Jobs</Text>            
                    </View>
                    <View style={styles.Fourth}>
                    </View>
                    <View style={styles.Fifth}>
                        <Text style={styles.secondTxt}>Schedule setup</Text>
                    </View>
                    <View style={styles.Sixth}>
                        <View style={styles.sixHalf}>
                            <Text style={styles.thirdTxts}>Job Schedule : </Text>
                            <Text style={styles.fourthTxts}>{item.schedule}</Text>
                        </View>
                        <View style={styles.sixHalf}>
                            <Text style={styles.thirdTxts}>Select Day and Time: </Text>
                        </View>
                    </View>

                    <View style={styles.Seventh}>
                        <Text style={styles.thirdTxts}>Day</Text>
                    </View>

                    <View style={styles.Eight}>
                        <View style={styles.eightHalf}>
                        {item.day === 'ANY' ? 
                        <ModalDropdown    
                                onSelect = {(index, value) => { setDay(value)} } 
                                dropdownTextStyle={styles.ddtxtsty} 
                                dropdownStyle={styles.ddsty} 
                                style={styles.input} 
                                textStyle={styles.ddtxt} 
                                defaultValue=' Select▼' 
                                options={['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']}
                            /> 
                        : <View style={styles.input}>
                            <Text style= {styles.ddtxt}>{item.day}</Text>
                          </View> 
                          
                        }
                        
                        </View>
                    </View>
                    <View style={styles.Seventh}>
                        <Text style={styles.thirdTxts}>Time</Text>
                    </View>
                    <View style={styles.Nineth}>
                    {!isPickerShow && (
                            <View style={styles.btnContainer}>
                            <Button title="Show Picker" size="16" color="#00286B" onPress={showPicker} />
                            </View>
                        )}

                        {/* The date picker */}
                        {isPickerShow && (
                            <DateTimePicker
                            value={time}
                            mode={'time'}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            is24Hour={true}
                            onChange={onChange}
                            style={styles.datePicker}
                            timeZoneOffsetInMinutes={330}
                            />
                        )}
                    </View>
                    {console.log(time.getHours(),time.getMinutes())}

                    <View style={styles.Tenth}>
                    
                     <Text style={styles.locTxt} onPress={() =>handleSubmit()}>Add Schedule</Text>
                    
                    </View>
                </View>
                ))}
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
   
  
   
    Second:{
        paddingTop:0.25*box_height,
        height :1.5*box_height,
        alignSelf:'center',
    },
    Third:{
      marginTop:5,
      alignSelf:'center',
      height:0.7*box_height
    },
    firstTxt:{
        fontSize:0.35*box_height,
        fontWeight:'bold',
        width:'50%',
        color:'#00286B'
    },
    Fourth:{
       height:'0.2%',
        width:'80%',
        alignSelf:'center',
       // marginTop:5,
        marginBottom:0.3*box_height,
        backgroundColor:"#00286B"
    },
    Fifth:{
        marginBottom:0.15*box_height,
        height:0.6*box_height,
        alignSelf:'center'
    },
    secondTxt:{
        fontSize:0.4*box_height,
        fontWeight:'900',
        color:"#000000"
    },
    Sixth:{
        marginTop:2,
        height:1.2*box_height,
        flexDirection:'column',
        marginLeft:20
    },
    sixHalf:{
        flex : 1,
        flexDirection:'row',
        padding:5,
    },
    thirdTxts:{
        //height:'50%',
        fontWeight:'900',
       alignSelf:'flex-start',
       fontSize:0.3*box_height
    },
    fourthTxts:{
      //height:'50%',
      fontSize:0.3*box_height,
      
    },
    
    Seventh:{
        marginLeft:25,
        height:0.65*box_height,
        marginTop:0.10*box_height,
    },
    ddsty:{
        color: '#101010',
        fontSize: 25,
        width: '70%',
        justifyContent:'center'
      
    },
    ddtxt:{
      color: '#595959',
      fontSize: 20,
     // alignSelf:'flex-start'
    },
    ddtxtsty:{
      fontSize:16.5,
      paddingLeft:10
    },
    Eight:{
        marginLeft:25,
        height:0.8*box_height ,
    },
    eightHalf:{
        paddingHorizontal:'5%',
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        marginTop:0,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        backgroundColor:'#F1F6FF',
        width:'40%',
        flex : 1,
        height:0.7*box_height ,
        shadowColor: 'black',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15 ,
        shadowOffset : { width: 56, height: 13},
        borderWidth:0,
        borderRadius:0,
    },
    dayTxt:{
        flex:1,
      alignSelf:'center',
      fontSize:0.4*box_height,
      marginLeft:15
    },
    downIcon:{
       // alignSelf:'stretch',
      padding:5,
      marginRight:5
      
    },
    Nineth:{
        marginLeft:25,
        height:1.2*box_height ,
        flexDirection:'row',
        width:'70%',
        
    },
    nineHalf:{
        flexDirection:'row',
        marginTop:0,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        backgroundColor:'#F1F6FF',
        padding:10,
        flex : 1,
        height:0.65*box_height ,
        shadowColor: 'black',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15 ,
        shadowOffset : { width: 56, height: 13},
        borderWidth:0,
        borderRadius:0,
    },
    box1:{
       margin:3,
          width:'20%',
          backgroundColor:'white',
          height:0.55*box_height,
          borderWidth:2,
          alignItems:'center',
          alignSelf:'center',
          borderRadius:0,
          borderColor:'#000000'
    },
    box2:{
        alignItems:'center',
       // margin:3,
        width:'25%',
        height:0.55*box_height,
        borderWidth:2,
        marginLeft:20,
        alignSelf:'center',
        borderRadius:8,
        borderColor:'#000000',
          
     },
   
    timeTxt:{
     fontWeight:'100',
     fontSize:0.30*box_height
    },
    dotTxt:{
        fontWeight:'bold',
        fontSize:0.3*box_height,
    },

    downIcon2:{
       marginLeft:5,
       alignSelf:'center'
    },
    Tenth:{
        height:0.8*box_height,
   width:'45%',
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
   locTxt:{
    alignSelf:'center',
     fontSize:0.35*box_height,
    color:'#1EAA23',
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