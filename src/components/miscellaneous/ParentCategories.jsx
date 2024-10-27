
import React from 'react';
import { Text, View, Image, Pressable, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const ParentCategories = ({ data, heading, subheading }) => {
  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#1E293B' }} className="">{heading}</Text>
      <Text style={{ fontSize: 16 }} className="mt-1">{subheading}</Text>
      {Array.isArray(data?.list) && data.list.length > 0 ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap',gap:23,marginTop:5 }}>
          {data.list.map((item, index) => (
            <CardItem item={item} key={index} index={index} />
          ))}
        </View>
      ) : (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text>No data available</Text>
        </View>
      )}
    </View>
  );
};

export default ParentCategories;

const CardItem = ({ item, index }) => {
  const navigation = useNavigation();

  const handleClick = () => {
    // console.log(item.name, "item.name in carditem parent categories -----", index);
    navigation.navigate('filterpage');
  };

  const itemWidth = (screenWidth - 40) / 4; 

  return (
    <Pressable
      onPress={handleClick}
      style={{
        width: itemWidth, 
        margin: 5,        
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 10,
      }}
    >
      {item && item.icon ? (
        <Image
          source={{ uri: item.icon }}
          style={{
            width: '100%',
            height: 78,
            borderTopLeftRadius: 9,
            borderTopRightRadius: 9,
          }}
          resizeMode="cover"
        />
      ) : (
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }}
          style={{ width: '100%', height: 78, borderRadius: 10 }}
        />
      )}
      <Text style={{ fontSize: 12, paddingTop: 8 }} className="font-semibold">{item.name}</Text>
    </Pressable>
  );
};



