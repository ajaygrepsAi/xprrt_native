import React, {useState, useEffect} from 'react';
import {Dimensions, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';
import {useFormik} from 'formik';
import {API} from '../../constants/constant';
import {HttpRequest} from '../../data/Httprequest';
import { GetAsyncData } from '../../utils/common';
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
const Service = () => {
  const [userData, setUserData] = useState([]);
  const [switchComponent, setSwitchComponent] = useState();
  const {height} = Dimensions.get('window')

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
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className=" bg-white" style={{height:height}}>
        <Text className=" mt-8 text-slate-950  text-2xl text-center font-extrabold ">Services/Consultation Details</Text>
        {/* <View style={{width:"90%",top:6,left:10}} className="border"></View> */}
      <View
        className=" rounded-xl  mt-8 bg-purple border-gray-50 "
        style={{width: '90%', marginLeft: 17}}>
        <View>
          <Text className="font-semibold" style={{fontSize:18,color:"#464646"}}>Service Name</Text>
          <View className=" rounded-2xl mt-2  ">
            <TextInput className="border rounded-xl  mt-3 p-2"
             placeholder='Enter Your Services'
            style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}} onChangeText={handleChange('title')} value={values.title}/>
          </View>
        </View>
        <View className="mt-2">
          <Text className="font-semibold" style={{fontSize:18,color:"#464646"}}>Project Charges</Text>
          <View className=" rounded-2xl mt-2 border " style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}}>
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
            <View className="mt-2">
              <Text className="font-semibold" style={{fontSize:18,color:"#464646"}}>Category consultation</Text>
              <View className=" rounded-2xl mt-2 border " style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}}>
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

            <View className="mt-2 flex-row ">
             <View className="flex-1">
             <Text className="font-semibold" style={{fontSize:18,color:"#464646"}}> Duration</Text>
              <View 
              className="border rounded-xl  mt-3"
              placeholder='Duration'
             style={{width: '97%',height:51, borderColor:"#C8C8C8AD"}}
              >
                <Picker
                   className="text-lg  "
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

              <View className=" flex-1">
              <Text className="font-semibold" style={{fontSize:18,color:"#464646"}}>Price</Text>
              <View className=" rounded-2xl ">
                <TextInput className="border rounded-xl  mt-3 p-2"
                 keyboardType="numeric"
             placeholder='Price'
            style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}} onChangeText={handleChange('price')}  value={values.price}/>
              </View>
            </View>
            </View>

            {/* <View className="mt-2">
              <Text className="font-semibold" style={{fontSize:18,color:"#464646"}}>Price</Text>
              <View className=" rounded-2xl ">
                <TextInput className="border rounded-xl  mt-3"
             placeholder='Price'
            style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}} onChangeText={handleChange('price')}  value={values.price}/>
              </View>
            </View> */}
          </>
        ) : (
          <>
            <View className="mt-2">
              <Text className="font-semibold" style={{fontSize:18,color:"#464646"}}>Select Category</Text>
              <View className=" rounded-2xl mt-2 ">
                <TextInput
                 className="border rounded-xl p-2"
                 placeholder='Select Category'
                style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}}
                  onChangeText={handleChange('category')}
                  value={values.category}
                />
              </View>
            </View>

            <View className="mt-2 flex-row" >
              <View className="flex-1">
              <Text className="font-semibold" style={{fontSize:18,color:"#464646"}}>Price</Text>
              <View className=" rounded-2xl mt-2   ">
                <TextInput
                 keyboardType="numeric"
                  className="border rounded-xl  mt-2 p-2"
                  placeholder='Min Price'
                 style={{width: '95%',height:51, borderColor:"#C8C8C8AD"}}
                  onChangeText={handleChange('min_price')}
                  value={values.min_price}
                />
              </View>
              </View>
              <View className="flex-1">
              <Text className="font-semibold" style={{fontSize:18,color:"#464646"}}></Text>
              <View className=" rounded-2xl mt-2  ">
                <TextInput
                 keyboardType="numeric"
                  className="border rounded-xl  mt-2 p-2"
                  placeholder='Max Price'
                 style={{width: '98%',height:51, borderColor:"#C8C8C8AD"}}
                  onChangeText={handleChange('max_price')}
                  value={values.max_price}
                />
              </View>
            </View>
            </View>

            {/* <View className="mt-2">
              <Text className="font-semibold" style={{fontSize:18,color:"#464646"}}>Max Price</Text>
              <View className=" rounded-2xl mt-2  ">
                <TextInput
                  className="border rounded-xl  mt-3"
                  placeholder='Enter Your Name'
                 style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}}
                  onChangeText={handleChange('max_price')}
                  value={values.max_price}
                />
              </View>
            </View> */}
          </>
        )}

        <View className="mt-2">
          <Text className="font-semibold" style={{fontSize:18,color:"#464646"}}>Description</Text>
          <View className=" rounded-2xl mt-2  ">
            <TextInput
              className="border rounded-xl p-2"
              placeholder='Description'
             style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}}
              onChangeText={handleChange('description')}
              value={values.description}
            />
          </View>
        </View>

        <View className="mt-8">
          <Text style={{fontSize:17,color:"#8F8F8F"}}>
          Save all the details just by clicking on save button giving below
          </Text>
        </View>

        <TouchableOpacity className="rounded-2xl mt-5"
          style={{width:151,height:52,backgroundColor:"#6C63FF"}} onPress={handleSubmit}>
           <Text className="text-2xl p-3 text-center text-white" style={{fontSize:13}}>{userData ? "Edit Details" : "Save Detail"}</Text>
           <FontAwesomeIcon icon={faHashtag} size={15} style={{position:"absolute",top:20,left:25,color:"white"}}/>
        </TouchableOpacity>
       
      </View>
    </View>
    </ScrollView>
  );
};

export default Service;
