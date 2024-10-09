import React, { useEffect } from 'react'
import { Dimensions, Image, View } from 'react-native'

const XprrtLogoPage = () => {
    const {width,height} = Dimensions.get("window")

    
    // useEffect(()=>{
    //     setTimeout(()=>{
    //     },2000)
    // },[])
  return (
    <View style={{width:"100%",height:"100%"}} className = "flex justify-center ">
        <View className="flex justify-center  items-center">
        <Image source={require('../../assests/images/check.jpg') } style={{width:"60%",height:"60%"}} className="rounded-3xl"/>
        </View>
    </View>
  )
}

export default XprrtLogoPage