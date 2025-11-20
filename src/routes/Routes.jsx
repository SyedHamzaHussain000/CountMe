import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { useSelector } from 'react-redux';


const Stack = createStackNavigator();
const Routes = () => {

  const token = useSelector(state => state.auth.token)



  return (
     <Stack.Navigator  screenOptions={{headerShown:false}}>
      {
        token ?
        <Stack.Screen name="MainNavigator" component={MainNavigator} />
        :

      <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
      }
    </Stack.Navigator>
  )
}

export default Routes