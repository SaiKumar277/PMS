import React, { useState, useContext,useEffect,Component} from 'react';
import { Picker ,Dimensions, StatusBar,SafeAreaView ,StyleSheet, Text,TouchableOpacity,View ,Image,TextInput} from 'react-native';
import { Entypo ,AntDesign} from '@expo/vector-icons';
import Menubar from '../../components/Menubar';
import * as queries from '../../src/graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import { useIsFocused } from "@react-navigation/native";
import Loading from '../../components/Loading';

var { height } = Dimensions.get('window');
  var box_count = 12;
  var box_height = height / box_count;

export default function App ({route,navigation}){
    const [data, setData] = useState('');
    const isFocused = useIsFocused();
      
    const { p1 } = route.params;
    useEffect(() => {  
      fetchData(); 
    },[isFocused]);
    
    const fetchData =async() =>{
      try{
          let filter = {
                id: {
                    eq: p1
                }
            };
            const oneTodo = await API.graphql({ query: queries.getServiceDetails, variables: { filter: filter}});
          setData(oneTodo.data.getServiceDetails);
          console.log('onetodo',data);
      }
      catch(err){
          console.log('error fetching data ',err);
      }
  };
  
  if(!pos)return <Loading/>;
  else {
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
         <StatusBar animated = {true}
                    backgroundColor="#000000"/>
             <Menubar navigation={navigation} /> 
            </View>
            <ScrollView>
            <View style={styles.Second}>
              <Text style={styles.serTxt}>Service Details</Text>
            </View>
            <View style = {styles.undrln}></View>
            <View style={styles.imgView}>
                <Image source={img1} style={styles.image1}/>
            </View>

          <View style={styles.B1}>
              <View style={styles.V1}>
                  <Text style={styles.tt1}>Block :</Text>
                  <View style={{paddingRight:'25%'}}>
                    <Text style={styles.tt2}>{data.block_name}</Text>
                  </View>

                  
              </View>

              <View style={styles.V1}>
                  <Text style={styles.tt1}>Category :</Text>
                  <View style={{paddingRight:'25%'}}>
                    <Text style={styles.tt2}>{data.category}</Text>
                  </View>
              </View>

              <View style={styles.V1}>
                  <Text style={styles.tt1}>Serviceman :</Text>
                  <View style={{paddingRight:'25%'}}>
                    <Text style={styles.tt2}>{data.serviceman}</Text>
                  </View>
              </View>

              <View style={styles.V1}>
                  <Text style={styles.tt1}>Date :</Text>
                  <View style={{paddingRight:'25%'}}>
                    <Text style={styles.tt2}>{Date(Date.now()).slice(0,10)}</Text>
                  </View>
              </View>
          </View>

            <View >
                <Text style={styles.Txt2}>Photos after work</Text>   
            </View>
            <View style = {styles.three}></View>

            <View style={styles.t1}>
                <Text style={styles.text1}>End Time: </Text>
                <Text style={styles.text2}>{("0" + stime.getHours()).slice(-2)}:{("0" + stime.getMinutes()).slice(-2)}</Text>
            </View>
            {edphoto.length>0 ? 
            <ScrollView horizontal={true} style={styles.hrscrl}>
            {edphoto.map((element, index) => {
                  return (
                    <View key={index} style={styles.Box2}>
                       <Image style={{ width: '100%', height: '100%',resizeMode:'center'}} source={{uri: element}} />
                    </View>
                  );
                })}
            </ScrollView>:
              <View  style={styles.Box2}>
                  <AntDesign name="upload" size={35} color="#888888" style={styles.camIcon} />
              </View>
            }
            <TouchableOpacity style = {styles.loginButton} onPress={openCamera2}>
             <Text style={{color:'#00286B',fontSize:20}}>Add Photo</Text>
            </TouchableOpacity>

            <View style = {styles.savebtn}   >
              <AppButton title="Save" onPress={handleSubmit2}/>
            </View>

         <View style={{marginTop:'10%'}}/>
         </ScrollView>
        <View style={styles.container}>
           <StatusBar animated = {true}
                      backgroundColor="#000000"/>
               <Menubar navigation={navigation} /> 
              </View>
              <ScrollView>
              <View style={styles.Second}>
                <Text style={styles.serTxt}>Service Details</Text>
              </View>
              <View style = {styles.undrln}></View>
              <View style={styles.imgView}>
                  <Image source={img1} style={styles.image1}/>
              </View>

            <View style={styles.B1}>
                <View style={styles.V1}>
                    <Text style={styles.tt1}>Block :</Text>
                    <View style={{paddingRight:'25%'}}>
                      <Text style={styles.tt2}>{data.block_name}</Text>
                    </View>

                    
                </View>

                <View style={styles.V1}>
                    <Text style={styles.tt1}>Category :</Text>
                    <View style={{paddingRight:'25%'}}>
                      <Text style={styles.tt2}>{data.category}</Text>
                    </View>
                </View>

                <View style={styles.V1}>
                    <Text style={styles.tt1}>Serviceman :</Text>
                    <View style={{paddingRight:'25%'}}>
                      <Text style={styles.tt2}>{data.serviceman}</Text>
                    </View>
                </View>

                <View style={styles.V1}>
                    <Text style={styles.tt1}>Date :</Text>
                    <View style={{paddingRight:'25%'}}>
                      <Text style={styles.tt2}>{Date(Date.now()).slice(0,10)}</Text>
                    </View>
                </View>
            </View>

              <View >
                  <Text style={styles.Txt1}>Photos before work</Text>   
              </View>
              <View style = {styles.three}></View>

              <View style={styles.t1}>
                  <Text style={styles.text1}>Start Time: </Text>
                  <Text style={styles.text2}>{("0" + stime.getHours()).slice(-2)}:{("0" + stime.getMinutes()).slice(-2)}</Text>
              </View>
              {stphoto.length>0 ? 
              <ScrollView horizontal={true} style={styles.hrscrl}>
              {stphoto.map((element, index) => {
                    return (
                      <View key={index} style={styles.Box2}>
                         <Image style={{ width: '100%', height: '100%',resizeMode:'center'}} source={{uri: element}} />
                      </View>
                    );
                  })}
              </ScrollView>:
               <View  style={styles.Box2}>
                    <AntDesign name="upload" size={35} color="#888888" style={styles.camIcon} />
                </View>
              }

              <TouchableOpacity style = {styles.loginButton} onPress={openCamera1}>
               <Text style={{color:'#00286B',fontSize:20}}>Add Photo</Text>
              </TouchableOpacity>

              <View style = {styles.savebtn} >
                <AppButton title="Save" onPress={handleSubmit1} />
              </View>

           <View style={{marginTop:'10%'}}/>
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
    Second:{
      paddingTop:0.3*box_height,
      marginBottom:5,
   // height:1*box_height,
    },
    serTxt:{
        color:'#005DAF',
        //fontWeight:'bold',
        fontSize:0.5*box_height,
        alignSelf:'center'
    },
    undrln:{
      alignSelf:'center',
      //marginTop:2,
      height : '0.3%',
      width:'65%',
      backgroundColor:"#005DAF",
    },
    First :{
        height : 0.5*box_height
      },
      imgView:{
        marginTop:5,
        height:1.5*box_height,
        marginBottom:0.4*box_height
      },
    image1:{
       alignSelf:'center',
       marginTop:20,
       height:'100%',
      // width:'21%',
       resizeMode:'contain'
    }, 
    B1:{
      marginTop:30,
    flexDirection:'column',
    marginLeft:20
  },
  V1:{
    alignItems:'flex-end',
      marginLeft:5,
    flexDirection:'row',
    paddingRight:0.6*box_height
  },
  tt1:{
      marginTop:9,
     fontSize:0.32*box_height
  },
  tt2:{
      marginTop:9,
      marginLeft:6,
      fontSize:0.3*box_height,
      color:'#666666'
  },
      two:{
          marginTop:5,
          height : '4%',
          width:'100%',
          backgroundColor:"#00286B",
      },
      Txt1:{
        fontSize:0.4*box_height,
       marginLeft:20,
        color:"#005DAF",
        marginTop:0.35*box_height
      },
      three :{
       marginLeft:20,
      marginTop:2,
      height : '0.2%',
      width:'70%',
      backgroundColor:"#005DAF",
    },
      t1:{
        flexDirection:'row',
        marginLeft:22,
        marginTop:10
      },
      text1:{
        marginVertical:0.10*box_height,
         fontSize:0.30*box_height
      },
      text2:{
        marginVertical:0.10*box_height,
        fontSize:0.30*box_height
      },
      Box2:{
        alignSelf:'center',
        height:2.8*box_height,
        width:5*box_height,
        marginTop:10,
        alignSelf:'center',
        padding:5,
        marginRight:10,
         flexDirection:'row',
         borderWidth : 2,
         borderColor : '#D3D3D3',
         alignItems:'center',
         justifyContent:'center'
        },
        hrscrl:{
          height:3.2*box_height,
          flexDirection:'row',
         // width:'80%',
         marginHorizontal:15,
         // paddingHorizontal:15, 
        },
        Txt2:{
            marginTop:0.35*box_height,
            fontSize:0.4*box_height,
           marginLeft:20,
            color:"#005DAF",
          },
          Boxes:{
            padding:5,
            marginTop:20,
           flexDirection:'row',
           height:1*box_height,
           alignSelf:'center',
           width:'85%'
        },
        filterB:{
           alignItems:'center',
           justifyContent:'center',
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
            alignItems:'center',
            //justifyContent:'center',
            flex:1,
            marginLeft:10,
            flexDirection:'row',
            borderTopLeftRadius : 10,
            borderTopRightRadius : 10,
            borderBottomLeftRadius:10,
            borderBottomRightRadius:10,
            borderWidth : 2,
            borderColor : '#005DAF',

        },
        filtxt:{
       padding:3,
       marginLeft:6,
       alignSelf:'center',
       fontSize: 0.30*box_height,
       color:'#00286B'
        },
       
        shareIcon:{
         marginLeft:6,
           color:'#00286B'
        },
        downIcon:{
          
           color:'#00286B'
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
   },
   loginButton : {
    //marginBottom:'15%',
    marginTop:15,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:30,
    height:50,
    //width:150,
    borderRadius:10,
    borderColor:'#00286B',
    borderWidth:2,
    alignSelf:'center'
    
  },
  savebtn : {
    alignSelf:'center',
    paddingBottom:height*0.08,
    width:'60%',
    marginTop:0.35*box_height,
    height : height*0.04,
  }

 
});