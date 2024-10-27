import { useNavigation, useRoute } from '@react-navigation/native'
import React,{useState} from 'react'
import { Dimensions, FlatList, ScrollView, Text, TextComponent, TouchableOpacity, View } from 'react-native'
import OnboardChildItem from '../OnboardChildItem'
import OnboardGrandChildItem from '../OnboardGrandChildItem'
import { HttpRequest } from '../../../data/Httprequest'
import { API } from '../../../constants/constant'
import { GetAsyncData } from '../../../utils/common'
import { useAuth } from '../AuthContext'

const OnboardGrandChildCategory = () => {
  const navigation = useNavigation()
    const [categoryValue,setCategoryValue] = useState([]);
    const {setIsAuthenticated} = useAuth()
    const route = useRoute()    
    const {item} = route.params 
    const {id} = route.params
    const {name} = route.params
    const {width,height} = Dimensions.get('window')
    console.log("item --- in Onbaord grand Child-category",item)
    console.log(name,"onboardgrandchild")
    console.log("id------",id)
    console.log("item --- in Onbaord grand Child-category categoryValue----",categoryValue)
    
  const handleSubmit = async ()=>{
    try {
      const response = await HttpRequest({
        method: "PUT",
        url: API.PROFILE_PROFESSIONAL,
        params: {
          categories:categoryValue,
          main_category:name
        },
      });
  
      if(response){
        console.log("response.data-----onboard grandchile updated---")
        const token = await GetAsyncData("token")
        console.log(token)
        setIsAuthenticated(true)
       setTimeout(() => {
        navigation.navigate('accounts')

       }, 500);
      }else{
        console.log("data ----not come ----in grand child categories---")
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  
  

  return (
    <ScrollView>
      <View style={{width:width}} className="bg-white">
        <View style={{ height:"100" }} className="p-2">
       {item?.child?.length ? (
        <FlatList
          data={item.child}
          keyExtractor={(item) => item.id.toString()}
          horizontal={false} 
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          renderItem={({ item }) => (
            <OnboardGrandChildItem item={item}    categoryValue={categoryValue}
            setCategoryValue={setCategoryValue}/>
          )}
        />
       ) : (
         <Text>No images to display</Text>
       )}
     </View >
     
     <TouchableOpacity className="bg-slate-950 p-2 rounded-2xl mt-4" style={{width:"90%",backgroundColor:"#6C63FF",marginLeft:10}}
     onPress={handleSubmit}
     >
            <Text className="text-center font-semibold text-lg text-white" >Save details</Text>
     </TouchableOpacity>
     
    </View>
    </ScrollView>
  )
}

export default OnboardGrandChildCategory