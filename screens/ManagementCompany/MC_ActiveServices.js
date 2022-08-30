import React, { useState, useContext,useEffect,Component} from 'react';
import { Picker ,Dimensions, StatusBar,SafeAreaView ,StyleSheet, Text,TouchableOpacity,View ,Image,TextInput, ScrollView} from 'react-native';
import Menubar from '../../components/Menubar';
import img1 from '../../assets/images/homeback.png';
import { Feather,FontAwesome5,AntDesign,Entypo } from '@expo/vector-icons';
import * as queries from '../../src/graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import { useIsFocused } from "@react-navigation/native";
import Loading from '../../components/Loading';
import img11 from '../../assets/images/home.png';

var { height } = Dimensions.get('window');
  var box_count = 12;
  var box_height = height / box_count;

export default function MC_ActiveServices ({route,navigation}){
    const [pos, setPos] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [Profile, setProfile] = useState('');
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  const { param1,param2 } = route.params;
 
  useEffect(() => {  
    fetchData();
  }, [pos,isFocused]);

  const fetchData =async() =>{
    try{
        let filter = {
            blockid: {
                eq: param1 
            }
        };
        const oneTodo = await API.graphql({ query: queries.listServices, variables: { filter: filter}});
        setData(oneTodo.data.listServices.items);
        console.log('data-->',data);
        setPos(true);
    }
    catch(err){
        console.log('error fetching data ',err);
    }
};

    if(!pos)return <Loading/>;
    else if(data.length==0){
        return(
            <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.container}>
            <StatusBar animated = {true}
                        backgroundColor="#000000"/>
                <Menubar navigation={navigation} /> 
                </View> 
                <Text style={styles.text}>No services yet</Text>
                <Image  style = {styles.img11} 
                        source = {img11} />           
            </SafeAreaView>
        );
    }
   else{
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
        <ScrollView style={{flex:1,}}>
        <View style={styles.container}>
           <StatusBar animated = {true}
                      backgroundColor="#000000"/>
            <Menubar navigation={navigation} />
              </View>
              <View style={styles.three}>
                  <Text style={styles.Txt1}>Active Service</Text>   
              </View>
              <View style={styles.sbox}>
                <Text style={{fontSize:0.4*box_height}}>{data.length}</Text>
                </View>
        {data.map((item, index) => (
            <View key={index} style={{flex:1}}>
              <View style={styles.Third}>
                    <Entypo name="controller-record" size={14} style={styles.cirIcon}/>
                    <Text style={styles.dateTxt}>{item.category}</Text>
                </View>

                <View style={styles.Fourth}>
                 </View>

                 <View style={styles.Fifth}>
                     <View style = {styles.five1}>
                         <View style={styles.fivep1}>
                         <AntDesign name="minus" style={styles.minusIcon} size={20}/>
                         <Text style={styles.sideTxt}>{item.serviceman}</Text>
                         </View>
                         <View style={styles.fivep1}>
                         <AntDesign name="minus" style={styles.minusIcon} size={20}/>
                         <Text style={styles.sideTxt}>{item.schedule}</Text>
                         </View>
                         <View style={styles.fivep1}>
                         <AntDesign name="minus" style={styles.minusIcon} size={20}/>
                         <Text style={styles.sideTxt}>{item.istarttime}  to {item.iendtime}</Text>
                         </View>
                     </View>

                     <View style={styles.five2}>
                     <Image  style = {styles.img} 
                     source = {img1} />
                     </View>

                 </View>
                 <View style={styles.cnctn}></View>
                 <View style = {styles.Boxes}>
                <TouchableOpacity style = {styles.filterB} onPress={() => navigation.navigate('MC_TerminateService',{param1:item.id,p2:param2})}>
                      <Text style={styles.filtxt}>Terminate</Text>
                      <Feather name='x-circle' size={20} style={styles.xIcon}/>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.sortB} onPress={() => navigation.navigate('MC_EditServiceSchedule',{param1:item.id,param2:item.category})}>
                    <Text style={styles.filtxt}>Edit Schedule</Text>               
                </TouchableOpacity>
           </View>
           </View>
        ))}
        <View style={{height:30}}/>
        </ScrollView>
                        
        </SafeAreaView>
    );
        }
  
  
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    text:{
        marginVertical:40,
         color:"#00286B",
         fontSize:30,
         alignSelf:'center',
         fontWeight:'bold'
        
    },
    img11 :{
        alignSelf:'center',
        marginTop:20,
        height:height*0.20,
        width:'50%'
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
        fontSize:0.45*box_height,
      alignSelf:'center',
        color:"#005DAF",
      },
      three :{
        marginTop: 0.3*box_height,
        borderBottomColor:"#005DAF",
        borderBottomWidth:2,
        width:'60%',
        alignSelf:'center'
    },
    sbox:{
        borderColor:'#005DAF',
        borderWidth:2,
        borderTopWidth:0,
        width:0.7*box_height,
        height:0.6*box_height,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:"center"

    },
    Third:{
       marginTop:10,
        marginLeft:20,
     //height:0.5*box_height,
     flexDirection:'row'
    },
     
    Third1:{
        marginLeft:20,
        marginTop:20,
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
         width:'75%',
        marginLeft:36,
         marginTop:5,
         backgroundColor:"#00286B"
     },
     Fifth:{

         paddingHorizontal:8,
         marginTop:0.2*box_height,
         flexDirection:'row',
     },
     Sixth:{
        padding:8,
        marginVertical:0.2*box_height,
        flexDirection:'row',
    },
    cnctn:{
        borderLeftColor:'#005DAF',
        borderRightColor:'#005DAF',
        width:2.5*box_height,
        height:0.4*box_height,
        borderLeftWidth:2,
        borderRightWidth:2,
        alignSelf:'center',
        //backgroundColor:'#000000'
    },
     five1:{
         marginTop:14,
        backgroundColor:'#1364A9',
         width:'89%',
         height:1.96*box_height,
        flexDirection:'column',
        borderWidth : 2,
        borderColor : '#000000',
        justifyContent:'space-between'
     },
     five2:{
        width:'40%',
        height:2.33*box_height,
        position:'absolute',
        right:'3%'
     },
     fivep1:{
     flexDirection:'row'
     },
     minusIcon:{
       color:'#ffffff',
       paddingRight:10,
       paddingTop:7,
       paddingBottom:7
     },
     sideTxt:{
        color:'#ffffff',
        paddingTop:5,
        
        fontSize:0.3*box_height
     },
     img:{
         width:'100%',
         height:'100%'
     },

     Boxes:{
      
       flexDirection:'row',
       alignSelf:'center',
       width:'84%'
    },
    filterB:{
        flex:1,
        borderTopLeftRadius : 6,
        borderTopRightRadius :6,
        borderBottomLeftRadius:6,
        borderBottomRightRadius:6,
        flexDirection:'row',  
        justifyContent:'center',
        borderWidth : 2,
        borderColor : '#005DAF'
    },
    sortB:{
        flex:1,
        marginLeft:10,
        justifyContent:'center',
        flexDirection:'row',
        borderTopLeftRadius : 6,
        borderTopRightRadius : 6,
        borderBottomLeftRadius:6,
        borderBottomRightRadius:6,
        left:0,
        borderWidth : 2,
        borderColor : '#005DAF'
    },
    filtxt:{
        padding:3,
        color:'#005DAF',
        alignSelf:'center',
        fontSize:0.31*box_height
    },
    xIcon:{
       alignSelf:'center',
      marginTop:2,
       color:'#ff0000',
       padding:4
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