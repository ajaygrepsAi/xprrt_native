import React, {useState, useEffect} from 'react';
import {ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';
import {useFormik} from 'formik';
import {API} from '../../constants/constant';
import {HttpRequest} from '../../data/Httprequest';
import { GetAsyncData } from '../../utils/common';
const Service = () => {
  const [userData, setUserData] = useState([]);
  const [switchComponent, setSwitchComponent] = useState();

  const {handleChange, handleSubmit, values, setValues} = useFormik({
    initialValues: {
      project_type: '',
      category_consultation: '',
      description: '',
      price: '',
      category: '',
      duration: '',
    },
    onSubmit:async(values)=>{
      console.log(values,"values valie in srvice page -------")
      const token = await GetAsyncData("token")
      console.log("token",token)
      const response = await HttpRequest({
        url:API.PROFILE_PROFESSIONAL,
        method:"PUT",
        params:{
          service: [values]
        }
      })
    }
  });

  const fetchPreviousData = async () => {
    try {
      const response = await HttpRequest({
        url: API.PROFILE,
        method: 'GET',
      });

      if (response && response?.data) {
        console.log(
          'response.data in profile-personal----get ',
          response?.data,
        );

        setUserData(response?.data?.professional?.service);

        if(userData){
          console.log("its have a value in service dtails",userData)
        }else{
          console.log("not found any data -----")
        }

        setValues({
          project_type: response?.data?.professional.service[0].project_type || '',
          category_consultation: response?.data?.professional.service[0].category_consultation || '',
          price: response?.data?.professional?.service[0].price|| '',
          description: response?.data?.professional?.service[0].description || '',
          duration: response?.data?.professional?.service[0].duration|| '',
          title: response?.data?.professional?.service[0].title || '',
          min_price: response?.data?.professional?.service[0].min_price|| '',
          max_price: response?.data?.professional?.service[0].max_price|| '',
          category:response?.data?.professional?.main_category
        });
      } else {
        console.log(response?.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchPreviousData();
  }, []);

  // console.log(userData[0].project_type,"userdata in service-details")

  return (
    <ScrollView>
      <View className=" bg-purple-100" >
        <Text className=" mt-8 text-slate-950  text-2xl text-center font-extrabold ">Services/Consultation Details</Text>
      <View
        className=" rounded-xl  p-3 mt-10 bg-purple border-gray-50 "
        style={{width: '90%', marginLeft: 17}}>
        <View>
          <Text className="text-xl font-bold">Service Name</Text>
          <View className="border-2 rounded-2xl mt-2  bg-white border-gray-50 ">
            <TextInput className="text-lg font-semibold" onChangeText={handleChange('title')} value={values.title}/>
          </View>
        </View>
        <View className="mt-3">
          <Text className="text-xl font-bold">Project Charges</Text>
          <View className="border-2 rounded-2xl mt-2  bg-white border-gray-50 ">
            <Picker
              className="text-lg font-semibold "
              selectedValue={values.project_type}
              // value={values.project_type}
              onValueChange={handleChange('project_type')}
              style={{height: 50, width: '100%'}}>
              <Picker.Item label="Charges" value="" />
              <Picker.Item label="Fixed Charges" value="fixed" />
              <Picker.Item label="Hourly Based Charges" value="hourly" />
              <Picker.Item label="Consultation" value="consultation" />
            </Picker>
          </View>
        </View>

        {values.project_type == 'consultation' ? (
          <>
            <View className="mt-3">
              <Text className="text-xl font-bold"> category consultation</Text>
              <View className="border-2 rounded-2xl mt-2  bg-white border-gray-50 ">
                <Picker
                  className="text-lg font-semibold "
                  selectedValue={values.category_consultation}
                  value={values.category_consultation}
                  onValueChange={handleChange('category_consultation')}
                  style={{height: 50, width: '100%'}}>
                  <Picker.Item label="Select Media Type" value="" />
                  <Picker.Item label="Audio" value="audio" />
                  <Picker.Item label="Video" value="Video" />
                </Picker>
              </View>
            </View>

            <View className="mt-3">
              <Text className="text-xl font-bold"> Duration</Text>
              <View className="border-2 rounded-2xl mt-2  bg-white border-gray-50 ">
                <Picker
                   className="text-lg font-semibold "
                  selectedValue={values.duration}
                  value={values.duration}
                  onValueChange={handleChange('duration')}
                  style={{height: 50, width: '100%'}}>
                  <Picker.Item label="duration" value="" />
                  <Picker.Item label="15 mins" value="15-min" />
                  <Picker.Item label="30 mins" value="30-min" />
                  <Picker.Item label="45 mins" value="45-min" />
                  <Picker.Item label="1 hours" value="1-hour" />
                  <Picker.Item label="2 hours" value="2-hours" />
                </Picker>
              </View>
            </View>

            <View>
              <Text className="text-xl font-bold">Price</Text>
              <View className="border-2 rounded-2xl mt-2 bg-white border-gray-50">
                <TextInput className="text-lg font-semibold  " onChangeText={handleChange('price')}  value={values.price}/>
              </View>
            </View>
          </>
        ) : (
          <>
            <View>
              <Text className="text-xl font-bold">Select Category</Text>
              <View className="border-2 rounded-2xl mt-2 bg-white border-gray-50">
                <TextInput
                 className="text-lg font-semibold "
                  onChangeText={handleChange('category')}
                  value={values.category}
                />
              </View>
            </View>

            <View>
              <Text className="text-xl font-bold">Min Price</Text>
              <View className="border-2 rounded-2xl mt-2  bg-white border-gray-50 ">
                <TextInput
                  className="text-lg font-semibold   "
                  onChangeText={handleChange('min_price')}
                  value={values.min_price}
                />
              </View>
            </View>

            <View>
              <Text className="text-xl font-bold">Max Price</Text>
              <View className="border-2 rounded-2xl mt-2  bg-white border-gray-50 ">
                <TextInput
                  className="text-lg font-semibold "
                  onChangeText={handleChange('max_price')}
                  value={values.max_price}
                />
              </View>
            </View>
          </>
        )}

        <View>
          <Text className="text-xl font-bold">Description</Text>
          <View className="border-2 rounded-2xl mt-2  bg-white border-gray-50 ">
            <TextInput
              className="text-lg font-semibold "
              onChangeText={handleChange('description')}
              value={values.description}
            />
          </View>
        </View>

        <TouchableOpacity className="border-2 mt-5 p-2 rounded-xl bg-blue-900" onPress={handleSubmit}>
           <Text className="p-2 text-xl font-bold text-center text-white">Save Detail</Text>
        </TouchableOpacity>

      </View>
    </View>
    </ScrollView>
  );
};

export default Service;
