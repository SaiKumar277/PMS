import React from 'react';
import { Dimensions,StyleSheet, TextInput,Text, View,ImageBackground, Image,SafeAreaView,TouchableOpacity  } from 'react-native';
import Icon from 'react-native-remix-icon';
var { height } = Dimensions.get('window');
export default function Menubar({navigation}) {
  return (
    <View style = {styles.Bar}>                    
        <TouchableOpacity style={styles.menu}
            onPress = {() => navigation.toggleDrawer()}>
            <Icon name="menu-2-fill" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.notif}
            onPress = {() => {alert("No notifications")}}>
            <Icon name="notification-2-line" />
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Bar:{
    height   :height*0.07,
    justifyContent:'center',
    alignItems:'center', 
    alignContent:'space-between',
    flexDirection:'row',
    paddingHorizontal:18,
    paddingVertical:10,
    borderBottomWidth:height*0.006,
    borderColor:'#00286B'

},
menu:{
    position:'absolute',
    left:'5%'
},
notif:{
    position:'absolute',
    right:'5%'
}
});