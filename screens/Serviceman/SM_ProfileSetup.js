import React, { useState, useRef,useContext,useEffect,Component} from 'react';
import {ScrollView,AppTextInput ,Dimensions, Picker , Button ,StatusBar,SafeAreaView ,StyleSheet, Text,TouchableOpacity,View ,Image,TextInput} from 'react-native';
import Icon from 'react-native-remix-icon';
import AppButton from '../../components/AppButton';
import proImg from '../../assets/images/DefaultProfPic.png';
import ModalDropdown from 'react-native-modal-dropdown';
import Menubar from '../../components/Menubar';
import ImageUploader from '../../components/ImageUploader'
import { MultiselectDropdown } from 'sharingan-rn-modal-dropdown';
import { Auth ,API ,graphqlOperation} from 'aws-amplify';
import PhoneInput from 'react-native-phone-number-input';
import {createServiceman} from '../../src/graphql/mutations'
import * as ImagePicker from 'expo-image-picker';
import {Storage} from 'aws-amplify';
import mime from "mime";

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
    const [callout, setCallout] = useState(0);
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

      useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);
    
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
     
      const handleSubmit = async () => {
        try {
          
          if(name.trim() == "" || age.trim() == ""|| sex.trim() == ""|| postcode.trim() == ""|| county.trim() == ""|| valueMS.length ==0)
            {
                console.log("AlertBox: ");
                Alert.alert(
                    "Enter all fields",
                    "You left some required fields",
                    );
            }
        else{
           
          const newImageUri =  "file:///" + photo.uri.split("file:/").join("");
            const user = await Auth.currentAuthenticatedUser();
          if (photo) {
            const photoResponse = await fetch(newImageUri);
            const blob = await photoResponse.blob();
            await Storage.put(newImageUri.split("/").pop(), blob, {
                contentType: mime.getType(newImageUri),
              });
          }
          console.log(newImageUri.split("/").pop());
          console.log(user.attributes['email']);
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
              rating:0,
              calloutcharge:callout,
              image: photo ? newImageUri.split("/").pop() : 'none',
            }
          })).then(navigation.navigate('Rough',
          {   
              msg:'Details submitted',
          }));
          console.log('response: ',response);

        } 
      }
        catch(e){
            console.log(e);
          }
        };

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
             <StatusBar animated = {true} backgroundColor="#000000"/>      
            <Menubar navigation={navigation} />
            <ScrollView >
                <Text style = {styles.txt}>Profile</Text>
                <TouchableOpacity style = {styles.proImage} 
                    onPress={pickImage} > 
                     {photo ? <Image style={{width: '100%', height: '100%',}} source={{uri: photo.uri}} />:<Image  source = {proImg}/>}
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
                        placeholder='Enter Age'
                        style = {styles.ageInput}
                        keyboardType = "numeric"
                        maxLength = {3}
                        onChangeText = {(text) => setAge(text)}
                        numberOfLines = {1}
                        fontSize={18}
                        textAlign="left"
                    /> 

                    <View style= {styles.sexInput}>
                    <ModalDropdown   
                       // headerContainerStyle={{backgroundColor:'#F1F6FF'}}
                        color='#F1F6FF'
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
                    textContainerStyle={{ borderBottomRightRadius:10,borderTopRightRadius:10,   paddingVertical: 0 ,backgroundColor:'#F1F6FF'}}
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
            <View style = {styles.secondRow0}>
                    <Text style = {styles.nametxt3}>Post Code</Text>
                    <Text style = {styles.nametxt4}>Callout charge</Text>
                </View >
            <View style = {styles.secondRow1}>
            
                <View style = {styles.pcInput}>
                    <TextInput
                        placeholder="Postal code"
                        autoCapitalize="none"
                        autoCorrect={false}  
                        keyboardType="email-address"
                        onChangeText={(text) => setPostcode(text)}
                        fontSize={18}
                    />
                </View>
                <View style = {styles.pcInput1}>
                    <TextInput
                       // style={{width:'50%',borderColor:'#b3b3b3',borderWidth:1}}
                        defaultValue='0'
                        autoCapitalize="none"
                        autoCorrect={false}  
                        keyboardType="numeric"
                        onChangeText={(text) => setCallout(text)}
                        fontSize={18}
                    />
                    <Text style={{fontSize:18,color:'#595959'}}>GBP</Text>
                </View>
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
                <AppButton title="Submit" onPress={handleSubmit}
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
        width:'30%',
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
        backgroundColor:'#F1F6FF',
        width:'88%',
        height:height*0.06,
        borderRadius:8,
        borderColor:'#E3EDFF',
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        elevation: 3,
    },
    pcInput:{
      alignSelf:'center',
      paddingLeft:height*0.02,
      justifyContent:'center',
      backgroundColor:'#F1F6FF',
      width:'47%',
      height:height*0.06,
      borderRadius:8,
      borderColor:'#E3EDFF',
      shadowColor: '#000000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.2,
      elevation: 3,
    },
    pcInput1:{
      flexDirection:'row',
      alignSelf:'center',
      alignItems:'center',
      paddingLeft:height*0.02,
      alignItems:'center',
      justifyContent:'space-between',
      paddingRight:0.03*height,
      backgroundColor:'#F1F6FF',
      width:'47%',
      height:height*0.06,
      borderRadius:8,
      borderColor:'#E3EDFF',
      shadowColor: '#000000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.2,
      elevation: 3,
    },
firstRow:{
    flexDirection : 'row',
    width:'88%',
    height:height*0.05,
    marginTop:'3%'
   },
   secondRow0:{
    flexDirection : 'row',
   // width:'88%',
    height:height*0.05,
    marginTop:'3%',
    justifyContent:'space-between'
   },
   firstRow1:{
      // marginVertical:10,
       //marginTop:5,
       marginLeft : '6%',
        flexDirection : 'row',
        width:'90%',
        height:height*0.06
   },
   secondRow1:{
    marginLeft : '6%',
    flexDirection : 'row',
    width:'90%',
    height:height*0.06,
    justifyContent:'space-between'
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
nametxt3:{
  fontSize:20,
  alignSelf:'flex-start',
  padding:5,
  marginLeft:height*0.035,
  width:'35%'
},
nametxt4:{
  fontSize:19,
  alignSelf:'flex-start',
  padding:5,
  //marginLeft:height*0.05,
  width:'45%'
},
ageInput:{
    flex : 1,
    textAlign:'left',
    paddingLeft:15,
    backgroundColor:'#F1F6FF',
    fontSize:18,
   // marginLeft:'5%',
    marginRight:10,
    borderRadius:8,
    borderColor:'#E3EDFF',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    elevation: 3,
    width:'3%',
    height : '100%',
    alignSelf:'flex-start'
},
sexInput:{
    flex : 1,
    paddingLeft:15,
    paddingTop:'3%',
    backgroundColor:'#F1F6FF',
    fontSize:15,
    marginLeft:10,
    marginRight:10,
    borderRadius:8,
    borderColor:'#E3EDFF',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    elevation: 3,
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
    borderRadius:8,
    borderColor:'#E3EDFF',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    elevation: 3,
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
    width: '40%',
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