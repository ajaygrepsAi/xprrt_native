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
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSolid,faBell ,faBars,faPenToSquare,faHouse ,faSharp ,faGrid2,faTableCells,faList} from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();
const BottomNavigation = () => {
  return (
    
     <Tab.Navigator
     screenOptions={{
      tabBarShowLabel: false, 
      tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        left: 20,
        right: 20,
        elevation: 0,
        backgroundColor: '#ffffff', 
        borderRadius: 60, 
        height: 60, 
        shadowColor: '#000', 
        shadowOpacity: 0.1, 
        shadowOffset: { width: 0, height: 10 }, 
        shadowRadius: 10
      },
    }}
     >
      <Tab.Screen name="home" component={HomeScreen} options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faHouse} color={color} size={size} />
          ),
          
        }}  />
      <Tab.Screen name="filter" component={FilterPageScreen} options={{ headerShown: false , tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faList} color={color} size={size} />
          ) }} />
      <Tab.Screen name="accounts" component={AccountScreen} options={{ headerShown: false ,tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faUser} color={color} size={size} />
          )}} />
    </Tab.Navigator>
  )
}

export default BottomNavigation





