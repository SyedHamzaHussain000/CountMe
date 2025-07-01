import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import IntroScreen from '../screens/auth/IntroScreen';
import ReadyToJoin from '../screens/auth/ReadyToJoin';
import Login from '../screens/auth/Login';

const Stack = createStackNavigator();
const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown:false}}>
      <Stack.Screen name="IntroScreen" component={IntroScreen} />
      <Stack.Screen name="ReadyToJoin" component={ReadyToJoin} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
