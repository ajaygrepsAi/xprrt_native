import {useFormik} from 'formik';
import React from 'react';
import {Text, TouchableOpacity, View,TextInput, Dimensions} from 'react-native';
import {API} from '../../constants/constant';
import { HttpRequest } from '../../data/Httprequest';

const ContactPage = () => {
  const {width,height} = Dimensions.get('window')
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
          type: 'QUERRY',
        },
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

  return (
    <View className="p-2 bg-purple-100" style={{width:width,height:height}}>
      <View className="mt-6">
        <Text className="text-center text-3xl font-extrabold text-slate-950">Contact</Text>
      </View>
      <View className="" style={{marginLeft:30}}>
        <View className=" mt-20 ">
          <Text className="font-extrabold text-slate-950 text-lg">Name</Text>
          <TextInput
            className=" rounded-xl p-2 text-xl mt-3 bg-gray-50 "
            style={{width: '90%'}}
            onChangeText={handleChange('name')}
            value={values.name}></TextInput>
        </View>
        <View className="mt-2">
          <Text className="font-extrabold text-slate-950 mt-2 text-lg">Email</Text>
          <TextInput
            className=" rounded-xl p-2 mt-3 bg-gray-50"
            style={{width: '90%'}}
            onChangeText={handleChange('email')}
            value={values.email}></TextInput>
        </View>
        <View>
          <Text className="font-extrabold text-slate-950 mt-2 text-lg">Mobile</Text>
          <TextInput
            className=" rounded-xl p-2 text-xl mt-3 bg-gray-50"
            style={{width: '90%'}}
            onChangeText={handleChange('mobile')}
            value={values.mobile}></TextInput>
        </View>
        <View className="mt-2">
          <Text className="font-extrabold text-slate-950 text-lg">Message</Text>
          <TextInput
            className=" rounded-xl p-2 mt-3 text-xl bg-gray-50"
            style={{width: '90%',height:110}}
            onChangeText={handleChange('message')}
            value={values.message}></TextInput>
        </View>
        
        <TouchableOpacity className="border-2 rounded-xl bg-blue-950 mt-10" style={{width:"90%"}} onPress={handleSubmit}>
            <Text className="text-lg p-2 text-center  text-white font-extrabold">Send Message</Text>
        </TouchableOpacity>
        
       
      </View>
     
    </View>
  );
};

export default ContactPage;
