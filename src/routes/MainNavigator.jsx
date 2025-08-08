import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
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
import {
  responsiveHeight,
  responsiveWidth,
} from '../utils/Other/Responsive_Dimensions';
import { SvgXml } from 'react-native-svg';
import Appsvgicon from '../assets/icons/Appsvgicon';
import Conversation from '../screens/main/Stack/Conversation';
import { createStackNavigator } from '@react-navigation/stack';
import UploadPicture from '../screens/auth/UploadPicture';
import AddSports from '../screens/auth/sports/AddSports';
import AddSportsSkills from '../screens/auth/sports/AddSportsSkills';
import ProfileCreated from '../screens/auth/ProfileCreated';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="AddSports"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="TabBars" component={TabBars} />
      <Stack.Screen name="Conversation" component={Conversation} />
      <Stack.Screen name="UploadPicture" component={UploadPicture} />
      <Stack.Screen name="AddSports" component={AddSports} />
      <Stack.Screen name="AddSportsSkills" component={AddSportsSkills} />
      <Stack.Screen name="ProfileCreated" component={ProfileCreated} />
    </Stack.Navigator>
  );
};

const TabBars = () => {
  return (
    <Tab.Navigator
      initialRouteName="UploadPicture"
      screenOptions={{ headerShown: false }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Maps" component={Maps} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Chats" component={Chats} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  // Icon mapping for each tab
  const getTabIcon = (routeName, isFocused) => {
    console.log('routeName', routeName);
    switch (routeName) {
      case 'Home':
        return isFocused ? Appsvgicon.HomeW : Appsvgicon.HomeB;
      case 'Chats':
        return isFocused ? Appsvgicon.ChatW : Appsvgicon.ChatB;
      case 'Maps':
        return isFocused ? Appsvgicon.MapW : Appsvgicon.MapB;
      case 'Search':
        return isFocused ? Appsvgicon.SearchW : Appsvgicon.SearchB;
      case 'Profile':
        return isFocused ? Appsvgicon.ProfileW : Appsvgicon.ProfileB;
      default:
        return Appsvgicon.HomeB;
    }
  };

  return (
    <LinearGradient
      colors={[AppColors.PRIMARY, AppColors.SECONDARY]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.tabBar, { paddingBottom: insets.bottom }]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;

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
            <SvgXml xml={getTabIcon(route.name, isFocused)} />
            <Text
              style={{ color: isFocused ? AppColors.WHITE : AppColors.BLACK }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </LinearGradient>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: responsiveHeight(8),
    justifyContent: 'space-around',
    alignItems: 'center',
    width: responsiveWidth(90),
    borderRadius: 10,
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 1,
    bottom: 20,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
});
