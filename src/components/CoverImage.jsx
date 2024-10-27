import React, {useEffect, useState} from 'react';
import {Dimensions, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {API} from '../../constants/constant';
import {HttpRequest} from '../../data/Httprequest';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSolid,faCloudArrowUp  } from '@fortawesome/free-solid-svg-icons';
import ProfileImage from './ProfileImage';
import RNFS from 'react-native-fs';
import { GetAsyncData } from '../../utils/common';
import { prepareDataForValidation } from 'formik';
const CoverImage = () => {
  const [userData, setUserData] = useState();
  const [coverImagedata,setCoverImageData] = useState()
 
  const {width,height } = Dimensions.get('window')
 

  const uploadProfileImage = async (file_name, base64,type) => {
    console.log(base64.length,"base64---data --in native how we do that--")
    // `data:image/jpeg;base64,${base64}

    const mimeType = type ||'image/jpeg';
    try {
      const params = {
        file_name: file_name,
        cover_image: `data:${mimeType};base64,${base64}`
        
      };

      const response = await HttpRequest({
        method: 'PUT',
        url: API.PROFILE_IMAGE_UPLOAD,
        params:params,
      });

      console.log(response?.data?.cover_image,"response-------data-----in cover_images------")
      if (response?.data) {
        console.log('Image uploaded successfully:', response);

        const coverImageValue = response?.data?.cover_image

      // setUserData((prevdata)=>({
      //   ...prevdata,
      //   cover_image:coverImageValue
      // }))

      setUserData((prevData) => ({
        ...prevData,
        cover_images: prevData.cover_images ? [...prevData.cover_images, coverImageValue] : [coverImageValue]
    }));
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
        // console.log(base64, fileName, 'Camera - base64 and filename');

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

 
    
  console.log("cover_images-----in response---api---",userData?.cover_images?.[0])

  useEffect(()=>{
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
    fetchUserData()
  },[])


  const deleteImage = async()=>{
   try {
    const response = await HttpRequest({
      url:API.PROFILE_IMAGE_DELETE,
      method:"DELETE",
      params:{
        profile_image:coverImagedata
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

    return (
      <View style={{ flexDirection: isSingleImage ? 'column' : 'row', flexWrap: 'wrap', justifyContent: 'center' ,top:30 }}>
        {images.map((imageUri, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setCoverImageData(imageUri)}
            style={{
              width: isSingleImage ? '90%' : index === 0 ? '33%' : '66%',
              height: index === 0 ? 300 : 150,
              margin: 5,
            }}
          >
            <Image
              source={{ uri: imageUri }}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

 
  return (
   <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
     <View className="bg-white p-2 " style={{width:width,height:"100%"}}>
      <View className=" bg-purple-100 p-1 rounded-xl" style={{width:320,height:210 ,left:20,top:20}}>
        <View>
          {/* <TouchableOpacity className=" mt-4 p-3" onPress={openCamera}>
            <Text>Open Camera</Text>
          </TouchableOpacity> */}
          <TouchableOpacity className="" style={{left:-26}} onPress={openGallery}>
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
       <View>{renderImages()}</View>
    </View>
   </ScrollView>
  );
};

export default CoverImage;




































  // const renderImages = () => {
  //   const images = userData?.cover_images || [];
  //   const isSingleImage = images.length === 1;
    

  //   const handleclick = async(index,url)=>{
  //     console.log(index,"index---value ")
  //     console.log(url,"url---value ")
  //     setCoverImageData(url)
  //       // await deleteImage()  
  //   }
    
  
  //   return (
  //     <View style={{ flexDirection: isSingleImage ? 'column' : 'column', flexWrap: 'wrap', justifyContent: 'center' }} className="p-2">
  //       {images.map((imageUri, index) => (
  //        <TouchableOpacity onPress={()=>handleclick(index,imageUri)} style={{
  //         width: isSingleImage ? "90%" : "90%" , 
  //         height: 300,
  //         margin: 10,
  //       }} >
  //          <Image
           
  //           key={index}
  //           alt='cover_image'
  //           source={{ uri: imageUri }}
  //           style={{
  //             width: isSingleImage ? "100%" : "90%" , 
  //             height: 300,
  //             margin: 10,
  //           }}
  //           className="rounded-xl"
            
  //         />
  //         </TouchableOpacity>
  //       ))}
  //     </View>
  //   );
  // };
