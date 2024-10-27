import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  ImageBackground
} from 'react-native';
import {HttpRequest} from '../../data/Httprequest';
import {API} from '../../constants/constant';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import ServiceDetails from './miscellaneous/ServiceDetails';
import dayjs from 'dayjs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import ReviewListing from './miscellaneous/ReviewListing';

import {
  faSolid,
  faBell,
  faBars,
  faPenToSquare,
  faThin,
  faCaretDown,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';

const ListingUserDetail = () => {
  const route = useRoute();
  const [UserData, setUserData] = useState([]);
  const [professionalData, setProfessionalData] = useState([]);
  const {registration_id} = route.params;
  const cover_image = professionalData?.cover_images?.[0];
  const [availability, setAvailability] = useState([]);
  const {width, height} = Dimensions.get('window');

  console.log(
    professionalData.cover_images,
    'userdata-----value in listing-users---details-----    ',
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await HttpRequest({
          url: API.USERS + '/' + registration_id,
          params: {},
          method: 'GET',
        });

        if (response?.data) {
          setUserData(response.data);
          setProfessionalData(response?.data?.professional);
          setAvailability(response?.data?.professional?.availability);
        } else {
          console.log('not have any data in users----');
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUserData();
  }, []);
  

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}
      style={{width: width, height: height}}>
      <View className=" p-2 bg-white">
        <View className="" style={{width: '100%', height: 353}}>
          <Image
            source={{
              uri: cover_image
                ? cover_image
                : 'https://via.placeholder.com/100',
            }}
            alt="image"
            width={'100%'}
            height={'100%'}
            className="rounded-2xl border-2"
          />
          <View className="absolute top-52">
            <View className="flex-row p-2 ">
             <View className="  " style={{width:"65%"}} >
             <Text
                style={{fontSize: 28}}
                className=" text-white z-40 font-extrabold">
                {UserData?.name}
              </Text>
             </View>
              <View className="flex-row mt-2 ">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  size={18}
                  style={{left: 0, top: 2,color:"white"}}
                />
                <Text style={{fontSize: 15, left: 0}} className=" text-white z-40 font-semibold ">
                  {' '}
                  {UserData?.city},{UserData?.state}
                </Text>
              </View>
            </View>
            <View className="flex-row flex-wrap mt-2 p-1">
          {Array.isArray(UserData.categories) &&
          UserData.categories.length > 0 ? (
            UserData.categories.slice(0,10).map((item, index) => (
              <Text
                key={index}
                className=" text-slate-950 bg-white rounded-lg p-1 mt-2 font-extrabold "
                style={{marginLeft: 2,fontSize:10}}>
                {item.name}
              </Text>
            ))
          ) : (
            <Text></Text>
          )}
        </View>
          </View>

        </View>





        {/* <View className="flex-row mt-3">
        <View className="flex-1">
          <Text className="text-xl font-extrabold">{UserData?.name}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-sm font-extrabold">
            {UserData?.city},{UserData?.state}
          </Text>
        </View>
      </View> */}
        
        <View>
          <Text className=" mt-2" style={{fontSize:18,color:"#363C45"}}>
            About {UserData?.name ? UserData?.name : 'Author'}
          </Text>
          <View style={{width:33,left:15,top:5}} className="border"></View>
          <Text className="mt-3 font-semibold" style={{fontSize:15,top:6,marginLeft:8}}>{professionalData?.bio}</Text>
        </View>
        <View className="p-1">
          <Text className=" mt-4 " style={{fontSize:18,color:"#363C45"}}>Skill</Text>
          <View style={{width:33,top:5}} className="border"></View>
          {professionalData?.skill?.map((item,index) => (
            <View key={index} className=" flex-row justify-between mt-4" style={{ backgroundColor: index % 2 === 0 ? "#F0F0F0" : "#FFFFFF"}}>
               <Text className=" p-3 " style={{fontSize:15,color:"#787878"}}>
                {item?.name}
              </Text>
              <Text className=" p-3 " style={{fontSize:15}}>
                {item?.level}
              </Text>
            </View>
          ))}
        </View>
        <ServiceDetails
          item={professionalData}
          id={registration_id}
          data={UserData}
        />

        <View className="mt-5 p-1">
          <Text className=" mt-2" style={{fontSize:18,color:"#363C45"}}>Language</Text>
          <View style={{width:33,top:5}} className="border"></View>
          {professionalData?.language?.map((item,index) => (
            <View key={index} className="flex-row justify-between mt-4" style={{ backgroundColor: index % 2 === 0 ? "#F0F0F0" : "#FFFFFF"}}>
              <Text className="  p-3 " style={{fontSize:15,color:"#787878"}}>
                {item.name}
              </Text>
              <Text className=" p-3 " style={{fontSize:15}}>
                {item.level}
              </Text>
            </View>
          ))}
        </View>
        {/* availaibilty component comes here ------*/}
        {renderSectionAvailability(availability)}
        <View className="mt-5 p-1">
          <Text className=" mt-2" style={{fontSize:18,color:"#363C45"}}>Education</Text>
          <View style={{width:33,top:5}} className="border"></View>
          {professionalData?.education?.map((item,index) => (
            <View key={index} className="flex-row justify-between mt-4" style={{ backgroundColor: index % 2 === 0 ? "#F0F0F0" : "#FFFFFF"}}>
                <Text className="  p-3 " style={{fontSize:15,color:"#787878"}}>
                  {item?.degree} - {item?.subjects}
                </Text>
              <Text className=" p-3 " style={{fontSize:15}}>
                {item?.university} - {item?.passing_year}
              </Text>
            </View>
          ))}
        </View>
        <View className="mt-2 p-1">
          <Text className=" mt-2" style={{fontSize:18,color:"#363C45"}}>
            Work & Experience
          </Text>
          <View style={{width:33,top:5}} className="border"></View>
          <View style={{fontSize:18,color:"#363C45"}}></View>
          {professionalData?.experience?.map((item,index )=> (
            <>
              <View key={index} className="flex-row justify-between mt-4" style={{ backgroundColor: index % 2 === 0 ? "#F0F0F0" : "#FFFFFF"}}>
                <Text className="  p-3 " style={{fontSize:15,color:"#787878"}}>
                  {item?.job_title}
                </Text>
                <Text className=" p-3 " style={{fontSize:15}}>
                {item?.company_name} - {item?.location}
                </Text>
              </View>
              {/* <View className="flex-row justify-between ">
                <Text className="flex-1 bg-slate-300 p-3 mt-2 text-sm">
                  {item?.company_name}
                </Text>
                <Text className="bg-slate-300 p-3 mt-2 text-sm">
                  {item &&
                    item?.startdate &&
                    dayjs(item?.startdate).format('DD-MM-YYYY')}{' '}
                  -{' '}
                  {item &&
                    item?.enddate &&
                    dayjs(item?.enddate).format('DD-MM-YYYY')}
                </Text>
              </View> */}
            </>
          ))}
        </View>
        {/* <View className="mt-5">
        <Text className=" mt-2" style={{fontSize:18,color:"#363C45"}}>Portfolio</Text>
        <View style={{width:33,top:5}} className="border"></View>
         <View className="flex-row flex-wrap justify-between mt-3">
         {
          professionalData?.portfolio?.map((item,index)=>(
            <>
            <View  className="rounded-lg p-2 bg-gray-100">
              <Image width={184} height={170} source={{uri:item?.image ? item?.image :"https://res.cloudinary.com/dy7rtmcg7/image/upload/f_auto,q_auto,w_400/v1729751590/profile/other_image/images-28/1729751589161.png"}}/>
              <View className="absolute " style={{ top:120,left:30, opacity:0.75 ,backgroundColor:"#151414",width:"100%"}}>
                <Text className="text-white">{item?.portfolio_title}</Text>
                <Text className="text-white">{item?.description}</Text>
              </View>
            </View>
             
            </>
          ))
         }
         </View>
        </View> */}

<View style={{ marginTop: 20 }} className="p-1">
      <Text style={{ fontSize: 18, color: "#363C45", marginBottom: 5 }}>Portfolio</Text>
      <View style={{ width: 33, height: 2, backgroundColor: "#363C45", marginBottom: 15 }} />
      
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
        {professionalData?.portfolio?.map((item, index) => (
          <View
            key={index}
            style={{
              width: width * 0.45, 
              marginBottom: 15,
              borderRadius: 10,
              backgroundColor: "#F3F4F6",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Image
              source={{
                uri: item?.image || "https://res.cloudinary.com/dy7rtmcg7/image/upload/f_auto,q_auto,w_400/v1729751590/profile/other_image/images-28/1729751589161.png",
              }}
              style={{
                width: "100%",
                height: 170,
                borderRadius: 10,
              }}
            />
            <View
              style={{
                position: "absolute",
                bottom: 0,
                backgroundColor: "rgba(21, 20, 20, 0.75)",
                width: "100%",
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}
            >
              <Text style={{ color: "#FFFFFF", fontSize: 11 }}>{item?.portfolio_title?item?.portfolio_title:"Portfolio"}</Text>
              <Text style={{ color: "#FFFFFF", fontSize: 11 }}>{item?.description ? item?.description:"Discription"}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>


        <View className="p-1">
          <ReviewListing data={UserData} id={registration_id} />
        </View>
      </View>
    </ScrollView>
  );
};

export default ListingUserDetail;

const renderSectionAvailability = availability => {
  console.log(availability, 'availiavbility in render section availibilty');

  const convertTo12HourFormat = time => {
    const [hours, minutes] = time.split(':');
    let period = 'AM';
    let hour = parseInt(hours);

    if (hour >= 12) {
      period = 'PM';
      if (hour > 12) hour -= 12;
    }
    if (hour === 0) hour = 12; 

    return `${hour}:${minutes} ${period}`;
  };

  if (!availability || Object.keys(availability).length === 0) {
    return <Text>No Availability</Text>;
  }

  return (
    <View
      style={styles.listingSectionWrap}
      className="  mt-6 rounded-2xl" >
      <Text style={{fontSize:16,color:"#363C45"}} className="font-semibold">Availability</Text>
      <View style={styles.borderBottom} />
      <View>
        <View style={styles.gridContainer}>
          {Object.entries(availability).map(([day, details], index) => (
            <View key={day} style={styles.gridRow}>
              <Text style={styles.dayText}>
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </Text>
              <View>
                {details.isOpen ? (
                  <View>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-green-950 text-lg font-bold"
                      style={{color:"green"}}
                    />
                  </View>
                ) : (
                  <View>
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="text-red-950 text-lg font-bold"
                      style={{color:"red"}}
                    />
                  </View>
                )}
              </View>
              <Text>
                {details.isOpen
                  ? Array.isArray(details.timings)
                    ? details.timings
                        .map(timing => convertTo12HourFormat(timing))
                        .join(' - ')
                    : 'Invalid timings'
                  : 'Unavailable'}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.borderBottom} />
    </View>
  );
};

const styles = StyleSheet.create({
  listingSectionWrap: {
    padding: 16,
    backgroundColor:"#F0F0F0"
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  borderBottom: {
    height: 2,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  gridContainer: {
    flexDirection: 'column',
    gap: 16,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dayText: {
    fontSize: 16,
    fontWeight: '600',
  },
  iconOpen: {
    color: 'green',
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconClosed: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
