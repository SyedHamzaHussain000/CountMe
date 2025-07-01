import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';


const Stack = createStackNavigator();
const Routes = () => {
  return (
     <Stack.Navigator initialRouteName='AuthNavigator' screenOptions={{headerShown:false}}>
      <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
      <Stack.Screen name="MainNavigator" component={MainNavigator} />
    </Stack.Navigator>
  )
}

export default Routes