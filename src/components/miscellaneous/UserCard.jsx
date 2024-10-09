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
  return (
    <View className="p-2 mt-5 ">
      <View>
        
      </View>
       <TouchableOpacity className=" rounded-2xl" onPress={handleclick} >
       <View className="p-2 mt-2">
       <Image source={{uri:cover_image ? cover_image:'https://via.placeholder.com/100'}} style={{width:"100%",height:450}} className="border-2 rounded-2xl"></Image>
       <UserDetail item={item}/>
       </View>
       </TouchableOpacity>
    </View>
  )
}

export default UserCard