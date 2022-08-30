import React from 'react';
import {Text,Image, View,Dimensions, ActivityIndicator, StyleSheet } from 'react-native';
import { Entypo,Feather,Ionicons,FontAwesome5,FontAwesome,MaterialCommunityIcons } from '@expo/vector-icons';

var { height } = Dimensions.get('window');
  var box_count = 9.5;
  var box_height = height / box_count;
//style={{direction:'ltr',paddingLeft:6}}
export default function Navbar({navigation}) {
    
  return (
    <View style = {styles.botmBox}>
            <View style={styles.inrbox}>
                <View style = {styles.cir}>
                    <FontAwesome name="briefcase" size={25} style = {styles.b1} color="#00286B" onPress={() => navigation.navigate('SM_Myjobs2')} />
                </View>
                <Text >Jobs</Text>
            </View>   
            
            <View style={styles.inrbox}>
                <View style = {styles.cir}>
                    <MaterialCommunityIcons name="calendar-clock" size={27} style = {styles.b1} color="#00286B" onPress={() => navigation.navigate('SM_Schedule')}/>
                </View>
                <Text >schedule</Text>
            </View>
            
            <View style={styles.inrbox}>
                <View style = {styles.cir}>
                    <Ionicons name="document" size={25} style = {styles.b1} color="#00286B" onPress={() => navigation.navigate('temp')}/>
                </View>
                <Text >Docs</Text>
            </View>
            
            <View style={styles.inrbox}>
                <View style = {styles.cir}>
                    <FontAwesome5 name="history" size={24} style = {styles.b1} color="#00286B" onPress={() => navigation.navigate('SM_ServiceHistory')}/>
                </View>
                <Text >History</Text>
            </View>

    </View>
  );
}

const styles = StyleSheet.create({
    botmBox  : {
        width:'100%',
        height:box_height,
        borderTopRightRadius : 40,
        borderTopLeftRadius:40,
        borderWidth:5,
        borderColor:"#00286B",
        //marginBottom:2,
        position: 'absolute', 
        bottom: 0,
        flex : 1,
        flexDirection:'row',
        justifyContent:'space-evenly',
       // alignItems:'center'
       backgroundColor:'white'
    },
    inrbox:{
        marginTop:4,
        //justifyContent:'center',
        alignItems:'center'
        
        
    },
    jobs:{
        height:42,
        width:52,
        padding:7,  
        alignSelf:'center'
 

    },
    cir:{
        borderRadius:25/2,
        borderWidth:2,
        borderColor:"#00286B",
        margin:'1%'
    },
    b1:{
        padding:7,     
    },
});