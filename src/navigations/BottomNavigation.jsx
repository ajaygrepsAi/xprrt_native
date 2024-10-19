import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ContactScreen from '../screens/ContactScreen';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from './Navigation';
import AccountScreen from '../screens/AccountScreen';
import FilterPageScreen from '../screens/FilterPageScreen';
import LoginScreen from '../screens/LoginScreen';
import { OtpInput } from 'react-native-otp-entry';
import OtpScreen from '../screens/OtpScreen';

const Tab = createBottomTabNavigator();
const BottomNavigation = () => {
  return (
    
     <Tab.Navigator>
      <Tab.Screen name="home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="filter" component={FilterPageScreen} options={{ headerShown: false }} />
      <Tab.Screen name="accounts" component={AccountScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
   
  

  )
}

export default BottomNavigation





