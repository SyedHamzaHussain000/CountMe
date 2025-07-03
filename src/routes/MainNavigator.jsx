import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IntroScreen from '../screens/auth/IntroScreen';
import Home from '../screens/main/Home';
import Maps from '../screens/main/Maps';
import Search from '../screens/main/Search';
import Profile from '../screens/main/Profile';
import Chats from '../screens/main/Chats';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import AppColors from '../utils/Other/AppColors';
import { responsiveWidth } from '../utils/Other/Responsive_Dimensions';

const Tab = createBottomTabNavigator();
const MainNavigator = () => {
  return (
     <Tab.Navigator initialRouteName='Home' 
     screenOptions={{headerShown:false,  }}
          tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Maps" component={Maps} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Chats" component={Chats} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient colors={[AppColors.PRIMARY, AppColors.SECONDARY]} start={{x: 0, y: 0}} end={{x: 1, y: 0}}  style={[styles.tabBar, { paddingBottom: insets.bottom }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabItem}
          >
            <Text style={{ color: isFocused ? AppColors.WHITE : AppColors.BLACK }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </LinearGradient>
  );
};



export default MainNavigator


const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
    width:responsiveWidth(90),
    borderRadius:10, 
    alignSelf:'center',
    marginBottom:20

  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
});

