import React from 'react'
import { ScrollView, Text,TouchableHighlight,TouchableOpacity,View } from 'react-native'
import Review from './Review'
import { useNavigation } from '@react-navigation/native'

const ServiceDetails = ({item,id,data}) => {
    const navigation = useNavigation()
    const handleBook = ()=>{
        console.log(id,"id------value in service----details-----")
        navigation.navigate('booking',{id:id,data:data,item:item})
    }

  return (
 
         <View className="p-2 border-2 rounded-2xl mt-3"> 
       <View className="flex-row mt-2">
          <View className=" flex-1 ">
             <Text className="text-2xl font-semibold">serviceDetails </Text>
          </View>
         <View >
            <Text className="text-xl font-semibold">{item?.total_ratings} ({item?.avg_ratings})</Text>
         </View>
       </View>
       <View className="items-end mt-2">
       <Review count={item?.total_ratings?item?.total_ratings:0} average={item?.avg_ratings?item?.avg_ratings:0}/>
       </View>
       {
        item?.service?.map(item => (
           <>
           <View className="flex-row justify-between mt-2">
              <Text className=" text-lg">{item.title}</Text>
              <View className="flex-row">
              <Text className="text-lg">${item.min_price} - </Text>
              <Text className="text-lg">${item.max_price}  </Text>
              </View>
           </View>
           </>
        ))
       }
       <TouchableOpacity className=" border-2 p-2 mt-4 rounded-2xl bg-blue-950" onPress={handleBook}>
        <Text className="text-xl text-center text-white font-extrabold">Contact Me</Text>
       </TouchableOpacity>
    </View>
   
  )
}

export default ServiceDetails