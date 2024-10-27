/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import LoginPage from './src/components/LoginPage';
import OnboardingPage from './src/components/OnboardingPage';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from './src/navigations/Navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './src/components/AuthContext';
import BottomNavigation from './src/navigations/BottomNavigation';
import ToastManager, { Toast } from 'toastify-react-native'

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
   <AuthProvider>
     <GestureHandlerRootView>
    <NavigationContainer>
    <MyStack/>
    <ToastManager/>
    {/* <BottomNavigation/> */}
    </NavigationContainer>
    
    </GestureHandlerRootView>
   </AuthProvider>
   
  );
}

export default App;
