import React,{ Component,useContext,useState,useEffect } from 'react';
 import { Dimensions,StyleSheet, TextInput,Text, View,ImageBackground, Image,SafeAreaView,TouchableOpacity  } from 'react-native';
import Rough from './Rough';
import LogOutcomp from './LogOutcomp';
import SM_ServiceHistory from './SM_ServiceHistory';
import SM_NewJobs from './SM_NewJobs';
import SM_Profile from './SM_Profile';
import SM_ProfileSetup from './SM_ProfileSetup';
import SM_Myjobs1 from './SM_MyJobs1';
import SM_ServiceDetails from './SM_ServiceDetails';
import SM_Schedule from './SM_Schedule';
import SM_Myjobs2 from './SM_MyJobs2';
import SM_LiveJob from './SM_LiveJob';
import temp from './temp';
import  SM_JobDetails from './SM_JobDeatails';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';
import  { Auth,API ,graphqlOperation } from 'aws-amplify';
import {getServiceman} from '../../src/graphql/queries'
import { AuthContext } from '../../navigation/AuthProvider';
import Loading from '../../components/Loading';

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

  return (
    <DrawerContentScrollView  >
      <View style={{padding:15, borderBottomColor: '#005DAF', borderBottomWidth: 1,  width: width - 50,}}>
      <Text style={{fontSize:22,fontWeight:'bold',color:'#005DAF',paddingBottom:30,}}>Welcome </Text>
       <Text style={{fontSize:20,fontWeight:'bold'}}>{name}</Text>    
      </View>
      <DrawerItem
        label="Profile"
        onPress={() => props.navigation.navigate('SM_Profile')}
      />
      <DrawerItem
        label="About"
        onPress={() => props.navigation.navigate('temp')}
      />
      <DrawerItem
        label="settings"
        onPress={() => props.navigation.navigate('temp')}
      />
       <DrawerItem
        label="Logout"
        onPress={() => props.navigation.navigate('LogOutcomp')}
      />
    </DrawerContentScrollView>
  );
}

export default function SM_NavStack(props) {
    
    return (
      <Drawer.Navigator screenOptions={{headerShown:false}} drawerContent={props => <CustomDrawerContent {...props}  />}>
           
            {/* {DBdata==null? xyz:null} */}
            
            <Drawer.Screen name="SM_Myjobs2" component={SM_Myjobs2} />
            <Drawer.Screen name="SM_JobDetails" component={SM_JobDetails} />
            <Drawer.Screen name="SM_Myjobs1" component={SM_Myjobs1} />
            <Drawer.Screen name="SM_NewJobs" component={SM_NewJobs} />
            <Drawer.Screen name="SM_Schedule" component={SM_Schedule} />
            <Drawer.Screen name="SM_LiveJob" component={SM_LiveJob} />
            <Drawer.Screen name="SM_ServiceDetails" component={SM_ServiceDetails} />
            <Drawer.Screen name="SM_ServiceHistory" component={SM_ServiceHistory} /> 
            <Drawer.Screen name="SM_ProfileSetup" component={SM_ProfileSetup}/>
            <Drawer.Screen name="Rough" component={Rough} /> 
            <Drawer.Screen name="SM_Profile">
              {screenProps => (
                <SM_Profile {...screenProps} updateAuthState={props.updateAuthState} />
              )} 
            </Drawer.Screen>
            <Drawer.Screen name="LogOutcomp">
              {screenProps => (
                <LogOutcomp {...screenProps} updateAuthState={props.updateAuthState} />
              )} 
            </Drawer.Screen>
            <Drawer.Screen name="temp" component={temp} />
            
      </Drawer.Navigator>
    );
   }
