import React from 'react';
import SignIn from '../screens/Authentication/SignIn';
import SignUp from '../screens/Authentication/SignUp';
import ConfirmSignUp from '../screens/Authentication/ConfirmSignUp';
import ForgotPassword1 from '../screens/Authentication/ForgotPassword1';
import ForgotPassword2 from '../screens/Authentication/ForgotPassword2';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
export default function AuthStack(props) {
  return (
    <Stack.Navigator initialRouteName='SignIn' screenOptions={{headerShown:false}}>
     
      <Stack.Screen name="SignIn">
        {screenProps => (
          <SignIn {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </Stack.Screen>
      <Stack.Screen name='SignUp' component={SignUp}  />
      <Stack.Screen name="ConfirmSignUp">
        {screenProps => (
          <ConfirmSignUp {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </Stack.Screen>
      <Stack.Screen name='ForgotPassword1' component={ForgotPassword1}  />
      <Stack.Screen name="ForgotPassword2">
        {screenProps => (
          <ForgotPassword2 {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </Stack.Screen>

    </Stack.Navigator>
  );
}