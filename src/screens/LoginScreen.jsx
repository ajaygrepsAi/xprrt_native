import React from 'react'
import LoginPage from '../components/LoginPage'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native'

const LoginScreen = () => {
    const navigatation = useNavigation()

    
  return (
    <ScrollView>

      <LoginPage/>
      
    </ScrollView>
  )
}

export default LoginScreen