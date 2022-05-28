
import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Amplify, { Auth } from 'aws-amplify';
import AuthStack from './AuthStack';
import Loading from '../components/Loading';
import HomeStack from './HomeStack';
export default function Routes() {
  
        
    const [isUserLoggedIn, setUserLoggedIn] = useState('initializing');
    useEffect(() => {
     
          checkAuthState();
        }, []);
        async function checkAuthState() {
          try {
            await Auth.currentAuthenticatedUser();
            console.log(' User is signed in');
            setUserLoggedIn('loggedIn');
          } catch (err) {
            console.log(' User is not signed in');
            setUserLoggedIn('loggedOut');
          }
        }
        function updateAuthState(isUserLoggedIn) {
          setUserLoggedIn(isUserLoggedIn);
        }

        return (
          <NavigationContainer independent={true}>
            {isUserLoggedIn === 'initializing' && <Loading/>}
            {isUserLoggedIn === 'loggedIn' && (
              <HomeStack updateAuthState={updateAuthState} />
            )}
            {isUserLoggedIn === 'loggedOut' && (
              <AuthStack updateAuthState={updateAuthState} />
            )}
          </NavigationContainer>
        );

    }


    