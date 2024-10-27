import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
const XprrtLogo = () => {

  const navigation = useNavigation()
  const handleHome = ()=>{
    navigation.navigate("home")
    console.log("nagigate succesffuly")
  }
  return (
    <View>
        <TouchableOpacity onPress={handleHome}>
        <View  style={{width:50,height:50}}>
        <Image source={{uri:"https://i.postimg.cc/NFxx1Ksj/xprrt-logo-black.png"}} style={{width:"100%",height:"100%"}}  className="border-2 rounded-full"/>
        </View>
        </TouchableOpacity>
        {/* <Image source={require('../../assests/images/askExpert.jpeg')} style={{width:20,height:20}} alt='xrrt logo '/> */}
    </View>
  )
}

export default XprrtLogo