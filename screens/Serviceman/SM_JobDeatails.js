import React, { useState, useContext,useEffect,Component} from 'react';
import {AppTextInput ,Button, Picker ,Dimensions, StatusBar,SafeAreaView ,StyleSheet, Text,TouchableOpacity,View ,Image,TextInput,AppButton, ScrollView} from 'react-native';
import jobicon from '../../assets/images/jobsimg.png';
import Navbar from '../../components/Navbar';
import Menubar from '../../components/Menubar';
import { FontAwesome5 } from '@expo/vector-icons';
import {updateServices} from '../../src/graphql/mutations';
import * as queries from '../../src/graphql/queries';
import { Auth ,API ,graphqlOperation} from 'aws-amplify';
import { useIsFocused } from "@react-navigation/native";
import Loading from '../../components/Loading';
import ModalDropdown from 'react-native-modal-dropdown';
import { Bold, FontSize } from 'react-native-remix-icon/src/icons';
import DateTimePicker from '@react-native-community/datetimepicker';


var { height } = Dimensions.get('window');
  var box_count = 10;
  var box_height = height / box_count;

export default function SM_JobDetails ({route,navigation}){
    const [pos, setPos] = useState(false);
    const [day, setDay] = useState('');
    const isFocused = useIsFocused();
    const [isPickerShow, setIsPickerShow] = useState(false);
    const [time, setTime] = useState(new Date(Date.now()));
    const[h,setH]=useState('');
    const[m,setM]=useState(new Date(Date.now()).getMinutes());
    const [isPickerShow1, setIsPickerShow1] = useState(false);
    const [data,setData] = useState([]);
    const [blockdata,setBlockdata] = useState([]);
    const { param1} = route.params;
    useEffect(() => {  
        fetchData();
    }, [h,pos,isFocused]);

    const showPicker1 = () => {
        setIsPickerShow1(true);
      };

      const onChange1 = (event, value) => {
        let temp='';
        temp=("0" + value.getHours()).slice(-2);
        temp+=':';
        temp+=("0" + value.getMinutes()).slice(-2);
        setH(temp);
        console.log('H', value);
        if (Platform.OS === 'android') {
          setIsPickerShow1(false);
        }
      };

    const fetchData =async() =>{
        try{
            const oneTodo = await API.graphql(graphqlOperation(queries.getServices, { id: param1 }));
            setData(oneTodo.data.getServices);
            const secondTodo = await API.graphql(graphqlOperation(queries.getMCPropertyinfo, { id: oneTodo.data.getServices.blockid }));
            setBlockdata(secondTodo.data.getMCPropertyinfo);
            setPos(true);
        }
        catch(err){
            console.log('error fetching data ',err);
        }
    };

    const handleSubmit = async () => {
        try {
            if(day=='')setDay(null);
            if(h=='')setH(data.istarttime);
            const response=await API.graphql(graphqlOperation(updateServices, {
                input: {
                    id:param1,
                    day:day,
                    smtime:h,
                    sm_assigned:true
                }
              })).then(navigation.navigate('Rough',
              {   
                  msg:'Job Added',
              }));
             // navigation.navigate('MC_ServiceHistory');
              console.log('response: ',response);
        } 
        catch(e){
            console.log(e);
          }
      };

    if(!pos)return <Loading/>;
    else{
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <StatusBar animated = {true}
                      backgroundColor="#000000"/>
        <View style={styles.container}>
           
                      {/* <View style={{height:1}}></View> */}
            <Menubar navigation={navigation} />  
            </View>
            <ScrollView >
                <View style = {styles.Bar2}>
                     <Image
                     style = {styles.jobImg} 
                     source = {jobicon}/>

                     <Text style = {styles.txt1}>JOBS</Text>
                </View>
            
                <View >
                    <View style = {styles.Col}>
                <View style={styles.Row}>
                    <Text style = {styles.lef}>Job from : </Text>
                    <Text style = {styles.righ}>{data.created_by}</Text>
                </View>
                <View style={styles.Row}>
                    <Text style = {styles.lef}>Category: </Text>
                    <Text style = {styles.righ}>{data.category}</Text>
                </View>
                <View style={styles.Row}>
                    <Text style = {styles.lef}>Address: </Text>
                    <Text style = {styles.righ}>{blockdata.city},{blockdata.region}, {blockdata.county}, {blockdata.country}, {blockdata.postcode}</Text>
                </View>
                    </View>   
                    {/* <View style = {styles.Box1}>
                        <FontAwesome5 name="location-arrow" size={25} color="#00286B" style={styles.locIcon} />
                        <Text style={styles.locTxt}>Open Location in Maps</Text>
                    </View> */}
                    <View style={styles.Row}>
                    <Text style = {styles.lef}>Job Schedule : </Text>
                    <Text style = {styles.righ}>{data.schedule}</Text>
                    
                    </View>
                    <Text style = {styles.noteshead}>Notes : </Text>
                    <View style={styles.notes}>
                        <Text>{data.notes}....</Text>
                    </View>
                </View>
                <View style={styles.Fifth}>
                        <Text style={styles.secondTxt}>Schedule setup</Text>
                </View>
                <View style={styles.sixHalf}>
                    <Text style={styles.thirdTxts}>Day and Time: </Text>                    
                </View> 
                <View style={styles.line1}>
                {data.day != 'ANY' ? <Text style={styles.Txt2}>Day</Text>:<Text style={styles.Txt2}>Day (Already selected)</Text> }
              </View>   
              <View style={styles.Eight}>
                        <View style={styles.eightHalf}>
                        {data.day != 'ANY' ? 
                        <ModalDropdown    
                                onSelect = {(index, value) => { setDay(value)} } 
                                dropdownTextStyle={styles.ddtxtsty} 
                                dropdownStyle={styles.ddsty} 
                                style={styles.input} 
                                textStyle={styles.ddtxt} 
                                defaultValue=' Select ▼' 
                                options={['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']}
                            /> 
                        : <View style={styles.input}>
                            <Text style= {styles.ddtxt}>{data.day}</Text>
                          </View>  
                        }      
                        </View>
                    </View>

                    <View style={styles.line1}>
                        <Text style={styles.Txt2}>Time ({data.istarttime}-{data.iendtime})</Text>
                    </View>  
                    <View style={styles.Nineth}>
                    {!isPickerShow1 && (
                            <View style={{justifyContent:'center',marginTop:10}}>
                                <TouchableOpacity style={styles.timebtn} onPress={showPicker1}>
                                {h==''?<Text style={{alignSelf:'center',  fontSize: 0.3*box_height,color:'black'}}>{data.istarttime}</Text>:<Text style={{alignSelf:'center',  fontSize: 0.3*box_height,color:'black'}}>{h}</Text>}
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
                            timeZoneOffsetInMinutes={330}
                            />
                        )}
                        
                       
                    </View>
               <TouchableOpacity style = {styles.Box2} onPress={handleSubmit}>
                <Text style={styles.locTxt1}>Add Job</Text>
                </TouchableOpacity>
                <View style={{height:1.5*box_height}}/>
                </ScrollView>
                <Navbar navigation={navigation}/>
        </SafeAreaView>
    );
    }
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
       marginLeft:15,
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
    marginRight:'25%'
    
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
   //height:'6%',
   width:'35%',
   marginTop:0.5*box_height,
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
       marginLeft:15,
       alignSelf:'flex-start',
        flexDirection:'row'
   },
   Fifth:{
    borderBottomWidth:2,
    borderBottomColor:'black',
    marginTop:0.15*box_height,
    marginBottom:0.1*box_height,
    height:0.6*box_height,
    alignSelf:'center'
},
secondTxt:{
    fontSize:0.35*box_height,
    fontWeight:'900',
    color:"#000000"
},
   notes:{
       alignSelf:'center',
       padding:height*0.01,
       borderWidth:1,
       borderRadius:10,
       backgroundColor:'#E3EDFF',
       width:'85%',
       height:height*0.10
   },
   sixHalf:{
    flex : 1,
    flexDirection:'row',
    paddingLeft:20,
    marginVertical:15
    },
    thirdTxts:{
        fontSize:20,
      fontWeight:'bold',
      color:'#000000'
    },
    line1:{
       // marginTop:0.2*box_height,
       flexDirection:'row',
       marginLeft:20,
    },
    Txt2:{
      //marginTop:12,
      fontSize:0.25*box_height,
      fontWeight:'900'
    },
    Eight:{
        marginVertical:10,
        marginLeft:25,
        height:0.6*box_height ,
    },
    eightHalf:{
        //paddingHorizontal:'5%',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        marginTop:0,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        backgroundColor:'#F1F6FF',
        width:1.7*box_height,
        flex : 1,
        height:0.7*box_height ,
        shadowColor: 'black',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15 ,
        shadowOffset : { width: 56, height: 13},
        borderWidth:2,
        borderColor:'#666666',
    },timebtn:{
        paddingHorizontal:'5%',
        justifyContent:'center',
        flexDirection:'row',
        marginTop:0,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        backgroundColor:'#F1F6FF',
        width:1.7*box_height,
        flex : 1,
        height:0.6*box_height ,
        shadowColor: 'black',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15 ,
        shadowOffset : { width: 56, height: 13},
        borderWidth:2,
        borderColor:'#666666',
    },
    ddsty:{
        color: '#101010',
        fontSize: 25,
        width: '70%',
        justifyContent:'center'
      
    },
    ddtxt:{
      color: 'black',
      fontSize: 20,
     // alignSelf:'flex-start'
    },
    ddtxtsty:{
      fontSize:16.5,
      paddingLeft:10
    },
    Nineth:{
        marginLeft:25,
        flexDirection:'row',
        width:11*box_height,
       
    },
    


 
});