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
    <View className="p-2 bg-white" style={{width:width,height:"100%"}}>
      <View className="mt-6">
        <Text className="text-center text-3xl font-extrabold text-slate-950">Contact</Text>
      </View>
      <View className="" style={{marginLeft:10}}>
        <View className=" mt-20 ">
          <Text className="font-semibold" style={{fontSize:16,color:"#3E3E3E"}}>Name</Text>
          <TextInput
            className=" rounded-xl bg-white border  mt-3 p-2"
            style={{width: '100%',height:"346px",borderColor:"#C8C8C8AD"}}
            onChangeText={handleChange('name')}
            placeholder='Enter your Name'
            value={values.name}></TextInput>
        </View>
        <View className="mt-2">
          <Text className="font-semibold" style={{fontSize:16,color:"#3E3E3E"}}>Email</Text>
          <TextInput
             className=" rounded-xl bg-white border p-2 mt-3"
             style={{width: '100%',height:"346px",borderColor:"#C8C8C8AD"}}
            onChangeText={handleChange('email')}
            placeholder='Enter your Email'
            value={values.email}></TextInput>
        </View>
        <View className="mt-2">
          <Text className="font-semibold" style={{fontSize:16,color:"#3E3E3E"}}>Mobile</Text>
          <TextInput
          keyboardType="numeric"
          maxLength={10}
          // minLength={10}
             className=" rounded-xl bg-white border p-2 mt-3"
             style={{width: '100%',height:"346px",borderColor:"#C8C8C8AD"}}
            onChangeText={handleChange('mobile')}
            placeholder='Enter your Mobile Number'
            value={values.mobile}></TextInput>
        </View>
        <View className="mt-2">
          <Text className="font-semibold" style={{fontSize:16,color:"#3E3E3E"}}>Message</Text>
          <TextInput
           
             className=" border rounded-xl  mt-3 p-2 bg-white"
             style={{width: '100%',height:110,borderColor:"#C8C8C8AD"}}
            onChangeText={handleChange('message')}
            placeholder='Write Your Message'
            value={values.message}></TextInput>
        </View>
        
        <TouchableOpacity className="p-2 rounded-xl  mt-1" style={{width:122,height:43 ,top:30,backgroundColor:"#6C63FF"}} onPress={handleSubmit}>
            <Text className="text-lg  text-center  text-white font-extrabold">Send Message</Text>
        </TouchableOpacity>
        
       
      </View>
     
    </View>
  );
};

export default ContactPage;
