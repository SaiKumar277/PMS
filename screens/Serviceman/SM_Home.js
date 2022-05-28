import React, {useState,useRef} from 'react';
import {Image, TouchableOpacity,View, Text, StyleSheet, Button, TextInput,ScrollView } from 'react-native';
import { Auth ,API ,graphqlOperation} from 'aws-amplify';
import {createServiceman} from '../../src/graphql/mutations'
import { MultiselectDropdown } from 'sharingan-rn-modal-dropdown';
import AppButton from '../../components/AppButton';
import ImageUploader from '../../components/ImageUploader'
import * as ImagePicker from 'react-native-image-picker';
import PhoneInput from 'react-native-phone-number-input';
import AddProperty from '../../components/AddProperty';
import rect from '../../assets/images/Rectangle.png'
export default function SM_Home({ updateAuthState }) {
  const [imageSource, setImageSource] = useState(null);

  function selectImage() {
    
  }
  
  const [phoneNumber, setPhoneNumber] = useState('');
 
  const phoneInput = useRef(null);

  const [name, setName] = useState('');

  const [age, setAge] = useState('');

  const [sex, setSex] = useState('');

  const [valueMS, setValueMS] = useState([]);
  const onChangeMS = (value: string[]) => {
    setValueMS(value);
  };
  

  const [callout, setCallout] = useState('');

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

  const handleSubmit=async()=>{
    try{
      console.log(valueMS);
      const currentUserInfo = await Auth.currentUserInfo();
    const response=await API.graphql(graphqlOperation(createServiceman, {
      input: {
        id : currentUserInfo.attributes['email'] ,
        name : name,
        age : age,
        sex :sex,
        category : valueMS,
        phoneno : phoneNumber,
        callout_charge : callout
      }
    }));
    console.log('response: ',response);
    }
    catch(e){
      console.log(e);
    }
  }
  return (
    <ScrollView >
      <ImageUploader/>
     <TextInput
        style={{height: 40}}
        placeholder="name"
        onChangeText={newText => setName(newText)}
        //defaultValue={}
      />
       <TextInput
        style={{height: 40}}
        placeholder="age"
        onChangeText={newText => setAge(newText)}
        //defaultValue={}
      />
       <TextInput
        style={{height: 40}}
        placeholder="sex"
        onChangeText={newText => setSex(newText)}
        //defaultValue={}
      />
      <PhoneInput
        ref={phoneInput}
        defaultValue={phoneNumber}
        defaultCode="IN"
        layout="first"
        withShadow
        autoFocus
        containerStyle={StyleSheet.phoneNumberView}
        textContainerStyle={{ paddingVertical: 0 }}
        onChangeFormattedText={text => {
          setPhoneNumber(text);
        }}
      />
      <MultiselectDropdown
          label="Select your Job category"
          data={data}
          enableSearch
          enableAvatar
          chipType="outlined"
          value={valueMS}
          onChange={onChangeMS}
        />
        <TextInput
        style={{height: 40,padding:10}}
        placeholder="callout charge"
        onChangeText={newText => setCallout(newText)}
        //defaultValue={}
      />
      <AppButton title="Done" onPress={() => handleSubmit() } />

    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:'10%',
    alignItems: 'center',
    justifyContent:'center',
    marginTop: 20
  },
  icon:{
    paddingVertical:25
  },
  phoneNumberView: {
    width: '80%',
    height: 50,
    backgroundColor: 'white'
  },
});