import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { GetAsyncData, RemoveAsyncData } from '../../utils/common'
import { HttpRequest } from '../../data/Httprequest'
import { API } from '../../constants/constant'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { faFileSignature } from '@fortawesome/free-solid-svg-icons';
import { faObjectUngroup } from '@fortawesome/free-solid-svg-icons';
import { faSolid,faBell ,faBars,faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const AccountPage = () => {

   const {width,height} =  Dimensions.get("window")

   const [userData,setUserData] = useState([])

const navigation = useNavigation()

const handlePersonal = ()=>{
   navigation.navigate("personal")
}
const handlecover = ()=>{
   navigation.navigate("cover")
}
const handleservice = ()=>{
   navigation.navigate("service")
}
  
const handleprofessional = ()=>{
   navigation.navigate("professional")
}
  
// const handleOnbaord = ()=>{
//    navigation.navigate("onboardxprrt")
// }
   

const handlecontact = ()=>{
   navigation.navigate("contact")
}


const uploadProfileImage = async (file_name, base64,type) => {
   console.log(base64.length,"base64---data --in native how we do that--")
   // `data:image/jpeg;base64,${base64}`


   

   const mimeType = type ||'image/jpeg';
   try {
     const params = {
       file_name: file_name,
       profile_image: `data:${mimeType};base64,${base64}`
       
     };

     const response = await HttpRequest({
       method: 'PUT',
       url: API.PROFILE_IMAGE_UPLOAD,
       params:params,
     });

     console.log(response?.data,"response-------data-----in cover_images------")

     if (response?.data) {
      const newProfileImage = response.data.profile_image;
      // setUserData((prevData) => ({
      //    ...prevData,
      //    profile_image: newProfileImage,
      //  }));

      setUserData((predata)=>({
         ...predata,
         profile_image:newProfileImage
      }))

       console.log('Image uploaded successfully:', response);
     } else {
       console.log('Error uploading image:', response?.message);
     }
   } catch (error) {
     console.log('Error during API call:', error.message);
   }





 };



const openGallery = () => {
   launchImageLibrary({
     mediaType:"photo",
     includeBase64: true,
   }).then(res => {
     if (res.assets) {
       // console.log(res.assets[0],"res.assets[0]")
       const {base64, fileName,type} = res.assets[0];
       console.log(type, fileName, 'Gallery - base64 and filename');

       if (base64 && fileName) {
         uploadProfileImage(fileName, base64 ,type);
       }
     } else if (res.didCancel) {
       console.log('User canceled the gallery action');
     } else if (res.errorCode) {
       console.log('Gallery error:', res.errorCode);
     } else if (res.errorMessage) {
       console.log('Error message:', res.errorMessage);
     }
   });
 };




const handleLogout = async()=>{

   try {
      const token = await GetAsyncData("token")
      const response = await HttpRequest({
         url:API.LOGOUT,
         method:"PUT",
         params:{
            token:token
         }
      })

      console.log(response,"response------")

      await RemoveAsyncData("token")
      await RemoveAsyncData("user")

      navigation.replace("login")


   } catch (error) {
      console.log(error.message)
   }


}




console.log(userData,"usedata---alue in acccount page ----")





useEffect(()=>{
   const fetchdata = async () => {
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
        } else {
          console.log(response?.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
fetchdata()
},[])
  return (

      // <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
         
         <View className="bg-purple-100" style={{width:width,height:height}}>
         <View className="flex-row justify-around mt-5 ">
            <View>
               <Text className="text-xl font-semibold" >
                  <FontAwesomeIcon icon={faUser} />
                  </Text>
            </View>
            <View>
               <Text className="text-xl font-semibold">Profile</Text>
            </View>
            <View>
               <Text className="text-xl  font-semibold"><FontAwesomeIcon icon={faBell} /></Text>
            </View>
         </View>
         <View className="flex-row justify-center mt-4 ">
         <View className="flex-row justify-center mt-4 w-28 border-4 rounded-full p-2 border-purple-300 bg-purple-400 ">
            <Image alt='alt' source={{uri:userData.profile_image ? userData.profile_image : "https://images.pexels.com/photos/28319124/pexels-photo-28319124.png"}}
            style={{width:90,height:90}}
            className="border-2 rounded-full  "
            />
           
         </View>
         
         </View>
         <TouchableOpacity onPress={openGallery}>
            <Text className="text-center"><FontAwesomeIcon icon={faPenToSquare} /></Text>
         </TouchableOpacity >

         <View>
            <Text className="text-xl mt-4 text-center text-slate-800 font-extrabold">{userData?.name}</Text>
            <Text className="text-lg mt-1 text-center text-slate-800 font-semibold">{userData?.professional?.job_title ? userData?.professional?.job_title:"Designation"}</Text>
         </View>

            <View className="p-3 mt-4">
            <TouchableOpacity className=" bg-slate-100 flex-row mt-2 rounded-2xl"  onPress={handlePersonal}>
            <Text className="text-xl mt-4  p-2  bg-slate-100"><FontAwesomeIcon icon={faUser} /></Text>
               <Text className="text-xl mt-4  p-2  bg-slate-100">Personal Details</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={handleprofessional}  className=" bg-slate-100 flex-row mt-2 rounded-2xl">
            <Text className="text-xl mt-4  p-2  bg-slate-100">
            <FontAwesomeIcon icon={faGear} />
            </Text>
               <Text className="text-xl mt-4  p-2  bg-slate-100">Professional Details</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlecover}  className="  bg-slate-100 flex-row mt-2 rounded-2xl">
            <Text className="text-xl mt-4  p-2  bg-slate-100"><FontAwesomeIcon icon={faShare} /></Text>
               <Text className="text-xl mt-4  p-2  bg-slate-100">Covers Details</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleservice}  className=" bg-slate-100 flex-row mt-2 rounded-2xl">
            <Text className="text-xl mt-4  p-2  bg-slate-100"><FontAwesomeIcon icon={faTruckFast} /></Text>
               <Text className="text-xl mt-4  p-2  bg-slate-100">Consultation/services Details</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={handleOnbaord}  className=" bg-slate-100 flex-row mt-2 rounded-2xl">
            <Text className="text-xl mt-4  p-2  bg-slate-100"><FontAwesomeIcon icon={faUser} /></Text>
                <Text className="text-xl mt-4  p-2  bg-slate-100">Onboard</Text>
            </TouchableOpacity>
            */}
           
            <TouchableOpacity onPress={handlecontact}  className=" bg-slate-100 flex-row mt-2 rounded-2xl">
            <Text className="text-xl mt-4  p-2  bg-slate-100"><FontAwesomeIcon icon={faFileSignature} /></Text>
                <Text className="text-xl mt-4  p-2  bg-slate-100">Contact Page</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogout}  className=" bg-slate-100 flex-row mt-2 rounded-2xl">
            <Text className="text-3xl mt-4  p-2  bg-slate-100"><FontAwesomeIcon icon={faPowerOff} /></Text>
                <Text className="text-xl mt-4  p-2  bg-slate-100">Log out</Text>
            </TouchableOpacity>
            </View>

            
      </View>
      // </ScrollView>
  )
}

export default AccountPage