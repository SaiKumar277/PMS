import React, {useState} from 'react';
import {StyleSheet,Button, SafeAreaView, ScrollView,PermissionsAndroid} from 'react-native';

import t from 'tcomb-form-native';
import {Auth, API, graphqlOperation} from 'aws-amplify';

import ImageUploader from './ImageUploader';
import  {launchImageLibrary}from "react-native-image-picker"
import {Storage} from 'aws-amplify';

const Form = t.form.Form;
const User = t.struct({
  name: t.String,
  price: t.Number,
  description: t.String,
});
const AddProperty = ({navigation}) => {
  const [form, setForm] = useState(null);
  const [initialValues, setInitialValues] = useState({});
  const [photo, setPhoto] = useState(null);

  function takePhoto() {
    cameraPermission();

    ImagePicker.launchCamera({
        mediaType: 'photo',
        maxHeight: 600,
        maxWidth: 800
    }, res => {
      console.log(res);
    });
}

  const handleChoosePhoto = async () => {
    const product = await form.getValue();
    setInitialValues({
      name: product.name,
      price: product.price,
      description: product.description,
    });
    await launchImageLibrary({}, (response) => {
      // console.log('data:',response.assets[0]);
      if (response.assets[0].uri) {
        console.log('Photo Extension: \n');
        // console.log(response);
        setPhoto(response.assets[0]);
      }
    });
  };

  const options = {
    auto: 'placeholders',
    fields: {
      description: {
        multiLine: true,
        stylesheet: {
          ...Form.stylesheet,
          textbox: {
            ...Form.stylesheet.textbox,
            normal: {
              ...Form.stylesheet.textbox.normal,
              height: 100,
              textAlignVertical: 'top',
            },
          },
        },
      },
    },
  };
  const handleSubmit = async () => {
    try {
      const value = await form.getValue();
      const user = await Auth.currentAuthenticatedUser();

      if (photo) {
        const photoResponse = await fetch(photo.uri);

        const blob = await photoResponse.blob();

        await Storage.put(photo.fileName, blob, {
          contentType: 'image/jpeg',
        });
      }
     

      
      console.log('Response: \n');
      // console.log(response);
     // navigation.navigate('Home');
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <>
      <SafeAreaView style={styles.addProductView}>
        <ScrollView>
          <Form
            ref={(c) => setForm(c)}
            value={initialValues}
            type={User}
            options={options}
          />
          <ImageUploader photo={photo} handleChoosePhoto={handleChoosePhoto} />
          <Button title="Save" onPress={handleSubmit} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  addProductView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 15,
    height: 'auto',
  },
});
export default AddProperty;