import React from 'react'
import OnboardGrandChildItem from '../components/OnboardGrandChildItem'
import OnboardGrandChildCategory from '../components/miscellaneous/OnboardGrandChildCategory'
import { Dimensions, ScrollView, View } from 'react-native'

const OnboardGrandChildScreen = () => {
  const {height,width} = Dimensions.get('window')
  return (
    <ScrollView>
      <View className="p-2 bg-white" style={{width:width,height:height}}>
     <OnboardGrandChildCategory/> 
    </View>
    </ScrollView>
 
  )
}

export default OnboardGrandChildScreen