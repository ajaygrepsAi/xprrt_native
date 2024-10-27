import React, { useEffect } from 'react'
import { Dimensions, Image, View } from 'react-native'

const XprrtLogoPage = () => {
    const {width,height} = Dimensions.get("window")

    
    // useEffect(()=>{
    //     setTimeout(()=>{
    //     },2000)
    // },[])
  return (
    <View style={{width:"100%",height:"100%"}} className = "flex justify-center bg-white ">
        <View className="flex justify-center  items-center">
        <Image source={{uri:"https://i.postimg.cc/NFxx1Ksj/xprrt-logo-black.png"}} style={{width:209,height:150}} className="rounded-3xl shadow-lg bg-white "/>
        </View>
    </View>
  )
}

export default XprrtLogoPage