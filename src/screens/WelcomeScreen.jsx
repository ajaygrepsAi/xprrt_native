import React, { useEffect } from 'react'
import { View } from 'react-native'
import XprrtLogoPage from '../components/XprrtLogoPage'
import { useNavigation } from '@react-navigation/native'

const WelcomeScreen = () => {
   const navigation = useNavigation()

   useEffect(()=>{
    setTimeout(() => {
      navigation.navigate("onboard")
    }, 1000);
   },[])
  return (
      <XprrtLogoPage/>
  )
}

export default WelcomeScreen