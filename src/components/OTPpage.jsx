import React, { useEffect, useState } from 'react'
import { View ,Text, TouchableOpacity} from 'react-native'
import { OtpInput } from "react-native-otp-entry";
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { HttpRequest } from '../../data/Httprequest';
import { API, DEVICE } from '../../constants/constant';
import { GetAsyncData, RemoveAsyncData, StoreAsyncData } from '../../utils/common';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './AuthContext'
const OTPpage = () => {

    const [otpValue,setOtpValue] = useState()
    const [getNumber,setGetNumber] = useState()
    console.log(otpValue,"otpValue-------")
    const {login} = useAuth()

    const navigation = useNavigation()


    const fetchUserData = async()=>{
      const response = await HttpRequest({
        url:API.PROFILE,
        method:"GET"
      })

      if(response){
        
        console.log("response value of api---profile--message--",response.message)
        await StoreAsyncData("user",response?.data)
        if(response?.data.categories && response?.data.categories.length > 0){
          navigation.navigate("home")
          console.log(" have any value data ")
        }else{
          navigation.navigate("onboardxprrt")
          console.log("not have any value ")
        }
        console.log( "response value of api---profile- response?.data---",response?.data)

      }else{
        console.log("not have any user profile dat value ")
      }
    }

    const handleVerify = async()=>{
      const response = await HttpRequest({
        url:API.VERIFY,
        method:"POST",
        params:{
          mobile: getNumber,
          otp: otpValue,
          device_id: "",
          device_type: DEVICE.WEB,
        }
      })

      if(response){
        console.log("response -----otp have value ",response.message)
        await StoreAsyncData("token",response?.data?.token)
        await login(response?.data?.token)
        fetchUserData()
        // navigation.navigate("personal")
      }else{
        console.log("response -not have error ----otp have value ",response.message)
      }
    }


    useEffect(()=>{
       const findNumberData = async()=>{
          const number = await GetAsyncData("number")
          if(number){
            console.log("number-----value ",number)
            setGetNumber(number)
          }else{
            console.log("not have any number-----value  ")
          }
       }

       findNumberData()
    },[])

  return (
    <View>
        <Text className=" p-5 font-extrabold mt-5 text-3xl">OTP Verification</Text>
        <Text className="mt-5 font-semibold text-neutral-500 text-lg p-2">Please enter the 4-digit code sent to your number for verifcation</Text>
        
        <View className="flex justify-center items-center " style={{width:300,height:300,marginLeft:40}} >
        <OtpInput numberOfDigits={4} onTextChange={(text) => setOtpValue(text)}/>
        </View>
        <TouchableOpacity style={{width:"85%",marginLeft:25}} className="bg-blue-700 border-2 rounded-2xl" onPress={handleVerify}>
            <Text className="p-2 text-2xl font-bold text-center text-white">Verify</Text>
        </TouchableOpacity>
    </View>
   
  )
}

export default OTPpage