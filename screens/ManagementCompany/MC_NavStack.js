import React,{ Component,useContext,useState,useEffect } from 'react';
import { Dimensions,StyleSheet, TextInput,Text, View,ImageBackground, Image,SafeAreaView,TouchableOpacity  } from 'react-native';
import MC_Home from './MC_Home';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';
  import  { Auth } from 'aws-amplify';
import { AuthContext } from '../../navigation/AuthProvider';

const { width, height } = Dimensions.get('window');
const Drawer = createDrawerNavigator();


function CustomDrawerContent(props) {
  const [name, setName] = useState('');
  useEffect(() => {
    getName();
}, [])
  async function getName(){
    try {
      const currentUserInfo = await Auth.currentUserInfo();
      setName( currentUserInfo.attributes['name']);

    } catch (err) {
      console.log('error fetching user info: ', err);
    }
  }
  const { Logout } = useContext(AuthContext);
  
  async function signOut({updateAuthState}) {
    try {
      await Auth.signOut();
      updateAuthState('loggedOut');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }

  return (
    <DrawerContentScrollView  >
      <View style={{padding:15, borderBottomColor: '#00BCD4', borderBottomWidth: 1,  width: width - 50,}}>
      <Text style={{fontSize:22,fontWeight:'bold',color:'#00BCD4',paddingBottom:30,}}>Welcome </Text>
       <Text style={{fontSize:20,fontWeight:'bold'}}>USER : {name}</Text>    
      </View>
      <DrawerItem
        label="Help"
        onPress={() => props.navigation.navigate('Home')}
      />
      <DrawerItem
        label="About"
        onPress={() => props.navigation.navigate('Page1')}
      />
      <DrawerItem
        label="settings"
      //  onPress={trail}
      />
       <DrawerItem
        label="Logout"
        //onPress={() => logout({props.updateAuthState} )}
      />
    </DrawerContentScrollView>
  );
}
export default function MC_NavStack(props) {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props}  />}>
            <Drawer.Screen name="MC_Home">
              {screenProps => (
                <MC_Home {...screenProps} updateAuthState={props.updateAuthState} />
              )} 
            </Drawer.Screen>
        </Drawer.Navigator>
    );
  }