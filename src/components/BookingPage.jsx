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
        setValues({
          name: '',
      email: '',
      mobile: 0,
      message: '',
        })
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
     <View className=" bg-white " style={{height:"100%"}}>
      <View className="">
        <UserDetail item={data} />
      </View>
      <View style={{width:"90%",left:15,top:5,color:"#E3E3E399",}} className="border mt-4"></View>
      <View className="mt-8 ">
        <TouchableOpacity onPress={()=>LinkingWebsite(item.website)}>
        <Text className="font-semibold" style={{fontSize:15,color:"#585858",left:15}}>🌏 Website: Portfolio Link </Text>
        </TouchableOpacity>
        {/* <View>
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
          
        </View> */}
      </View>
      {/* Booking-contact-page for booking */}

      <View className=" mt-1 " >
        {/* <Text className="text-center p-2 text-2xl font-semibold text-slate-950">Contact Details</Text> */}
        <View style={{marginLeft:5 }} className="p-2">
        <View className=" mt-2 " >
          <Text className="font-semibold" style={{fontSize:14,color:"#3E3E3E"}}>Name</Text>
          <TextInput
            className=" rounded-xl bg-white border text-lg mt-3"
            style={{width: '100%',height:"346px",borderColor:"#C8C8C8AD"}}
            onChangeText={handleChange('name')}
            placeholder='Enter your Name'
            value={values?.name}></TextInput>
        </View>
        <View className="mt-2">
          <Text className="font-semibold" style={{fontSize:14,color:"#3E3E3E"}}>Email</Text>
          <TextInput
            className="border  bg-white rounded-xl text-lg  mt-3"
            style={{width: '100%',height:"346px",borderColor:"#C8C8C8AD"}}
            onChangeText={handleChange('email')}
            placeholder='Enter your Email'
            value={values?.email}></TextInput>
        </View>
        <View className="mt-2">
          <Text className="font-semibold" style={{fontSize:14,color:"#3E3E3E"}}>Mobile</Text>
          <TextInput
          keyboardType="numeric"
          maxLength={10}
            className="border rounded-xl text-lg mt-3"
            style={{width: '100%',height:"346px",borderColor:"#C8C8C8AD"}}
            // onChangeText={handleChange('mobile')}
            onChangeText={(text) => {
              if (text.length <= 10) {
                handleChange('mobile')(text);
              }
            }}
            placeholder='Enter Your Mobile Number'
            value={values.mobile ? values.mobile.toString() : ''}></TextInput>
        </View>
        <View className="mt-2">
          <Text className="font-extrabold">Message</Text>
          <TextInput
            className=" border rounded-xl  mt-3 text-lg bg-white"
            style={{width: '100%',height:110,borderColor:"#C8C8C8AD"}}
            onChangeText={handleChange('message')}
             placeholder='Write Your Message'
            value={values.message}></TextInput>
        </View>
        
        <TouchableOpacity className="p-2 rounded-xl  mt-1" style={{width:122,height:43 ,top:15,backgroundColor:"#6C63FF"}} onPress={handleSubmit}>
            <Text className="text-lg  text-center  text-white font-extrabold">Submit</Text>
        </TouchableOpacity>
        </View>
        
       
      </View>
    </View>
   </ScrollView>
  );
};

export default BookingPage;
