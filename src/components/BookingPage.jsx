import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Image, Text, View,Linking, TouchableOpacity,TextInput} from 'react-native';
import UserDetail from './miscellaneous/UserDetail';
import { ScrollView } from 'react-native-gesture-handler';
import {useFormik} from 'formik';
import { HttpRequest } from '../../data/Httprequest';
import { API } from '../../constants/constant';


const BookingPage = () => {
  const route = useRoute();
  const {id} = route.params;
  const {data} = route.params;
  const {item} = route.params;
  
  const {handleChange, handleSubmit, values, setValues} = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: 0,
      message: '',
    },
    onSubmit: async (values) => {
      console.log(values, 'values-----in formik -----');
      const response = await HttpRequest({
        url: API.CONTACT,
        method: 'POST',
        params: {
          ...values,
          type: 'BOOKING',
          user_id:id
        }
      });

      if (response) {
        // Alert.alert(response.message);
        console.log('data save successfully', response?.data);
      } else {
        // Alert.alert(response.message);
        console.log('data not not save successfully');
      }
    },
  });


  const LinkingWebsite = (e)=>{
    console.log(e,"e-value in for website")
      if(e){
        Linking.openURL(e).catch(err => console.error("could not load page ",err))
      }
  }

  return (
   <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
     <View className="p-2  ">
      <View className="">
        <UserDetail item={data} />
      </View>
      <View className="mt-3 border-2 rounded-2xl p-3 bg-slate-500">
        <TouchableOpacity onPress={()=>LinkingWebsite(item.website)}>
        <Text className="text-xl font-extrabold text-amber-950">🌏 Website: Portfolio Link </Text>
        </TouchableOpacity>
        <View>
          {item?.service?.map(item => (
            <>
              <View className="flex-row justify-between mt-2 p-2">
                <Text className="text-lg font-extrabold  text-slate-950">{item.title}</Text>
                <Text className="text-lg font-extrabold  text-slate-950">
                  {item.min_price !== undefined && item.max_price !== undefined
                    ? `$${item.min_price} - $${item.max_price}`
                    : item.price !== undefined
                    ? `    Duration: ${item.duration} |  $${item.price} `
                    : 'Price or duration not available'}
                </Text>
              </View>

              <View className="flex-row justify-between">
                <Text className="text-lg font-semibold  text-slate-950">{item.category}</Text>
                <Text className="text-lg font-semibold  text-slate-950">
                  {item.project_type}
                </Text>
              </View>
            </>
          ))}
          
        </View>
      </View>
      {/* Booking-contact-page for booking */}

      <View className=" mt-2 border-2 rounded-2xl" >
        <Text className="text-center p-2 text-2xl font-semibold text-slate-950">Contact Details</Text>
        <View style={{marginLeft:20}}>
        <View className=" mt-2 " >
          <Text className="font-extrabold">Name</Text>
          <TextInput
            className="border-2 rounded-xl p-2 text-xl mt-3"
            style={{width: '90%'}}
            onChangeText={handleChange('name')}
            value={values.name}></TextInput>
        </View>
        <View className="mt-2">
          <Text className="font-extrabold">Email</Text>
          <TextInput
            className="border-2 rounded-xl p-2 mt-3"
            style={{width: '90%'}}
            onChangeText={handleChange('email')}
            value={values.email}></TextInput>
        </View>
        <View>
          <Text className="font-extrabold">Mobile</Text>
          <TextInput
            className="border-2 rounded-xl p-2 text-xl mt-3"
            style={{width: '90%'}}
            onChangeText={handleChange('mobile')}
            value={values.mobile}></TextInput>
        </View>
        <View className="mt-2">
          <Text className="font-extrabold">Message</Text>
          <TextInput
            className="border-2 rounded-xl p-2 mt-3 text-xl"
            style={{width: '90%'}}
            onChangeText={handleChange('message')}
            value={values.message}></TextInput>
        </View>
        
        <TouchableOpacity className="border-2 rounded-xl bg-blue-950 mt-3" style={{width:"90%"}} onPress={handleSubmit}>
            <Text className="text-lg p-2 text-center  text-white font-extrabold">Send Message</Text>
        </TouchableOpacity>
        </View>
        
       
      </View>
    </View>
   </ScrollView>
  );
};

export default BookingPage;
