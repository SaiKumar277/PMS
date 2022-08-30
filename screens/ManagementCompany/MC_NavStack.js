import React,{ Component,useContext,useState,useEffect } from 'react';
import { Dimensions,StyleSheet, TextInput,Text, View,ImageBackground, Image,SafeAreaView,TouchableOpacity  } from 'react-native';
import LogOutcomp from './LogOutcomp';
import MC_AddProperty from './MC_AddProperty';
import MC_ExtraSignup from './MC_ExtraSignup';
import MC_Servicemen from './MC_Servicemen';
import MC_ServiemanDetails from './MC_ServiemanDetails';
import MC_ServiceHistory from './MC_ServiceHistory';
import MC_ActiveServices from './MC_ActiveServices';
import temp from './temp';
import Rough from './Rough';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../src/graphql/queries';
import MC_EditServiceSchedule from './MC_EditServiceSchedule';  
import MC_Blocks from './MC_Blocks';
import MC_DeleteBlock from './MC_DeleteBlock';
import MC_AddService from './MC_AddService';
import MC_TerminateService from './MC_TerminateService';
import MC_ServiceDetails from './MC_ServiceDetails';
import MC_BlockDetails from './MC_BlockDetails';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';
  import  { Auth } from 'aws-amplify';
  import Loading from '../../components/Loading';
import { AuthContext } from '../../navigation/AuthProvider';

const { width, height } = Dimensions.get('window');
const Drawer = createDrawerNavigator();


function CustomDrawerContent({ navigation ,updateAuthState}) {
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
  
  
 

  return (
    <DrawerContentScrollView  >
      <View style={{padding:15, borderBottomColor: '#005DAF', borderBottomWidth: 1,  width: width - 50,}}>
      <Text style={{fontSize:22,fontWeight:'bold',color:'#005DAF',paddingBottom:30,}}>Welcome </Text>
       <Text style={{fontSize:20,fontWeight:'bold'}}>USER : {name}</Text>    
      </View>
      <DrawerItem
        label="Help"
        onPress={() => navigation.navigate('temp')}
      />
      <DrawerItem
        label="About"
        onPress={() => navigation.navigate('temp')}
      />
      <DrawerItem
        label="settings"
        onPress={() => navigation.navigate('temp')}
      />
       <DrawerItem
        label="Logout"
        onPress={() => navigation.navigate('LogOutcomp')}
      />
    </DrawerContentScrollView>
  );
}





export default function MC_NavStack(props) {
      
    return (
      
        <Drawer.Navigator screenOptions={{headerShown:false}} drawerContent={props => <CustomDrawerContent {...props}  />}>
           
           {/* {DBdata==null?:null} */}
            <Drawer.Screen name="MC_Blocks" component={MC_Blocks} />
            <Drawer.Screen name="MC_DeleteBlock" component={MC_DeleteBlock} />
            <Drawer.Screen name="MC_ActiveServices" component={MC_ActiveServices} />
            <Drawer.Screen name="MC_AddService" component={MC_AddService} />
            <Drawer.Screen name="MC_EditServiceSchedule" component={MC_EditServiceSchedule} />
            <Drawer.Screen name="MC_Servicemen" component={MC_Servicemen} />
            <Drawer.Screen name="MC_BlockDetails" component={MC_BlockDetails} />
            <Drawer.Screen name="MC_TerminateService" component={MC_TerminateService} />
            <Drawer.Screen name="MC_ServiceHistory" component={MC_ServiceHistory} />
            <Drawer.Screen name="MC_ServiceDetails" component={MC_ServiceDetails} />
            <Drawer.Screen name="MC_ServiemanDetails" component={MC_ServiemanDetails} />
            <Drawer.Screen name="MC_AddProperty" component={MC_AddProperty} />
            <Drawer.Screen name="MC_ExtraSignup" component={MC_ExtraSignup} />
            <Drawer.Screen name="temp" component={temp} />
            <Drawer.Screen name="Rough" component={Rough} />
            <Drawer.Screen name="LogOutcomp">
              {screenProps => (
                <LogOutcomp {...screenProps} updateAuthState={props.updateAuthState} />
              )} 
            </Drawer.Screen>

        </Drawer.Navigator>
    );
      
  }