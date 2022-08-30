import React, { Component,useEffect } from 'react'

import {StatusBar,SafeAreaView,View ,StyleSheet, Text, } from 'react-native'

export default function Default ({navigation }){
    
    return (
        <SafeAreaView >
          <View style={{alignItems:'center',justifyContent:'center',marginTop:50}}>
            <Text style={{fontSize:22,fontWeight:'bold',color:'black',}} >Page will be updated soon</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

bg:{
    color:'#00BCD4',
    backgroundColor:'#00BCD4',
    alignItems:'center',
    justifyContent:'center',

  },
 
});

