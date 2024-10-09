import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, Text, View,ScrollView, StyleSheet, Dimensions} from 'react-native';
import {HttpRequest} from '../../data/Httprequest';
import {API} from '../../constants/constant';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import ServiceDetails from './miscellaneous/ServiceDetails';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ReviewListing from './miscellaneous/ReviewListing';

const ListingUserDetail = () => {
  const route = useRoute();
  const [UserData, setUserData] = useState([]);
  const [professionalData, setProfessionalData] = useState([]);
  const {registration_id} = route.params;
  const cover_image = professionalData?.cover_images?.[0];
  const [availability,setAvailability] = useState([])
  const {width,height} = Dimensions.get('window')

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
          setAvailability(response?.data?.professional?.availability)
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
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} style={{width:width,height:height}}>
      <View className="border-2 p-2" >
      <View className="" style={{width: '100%', height: 200}}>
        <Image
          source={{
            uri: cover_image ? cover_image : 'https://via.placeholder.com/100',
          }}
          alt="image"
          width={'100%'}
          height={'100%'}
          className="rounded-2xl border-2"
        />
      </View>
      <View className="flex-row mt-3">
        <View className="flex-1">
          <Text className="text-xl font-extrabold">{UserData.name}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-sm font-extrabold">
            {UserData.city},{UserData.state}
          </Text>
        </View>
      </View>
      <View className="flex-row flex-wrap mt-2">
        {Array.isArray(UserData.categories) &&
        UserData.categories.length > 0 ? (
          UserData.categories.map((item, index) => (
            <Text
              key={index}
              className=" border rounded-lg p-1 "
              style={{marginLeft: 8}}>
              {item.name}
            </Text>
          ))
        ) : (
          <Text></Text>
        )}
      </View>
      <View>
        <Text className="text-2xl font-semibold mt-2">About {UserData.name?UserData.name:"Author"}</Text>
        <Text className="mt-2">{professionalData?.bio}</Text>
      </View>
      <View>
        <Text className="text-2xl font-extrabold mt-2">Skill</Text>
        {
          professionalData?.skill?.map( item => (
            <View className="flex-row justify-between">
              <Text className="flex-1 bg-slate-300 p-3 mt-2 text-lg">
                 {item.name}
              </Text>
              <Text className="bg-slate-300 p-3 mt-2 text-lg">
                 {item.level}
              </Text>
            </View>
          ))
        }
      </View>
      <ServiceDetails item={professionalData} id={registration_id} data={UserData}/>
      <View>
        <Text className="text-2xl font-extrabold mt-2">Language</Text>
        {
          professionalData?.language?.map( item => (
            <View className="flex-row justify-between">
              <Text className="flex-1 bg-slate-300 p-3 mt-2 text-lg">
                 {item.name}
              </Text>
              <Text className="bg-slate-300 p-3 mt-2 text-lg">
                 {item.level}
              </Text>
            </View>
          ))
        }
      </View>
      {/* availaibilty component comes here ------*/}
      {renderSectionAvailability(availability)}
      <View>
        <Text className="text-2xl font-extrabold mt-2">Education</Text>
        {
          professionalData?.education?.map( item => (
            <View className="flex-row justify-between">
              <Text className="flex-1 bg-slate-300 p-3 mt-2 text-sm">
                 {item.degree} - {item.subjects}
              </Text>
              <Text className="bg-slate-300 p-3 mt-2 text-sm">
                 {item.university} - {item.passing_year}
              </Text>
            </View>
          ))
        }
      </View>
      <View>
        <Text className="text-2xl font-extrabold mt-2">Work & Experience</Text>
        {
          professionalData?.experience?.map( item => (
            <>
            <View className="flex-row justify-between">
              <Text className="flex-1 bg-slate-300 p-3 mt-2 text-sm">
                 {item.job_title} 
              </Text>
              <Text className="bg-slate-300 p-3 mt-2 text-sm">
                 {item.location}
              </Text>
            </View>
            <View className="flex-row justify-between ">
              <Text className="flex-1 bg-slate-300 p-3 mt-2 text-sm">
                 {item.company_name} 
              </Text>
              <Text className="bg-slate-300 p-3 mt-2 text-sm">
              {item && item.startdate && dayjs(item.startdate).format("DD-MM-YYYY")} - {item && item.enddate && dayjs(item.enddate).format("DD-MM-YYYY")}
              </Text>
            </View>
            </>
            
          ))
        }
      </View>
      <View>
         <ReviewListing data={UserData} id={registration_id}/>
      </View>
    </View>
    </ScrollView>
  );
};

export default ListingUserDetail;



const renderSectionAvailability = (availability) => {
  console.log(availability,"availiavbility in render section availibilty")

  const convertTo12HourFormat = (time) => {
    const [hours, minutes] = time.split(':');
    let period = 'AM';
    let hour = parseInt(hours);
  
    if (hour >= 12) {
      period = 'PM';
      if (hour > 12) hour -= 12;
    }
    if (hour === 0) hour = 12; // handle midnight
  
    return `${hour}:${minutes} ${period}`;
  };
  

  if (!availability || Object.keys(availability).length === 0) {
    return <Text>No Availability</Text>;
  }

  return (
    <View style={styles.listingSectionWrap} className="bg-gray-200 border-2 mt-3 rounded-2xl">
      <Text style={styles.heading}>Availability</Text>
      <View style={styles.borderBottom} />
      <View>
        <View style={styles.gridContainer}>
          {Object.entries(availability).map(
            ([day, details], index) => (
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
                        /> 
                   </View>
                  ) : (
                    <View>
                    <FontAwesomeIcon
                          icon={faXmark}
                          className="text-red-950 text-lg font-bold"
                        />
                   </View>
                  )}
                </View>
                <Text>
                  {details.isOpen
                    ? Array.isArray(details.timings)
                      ? details.timings
                          .map((timing) => convertTo12HourFormat(timing))
                          .join(' - ')
                      : 'Invalid timings'
                    : 'Unavailable'}
                </Text>
              </View>
            )
          )}
        </View>
      </View>
      <View style={styles.borderBottom} />
    </View>
  );
};

const styles = StyleSheet.create({
  listingSectionWrap: {
    padding: 16,
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

 