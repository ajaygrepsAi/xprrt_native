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
 
         <View className="p-2 border-2 rounded-2xl mt-3" style={{backgroundColor:"#233E8A" }}> 
       <View className="flex-row mt-2">
          <View className=" flex-1 ">
             <Text className=" text-white font-semibold" style={{fontSize:16}}>SERVICES </Text>
             <View style={{width:33,top:6,left:10}} className="border border-white"></View>
          </View>
         <View >
            <Text className="text-white font-semibold" style={{fontSize:16}}>{item?.total_ratings} ({item?.avg_ratings})</Text>
         </View>
       </View>
       <View className="items-end top-3 left-2">
       <Review count={item?.total_ratings?item?.total_ratings:0} size={21}/>
       </View >

       {
        item?.service?.map(item => (
           <>
           <View className="flex-row justify-between mt-7 ">
              <Text className="" style={{fontSize:16,color:"#C3C3C3"}}>{item.title}</Text>
              <View className="flex-row">
              <Text className="text-white" style={{fontSize:16}}>${item.min_price} - </Text>
              <Text className="text-white">${item.max_price}  </Text>
              </View>
              
           </View>
           <View style={{width:"100%",color:"#757C8F"}} className="border mt-2" ></View>
           </>
        ))
       }
       <TouchableOpacity className=" border-2 flex justify-center  mt-10 rounded-2xl bg-white" style={{height:55}} onPress={handleBook}>
        <Text className=" text-center font-extrabold " style={{fontSize:16,color:"#3930D3"}}>Contact Me</Text>
       </TouchableOpacity>
    </View>
   
  )
}

export default ServiceDetails