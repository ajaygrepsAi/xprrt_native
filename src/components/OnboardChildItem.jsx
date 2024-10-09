import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text,View ,TouchableOpacity,Image } from 'react-native'

const OnboardChildItem = ({item,name}) => {
    const navigation = useNavigation()
    
    

    const handleChild = ()=>{
        console.log("onboardChild----data",item.id)
        
        navigation.navigate('onboardgrandchild',{item:item,id:item.id,name:name})
    }
  return (
    <View className="p-2">
       <TouchableOpacity onPress={handleChild}>
       <View  style={{width:180,height:180}}>
        <Image source={{uri:item?.icon ? item?.icon :"https://via.placeholder.com/100"}} width={"100%"} height={"100%"} className="border-2 rounded-2xl"/>
        </View>
        <View>
            <Text className="text-sm p-2 font-extrabold text-slate-950">{item.name}</Text>
        </View>
       </TouchableOpacity>
    </View>
  )
}

export default OnboardChildItem