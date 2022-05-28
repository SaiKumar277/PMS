
 import React,{ Component,useContext,useState,useEffect } from 'react';
 import { Dimensions,StyleSheet, TextInput,Text, View,ImageBackground, Image,SafeAreaView,TouchableOpacity  } from 'react-native';
import SM_Home from './SM_Home';
import SM_ServiceHistory from './SM_ServiceHistory';
import SM_NewJobs from './SM_NewJobs';
import SM_Profile from './SM_Profile';
import SM_ProfileSetup from './SM_ProfileSetup';
import SM_Myjobs1 from './SM_MyJobs1';
import SM_Myjobs2 from './SM_MyJobs2';
import  SM_JobDetails from './SM_JobDeatails';
import  SM_Schedule from './SM_Schedule';
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
      console.log('error fetching user  info: ', err);
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
        label="Profile"
        onPress={() => props.navigation.navigate('SM_Profile')}
      />
      <DrawerItem
        label="About"
        onPress={() => props.navigation.navigate('SM_Profile')}
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

export default function SM_NavStack(props) {
    return (
      <Drawer.Navigator screenOptions={{headerShown:false}} drawerContent={props => <CustomDrawerContent {...props}  />}>
            
            <Drawer.Screen name="SM_ProfileSetup" component={SM_ProfileSetup} />
            <Drawer.Screen name="SM_Schedule" component={SM_Schedule} />
            <Drawer.Screen name="SM_JobDetails" component={SM_JobDetails} />
            <Drawer.Screen name="SM_Myjobs2" component={SM_Myjobs2} />
            <Drawer.Screen name="SM_NewJobs" component={SM_NewJobs} />
            <Drawer.Screen name="SM_Myjobs1" component={SM_Myjobs1} />
            <Drawer.Screen name="SM_ServiceHistory" component={SM_ServiceHistory} />  
            <Drawer.Screen name="SM_Profile">
              {screenProps => (
                <SM_Profile {...screenProps} updateAuthState={props.updateAuthState} />
              )} 
            </Drawer.Screen>
      </Drawer.Navigator>
    );
  }
