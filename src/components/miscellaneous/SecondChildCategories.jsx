
import React, { useEffect, useState } from 'react';
import { Text, View, Image, Pressable ,FlatList,Dimensions} from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { useNavigation } from '@react-navigation/native'; 

const SecondChildCategories = ({ data, heading, subheading }) => {
    

    const value = data?.list?.map(item => item?.child)
    const ParentName =data?.list?.map(item => item?.name)
    console.log("parent.name---------in secound child categories--------------",ParentName)
   


  return (
    <View style={{ padding: 10, height: 300 }}>
      <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#1E293B' }}>{heading}</Text>
      <Text style={{ fontSize: 16 }} className="mt-1">{subheading}</Text>
  {value && value.length > 0 ? (
   
    <FlatList
          data={value}
          keyExtractor={(item) => item.id}
          horizontal={true} 
          showsHorizontalScrollIndicator={false}
          renderItem={({ item ,index}) => (
            <CardItem item={item} heading={heading} subheading={subheading} parent={ParentName} index={index} />
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

export default SecondChildCategories;

const CardItem = ({item,index,parent}) => {
  const { width } = Dimensions.get('window'); 
    const firstData = item.at(1)
    // console.log(firstData,"item-----value ")

  const navigation = useNavigation()
  const handleClick = ()=>{

    //  let childdata = firstData.child.map(item=>item.name)
    // // console.log("item.name------in secondChildCategories",childdata,firstData.name)
    // // console.log("item.praent name --------in secondChildCategories",parent[1],index)
    // navigation.navigate('filterpage')
    let childdata = firstData?.child?.map((item) => ({ name: item.name, id: item.id }));
    let childName = childdata?.map(item=>item.name)
    let childID = childdata?.map(item=>item.id)
    navigation.navigate('filterpage',{searchName:childName,searchId:childID})
  }
  
  return (
    <View style={{ margin: 10}}>
  {firstData && firstData.icon ? (
    <View style={{
      width: width * 0.4, 
      height: width * 0.4, 
      borderTopLeftRadius: 12,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
    }}>
     <Pressable onPress={handleClick}>
     <Image
        source={{ uri: firstData.icon }}
        style={{ width: "100%", height: "100%", borderRadius: 10 }}
        className="mt-2"
      />
     </Pressable>
    </View>
  ) : (
    // <View>
    //   <Text>not have data</Text>
    //   <Image
    //     source={{ uri: 'https://via.placeholder.com/100' }}
    //     style={{ width: 100, height: 100, borderRadius: 10 }}
    //   />
    // </View>
    <></>
  )}
  <Text style={{ fontSize: 11.1, marginTop: 20 }} className="font-extrabold">{firstData?.name}</Text>
</View>

  );
};
