import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {HttpRequest} from '../../data/Httprequest';
import {API} from '../../constants/constant';
import {useFormik} from 'formik';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';
import { GetAsyncData } from '../../utils/common';



const Professional = () => {

   const fetchGetProfileData= async()=>{
    try {
      const response = await HttpRequest({
        url:API.PROFILE,
        method:"GET",

      })
        // token = await GetAsyncData("token")
        // console.log(token)
      if(response?.data){
        console.log("response?.data------",response?.data)
      }else{
        console.log("-response data is not--------come")
      }
    } catch (error) {
      console.log(error.message)
    }
   }

  useEffect(()=>{
    fetchGetProfileData()
  },[])
   
    

    const {handleChange, handleSubmit, values, setValues} = useFormik({
      initialValues:{
        job_title:"",
        website:"",
        bio:"",
        language:[{
          name:"",
          level:""
        }],
        skill:[{
          name:"",
          level:""
        }],
        portfolio:[{
          link:"",
          portfolio_title:"",
          description:"",
          details:""
        }],
        education:[{
          degree:"",
          // school:"",
          subjects :"",
          university:"",
          passing_year:""
        }],
        experience:[{
          role:"",
          school:"",
          enddate:"",
          location:"",
          job_title:"",
          startdate:"",
          description:"",
          company_name:""
        }],
        main_category:"",
        total_experience:""
      },
      onSubmit:async(value)=>{
        console.log(value,"value in professional----data----formik value --")
        const response = await HttpRequest({
          url:API.PROFILE_PROFESSIONAL,
          method:"PUT",
          params:value
        })

        if(response.data){
          console.log("data save successfully in professional-details-----")
        }
        else{
          console.log("data not save in profile--professional-details--------")
        }
      }
    })
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View className="p-2 bg-purple-100">
        <View>
            <Text className="text-center font-extrabold text-2xl text-slate-950">Professional -details</Text>
            <Text className=" font-semibold mt-2">PROFESSIONAL INFORMATION Your information will be published in your profile, giving visitors a summary of your professional history and expertise.</Text>
        </View>
        <View className="mt-4 p-2 rounded-xl">
            <View className="">
                <Text className=" font-semibold text-lg ">Job Title</Text>
                <TextInput className=" border-2 rounded-xl text-lg mt-1 bg-white border-gray-50" style={{width:"100%"}} placeholder='Enter your job title' onChangeText={handleChange('job_title')}/>
            </View>
            <View className="">
                <Text className=" font-semibold text-lg m-1 ">Website</Text>
                <TextInput className=" border-2 rounded-xl text-lg mt-1 bg-white border-gray-50" style={{width:"100%"}} placeholder='Enter your personal website link' onChangeText={handleChange('website')}/>
            </View>
            <View className="">
                <Text className=" font-semibold text-lg mt-1 ">Bio</Text>
                <TextInput className=" border-2 rounded-xl text-lg mt-1 bg-white border-gray-50" style={{width:"100%"}} placeholder='Describe yourself ' onChangeText={handleChange('bio')}/>
            </View>
            <View className="">
                <Text className=" font-semibold text-lg mt-1 ">Occupation</Text>
                <TextInput className=" border-2 rounded-xl text-lg mt-1 bg-white border-gray-50" style={{width:"100%"}} placeholder='Select your Category' onChangeText={handleChange('main_category')}/>
            </View>
            <View className="">
                <Text className=" font-semibold text-lg mt-1 ">Total Experience</Text>
                <TextInput className=" border-2 rounded-xl text-lg mt-1 bg-white border-gray-50 " style={{width:"100%"}} placeholder='Total_experience'onChangeText={handleChange('total_experience')}/>
            </View>
        </View>
        
        <View className="mt-4 p-2 rounded-xl bg-purple-100" >
            <Text className="text-lg font-extrabold">Skill</Text>
            <View className="">
            <TextInput className=" border-2 rounded-xl text-lg mt-1 bg-white border-gray-50" style={{width:"100%"}} placeholder='Skills' onChangeText={handleChange('skill[0].name')}/>
            <View className="border-2 rounded-xl mt-3 bg-white border-gray-50" style={{width: '100%'}}>
            <Picker
              selectedValue={values.skill[0].level }
              onValueChange={handleChange('skill[0].level')}
              style={{height: 50, width: '100%'}}>
              <Picker.Item label="Select Level" value="" />
              <Picker.Item label="Biginner" value="biginner" />
              <Picker.Item label="Intermediate" value="intermediate" />
              <Picker.Item label="Expert" value="expert" />
            </Picker>
          </View>
            </View>
        </View>
        <View className="mt-4 p-2 rounded-xl bg-purple-100" >
            <Text className="text-lg font-extrabold">Language</Text>
            <View className="">
            <TextInput className=" border-2 rounded-xl text-lg mt-1 bg-white border-gray-50" style={{width:"100%"}}  placeholder='Language' onChangeText={handleChange('language[0].name')}/>
            <View className="border-2 rounded-xl mt-3 bg-white border-gray-50 " style={{width: '100%'}}>
            <Picker
              selectedValue={values.language[0].level}
              onValueChange={handleChange('language[0].level')}
              style={{height: 50, width: '100%'}}>
              <Picker.Item label="Select Level" value="" />
              <Picker.Item label="Biginner" value="biginner" />
              <Picker.Item label="Intermediate" value="intermediate" />
              <Picker.Item label="Expert" value="expert" />
            </Picker>
          </View>
            </View>
        </View>
        
        <View className="mt-4 p-2 rounded-xl bg-purple-100" >
            <Text className="text-lg font-extrabold">Education</Text>
            <View className="">
            <TextInput className=" border-2 rounded-xl text-lg mt-2 bg-white border-gray-50" style={{width:"100%"}} placeholder='Degree Name' onChangeText={handleChange('education[0].degree')}/>
            <TextInput className=" border-2 rounded-xl text-lg mt-2 bg-white border-gray-50" style={{width:"100%"}} placeholder='School/Univerity' onChangeText={handleChange('education[0].university')}/>
            <TextInput className=" border-2 rounded-xl text-lg mt-2 bg-white border-gray-50" style={{width:"100%"}} placeholder='Field of study/Subject' onChangeText={handleChange('education[0].subjects')}/>
            <TextInput className=" border-2 rounded-xl text-lg mt-2 bg-white border-gray-50" style={{width:"100%"}} placeholder='Passing Year' onChangeText={handleChange('education[0].passing_year')}/>
            </View>
        </View>
        <View className="mt-4 p-2 rounded-xl bg-purple-100" >
            <Text className="text-lg font-extrabold">Portfolio</Text>
            <View className="">
            <TextInput className=" border-2 rounded-xl text-lg mt-2 bg-white border-gray-50" style={{width:"100%"}} placeholder='Online link of portfolio' onChangeText={handleChange('portfolio[0].link')}/>
            <TextInput className=" border-2 rounded-xl text-lg mt-2 bg-white border-gray-50" style={{width:"100%"}} placeholder='Title' onChangeText={handleChange('portfolio[0].portfolio_title')}/>
            <TextInput className=" border-2 rounded-xl text-lg mt-2 bg-white border-gray-50" style={{width:"100%"}} placeholder='Projet Details'  onChangeText={handleChange('portfolio[0].details')}/>
            <TextInput className=" border-2 rounded-xl text-lg mt-2 bg-white border-gray-50" style={{width:"100%"}} placeholder='Descriptions'  onChangeText={handleChange('portfolio[0].description')}/>
            </View>
        </View>

        <View className="mt-4 p-2 rounded-xl bg-purple-100" >
            <Text className="text-lg font-extrabold">Experience</Text>
            <View className="">
            <TextInput className=" border-2 rounded-xl text-lg mt-2 bg-white border-gray-50" style={{width:"100%"}} placeholder='Tilte' onChangeText={handleChange('experience[0].job_title')} />
            <TextInput className=" border-2 rounded-xl text-lg mt-2 bg-white border-gray-50" style={{width:"100%"}} placeholder='Company Name' onChangeText={handleChange('experience[0].company_name')}/>
            <View className="border-2 rounded-xl mt-3 bg-white border-gray-50" style={{width: '100%'}}>
            <Picker
              selectedValue={values.experience[0].role}
              onValueChange={handleChange('experience[0].role')}
              style={{height: 50, width: '100%'}}>
              <Picker.Item label="Role" value="" />
              <Picker.Item label="Founder" value="founder" />
              <Picker.Item label="Manager" value="manager" />
              <Picker.Item label="Developer" value="developer" />
              <Picker.Item label="Designer" value="designer" />
              <Picker.Item label="Marketing" value="maketing" />
            </Picker>
          </View>
            <TextInput className=" border-2 rounded-xl text-lg mt-2 bg-white border-gray-50" style={{width:"100%"}} placeholder='Location' onChangeText={handleChange('experience[0].location')}/>
            <TextInput className=" border-2 rounded-xl text-lg mt-2 bg-white border-gray-50" style={{width:"100%"}} placeholder='Start Date' onChangeText={handleChange('experience[0].startdate')}/>
            <TextInput className=" border-2 rounded-xl text-lg mt-2 bg-white border-gray-50" style={{width:"100%"}}placeholder='End Date' onChangeText={handleChange('experience[0].enddate')}/>
            <TextInput className=" border-2 rounded-xl text-lg mt-2 bg-white border-gray-50" style={{width:"100%"}} placeholder='Description' onChangeText={handleChange('experience[0].description')}/>
            </View>
        </View>
        <TouchableOpacity className="mt-4 p-2 rounded-xl bg-blue-950">
          <Text className="text-lg font-extrabold text-white text-center" onPress={handleSubmit}>Save Details</Text>
        </TouchableOpacity>
        
    </View>
    </ScrollView>
  )
}

export default Professional

