import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {HttpRequest} from '../../data/Httprequest';
import {API} from '../../constants/constant';
import {useFormik} from 'formik';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';
import {
  faSolid,
  faBell,
  faBars,
  faPenToSquare,
  faThin,
  faCaretDown,
  faHashtag
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';


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
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="bg-white p-2">
      <Text className="text-center text-3xl font-extrabold text-slate-950 mt-5" >
        Personal Details
      </Text>
      <View className="mt-3 p-2" style={{marginLeft: 0}}>
        <View>
          <Text className="font-semibold" style={{fontSize:18,color:"#464646"}}>Name</Text>
          <TextInput
              className="border rounded-xl  mt-3 p-3"
             placeholder='Enter Your Name'
            style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}}
            onChangeText={handleChange('name')}
            value={values.name}>
            </TextInput>
        </View>
        <View className="mt-2">
          <Text className="font-semibold" style={{fontSize:18,color:"#464646"}}>Email</Text>
          <TextInput
            className="border rounded-xl  mt-3 p-3"
             placeholder='Enter Your Email'
            style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}}
            onChangeText={handleChange('email')}
            value={values.email}></TextInput>
        </View>
        <View className="mt-2">
          <Text className="font-semibold" style={{fontSize:18,color:"#464646"}}>Gender</Text>

          <View className=" rounded-xl mt-3 border" style={{width: '100%',borderColor:"#C8C8C8AD"}}>
            <Picker
              selectedValue={values.gender}
              onValueChange={handleChange('gender')}
              style={{height: 51, width: '100%'}}>
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
        </View>

        <View className="mt-2">
          <Text className="font-semibold" style={{fontSize:18,color:"#464646"}}>Date Of Birth</Text>
          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={{
              // borderWidth: 2,
              borderRadius: 10,
              padding: 10,
              marginTop: 10,
              width: '100%',
              height:51,
             borderColor:"#C8C8C8AD"
            }} className="border">
            <Text className=" text-slate-800 " style={{fontWeight:400}}>{values.dob ? values.dob : 'Select Date'}</Text>
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
          <Text className="font-semibold" style={{fontSize:18,color:"#464646"}}>Flat/House.No</Text>
          <TextInput
            className="border rounded-xl mt-3 p-3"
            keyboardType="numeric"
            placeholder='Enter Your Flat/House.No'
            style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}}
            onChangeText={handleChange('address')}
            value={values.address}></TextInput>
        </View>
        <View className="mt-2">
          <Text className="font-semibold" style={{fontSize:18,color:"#464646"}}>Area/Sector</Text>
          <TextInput
            className="border rounded-xl  mt-3 p-3"
             placeholder='Enter Your Area/Sector'
            style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}}
            onChangeText={handleChange('locality')}
            value={values.locality}></TextInput>
        </View>
        <View className="flex-row mt-2 ">
          <View className="flex-1 ">
            <Text className="font-semibold" style={{fontSize:18,color:"#464646"}}>City</Text>
            <TextInput
              className="border rounded-xl  mt-3 p-3"
              placeholder='Enter Your City'
              style={{width: '96%',height:51, borderColor:"#C8C8C8AD"}}
              onChangeText={handleChange('city')}
              value={values?.city}></TextInput>
          </View>
          <View className="flex-1 ">
            <Text className="font-semibold" style={{fontSize:18,color:"#464646"}}>State</Text>
            <TextInput
             className="border rounded-xl  mt-3 p-3"
              placeholder='Enter Your State'
             style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}}
              onChangeText={handleChange('state')}
              value={values?.state}></TextInput>
          </View>
        </View>
        <View className="flex-row mt-2">
          <View className="flex-1 ">
            <Text className="font-semibold" style={{fontSize:18,color:"#464646"}}>Pincode</Text>
            <TextInput
className="border rounded-xl  mt-3 p-3"
keyboardType="numeric"
 placeholder='Enter Your Pincode'
style={{width: '96%',height:51, borderColor:"#C8C8C8AD"}}
              onChangeText={handleChange('pincode')}
              value={values.pincode}></TextInput>
          </View>
          <View className="flex-1 ">
            <Text className="font-semibold" style={{fontSize:18,color:"#464646"}}>Country</Text>
            <TextInput
              className="border rounded-xl  mt-3 p-3"
              placeholder='Enter Your Country'
              style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}}
              onChangeText={handleChange('country')}
              value={values.country}></TextInput>
          </View>
        </View>
        <TouchableOpacity
          className=" rounded-2xl mt-3"
          style={{width: 151,height:52,backgroundColor:"#6C63FF"}}
          onPress={handleSubmit}>
          <Text className="text-2xl p-3 text-center text-white" style={{fontSize:13}}>
           {userData?.name ?  "Edit Details" :" Save Details"}
          </Text>
          <FontAwesomeIcon icon={faHashtag} size={15} style={{position:"absolute",top:21,left:25,color:"white"}}/>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
};

export default Personal;

