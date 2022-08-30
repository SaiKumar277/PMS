import React, { useState, useRef,useContext,useEffect,Component} from 'react';
import {ScrollView,AppTextInput ,Dimensions, Picker , Button ,StatusBar,SafeAreaView ,StyleSheet, Text,TouchableOpacity,View ,Image,TextInput} from 'react-native';
import Icon from 'react-native-remix-icon';
import AppButton from '../../components/AppButton';
import { AuthContext } from '../../navigation/AuthProvider';
import proImg from '../../assets/images/DefaultProfPic.png';
import ModalDropdown from 'react-native-modal-dropdown';
import Menubar from '../../components/Menubar';
import ImageUploader from '../../components/ImageUploader'
import { MultiselectDropdown } from 'sharingan-rn-modal-dropdown';
import { Auth ,API ,graphqlOperation} from 'aws-amplify';
import PhoneInput from 'react-native-phone-number-input';
import {getServiceman} from '../../src/graphql/queries'
import {updateServiceman} from '../../src/graphql/mutations'
import * as ImagePicker from 'expo-image-picker';
import {Storage} from 'aws-amplify';
import Loading from '../../components/Loading';
import mime from "mime";

var { height } = Dimensions.get('window');
export default function App ({navigation, updateAuthState }){
    const [DBdata,setDBdata] = useState([]);
    const [pos, setPos] = useState(false);
    const [imageSource, setImageSource] = useState(null);
    const [img, setImg] = useState('');
    const [id, setId] = useState('');
    const [photo, setPhoto] = useState(null);
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
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

      async function signOut() {
        try {
          await Auth.signOut();
          updateAuthState('loggedOut');
        } catch (error) {
          console.log('Error signing out: ', error);
        }
      }
  
      const fetchData =async() =>{
          try{
            const currentUserInfo = await Auth.currentAuthenticatedUser();
              const Profiledata = await API.graphql(graphqlOperation(getServiceman,{ id:currentUserInfo.attributes["email"]}));
              setDBdata(Profiledata.data.getServiceman);
              await getImage(Profiledata.data.getServiceman.image);
              setPos(true);
             // console.log('Profiledata',DBdata['id']);
          }
          catch(err){
              console.log('error fetching data ',err);
          }
      };
      
      

      useEffect(() => {
        fetchData(); 
        (async () => {
            
            
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, [pos]);
    
      const pickImage = async () => {
        const user = await Auth.currentAuthenticatedUser();
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
    
        console.log(result);
        if (!result.cancelled) {
            setImg(user.attributes['email']);
          setPhoto(result);
        }
      };

      const getImage = async (img) => {
        try {
          const imageURL = await Storage.get(img);
          setImageSource({
            uri: imageURL,
          });
          console.log(imageURL,'imageURL');
        } catch (e) {
          console.log(e);
        }
      };
     
      const handleSubmit = async () => {
        try {
           if(photo){
            const newImageUri =  "file:///" + photo.uri.split("file:/").join("");
            if (photo) {
              const photoResponse = await fetch(newImageUri);
              const blob = await photoResponse.blob();
              await Storage.put(newImageUri.split("/").pop(), blob, {
                  contentType: mime.getType(newImageUri),
                });
            }
            console.log(newImageUri.split("/").pop());
           }
           console.log('phone::',phoneNumber);
          const response=await API.graphql(graphqlOperation(updateServiceman, {
            input: {
              id : id ,
              name : name,
              age : age,
              sex :sex,
              category : valueMS,
              address: address,
              postcode:postcode,
              county:county,
              phonenumber : phoneNumber?phoneNumber:DBdata.phoneNumber,
              image: photo ? newImageUri.split("/").pop() : data.image,
            }
          }));
          console.log('response: ',response);
        } 
        catch(e){
            console.log(e);
          }
      };
    if(!pos)return <Loading/>;
    else{
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
             <StatusBar animated = {true} backgroundColor="#000000"/>      
            <Menubar navigation={navigation} />
            <ScrollView >
  
                <View >
                    <Text style = {styles.txt}>Profile</Text>
                <TouchableOpacity style = {styles.proImage} 
                    onPress={pickImage} > 
                    {imageSource && (
                        <Image source={imageSource} style={{width: '100%', height: '100%',resizeMode:'center'}} />
                    )}
                    {!imageSource && (
                        <Image  source = {proImg}/>
                    )}
                </TouchableOpacity>  
                {/* <Text style = {styles.txt1}>Upload a profile picture</Text> */}
                <Text style = {styles.nametxt}>Name</Text>
                <View style = {styles.nameInput}>
                    <TextInput
                        defaultValue={DBdata.name}
                       
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
                        defaultValue={DBdata.age.toString()}
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
                        defaultValue={DBdata.sex}
                        options={['Male', 'Female']}
                    /> 
                    </View>
            </View>
            <View style={styles.box1}>
                <PhoneInput
               defaultValue={DBdata.phonenumber}
                    ref={phoneInput}
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
                    defaultValue={DBdata.address}
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
                    defaultValue={DBdata.postcode}
                    autoCapitalize="none"
                    autoCorrect={false}  
                    keyboardType = "numeric"
                    onChangeText={(text) => setPostcode(text)}
                    fontSize={18}
                />
            </View>
            <Text style = {styles.adrstxt}>County</Text>
            <View style = {styles.nameInput}>
                <TextInput
                    defaultValue={DBdata.county}
                    autoCapitalize="none"
                    autoCorrect={false}  
                    keyboardType="email-address"
                    onChangeText={(text) => setCounty(text)}
                    fontSize={18}
                />
            </View>
            <View style = {styles.loginButton}>
                <AppButton title="Update" onPress={handleSubmit}
                />
            </View>
            {/* <View style = {styles.loginButton2}>
                <AppButton title="Log Out" onPress={signOut}
                />
            </View> */}
                </View>
                
            </ScrollView>
        </SafeAreaView>
    );
    }
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
    paddingBottom:height*0.05,
    width:'40%',
    height : height*0.10,
},
loginButton2 : {
  alignSelf:'center',
  paddingBottom:height*0.15,
  width:'40%',
  height : height*0.10,
}
 
});