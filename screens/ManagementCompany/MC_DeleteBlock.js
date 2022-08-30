import React, { useState, useContext,useEffect,Component} from 'react';
import { Picker ,Dimensions, StatusBar,SafeAreaView ,StyleSheet, Text,TouchableOpacity,View ,Image,TextInput} from 'react-native';
import Menubar from '../../components/Menubar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as mutations from '../../src/graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../src/graphql/queries';
import Loading from '../../components/Loading';
import { useIsFocused } from "@react-navigation/native";
var { height } = Dimensions.get('window');
  var box_count = 12;
  var box_height = height / box_count;

export default function DeleteBlock ({route,navigation}){
    const [blockid, setBlockid] = useState('');
    const [date, setDate] = useState('1234567890');
    const isFocused = useIsFocused();
    const { p1,p2,p3 } = route.params;
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [pos, setPos] = useState(false);
    const [load, setload] = useState(true);

    useEffect(() => {  
        if(load){
            fetchData1();
            fetchData2();
        }
        setload(true);
      }, [pos,isFocused]);

      const fetchData1 =async() =>{
            try{
                let filter = {
                    blockid: {
                        eq: p1 
                    }
                };
                const oneTodo = await API.graphql({ query: queries.listServices, variables: { filter: filter}});
                setData1(oneTodo.data.listServices.items);
                console.log('data1-->',data1);
            }
            catch(err){
                console.log('error fetching data ',err);
            }
        };
        //listServiceDetails
        const fetchData2 =async() =>{
            try{
                let filter = {
                    blockid: {
                        eq: p1 
                    }
                };
                const oneTodo = await API.graphql({ query: queries.listServiceDetails, variables: { filter: filter}});
                setData2(oneTodo.data.listServiceDetails.items);
                // console.log('data2 ',data2);
                // console.log('answer= ',data2[0]);
                setPos(true);
            }
            catch(err){
                console.log('error fetching data ',err);
            }
        };
        //deleteMCPropertyinfo
    
    const handleSubmit = async () => {
        try {
            setload(false);
            setPos(false);
            for (let i = 0; i < data1.length; i++) {
                const response1 = await API.graphql({ query: mutations.deleteServices, variables: {input: {id:data1[i].id}}});
            }
            console.log('1st loop done........ ');
            for (let i = 0; i < data2.length; i++) {
                const response2 = await API.graphql({ query: mutations.deleteServiceDetails, variables: {input: {id:data2[i].id}}});
            }
            console.log('2nd loop done........ ');

            const response3 = await API.graphql({ query: mutations.deleteMCPropertyinfo, variables: {input: {id:p1}}})
            .then(navigation.navigate('Rough',
                {   
                    msg:'Block deleted',
                }));
            
            console.log('response3 ',response3);
        } 
        catch(e){
            console.log(e);
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
              <View >
                  <Text style={styles.Txt1}>Delete Property</Text>   
              </View>
              <View style = {styles.three}></View>

              <View style={styles.imgView}>
                <MaterialCommunityIcons name="delete-forever" size={1.8*box_height} style={styles.image1} color="#005DAF" />
              </View>
              <View>
              <Text style={styles.t1}>Are you sure you want to</Text>
              </View>
              <View >
                  <Text style={styles.t2}>Delete the block ? </Text>
              </View>

              <View style={styles.B1}>
 
                      <View style={styles.V1}>
                           <Text style={styles.tt1}>Block Name : </Text>
                           <Text style={styles.tt2}>{p2}</Text>
                      </View>

                      <View style={styles.V1}>
                           <Text style={styles.tt1}>active Services : </Text>
                           <Text style={styles.tt2}>{data1.length}</Text>
                      </View>

                      <View style={styles.V1}>
                           <Text style={styles.tt1}>previous services : </Text>
                           <Text style={styles.tt2}>{data2.length}</Text>
                      </View>
                      <View style={styles.V1}>
                           <Text style={styles.tt1}>Starting Date : </Text>
                           <Text style={styles.tt2}>{p3.slice(0,10)}</Text>
                      </View>
              </View>
              <Text style={styles.t3}>
                All the data related to this block will be lost forever
              </Text>
            
              <View style = {styles.Boxes}>
                <TouchableOpacity style = {styles.filterB} onPress={handleSubmit}>
                      <Text style={styles.filtxt1}>Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.sortB} onPress={() => navigation.navigate('MC_Blocks')}>
                    <Text style={styles.filtxt2}>Cancel</Text>  
                </TouchableOpacity>
           </View>   
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
      Txt1:{
        fontSize:0.5*box_height,
      alignSelf:'center',
        color:"#005DAF",
        marginTop:0.2*box_height
      },
      three :{
        alignSelf:'center',
      marginTop:2,
      height : '0.2%',
      width:'62%',
      backgroundColor:"#005DAF",
    },
    imgView:{
        marginTop:5,
        height:1.6*box_height,
        marginBottom:0.4*box_height
      },
    image1:{
       alignSelf:'center',
       marginTop:20,
       height:'100%',
      // width:'21%',
     //  resizeMode:'contain'
    },
  
    t1:{
        marginTop:28,
        alignSelf:'center',
        fontSize:0.4*box_height
    },
    t2:{
       
        fontSize:0.4*box_height,
        alignSelf:'center',
    },
    t3:{
        marginTop:18,
        fontSize:0.3*box_height,
        alignSelf:'center',
        marginHorizontal:15,
        textAlign:'center',
        color:'#737373'


    },
    B1:{
        marginTop:0.4*box_height,
      flexDirection:'column',
      marginLeft:20
    },
    V1:{
    flexDirection:'row'
    },
    tt1:{
        marginTop:9,
       fontSize:0.35*box_height
    },
    tt2:{
        marginTop:9,
        marginLeft:6,
        fontSize:0.35*box_height,
        color:'#D3D3D3'
    },
    Boxes:{
        padding:5,
        marginTop:0.5*box_height,
       flexDirection:'row',
       height:'9%',
       alignSelf:'center',
       width:'80%'
    },
    filterB:{
        flex:1,
        marginLeft:10,
        borderTopLeftRadius : 10,
        borderTopRightRadius : 10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
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
        borderTopLeftRadius : 10,
        borderTopRightRadius : 10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        left:0,
        borderWidth : 2,
        borderColor : '#005DAF'
    },
    filtxt1:{
        padding:3,
        color:'red',
        alignSelf:'center',
        fontSize:0.35*box_height
    },
    filtxt2:{
        padding:3,
        color:'#005DAF',
        alignSelf:'center',
        fontSize:0.35*box_height
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