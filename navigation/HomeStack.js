

import React ,{ useState, useEffect }from 'react';
import MC_NavStack from '../screens/ManagementCompany/MC_NavStack';
import SM_NavStack from '../screens/Serviceman/SM_NavStack';
import { NavigationContainer } from '@react-navigation/native';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../src/aws-exports';

Amplify.configure(awsconfig);
  export default function HomeStack({updateAuthState}) {
    const [Profile, setProfile] = useState('');
      useEffect(() => {
        getName();
    }, [])
      async function getName(){
        try {
          const currentUserInfo = await Auth.currentUserInfo()
          setProfile( currentUserInfo.attributes['custom:Profile']);
        } catch (err) {
          console.log('error fetching user info: ', err);
        }
      }
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