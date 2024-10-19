import React from 'react';
import {Image, Text, View} from 'react-native';
import UserReview from './UserReview';
import CategoriesShow from './CategoriesShow';

const UserDetail = ({item}) => {
  // console.log(item, 'item-------details------userDetails-----');
  return (
    <View className="bg-gray-50 mt-5 rounded-2xl">
      <View className="flex-row m-3">
        <Image
          source={{
            uri: item.profile_image
              ? item.profile_image
              : 'https://via.placeholder.com/100',
          }}
          style={{width: 70, height: 70}}
          className="rounded-full"
        />
        <View>
          <Text
            className="flex-1 p-1 text-xl font-extrabold"
            style={{marginLeft: 15}}>
            {item?.name}  
          </Text>

         
          <View className="flex-row">
            <Text className=" p-1 text-lg " style={{marginLeft: 15}}>
              {item?.city}
            </Text>
            <Text className=" p-1 text-lg">,{item?.state}</Text>
          </View>
        </View>
      </View>
      <View className="p-2">
      <CategoriesShow item={item}/>
      </View>
      <View >
        <UserReview item={item} />
      </View>
    </View>
  );
};

export default UserDetail;
