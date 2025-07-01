import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import IntroScreen from '../screens/auth/IntroScreen';

const Stack = createStackNavigator();
const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='IntroScreen' screenOptions={{headerShown:false}}>
      <Stack.Screen name="IntroScreen" component={IntroScreen} />
      <Stack.Screen name="GetStarted" component={IntroScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
