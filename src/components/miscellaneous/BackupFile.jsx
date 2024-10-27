// import * as React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import WelcomeScreen from '../screens/WelcomeScreen';
// import OnboardingScreen from '../screens/OnboardingScreen';
// import LoginScreen from '../screens/LoginScreen';
// import OtpScreen from '../screens/OtpScreen';
// import PersonalScreen from '../screens/PersonalScreen';
// import ServiceScreen from '../screens/ServiceScreen';
// import CoverScreen from '../screens/CoverScreen';
// import AccountScreen from '../screens/AccountScreen';
// import OnboardScreen from '../screens/OnboardScreen';
// import HomeScreen from '../screens/HomeScreen';
// import ListingCategories from '../components/ListingCategories';
// import FilterPageScreen from '../screens/FilterPageScreen';
// import ContactScreen from '../screens/ContactScreen';
// import ListingUserDetail from '../components/ListingUserDetail';
// import BookingScreen from '../screens/BookingScreen';
// import OnboardChildScreen from '../screens/OnboardChildScreen';
// import OnboardGrandChildScreen from '../screens/OnboardGrandChildScreen';
// import {GetAsyncData} from '../../utils/common';
// import {useAuth} from '../components/AuthContext';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import BottomNavigation from './BottomNavigation';
// import ProfessionalScreen from '../screens/ProfessionalScreen';

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();
// const MyStack = () => {
//   const [showOnboarded, setShowOnboarded] = React.useState(null);
//   const {isAuthenticated} = useAuth();
//   console.log(isAuthenticated, 'isauthenticated----');

//   React.useEffect(() => {
//     checkIfAlreadyOnbarded();
//   }, []);

//   const checkIfAlreadyOnbarded = async () => {
//     let onboarded = await GetAsyncData('onboarded');
//     if (onboarded == 1) {
//       setShowOnboarded(false);
//     } else {
//       setShowOnboarded(true);
//     }
//   };

//   if (showOnboarded == null) {
//     return null;
//   }

//  if(showOnboarded){
//     return (
//         <Stack.Navigator initialRouteName='xprrt'>
//           <Stack.Screen
//             name="xprrt"
//             component={WelcomeScreen}
//             options={{title: ' Expert Welcome'}}
//           />
//             <Stack.Screen name="onboard" component={OnboardingScreen} options={{ headerShown: false }} />
//             <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }}/>
//             <Stack.Screen name="otp" component={OtpScreen} options={{ headerShown: false }}/>
//           <Stack.Screen name="personal" component={PersonalScreen} options={{ headerShown: false }}/>
//           <Stack.Screen name="service" component={ServiceScreen} options={{ headerShown: false }}/>
//           <Stack.Screen name="cover" component={CoverScreen} options={{ headerShown: false }}/>
//           <Stack.Screen name="accounts" component={AccountScreen} options={{ headerShown: false }}/>
//           <Stack.Screen name="onboardxprrt" component={OnboardScreen} options={{ headerShown: false }}/>
//           <Stack.Screen name="home" component={BottomNavigation} options={{ headerShown: false }}/>
//           <Stack.Screen name="filterpage" component={FilterPageScreen} options={{ headerShown: false }}/>
//           <Stack.Screen name="contact" component={ContactScreen} options={{ headerShown: false }}/>
//           <Stack.Screen name="details" component={ListingUserDetail} options={{ headerShown: false }}/>
//           <Stack.Screen name="booking" component={BookingScreen} options={{ headerShown: false }}/>
//           <Stack.Screen name="onboardchild" component={OnboardChildScreen} options={{ headerShown: false }}/>
//           <Stack.Screen name="onboardgrandchild" component={OnboardGrandChildScreen} options={{ headerShown: false }}/>
//         </Stack.Navigator>
      
//     );
//   }else{
//     return (
   
//       <>
//     {showOnboarded ? (
//        <>
//         <Stack.Navigator initialRouteName="xprrt">
//         <Stack.Screen
//           name="xprrt"
//           component={WelcomeScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="onboard"
//           component={OnboardingScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false  , gestureEnabled: false, headerLeft: () => null}}/>
//         <Stack.Screen name="otp" component={OtpScreen} options={{ headerShown: false , gestureEnabled: false,  headerLeft: () => null}}/>
//         <Stack.Screen name="personal" component={PersonalScreen} options={{ headerShown: false }}/>
//         <Stack.Screen name="service" component={ServiceScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="cover" component={CoverScreen} options={{ headerShown: false }}/>
//         <Stack.Screen name="accounts" component={AccountScreen} options={{ headerShown: false }}/>
//         <Stack.Screen name="contact" component={ContactScreen} options={{ headerShown: false }}/>
//         <Stack.Screen
//           name="onboardxprrt"
//           component={OnboardScreen}
//           options={{ title: 'OnboardXprrt Screen' }}
//         />
//         <Stack.Screen name="home" component={BottomNavigation} options={{ headerShown: false }}/>
//         <Stack.Screen name="filterpage" component={FilterPageScreen} options={{ headerShown: false }}/>
//         <Stack.Screen name="details" component={ListingUserDetail} options={{ headerShown: false }} />
//         <Stack.Screen name="booking" component={BookingScreen} options={{ headerShown: false }}/>
//         <Stack.Screen name="onboardchild" component={OnboardChildScreen} options={{ headerShown: false }}/>
//         <Stack.Screen name="onboardgrandchild" component={OnboardGrandChildScreen} options={{ headerShown: false }}/>
//         <Stack.Screen name="professional" component={ProfessionalScreen} options={{ headerShown: false }}/>
//       </Stack.Navigator>
//        </>
//     ) : isAuthenticated ? (
//       <>
//       <Stack.Navigator >
//         <Stack.Screen name="home" component={BottomNavigation} options={{ headerShown: false }}/>
//         <Stack.Screen name="filterpage" component={FilterPageScreen} options={{ headerShown: false  }}/>
//         <Stack.Screen name="details" component={ListingUserDetail} options={{ headerShown: false }} />
//         <Stack.Screen name="booking" component={BookingScreen} options={{ headerShown: false }}/>
//         <Stack.Screen name="contact" component={ContactScreen} options={{ headerShown: false }}/>
//         <Stack.Screen name="onboardchild" component={OnboardChildScreen} options={{ headerShown: false }}/>
//         <Stack.Screen name="onboardgrandchild" component={OnboardGrandChildScreen} options={{ headerShown: false }}/>
//         <Stack.Screen name="personal" component={PersonalScreen} options={{ headerShown: false }}/>
//         <Stack.Screen name="service" component={ServiceScreen} options={{ headerShown: false }}/>
//         <Stack.Screen name="cover" component={CoverScreen} options={{ headerShown: false }}/>
//         <Stack.Screen name="accounts" component={AccountScreen} options={{ headerShown: false }}/>
//         <Stack.Screen
//           name="onboardxprrt"
//           component={OnboardScreen}
//           options={{ headerShown: false }}
//         />
//          <Stack.Screen name="professional" component={ProfessionalScreen} options={{ headerShown: false }}/>
//       </Stack.Navigator>
    
//       </>
//     ) : (
//       <Stack.Navigator>
//         <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false , gestureEnabled: false, headerLeft: () => null}}/>
//         <Stack.Screen name="otp" component={OtpScreen} options={{ headerShown: false, gestureEnabled: false,  headerLeft: () => null}}/>
//         <Stack.Screen name="home" component={BottomNavigation} options={{ headerShown: false }}/>      
//         <Stack.Screen
//           name="onboardxprrt"
//           component={OnboardScreen}
//           options={{ headerShown: false }}
//         />
//       </Stack.Navigator>
//     )}
//     </>
//     );
//   }
// };
// export default MyStack;

///////////////////////parent categories-------first like services provide 


// import React from 'react';
// import { Text, View, Image, Pressable ,FlatList} from 'react-native';
// import MasonryList from '@react-native-seoul/masonry-list';
// import { useNavigation } from '@react-navigation/native';

// const ParentCategories = ({ data, heading, subheading }) => {
//   return (
//     <View style={{ padding: 10, height: 300 }}>
//       <Text className="text-2xl font-extrabold text-slate-950">{heading}</Text>
//       <Text className="text-xl">{subheading}</Text>
//   {Array.isArray(data?.list) && data.list.length > 0 ? (
   
//     <FlatList
//           data={data.list}
//           keyExtractor={(item) => item.id.toString()}
//           horizontal={false} 
//           showsHorizontalScrollIndicator={false}
//           renderItem={({ item,index }) => (
//             <CardItem item={item} heading={heading} subheading={subheading} index={index} />
//           )}
//         />
//   ) : (
//     <View style={{ alignItems: 'center', marginTop: 20 }}>
//       <Text>No data available</Text>
//     </View>
//   )}
// </View>

//   );
// };

// export default ParentCategories;

// const CardItem = ({item,index}) => {
//   const navigation = useNavigation()
//   const handleClick = ()=>{
//     console.log(item.name,"item.name in carditem parent categories -----",index)
//     navigation.navigate('filterpage')
//   }
  
//   return (
//     <View style={{ margin: 10, padding: 10 }} className=" rounded-3xl">
//   {item && item.icon ? (
//     <View   style={{
//       width: 110,
//       height: 78,
//       borderRadius: 9, 
//       borderTopLeftRadius: 9,   // To apply 9px radius to the top-left corner
//       borderTopRightRadius: 0,  // Keep other corners without rounding
//       borderBottomRightRadius: 0,
//       borderBottomLeftRadius: 0,
//       // opacity: 0,               // Set opacity to 0 as per your requirement
//     }}>
//      <Pressable onPress={handleClick}>
//      <Image
//         source={{ uri: item.icon }}
//         style={{ width: 110, height: 78, borderRadius: 9 }}
//         className="mt-2"
//       />
//      </Pressable>
//     </View>
//   ) 
//   :
//    (
//     <View>
//       <Text>not have data</Text>
//       <Image
//         source={{ uri: 'https://via.placeholder.com/100' }}
//         style={{ width: 110, height: 78, borderRadius: 9 }}
//       />
//     </View>
//   )}

//   <Text className="text-sm p-2 ">{item.name}</Text>
// </View>

//   );
// };



// onborditem---------------------------------------------

// import { useNavigation } from '@react-navigation/native'
// import React from 'react'
// import { Dimensions, Image, Text ,TouchableOpacity,View} from 'react-native'

// const OnboardItem = ({item}) => {
//     const navigation = useNavigation()
//     const {width,height} = Dimensions.get('window')

//     const handleChild = ()=>{
//         console.log("onboardChild----data",item.name)
        
//         navigation.navigate('onboardchild',{item:item,id:item.id ,name:item.name})
//     }

//   return (
//     <View className="p-2"  >
//        <TouchableOpacity onPress={handleChild}>
//        <View  style={{width:180,height:180}}>
//         <Image source={{uri:item?.icon ? item?.icon :"https://via.placeholder.com/100"}} width={"100%"} height={"100%"} className="border-2 rounded-2xl"/>
//         </View>
//         <View>
//             <Text className="text-sm p-2 font-extrabold text-slate-950">{item.name}</Text>
//         </View>
//        </TouchableOpacity>
//     </View>
//   )
// }

// export default OnboardItem  --------------OnboardChildItem



///onboardChildCategroy

// import { useNavigation } from '@react-navigation/native'
// import React from 'react'
// import { Text,View ,TouchableOpacity,Image } from 'react-native'

// const OnboardChildItem = ({item,name}) => {
//     const navigation = useNavigation()
    
    

//     const handleChild = ()=>{
//         console.log("onboardChild----data",item.id)
        
//         navigation.navigate('onboardgrandchild',{item:item,id:item.id,name:name})
//     }
//   return (
//     <View className="p-2">
//        <TouchableOpacity onPress={handleChild}>
//        <View  style={{width:180,height:180}}>
//         <Image source={{uri:item?.icon ? item?.icon :"https://via.placeholder.com/100"}} width={"100%"} height={"100%"} className="border-2 rounded-2xl"/>
//         </View>
//         <View>
//             <Text className="text-sm p-2 font-extrabold text-slate-950">{item.name}</Text>
//         </View>
//        </TouchableOpacity>
//     </View>
//   )
// }

// export default OnboardChildItem


///////////////////////////////////////gradchilditem-----/////////////////////////----//////////-----categr0ies------


// import React, { useState } from 'react'
// import { Text,View ,TouchableOpacity,Image, Dimensions } from 'react-native'
// import LinearGradient from 'react-native-linear-gradient'
// const OnboardGrandChildItem = ({item ,categoryValue, setCategoryValue}) => {
//     const [isSelected, setIsSelected] = useState(false);
//    const {width,height} = Dimensions.get('window')
   
   
//     const handleClick = () => {

//         setIsSelected(prev => {
//           const newIsSelected = !prev;
//           if (newIsSelected) {
//             setCategoryValue(prevValue => [...prevValue, item.id]); 
//           } else {
//             setCategoryValue(prevValue => prevValue.filter(id => id !== item.id)); 
//           }
    
//           return newIsSelected;
//         });
//       };
    



//     console.log(categoryValue,"categoryvalue")


//   return (
 
//     <View className="p-2 bg-purple-100">
//     <TouchableOpacity onPress={handleClick}>
//       <View style={{ width: 180, height: 180, position: 'relative' }}>
//         <Image 
//           source={{ uri: item?.icon ? item?.icon : "https://via.placeholder.com/100" }} 
//           style={{ width: '100%', height: '100%', borderRadius: 20 }}
//         />
//         {isSelected && (
//           <LinearGradient
//             colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.3)']}
//             style={{
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               justifyContent: 'center',
//               alignItems: 'center',
//               borderRadius: 20,
//             }}
//           >
//             <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Selected</Text>
//           </LinearGradient>
//         )}
//       </View>
//       <View>
//         <Text className="text-sm  font-extrabold text-slate-950">{item.name}</Text>
//       </View>
//     </TouchableOpacity>
//   </View>
//   )
// }

// export default OnboardGrandChildItem



