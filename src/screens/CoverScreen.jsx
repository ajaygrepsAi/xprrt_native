import React from 'react'
import CoverImage from '../components/CoverImage'
import { Dimensions, View } from 'react-native'

const CoverScreen = () => {
  const {height} = Dimensions.get("window")
  return (
    // <View className="bg-purple-100">
      <CoverImage/>
    // </View>
  )
}

export default CoverScreen