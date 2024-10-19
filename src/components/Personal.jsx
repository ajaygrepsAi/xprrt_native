import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {HttpRequest} from '../../data/Httprequest';
import {API} from '../../constants/constant';
import {useFormik} from 'formik';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';


const Personal = () => {
  const [userData, setUserData] = useState([]);
  const [dob, setDob] = useState(new Date());
  const [open, setOpen] = useState(false);

  const {handleChange, handleSubmit, values, setValues} = useFormik({
    initialValues: {
      name: '',
      email: '',
      gender: '',
      locality: '',
      country: '',
      address: '',
      pincode: '',
      city: '',
      state: '',
    },
    onSubmit: async values => {
      console.log(values, 'values-----in formik -----');
      const response = await HttpRequest({
        url: API.PROFILE_PERSONAL,
        method: 'PUT',
        params: {
          ...values
        }
      });
      console.log(response,"response")

      if (response) {
        
        // Alert.alert(response.message);
        console.log('data save successfully', response?.data);
      } else {
        // Alert.alert(response.message);
        console.log('data not not save successfully');
      }
    },
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

        setUserData(response?.data);

        setValues({
          name: response?.data?.name || '',
          email: response?.data?.email || '',
          gender: response?.data?.gender || '',
          locality: response?.data?.locality || '',
          country: response?.data?.country || '',
          address: response?.data?.address || '',
          pincode: response?.data?.pincode || '',
          city: response?.data?.city || '',
          state: response?.data?.state || '',
          dob: response?.data?.dob,
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

  return (
    <ScrollView>
      <View className="bg-purple-100">
      <Text className="text-center text-3xl font-extrabold text-slate-950 ">
        Personal Details
      </Text>
      <View className="mt-1 p-2" style={{marginLeft: 30}}>
        <View>
          <Text className="font-extrabold text-slate-950">Name</Text>
          <TextInput
            className="border-2 rounded-xl p-2 text-xl mt-3 bg-white border-gray-50"
            style={{width: '90%'}}
            onChangeText={handleChange('name')}
            value={values.name}>
            </TextInput>
        </View>
        <View className="mt-2">
          <Text className="font-extrabold text-slate-950">Email</Text>
          <TextInput
            className="border-2 rounded-xl p-2 mt-3 bg-white border-gray-50"
            style={{width: '90%'}}
            onChangeText={handleChange('email')}
            value={values.email}></TextInput>
        </View>
        <View className="mt-2">
          <Text className="font-extrabold text-slate-950">Gender</Text>

          <View className="border-2 rounded-xl mt-3 bg-white border-gray-50" style={{width: '90%'}}>
            <Picker
              selectedValue={values.gender}
              onValueChange={handleChange('gender')}
              style={{height: 50, width: '100%'}}>
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
        </View>

        <View className="mt-2">
          <Text className="font-extrabold text-slate-950">Date Of Birth</Text>
          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={{
              borderWidth: 2,
              borderRadius: 10,
              padding: 10,
              marginTop: 10,
              width: '90%',
            }} className="bg-white border-gray-50">
            <Text className="text-xl font-bold ">{values.dob ? values.dob : 'Select Date'}</Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={open}
            date={dob}
            mode="date"
            onConfirm={date => {
              setOpen(false);
              setDob(date);
              handleChange('dob')(dayjs(date).format('YYYY-MM-DD'));
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>

        <View className="mt-2">
          <Text className="font-extrabold text-slate-950">Flat/House.No</Text>
          <TextInput
            className="border-2 rounded-xl p-2 text-xl mt-3 bg-white border-gray-50"
            style={{width: '90%'}}
            onChangeText={handleChange('address')}
            value={values.address}></TextInput>
        </View>
        <View className="mt-2">
          <Text className="font-extrabold text-slate-950">Area/Sector</Text>
          <TextInput
            className="border-2 rounded-xl p-2 text-xl mt-3 bg-white border-gray-50"
            style={{width: '90%'}}
            onChangeText={handleChange('locality')}
            value={values.locality}></TextInput>
        </View>
        <View className="flex-row mt-2">
          <View className="flex-1 ">
            <Text className="font-extrabold text-slate-950">City</Text>
            <TextInput
              className="border-2 rounded-xl p-2 text-xl mt-3 bg-white border-gray-50"
              style={{width: '90%'}}
              onChangeText={handleChange('city')}
              value={values.city}></TextInput>
          </View>
          <View className="flex-1 ">
            <Text className="font-extrabold text-slate-950">State</Text>
            <TextInput
              className="border-2 rounded-xl p-2 text-xl mt-3 bg-white border-gray-50"
              style={{width: '85%'}}
              onChangeText={handleChange('state')}
              value={userData.state}></TextInput>
          </View>
        </View>
        <View className="flex-row mt-2">
          <View className="flex-1 ">
            <Text className="font-extrabold text-slate-950">Pincode</Text>
            <TextInput
              className="border-2 rounded-xl p-2 text-xl mt-3  bg-white border-gray-50 "
              style={{width: '90%'}}
              onChangeText={handleChange('pincode')}
              value={values.pincode}></TextInput>
          </View>
          <View className="flex-1 ">
            <Text className="font-extrabold text-slate-950">Country</Text>
            <TextInput
              className="border-2 rounded-xl p-2 text-xl mt-3 bg-white border-gray-50"
              style={{width: '90%'}}
              onChangeText={handleChange('country')}
              value={values.country}></TextInput>
          </View>
        </View>
        <TouchableOpacity
          className="border-3 rounded-2xl bg-blue-950 mt-3"
          style={{width: '95%'}}
          onPress={handleSubmit}>
          <Text className="text-2xl p-3 text-center text-white">
           {userData?.name ?  "Edit Details" :" Save Details"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
};

export default Personal;

