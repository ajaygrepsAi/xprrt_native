import React from 'react'
import { Text, View } from 'react-native'

const CategoriesShow = ({item}) => {
    const value = item.categories.map(item => item.name)
    // console.log(item.categories.map(item => item.name),"categories name")
  return (
   <View>
    <Text className="text-lg border-2 rounded-3xl  text-center p-1 font-bold text-white bg-sky-950">{value.slice(0,1)}</Text>
   </View>
  )
}

export default CategoriesShow