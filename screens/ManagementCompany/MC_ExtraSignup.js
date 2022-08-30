import React, { useState, useContext,useEffect,Component} from 'react';
import { Alert,Picker ,Dimensions, StatusBar,SafeAreaView ,StyleSheet, Text,TouchableOpacity,View ,Image,TextInput} from 'react-native';
import Menubar from '../../components/Menubar';
import AppTextInput from '../../components/TextInput';
import AppButton from '../../components/AppButton';
import img1 from '../../assets/images/docsign.png'
import { Auth ,API ,graphqlOperation} from 'aws-amplify';
import { Entypo } from '@expo/vector-icons';
import ModalDropdown from 'react-native-modal-dropdown';
import {createMCSignupinfo} from '../../src/graphql/mutations';
var { height } = Dimensions.get('window');
  var box_count = 12;
  var box_height = height / box_count;

export default function MC_ExtraSignup ({navigation}){
    const [contract, setContract] = useState('');
    
    const [notes, setNotes] = useState('');
    const handleSubmit = async () => {
        try {
          if(contract.trim() == "" || notes.trim() == "")
                {
                    console.log("AlertBox: ");
                    Alert.alert(
                        "Enter all fields",
                        "You left some required fields",
                      );
                }

              else{
              const user = await Auth.currentAuthenticatedUser();
          const response=await API.graphql(graphqlOperation(createMCSignupinfo, {
            input: {
                id:user.attributes['email'],
                contract_type:contract,
                notes:notes
            }
          })) .then(navigation.navigate('Rough',
          {   
              msg:'Details submitted',
          }));
          console.log('response: ',response);
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

              <View>
                  <Text style={styles.t1}>One Last Step...</Text>
              </View>

              <View style={styles.imgView}>
                  <Image source={img1} style={styles.image1}/>
                  <View style={styles.t2View}>
                  <Text style={styles.t2}>Contract type</Text>
                  
              </View>

              <View style= {styles.sexInput}>
              <ModalDropdown   
                        
                        onSelect = {(index, value) => { setContract(value)} } 
                        dropdownTextStyle={styles.ddtxtsty} 
                        dropdownStyle={styles.ddsty} 
                        style={{width:'100%'}} 
                        textStyle={styles.ddtxt} 
                        defaultValue=' Select ' 
                        options={['3rd Party', 'Direct']}
                    /> 
                    {/* <Entypo name='chevron-down' size={36} style={styles.dIcon} onPress={onDropdownWillShow}  /> */}
                    </View>

              <View >
                  <Text style={styles.nTxt}>Notes:</Text>
              </View>
              
              <View style={styles.Box2}>
              <TextInput
                placeholder='enter...'
                autoCapitalize="none"
                autoCorrect={false}  
                style={{fontSize:18}}
                multiline={true}
                onChangeText={(text) => setNotes(text)}

                />
            </View>
              </View>
                
            <View style = {styles.botmBox}>
               
            <View style = {styles.resetBtn}>
               <AppButton title="Submit" onPress={handleSubmit}/>
               </View>
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
     
      t1:{
        fontSize:0.45*box_height,
        color:'#00286B',
        marginLeft:20,
        marginTop:30
      },
    imgView:{
       height:6.4*box_height
    },
  
    image1 : {
        marginTop:30,
        resizeMode:'contain',
        //width:'24%',
        height:'20%',  
        alignSelf:'center'
      },
      sexInput:{
        //flex : 1,
        paddingLeft:15,
        paddingTop:'3%',
        backgroundColor:'#E3EDFF',
        fontSize:15,
        marginLeft:25,
        marginRight:10,
        borderRadius:10,
        width:'80%',
        height : 50,
        flexDirection:'row'
        //alignSelf:'flex-start',
    },
    ddsty:{
        height:height*0.11,
        color: '#101010',
        fontSize: 30,
        width: '70%',
        justifyContent:'center'
      
    },
    ddtxt:{
      color: '#595959',
      fontSize: 18,
    },
    ddtxtsty:{
      fontSize:16.5,
      paddingLeft:10
    },
     t2View:{
         marginTop:40,
         marginLeft:30,
       flexDirection:'row',
       width:'100%'
     },
     t2:{
       color:'#000000',
       fontSize:0.4*box_height,
     },
     dIcon:{
      color:'#00286B',
      marginLeft:6,
      //flexDirection:'row-reverse'
      position:'absolute',
      right:10,
      alignSelf:'center'
      
     },
     nTxt:{
         marginTop:10,
         fontSize:0.4*box_height,
         marginLeft:20,
         padding:6,
     },

     B1:{
        flexDirection:'row'
      },
      v1:{
       marginTop:8,
       textAlign:'left',
       backgroundColor:'#E3EDFF',
       fontSize:15,
       width:'80%',
       height:0.7*box_height,
       marginLeft:40,
       borderRadius:8,
       alignContent:'center'
      },
      t11:{
       marginLeft:20,
       marginTop:4,
        fontSize:0.35*box_height,
        justifyContent:'center',
        color:'#000000'
      },
   
      Box2:{
        height:2.8*box_height,
        width:'80%',
        marginTop:10,
        alignSelf:'center',
        padding:5,
         flexDirection:'row',
         borderWidth : 2,
         borderColor : '#D3D3D3',
         alignItems:'flex-start',
         flexWrap:'wrap'
        },

    botmBox  : {
        width:'100%',
        height:1.9*box_height,
        marginBottom:30,
        bottom:0,
        position: 'absolute', 
        flex : 1,
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    resetBtn:{
        alignSelf:'center',
        marginTop:28,
        width:'70%'
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