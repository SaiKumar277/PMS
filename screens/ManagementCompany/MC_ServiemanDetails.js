import React, { useState, useContext,useEffect,Component} from 'react';
import { Picker ,Dimensions, StatusBar,SafeAreaView ,StyleSheet, Text,TouchableOpacity,View ,Image,TextInput} from 'react-native';
import Menubar from '../../components/Menubar';
import img1 from '../../assets/images/DefaultProfPic.png'
import * as queries from '../../src/graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import {Storage} from 'aws-amplify';
import * as mutations from '../../src/graphql/mutations';
import { useIsFocused } from "@react-navigation/native";
import Loading from '../../components/Loading';



var { height } = Dimensions.get('window');
  var box_count = 12;
  var box_height = height / box_count;

export default function App ({route,navigation}){
    const [pos, setPos] = useState(false);
    const [name, setName] = useState('');
  const [data, setData] = useState([]);
  const [imageSource, setImageSource] = useState(null);
  const isFocused = useIsFocused();
  const getImage = async () => {
    try {
      const imageURL = await Storage.get(data.image);
      setImageSource({
        uri: imageURL,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const { param1,param2 } = route.params;

useEffect(() => {  
    fetchData();
  }, [pos,isFocused]);

  const todoDetails = {
    id:param2,
    serviceman:data.name,
    servicemanid:data.id,
    startdate: new Date().toLocaleDateString(),
  };
  
  const handleSubmit = async () => {
    try {
        
      console.log(param2,name);
      const response= await API.graphql({ query: mutations.updateServices, variables: {input: todoDetails}})
      
      .then(navigation.navigate('Rough',
            {   
                msg:'Service Added',
            }));
        console.log('response  : ',response)
      //navigation.navigate('MC_Servicemen',{param:response.data.createServices.id});
    } 
    catch(e){
        console.log(e);
      }
  };

  
  const fetchData =async() =>{
    try{
        const oneTodo = await API.graphql(graphqlOperation(queries.getServiceman, { id: param1 }));
        
        setData(oneTodo.data.getServiceman);
        await getImage();
        setName(data.name);
        console.log('onetodo',data);
        setPos(true);
    }
    catch(err){
        console.log('error fetching data ',err);
    }
};
    if(!pos)return <Loading/>;
    else{
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
           <StatusBar animated = {true}
                      backgroundColor="#000000"/>
                <Menubar navigation={navigation} />   
                </View>
            
                {imageSource && (
                    <View style={styles.imgView}>
                    <Image source={imageSource} style={styles.image1} />
                    </View>
                )}
                {!imageSource && (
                    <View style={styles.imgView}>
                        <Image source={img1} style={styles.image1}/>
                    </View>
                )}
                
                <View style={styles.B1}>
            <View style={styles.V1}>
                <Text style={styles.tt1}>Name : </Text>
                <Text style={styles.tt2}>{data.name}</Text>
            </View>

            <View style={styles.V1}>
                <Text style={styles.tt1}>Age : </Text>
                <Text style={styles.tt2}>{data.age}</Text>
            </View>

            <View style={styles.V1}>
                <Text style={styles.tt1}>sex : </Text>
                <Text style={styles.tt2}>{data.sex}</Text>
            </View>

            <View style={styles.V1}>
                <Text style={styles.tt1}>Phone Number :</Text>
                <Text style={styles.tt2}>{data.phonenumber}</Text>
            </View>

            <View style={styles.V1}>
                <Text style={styles.tt1}>Category : </Text>
                <Text style={styles.tt2}>{data.category}</Text>
            </View>

            <View style={styles.V1}>
                <Text style={styles.tt1}>Callout Charge : </Text>
                <Text style={styles.tt2}>{data.calloutcharge} INR</Text>
            </View>

            <View style={styles.V1}>
                <Text style={styles.tt1}>Rating : </Text>
                <Text style={styles.tt2}>{data.rating}</Text>
            </View>
            </View>

            <TouchableOpacity style = {styles.filterB} onPress={handleSubmit}>
                                <Text style={styles.filtxt}>Assign</Text>
                                
                            </TouchableOpacity>
                </SafeAreaView>
                );
    }
            
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
      imgView:{
          marginTop:0.5*box_height,
        height:2.5*box_height,
      },
      image1:{
        alignSelf:'center',
        height:'90%',
        width:'40.5%'
       // resizeMode:'contain'
      },
      B1:{
        marginTop:30,
      flexDirection:'column',
      marginLeft:20
    },
    V1:{
        marginLeft:5,
    flexDirection:'row'
    },
    tt1:{
        marginTop:9,
       fontSize:0.32*box_height
    },
    tt2:{
        marginTop:9,
        marginLeft:6,
        fontSize:0.32*box_height,
        color:'#D3D3D3'
    },
    filterB:{
        marginTop:28,
        marginLeft:10,
        width:'34%',
        height:0.68*box_height,
        borderTopLeftRadius : 10,
        borderTopRightRadius : 10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        alignSelf:'center',
        justifyContent:'center',
        borderWidth : 2,
        borderColor : '#005DAF'
    },
    filtxt:{
        padding:3,
        color:'#005DAF',
        alignSelf:'center',
        fontSize:0.4*box_height
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