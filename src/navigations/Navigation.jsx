import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import OtpScreen from '../screens/OtpScreen';
import PersonalScreen from '../screens/PersonalScreen';

import ServiceScreen from '../screens/ServiceScreen';
import CoverScreen from '../screens/CoverScreen';
import AccountScreen from '../screens/AccountScreen';
import OnboardScreen from '../screens/OnboardScreen';
import HomeScreen from '../screens/HomeScreen';
import ListingCategories from '../components/ListingCategories';
import FilterPageScreen from '../screens/FilterPageScreen';
import ContactScreen from '../screens/ContactScreen';
import ListingUserDetail from '../components/ListingUserDetail';
import BookingScreen from '../screens/BookingScreen';
import OnboardChildScreen from '../screens/OnboardChildScreen';
import OnboardGrandChildScreen from '../screens/OnboardGrandChildScreen';
import {GetAsyncData} from '../../utils/common';
import {useAuth} from '../components/AuthContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomNavigation from './BottomNavigation';
import ProfessionalScreen from '../screens/ProfessionalScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const MyStack = () => {
  const [showOnboarded, setShowOnboarded] = React.useState(null);
  const {isAuthenticated} = useAuth();
  console.log(isAuthenticated, 'isauthenticated----');

  React.useEffect(() => {
    checkIfAlreadyOnbarded();
  }, []);

  const checkIfAlreadyOnbarded = async () => {
    let onboarded = await GetAsyncData('onboarded');
    if (onboarded == 1) {
      setShowOnboarded(false);
    } else {
      setShowOnboarded(true);
    }
  };

  if (showOnboarded == null) {
    return null;
  }
 

 if(showOnboarded){
    return (
        <Stack.Navigator initialRouteName='xprrt'>
          <Stack.Screen
            name="xprrt"
            component={WelcomeScreen}
            options={{title: ' Expert Welcome'}}
          />
            <Stack.Screen name="onboard" component={OnboardingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="otp" component={OtpScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="personal" component={PersonalScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="service" component={ServiceScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="cover" component={CoverScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="accounts" component={AccountScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="onboardxprrt" component={OnboardScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="home" component={BottomNavigation} options={{ headerShown: false }}/>
          <Stack.Screen name="filterpage" component={FilterPageScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="contact" component={ContactScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="details" component={ListingUserDetail} options={{ headerShown: false }}/>
          <Stack.Screen name="booking" component={BookingScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="onboardchild" component={OnboardChildScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="onboardgrandchild" component={OnboardGrandChildScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
      // </NavigationContainer>
    );
  }else{
    return (
   
      <>
    {showOnboarded ? (
       <>
       
        <Stack.Navigator initialRouteName="xprrt">
        <Stack.Screen
          name="xprrt"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="onboard"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false  , gestureEnabled: false,}}/>
        <Stack.Screen name="otp" component={OtpScreen} options={{ headerShown: false , gestureEnabled: false,}}/>
        <Stack.Screen name="personal" component={PersonalScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="service" component={ServiceScreen} options={{ headerShown: false }} />
        <Stack.Screen name="cover" component={CoverScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="accounts" component={AccountScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="contact" component={ContactScreen} options={{ headerShown: false }}/>
        <Stack.Screen
          name="onboardxprrt"
          component={OnboardScreen}
          options={{ title: 'OnboardXprrt Screen' }}
        />
        <Stack.Screen name="home" component={BottomNavigation} options={{ headerShown: false }}/>
        <Stack.Screen name="filterpage" component={FilterPageScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="details" component={ListingUserDetail} options={{ headerShown: false }} />
        <Stack.Screen name="booking" component={BookingScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="onboardchild" component={OnboardChildScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="onboardgrandchild" component={OnboardGrandChildScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="professional" component={ProfessionalScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
       </>
     
    ) : isAuthenticated ? (
      <>
      {/* <Tab.Navigator>
       <Tab.Screen name="home" component={HomeScreen} />
       <Tab.Screen name="contact" component={ContactScreen} />
     </Tab.Navigator> */}
     
      <Stack.Navigator >
        
        
        <Stack.Screen name="home" component={BottomNavigation} options={{ headerShown: false }}/>
        
        <Stack.Screen name="filterpage" component={FilterPageScreen} options={{ headerShown: false  }}/>
        <Stack.Screen name="details" component={ListingUserDetail} options={{ headerShown: false }} />
        <Stack.Screen name="booking" component={BookingScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="contact" component={ContactScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="onboardchild" component={OnboardChildScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="onboardgrandchild" component={OnboardGrandChildScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="personal" component={PersonalScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="service" component={ServiceScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="cover" component={CoverScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="accounts" component={AccountScreen} options={{ headerShown: false }}/>
        {/* <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false , gestureEnabled: false,}}/>
        <Stack.Screen name="otp" component={OtpScreen} options={{ headerShown: false, gestureEnabled: false, }}/> */}
        <Stack.Screen
          name="onboardxprrt"
          component={OnboardScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen name="professional" component={ProfessionalScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    
      </>
    ) : (
      <Stack.Navigator>
        <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false , gestureEnabled: false,}}/>
        <Stack.Screen name="otp" component={OtpScreen} options={{ headerShown: false, gestureEnabled: false, }}/>
        <Stack.Screen name="home" component={BottomNavigation} options={{ headerShown: false }}/>      
        <Stack.Screen
          name="onboardxprrt"
          component={OnboardScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    )}
    </>
    );
  }
};



export default MyStack;
































  {/* </NavigationContainer> */}






















// if(showOnboarded){
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName='xprrt'>
//         <Stack.Screen
//           name="xprrt"
//           component={WelcomeScreen}
//           options={{title: ' Expert Welcome'}}
//         />
//         <Stack.Screen name="onboard" component={OnboardingScreen} options={{title: 'Onboard screen'}}/>
//         <Stack.Screen name="login" component={LoginScreen} options={{title: 'Login  screen'}}/>
//         <Stack.Screen name="otp" component={OtpScreen} options={{title: 'OTP  screen'}}/>
//         <Stack.Screen name="personal" component={PersonalScreen} options={{title: 'Personal screen'}}/>
//         <Stack.Screen name="service" component={ServiceScreen} options={{title: 'Service screen'}}/>
//         <Stack.Screen name="cover" component={CoverScreen} options={{title: 'Cover screen'}}/>
//         <Stack.Screen name="accounts" component={AccountScreen} options={{title: 'Account screen'}}/>
//         <Stack.Screen name="onboardxprrt" component={OnboardScreen} options={{title: 'OnboardXprrt screen'}}/>
//         <Stack.Screen name="home" component={HomeScreen} options={{title: 'Home screen'}}/>
//         <Stack.Screen name="filterpage" component={FilterPageScreen} options={{title: 'Filter Categories Screen'}}/>
//         <Stack.Screen name="contact" component={ContactScreen} options={{title: 'Contact Screen'}}/>
//         <Stack.Screen name="details" component={ListingUserDetail} options={{title: 'Listing detail Screen'}}/>
//         <Stack.Screen name="booking" component={BookingScreen} options={{title: 'Booking Screen'}}/>
//         <Stack.Screen name="onboardchild" component={OnboardChildScreen} options={{title: ' Onboard Child Screen'}}/>
//         <Stack.Screen name="onboardgrandchild" component={OnboardGrandChildScreen} options={{title: ' Onboard grand Child Screen'}}/>
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }else{
//   return (
//     <NavigationContainer >  
//       {
//         isAuthenticated  ? (
//           <>
//           <Stack.Navigator initialRouteName='home'>
//         <Stack.Screen
//           name="xprrt"
//           component={WelcomeScreen}
//           options={{title: ' Expert Welcome'}}
//         />
//         <Stack.Screen name="onboard" component={OnboardingScreen} options={{title: 'Onboard screen'}}/>
//         <Stack.Screen name="login" component={LoginScreen} options={{title: 'Login  screen'}}/>
//         <Stack.Screen name="otp" component={OtpScreen} options={{title: 'OTP  screen'}}/>
//         <Stack.Screen name="personal" component={PersonalScreen} options={{title: 'Personal screen'}}/>
//         <Stack.Screen name="service" component={ServiceScreen} options={{title: 'Service screen'}}/>
//         <Stack.Screen name="cover" component={CoverScreen} options={{title: 'Cover screen'}}/>
//         <Stack.Screen name="accounts" component={AccountScreen} options={{title: 'Account screen'}}/>
//         <Stack.Screen name="onboardxprrt" component={OnboardScreen} options={{title: 'OnboardXprrt screen'}}/>
//         <Stack.Screen name="home" component={HomeScreen} options={{title: 'Home screen'}}/>
//         <Stack.Screen name="filterpage" component={FilterPageScreen} options={{title: 'Filter Categories Screen'}}/>
//         <Stack.Screen name="contact" component={ContactScreen} options={{title: 'Contact Screen'}}/>
//         <Stack.Screen name="details" component={ListingUserDetail} options={{title: 'Listing detail Screen'}}/>
//         <Stack.Screen name="booking" component={BookingScreen} options={{title: 'Booking Screen'}}/>
//         <Stack.Screen name="onboardchild" component={OnboardChildScreen} options={{title: ' Onboard Child Screen'}}/>
//         <Stack.Screen name="onboardgrandchild" component={OnboardGrandChildScreen} options={{title: ' Onboard grand Child Screen'}}/>
//       </Stack.Navigator></>
//         ):(
//         <><Stack.Navigator initialRouteName='login'>
//         <Stack.Screen
//           name="xprrt"
//           component={WelcomeScreen}
//           options={{title: ' Expert Welcome'}}
//         />
//         <Stack.Screen name="onboard" component={OnboardingScreen} options={{title: 'Onboard screen'}}/>
//         <Stack.Screen name="login" component={LoginScreen} options={{title: 'Login  screen'}}/>
//         <Stack.Screen name="otp" component={OtpScreen} options={{title: 'OTP  screen'}}/>
//         <Stack.Screen name="personal" component={PersonalScreen} options={{title: 'Personal screen'}}/>
//         <Stack.Screen name="service" component={ServiceScreen} options={{title: 'Service screen'}}/>
//         <Stack.Screen name="cover" component={CoverScreen} options={{title: 'Cover screen'}}/>
//         <Stack.Screen name="accounts" component={AccountScreen} options={{title: 'Account screen'}}/>
//         <Stack.Screen name="onboardxprrt" component={OnboardScreen} options={{title: 'OnboardXprrt screen'}}/>
//         <Stack.Screen name="home" component={HomeScreen} options={{title: 'Home screen'}}/>
//         <Stack.Screen name="filterpage" component={FilterPageScreen} options={{title: 'Filter Categories Screen'}}/>
//         <Stack.Screen name="contact" component={ContactScreen} options={{title: 'Contact Screen'}}/>
//         <Stack.Screen name="details" component={ListingUserDetail} options={{title: 'Listing detail Screen'}}/>
//         <Stack.Screen name="booking" component={BookingScreen} options={{title: 'Booking Screen'}}/>
//         <Stack.Screen name="onboardchild" component={OnboardChildScreen} options={{title: ' Onboard Child Screen'}}/>
//         <Stack.Screen name="onboardgrandchild" component={OnboardGrandChildScreen} options={{title: ' Onboard grand Child Screen'}}/>
//       </Stack.Navigator></>
//         )
//       }
//     </NavigationContainer>
//   );






 //   <NavigationContainer >
    //     {
    //       isAuthenticated  ? (
    //         <>
    //           <Tab.Navigator>
    //   <Tab.Screen name="home" component={HomeScreen} />
    //   <Tab.Screen name="contact" component={ContactScreen} />
    // </Tab.Navigator>
    //         <Stack.Navigator initialRouteName='home'>
    //       <Stack.Screen
    //         name="xprrt"
    //         component={WelcomeScreen}
    //         options={{title: ' Expert Welcome'}}
    //       />
    //       <Stack.Screen name="onboard" component={OnboardingScreen} options={{title: 'Onboard screen'}}/>
    //       <Stack.Screen name="login" component={LoginScreen} options={{title: 'Login  screen'}}/>
    //       <Stack.Screen name="otp" component={OtpScreen} options={{title: 'OTP  screen'}}/>
    //       <Stack.Screen name="personal" component={PersonalScreen} options={{title: 'Personal screen'}}/>
    //       <Stack.Screen name="service" component={ServiceScreen} options={{title: 'Service screen'}}/>
    //       <Stack.Screen name="cover" component={CoverScreen} options={{title: 'Cover screen'}}/>
    //       <Stack.Screen name="accounts" component={AccountScreen} options={{title: 'Account screen'}}/>
    //       <Stack.Screen name="onboardxprrt" component={OnboardScreen} options={{title: 'OnboardXprrt screen'}}/>
    //       <Stack.Screen name="home" component={HomeScreen} options={{title: 'Home screen'}}/>
    //       <Stack.Screen name="filterpage" component={FilterPageScreen} options={{title: 'Filter Categories Screen'}}/>
    //       <Stack.Screen name="contact" component={ContactScreen} options={{title: 'Contact Screen'}}/>
    //       <Stack.Screen name="details" component={ListingUserDetail} options={{title: 'Listing detail Screen'}}/>
    //       <Stack.Screen name="booking" component={BookingScreen} options={{title: 'Booking Screen'}}/>
    //       <Stack.Screen name="onboardchild" component={OnboardChildScreen} options={{title: ' Onboard Child Screen'}}/>
    //       <Stack.Screen name="onboardgrandchild" component={OnboardGrandChildScreen} options={{title: ' Onboard grand Child Screen'}}/>
    //     </Stack.Navigator></>
    //       ):(
    //       <>
    //         <Tab.Navigator>
    //   <Tab.Screen name="home" component={HomeScreen} />
    //   <Tab.Screen name="contact" component={ContactScreen} />
    // </Tab.Navigator>
    //       <Stack.Navigator initialRouteName='home'
    //       >
    //       <Stack.Screen
    //         name="xprrt"
    //         component={WelcomeScreen}
    //         options={{title: ' Expert Welcome'}}
    //       />
    //       <Stack.Screen name="onboard" component={OnboardingScreen} options={{title: 'Onboard screen'}}/>
    //       <Stack.Screen name="login" component={LoginScreen} options={{title: 'Login  screen'}}/>
    //       <Stack.Screen name="otp" component={OtpScreen} options={{title: 'OTP  screen'}}/>
    //       <Stack.Screen name="personal" component={PersonalScreen} options={{title: 'Personal screen'}}/>
    //       <Stack.Screen name="service" component={ServiceScreen} options={{title: 'Service screen'}}/>
    //       <Stack.Screen name="cover" component={CoverScreen} options={{title: 'Cover screen'}}/>
    //       <Stack.Screen name="accounts" component={AccountScreen} options={{title: 'Account screen'}}/>
    //       <Stack.Screen name="onboardxprrt" component={OnboardScreen} options={{title: 'OnboardXprrt screen'}}/>
    //       <Stack.Screen name="home" component={HomeScreen} options={{title: 'Home screen'}}/>
    //       <Stack.Screen name="filterpage" component={FilterPageScreen} options={{title: 'Filter Categories Screen'}}/>
    //       <Stack.Screen name="contact" component={ContactScreen} options={{title: 'Contact Screen'}}/>
    //       <Stack.Screen name="details" component={ListingUserDetail} options={{title: 'Listing detail Screen'}}/>
    //       <Stack.Screen name="booking" component={BookingScreen} options={{title: 'Booking Screen'}}/>
    //       <Stack.Screen name="onboardchild" component={OnboardChildScreen} options={{title: ' Onboard Child Screen'}}/>
    //       <Stack.Screen name="onboardgrandchild" component={OnboardGrandChildScreen} options={{title: ' Onboard grand Child Screen'}}/>
    //     </Stack.Navigator></>
    //       )
    //     }
    //   </NavigationContainer>

    // <NavigationContainer>




























 