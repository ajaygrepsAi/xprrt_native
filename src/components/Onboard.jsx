import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native'
import MasonryList from "react-native-masonry-list";
import { GetAsyncData } from '../../utils/common';
import OnboardItem from './OnboardItem';
import { HttpRequest } from '../../data/Httprequest';
import { API } from '../../constants/constant';
import { useNavigation } from '@react-navigation/native';
const Onboard = () => {
  const [userData,setUserdata] = useState([])
  const {width,height} = Dimensions.get("window")
  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      // Prevent back navigation
      if (e.data.action.type === 'GO_BACK' || e.data.action.type === 'POP') {
        e.preventDefault();
        // Alert.alert(
        //   'Are you sure you want to leave this page?',
        //   'You will lose any unsaved changes.',
        //   [
        //     { text: 'Cancel', style: 'cancel', onPress: () => {} },
        //     { 
        //       text: 'Leave', 
        //       style: 'destructive', 
        //       onPress: () => navigation.dispatch(e.data.action) 
        //     },
        //   ]
        // );
      }
    });
  
    return unsubscribe; 
  }, [navigation]);



  // console.log(userData,"categoriesdata-----inOnboard")
  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const data = await GetAsyncData("categories")
        // const data = await HttpRequest({
        //   url:API.CATEGORY,
        //   method:"GET",
        // })
        console.log("data----",data)
        if(data && data.list){
          setUserdata(data)
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchData()
    console.log(userData,"userdata---------")
  },[])

  return (
    <View style={{width:width}} className="bg-white">
         <View>
     
     <View className="mt-2">
       <Text className=" font-extrabold text-amber-950 mt-3 p-2 text-center" style={{fontSize:19}}>Elevate and empower your vision by harnessing the expertise of top talents.

</Text>
     </View>
    
     <View style={{ height:"100%" }} className="p-2">
       {userData?.list?.length ? (
        <FlatList
          data={userData?.list}
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