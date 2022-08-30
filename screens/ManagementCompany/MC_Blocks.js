import React, { useState, useContext,useEffect,Component} from 'react';
import { Picker ,Dimensions, StatusBar,SafeAreaView ,StyleSheet, Text,TouchableOpacity,View ,Image,TextInput, ScrollView} from 'react-native';
import Menubar from '../../components/Menubar';
import { AntDesign ,Feather,} from '@expo/vector-icons';
import img1 from '../../assets/images/homeback.png';
import { Auth ,API ,graphqlOperation} from 'aws-amplify';
import { useIsFocused } from "@react-navigation/native";
import * as queries from '../../src/graphql/queries';
import Loading from '../../components/Loading';
import MC_ExtraSignup from './MC_ExtraSignup';


var { height } = Dimensions.get('window');
  var box_count = 12;
  var box_height = height / box_count;

export default function MC_Blocks ({navigation}){
    const [data, setData] = useState([]);
    const [pos, setPos] = useState(false);
      const [DBdata,setDBdata] = useState([]);
    const isFocused = useIsFocused();
    useEffect(() => {  
        checkUser();
        
      }, [pos,isFocused]);

      const checkUser =async() =>{
            try{
            const currentUserInfo = await Auth.currentAuthenticatedUser();
            const signupdata = await API.graphql(graphqlOperation(queries.getMCSignupinfo, { id:currentUserInfo.attributes["email"] }));
                console.log('DBdata----------->',signupdata);
                setDBdata(signupdata.data.getMCSignupinfo);
                if(signupdata.data.getMCSignupinfo!=null)fetchData();
                else setPos(true);
            }
            catch(err){
                console.log('error fetching data ',err);
            }
        };
    const fetchData =async() =>{
        try{
            const user = await Auth.currentAuthenticatedUser();
            let filter = {
                created_by: {
                    eq: user.attributes['email']
                }
            };
            const blocks = await API.graphql({ query: queries.listMCPropertyinfos, variables: { filter: filter}});
    
            setData(blocks.data.listMCPropertyinfos.items);
            setPos(true);
        }
        catch(err){
            console.log('error fetching data ',err);
        }
    };
    if(!pos)return <Loading/>;
    else if(DBdata==null) return <MC_ExtraSignup navigation={navigation}/>;
    else{
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
           <StatusBar animated = {true}
                      backgroundColor="#000000"/>
                <Menubar navigation={navigation} />
                <ScrollView>
               <View >
        
                  <Text style={styles.Txt1}>BLOCKS</Text>               
              </View>
              <View style = {styles.three}></View>
              <TouchableOpacity style = {styles.filterB} onPress={() => navigation.navigate('MC_AddProperty')}>
                    <AntDesign name="plussquare" style={{marginRight:10}} size={24} color="#005DAF" />
                    <Text style={styles.filtxt}>Add a new Block </Text>           
                </TouchableOpacity>
                 
        {data.map((item, index) => (
            <View key={index} style={{marginLeft:5}}>
                <View style={styles.Fifth}>
                    <View style = {styles.five1}>                   
                        <Text style={styles.sideTxt}>{item.name}</Text>
                        <View style = {styles.undline}></View>
                    </View>
                        <View style={styles.five2}>
                            <Image  style = {styles.img} source = {img1} />
                        </View>
                </View>
                <View style={styles.cnctn}>
                    <View style={styles.left}>
                        <View style={styles.left1}>                      
                            <View style={styles.l1}></View>
                            <TouchableOpacity style={styles.l2} onPress={() => navigation.navigate('MC_ActiveServices',{param1:item.id,param2:item.name})}>
                                <Text style={{fontSize:0.3*box_height, color:'black'}} >Active services</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.left1}>                      
                            <View style={styles.l1}></View>
                            <TouchableOpacity style={styles.l2} onPress={() => navigation.navigate('MC_AddService',{param1:item.id,param2:item.name})}>
                                <Text style={{fontSize:0.3*box_height, color:'black'}} >Add new service</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.left1}>                      
                            <View style={styles.l1}></View>
                            <TouchableOpacity style={styles.l2} onPress={() => navigation.navigate('MC_ServiceHistory',{param1:item.id,param2:item.name})}>
                                <Text style={{fontSize:0.3*box_height, color:'black'}} >Service history</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.right}>
                        <TouchableOpacity style={styles.r1} onPress={() => {
                            navigation.navigate('MC_BlockDetails',{
                            param1:item.id
                            });
                        }}>
                            <AntDesign name="edit" style={styles.ricons} size={0.45*box_height} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.r2} onPress={() => navigation.navigate('MC_DeleteBlock',{p1:item.id,p2:item.name,p3:item.createdAt})} >
                            <AntDesign name="delete" size={0.4*box_height} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                </View>
                ))}
                <View style={{paddingTop:'25%'}}/>
                </ScrollView>
            </View> 
        </SafeAreaView>
    );
    }
  
}

const styles = StyleSheet.create({

    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },Txt1:{
        marginTop:0.25*box_height,
        fontSize:0.50*box_height,
        alignSelf:'center',
        color:"#005DAF",
      },
      three :{
        alignSelf:'center',
        marginTop:2,
        height : 0.04*box_height,
        width:'40%',
        backgroundColor:"#005DAF",
    },filterB:{
        marginVertical:28,
        marginLeft:10,
        width:'70%',
        height:0.68*box_height,
        borderTopLeftRadius : 10,
        borderTopRightRadius : 10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        borderWidth : 2,
        borderColor : '#005DAF'
    },
    filtxt:{
        padding:3,
        marginLeft:20,
        color:'#005DAF',
        alignSelf:'center',
        fontSize:0.4*box_height,
        },
    Fifth:{
        paddingHorizontal:8,
        marginTop:0.2*box_height,
        flexDirection:'row',
    },
    undline:{
        marginTop:3,
        height : '0.8%',
        width:'80%',
        backgroundColor:"white",
        marginBottom:10
    },
    five1:{
        paddingLeft:10,
        marginTop:14,
        backgroundColor:'#1364A9',
        width:'85%',
        height:1.25*box_height,
        borderWidth : 2,
        borderColor : '#000000',
        justifyContent:'flex-end'
    },
    left:{
       // height:'50%',
        flexDirection:'column',
        justifyContent:'space-evenly'
    },
    left1:{
        width:'70%',
        height:0.8*box_height,
       // backgroundColor:'blue',
        flexDirection:'row',
       alignItems:'center'
    },
    
    l1:{
       // marginTop:'10%',

       width:'20%',
       height:'0.2%',
        borderWidth : 1,
        borderColor : '#005DAF',
       // backgroundColor:'red'
        
    },
    l2:{
       // marginTop:'10%',
        width:2.7*box_height,
       height:'70%',
       borderRadius:20,
        borderWidth : 2,
        borderColor : '#005DAF',
        justifyContent:'center',
        alignItems:'center'
    },
    left3:{
        width:'50%',
        height:'50%',
        backgroundColor:'red',
    },
    right:{
        flexDirection:'column',
        justifyContent:'space-evenly'
    },
    r1:{
        borderColor:'#005DAF',
        borderWidth:2,
        borderRightWidth:0,
        flexDirection:'row-reverse',
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        padding:2
        
    },
    r2:{
        borderColor:'#005DAF',
        borderWidth:2,
        borderRightWidth:0,
        flexDirection:'row-reverse',
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        padding:2,
    },
    ricons:{
         padding:2.5,
         
    },
    sideTxt:{
        color:'#ffffff',
        marginLeft:5,
        fontSize:0.33*box_height
    },
    five2:{
        width:'40%',
        height:1.6*box_height,
        position:'absolute',
        right:'2%',
        bottom:'-7%'
    },
    img:{
        resizeMode:'contain',
        width:'100%',
        height:'100%'
    },
    Boxes:{
      flexDirection:'row',
      height:'5%',
      alignSelf:'center',
      width:'84%'
   },
   cnctn:{
        borderLeftColor:'#005DAF',
        borderRightColor:'#005DAF',
        borderBottomColor:'#005DAF',
        width:'85%',
        height:2.8*box_height,
        borderLeftWidth:2,
        borderRightWidth:2,
        borderBottomWidth:2,
        marginLeft:'4.5%',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    filtxt:{
        padding:3,
        color:'#005DAF',
        alignSelf:'center',
        fontSize:0.31*box_height
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

});