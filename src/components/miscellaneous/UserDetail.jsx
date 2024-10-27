import React from 'react';
import {Image, Text, View} from 'react-native';
import UserReview from './UserReview';
import CategoriesShow from './CategoriesShow';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faSolid,
  faBell,
  faBars,
  faPenToSquare,
  faThin,
  faCaretDown,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import Review from './Review';

const UserDetail = ({item}) => {
  // console.log(item, 'item-------details------userDetails-----');
  const value = item?.professional?.service[0]?.min_price;
  const count = item?.professional?.total_ratings;
  const average = item?.professional?.avg_ratings;
  return (
    <View
      className=" rounded-2xl p-1"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
      }}>
      <View className="flex-row m-3">
        <Image
          source={{
            uri: item.profile_image
              ? item.profile_image
              : 'https://via.placeholder.com/100',
          }}
          style={{width: 40, height: 40, marginTop: 7}}
          className="rounded-full"
        />
        <View>


          <View className="flex-row ">
            <View style={{width:"51%"}} className="">
              <Text
                className=" p-1 font-bold   "
                style={{marginLeft: 10, fontSize: 13}}>
                {item?.name}
              </Text>
            </View>
            <View className="mt-1">
              <Review count={count} average={average} size={16} />
            </View>
          </View>

          <View className="flex-row ">
            <FontAwesomeIcon
              icon={faLocationDot}
              size={12}
              style={{top: 5, left: 12}}
            />
            <Text className=" p-1 " style={{marginLeft: 10, fontSize: 10}}>
              {item?.city}
            </Text>
            <Text className=" p-1 " style={{fontSize: 10}}>
              ,{item?.state}
            </Text>
          </View>
        </View>
      </View>
      <View className="" style={{left: 13}}>
        <CategoriesShow item={item} />
      </View>
      {/* <View >
        <UserReview item={item} />
      </View> */}
    </View>
  );
};

export default UserDetail;
