import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';


const Stack = createStackNavigator();
const Routes = () => {


  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function handleAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;



  return (
     <Stack.Navigator initialRouteName='AuthNavigator' screenOptions={{headerShown:false}}>
      {
        user ?
        <Stack.Screen name="MainNavigator" component={MainNavigator} />
        :

      <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
      }
    </Stack.Navigator>
  )
}

export default Routes