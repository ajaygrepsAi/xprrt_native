import React, { useState } from 'react'
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import LottieView from 'lottie-react-native'
import { HttpRequest } from '../../data/Httprequest'
import { API } from '../../constants/constant'
import { useNavigation } from '@react-navigation/native'
import { StoreAsyncData } from '../../utils/common'
import { useAuth } from './AuthContext'
const LoginPage = () => {

  const [number,setNumber] = useState()
  const navigatation = useNavigation()
  const { login } = useAuth();

  console.log(number,"number----")
  const handleLogin = async()=>{
    const response = await HttpRequest({
      url: API.LOGIN,
      method:"POST",
      params:{
        mobile:number,
        country_code:"91",
        type:"user"
      }
    })

    if(response){
      await StoreAsyncData("number",number)
      setTimeout(() => {
        navigatation.navigate("otp",{startTimer:true})
      }, 1000);
      console.log("otp send successfully")
    } else{
      console.log("not work")
    }
    
    
    
    
  }
  return (
    <View className="flex font-semibold">
        <Text className=" p-7 font-extrabold text-left text-neutral-950 mt-10 " style={{fontSize:30}}>Sign in to Continue </Text>
        <View style={{width:350,height:350 ,marginLeft:40}}>
        <LottieView source={require('../../assests/images/signup.json')} autoPlay loop  style={{width:350,height:350}}/>
        
        
        </View> 
        <Text className=" p-7 font-semibold text-left text-gray-600 mt-2" style={{fontSize:20}}>We Will send you One Time Password (OTP) in this Mobile Number </Text> 
        <View className="rounded-xl border-2" style={{width:"85%",marginLeft:25}}> 
        <TextInput  inputMode="numeric" maxLength={10}  placeholder='Enter Your Number' className="text-center text-lg" 
        onChangeText={(text)=>setNumber(text)}
        />
        </View>
        <TouchableOpacity className="rounded-xl border-2 mt-4 bg-blue-800" style={{width:"85%",marginLeft:25}} onPress={handleLogin}>
          <Text className="text-center text-2xl p-2 text-white font-semibold">Login</Text>
        </TouchableOpacity>
    </View>
  )
}

export default LoginPage