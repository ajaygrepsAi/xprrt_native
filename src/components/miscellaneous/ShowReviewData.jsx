import React, { useEffect,useState } from 'react';
import {Text, View, Image} from 'react-native';
import Review from './Review';
import { GetAsyncData } from '../../../utils/common';

const ShowReviewData = ({data, id, getdata}) => {
  console.log(data, 'data valie in show review data    ');
  const [userData,setUserData] = useState([])

  useEffect(()=>{
    const getfetch=async()=>{
        let userValue =  await GetAsyncData("user")
        if(userValue){
            setUserData(userValue)
        }
      }
      getfetch()
  },[])

  return (
    <View className="p-2 ">
      {getdata.map(item => (
        <>
          <View key={item.id} className="flex-row justify-between mt-6 ">
            <View className="flex-row ">
              <Image
                source={{
                  uri: item?.user?.profile_image
                    ? item?.user?.profile_image
                    : 'https://via.placeholder.com/100',
                }}
                alt=""
                style={{width: 50, height: 50}}
                className="border-2  rounded-full"
              />
              <View>
                <Text
                  className="text-xl font-semibold "
                  style={{marginLeft: 10}}>
                  {item?.user?.name}
                </Text>
                <Text
                  className="text-sm font-semibold "
                  style={{marginLeft: 10}}>
                  {item?.user?.city} , {item?.user?.state}
                </Text>
              </View>
            </View>
           <View>
           <Review count={item.rating} average={0}/>
           {
            item?.user?.registration_id == userData.registration_id ?(
                <Text className="" style={{marginLeft:10}}>put</Text>
            ):""
           }
           </View>
          </View>
          <View className="mt-3">
            <Text className="text-lg ">{item.review}</Text>
          </View>
        </>
      ))}
    </View>
  );
};

export default ShowReviewData;
