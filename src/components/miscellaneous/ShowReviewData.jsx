import React, { useEffect,useState } from 'react';
import {Text, View, Image} from 'react-native';
import Review from './Review';
import { GetAsyncData } from '../../../utils/common';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {
  faSolid,
  faBell,
  faBars,
  faPenToSquare,
  faThin,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';
const ShowReviewData = ({data, id, getdata}) => {
  // console.log(data, 'data valie in show review data    ');
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
                  className=""
                  // style={{fontSize:14 ,left:20}}
                  style={{marginLeft: 10,fontSize:14,color:"#000000"}}>
                  {item?.user?.name}
                </Text>
                <Text
                  className=" "
                  style={{marginLeft: 10,fontSize:14}}>
                  {item?.user?.city} , {item?.user?.state}
                </Text>
              </View>
            </View>
           <View className="flex-row">

           {
            item?.user?.registration_id == userData.registration_id ?(
                // <Text className="" 
                // // style={{marginLeft:10}}
                // >
                  <FontAwesomeIcon icon={faPenToSquare} size={10} style={{marginTop:5}}/>
                // </Text>
            ):""
           }

           <Review count={item.rating} average={0} size={19}/>
          
           </View>
          </View>
          <View className="">
            <Text className=" " style={{fontSize:14 ,left:20}}>{item.review}</Text>
          </View>
        </>
      ))}
    </View>
  );
};

export default ShowReviewData;
