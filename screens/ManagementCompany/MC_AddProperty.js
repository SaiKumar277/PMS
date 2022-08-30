import React, { useState, useContext,useEffect,Component} from 'react';
import { Alert,Picker ,Dimensions, StatusBar,SafeAreaView ,StyleSheet, Text,TouchableOpacity,View ,Image,TextInput, ScrollView} from 'react-native';
import AppTextInput from '../../components/TextInput';
import AppButton from '../../components/AppButton';
import Navbar from '../../components/Navbar';
import Menubar from '../../components/Menubar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Auth ,API ,graphqlOperation} from 'aws-amplify';
import {createMCPropertyinfo} from '../../src/graphql/mutations';

var { height } = Dimensions.get('window');
  var box_count = 12;
  var box_height = height / box_count;

export default function MC_AddProperty ({navigation}){
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');
    const [postcode, setPostcode] = useState('');
    const [county, setCounty] = useState('');
    const [country, setCountry] = useState('');
    const handleSubmit = async () => {
        try {
        if(name.trim() == "" || city.trim() == ""|| region.trim() == ""|| postcode.trim() == ""|| county.trim() == ""|| country.trim() == "")
            {
                console.log("AlertBox: ");
                Alert.alert(
                    "Enter all fields",
                    "You left some required fields",
                    );
            }
        else{
            const user = await Auth.currentAuthenticatedUser();
          const response=await API.graphql(graphqlOperation(createMCPropertyinfo, {
            input: {
               
                name:name,
                city:city,
                region:region,
                postcode:postcode.toString(),
                county:county,
                country:country,
                created_by:user.attributes['email']
            }
          })).then(navigation.navigate('Rough',
          {   
              msg:'Property Added',
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
            <ScrollView>
              <View style={{marginVertical:0.3*box_height,justifyContent:'center',alignItems:'center'}}>
                   <MaterialCommunityIcons name="home-city" size={1.3*box_height} color="#005DAF" />
                </View>

            <View>
                <Text style={styles.Text11}>Add Property</Text>
            </View>

<View style={styles.V1}>
            <View style = {styles.B1}>
                <Text style={styles.T1}>Name of the Block</Text>
                <View style = {styles.nameInput}>
            <TextInput
                style={{fontSize:20}}
               autoCapitalize="none"
               autoCorrect={false}  
               onChangeText={(text) => setName(text)}
            />
        </View>
            </View>
            <View style = {styles.B1}>
            <Text style={styles.T2}>City</Text>
            <View style = {styles.nameInput}>
            <TextInput
               style={{fontSize:20}}
               autoCapitalize="none"
               autoCorrect={false}  
               onChangeText={(text) => setCity(text)}
    
            />
        </View>
            </View>

            <View style = {styles.B1}>
            <Text style={styles.T2}>Region</Text>
            <View style = {styles.nameInput}>
            <TextInput
                style={{fontSize:20}}
               autoCapitalize="none"
               autoCorrect={false}  
               onChangeText={(text) => setRegion(text)}
    
            />
        </View>
            </View>
            <View style = {styles.B1}>
            <Text style={styles.T2}>Postcode</Text>
            <View style = {styles.nameInput}>
            <TextInput
               autoCapitalize="none"
               autoCorrect={false}  
               keyboardType="numeric"
               onChangeText={(text) => setPostcode(text)}
               style={{fontSize:20}}
    
            />
        </View>
            </View>
            <View style = {styles.B1}>
            <Text style={styles.T2}>County</Text>
            <View style = {styles.nameInput}>
            <TextInput
  
               autoCapitalize="none"
               autoCorrect={false}  
               onChangeText={(text) => setCounty(text)}
               style={{fontSize:20}}
    
            />
        </View>
            </View>
            <View style = {styles.B1}>
            <Text style={styles.T2}>Country</Text>
            <View style = {styles.nameInput}>
            <TextInput
               autoCapitalize="none"
               autoCorrect={false}  
               onChangeText={(text) => setCountry(text)}
               style={{fontSize:20}}
            />
        </View>
            </View>
            <View style = {styles.loginButton}>
                <AppButton title="Done" onPress={handleSubmit}/>
            </View>
            </View>
            </ScrollView>
            
          
        </SafeAreaView>
    );
  
}

const styles = StyleSheet.create({

    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF'
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
      twohome1:{
        marginTop:5,
       // height:0.7*box_height,
        width:'40%',
        resizeMode:'contain',
        alignSelf:'center'
      },
      Text11:{
         // marginTop:15,
         color:'#00286B',
         fontSize:0.45*box_height,
         alignSelf:'center',
         justifyContent:'center',
      },
      V1 : {
         flexDirection:'column'
      },
      B1:{
          flexDirection:'column'
      },
      T1:{
          marginTop:20,
        marginLeft:30,
        fontSize:0.35*box_height,
      },
      T2:{
        marginTop:5,
        marginLeft:30,
        fontSize:0.35*box_height,
      },
      nameInput:{
          marginTop:8,
        textAlign:'left',
        backgroundColor:'#F1F6FF',
        fontSize:15,
        //width:'80%',
        height:0.7*box_height,
        marginHorizontal:30,
        borderRadius:8,
        borderColor:'#E3EDFF',
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        elevation: 3,
        justifyContent:'center',
        paddingHorizontal:5
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
    alignSelf:'center',
    paddingBottom:height*0.15,
    width:'40%',
    height : height*0.10,
}
});