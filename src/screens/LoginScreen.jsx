import React from 'react'
import LoginPage from '../components/LoginPage'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {
    const navigatation = useNavigation()

    
  return (
    <LoginPage/>
  )
}

export default LoginScreen