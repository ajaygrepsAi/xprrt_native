import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {GetAsyncData, RemoveAsyncData} from '../../utils/common';
import {HttpRequest} from '../../data/Httprequest';
import {API} from '../../constants/constant';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faGear} from '@fortawesome/free-solid-svg-icons';
import {faShare} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faTruckFast} from '@fortawesome/free-solid-svg-icons';
import {faPowerOff} from '@fortawesome/free-solid-svg-icons';
import {faFileSignature} from '@fortawesome/free-solid-svg-icons';
import {faObjectUngroup} from '@fortawesome/free-solid-svg-icons';
import {
  faSolid,
  faBell,
  faBars,
  faPenToSquare,
  faThin,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useAuth} from './AuthContext';
import XprrtLogo from './XprrtLogo';

const AccountPage = () => {
  const {width, height} = Dimensions.get('window');
  const {isAuthenticated, setIsAuthenticated} = useAuth();
  console.log(isAuthenticated, 'isauthenticated in accountpage---');
  const [userData, setUserData] = useState([]);

  const navigation = useNavigation();

  const handlePersonal = () => {
    navigation.navigate('personal');
  };
  const handlecover = () => {
    navigation.navigate('cover');
  };
  const handleservice = () => {
    navigation.navigate('service');
  };

  const handleprofessional = () => {
    navigation.navigate('professional');
  };

  const handleOnbaord = ()=>{
     navigation.navigate("onboardxprrt")
  }

  const handlecontact = () => {
    navigation.navigate('contact');
  };

  const uploadProfileImage = async (file_name, base64, type) => {
    console.log(base64.length, 'base64---data --in native how we do that--');
    // `data:image/jpeg;base64,${base64}`

    const mimeType = type || 'image/jpeg';
    try {
      const params = {
        file_name: file_name,
        profile_image: `data:${mimeType};base64,${base64}`,
      };

      const response = await HttpRequest({
        method: 'PUT',
        url: API.PROFILE_IMAGE_UPLOAD,
        params: params,
      });

      console.log(
        response?.data,
        'response-------data-----in cover_images------',
      );

      if (response?.data) {
        const newProfileImage = response.data.profile_image;
        // setUserData((prevData) => ({
        //    ...prevData,
        //    profile_image: newProfileImage,
        //  }));

        setUserData(predata => ({
          ...predata,
          profile_image: newProfileImage,
        }));

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
      mediaType: 'photo',
      includeBase64: true,
    }).then(res => {
      if (res.assets) {
        // console.log(res.assets[0],"res.assets[0]")
        const {base64, fileName, type} = res.assets[0];
        console.log(type, fileName, 'Gallery - base64 and filename');

        if (base64 && fileName) {
          uploadProfileImage(fileName, base64, type);
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

  const handleLogout = async () => {
    try {
      const token = await GetAsyncData('token');
      const response = await HttpRequest({
        url: API.LOGOUT,
        method: 'PUT',
        params: {
          token: token,
        },
      });

      console.log(response, 'response------');

      await RemoveAsyncData('token');
      await RemoveAsyncData('token1');
      await RemoveAsyncData('user');

      // navigation.replace("login")
      setIsAuthenticated(false);
      setTimeout(() => {
        navigation.replace('login');
      }, 1000);
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(userData, 'usedata---alue in acccount page ----');

  useEffect(() => {
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
    fetchdata();
  }, []);
  return (


    <View className="bg-white" style={{width: width}}>
      <View className="flex-row justify-around mt-2 ">
        <View className="z-20">
          {/* <Text className="text-xl font-semibold" >
                  <FontAwesomeIcon icon={faUser} />
                  </Text> */}
          <XprrtLogo />
        </View>
        <View>
          <Text
            className=" text-black m-2"
            style={{fontSize: 26, fontWeight: 600}}>
            Profile
          </Text>
        </View>
        <View>
          <FontAwesomeIcon icon={faBell} size={30} style={{marginTop: 10}} />
        </View>
      </View>
      <View className="flex-row justify-center mt-4 ">
        <View className="flex-row justify-center mt-4 w-28 border-4 rounded-full p-2 border-purple-300 bg-purple-400 ">
          <Image
          
            alt="alt"
            source={{
              uri: userData.profile_image
                ? userData.profile_image
                : 'https://images.pexels.com/photos/28319124/pexels-photo-28319124.png',
            }}
            style={{width: 90, height: 90}}
            className="border-2 rounded-full  "
          />
        </View>

        <View
          style={{
            width: 300,
            height: 50,
            position: 'absolute',
            top: -145,
            left: -35,
            opacity: 1,
            transform: [{rotate: '9.23deg'}],
            backgroundColor: 'rgba(219, 217, 247, 0.21)',
            zIndex: 10,
          
          }}>
          <Image source={require('../../assests/images/Ellipse.png')} />
        </View>
      </View>
      <TouchableOpacity onPress={openGallery} className="z-20" >
        <Text className="text-center" style={{left: 40, top: -10}}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </Text>
      </TouchableOpacity>

      <View>
        <Text className="text-xl mt-4 text-center text-slate-800 font-extrabold">
          {userData?.name ? userData?.name : 'Author'}
        </Text>
        <Text className="text-sm mt-1 text-center  font-semibold">
          {userData?.professional?.job_title
            ? userData?.professional?.job_title
            : 'Designation'}
        </Text>
      </View>

      <View className="p-3 mt-4">
        <TouchableOpacity
          className="  flex-row mt-2 rounded-2xl"
          onPress={handlePersonal}>
          <Text className="text-xl mt-4  p-2  ">
            <FontAwesomeIcon icon={faUser} />
          </Text>
          <Text className="text-xl mt-4  p-2 text-slate-700 ">Personal Details</Text>
          <FontAwesomeIcon icon={faCaretDown} style={{left: 125, top: 35}} />
        </TouchableOpacity>
        <View style={{
  width: 358, 
  height: 0, 
  
  borderTopWidth: 1,
  borderColor: '#E4E4E4',
  opacity: 1
}}>
        </View>
        <TouchableOpacity
          onPress={handleprofessional}
          className="  flex-row mt-2 rounded-2xl">
          <Text className="text-xl mt-4  p-2  ">
            <FontAwesomeIcon icon={faGear} />
          </Text>
          <Text className="text-xl mt-4  p-2 text-slate-700  ">Professional Details</Text>
          <FontAwesomeIcon icon={faCaretDown} style={{left: 90, top: 35}} />
        </TouchableOpacity>
        <View style={{
  width: 358, 
  height: 0, 
  
  borderTopWidth: 1,
  borderColor: '#E4E4E4',
  opacity: 1
}}>
        </View>
        <TouchableOpacity
          onPress={handlecover}
          className="   flex-row mt-2 rounded-2xl">
          <Text className="text-xl mt-4  p-2  ">
            <FontAwesomeIcon icon={faShare} />
          </Text>
          <Text className="text-xl mt-4  p-2 text-slate-700  ">Covers Details</Text>
          <FontAwesomeIcon icon={faCaretDown} style={{left: 140, top: 35}} />
        </TouchableOpacity>
        <View style={{
  width: 358, 
  height: 0, 
  
  borderTopWidth: 1,
  borderColor: '#E4E4E4',
  opacity: 1
}}>
        </View>
        <TouchableOpacity
          onPress={handleservice}
          className="  flex-row mt-2 rounded-2xl">
          <Text className="text-xl mt-4  p-2  ">
            <FontAwesomeIcon icon={faTruckFast} />
          </Text>
          <Text className="text-xl mt-4  p-2 text-slate-700 ">
            Consultation/services Details
          </Text>
          <FontAwesomeIcon icon={faCaretDown} style={{left: 6, top: 35}} />
        </TouchableOpacity>
        <View style={{
  width: 358, 
  height: 0, 
  
  borderTopWidth: 1,
  borderColor: '#E4E4E4',
  opacity: 1
}}>
        </View>
        {/* <TouchableOpacity onPress={handleOnbaord}  className=" bg-slate-100 flex-row mt-2 rounded-2xl">
            <Text className="text-xl mt-4  p-2  bg-slate-100"><FontAwesomeIcon icon={faUser} /></Text>
                <Text className="text-xl mt-4  p-2  bg-slate-100">Onboard</Text>
            </TouchableOpacity> */}
           

        <TouchableOpacity
          onPress={handlecontact}
          className=" flex-row mt-2 rounded-2xl">
          <Text className="text-xl mt-4  p-2  ">
            <FontAwesomeIcon icon={faFileSignature} />
          </Text>
          <Text className="text-xl mt-4  p-2 text-slate-700 ">Contact Page</Text>
          <FontAwesomeIcon icon={faCaretDown} style={{left: 149, top: 35}} />
        </TouchableOpacity>
        <View style={{
  width: 358, 
  height: 0, 
  
  borderTopWidth: 1,
  borderColor: '#E4E4E4',
  opacity: 1
}}>
        </View>

        <TouchableOpacity
          onPress={handleLogout}
          className=" flex-row mt-2 rounded-2xl">
          <Text className="text-3xl mt-4  p-2  ">
            <FontAwesomeIcon icon={faPowerOff} style={{color:"red"}}/>
          </Text>
          <Text className="text-xl mt-4  p-2 text-red-500">Log out</Text>

          <FontAwesomeIcon icon={faCaretDown} style={{left: 201, top: 35}} />
        </TouchableOpacity>
      </View>
      <View style={{width: '100%', height: 80}}></View>
    </View>
   
  );
};

export default AccountPage;
