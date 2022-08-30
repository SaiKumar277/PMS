

import React ,{ useState, useEffect }from 'react';
import MC_NavStack from '../screens/ManagementCompany/MC_NavStack';
import SM_NavStack from '../screens/Serviceman/SM_NavStack';
import { NavigationContainer } from '@react-navigation/native';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
import Loading from '../components/Loading';
import { set } from 'react-native-reanimated';

Amplify.configure(awsconfig);
  export default function HomeStack({updateAuthState}) {
    const [Profile, setProfile] = useState('');
    const [load, setLoad] = useState(true);
      useEffect(() => {
       // console.log('111');
        getName();
    }, [load])
      async function getName(){
        try {
          //currentUserInfo.attributes['custom:Profile']
          const currentUserInfo = await Auth.currentAuthenticatedUser();
           setProfile( currentUserInfo.attributes["custom:Profile"]);
          //console.log('currentUserInfo ',currentUserInfo.attributes["custom:Profile"]);
          //console.log('Profile ',Profile);
          setLoad(false);
        } catch (err) {
          console.log('error fetching user info: ', err);
        }
      }
      if(load)return <Loading/>
      else{
    return (
      <NavigationContainer independent={true}>
        {Profile === 'Management Comapany' && (
              <MC_NavStack  updateAuthState={updateAuthState} />
        )}
        {Profile === 'Serviceman' && (
              <SM_NavStack updateAuthState={updateAuthState} />
        )}
      </NavigationContainer>
    );
        }
  }