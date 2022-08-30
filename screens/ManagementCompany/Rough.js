import React, { useState, useContext,useEffect,Component} from 'react';
import { Picker ,Dimensions, StatusBar,SafeAreaView ,StyleSheet, Text,TouchableOpacity,View ,Image,TextInput} from 'react-native';
import Menubar from '../../components/Menubar';
import { MaterialIcons } from '@expo/vector-icons';
import { useIsFocused } from "@react-navigation/native";
import AppButton from '../../components/AppButton';
var { height } = Dimensions.get('window');
  var box_count = 12;
  var box_height = height / box_count;

export default function DoneScreen ({route,navigation}){
  const isFocused = useIsFocused();
  const { msg } = route.params;
  useEffect(() => {  

    }, [isFocused]);

  
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
           <StatusBar animated = {true}
                      backgroundColor="#000000"/>    
                <Menubar navigation={navigation} />        
              </View>
              <View style={{alignItems:"center",marginTop:0.5*box_height}}>
              <MaterialIcons style={styles.icon} name="done" size={150} color="green" />
              <Text style={styles.txt1}>Done!</Text>
              </View> 
              <View style={{alignItems:'center',marginTop:0.2*box_height}}>
                  <Text style={styles.txt2}>{msg}</Text>
                  <Text style={styles.txt2}>successfuly</Text>
              </View>
              {msg=='Details submitted'?
              <View style = {styles.resetBtn}>
              <AppButton title="Get Started" onPress={() => navigation.navigate('MC_Blocks')}/>
              </View>
              :null}
        </SafeAreaView>
    );
  
  
}

const styles = StyleSheet.create({

    safeAreaContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    icon:{
      borderColor:'green',
      borderRadius:500,
      borderWidth:5,
      width:'45%',
    },
    txt1:{
      marginTop:0.2*box_height,
      fontSize:0.55*box_height
    },
    txt2:{
      //marginTop:0.05*box_height,
      fontSize:0.45*box_height
    },
    resetBtn:{
      alignSelf:'center',
      marginTop:28,
      width:'70%'
   },
 
});