import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import IntroScreen from '../screens/auth/IntroScreen';
import ReadyToJoin from '../screens/auth/ReadyToJoin';
import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/SignUp';
import UploadPicture from '../screens/auth/UploadPicture';
import AddSports from '../screens/auth/sports/AddSports';
import AddSportsSkills from '../screens/auth/sports/AddSportsSkills';

const Stack = createStackNavigator();
const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='AddSports' screenOptions={{headerShown:false}}>
      <Stack.Screen name="IntroScreen" component={IntroScreen} />
      <Stack.Screen name="ReadyToJoin" component={ReadyToJoin} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="UploadPicture" component={UploadPicture} />
      <Stack.Screen name="AddSports" component={AddSports} />
      <Stack.Screen name="AddSportsSkills" component={AddSportsSkills} />

      

      
    </Stack.Navigator>
  );
};

export default AuthNavigator;
