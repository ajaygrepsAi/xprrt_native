import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import UserDetail from './UserDetail'
import CategoriesShow from './CategoriesShow'
import { useNavigation } from '@react-navigation/native'


const UserCard = ({item}) => {
    // console.log(item,"item----value in UserCard")
    const navigation = useNavigation()
    const handleclick = ()=>{
      console.log(item.registration_id,"registration_id--------item-----")
      navigation.navigate('details',{registration_id:item.registration_id})
    }
    const cover_image = item?.professional?.cover_images?.[0]
    const min_price = item?.professional?.service[0]?.min_price
    const exp = item?.professional?.total_experience
    console.log(exp,"exp")
  return (
    <View className="p-2 mt-2 ">
       <TouchableOpacity className=" rounded-2xl" onPress={handleclick} >
       <View className=" mt-2">
        <View style={{width:"100%",height:133.24}} className="">
       <Image source={{uri:cover_image ? cover_image:'https://via.placeholder.com/100'}} style={{width:"100%",height:"100%"}} className="border-2 rounded-2xl"
       resizeMode='cover'
       ></Image>
       <View className="flex-row justify-between items-center rounded-xl p-1  " style={{width:"100%",height:27,opacity:0.75,position:'absolute',top:106 ,backgroundColor:"#151414"}}>
        <Text className="text-white font-semibold" style={{fontSize:10}}>{exp} years experience</Text>
        <Text className="text-white font-semibold" style={{fontSize:10}}>${min_price}/Session</Text>
       </View>
        </View>
       <UserDetail item={item}/>
       </View>
       </TouchableOpacity>
       
    </View>
  )
}

export default UserCard