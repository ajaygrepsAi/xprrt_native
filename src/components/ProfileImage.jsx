import React, { useEffect, useState } from 'react'
import { View,Text, Image } from 'react-native'
import { GetAsyncData } from '../../utils/common'

const ProfileImage = () => {
    const [userData,setUserData] = useState()

    const fetchUserData = async()=>{
        const response = await GetAsyncData("user")
        if(response){
            setUserData(response)
        }
    }

    useEffect(()=>{
        fetchUserData()
    },[])

  return (
    <View>
        <View  style={{width:50,height:50}}>
        <Image source={{
          uri: `${userData?.profile_image ? userData?.profile_image : "https://images.pexels.com/photos/28319124/pexels-photo-28319124.png"}`,
        }} style={{width:"100%",height:"100%"}}  className="border-2 rounded-full"/>
        </View>
    </View>
  )
}

export default ProfileImage