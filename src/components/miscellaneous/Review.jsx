import React, { useState } from 'react'
import { View,Text } from 'react-native'
import StarRating from 'react-native-star-rating-widget';
const Review = ({count,average}) => {
    // console.log(count,"count dta ")
    const [rating, setRating] = useState(0);
  return (
    <View className="flex-row">
        <StarRating
        rating={count}
        onChange={setRating}
        starSize={25}
      />
     {
      average ? (
        <Text className="text-lg">({average})</Text>
      ):""
     }
    </View>
  )
}

export default Review