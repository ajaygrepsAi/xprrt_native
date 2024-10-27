import React from 'react'
import { Text, View } from 'react-native'

const CategoriesShow = ({item}) => {
    const value = item.categories.map(item => item.name)
    // console.log(item.categories.map(item => item.name),"categories name")
  return (
  //  <View>
  //   <Text className="rounded-lg">{value.slice(0,5)}</Text>
  //  </View>
  <View className="flex-row flex-wrap gap-1">
      {item?.categories?.slice(0, 5).map((category, index) => (
        <View 
          key={index} 
          className="px-3 py-1 rounded-xl   bg-blue-200"
          style={{ marginBottom: 4, marginRight: 4 }}
        >
          <Text style={{fontSize:9}} className="font-bold">{category.name}</Text>
        </View>
      ))}
    </View>
  )
}

export default CategoriesShow