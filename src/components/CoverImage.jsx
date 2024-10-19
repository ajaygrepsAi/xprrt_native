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
    // `data:image/jpeg;base64,${base64}`


    

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

      setUserData((prevdata)=>({
        ...prevdata,
        cover_image:coverImageValue
      }))
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

// import React, { useState } from "react";
// import { View, Image, Button, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import { HttpRequest } from "../../data/Httprequest";
// import { API } from "../../constants/constant";
//  // Make sure the path is correct

//  const CoverImage = ({profile_image}) => {
//   // console.log(profile_image,"profile_image")
//   const [loading, setLoading] = useState(false);
//   const [imageUri, setImageUri] = useState(profile_image || null);

//   const selectImage = () => {
//     launchImageLibrary({ mediaType: 'photo', quality: 1, includeBase64: true }, async (response) => {
//       if (response.didCancel) {
//         console.log("User cancelled image picker");
//       } else if (response.errorCode) {
//         console.log("Image Picker Error: ", response.errorCode);
//       } else {
//         const { assets } = response;
//         if (assets && assets.length > 0) {
//           const selectedImage = assets[0];
//           handleUpload(selectedImage);
//         }
//       }
//     });
//   };

//   const takePhoto = () => {
//     launchCamera({ mediaType: 'photo', quality: 1, includeBase64: true }, async (response) => {
//       if (response.didCancel) {
//         console.log("User cancelled image picker");
//       } else if (response.errorCode) {
//         console.log("Camera Error: ", response.errorCode);
//       } else {
//         const { assets } = response;
//         if (assets && assets.length > 0) {
//           const selectedImage = assets[0];
//           handleUpload(selectedImage);
//         }
//       }
//     });
//   };

//   const handleUpload = async (file) => {
//     console.log(file,"file-----data------")
//     setLoading(true);
//     const mimeType = file.type ? file.type : "image/jpeg";
//     console.log(mimeType,"mimetype----")
//     const base64 = file.base64;  
//     // console.log(base64,"base640-------------------------------dncdscnalcnsdalcwl")
//     console.log(file.fileName,"file.filenamed-------------------------------dncdscnalcnsdalcwl")
//     console.log(`Base64 data: data:${mimeType};base64,${base64.slice(0, 500)}...`);

//     // const formData = new FormData();
//     // formData.append('file_name', file.fileName);
//     // formData.append('profle_image', `data:${mimeType};base64,${base64}`);

//     const params = {
//       file_name: file.fileName,
//       // profile_image: `data:${mimeType};base64,${base64}`, 

//     };

//     try {
//       const response = await HttpRequest({
//         method: "PUT",
//         url: API.PROFILE_IMAGE_UPLOAD,
//         params: params, 
//       });
//       setImageUri(response?.data?.cover_image);
//       console.log(response,"response")
//     } catch (error) {
//       console.error("Upload failed: ", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//    <ScrollView >
//      <View style={styles.container}>
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <>
//           {/* Conditionally render Image only if imageUri is valid */}
//           {imageUri ? (
//             <Image source={{ uri: imageUri }} style={styles.image} />
//           ) : (
//             <Image source={{uri:"https://via.placeholder.com/100"}} style={styles.image} />
//           )}
//           <View style={styles.buttonContainer}>
//             <Button title="Select from Gallery" onPress={selectImage} />
//             <Button title="Take a Photo" onPress={takePhoto} />
//           </View>
//         </>
//       )}
//     </View>
//    </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: 200,
//     height: 200,
//     borderRadius: 100,
//     marginBottom: 20,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '80%',
//   },
// });

// export default CoverImage;



