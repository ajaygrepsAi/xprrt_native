import React from 'react'
import { Image, Text, View } from 'react-native'
const XprrtLogo = () => {
  return (
    <View>
        <View  style={{width:50,height:50}}>
        <Image source={require('../../assests/images/askExpert.jpeg')} style={{width:"100%",height:"100%"}}  className="border-2 rounded-full"/>
        </View>
        {/* <Image source={require('../../assests/images/askExpert.jpeg')} style={{width:20,height:20}} alt='xrrt logo '/> */}
    </View>
  )
}

export default XprrtLogo