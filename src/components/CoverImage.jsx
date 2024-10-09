import React, {useEffect, useState} from 'react';
import {Dimensions, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {API} from '../../constants/constant';
import {HttpRequest} from '../../data/Httprequest';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSolid,faCloudArrowUp  } from '@fortawesome/free-solid-svg-icons';
import ProfileImage from './ProfileImage';
const CoverImage = () => {
  const [userData, setUserData] = useState();
  const [coverImagedata,setCoverImageData] = useState()

  const {width,height } = Dimensions.get('window')

  const uploadProfileImage = async (file_name, base64) => {
    try {
      const params = {
        file_name,
        cover_images: base64,
      };

      const response = await HttpRequest({
        method: 'PUT',
        url: API.PROFILE_IMAGE_UPLOAD,
        params,
      });

      if (response) {
        console.log('Image uploaded successfully:', response);
      } else {
        console.log('Error uploading image:', response?.message);
      }
    } catch (error) {
      console.log('Error during API call:', error.message);
    }
  };

  const openCamera = () => {
    launchCamera({
      includeBase64: true,
    }).then(res => {
      if (res.assets) {
        const {base64, fileName} = res.assets[0];
        console.log(base64, fileName, 'Camera - base64 and filename');

        if (base64 && fileName) {
          uploadProfileImage(fileName, base64);
        }
      } else if (res.didCancel) {
        console.log('User canceled the camera action');
      } else if (res.errorCode) {
        console.log('Camera error:', res.errorCode);
      } else if (res.errorMessage) {
        console.log('Error message:', res.errorMessage);
      }
    });
  };

  const openGallery = () => {
    launchImageLibrary({
      includeBase64: true,
    }).then(res => {
      if (res.assets) {
        const {base64, fileName} = res.assets[0];
        console.log(base64, fileName, 'Gallery - base64 and filename');

        if (base64 && fileName) {
          uploadProfileImage(fileName, base64);
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

  const fetchUserData = async () => {
    try {
      const response = await HttpRequest({
        url: API.PROFILE,
        method: 'GET',
      });

      if (response && response?.data) {
        console.log(
          response?.data,
          'response?.data. value in coverImage------get api ',
        );
        setUserData(response?.data?.professional);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
    
  console.log("cover_images-----in response---api---",userData?.cover_images?.[0])

  useEffect(()=>{
    fetchUserData()
  },[])


  const deleteImage = async()=>{
   try {
    const response = await HttpRequest({
      url:API.PROFILE_IMAGE_DELETE,
      method:"DELETE",
      params:{
        cover_images:coverImagedata
      }
    })
    if(response){
      console.log("inages deleted successfully ")
    }else{
      console.log("not delete imsgess -----")
    }
   } catch (error) {
    console.log(error.message)
   }
  }

  console.log(coverImagedata,"coverimagedata")

  const renderImages = () => {
    const images = userData?.cover_images || [];
    const isSingleImage = images.length === 1;
    

    const handleclick = async(index,url)=>{
      console.log(index,"index---value ")
      console.log(url,"url---value ")
      setCoverImageData(url)
        // await deleteImage()  
    }
    
  
    return (
      <View style={{ flexDirection: isSingleImage ? 'column' : 'row', flexWrap: 'wrap', justifyContent: 'center' }} className="p-2">
        {images.map((imageUri, index) => (
         <TouchableOpacity onPress={()=>handleclick(index,imageUri)} style={{
          width: isSingleImage ? 90 : "90%" , 
          height: 300,
          margin: 10,
        }} >
           <Image
           
            key={index}
            alt='cover_image'
            source={{ uri: imageUri }}
            style={{
              width: isSingleImage ? 90 : "90%" , 
              height: 300,
              margin: 10,
            }}
            className="rounded-xl"
            
          />
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  





  return (
   <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
     <View className="border bg-purple-100 p-2" style={{width:width}}>
      <View className=" bg-purple-100">
        <View>
          {/* <TouchableOpacity className=" mt-4 p-3" onPress={openCamera}>
            <Text>Open Camera</Text>
          </TouchableOpacity> */}
          <TouchableOpacity className=" mt-4 p-2" onPress={openGallery}>
            <View style={{
               width:300,height:200,
               marginLeft:30
            }} className=" rounded-xl bg-white  justify-center ">
               <Text className=" text-center  text-lg font-semibold  text-blue-950"><FontAwesomeIcon icon={faCloudArrowUp} size={50} /></Text>
              <Text className=" text-center  text-lg font-semibold  text-blue-950">BROWSE FILES TO UPLOAD</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* <View className="grid grid-cols-1 border-2" >
      
        <Image alt='images' source={{uri:userData?.cover_images?.[0]}} style={{width:300,height:300}}/>
      </View> */}
       <View>{renderImages()}</View>
    </View>
   </ScrollView>
  );
};

export default CoverImage;


