import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../Screens/Login';
import Register from '../../Screens/Register';
import { NavigationContainer } from '@react-navigation/native';
import CheckEmail from '../../Screens/checkEmail';
const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Validate'>
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Validate" component={CheckEmail} />
      {/* <Stack.Screen name="Login" component={Login} /> */}
      {/* <Stack.Screen name="ResetPassowrd" component={Login} /> */}
     
    </Stack.Navigator>
    </NavigationContainer>
  );
}