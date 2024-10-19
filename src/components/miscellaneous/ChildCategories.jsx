
import React, { useEffect, useState } from 'react';
import { Text, View, Image, Pressable ,FlatList} from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { useNavigation } from '@react-navigation/native';

const ChildCategories = ({ data, heading, subheading }) => {
    

    const value = data?.list?.map(item => item?.child)
    const ParentName =data?.list?.map(item => item?.name)
    console.log("parent.name-----------------------",ParentName)
   


  return (
    <View style={{ padding: 10, height: 300 }}>
      <Text className="text-2xl font-extrabold text-slate-950">{heading}</Text>
      <Text className="text-xl">{subheading}</Text>
  {value && value.length > 0 ? (
   
    <FlatList
          data={value}
          keyExtractor={(item) => item.id}
          horizontal={true} 
          showsHorizontalScrollIndicator={false}
          renderItem={({ item,index }) => (
            <CardItem item={item} heading={heading} subheading={subheading} index={index} parent={ParentName}/>
          )}
        />
  ) : (
    <View style={{ alignItems: 'center', marginTop: 20 }}>
      <Text>No data available</Text>
    </View>
  )}
</View>

  );
};

export default ChildCategories;

const CardItem = ({item,index,parent}) => {
    const firstData = item?.at(0)
    // console.log(firstData,"item-----value ")

  const navigation = useNavigation()
  const handleClick = ()=>{
    let childdata = firstData.child.map(item=>item.name)
    // console.log("item.name------in ChildCategories",childdata,firstData?.name)
    // console.log("item.praent name --------in ChildCategories",parent[0],index)
    navigation.navigate('filterpage')
  }
  
  return (
    <View style={{ margin: 10, padding: 10 }} className="">
  {firstData && firstData?.icon ? (
    <View>
     <Pressable onPress={handleClick}>
     <Image
        source={{ uri: firstData?.icon }}
        style={{ width: 100, height: 100, borderRadius: 10 }}
        className="mt-2"
      />
     </Pressable>
    </View>
  ) : (
    <View>
      <Text>not have data</Text>
      <Image
        source={{ uri: 'https://via.placeholder.com/100' }}
        style={{ width: 100, height: 100, borderRadius: 10 }}
      />
    </View>
  )}
  <Text style={{ fontSize: 16.5, marginTop: 10 }}>{firstData?.name}</Text>
</View>

  );
};
