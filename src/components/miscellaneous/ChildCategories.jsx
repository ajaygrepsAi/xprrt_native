
import React, { useEffect, useState } from 'react';
import { Text, View, Image, Pressable ,FlatList,Dimensions} from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { useNavigation } from '@react-navigation/native';

const ChildCategories = ({ data, heading, subheading }) => {
  const { width } = Dimensions.get('window'); 

    const value = data?.list?.map(item => item?.child)
    const ParentName =data?.list?.map(item => item?.name)
    console.log("parent.name-----------------------",ParentName)
   


  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#1E293B' }}>{heading}</Text>
      <Text style={{ fontSize: 16 }} className="mt-1">{subheading}</Text>
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
    const { width } = Dimensions.get('window')
  const navigation = useNavigation()
  const handleClick = ()=>{
    let childdata = firstData?.child?.map((item) => ({ name: item.name, id: item.id }));
    let childName = childdata?.map(item=>item.name)
    let childID = childdata?.map(item=>item.id)
    navigation.navigate('filterpage',{searchName:childName,searchId:childID})
  }
  
  return (
//     <View style={{ margin: 10, padding: 10 }} className="">
//   {firstData && firstData?.icon ? (
//     <View style={{
//       width: 133, // Width as per your requirement
//       height: 112.29, // Height as per your requirement
//       borderTopLeftRadius: 12, // Rounded top-left corner
//       borderTopRightRadius: 0, // No rounding for top-right corner
//       borderBottomRightRadius: 0, // No rounding for bottom-right corner
//       borderBottomLeftRadius: 0, // No rounding for bottom-left corner
     
//     }}>
//      <Pressable onPress={handleClick}>
//      <Image
//         source={{ uri: firstData?.icon }}
//         style={{ width: "100%", height:"100%", borderRadius: 10 }}
//         className="mt-2"
//       />
//      </Pressable>
//     </View>
//   ) : (
//     <View>
//       <Text>not have data</Text>
//       <Image
//         source={{ uri: 'https://via.placeholder.com/100' }}
//         style={{ width: 100, height: 100, borderRadius: 10 }}
//       />
//     </View>
//   )}
//   <Text style={{ fontSize: 16.5, marginTop: 10 }}>{firstData?.name}</Text>
// </View>

<View style={{ margin: 10, padding: 0 }}>
{firstData && firstData?.icon ? (
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
        source={{ uri: firstData?.icon }}
        style={{
          width: '100%', 
          height: '100%', 
          borderRadius: 10,
        }}
        className="mt-2"
      />
    </Pressable>
  </View>
) : (
  // <View>
  //   <Text>No data available</Text>
  //   <Image
  //     source={{ uri: 'https://via.placeholder.com/100' }}
  //     style={{
  //       width: width * 0.4,
  //       height: width * 0.3,
  //       borderRadius: 9,
  //     }}
  //   />
  // </View>
  <></>
)}
<Text style={{ fontSize: 11.1, marginTop: 20 }} className="font-extrabold">{firstData?.name}</Text>
</View>

  );
};

