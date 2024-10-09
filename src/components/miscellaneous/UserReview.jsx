import React from 'react'
import { Text, View } from 'react-native'
import Review from './Review';

const UserReview = ({item}) => {
    const value = item?.professional?.service[0].min_price
    const count = item?.professional?.total_ratings
    const average = item?.professional?.avg_ratings
    // console.log(item?.professional?.service[0].min_price, 'item-------details------userReview-----');
  return (
    <View>
        <View className="flex-row p-2">
        <Text className="text-lg text-slate-950 font-extrabold"> $ {value} </Text>
        <Text className="text-lg font-serif ">/ Session</Text>
        <Review count={count} average={average}/>

           
        </View>
        
    </View>
  )
}

export default UserReview