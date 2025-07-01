import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IntroScreen from '../screens/auth/IntroScreen';

const Tab = createBottomTabNavigator();
const MainNavigator = () => {
  return (
     <Tab.Navigator>
      <Tab.Screen name="Home" component={IntroScreen} />
      <Tab.Screen name="Profile" component={IntroScreen} />
    </Tab.Navigator>
  )
}

export default MainNavigator