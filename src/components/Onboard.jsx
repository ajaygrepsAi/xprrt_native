import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native'
import MasonryList from "react-native-masonry-list";
import { GetAsyncData } from '../../utils/common';
import OnboardItem from './OnboardItem';
const Onboard = () => {
  const [userData,setUserdata] = useState([])
  const {width,height} = Dimensions.get("window")

  const fetchData = async()=>{
    try {
      const data = await GetAsyncData("categories")
      if(data){
        setUserdata(data)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  // console.log(userData,"categoriesdata-----inOnboard")
  useEffect(()=>{
    fetchData()
  },[])

  return (
    <View style={{width:width}} className="bg-purple-100">
         <View>
     
     <View className="p-5 ">
       <Text className="text-2xl font-extrabold text-amber-950 mt-3">Elevate and empower your vision by harnessing the expertise of top talents.

</Text>
     </View>
    
     <View style={{ height:"80%" }} className="p-2">
       {userData?.list?.length ? (
        <FlatList
          data={userData.list}
          keyExtractor={(item) => item.id.toString()}
          horizontal={false} 
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          renderItem={({ item }) => (
            <OnboardItem item={item}/>
          )}
        />
       ) : (
         <Text>No images to display</Text>
       )}
     </View>
   </View>
    </View>
  )
}

export default Onboard