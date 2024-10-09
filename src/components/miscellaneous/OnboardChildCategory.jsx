import { useRoute } from '@react-navigation/native'
import React from 'react'
import { Dimensions, FlatList, Text, TextComponent, View } from 'react-native'
import OnboardChildItem from '../OnboardChildItem'

const OnboardChildCategory = () => {
    const route = useRoute()
    const {item} = route.params
    const {id} = route.params
    const {name} = route.params
    const {width,height} = Dimensions.get('window')
    // console.log("item --- in Onbaord Child-category name",name)
    // console.log("id------",id)

      //  console.log(item.child.map(item => item.name),"item----in child")
    // console.log(ChildData,"childdata")

  return (
    <View>
        <View style={{ width:width }} className="p-2 bg-purple-100">
       {item?.child?.length ? (
        <FlatList
          data={item.child}
          keyExtractor={(item) => item.id.toString()}
          horizontal={false} 
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          renderItem={({ item }) => (
            <OnboardChildItem item={item} name={name}/>
          )}
        />
       ) : (
         <Text>No images to display</Text>
       )}
     </View>
    </View>
  )
}

export default OnboardChildCategory