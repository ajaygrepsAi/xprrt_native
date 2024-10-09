
import React from 'react';
import { Text, View, Image, Pressable ,FlatList} from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { useNavigation } from '@react-navigation/native';

const ParentCategories = ({ data, heading, subheading }) => {
  return (
    <View style={{ padding: 10, height: 300 }}>
      <Text className="text-2xl font-extrabold text-slate-950">{heading}</Text>
      <Text className="text-xl">{subheading}</Text>
  {Array.isArray(data?.list) && data.list.length > 0 ? (
   
    <FlatList
          data={data.list}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true} 
          showsHorizontalScrollIndicator={false}
          renderItem={({ item,index }) => (
            <CardItem item={item} heading={heading} subheading={subheading} index={index} />
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

export default ParentCategories;

const CardItem = ({item,index}) => {
  const navigation = useNavigation()
  const handleClick = ()=>{
    console.log(item.name,"item.name in carditem parent categories -----",index)
    navigation.navigate('filterpage')
  }
  
  return (
    <View style={{ margin: 10, padding: 10 }} className=" rounded-3xl">
  {item && item.icon ? (
    <View>
     <Pressable onPress={handleClick}>
     <Image
        source={{ uri: item.icon }}
        style={{ width: 100, height: 100, borderRadius: 10 }}
        className="mt-2"
      />
     </Pressable>
    </View>
  ) 
  :
   (
    <View>
      <Text>not have data</Text>
      <Image
        source={{ uri: 'https://via.placeholder.com/100' }}
        style={{ width: 100, height: 100, borderRadius: 10 }}
      />
    </View>
  )}

  <Text className="text-sm p-2 ">{item.name}</Text>
</View>

  );
};





