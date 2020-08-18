import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard
} from './screens';

import UpdateUserInformation from './screens/UpdateUserInformation.js';
import CreateUpdateProfile from './screens/CreateUpdateProfile.js';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name = "Home"
          component={HomeScreen}
        />
        <Stack.Screen name = "LoginScreen" component = {LoginScreen}/>
        <Stack.Screen name = "RegisterScreen" component = {RegisterScreen}/>
        <Stack.Screen name = "ForgotPasswordScreen" component = {ForgotPasswordScreen}/>
        <Stack.Screen name = "Dashboard" component = {Dashboard}/>
        <Stack.Screen name = "UpdateUserInformation" component = {UpdateUserInformation}/>
        <Stack.Screen name = "CreateUpdateProfile" component = {CreateUpdateProfile}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;