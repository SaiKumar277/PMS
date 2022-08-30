import React, { useState, useContext,useEffect,Component} from 'react';
import { TouchableNativeFeedback,ScrollView  ,Picker ,Dimensions, StatusBar,SafeAreaView ,StyleSheet, Text,TouchableOpacity,View ,Image,TextInput} from 'react-native';
import img1 from '../../assets/images/sm.png';
import Menubar from '../../components/Menubar';
import { Entypo,Feather,Ionicons,FontAwesome5,FontAwesome } from '@expo/vector-icons';
import Icon from 'react-native-remix-icon';
import { Auth ,API ,graphqlOperation} from 'aws-amplify';
import {listServicemen} from '../../src/graphql/queries';
import img11 from '../../assets/images/noservice.png';
import Loading from '../../components/Loading';
var { height } = Dimensions.get('window');
  var box_count = 12;
  var box_height = height / box_count;

export default function App ({route,navigation}){
    const [data, setData] = useState([]);
    const [pos, setPos] = useState(false);
    const { param } = route.params;
    useEffect(() => {  
        fetchData();
      }, [pos]);
    const fetchData =async() =>{
        try{
            const SM_Data = await API.graphql(graphqlOperation(listServicemen));
            setData(SM_Data.data.listServicemen.items);
            console.log('parameter -->',param);
            setPos(true);
            //console.log('Profiledata',data);
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
                
                <Image  style = {styles.img11} 
                       source = {img11} />          
              <Text style={styles.text}>No serviceman available!</Text> 
          </SafeAreaView>
      );
     }
    else{
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
           <StatusBar animated = {true}
                      backgroundColor="#000000"/>    
                <Menubar navigation={navigation} />        
              </View>
              <ScrollView >
              <View style={styles.imgView}>
                  <Image source={img1} style={styles.image1}/>
              </View>
              <View>
                  <Text style={styles.Txt1}>Servicemen availabe under the</Text>
                  <Text style={styles.Txt1}>required category</Text>
              </View>

              <View style = {styles.Boxes}>
                <TouchableOpacity style = {styles.filterB}  onPress = {() => {alert("you clicked")}}>
                      <Text style={styles.filtxt}>Filter</Text>
                     <Icon name="filter-2-line" />
                </TouchableOpacity>

                <TouchableOpacity style = {styles.sortB}>
                    <Text style={styles.filtxt}>Sort</Text>
                     <Icon name="arrow-up-down-line" />
                    </TouchableOpacity>
                
           </View>
           {data.map((item, index) => (
           <TouchableNativeFeedback key={index} onPress={() => {
            navigation.navigate('MC_ServiemanDetails',{
              param1:item.id,
              param2:param
            });
            }}>
           <View  style={styles.Box}>
                     <View style={{flexDirection:'row'}}>
                         <Feather name="plus-circle" size={15} color= '#005DAF' style={styles.plus1}/>
                         <Feather name="plus-circle" size={15} color= '#005DAF' style={styles.plus2}/>
                     </View>
                    <View style={styles.Text1}>
                      <Text style={styles.t1}>Name:</Text>
                      <Text style={styles.t2}>{item.name}</Text>
                    </View>
                    <View style={styles.Text1}>
                      <Text style={styles.t1}>Age:</Text>
                      <Text style={styles.t2}>{item.age}</Text>
                    </View>
                    <View style={styles.Text1}>
                      <Text style={styles.t1}>Category:</Text>
                      <Text style={styles.t2}>{item.category}</Text>
                    </View>
                    <View style={styles.Text1}>
                      <Text style={styles.t1}>Callout charge:</Text>
                      <Text style={styles.t2}>{item.calloutcharge}</Text>
                    </View>
                    <View style={styles.Text1}>
                      <Text style={styles.t1}>Rating:</Text>
                      <Text style={styles.t2}>{item.rating}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                         <Feather name="plus-circle" size={15} color= '#005DAF' style={styles.plus1}/>
                         <Feather name="plus-circle" size={15} color= '#005DAF' style={styles.plus2}/>
                     </View> 
                     </View>
                 </TouchableNativeFeedback>
                  ))}
                  <View style={{height:0.9*box_height}}></View>
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
       color:"#002e99",
       fontSize:0.42*box_height,
       alignSelf:'center',
       fontWeight:'bold'
      
  },
  img11 :{
      alignSelf:'center',
      marginTop:'30%',
      height:height*0.20,
      width:'50%',
    
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
      imgView:{
        height:1.4*box_height,
      },
      image1:{
        marginTop:10,
        alignSelf:'center',
        height:'88%',
        width:'20%'
      },
      Txt1:{
         fontSize:0.35*box_height,
         alignSelf:'center'
      },
      Boxes:{
        padding:5,
        marginTop:10,
       flexDirection:'row',
       height:'5%',
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
        borderColor : '#005DAF',
        justifyContent:'center',
        alignItems:'center'
    },
    sortB:{
        flex:1,
        marginLeft:10,
        flexDirection:'row',
        borderTopLeftRadius : 10,
        borderTopRightRadius : 10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        borderWidth : 2,
        borderColor : '#005DAF',
        justifyContent:'center',
        alignItems:'center'
    },
    filtxt:{
   padding:3,
   marginLeft:3,
   //alignSelf:'center',
   fontSize:20
    },
    sortButton:{
        marginLeft:5,
        marginTop:3,
        padding:3,
        width:'10%',
        height:'10%',
        //justifyContent:'center'
    },

    Box : {
        marginTop:10,
        borderTopLeftRadius : 12,
        borderTopRightRadius : 12,
        borderBottomLeftRadius:12,
        borderBottomRightRadius:12,
        marginLeft:13,
        marginRight:13,
        width:'85%',
        backgroundColor:'#F1F6FF',
        alignSelf:'center',
       // height:3.0*box_height,
        borderWidth : 2,
        borderColor : '#005DAF',
        padding:6,
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        elevation: 3,
      },
      Box1 : {
        marginTop:28,
        borderTopLeftRadius : 12,
        borderTopRightRadius : 12,
        borderBottomLeftRadius:12,
        borderBottomRightRadius:12,
        marginLeft:13,
        marginRight:13,
        width:'85%',
        backgroundColor:'#F1F6FF',
        alignSelf:'center',
        //height:2.8*box_height,
        borderWidth : 2,
        borderColor : '#005DAF',
        padding:6,
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        elevation: 3,
      },
      plus1:{
        left:0,
        alignContent:'flex-start',
        marginLeft:6,
        //marginTop:6 
    },
    plus2:{
      right:0,
      position:'absolute',
      alignContent:'flex-end',
      marginRight:6,
      
    },
   
    t1 : {
       fontSize:0.28*box_height,
        padding:1,
    },
    t2 :{
        padding:1,
        fontSize:0.28*box_height,
        color:'#888888'
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