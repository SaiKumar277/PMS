//npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view


import React, { Component,useContext,useState,useEffect } from 'react'
import { Dimensions,StyleSheet, TextInput,Text, View,ImageBackground, Image,SafeAreaView,TouchableOpacity  } from 'react-native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Page1 from '../screens/Page1';
import Default from '../screens/Default';
import Amplify, { Auth } from 'aws-amplify';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../navigation/AuthProvider';

const { width, height } = Dimensions.get('window');
var user =  Auth.currentAuthenticatedUser()
const Drawer = createDrawerNavigator();


function CustomDrawerContent({navigation,updateAuthState}) {
  const [name, setName] = useState('');
  useEffect(() => {
    getName();
}, [])
  async function getName(){
    try {
      const currentUserInfo = await Auth.currentUserInfo()
      setName( currentUserInfo.attributes['name']);
    } catch (err) {
      console.log('error fetching user info: ', err);
    }
  }
  const { logout } = useContext(AuthContext);
  
  async function signOut({}) {
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
       <Text style={{fontSize:20,fontWeight:'bold'}}>USER :{name}</Text>    
      </View>
      <DrawerItem
        label="Help"
        onPress={() => navigation.navigate('Home')}
      />
      <DrawerItem
        label="About"
        onPress={() => navigation.navigate('Page1')}
      />
      <DrawerItem
        label="settings"
      //  onPress={trail}
      />
       <DrawerItem
        label="Logout"
        onPress={() => logout({updateAuthState} )}
      />
    </DrawerContentScrollView>
  );
}
//screenOptions={{headerShown:false}}
function MyDrawer(props) {
    return (
      <Drawer.Navigator useLegacyImplementation={true}   drawerContent={props => <CustomDrawerContent {...props} updateAuthState={props.updateAuthState} />}>
        <Drawer.Screen name="Home">
          {screenProps => (
            <Home {...screenProps} updateAuthState={props.updateAuthState} />
          )} 
        </Drawer.Screen>
        <Drawer.Screen  name="Page1" component={Page1} />
           
        <Drawer.Screen name="Default" component={Default} />     
      </Drawer.Navigator>
    );
  }
  export default function HomeStack({updateAuthState}) {
    return (
      <NavigationContainer independent={true}>
        <MyDrawer updateAuthState={updateAuthState} />
      </NavigationContainer>
    );
  }
  







  import React, { useState, useContext,useEffect,Component} from 'react';
import {AppTextInput , Picker , Button ,StatusBar,SafeAreaView ,StyleSheet, Text,TouchableOpacity,View ,Image,TextInput} from 'react-native';
import Icon from 'react-native-remix-icon';
import AppButton from '../../components/AppButton';
import proImg from '../../assets/images/DefaultProfPic.png';
import ModalDropdown from 'react-native-modal-dropdown';

export default function App ({navigation}){
    const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [Profile, setProfile] = useState('');
  
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
             <StatusBar animated = {true}
                      backgroundColor="#000000"/>
        <View style={styles.container}>          
                      <View style = {styles.Bar}>                    
                    <TouchableOpacity style = {styles.hamButton} 
                    onPress = {() => navigation.toggleDrawer()}>
                    <Icon name="menu-2-fill" />
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.msgButton} 
                    onPress = {() => {alert("you clicked")}}>
                    <Icon name="notification-2-line" />
                    </TouchableOpacity>
                   
               
                </View>
                      <View style = {styles.two}></View>
                      <Text style = {styles.txt}>Profile</Text>
           
           <TouchableOpacity style = {styles.proImage} 
           onPress = {() => {alert("you clicked")}} >
               
    <Image  source = {proImg}/>
  </TouchableOpacity>  
  <Text style = {styles.txt1}>Upload a profile picture</Text>
  <Text style = {styles.nametxt}>Name</Text>

  <View style = {styles.nameInput}>
  <TextInput
  placeholder="Enter Name"
               autoCapitalize="none"
               autoCorrect={false}  
               keyboardType="email-address"
        onChangeText={(text) => setName(text)}
    
        />
</View>
<View style = {styles.firstRow}>
<Text style = {styles.nametxt1}>Age</Text>
    <Text style = {styles.nametxt2}>Sex</Text>
    </View >

<View style = {styles.firstRow1}>
    <TextInput
       style = {styles.ageInput}
       keyboardType = "numeric"
       maxLength = {3}
       onChangeText = {(text) => setAge(text)}
       numberOfLines = {1}
       textAlign="left"
       /> 

       <View style= {styles.sexInput}>
       <ModalDropdown   
       onSelect = {(index, value) => { setProfile(value)} } 
       dropdownTextStyle={styles.ddtxtsty} 
       dropdownStyle={styles.ddsty} 
       style={styles.input} 
       textStyle={styles.ddtxt} 
       defaultValue='Select ' 
       options={['Male', 'Female']}/>
       <TextInput
       style = {styles.sexInput}
       keyboardType = "numeric"
       maxLength = {3}
       onChangeText = {(text) => setAge(text)}
       numberOfLines = {1}
       textAlign="left"
       /> 
       </View>
</View>


<Text style = {styles.nametxt2}>Category</Text>
       <View style = {styles.catInput}>
       <ModalDropdown   
       onSelect = {(index, value) => { setProfile(value)} } 
       dropdownTextStyle={styles.ddtxtsty} 
       dropdownStyle={styles.ddsty} 
       style={styles.input} 
       textStyle={styles.ddtxt} 
       defaultValue='Select ' 
       options={['Male', 'Female']}/>
       <TextInput
       style = {styles.sexInput}
       keyboardType = "numeric"
       maxLength = {3}
       onChangeText = {(text) => setAge(text)}
       numberOfLines = {1}
       textAlign="left"
       /> 


       <TextInput
       style = {styles.sexInput}
       keyboardType = "numeric"
       maxLength = {3}
       onChangeText = {(text) => setAge(text)}
       numberOfLines = {1}
       textAlign="left"
       /> 
       </View>
       <Text style = {styles.nametxt}>Call out charge</Text>
<View style = {styles.nameInput}>
  <TextInput
    autoCapitalize="none"
    autoCorrect={false}  
    keyboardType="email-address"
    onChangeText={(text) => setName(text)}
    />
</View>

<View style = {styles.loginButton}>
               <AppButton title="Done"/>
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
    hamButton:{
        alignSelf:'flex-start',
        alignItems:'center'
    },
    msgButton : {
       
        //alignSelf:''
    },
    Bar:{
       height   :'4%',
       flexDirection:'row',
        justifyContent:'center',
      
      padding:10
    },
    two:{
        marginTop:18,
        height : '0.66%',
        width:'100%',
        backgroundColor:"#00286B"
    },
    txt:{        
        fontSize:25,
        alignSelf:'center',
        padding:5
    },
    proImage:{        
        alignSelf:'center',
        justifyContent : 'center',
        height:'20%',
        width:'30%'

    },
    txt1:{       
        fontSize:18,
        alignSelf:'center',
        padding:4
    },
    nametxt:{
        fontSize:20,
        alignSelf:'flex-start',
        padding:5,
        marginLeft:20
    },
    nameInput:{
        textAlign:'left',
        paddingLeft:23,
        alignSelf:'center',
        backgroundColor:'#E3EDFF',
        fontSize:15,
        width:'90%',
        height:'6%',
        marginLeft:10,
        marginRight:10,
        borderRadius:10
    },
firstRow:{
    
    flexDirection : 'row',
    width:'90%',
    height:'5%'
   },
   firstRow1:{
       marginTop : 14,
        flexDirection : 'row',
        width:'90%',
        height:'5%'
   },
nametxt1:{
    fontSize:20,
    alignSelf:'flex-start',
    padding:3,
    marginLeft:50,
    width:'40%'
},
nametxt2:{
    fontSize:20,
    alignSelf:'flex-start',
    padding:5,
    marginLeft:20,
    width:'40%'
},
ageInput:{
    flex : 1,
    textAlign:'left',
    paddingLeft:5,
    backgroundColor:'#E3EDFF',
    fontSize:15,
    marginLeft:30,
    marginRight:10,
    borderRadius:10,
    width:'40%',
    height : '94%',
    alignSelf:'flex-start'
},
sexInput:{
    flex : 1,
    textAlign:'left',
    paddingLeft:5,
    backgroundColor:'#E3EDFF',
    fontSize:15,
    marginLeft:20,
    marginRight:10,
    borderRadius:10,
    width:'40%',
    height : '94%',
    alignSelf:'flex-start',
    
},
catInput : {
    marginTop : 10,
    textAlign:'left',
    paddingLeft:23,
    alignSelf:'center',
    backgroundColor:'#E3EDFF',
    fontSize:15,
    width:'90%',
    height:'4%',
    marginLeft:10,
    marginRight:10,
    borderRadius:10
},
ddsty:{
  color: '#101010',
  fontSize: 30,
  width: '70%',
  
},
ddtxt:{
  color: '#595959',
  fontSize: 18,
},
ddtxtsty:{
  fontSize:16.5,
  paddingLeft:10
},
loginButton : {
    alignSelf:'center',
    paddingBottom:30,
    width:'40%',
    height : '20%',
    paddingTop:5
}
 
});

/*

const response=await API.graphql(graphqlOperation(createServiceman, {
            input: {
              id : user.attributes['email'] ,
              name : name,
              age : age,
              sex :sex,
              category : valueMS,
              address: address,
              postcode:postcode,
              county:county,
              phonenumber : phoneNumber,
              image: photo ? photo.fileName : 'none',
            }
          }));
          console.log('response: ',response);

          const [data,setData] = useState([]);
    useEffect(()=>{
        fetchData(); 
    },[]);

    const fetchData =async() =>{
        try{
            const Profiledata = await API.graphql(graphqlOperation(listServicemen));
            setData(Profiledata.data.listServicemen.items);
            console.log('Profiledata',data.id);
        }
        catch(err){
            console.log('error fetching data ',err);
        }
    };

*/







import React, { useState, useRef,useContext,useEffect,Component} from 'react';
import {ScrollView,AppTextInput ,Dimensions, Picker , Button ,StatusBar,SafeAreaView ,StyleSheet, Text,TouchableOpacity,View ,Image,TextInput} from 'react-native';
import Icon from 'react-native-remix-icon';
import AppButton from '../../components/AppButton';
import proImg from '../../assets/images/DefaultProfPic.png';
import ModalDropdown from 'react-native-modal-dropdown';
import Menubar from '../../components/Menubar';
import { MultiselectDropdown } from 'sharingan-rn-modal-dropdown';
import PhoneInput from 'react-native-phone-number-input';

var { height } = Dimensions.get('window');
export default function App ({navigation}){
    
    const [img, setImg] = useState('');
    const [photo, setPhoto] = useState(null);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [address, setAddress] = useState('');
    const [postcode, setPostcode] = useState('');
    const [county, setCounty] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const phoneInput = useRef(null);
    const [valueMS, setValueMS] = useState([]);
    const onChangeMS = (value: string[]) => {
        setValueMS(value);
    };
    const data = [
        {
          value: 'Gardening',
          label: 'Gardening',
        },
        {
          value: 'Cleaning',
          label: 'Cleaning',
        },
        {
          value: '3',
          label: 'Job 3',
        },
        {
          value: '4',
          label: 'Job 4',
        },
        {
          value: '5',
          label: 'Job 5',
        }
      ]


    return (
        <SafeAreaView style={styles.safeAreaContainer}>
             <StatusBar animated = {true} backgroundColor="#000000"/>      
            <Menubar navigation={navigation} />
            <ScrollView >
                <Text style = {styles.txt}>Profile</Text>
                <TouchableOpacity style = {styles.proImage} 
                    onPress={pickImage} > 
                     <Image  source = {proImg}/>
                </TouchableOpacity>  
                <Text style = {styles.txt1}>Upload a profile picture</Text>
                <Text style = {styles.nametxt}>Name</Text>
                <View style = {styles.nameInput}>
                    <TextInput
                        placeholder="Enter Name"
                        autoCapitalize="none"
                        autoCorrect={false}  
                        keyboardType="email-address"
                        onChangeText={(text) => setName(text)}
                        fontSize={18}
                    />
                </View>
                <View style = {styles.firstRow}>
                    <Text style = {styles.nametxt1}>Age</Text>
                    <Text style = {styles.nametxt2}>Sex</Text>
                </View >
                <View style = {styles.firstRow1}>
                    <TextInput
                        style = {styles.ageInput}
                        keyboardType = "numeric"
                        maxLength = {3}
                        onChangeText = {(text) => setAge(text)}
                        numberOfLines = {1}
                        textAlign="left"
                    /> 

                    <View style= {styles.sexInput}>
                    <ModalDropdown   
                        
                        onSelect = {(index, value) => { setSex(value)} } 
                        dropdownTextStyle={styles.ddtxtsty} 
                        dropdownStyle={styles.ddsty} 
                        style={styles.input} 
                        textStyle={styles.ddtxt} 
                        defaultValue=' Select ' 
                        options={['Male', 'Female']}
                    /> 
                    </View>
            </View>
            <View style={styles.box1}>
                <PhoneInput
                    ref={phoneInput}
                    defaultValue={phoneNumber}
                    defaultCode="GB"
                    layout="first"
                    withShadow
                    containerStyle={styles.phoneNumberView}
                    textContainerStyle={{ borderBottomRightRadius:10,borderTopRightRadius:10,   paddingVertical: 0 ,backgroundColor:'#E3EDFF'}}
                    onChangeFormattedText={text => {
                    setPhoneNumber(text);
                    }}
                />
            </View>
            <Text style = {styles. adrstxt}>Address</Text>
            <View style = {styles.nameInput}>
                <TextInput
                    placeholder="Enter address"
                    autoCapitalize="none"
                    autoCorrect={false}  
                    keyboardType="email-address"
                    onChangeText={(text) => setAddress(text)}
                    fontSize={18}
                />
            </View>
            <Text style = {styles.adrstxt}>Post code</Text>
            <View style = {styles.nameInput}>
                <TextInput
                    placeholder="Enter Postal code"
                    autoCapitalize="none"
                    autoCorrect={false}  
                    keyboardType="email-address"
                    onChangeText={(text) => setPostcode(text)}
                    fontSize={18}
                />
            </View>
            <Text style = {styles.adrstxt}>County</Text>
            <View style = {styles.nameInput}>
                <TextInput
                    placeholder="Enter County"
                    autoCapitalize="none"
                    autoCorrect={false}  
                    keyboardType="email-address"
                    onChangeText={(text) => setCounty(text)}
                    fontSize={18}
                />
            </View>
            
            <View style={styles.multdd}>
                <MultiselectDropdown
                    itemContainerStyle={{backgroundColor:'#E3EDFF',}}
                    headerContainerStyler={{backgroundColor:'#E3EDFF',}}
                    label="Select your Job category"
                    data={data}
                    enableSearch
                    enableAvatar
                    chipType="outlined"
                    value={valueMS}
                    onChange={onChangeMS}
                />
            </View>
            <View style = {styles.loginButton}>
                <AppButton title="Done" 
                />
            </View>
    </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
   
    safeAreaContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    
    Bar:{
        flexWrap: "wrap",
        height   :'4%',
      // flexDirection:'row',
        //justifyContent:'center',
        alignContent:'space-between',
        paddingHorizontal:18,
        paddingVertical:10
    },
    two:{
        marginTop:18,
        height : '0.66%',
        width:'100%',
        backgroundColor:"#00286B",
        marginBottom:'4%'
    },
    txt:{        
        fontSize:25,
        alignSelf:'center',
        padding:'3%',
        marginTop:height*0.03,
        marginBottom:height*0.03
    },
    proImage:{        
        alignSelf:'center',
       // justifyContent : 'center',
        height:height*0.15,
        width:'30%'
    },
    txt1:{       
        fontSize:18,
        alignSelf:'center',
        marginBottom:height*0.045
    },
    nametxt:{
        fontSize:20,
        alignSelf:'flex-start',
        padding:5,
        marginLeft:height*0.03
    },
    nameInput:{
        alignSelf:'center',
        paddingLeft:height*0.02,
        justifyContent:'center',
        backgroundColor:'#E3EDFF',
        width:'88%',
        height:height*0.06,
        borderRadius:10
    },
firstRow:{
    flexDirection : 'row',
    width:'88%',
    height:height*0.05,
    marginTop:'3%'
   },
   firstRow1:{
      // marginVertical:10,
       //marginTop:5,
       marginLeft : '6%',
        flexDirection : 'row',
        width:'90%',
        height:height*0.06
   },
nametxt1:{
    fontSize:20,
    alignSelf:'flex-start',
    padding:5,
    marginLeft:'9%',
    width:'40%'
},
nametxt2:{
    fontSize:20,
    alignSelf:'flex-start',
    padding:5,
    marginLeft:height*0.05,
    width:'40%'
},
ageInput:{
    flex : 1,
    textAlign:'left',
    paddingLeft:15,
    backgroundColor:'#E3EDFF',
    fontSize:15,
   // marginLeft:'5%',
    marginRight:10,
    borderRadius:10,
    width:'3%',
    height : '100%',
    alignSelf:'flex-start'
},
sexInput:{
    flex : 1,
    paddingLeft:15,
    paddingTop:'3%',
    backgroundColor:'#E3EDFF',
    fontSize:15,
    marginLeft:10,
    marginRight:10,
    borderRadius:10,
    width:'3%',
    height : '100%',
    //alignSelf:'flex-start',
},
phoneNumberView: {
    width: '98%',
    height: height*0.065,
    backgroundColor:'#ccdeff',
   // borderWidth:1,
    marginLeft:'7%',
    borderRadius:10,
    alignSelf:'flex-start',
    marginTop:'9%',
   
  },
  adrstxt:{
    marginTop:'5%',
    fontSize:20,
    alignSelf:'flex-start',
    padding:5,
    marginLeft:'8%',
    width:'40%'
  },
  multdd:{
    width:'86%',
    marginLeft:'7%',
    marginVertical:'8%'
   
  },
box1:{
    marginVertical:5,
    //alignItems:'center',
    width:'88%'
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
loginButton : {
    alignSelf:'center',
    paddingBottom:height*0.15,
    width:'40%',
    height : height*0.10,
}
 
});

const [data,setData] = useState([]);
    useEffect(()=>{
       // handleSubmit();
        fetchData();
    },[]);
    const fetchData =async() =>{
      try{
          const jobdata = await API.graphql(graphqlOperation(listJinfos));
          setData(jobdata.data.listJinfos.items);
          console.log('jobdata',data.id);
      }
      catch(err){
          console.log('error fetching data ',err);
      }

  };


{data.map((item, index) => (
  
))}

<View key={index} >
  <Text  style={{fontSize:22,fontWeight:'bold',color:'#00BCD4',}} >{item.day}</Text>
  </View>

# This "input" configures a global authorization rule to enable public access to
# all models in this schema. Learn more about authorization rules here: https://docs.amplify.aws/cli/graphql/authorization-rules
input AMPLIFY { globalAuthRule: AuthRule = { allow: public } } # FOR TESTING ONLY!

type Serviceman @model  {
  id: ID!
  name: String!
  age: Int!
  sex: String!
  category: [String!]!
  address: String
  postcode:Int
  county:String
  phonenumber: AWSPhone
  image:String

}

type Jinfo @model {
  id: ID!
  created_by: String!
  block_name: String!
  category: String!
  schedule: String!
  day:String
  time_hours:Int
  time_min:Int
  start_time:String
  end_time:String
}


