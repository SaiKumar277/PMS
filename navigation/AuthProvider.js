import React, { createContext, useState, useEffect } from 'react';
import Amplify, { Auth } from 'aws-amplify';

export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        SignIn: async (email, password, {updateAuthState}) => {
          try {
            await Auth.signIn(email, password);
            updateAuthState('loggedIn');
            console.log(' signed in ');
          } catch (e) {
            console.log(' Error signing in...', e);
          }
        },
        SignUp: async (name,email, password, Plan,{navigation}) => {
            try {
                if(Plan!=''){
                  await Auth.signUp({ 
                    username:email,
                    email, 
                    password, 
                    attributes: { 
                      name:name,
                      email:email,
                      'custom:Profile':Plan
                     } 
                    }).then(navigation.navigate('ConfirmSignUp'))
                    
                  console.log(' Sign-up Confirmed');
                }
               // else alert('Select a Profile');
              } catch (error) {
                console.log(' Error signing up...', error);
              }
          },
        ConfirmSignUp: async(email, authCode, {updateAuthState})=>{
            try {
                await Auth.confirmSignUp(email, authCode);
                updateAuthState('loggedIn');
                console.log(' Code confirmed');
              } catch (error) {
                console.log(
                  ' Verification code does not match. Please enter a valid verification code.',
                  error
                );
              }
        },
        Logout : async ({updateAuthState}) =>{
          try {
            await Auth.signOut();
            updateAuthState('loggedOut');
            console.log('signed out:');
          } 
          catch (error) {
            console.log('Error signing out: ', error);
          }
        },
        forgotPassword  : async (username,{navigation}) =>{
          try {
            await Auth.forgotPassword(username)
            .then(navigation.navigate('ForgotPassword2'));
            console.log('Confirmation code sent ');
          } 
          catch (error) {
            console.log('Error ForgotPW : ', error);
          }
        },

        forgotPasswordSubmit: async (username,code,new_password,{updateAuthState}) =>{
          try {
            await Auth.forgotPasswordSubmit(username, code, new_password)
            console.log('Confirmation code confirmed ');
            updateAuthState('loggedIn');
            
          } 
          catch (error) {
            console.log('Error forgotPasswordSubmit : ', error);
          }
        }

        
      
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};