import React, { useState, useContext,useEffect,Component} from 'react';
import { Alert,Keyboard,Button,Picker ,Dimensions, StatusBar,SafeAreaView ,StyleSheet, Text,TouchableOpacity,View ,Image,TextInput} from 'react-native';
import Menubar from '../../components/Menubar';
import { Entypo } from '@expo/vector-icons';
import AppButton from '../../components/AppButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { Auth ,API ,graphqlOperation} from 'aws-amplify';
import {updateServices} from '../../src/graphql/mutations';
import moment from 'moment';
import { useIsFocused } from "@react-navigation/native";

const items1 = [
    //name key is must.It is to show the text in front
    { id: 1, name: 'Gardening' },
    { id: 2, name: 'Electric' },
    { id: 3, name: 'Plumbing' },
    { id: 4, name: 'Gas' },
    { id: 5, name: 'Job A' },
    { id: 6, name: 'Job B' },
    { id: 7, name: 'Job C' },
  ];
  const items2 = [
    //name key is must.It is to show the text in front
    { id: 1, name: 'Daily' },
    { id: 2, name: 'Weekly' },
    { id: 3, name: 'Twice a week' },
    { id: 4, name: 'On alternate days' },
    { id: 5, name: 'Biweekly' },
  ];
  const items3 = [
    //name key is must.It is to show the text in front
    { id: 1, name: 'Sunday' },
    { id: 2, name: 'Monday' },
    { id: 3, name: 'Tuesday' },
    { id: 4, name: 'Wednesday' },
    { id: 5, name: 'Thursday' },
    { id: 6, name: 'Friday' },
    { id: 7, name: 'Saturday' },
  ];

var { height } = Dimensions.get('window');
  var box_count = 12;
  var box_height = height / box_count;

export default function MC_ActiveServices ({route,navigation}){
   
    const [isupdtd, setIsupdtd] = useState(false);
    const[id,setId]=useState('');
    const[h,setH]=useState(new Date(Date.now()).getHours());
    const[m,setM]=useState(new Date(Date.now()).getMinutes());
    const [isPickerShow1, setIsPickerShow1] = useState(false);
    const [isPickerShow2, setIsPickerShow2] = useState(false);
    const [stime, setStime] = useState(new Date(Date.now()));
    const [etime, setEtime] = useState(new Date(Date.now()));
    const [time, setTime] = useState(new Date(Date.now()));
    const [day, setDay] = useState('Select day');
  const [schedule, setSchedule] = useState('select ');
  const [category, setCategory] = useState('select ');
  const { param1,param2 } = route.params;
  const isFocused = useIsFocused();

  useEffect(() => { 
   //console.log(param1,param2);
  },[etime,isFocused]);

  const showPicker1 = () => {
    setIsPickerShow1(true);
  };
  const showPicker2 = () => {
    setIsPickerShow2(true);
  };

  const onChange1 = (event, value) => {
    setStime(value);
    console.log(value);
    if (Platform.OS === 'android') {
      setIsPickerShow1(false);
    }
  };

  const onChange2 = (event, value) => {
    setH(value.getHours());
    setM(value.getMinutes());
    if (Platform.OS == 'android') {
      setIsPickerShow2(false);
    }
  };
  


    const handleSubmit = async () => {
      try {
        if( schedule.trim() == "select"|| day.trim() == "Select day")
                {
                    console.log("AlertBox: ");
                    Alert.alert(
                        "Enter all fields",
                        "You left some required fields",
                      );
                }
        else{
            const response=await API.graphql(graphqlOperation(updateServices, {
              input: {
                id:param1,
                schedule:schedule,
                day:day,
                istarttime:moment(stime * 1000).format('HH:mm'),
                iendtime:moment(etime * 1000).format('HH:mm'),
              }
            })).then(navigation.navigate('Rough',
            {   
                msg:'Schedule updated',
            }));
           
            console.log('response : ',response);
            //console.log('response id : ',response)
          } 
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
          
              <View >
                  <Text style={styles.Txt1}>Update Schedule</Text>               
              </View>

              <View style = {styles.three}></View>

              <View style={styles.line1}>
              <Text style={styles.Txt2}>Category</Text>
              </View>
                <View style={{
                    color:'#005DAF',
                    paddingLeft:15,
                    marginTop:8,
                    fontSize:0.3*box_height,
                    textAlign:'left',
                    backgroundColor:'#F1F6FF',
                    width:'80%',
                    height:0.7*box_height,
                    marginHorizontal:30,
                    borderRadius:8,
                    borderColor:'#E3EDFF',
                    shadowColor: '#000000',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.2,
                    elevation: 3,
                    justifyContent:'center',

                }}>
                    <Text style={{color:'#222',fontSize:15}}>{param2}</Text>
                </View>
              <View style={styles.line1}>
              <Text style={styles.Txt2}>Set up Schedule</Text>
              </View>

              <SearchableDropdown
               // onTextChange={(text) => console.log(text)}
                //On text change listner on the searchable input
                onItemSelect={(item) =>setSchedule(item.name) }
                //onItemSelect called after the selection from the dropdown
                //suggestion container h
                containerStyle={{ color:'#005DAF', }}
                textInputStyle={{
                    color:'#005DAF',
                    paddingLeft:15,
                    marginTop:8,
                    fontSize:0.3*box_height,
                    textAlign:'left',
                    backgroundColor:'#F1F6FF',
                    width:'80%',
                    height:0.7*box_height,
                    marginHorizontal:30,
                    borderRadius:8,
                    borderColor:'#E3EDFF',
                    shadowColor: '#000000',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.2,
                    elevation: 3,
                    justifyContent:'center',

                }}
                itemStyle={{
                    //single dropdown item style
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: '#F1F6FF0',
                    borderColor: '#bbb',
                    borderWidth: 1,
                }}
                itemTextStyle={{
                    //text style of a single dropdown item
                    color: '#222',
                }}
                itemsContainerStyle={{
                    marginTop:8,
                    textAlign:'left',
                    backgroundColor:'#F1F6FF',
                    fontSize:15,
                    width:'75%',
                    height:'23%',
                    marginHorizontal:30,
                    borderRadius:8,
                }}
                items={items2}
                //mapping of item array
                // defaultIndex={2}
                //default selected item index
                placeholder={schedule}
                //place holder for the search input
                resetValue={false}
                //reset textInput Value with true and false state
                underlineColorAndroid="transparent"
                //To remove the underline from the android input
                />
                <View style={styles.line1}>
              <Text style={styles.Txt2}>Select a particular day</Text>
              </View>
                  
            <SearchableDropdown
               
                //On text change listner on the searchable input
                onItemSelect={(item) =>setDay(item.name) }
                //onItemSelect called after the selection from the dropdown
                //suggestion container h
                containerStyle={{ color:'#005DAF', }}
                textInputStyle={{
                    paddingLeft:15,
                    marginTop:8,
                    fontSize:0.3*box_height,
                    textAlign:'left',
                    backgroundColor:'#F1F6FF',
                    width:'80%',
                    height:0.7*box_height,
                    marginHorizontal:30,
                    borderRadius:8,
                    borderColor:'#E3EDFF',
                    shadowColor: '#000000',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.2,
                    elevation: 3,
                    justifyContent:'center',
                    
                }}
                itemStyle={{
                    //single dropdown item style
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: '#F1F6FF0',
                    borderColor: '#bbb',
                    borderWidth: 1,
                }}
                itemTextStyle={{
                    //text style of a single dropdown item
                    color: '#222',
                }}
                itemsContainerStyle={{
                    marginTop:8,
                    textAlign:'left',
                    backgroundColor:'#F1F6FF',
                    fontSize:15,
                    width:'75%',
                    height:'23%',
                    marginHorizontal:30,
                    borderRadius:8,
                }}
                items={items3}
                //mapping of item array
               // defaultIndex={2}
                //default selected item index
                placeholder={day}
                //place holder for the search input
                resetValue={false}
                //reset textInput Value with true and false state
                underlineColorAndroid="transparent"
                //To remove the underline from the android input
                />
                 <View style={styles.line1}>
                     <Text style={styles.Txt2}>Select the time interval</Text>
                </View>

                <View style={styles.Nineth}>
                    {!isPickerShow1 && (
                            <View style={{flexDirection:'row',marginTop:15,justifyContent:'center'}}>
                                <Text style={{fontSize: 0.35*box_height}}>start time : </Text>
                                <TouchableOpacity style={styles.timebtn} onPress={showPicker1}>
                                <Text style={{alignSelf:'center',  fontSize: 0.35*box_height}}>{("0" + stime.getHours()).slice(-2)}:{("0" + stime.getMinutes()).slice(-2)}</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {/* The date picker */}
                        {isPickerShow1 && (
                            <DateTimePicker
                            value={time}
                            mode={'time'}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            is24Hour={true}
                            onChange={onChange1}
                            style={styles.datePicker}
                           // timeZoneOffsetInMinutes={330}
                            />
                        )}
                        
                       
                    </View>
                    <View style={styles.Nineth}>
                    {!isPickerShow2 && (
                            <View style={{flexDirection:'row',marginTop:15,justifyContent:'center'}}>
                            <Text style={{fontSize: 0.35*box_height}}>end time   : </Text>
                            <TouchableOpacity style={styles.timebtn} onPress={showPicker2}>
                            <Text style={{alignSelf:'center',  fontSize: 0.35*box_height}}>{("0" + h).slice(-2)}:{("0" +m).slice(-2)}</Text>
                            </TouchableOpacity>
                        </View>
                        )}

                        {/* The date picker */}
                        {isPickerShow2 && (
                            <DateTimePicker
                            value={time}
                            mode={'time'}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            is24Hour={true}
                            onChange={onChange2}
                            style={styles.datePicker}
                           // timeZoneOffsetInMinutes={330}
                            />
                        )}
                        
                         {/* {console.log(etime,stime)}  */}
                    </View>

            <View style = {styles.loginButton}>
                <AppButton title="Next" onPress={handleSubmit}/>
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
          marginTop:5,
          height : '4%',
          width:'100%',
          backgroundColor:"#00286B",
      },
     
      Txt1:{
        marginTop:0.25*box_height,
        fontSize:0.45*box_height,
        alignSelf:'center',
        color:"#005DAF",
      },
      three :{
        alignSelf:'center',
        marginTop:2,
        height : '0.2%',
        width:'65%',
        backgroundColor:"#005DAF",
    },
    line1:{
        marginTop:0.2*box_height,
       flexDirection:'row',
       marginLeft:15,
    },
    Txt2:{
      marginTop:12,
      fontSize:0.38*box_height
    },
    minusIcon:{
        marginTop:10,
        color:'#000000',
      },
      Box1:{
        marginTop:10,
        borderTopRightRadius : 10,
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        borderColor:'#005DAF',
        width:'80%',
        height:3.1*box_height,
        alignSelf:'center',
        borderWidth:1,
        justifyContent:'space-evenly'

      },
      listItems:{
         flexDirection:'column'
      },
      hor1:{
          marginLeft:10,
        flexDirection:'row'
      },
      cirIcon:{
          marginTop:8,
          color : '#000000'
      },
      t1:{
          marginTop:4,
          marginLeft:5,
          fontSize:0.35*box_height,
          color:'#005DAF',
      },
    
   timebtn:{
        fontSize:0.3*box_height,
        textAlign:'left',
        backgroundColor:'#F1F6FF',
        width:'33%',
        height:0.55*box_height,
        marginHorizontal:15,
        borderRadius:8,
        borderColor:'#E3EDFF',
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        elevation: 3,
       // alignContent:'center',
   },
   b1:{
       padding:7,     
   },
   Text1 :{
       flexDirection:'row', 
       alignSelf:'flex-start',
       marginLeft:40,
       padding:2 
   },
   Nineth:{
    marginLeft:25,
    height:1*box_height ,
    flexDirection:'row',
    width:'70%',
    
},
   loginButton : {
    alignSelf:'center',
    paddingBottom:height*0.15,
    width:'60%',
    marginTop:0.35*box_height,
    height : height*0.10,
}

 
});